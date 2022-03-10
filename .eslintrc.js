module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignorePatterns: [
    '**/coverage',
    '**/node_modules',
    '**/build',
    '**/dist',
    '**/.turbo',
    '**/*.log',
  ],
};
