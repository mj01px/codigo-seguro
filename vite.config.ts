import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/codigo-seguro/',
  plugins: [react()],
})
