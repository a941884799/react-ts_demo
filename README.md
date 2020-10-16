# react-ts_demo
## 用react+ts+lint搭建的项目框架

## vscode配置
```json
{
  "terminal.integrated.shell.windows": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
  "files.autoSave": "off",
  "editor.tabSize": 2,
  "workbench.iconTheme": "vscode-icons",
  "workbench.tree.indent": 8,
  "prettier.useEditorConfig": true,
  "prettier.semi": true, // 是否带分号
  "prettier.singleQuote": true, // 是否为单引号
  "files.eol": "\n",
  "javascript.validate.enable": false, // 关闭vscode默认js检测程序
  "typescript.validate.enable": false, // 关闭vscode默认ts检测程序
  "eslint.options": {
    // 指定vscode的eslint所处理的文件的后缀
    "extensions": [".js", ".jsx", ".ts", ".tsx"]
  },
  "eslint.validate": ["javascript", "javascriptreact", "typescript","typescriptreact", "html"],
  // 将eslint添加为可选的格式化程序(2.1.10版eslint插件此选项失效,使用2.1.8版本)
  "eslint.format.enable": true,
  // 保存时自动修复
  "editor.codeActionsOnSave": { "source.fixAll.eslint": false },
  // 使用prettier作为默认格式化程序
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 将eslint作为以下文件默认格式化程序
  "[javascript]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[javascriptreact]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[typescript]": { "editor.defaultFormatter": "dbaeumer.vscode-eslint" },
  "[typescriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  // 取消自动更新扩展程序及vscode版本
  "extensions.autoCheckUpdates": false,
  "extensions.autoUpdate": false,
  "update.enableWindowsBackgroundUpdates": false,
  // git配置
  "git.enableSmartCommit": true,
}
```