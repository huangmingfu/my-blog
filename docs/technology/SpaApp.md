---
sticky: 500
tag:
 - Technology
---

# SPA（单页应用）的一些探讨 🙂

::: tip 什么是SPA
单页Web应用（SPA - Single Page web Application）
也就是说只有一个HTML文件的Web应用, 我们就称之为单页Web应用, 就称之为SPA应用
:::

## SPA的特点:
> **`1.SPA应用只有一个HTML文件, 所有的内容其实都在这个页面中呈现的 `**  
> **`2.SPA应用只会加载一次HTML文件, 不会因为用户的操作而进行页面的重新加载，
当用户与应用程序交互时, 是通过动态更新页面内容的方式来呈现不同的内容`**

## SPA优点:
> **`1.有良好的交互体验，不会重新加载整个网页, 只是局部更新`**  
> **`2.前后端分离开发，前端负责页面呈现和交互, 后端负责数据`**  
> **`3.减轻服务器压力，只用处理数据不用处理界面`**

## SPA缺点：
> **`1.（首屏加载慢）SPA（单页应用）在初次加载时，由于需要加载所有必要的 JavaScript 和 CSS 文件，以及应用的主 HTML 文件，因此可能会产生白屏时间较长的问题，对用户体验而言是非常糟糕的。  
首屏加载慢(因为要等到HTML下载完才会去下载JS/CSS, 要等到JS下载完初始化完才会去获取数据)
其中白屏时间主要影响因素之一：SPA 应用在加载完成后，需要再进行一次 DOM 渲染才能显示页面内容。在渲染过程中，可能需要加载大量的 JavaScript 文件、CSS 文件或网络请求，这些操作都需要耗费时间，从而导致白屏时间变长。`**  
<br/>
> **`2.非常（依赖js环境），如果用户浏览器设置了禁用js，应用则无法打开`**  
<br/>
> **`3.（安全问题）`**  
<br/>
> **`4.SEO不好（页面内容是通过ajax异步获取的，爬虫不会等待异步请求完成后再抓取页面内容）`**  

## 解决单页面应用的SEO困难问题：

> **`1.预渲染：无需服务器实时动态编译，采用预渲染，在构建时针对特定路由简单的生成静态HTML文件，本质就是客户端渲染, 只不过和SPA不同的是预渲染有多个界面。`**  
<br/>
> **`2.服务端渲染ssr：后端既提供数据又提供视图和交互逻辑，也就是服务器接到客户端请求之后，找到对应的数据并根据找到的数据生成对应的视图，然后将包含数据的视图一次性发给客户端，客户端直接将渲染即可。`**  
<br/>
框架：
nextjs、nuxtjs  
预渲染webpack插件：
PrerenderSPAPlugin