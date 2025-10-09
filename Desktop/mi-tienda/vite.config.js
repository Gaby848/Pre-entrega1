import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "./"  // <-- rutas relativas, imágenes y links funcionarán desde cualquier path
})
