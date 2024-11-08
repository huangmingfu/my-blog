import BlogTheme from '@sugarat/theme'
import { h } from 'vue';
import LayoutBottom from './src/components/LayoutBottom.vue';
// 自定义样式重载
import './style.scss'
// 自定义主题色
// import './user-theme.css'
//浏览量
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
//音乐播放插件
import vitepressMusic from 'vitepress-plugin-music'
import 'vitepress-plugin-music/lib/css/index.css'
import { musicPlaylist } from './src/utils/tool';

export default {
    extends: BlogTheme,
    //@ts-ignore
    Layout: h(BlogTheme.Layout, undefined, {
        //https://vitepress.dev/zh/guide/extending-default-theme#layout-slots全量插槽文档
        'layout-bottom': () => h(LayoutBottom)
    }),
    async enhanceApp({ app, router }) {
        //访问量统计
        if (inBrowser) {
            router.onAfterRouteChanged = () => {
                busuanzi.fetch()
            }
        }
        //音乐插件
        vitepressMusic(musicPlaylist)
    }
}