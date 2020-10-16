# react-ts_demo
## 用react+ts+lint搭建的项目框架

## vscode配置
```json
{
  "files.autoSave": "off",
  "diffEditor.ignoreTrimWhitespace": true,
  "git.enableSmartCommit": true,
  "editor.detectIndentation": true,
  "editor.tabSize": 2,
  "terminal.integrated.shell.windows": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
  "liveServer.settings.donotShowInfoMsg": true,
  "workbench.iconTheme": "vscode-icons",
  "workbench.tree.indent": 8,
  "prettier.useEditorConfig": true,
  "prettier.semi": true, // 是否带分号
  "prettier.singleQuote": true, // 是否为单引号
  "extensions.autoCheckUpdates": false,
  "files.eol": "\n",
  "javascript.validate.enable": false, // 关闭vscode默认js检测程序
  "typescript.validate.enable": false, // 关闭vscode默认ts检测程序
  "eslint.options": {
    // 指定vscode的eslint所处理的文件的后缀
    "extensions": [".js", ".jsx", ".ts", ".tsx"]
  },
  //  语言标识符数组，用于指定要对其执行验证的文件。这是一个旧的旧设置，在正常情况下应该不再需要了。默认为["javascript", "javascriptreact"]。
  // "eslint.validate": ["javascript", "javascriptreact", "typescript","typescriptreact", "html"],
  // 将eslint添加为可选的格式化程序(2.1.10版eslint此选项失效,使用2.1.8版本)
  "eslint.format.enable": true,
  // 保存时自动修复
  "editor.codeActionsOnSave": { "source.fixAll.eslint": true },
  // 使用prettier作为默认格式化程序
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 将eslint作为以下文件默认格式化程序
  "[javascript]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[javascriptreact]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[typescript]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[typescriptreact]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
}
```