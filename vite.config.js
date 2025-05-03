import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    // Improve asset handling
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
        },
        // Ensure proper asset paths
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1)
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "img"
          } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            extType = "fonts"
          }
          return `assets/${extType}/[name]-[hash][extname]`
        },
      },
    },
  },
})
