import { sentryVitePlugin } from "@sentry/vite-plugin";
/// <reference types="vite-plugin-svgr/client" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    sentryVitePlugin({
      org: "jamie-garner-ltd",
      project: "supanova",
    }),
  ],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist/supanova-client",
    sourcemap: true,
  },
});
