const environment = process.env ?? import.meta.env;

const mode = environment.MODE ?? environment.NODE_ENV;

export const buildMode = environment.BUILD_MODE;

export const isDevMode = mode !== 'production';

export const breakPoints = {
  Tab: 768,
  Laptop: 1024,
  Desktop: 1440,
  Huge: 1920,
};

export const siteName = `日本ALO音楽研究所`;

export const siteUrl = `https://******.linea.work`;

export const basePath = ``;

export const distDir = `dist`;

export const tmpDir = `.tmp`;

export const assetsDir = `assets`;

export const outDir = `${distDir}${basePath}`;

export const phoneNumber = `0120-00-0000`;
