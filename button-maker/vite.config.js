import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
export default defineConfig({
  base: '/button-maker/',  // Add only this new line
  plugins: [react()],      // Keep your existing config
  // ... rest of your existing config
})
