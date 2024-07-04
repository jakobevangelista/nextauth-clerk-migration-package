import { defineConfig } from "tsup";

export default defineConfig((options) => [
  {
    entry: ["src/trickleWrapper.tsx"],
    format: ["esm"],
    dts: true,
    clean: true,
    minify: false,
    splitting: false,
    outDir: "dist/client",
    target: "es2022",
  },
  {
    entry: ["src/index.ts"],
    format: ["esm"],
    dts: true,
    clean: true,
    target: "es2022",
  },
]);
