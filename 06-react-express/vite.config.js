import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "77957f67-950a-4a25-bd9d-326f9600c935-00-2y0ezv4bbx8y.kirk.replit.dev"
    ]
  }
})
