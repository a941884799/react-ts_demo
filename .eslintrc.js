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
    'eslint:recommended',
  ],
  plugins: ['react', 'prettier', '@typescript-eslint'], // 定义了该eslint文件所依赖的插件
  rules: {
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'import/named': 2,
    'no-unused-vars': 0,
  },
  ignorePatterns: ['_import_production.jsx'], // 这个文件eslint有bug
  // 针对某一类文件进行特定配置
  overrides: [
    {files: ['./build/*.js'], rules: {'@typescript-eslint/no-var-requires': 0}},
    {files: ['./src/*/*.d.ts'], rules: {'no-undef': 0, '@typescript-eslint/no-unused-vars': 0}},
  ],
  // Env环境变量配置，形如console属性只有在browser环境下才会存在，如果没有设置会报console is undefined。
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
    // 让 import/parsers 能解析ts文件的导入
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
  // 防止使用全局变量时报错 'readonly' 'writable' 'off'
  globals: {
    // 在webpack plugins中定义的全局常量
    _: 'readonly', // Lodash
    globalBoolean: 'readonly',
    globalAge: 'readonly',
    globalName: 'readonly',
    globalObj: 'readonly',
    // 全局ts类型命名空间
    Types: 'readonly',
  },
}
