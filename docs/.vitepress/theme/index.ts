import BlogTheme from '@sugarat/theme'

// 自定义样式重载
// import './style.scss'

// 自定义主题色
// import './user-theme.css'

import { inBrowser } from 'vitepress'
//浏览量
import busuanzi from 'busuanzi.pure.js'
//音乐播放插件
import vitepressMusic from 'vitepress-plugin-music'
import 'vitepress-plugin-music/lib/css/index.css'
import { mp3Playlist } from '../../../utils/tool';

export default {
    extends: BlogTheme,
    async enhanceApp({ app, router }) {
        //访问量统计
        if (inBrowser) {
            router.onAfterRouteChanged = () => {
                busuanzi.fetch()
            }
        }
        //音乐插件
        vitepressMusic(mp3Playlist)
        //看板娘
        if (!(import.meta as any).env.SSR) {
            const { loadOml2d } = await import('oh-my-live2d');
            loadOml2d({
                sayHello: false,
                models: [
                    {
                        path: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/girls-frontline/HK416-2/normal/model.json',
                        scale: 0.05,
                        position: [60, 100],
                        stageStyle: {
                            width: 250,
                            height:350
                        }
                    }
                ],
            });
        }
    }
}