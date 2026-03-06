import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: false,
      exclude: ['**/*.test.ts', '**/test-setup.ts'],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'button/index': resolve(__dirname, 'src/button/index.ts'),
        'button/react': resolve(__dirname, 'src/button/react.tsx'),
        'button/angular': resolve(__dirname, 'src/button/angular.ts'),
        'text-field/index': resolve(__dirname, 'src/text-field/index.ts'),
        'text-field/react': resolve(__dirname, 'src/text-field/react.tsx'),
        'text-field/angular': resolve(__dirname, 'src/text-field/angular.ts'),
        'react/index': resolve(__dirname, 'src/react/index.ts'),
        'angular/index': resolve(__dirname, 'src/angular/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', '@angular/core', 'lit', 'lit/decorators.js'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        globals: {
          react: 'React',
          '@angular/core': 'ng.core',
        },
      },
    },
    minify: 'terser',
    sourcemap: true,
    target: 'ES2022',
  },
});
