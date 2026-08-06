import { defineConfig, loadEnv } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { mockDevServerPlugin } from "vite-plugin-mock-dev-server";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_API_URL, VITE_BASE_URL, VITE_MOCK } = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react(),
      babel({
        presets: [reactCompilerPreset()],
      }),
      mockDevServerPlugin({
        enabled: VITE_MOCK === "true",
      }),
    ],
    css: {
      transformer: "lightningcss",
    },
    base: VITE_BASE_URL,
    server: {
      proxy: {
        "/api": { target: VITE_API_URL, changeOrigin: true },
      },
      host: "0.0.0.0",
    },
  };
});
