import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// サブパス配信（GitHub Pages 等）のときは BASE_PATH=/リポジトリ名/ を指定してビルドする。
// ソースコード内のルート絶対パス（/images/... や /contact 等）はビルド時にここで書き換える。
const base = process.env.BASE_PATH || '/'

function rebaseAbsolutePaths(): Plugin {
  const prefix = base.replace(/\/$/, '')
  const pattern = /(["'`])\/(images\/|data\/|contact|works|services|company|voices|blog|privacy-policy|#)/g
  return {
    name: 'rebase-absolute-paths',
    apply: 'build',
    transform(code, id) {
      if (prefix === '' || !/\.(tsx?|css)(\?|$)/.test(id)) return
      if (!pattern.test(code)) return
      return { code: code.replace(pattern, `$1${prefix}/$2`), map: null }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), rebaseAbsolutePaths()],
})
