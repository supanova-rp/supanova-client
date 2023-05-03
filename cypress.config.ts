import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 768,
  viewportWidth: 1200,
  experimentalStudio: true,
  e2e: {
    baseUrl: "http://localhost:3000/login",
  },
});
