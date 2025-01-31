import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [],
  server: {
    allowedHosts: ["gh66dz-5173.csb.app"],
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
  },
});
