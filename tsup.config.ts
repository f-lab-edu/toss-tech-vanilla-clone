import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/core/router/index.ts', 'src/core/createComponent/index.ts'],
  // entry: {
  //   router: 'src/core/router/index.ts',
  //   createComponent: 'src/core/createComponent/index.ts'
  // },
  splitting: false,
  sourcemap: true,
  clean: true,
});
