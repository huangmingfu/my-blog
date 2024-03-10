import BlogTheme from '@sugarat/theme'

// 自定义样式重载
// import './style.scss'

// 自定义主题色
// import './user-theme.css'

import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import { useLive2d } from 'vitepress-theme-website'
import vitepressMusic from 'vitepress-plugin-music'
import 'vitepress-plugin-music/lib/css/index.css'
import { mp3Playlist } from '../../../utils/tool';

export default {
    extends: BlogTheme,
    //访问量统计
    enhanceApp({ app, router }) {
        if (inBrowser) {
            router.onAfterRouteChanged = () => {
                busuanzi.fetch()
            }
        }
        //音乐插件
        vitepressMusic(mp3Playlist)
    },
    setup() {
        //看板娘
        useLive2d({
            enable: true,
            model: {
                url: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/girls-frontline/HK416-2/normal/model.json'
            },
            display: {
                position: 'right',
                width: '130px',
                height: '200px',
                xOffset: '0px',
                yOffset: '0px'
            },
            mobile: {
                show: true
            },
            react: {
                opacity: 0.8
            }
        })
    }
}