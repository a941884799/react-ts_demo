# 集成ts、react、lint、prettier的项目  

参考文档地址: 
* https://juejin.cn/post/6844903880006844424
* https://juejin.cn/post/6866403741608722445

# 统一行尾序列LF/CRLF
```shell
# 配置下面两个git配置即可统一为LF
# 提交时转换为LF，检出时不转换
git config --global core.autocrlf input
# 拒绝提交包含混合换行符的文件
git config --global core.safecrlf true


# 以下为其他参数介绍
# 提交时转换为LF，检出时转换为CRLF
git config --global core.autocrlf true
# 提交时转换为LF，检出时不转换
git config --global core.autocrlf input
# 提交检出均不转换
git config --global core.autocrlf false
# 拒绝提交包含混合换行符的文件
git config --global core.safecrlf true
# 允许提交包含混合换行符的文件
git config --global core.safecrlf false
# 提交包含混合换行符的文件时给出警告
git config --global core.safecrlf warn
```