import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Icons from "unplugin-icons/vite";
import svgr from "vite-plugin-svgr";
import path from "path";

import fs from "fs";

const cwd = process.cwd();

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  server: {
    https: {
      key: fs.readFileSync("../.cert/key.pem"),
      cert: fs.readFileSync("../.cert/cert.pem"),
    },
  },
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: {
        config: path.join(cwd, "config.html"),
        panel: path.join(cwd, "index.html"),
        // mobile: path.join(cwd, "source/mobile.html"),
        // video_overlay: path.join(cwd, "source/video_overlay.html"),
        // video_component: path.join(cwd, "source/video_component.html"),
      },
      output: {
        dir: path.join(cwd, "dist"),
      },
    },
  },

  publicDir: "assets",
  plugins: [
    react(),
    svgr(),
    Icons({
      compiler: "jsx",
      jsx: "react",
    }),
  ],
});
