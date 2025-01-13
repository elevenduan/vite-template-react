import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_API_URL, VITE_BASE_URL, VITE_MOCK } = loadEnv(
    mode,
    process.cwd(),
    ""
  );
  return {
    plugins: [
      react(),
      viteMockServe({
        mockPath: "mock",
        enable: VITE_MOCK === "true",
        logger: false
      })
    ],
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
      },
      host: "0.0.0.0"
    }
  };
});
