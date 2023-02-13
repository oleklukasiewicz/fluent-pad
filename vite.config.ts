import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import replace from '@rollup/plugin-replace';
import { config } from 'dotenv';
import { svelteSVG } from "rollup-plugin-svelte-svg";

const configToReplace = {};

for (const [key, value] of Object.entries(config().parsed)) {
  configToReplace[`process.env.${key}`] = JSON.stringify(value);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(),
    svelteSVG({
      // optional SVGO options
      // pass empty object to enable defaults
      svgo: {},
      // vite-specific
      // https://vitejs.dev/guide/api-plugin.html#plugin-ordering
      // enforce: 'pre' | 'post'
      enforce: "pre",
  }),
  replace(
    {
      include: ['./src/**/*.svelte', './src/**/*.js', './src/**/*.ts'],
      preventAssignment: true,
      values: configToReplace
    }
  )],
})

