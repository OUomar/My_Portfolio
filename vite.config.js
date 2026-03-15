import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/My_Portfolio/', 
  server: {
    port: 3000, // Pour garder le même port que CRA si tu veux
  }
})