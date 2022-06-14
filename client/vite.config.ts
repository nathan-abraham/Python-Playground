import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "vscode",
        replacement: path.resolve(
          __dirname,
          "./node_modules/monaco-languageclient/lib/vscode-compatibility"
        ),
      },
    ],
  },
});
