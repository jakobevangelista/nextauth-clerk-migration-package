import { defineConfig } from "tsup";

export default defineConfig((options) => [
  //   {
  //     entry: ["src/app/_auth-migration/trickleWrapper.tsx"],
  //     format: ["esm"],
  //     dts: true,
  //     clean: true,
  //     minify: false,
  //     splitting: false,
  //     outDir: "dist/client",
  //     target: "es2022",
  //   },
  {
    entry: ["src/app/_auth-migration/index.ts"],
    format: ["esm"],
    dts: true,
    clean: true,
    target: "es2022",
  },
]);
