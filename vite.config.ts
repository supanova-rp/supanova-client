/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import viteTsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  cacheDir: "./node_modules/.vite/supanova-client",

  server: {
    port: 3000,
    host: "0.0.0.0",
  },

  preview: {
    port: 3000,
    host: "0.0.0.0",
  },

  plugins: [
    react(),
    svgr(),
    viteTsConfigPaths({
      root: "./",
    }),
  ],

  test: {
    globals: true,
    cache: {
      dir: "./node_modules/.vitest",
    },
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
