/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-strongly-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: ['@typescript-eslint', 'prefer-arrow'],
  rules: {
    '@typescript-eslint/typedef': [
      'error',
      {
        arrowParameter: true,
        parameter: true,
        propertyDeclaration: true,
        variableDeclaration: true,
        variableDeclarationIgnoreFunction: true,
      },
    ],
    eqeqeq: 'error',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'prefer-arrow/prefer-arrow-functions': ['error'],
    camelcase: ['error', { properties: 'always' }],
    'no-console': 'error',
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'error',
    'prefer-template': 'error',
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'always',
        },
      },
    ],
    'vue/no-setup-props-destructure': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
  },
};
