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
  description: 'a无名的博客，基于 vitepress+@sugarat/theme主题 实现',
  lastUpdated: true,
  // 详见：https://vitepress.dev/zh/reference/site-config#head
  head: [
    // 配置网站的图标（显示在浏览器的 tab 上）
    ['link', { rel: 'icon', href: '/my-blog/favicon.ico' }]
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
        devOptions: {
          enabled: true,
        },
        mode: 'development',
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
