import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: false,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'authentication/index': resolve(__dirname, 'src/authentication/index.ts'),
        'feature-flags/index': resolve(__dirname, 'src/feature-flags/index.ts'),
        'permissions/index': resolve(__dirname, 'src/permissions/index.ts'),
        'utils/index': resolve(__dirname, 'src/utils/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
    minify: 'terser',
    sourcemap: true,
    target: 'ES2022',
  },
});
