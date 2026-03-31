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


# npm 下架策略

## 核心前提说明
注册表数据是不可变的，这意味着一旦发布，包就不能更改。我们这样做是为了保障安全和稳定性，以确保依赖这些包的用户能够正常使用。
因此，如果你曾经发布了一个名为`bob`的包，版本号为`1.1.0`，那么其他任何包都不能再以这个名称和版本号发布。即使该包已被下架，也是如此。

但是，考虑到可能会发生意外情况，我们允许你在以下情况下下架包。否则，你始终可以弃用一个包。

---

## 一、发布不到 72 小时的包
对于新创建的包，只要 npm 公共注册表中的其他包不依赖于你的包，你就可以在发布后的前 72 小时内随时下架。

## 二、发布超过 72 小时的包
无论包发布了多久，只要**同时满足以下所有条件**，你就可以下架该包：
- npm 公共注册表中的其他包不依赖于它
- 它在过去一周内的下载量不到 300 次
- 它只有一个所有者/维护者

---

## 三、如何下架
### 1. 下架单个包版本
运行以下命令：
```bash
npm unpublish <package_name>@<version>
```

### 2. 下架包的所有版本（所有版本都符合下架条件时）
运行以下命令：
```bash
npm unpublish <package_name> --force
```

---

## 四、注意事项
- 一旦 `<package>@<version>` 被使用过，你就不能再使用它了。即使你下架了旧版本，后续发布也必须使用新版本号。
- 下架包后，你将无法撤销下架操作。
- 如果完全下架包的所有版本，你将无法发布该包的任何新版本，直到 24 小时后。
