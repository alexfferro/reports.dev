import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "../http/src/swagger.json",
    output: {
      target: "./src/api/swagger.ts",
      httpClient: "fetch",
      client: "react-query",
      baseUrl: `${import.meta.env.VITE_BACKEND_URL}`,
    },
  },
});
