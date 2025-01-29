import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "../server/http/src/swagger.json",
    output: {
      target: "./src/api/swagger.ts",
      httpClient: "fetch",
      client: "react-query",
      baseUrl: process.env.VITE_BACKEND_URL || "http://localhost:3333",
    },
  },
});
