import { defineConfig } from 'vitepress'
import { VitePWA } from 'vite-plugin-pwa'

// 导入主题的配置
import { blogTheme } from './blog-theme'

// Vitepress 默认配置
// 详见文档：https://vitepress.dev/reference/site-config
export default defineConfig({
  // 继承博客主题(@sugarat/theme)
  extends: blogTheme,
  base: '/my-blog/',
  lang: 'zh-cn',
  title: 'a无名',
  description: 'a无名的博客，基于 vitepress+@sugarat/theme 主题实现',
  lastUpdated: true,
  // 详见：https://vitepress.dev/zh/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    ['link', { rel: 'icon', href: '/my-blog/favicon.ico' }],
    // PWA相关配置
    // 指定manifest文件路径
    ['link', { rel: 'manifest', href: '/my-blog/manifest.webmanifest' }],
    // 主题颜色（移动端浏览器地址栏颜色）
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    // iOS Safari支持
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'a无名博客' }],
    ['link', { rel: 'apple-touch-icon', href: '/my-blog/logo.jpg' }],
    // Microsoft Tiles支持
    ['meta', { name: 'msapplication-TileImage', content: '/my-blog/logo.jpg' }],
    ['meta', { name: 'msapplication-TileColor', content: '#ffffff' }],
    // 注册Service Worker
    ['script', { src: '/my-blog/registerSW.js' }],
  ],
  themeConfig: {
    // 展示 2,3 级标题在目录中
    outline: {
      level: [2, 3],
      label: '目录'
    },
    // 默认文案修改
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '相关文章',
    lastUpdatedText: '上次更新于',

    // 设置logo
    logo: '/logo.jpg',
    // editLink: {
    //   pattern:
    //     'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
    //   text: '去 GitHub 上编辑内容'
    // },
    nav: [
      { text: '首页', link: '/' },
      { text: '关于作者', link: '/me/AboutMe' }
    ],
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/huangmingfu'
      }
    ]
  },
  //markdown配置
  //不开启：图片一次性加载出来，图片越多加载越慢
  //开启：快速打开网页，当访问到了图片的位置，它再加载出来
  markdown: {
    image: {
      // 开启图片懒加载
      lazyLoading: true
    },
  },
  vite: {
    plugins: [
      VitePWA({
        // 指定PWA构建输出目录（VitePress的输出目录）
        outDir: ".vitepress/dist",
        devOptions: {
          // 在开发环境中启用 PWA 功能
          enabled: true,
          // 抑制警告信息
          suppressWarnings: true,
          // 服务工作者的类型为 module
          type: "module",
        },
        // 设置服务工作者注册类型为 "prompt"，提示用户更新
        registerType: "prompt",
        // 内联注入服务工作者注册代码（VitePress推荐使用inline）
        injectRegister: "script",
        // 禁用PWA资产生成（需要额外安装依赖）
        pwaAssets: {
          disabled: true,
        },
        manifest: {
          // 应用的唯一标识
          id: "/",
          // 应用的完整名称
          name: "a无名的博客",
          // 应用的短名称
          short_name: "a无名博客",
          // 应用的描述
          description: "a无名的博客，基于 vitepress+@sugarat/theme 主题实现",
          // 应用的主题颜色
          theme_color: "#ffffff",
          // 背景颜色
          background_color: "#ffffff",
          // 显示模式
          display: "standalone",
          // 启动URL
          start_url: "/my-blog/",
          // 作用域
          scope: "/my-blog/",
          // 图标配置
          icons: [
            {
              src: "/my-blog/logo.jpg",
              sizes: "192x192",
              type: "image/jpeg",
            },
            {
              src: "/my-blog/logo.jpg",
              sizes: "512x512",
              type: "image/jpeg",
            },
          ],
        },
        workbox: {
          // 缓存所有 js, css, html, svg, png, jpg, ico, woff2, txt 文件
          globPatterns: ["**/*.{js,css,html,svg,png,jpg,ico,woff2,txt}"],
          // 清理过期的缓存
          cleanupOutdatedCaches: true,
          // 立即控制所有客户端
          clientsClaim: true,
          // 跳过等待，立即激活新的Service Worker
          skipWaiting: true,
          // 运行时缓存配置，用于缓存外部资源
          runtimeCaching: [
            {
              // 匹配GitHub图床资源
              urlPattern: /^https:\/\/huangmingfu\.github\.io\/drawing-bed\/.*/i,
              // 缓存策略：优先使用缓存
              handler: "CacheFirst",
              options: {
                cacheName: "drawing-bed-cache",
                expiration: {
                  // 最大缓存条目数
                  maxEntries: 100,
                  // 缓存有效期为30天
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
                cacheableResponse: {
                  // 可缓存的响应状态码
                  statuses: [0, 200],
                },
              },
            },
            {
              // 匹配jsdelivr CDN资源
              urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
              // 缓存策略：优先使用网络
              handler: "NetworkFirst",
              options: {
                cacheName: "jsdelivr-cache",
                expiration: {
                  maxEntries: 50,
                  // 缓存有效期为7天
                  maxAgeSeconds: 60 * 60 * 24 * 7,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
      }),
      // VitePWA({
      //   /* 开发环境启用 sw */
      //   devOptions: {
      //     enabled: true,
      //   },
      //   // 指定 PWA 构建输出目录
      //   outDir: '.vitepress/dist',
      //   // 注册类型为提示用户更新
      //   registerType: 'prompt',
      //   // 不包含清单图标
      //   includeManifestIcons: false,
      //   // 自动销毁旧的 Service Worker
      //   selfDestroying: true,
      //   // 配置 PWA 清单文件
      //   manifest: {
      //     // 应用的起始路径
      //     id: '/',
      //     // 应用的完整名称
      //     name: 'Vite Plugin PWA',
      //     // 应用的短名称
      //     short_name: 'PWA for Vite',
      //     // 应用的描述信息
      //     description: 'Zero-config PWA for Vite',
      //     // 应用的主题颜色
      //     theme_color: '#ffffff',
      //     // 应用的图标配置
      //     icons: [
      //       // {
      //       //   // 图标文件路径
      //       //   src: 'pwa-192x192.png',
      //       //   // 图标尺寸
      //       //   sizes: '192x192',
      //       //   // 图标文件类型
      //       //   type: 'image/png',
      //       // },
      //       // {
      //       //   src: 'pwa-512x512.png',
      //       //   sizes: '512x512',
      //       //   type: 'image/png',
      //       // },
      //       // {
      //       //   src: 'icon_light.svg',
      //       //   sizes: '155x155',
      //       //   type: 'image/svg',
      //       //   // 图标用途
      //       //   purpose: 'any maskable',
      //       // },
      //     ],
      //   },
      //   // 配置 Workbox 用于缓存管理
      //   workbox: {
      //     // 匹配需要缓存的文件类型
      //     globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
      //     // 运行时缓存配置
      //     runtimeCaching: [
      //       {
      //         // 匹配 Google Fonts API 的 URL
      //         urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      //         // 缓存策略为优先使用缓存
      //         handler: 'CacheFirst',
      //         options: {
      //           // 缓存名称
      //           cacheName: 'google-fonts-cache',
      //           expiration: {
      //             // 最大缓存条目数
      //             maxEntries: 10,
      //             // 缓存有效期为 365 天
      //             maxAgeSeconds: 60 * 60 * 24 * 365,
      //           },
      //           cacheableResponse: {
      //             // 可缓存的响应状态码
      //             statuses: [0, 200],
      //           },
      //         },
      //       },
      //       {
      //         urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      //         handler: 'CacheFirst',
      //         options: {
      //           cacheName: 'gstatic-fonts-cache',
      //           expiration: {
      //             maxEntries: 10,
      //             maxAgeSeconds: 60 * 60 * 24 * 365,
      //           },
      //           cacheableResponse: {
      //             statuses: [0, 200],
      //           },
      //         },
      //       },
      //       {
      //         urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
      //         // 缓存策略为优先使用网络
      //         handler: 'NetworkFirst',
      //         options: {
      //           cacheName: 'jsdelivr-images-cache',
      //           expiration: {
      //             maxEntries: 10,
      //             // 缓存有效期为 7 天
      //             maxAgeSeconds: 60 * 60 * 24 * 7,
      //           },
      //           cacheableResponse: {
      //             statuses: [0, 200],
      //           },
      //         },
      //       },
      //     ],
      //   },
      // })
    ],
  },
})
