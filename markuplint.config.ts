import type { Config } from '@markuplint/ml-config';

const config: Config = {
  excludeFiles: ['./template/**/*'],
  extends: ['markuplint:recommended'],
  parser: {
    '\\.astro$': '@markuplint/astro-parser',
  },
  parserOptions: {
    ignoreFrontMatter: true,
  },
  rules: {
    'invalid-attr': {
      options: {
        allowAttrs: ['prefix'],
      },
    },
    'deprecated-attr': false,
  },
  nodeRules: [],
  pretenders: [
    {
      // head内 Astro Font component の使用を許可
      selector: 'Font',
      as: {
        element: 'link',
      },
    },
  ],
};

export default config;
