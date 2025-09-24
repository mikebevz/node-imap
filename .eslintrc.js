module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended'  // Ensures Node.js best practices
  ],
  ignorePatterns: ['node_modules/', 'test/'],  // Ignore node_modules and dist directories
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2020,  // Use a more recent ECMAScript version
    sourceType: 'module'
  },
  rules: {
    indent: ['error', 2],  // Enforce 2-space indentation
    'linebreak-style': ['error', 'unix'],  // Enforce UNIX linebreaks
    quotes: ['error', 'single'],  // Enforce single quotes
    semi: ['error', 'always'],  // Enforce semicolons
    'no-unused-vars': ['warn'],  // Warn about unused variables
    'no-console': ['warn'],  // Warn on console.log usage
    'no-var': ['error'],  // Require let or const, not var
    'prefer-const': ['error'],  // Prefer const over let where possible
    'arrow-body-style': ['error', 'as-needed'],  // Simplify arrow function bodies when possible
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],  // Limit multiple empty lines
    'eol-last': ['error', 'always']  // Ensure newline at the end of files
  }
};
