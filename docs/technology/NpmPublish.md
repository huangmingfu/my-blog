---
sticky: 500
tag:
 - Technology
---

# npm 发包

## 步骤
1. 登录 npm 官网，注册账号
2. 在包根目录下，npm login登录（会给链接打开浏览器登录）
（npm config get registry 可以查看当前的npm源，如果不是需要设置为：registry=https://registry.npmjs.org）
3. npm whoami 查看当前登录用户
4. 先打包，后发布
5. 使用 npm publish 命令发布包（pnpm publish更快）