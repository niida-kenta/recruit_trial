// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { loadEnv } from 'vite';

const { DEV_PORT } = loadEnv(import.meta.env.MODE, process.cwd(), '');

import { assetsDir, basePath, outDir, siteUrl, tmpDir } from './project.config';
import { baseConfig as viteConfig } from './vite.config';

// https://astro.build/config
export default defineConfig({
  outDir,
  base: basePath,
  site: siteUrl,
  trailingSlash: 'always',
  publicDir: tmpDir,
  server(options) {
    const { command } = options;
    if (command === 'preview') {
      return {
        port: 8080,
      };
    }
    return {
      open: `${basePath}/`,
      port: DEV_PORT ? Number(DEV_PORT) : 3000,
    };
  },
  integrations: [],
  experimental: {},
  build: {
    assets: assetsDir,
    format: 'preserve',
    inlineStylesheets: 'never',
  },
  vite: viteConfig,
  // font追加
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Noto Sans JP',
      cssVariable: '--font-noto-sans-jp',
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Lato',
      cssVariable: '--font-lato',
      weights: [300, 400],
    },
  ],
});
