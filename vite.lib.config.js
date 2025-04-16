import viteReact from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    viteReact(),
    dts({
      include: [
        "src/components/ui/color-picker/**",
        "src/hooks/**",
        "src/utils/color/**",
        "src/types/**",
        "src/lib/utils.ts",
      ],
      outDir: "dist",
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/lib/index.ts"),
        hooks: resolve(__dirname, "src/hooks/index.ts"),
        utils: resolve(__dirname, "src/utils/index.ts"),
        styles: resolve(__dirname, "src/lib/styles.ts"),
      },
      formats: ["es"],
    },
    outDir: "dist",
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@radix-ui/react-accordion",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-separator",
        "@radix-ui/react-slot",
        "@radix-ui/react-tabs",
        "class-variance-authority",
        "clsx",
        "lucide-react",
        "tailwind-merge",
      ],
      output: {
        preserveModules: true,
        entryFileNames: "[name].js",
        assetFileNames: "styles.css",
      },
    },
    cssMinify: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
