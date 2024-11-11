import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_API_URL, VITE_BASE_URL } = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src")
      }
    },
    server: {
      proxy: {
        "/api": {
          target: VITE_API_URL,
          changeOrigin: true
        }
      }
    }
  };
});
