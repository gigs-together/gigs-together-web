import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

// ignorePatterns: [
//   'tailwind.config.js',
//   'src/components/ui/**/*',
// ],
//   globals: {
//   Telegram: 'readonly',
// },
// extends: [
//   'next/core-web-vitals',
//   'next/typescript',
// ],

export default tseslint.config(
  { ignores: ['dist', '**/*debug*'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
      '@stylistic': stylistic,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/jsx-tag-spacing': [
        'error',
        {
          closingSlash: 'never', // </div >
          beforeSelfClosing: 'never', // <App />
          afterOpening: 'never', // < App/>
          beforeClosing: 'never', //  <App />
        },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: { delimiter: 'semi', requireLast: true },
          singleline: { delimiter: 'semi', requireLast: false },
        },
      ],
      '@stylistic/quote-props': ['error', 'as-needed'],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      'import/extensions': [
        'warn',
        'never',
        {
          css: 'always',
          scss: 'always',
          less: 'always',
          json: 'always',
          png: 'always',
          // some bullshit with dot-separated naming
          enum: 'always',
          types: 'always',
        },
      ],
    },
  },
);
