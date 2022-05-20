import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext"
  },
  plugins: [react()],
  server: {
        port: 80,
	host: '0.0.0.0',
	hmr: {
	clientPort:80,
    }
  },
  envDir:"..",
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src')
    },
  },
})
