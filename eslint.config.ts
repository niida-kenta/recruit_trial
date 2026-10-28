import type {
  ConfigWithExtends,
  ConfigWithExtendsArray,
  ExtendsElement,
  Plugin,
} from '@eslint/config-helpers';

import css from '@eslint/css';
import js from '@eslint/js';
import markdown from '@eslint/markdown';
import tsParser from '@typescript-eslint/parser';
import configPrettier from 'eslint-config-prettier';
import pluginAstro from 'eslint-plugin-astro';
import pluginPerfectionist from 'eslint-plugin-perfectionist';
import pluginTailwindcss from 'eslint-plugin-tailwindcss';
import pluginUnusedImport from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import { tailwind4 } from 'tailwind-csstree';
import tseslint from 'typescript-eslint';

const ignoreConfig = globalIgnores([
  'node_modules/*',
  'public/*',
  'dist/*',
  '.astro/*',
  'template/*',
  '.tmp/*',
  'src/statics/*',
  'src/icon-font/preview/*',
]);

const scriptFiles = ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.tsx', '**/*.astro'];
const nonScriptFiles = ['**/*.css', '**/*.md'];

const globalConfig: ConfigWithExtendsArray = [
  {
    files: scriptFiles,
    ignores: nonScriptFiles,
    extends: ['js/recommended'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tsParser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
    plugins: {
      js,
    },
  },
  tseslint.configs.recommended,
  {
    files: scriptFiles,
    ignores: nonScriptFiles,
    extends: [pluginPerfectionist.configs['recommended-natural']],
  },
  configPrettier,
  {
    files: scriptFiles,
    ignores: nonScriptFiles,
    rules: {
      camelcase: [0, { properties: 'never' }],
      'class-methods-use-this': 0,
      'consistent-return': [
        2,
        {
          treatUndefinedAsUnspecified: true,
        },
      ],
      eqeqeq: 1,
      'func-names': [2, 'never'],
      'lines-between-class-members': [2, 'always'],
      'no-console': 1,
      'no-irregular-whitespace': [2, { skipJSXText: true, skipTemplates: true }],
      'no-new': 1,
      'no-param-reassign': [
        2,
        {
          props: false,
        },
      ],
      'no-plusplus': 0,
      'no-use-before-define': [
        2,
        {
          functions: false,
        },
      ],
      'no-var': 2,
      'object-shorthand': [2, 'always'],
      'prefer-const': 2,
      'prefer-destructuring': [
        2,
        {
          array: false,
          object: true,
        },
      ],
      'prefer-template': 2,
      'spaced-comment': [
        2,
        'always',
        {
          markers: ['/'],
        },
      ],
      'perfectionist/sort-objects': 0,
      'perfectionist/sort-imports': [
        2,
        {
          type: 'natural',
          sortSideEffects: true,
        },
      ],
      'perfectionist/sort-interfaces': [2, { type: 'unsorted' }],
      'perfectionist/sort-object-types': [2, { type: 'unsorted' }],
    },
  },
];

const importConfig: ConfigWithExtends = {
  plugins: {
    // import: pluginImport,
    'unused-imports': pluginUnusedImport,
  },
  settings: {
    '@typescript-eslint/parser': ['.ts', '.tsx'],
    'import/resolver': {
      node: true,
      typescript: true,
    },
  },
  // 新バージョンがリリース予定なので一旦コメントアウト
  rules: {
    // 'import/consistent-type-specifier-style': [2, 'prefer-top-level'],
    // 'import/extensions': [
    //   2,
    //   'ignorePackages',
    //   {
    //     '': 'never',
    //     js: 'never',
    //     jsx: 'never',
    //     ts: 'never',
    //     tsx: 'never',
    //   },
    // ],
    // 'import/no-cycle': [0],
    // 'import/no-extraneous-dependencies': [
    //   2,
    //   {
    //     devDependencies: [
    //       '*.config.{js,cjs,mjs,ts}',
    //       '.*rc.{js,cjs,mjs}',
    //       'plopfile.*',
    //       'script/**',
    //       'src/config/**',
    //     ],
    //     optionalDependencies: false,
    //   },
    // ],
    // 'import/no-unresolved': [2, { ignore: ['astro:*'] }],
  },
};

const tsConfig: ConfigWithExtends = {
  extends: [tseslint.configs.recommendedTypeChecked],
  files: ['**/*.ts'],
  rules: {
    '@typescript-eslint/consistent-type-assertions': 0,
    '@typescript-eslint/consistent-type-imports': [
      2,
      { fixStyle: 'separate-type-imports', prefer: 'type-imports' },
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/naming-convention': [
      2,
      {
        format: ['camelCase', 'PascalCase', 'snake_case'],
        selector: ['parameterProperty', 'typeProperty'],
      },
    ],
    '@typescript-eslint/no-bitwise': 0,
    '@typescript-eslint/no-empty-interface': [
      2,
      {
        allowSingleExtends: false,
      },
    ],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-increment-decrement': 0,
    '@typescript-eslint/no-inferrable-types': [
      2,
      {
        ignoreParameters: true,
      },
    ],
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unused-vars': [
      2,
      { args: 'none', ignoreRestSiblings: false, vars: 'all' },
    ],
    '@typescript-eslint/no-use-before-define': [
      2,
      {
        ignoreTypeReferences: true,
      },
    ],
    '@typescript-eslint/object-literal-sort-keys': 0,
    '@typescript-eslint/prefer-arrow-functions': 0,
    '@typescript-eslint/prefer-template': 0,
    '@typescript-eslint/ter-prefer-arrow-callback': 0,
  },
};

const astroConfig: ConfigWithExtends = {
  extends: [pluginAstro.configs.recommended],
  files: ['**/*.astro'],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      2,
      { vars: 'all', args: 'none', ignoreRestSiblings: false },
    ],
    'astro/no-conflict-set-directives': 'error',
    'astro/no-unused-define-vars-in-style': 'error',
  },
};

const tailwindConfig: ConfigWithExtends = {
  extends: [pluginTailwindcss.configs.recommended as ExtendsElement],
  files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.astro'],
  plugins: {
    tailwindcss: pluginTailwindcss as unknown as Plugin,
  },
  settings: {
    tailwindcss: {
      cssConfigPath: 'src/styles/global.css',
    },
  },
  rules: {
    'tailwindcss/no-custom-classname': 1,
  },
};

const cssConfig: ConfigWithExtends = {
  files: ['**/*.css'],
  plugins: { css },
  language: 'css/css',
  languageOptions: {
    customSyntax: tailwind4,
  },
  extends: ['css/recommended', configPrettier],
  rules: {
    'css/no-empty-blocks': 1,
    // 別ファイルで定義したCSS変数の使用を許可
    'css/no-invalid-properties': ['error', { allowUnknownVariables: true }],
    // CSSネスティングを許可
    'css/use-baseline': ['error', { allowSelectors: ['nesting'] }],
  },
};

const markdownConfig: ConfigWithExtends = {
  files: ['**/*.md'],
  plugins: { markdown },
  extends: ['markdown/recommended'],
};

export default defineConfig([
  globalConfig,
  importConfig,
  tsConfig,
  astroConfig,
  cssConfig,
  tailwindConfig,
  markdownConfig,
  ignoreConfig,
]);
