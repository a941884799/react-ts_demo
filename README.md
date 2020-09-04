# react-ts_demo
## 用react+ts+lint搭建的项目框架

## vscode配置
```json
{
  "files.autoSave": "off",
  "editor.detectIndentation": true,
  "editor.tabSize": 2,
  "javascript.format.insertSpaceBeforeFunctionParenthesis": false,
  "files.associations": {
    "*.cjson": "jsonc",
    "*.wxss": "css",
    "*.wxs": "javascript"
  },
  "terminal.integrated.shell.windows": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
  "liveServer.settings.donotShowInfoMsg": true,
  "workbench.iconTheme": "vscode-icons",
  "workbench.tree.indent": 8,
  "prettier.useEditorConfig": true,
  "prettier.semi": true, // 是否带分号
  "prettier.singleQuote": true,
  "extensions.autoCheckUpdates": false, // 是否为单引号
  "files.eol": "\n",
  "javascript.validate.enable": false, // 关闭vscode默认js检测程序
  "eslint.options": {
    // 指定vscode的eslint所处理的文件的后缀
    "extensions": [".js", ".jsx", ".ts", ".tsx"]
  },
  //autoFixedOnSave 设置已废弃，采用如下新的设置,保存时自动修复格式
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  //autoFix默认开启，只需输入字符串数组即可
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "html"
  ],
  // 将 eslint 添加为 可选的格式化程序
  "eslint.format.enable": true,
  // 选择格式化程序
  // 使用prettier作为默认格式化程序
  // "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 使用eslint作为默认格式化程序
  "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  // 使用prettier作为json文件 格式化程序
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "diffEditor.ignoreTrimWhitespace": true,
  "typescript.format.enable": false,
  "git.enableSmartCommit": true,
}
```