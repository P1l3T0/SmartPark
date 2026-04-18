import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      "process.env.BACKEND_API_URL": JSON.stringify(env.BACKEND_API_URL),
    },
    plugins: [react(), tailwindcss()],
    server: {
      port: 9000,
      proxy: {
        '/api': 'http://localhost:8080',
        '/management': 'http://localhost:8080',
        '/v3/api-docs': 'http://localhost:8080',
      },
    },
  };
});
