import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/app/_auth-migration/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  minify: false,
  splitting: false,
  target: "es2022",
}));
