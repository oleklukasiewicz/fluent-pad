import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import replace from '@rollup/plugin-replace';
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
})

