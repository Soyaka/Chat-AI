import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    //'process.env.OPENAI_API_KEY': JSON.stringify(process.env.OPENAI_API_KEY),
    //'process.env.REACT_APP_DEBUG': JSON.stringify(process.env.REACT_APP_DEBUG),
  },
  // envDir: "./env"
})
