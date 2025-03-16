import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), hmr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"), // Definir "@" para "app"
      "~": path.resolve(__dirname, "./app"), // Adiciona um alias alternativo para evitar conflitos
    },
  },
});

function hmr() {
  return {
    name: 'custom-hmr',
    enforce: 'post' as 'post',
    handleHotUpdate({ file, server }: { file: string; server: any }) {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        console.log('Reloading the page...');
        server.ws.send({
          type: 'full-reload',
          path: '*',
        });
      }
    },
  };
}
