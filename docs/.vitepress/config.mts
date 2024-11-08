import { defineConfig } from 'vitepress'

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
})
