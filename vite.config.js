import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/biblia-app/',
  build: {
    outDir: 'dist',
  },
})
