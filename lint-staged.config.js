/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js,ts,jsx,tsx}': ['prettier --write', 'eslint --fix'],
  '*.{json,md,css,scss,yml,yaml}': ['prettier --write'],
};
