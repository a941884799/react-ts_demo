/** @format */

module.exports = {
  // 定义ESLint的解析器
  parser: '@typescript-eslint/parser',
  // 定义文件继承的子规范
  extends: [
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    // 使用eslint-config-prettier来禁用@typescript-eslint/eslint-plugin中与prettier冲突的ESLint规则
    'prettier/@typescript-eslint',
    // 启用eslint-plugin-prettier和eslint-config-prettier。这会将prettier错误作为ESLint错误来展示。确保这个配置放到数组的最后。
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'], //定义了该eslint文件所依赖的插件
  rules: {
    'import/no-unresolved': 2,
    'no-const-assign': 2,
    'no-undef': 2,
  },
  ignorePatterns: ['_import_production.jsx'], // 这个文件eslint有bug
  // 针对某一类文件进行特定配置
  overrides: [
    {
      files: ['./build/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
  ],
  // env环境变量配置，形如console属性只有在browser环境下才会存在，如果没有设置会报console is undefined。
  env: {
    node: true,
    browser: true,
    es2020: true,
  },
  settings: {
    // 自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      // 默认使用根目录的tsconfig.json
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  // 指定ESLint可以解析JSX语法
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    // name1: 'writable',
    // name2: 'readonly',
  },
}
