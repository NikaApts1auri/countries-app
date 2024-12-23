import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const rootPath = path.resolve(process.cwd());
  const srcPath = `${rootPath}/src`;
  const ComponentsPath = `${rootPath}/src/Components`;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "+": rootPath, // Root alias (optional)
        "@": srcPath, // Alias for src
        "#": ComponentsPath, // Alias for src/Components
      },
    },
  };
});
