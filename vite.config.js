import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/mindora-react-flow2/', // ← dein Repository-Name mit / davor und danach
  plugins: [react()],
})
