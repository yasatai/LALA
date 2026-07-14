import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/LALA/',
  plugins: [react()],
  server: {
    port: 5500,
    host: 'localhost',
  },
  preview: {
    port: 5500,
    host: 'localhost',
  },
})
