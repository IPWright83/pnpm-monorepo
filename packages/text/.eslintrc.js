const base = require('../../.eslintrc');

module.exports = {
  ...base,
  extends: ['react-app', 'react-app/jest'],
  overrides: [
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
};
