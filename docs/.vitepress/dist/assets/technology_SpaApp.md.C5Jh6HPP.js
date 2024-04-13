import{j as o,b as e,c as a,aa as t}from"./chunks/framework.BSznDLKk.js";const g=JSON.parse('{"title":"SPA（单页应用）的一些探讨 🙂","description":"","frontmatter":{"sticky":998,"tag":["Technology"]},"headers":[],"relativePath":"technology/SpaApp.md","filePath":"technology/SpaApp.md","lastUpdated":1711110799000}'),r={name:"technology/SpaApp.md"},s=t('<h1 id="spa-单页应用-的一些探讨-🙂" tabindex="-1">SPA（单页应用）的一些探讨 🙂 <a class="header-anchor" href="#spa-单页应用-的一些探讨-🙂" aria-label="Permalink to &quot;SPA（单页应用）的一些探讨 🙂&quot;">​</a></h1><div class="tip custom-block"><p class="custom-block-title">什么是SPA</p><p>单页Web应用（SPA - Single Page web Application） 也就是说只有一个HTML文件的Web应用, 我们就称之为单页Web应用, 就称之为SPA应用</p></div><h2 id="spa的特点" tabindex="-1">SPA的特点: <a class="header-anchor" href="#spa的特点" aria-label="Permalink to &quot;SPA的特点:&quot;">​</a></h2><blockquote><p><strong><code>1.SPA应用只有一个HTML文件, 所有的内容其实都在这个页面中呈现的 </code></strong><br><strong><code>2.SPA应用只会加载一次HTML文件, 不会因为用户的操作而进行页面的重新加载， 当用户与应用程序交互时, 是通过动态更新页面内容的方式来呈现不同的内容</code></strong></p></blockquote><h2 id="spa优点" tabindex="-1">SPA优点: <a class="header-anchor" href="#spa优点" aria-label="Permalink to &quot;SPA优点:&quot;">​</a></h2><blockquote><p><strong><code>1.有良好的交互体验，不会重新加载整个网页, 只是局部更新</code></strong><br><strong><code>2.前后端分离开发，前端负责页面呈现和交互, 后端负责数据</code></strong><br><strong><code>3.减轻服务器压力，只用处理数据不用处理界面</code></strong></p></blockquote><h2 id="spa缺点" tabindex="-1">SPA缺点： <a class="header-anchor" href="#spa缺点" aria-label="Permalink to &quot;SPA缺点：&quot;">​</a></h2><blockquote><p><strong><code>1.（首屏加载慢）SPA（单页应用）在初次加载时，由于需要加载所有必要的 JavaScript 和 CSS 文件，以及应用的主 HTML 文件，因此可能会产生白屏时间较长的问题，对用户体验而言是非常糟糕的。 首屏加载慢(因为要等到HTML下载完才会去下载JS/CSS, 要等到JS下载完初始化完才会去获取数据) 其中白屏时间主要影响因素之一：SPA 应用在加载完成后，需要再进行一次 DOM 渲染才能显示页面内容。在渲染过程中，可能需要加载大量的 JavaScript 文件、CSS 文件或网络请求，这些操作都需要耗费时间，从而导致白屏时间变长。</code></strong><br><br><strong><code>2.非常（依赖js环境），如果用户浏览器设置了禁用js，应用则无法打开</code></strong><br><br><strong><code>3.（安全问题）</code></strong><br><br><strong><code>4.SEO不好（页面内容是通过ajax异步获取的，爬虫不会等待异步请求完成后再抓取页面内容）</code></strong></p></blockquote><h2 id="解决单页面应用的seo困难问题" tabindex="-1">解决单页面应用的SEO困难问题： <a class="header-anchor" href="#解决单页面应用的seo困难问题" aria-label="Permalink to &quot;解决单页面应用的SEO困难问题：&quot;">​</a></h2><blockquote><p><strong><code>1.预渲染：无需服务器实时动态编译，采用预渲染，在构建时针对特定路由简单的生成静态HTML文件，本质就是客户端渲染, 只不过和SPA不同的是预渲染有多个界面。</code></strong><br><br><strong><code>2.服务端渲染ssr：后端既提供数据又提供视图和交互逻辑，也就是服务器接到客户端请求之后，找到对应的数据并根据找到的数据生成对应的视图，然后将包含数据的视图一次性发给客户端，客户端直接将渲染即可。</code></strong><br><br> 框架： nextjs、nuxtjs<br> 预渲染webpack插件： PrerenderSPAPlugin</p></blockquote>',10),c=[s];function n(d,l,p,i,S,b){return e(),a("div",null,c)}const P=o(r,[["render",n]]);export{g as __pageData,P as default};
