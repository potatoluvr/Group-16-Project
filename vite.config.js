import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Terminal from 'vite-plugin-terminal'

const isDev = process.env.NODE_ENV === 'development'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

    Terminal({
      console: 'terminal',
      output: ['terminal', 'console']
    })
  ],
})
