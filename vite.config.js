import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";


export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    historyApiFallback: true,
    allowedHosts: [
      "localhost",
      "3923-2401-4900-1c5a-43a6-5474-bbf2-168d-518e.ngrok-free.app", // Add your ngrok URL here
    ],
  },
});
