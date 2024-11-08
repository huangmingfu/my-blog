---
top: 2
tag:
 - Technology
---

# 🤧 博客搭建踩坑记录 

## 一、部署到gitee pages 样式不生效
`原因：`**打包后的路径不匹配，对应不上相关的js、css等文件**  
`解决：`  
```shell
base必须配置，否则打包会丢失css样式！！

根目录配置 /，那么对应 https://yiov.github.io/

仓库 vitepress 配置 /vitepress/ ，那么对应 https://yiov.github.io/vitepress

在config文件配置base：不需要多添加域名、协议那些，如下示例：
export default defineConfig({
    base: '/my-blog/',
})

```
![](https://huangmingfu.github.io/drawing-bed/images/technology/blog-tread-01.png)

## 二、样式生效了，但是头像、网页fav图标不展示
`原因：`**同样是路径匹配不上**
`解决：`  
```shell
head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    ['link', { rel: 'icon', href: '/my-blog/favicon.ico' }]
  ],

// 设置logo，这里不需要添加/my-blog/基础路径
    logo: '/logo.jpg',

    打包后：
    <link rel="icon" href="/my-blog/favicon.ico">
```

## 三、路由跳转问题
`原因：`**gitee的配置问题，服务集成->Pages 单页面应用支持策略**
[gitee文档描述](https://help.gitee.com/services/gitee-pages/spa-support)  
`解决：`  
```shell
在public下添加:
.spa文件（不需要写什么内容）

官方描述：
通过在 Gitee Pages 部署根目录增加名为 .spa 文件，即可开启支持单页应用的支持。
```

## 四、网站浏览量、统计量问题
**`这里用的是`**[不蒜子](http://busuanzi.ibruce.info/)**`实现的，非常的简单易上手，但是在开发运行会展示如下效果：`**  
> 👁️‍🗨️总访问量：6441970  
👤访客数：3810459

`解决：`  
```shell
可以直接无视，部署上去会自动从0开始计算
```

## 五、构建报navigator、windows不存在
`原因：`**构建是node环境的，所以不存在，打包失败**  

> 可以参考[vitepress文档访问浏览器 API 的库](https://vitepress.dev/zh/guide/ssr-compat)

## 👽额外记录
### 搭建自动gitee推送
::: tip
> `在package.json的scripts里添加：
"deploy": "rm -rf docs/.vitepress/dist && pnpm run build && git add . && git commit -m \"gitee 自动推送\" && git push -u origin master && git subtree push --prefix docs/.vitepress/dist origin gh-pages"`
>   
> **解释**  
> git subtree push --prefix docs/.vitepress/dist origin gh-pages: 
将指定目录（docs/.vitepress/dist）的内容推送到远程仓库的 gh-pages 分支。这通常用于将构建后的静态网站文件推送到特定分支，以便在类似 GitHub Pages 或 Gitee Pages 等平台上托管静态网站。
> 
> 注意：在.gitignore上将dist移除，；git subtree push要在push master 之后执行

> 尝试过使用rimraf库： npm install rimraf --save-dev  
代码：rimraf docs/.vitepress/dist  
来将dist文件删除，以免在master上提交上去，但是经过一系列尝试，发现没办法同时推送两个分支，会有报错，未找到合适方法，就干脆两个分支也一起提交了上去  
:::

### 历程总结
**为了搭建此博客，也经历了不少，基本路程是这样的：**  
**`技术选型->主题选择->修改配置->编辑文章->搭建图床->打包部署`**