import { createReadStream, existsSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(fileURLToPath(import.meta.url));
const distRoot = resolve(projectRoot, 'dist');
const root = existsSync(distRoot) ? distRoot : projectRoot;
const host = '127.0.0.1';
const port = Number(process.env.PORT ?? 43992);
const mimeTypes = {
  '.avif': 'image/avif',
  '.css': 'text/css; charset=utf-8',
  '.geojson': 'application/geo+json; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url ?? '/', `http://${host}:${port}`);
    const pathname = decodeURIComponent(requestUrl.pathname);
    const appPath = pathname.replace(/\/$/, '');
    const appPages = new Set([
      '/privacy-policy', '/contact', '/works', '/services', '/company', '/voices',
      '/blog',
    ]);
    const isAppPage = appPages.has(appPath);
    const relativePath = pathname === '/' || isAppPage
      ? 'index.html'
      : pathname.replace(/^\/+/, '');
    const filePath = resolve(root, relativePath);

    if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
      response.writeHead(403).end('Forbidden');
      return;
    }

    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      response.writeHead(404).end('Not found');
      return;
    }

    response.writeHead(200, {
      'Cache-Control': 'no-store, max-age=0',
      'Content-Type': mimeTypes[extname(filePath).toLowerCase()] ?? 'application/octet-stream',
    });
    createReadStream(filePath).pipe(response);
  } catch {
    const notFoundPath = resolve(root, '404.html');
    if (existsSync(notFoundPath)) {
      response.writeHead(404, {
        'Cache-Control': 'no-store, max-age=0',
        'Content-Type': mimeTypes['.html'],
      });
      createReadStream(notFoundPath).pipe(response);
      return;
    }

    response.writeHead(404).end('Not found');
  }
});

server.listen(port, host, () => {
  console.log(`LALA preview: http://${host}:${port}/`);
});
