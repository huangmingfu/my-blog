// 主题独有配置
import { getThemeConfig } from '@sugarat/theme/node'

// 开启RSS支持（RSS配置）
// import type { Theme } from '@sugarat/theme'

// const baseUrl = 'https://sugarat.top'
// const RSS: Theme.RSSOptions = {
//   title: '粥里有勺糖',
//   baseUrl,
//   copyright: 'Copyright (c) 2018-present, 粥里有勺糖',
//   description: '你的指尖,拥有改变世界的力量（大前端相关技术分享）',
//   language: 'zh-cn',
//   image: 'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
//   favicon: 'https://sugarat.top/favicon.ico',
// }

// 所有配置项，详见文档: https://theme.sugarat.top/
const blogTheme = getThemeConfig({
  // 开启RSS支持
  // RSS,

  // 搜索
  // 默认开启pagefind离线的全文搜索支持（如使用其它的可以设置为false）
  // 如果npx pagefind 时间过长，可以手动将其安装为项目依赖 pnpm add pagefind
  // search: false,

  // 主题色修改
  themeColor: 'el-blue',
  // 文章默认作者
  author: 'a无名',
  // 右侧精选文章栏目
  hotArticle: {
    title: '🔥 精选文章',
    nextText: '换一组',
    pageSize: 9,
    empty: '暂无精选内容'
  },
  // 看板娘
  oml2d: {
    mobileDisplay: true,
    models: [
      {
        // path: 'live2d_models/girls-frontline/HK416-2/normal/model.json',//本地测试浏览
        path: 'https://huangmingfu.github.io/drawing-bed/live2d_models/girls-frontline/HK416-2/normal/model.json',
        scale: 0.05,
        mobileScale: 0.03,
        position: [50, 50],
        stageStyle: {
          height: 300
        }
      },
      {
        // path: 'live2d_models/cat-black/model.json',//本地测试浏览
        path: 'https://huangmingfu.github.io/drawing-bed/live2d_models/cat-black/model.json',
        scale: 0.08,
        position: [50, 50],
        mobileScale: 0.04,
        mobilePosition: [0, 0],
        stageStyle: {
          height: 250
        }
      },
    ]
  },
  // 个人作品展示
  works: {
    title: '',
    list: [
      {
        title: 'vue3-turbo-component-lib-template',
        description: '👆 一个基于 Turborepo + Vue 3.5 + TypeScript 的现代化组件库模板',
        time: {
          start: '2024/11/22'
        },
        github: {
          owner: 'huangmingfu',
          repo: 'vue3-turbo-component-lib-template',
          branch: 'master',
        },
        status: {
          text: '积极维护中'
        },
        url: 'https://github.com/huangmingfu/vue3-turbo-component-lib-template',
        cover: ['https://huangmingfu.github.io/drawing-bed/images/pic-go/202411241135445.png', 'https://huangmingfu.github.io/drawing-bed/images/pic-go/202411241135191.png', 'https://huangmingfu.github.io/drawing-bed/images/pic-go/202411241136925.png', 'https://huangmingfu.github.io/drawing-bed/images/pic-go/202411241136535.png']
      },
      {
        title: 'my-blog',
        description: '👆 a无名的博客，一个基于vitepress+@sugarat/theme主题的博客网站',
        time: {
          start: '2024/03/08'
        },
        github: {
          owner: 'huangmingfu',
          repo: 'my-blog',
          branch: 'master',
        },
        status: {
          text: '积极维护中'
        },
        url: 'https://github.com/huangmingfu/my-blog',
        cover: ['https://huangmingfu.github.io/drawing-bed/images/technology/my-blog-01.png', 'https://huangmingfu.github.io/drawing-bed/images/technology/my-blog-02.png']
      },
      {
        title: 'react-ts-template',
        description: '👆 一套基于react18、ts、vite5的项目模板，帮助快速搭建react项目',
        time: {
          start: '2024/10/25'
        },
        github: {
          owner: 'huangmingfu',
          repo: 'react-ts-template',
          branch: 'master',
        },
        status: {
          text: '积极维护中'
        },
        url: 'https://github.com/huangmingfu/react-ts-template',
        cover: ['https://huangmingfu.github.io/drawing-bed/images/technology/react-ts-template-01.png', 'https://huangmingfu.github.io/drawing-bed/images/technology/react-ts-template-02.png', 'https://huangmingfu.github.io/drawing-bed/images/technology/react-ts-template-03.png']
      },
      {
        title: 'vue3-ts-template',
        description: '👆 一套基于vue3、ts、vite5的项目模板，帮助快速搭建vue3项目',
        time: {
          start: '2024/04/07'
        },
        github: {
          owner: 'huangmingfu',
          repo: 'vue3-ts-template',
          branch: 'master',
        },
        status: {
          text: '积极维护中'
        },
        url: 'https://github.com/huangmingfu/vue3-ts-template',
        cover:
          'https://huangmingfu.github.io/drawing-bed/images/technology/vue3-ts-template-01.png'
      },
      {
        title: 'vue3-js-template',
        description: '👆 一套基于vue3、js、vite5的项目模板，帮助快速搭建vue3、js项目',
        time: {
          start: '2023/10/09'
        },
        github: {
          owner: 'huangmingfu',
          repo: 'vue3-js-template',
          branch: 'master',
        },
        url: 'https://github.com/huangmingfu/vue3-js-template',
        cover:
          'https://huangmingfu.github.io/drawing-bed/images/technology/vue3-js-template-01.png'
      },
      {
        title: 'drawing-bed',
        description: '👆 my-blog 的个人图床',
        time: {
          start: '2024/03/08'
        },
        github: {
          owner: 'huangmingfu',
          repo: 'drawing-bed',
          branch: 'master',
        },
        status: {
          text: '积极维护中'
        },
        url: 'https://github.com/huangmingfu/drawing-bed',
        cover:
          'https://huangmingfu.github.io/drawing-bed/images/technology/drawing-bed-01.png'
      },
      {
        title: 'marathon-fitness-panoramic-game',
        description: '👆 马拉松健身全景游戏（h5横屏项目）',
        time: {
          start: '2024/04/11'
        },
        github: {
          owner: 'huangmingfu',
          repo: 'marathon-fitness-panoramic-game',
          branch: 'master',
        },
        url: 'https://github.com/huangmingfu/marathon-fitness-panoramic-game',
        cover: ['https://huangmingfu.github.io/drawing-bed/images/technology/marathon-fitness-panoramic-game-01.png', 'https://huangmingfu.github.io/drawing-bed/images/technology/marathon-fitness-panoramic-game-02.png', 'https://huangmingfu.github.io/drawing-bed/images/technology/marathon-fitness-panoramic-game-03.png']
      },
      {
        title: 'bird-tunnel',
        description: '👆 基于CocosCreator3.8.1的2d小游戏：《小鸟穿隧道》',
        time: {
          start: '2023/11/08'
        },
        github: {
          owner: 'huangmingfu',
          repo: 'bird-tunnel',
          branch: 'master',
        },
        url: 'https://github.com/huangmingfu/bird-tunnel',
        cover: ['https://huangmingfu.github.io/drawing-bed/images/technology/bird-tunnel-01.png', 'https://huangmingfu.github.io/drawing-bed/images/technology/bird-tunnel-02.png']
      },
      {
        title: 'aircraft-battle',
        description: '👆 基于CocosCreator3.8的2d小游戏：《飞机大战》',
        time: {
          start: '2023/10/10'
        },
        github: {
          owner: 'huangmingfu',
          repo: 'aircraft-battle',
          branch: 'master',
        },
        url: 'https://github.com/huangmingfu/aircraft-battle',
        cover: ['https://huangmingfu.github.io/drawing-bed/images/technology/aircraft-battle-01.png', 'https://huangmingfu.github.io/drawing-bed/images/technology/aircraft-battle-02.png', 'https://huangmingfu.github.io/drawing-bed/images/technology/aircraft-battle-03.png']
      },
    ]
  },
  // 页脚
  footer: [{
    version: false,
    copyright: {
      message: `Copyrights ©️ 2024-${new Date().getFullYear()} 丨 a无名`,
      icon: false,
    },
  },
  {
    version: false,
    message: '基于vitepress+@sugarat/theme主题'
  },
  ],



  // 友链
  // friend: [
  //   {
  //     nickname: '粥里有勺糖',
  //     des: '你的指尖用于改变世界的力量',
  //     avatar:
  //       'https://img.cdn.sugarat.top/mdImg/MTY3NDk5NTE2NzAzMA==674995167030',
  //     url: 'https://sugarat.top',
  //   },
  //   {
  //     nickname: 'Vitepress',
  //     des: 'Vite & Vue Powered Static Site Generator',
  //     avatar:
  //       'https://vitepress.dev/vitepress-logo-large.webp',
  //     url: 'https://vitepress.dev/',
  //   },
  // ],

  // 公告
  // popover: {
  //   title: '公告',
  //   body: [
  //     { type: 'text', content: '👇公众号👇---👇 微信 👇' },
  //     {
  //       type: 'image',
  //       src: 'https://img.cdn.sugarat.top/mdImg/MTYxNTAxODc2NTIxMA==615018765210'
  //     },
  //     {
  //       type: 'text',
  //       content: '欢迎大家加群&私信交流'
  //     },
  //     {
  //       type: 'text',
  //       content: '文章首/文尾有群二维码',
  //       style: 'padding-top:0'
  //     },
  //     {
  //       type: 'button',
  //       content: '作者博客',
  //       link: 'https://sugarat.top'
  //     },
  //     {
  //       type: 'button',
  //       content: '加群交流',
  //       props: {
  //         type: 'success'
  //       },
  //       link: 'https://theme.sugarat.top/group.html',
  //     }
  //   ],
  //   duration: 0
  // },
})

export { blogTheme }
