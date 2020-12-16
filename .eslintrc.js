module.exports = {
  // 定义ESLint的解析器（esprima babel-eslint @typescript-eslint/parser）
  parser: 'babel-eslint',
  // parser 解析代码时的参数
  parserOptions: {
    ecmaVersion: 2020, // 允许解析较新的ES特性
    sourceType: 'module', // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
    ecmaFeatures: {
      jsx: true, // 允许解析JSX语法
    },
  },
  // 指定环境，每个环境都有自己预定义的全局变量，可以同时指定多个环境
  env: {
    node: true,
    browser: true, // 浏览器
    es2020: true,
  },
  // 全局变量 'readonly' 'writable' 'off'
  globals: {
    _: 'readonly', // Lodash
    globalObj: 'readonly',
  },
  // 定义了该eslint文件所依赖的插件
  plugins: [],
  // 继承插件提供的预设
  extends: [
    'eslint:recommended', // 使用eslint的推荐规则
    'prettier', // 禁用eslin中与prettier冲突的ESLint规则
    'plugin:import/recommended', // 使用eslint-plugin-import的推荐规则
    'plugin:react/recommended', // 使用eslint-plugin-react的推荐规则
    'prettier/react', // 禁用eslint-plugin-react中与prettier冲突的ESLint规则
    // 使用prettier中的样式规范，使得ESLint会检测prettier的格式问题，将格式问题以error的形式抛出
    'plugin:prettier/recommended',
  ],
  // 自定义规则,可以覆盖extends中的规则配置
  rules: {
    'import/named': 2, // 确保命名导入对应于远程文件中的命名导出
    'arrow-body-style': ['error', 'as-needed'], // 箭头函数主体样式,不使用括号将其省略（默认）
    'prefer-template': 1, // 要求使用模板字面量而非字符串连接
  },
  // 忽略文件和目录
  ignorePatterns: ['node_modules', 'dist'],
  // 针对某一类文件进行特定配置
  overrides: [
    // 针对 .ts .tsx 文件进行配置
    {
      parser: '@typescript-eslint/parser',
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended', // 使用@typescript-eslint/eslint-plugin的推荐规则
        'prettier/@typescript-eslint', // 禁用@typescript-eslint/eslint-plugin中与prettier冲突的ESLint规则
      ],
      rules: {
        // '@typescript-eslint/no-explicit-any': 2, // 禁止使用any类型
        '@typescript-eslint/explicit-module-boundary-types': 0, // 要求定义函数返回值和参数的显式类型
      },
    },
  ],
  settings: {
    // 自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/parsers': {
      // 扩展文件后缀，识别.ts,.tsx文件
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      // 解析 typescript 配置
      typescript: {
        alwaysTryTypes: true, // 默认使用根目录的tsconfig.json
      },
      // 解析 webpack 配置
      webpack: {
        config: 'build/webpack.dev.js', // 使用 build/webpack.dev.js 的配置
        env: { mode: 'dev' }, // 给 webpack 注入环境变量
      },
    },
  },
};
