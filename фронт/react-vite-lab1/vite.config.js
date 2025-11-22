import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      "/app": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        rewrite: (path) =>
            path.replace(/^\/app/, "/Information_System_Lab1-1.0-SNAPSHOT"),
      },
    },
  },
  plugins: [react()],
})
