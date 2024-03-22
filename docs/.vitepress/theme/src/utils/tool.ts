/* 计算距离某个时间到现在有多少天 */
export function getDiffDate(targetDate) {
    let date1 = new Date(targetDate);
    let date2 = new Date();
    date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const diff = date2.getTime() - date1.getTime();
    const diffDate = diff / (24 * 60 * 60 * 1000);
    return diffDate;
}

/* 歌单列表 */
export const musicPlaylist = [
    {
        name: '枫',
        author: '周杰伦',
        file: 'https://friend-z.gitee.io/drawing-bed/audios/枫-周杰伦.mp3',
    },
    {
        name: '你好不好',
        author: '周兴哲',
        file: 'https://friend-z.gitee.io/drawing-bed/audios/你好不好-周兴哲.mp3',
    },
    {
        name: '恶人',
        author: '孙子涵',
        file: 'https://friend-z.gitee.io/drawing-bed/audios/恶人-孙子涵.mp3',
    },
    {
        name: '够钟',
        author: '周柏豪',
        file: 'https://friend-z.gitee.io/drawing-bed/audios/够钟-周柏豪.mp3',
    },
    {
        name: '停在昨天',
        author: '乔洋',
        file: 'https://friend-z.gitee.io/drawing-bed/audios/停在昨天-乔洋.mp3',
    },
    {
        name: '我走后',
        author: '女版',
        file: 'https://friend-z.gitee.io/drawing-bed/audios/我走后-女版.mp3',
    },
    {
        name: '还是会想你',
        author: '林达浪_h3R3',
        file: 'https://friend-z.gitee.io/drawing-bed/audios/还是会想你-林达浪_h3R3.mp3',
    },
    {
        name: '后继者',
        author: '任然',
        file: 'https://friend-z.gitee.io/drawing-bed/audios/后继者-任然.mp3',
    },
    {
        name: '晚风遇见你',
        author: '陆杰awr',
        file: 'https://friend-z.gitee.io/drawing-bed/audios/晚风遇见你-陆杰awr.mp3',
    },
    {
        name: '回到夏天',
        author: '小田音乐社_傲七爷',
        file: 'https://friend-z.gitee.io/drawing-bed/audios/回到夏天-小田音乐社_傲七爷.mp3',
    },
]