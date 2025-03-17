import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Location-Tracker-Web",
  plugins: [react(), tailwindcss(),],
  server: {
  host: true,
  strictPort: true,
  port: 3000,
  }
})
