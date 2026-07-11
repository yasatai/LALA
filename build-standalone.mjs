import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer as createViteServer } from 'vite';

const projectRoot = new URL('./', import.meta.url);
const vite = await createViteServer({
  root: fileURLToPath(projectRoot),
  appType: 'custom',
  logLevel: 'error',
  server: { middlewareMode: true },
});
let staticMarkup;

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.tsx');
  staticMarkup = renderToStaticMarkup(createElement(App));
} finally {
  await vite.close();
}

const distIndex = await readFile(new URL('dist/index.html', projectRoot), 'utf8');
const scriptPath = distIndex.match(/<script[^>]+src="([^"]+)"[^>]*><\/script>/)?.[1];
const stylePath = distIndex.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/)?.[1];

if (!scriptPath || !stylePath) {
  throw new Error('Build assets were not found in dist/index.html.');
}

const [scriptSource, styleSource] = await Promise.all([
  readFile(new URL(`dist${scriptPath}`, projectRoot), 'utf8'),
  readFile(new URL(`dist${stylePath}`, projectRoot), 'utf8'),
]);

const rewriteAssetPaths = (source) => source
  .replaceAll('/images/', '/public/images/')
  .replaceAll('/data/', '/public/data/');
const inlineScript = rewriteAssetPaths(scriptSource).replaceAll('</script', '<\\/script');
const inlineStyle = rewriteAssetPaths(styleSource);
const staticApp = rewriteAssetPaths(staticMarkup);

const standalone = distIndex
  .replace(/\s*<script[^>]+src="[^"]+"[^>]*><\/script>/, '')
  .replace(/\s*<link[^>]+rel="stylesheet"[^>]+href="[^"]+"[^>]*>/, '')
  .replace('</head>', () => `\n  <style>${inlineStyle}</style>\n</head>`)
  .replace('<div id="root"></div>', () => `<div id="root">${staticApp}</div>`)
  .replace('</body>', () => `  <script>${inlineScript}</script>\n</body>`);

await writeFile(new URL('standalone.html', projectRoot), standalone, 'utf8');
