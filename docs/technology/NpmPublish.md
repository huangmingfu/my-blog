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

## 注意
```ts
"devDependencies": {
    "@babel/helper-compilation-targets": "^7.15.4",
    "@vue/cli-plugin-babel": "^4.1.0",
    "@vue/cli-plugin-eslint": "^4.1.0",
    "@vue/cli-service": "^4.1.0"
}
```
- @your_org_name/<pkg_name>，如 `@mylib/ui` 如果想用这种结构的包名，首先需要在npm上创建自己组织（npm的organizations），创建免费的就行。[教程](https://blog.csdn.net/weixin_43990297/article/details/122359702)
