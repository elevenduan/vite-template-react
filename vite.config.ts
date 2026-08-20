import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "node:url";
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
      lightningcss: {
        targets: {
          chrome: 88 << 16,
          edge: 88 << 16,
          firefox: 78 << 16,
          safari: 14 << 16,
          ios_saf: 14 << 16,
        },
      },
    },
    build: {
      target: "es2021",
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: "react",
                test: /[\\/]node_modules[\\/](react|react-dom|react-router)[\\/]/,
                priority: 100,
              },
              {
                name: "antd-mobile",
                test: /[\\/]node_modules[\\/](antd-mobile)[\\/]/,
                priority: 50,
              },
            ],
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    base: VITE_BASE_URL,
    server: {
      proxy: {
        "/api": { target: VITE_API_URL, changeOrigin: true },
      },
      // host: "0.0.0.0",
      // port: 80,
      // allowedHosts: true,
    },
  };
});
