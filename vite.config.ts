import { defineConfig} from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import replace from '@rollup/plugin-replace';
import * as path from 'path';
import { config } from 'dotenv';

const configToReplace = {};

for (const [key, value] of Object.entries(config().parsed)) {
  configToReplace[`process.env.${key}`] = JSON.stringify(value);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(),
  replace(
    {
      include: ['./src/**/*.svelte', './src/**/*.js', './src/**/*.ts'],
      preventAssignment: true,
      values: configToReplace
    }
  )],
  resolve: {
    alias: {
      $lib: path.resolve('src/lib'),
      $viewModel: path.resolve('src/viewModel'),
      $model: path.resolve('src/models'),
      $view: path.resolve('src/views'),
      $type: path.resolve('src/types'),
    }
  }
})

