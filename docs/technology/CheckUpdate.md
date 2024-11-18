---
sticky: 500
tag:
 - Technology
---

# 前端重新部署通知用户刷新网页实现方案

> 💡 Tips：在现代的Web应用中，频繁的更新和部署是常态。为了确保用户能够及时获取到最新的功能和修复，我们需要一种机制来通知用户当应用有更新时刷新页面。

## 原理

前端项目在构建时，会生成一个构建时间，这个时间会被写入到 `index.html` 文件的 `<head>` 标签中。如：
```html
<meta name="buildTime" content="2024-11-15 10:34:07">
```
接着，我们可以从 `index.html` 中获取到这个构建时间，然后和原来的构建时间进行比较，如果发现版本有更新，则提示用户刷新页面。

## 实现步骤

1. 在 `.env` 文件中新增一个环境变量 `VITE_APP_AUTO_UPDATE`，用于控制应用是否启用自动检测更新，这样方便我们随时切换。
```ts
# 控制应用是否自动检测更新
VITE_APP_AUTO_UPDATE = true
```

2. 在 `vite.config.ts` 文件中，获取构建时间。
```ts
export default defineConfig(({ mode }) => {
  // 获取构建时间
  const buildTime = getBuildTime();
  return {
    // ...其他配置
    plugins: [vue(), vueJsx(), setupHtmlPlugin(buildTime)], // 注册自定义的HTML插件来插入构建时间
    define: {
      BUILD_TIME: JSON.stringify(buildTime) // 定义全局常量BUILD_TIME，存储构建时间的字符串表示
      // global.d.ts文件记得新增：declare const BUILD_TIME: string; 不然会报ts错误
    }
  }
})
```

3. `getBuildTime` 和 `setupHtmlPlugin` 函数实现：
```ts
/** getBuildTime() 函数实现 */

import dayjs from 'dayjs'; // 导入 dayjs 库
import utc from 'dayjs/plugin/utc'; // 导入 UTC 插件
import timezone from 'dayjs/plugin/timezone'; // 导入时区插件

// 定义获取构建时间的函数
export function getBuildTime() {
  dayjs.extend(utc); // 启用 UTC 插件
  dayjs.extend(timezone); // 启用时区插件

  // 获取当前时间，并格式化为上海时区的时间字符串
  const buildTime = dayjs.tz(Date.now(), 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');

  return buildTime; // 返回构建时间
}
```
```ts
/** setupHtmlPlugin() 函数实现 */

import type { Plugin } from 'vite';

export function setupHtmlPlugin(buildTime: string) {
  const plugin: Plugin = {
    name: 'html-plugin', // 插件名称，用于标识插件
    apply: 'build', // 指定插件的应用阶段为构建时，即执行build命令才会执行该插件
    /**
     * html转换
     * 即给 index.html 文件中的 <head> 标签头部插入meta构建时间
     * @see https://vitejs.cn/vite5-cn/guide/api-plugin.html#transformindexhtml
     */
    transformIndexHtml(html) {
      return html.replace('<head>', `<head>\n    <meta name="buildTime" content="${buildTime}">`);
    }
  };

  return plugin;
}
```

4. 核心函数实现：比较构建时间，通知用户刷新页面
> 这里给出了两种更新检测的方式，可根据情况选择，一种是监听页面可见性变化（优点：消耗少），一种是定时检查（优点：实时性高）。

```ts
// 版本检测方式: 'visibility' 页面可见性变化 | 'interval' 定时检查
const CHECK_TYPE: 'visibility' | 'interval' = 'visibility';

export function setupAppVersionNotification() {
  // 检查是否启用自动更新
  const canAutoUpdateApp = import.meta.env.VITE_APP_AUTO_UPDATE === 'true';
  if (!canAutoUpdateApp) return;

  // 用于标记是否已显示更新提示
  let isShow = false;

  // 抽取公共的版本检查逻辑
  async function checkVersion() {
    // 检查前置条件：未显示更新提示且不处于开发环境
    const preConditions = [!isShow, !import.meta.env.DEV];
    if (!preConditions.every(Boolean)) return;

    // 获取HTML中的构建时间
    const buildTime = await getHtmlBuildTime();
    // 如果构建时间与当前时间相同，则不进行任何操作
    if (buildTime === BUILD_TIME) return;

    // 标记为已显示更新提示
    isShow = true;
    // 弹出确认框提示用户有新版本
    if (confirm('检测到新版本,请刷新页面获取最新内容')) {
      // 用户确认后重新加载页面
      location.reload();
    }
  }

  // 根据检测方式设置相应的事件监听或定时检查
  if (CHECK_TYPE === 'visibility') {
    // 监听页面可见性变化（缺点：如果用户一直停留在当前页面，则不会触发版本检测提示）
    document.addEventListener('visibilitychange', async () => {
      // 页面变为可见时，执行版本检查
      if (document.visibilityState === 'visible') {
        await checkVersion();
      }
    });
  } else {
    // 如果检测方式为定时检查，则设置定时器
    const CHECK_INTERVAL = 5 * 60 * 1000; // 每5分钟检查一次，可自行修改
    setInterval(checkVersion, CHECK_INTERVAL);
  }
}

async function getHtmlBuildTime() {
  // 发起请求获取index.html页面内容，附加当前时间戳防止缓存影响
  const res = await fetch(`/index.html?time=${Date.now()}`);

  // 读取响应文本内容
  const html = await res.text();

  // 使用正则表达式匹配页面中的构建时间元数据
  const match = html.match(/<meta name="buildTime" content="(.*)">/);

  // 如果匹配成功，返回构建时间；否则返回空字符串
  const buildTime = match?.[1] || '';

  return buildTime;
}

```

5. 在`main.ts`文件中调用`setupAppVersionNotification`函数，启动版本检测。
```ts
import { setupAppVersionNotification } from './plugins/setupAppVersionNotification';

const setupApp = async () => {
  // 创建Vue应用实例
  const app = createApp(App);

  // // 配置并初始化路由
  // await setupRouter(app);

  // // 设置全局组件
  // setupGlobCom(app);

  // // 配置pinia状态管理
  // setupStore(app);

  // 设置应用版本更新通知
  setupAppVersionNotification();

  // 挂载Vue应用到DOM
  app.mount('#app');
};

setupApp();
```

## 效果展示

> 页面可见性变化检测

![](https://huangmingfu.github.io/drawing-bed/images/pic-go/202411151200356.gif)

> 定时检查

![](https://huangmingfu.github.io/drawing-bed/images/pic-go/202411151200631.gif)

## 其他方案

> 1. API接口请求version版本控制：
> 我们还可以通过请求后端API，比较version来实现版本控制。前端定期请求一个API接口，获取当前的版本信息，如果发现版本有更新，则提示用户。
> （缺点：每次需要commit一个新版本号比较麻烦）
```ts
/** 简单示例代码 */
interface VersionInfo {
  version: string
  forceUpdate: boolean
  updateContent: string
}

const currentVersion = import.meta.env.VITE_APP_VERSION
const checkInterval = 1000 * 60 * 60 // 每小时检查一次

export function setupVersionCheck() {
  const hasNewVersion = ref(false)

  async function checkVersion() {
    try {
      const res = await axios.get<VersionInfo>('/api/version')
      if (res.data.version !== currentVersion) {
        hasNewVersion.value = true
        if (res.data.forceUpdate) {
          // 强制更新逻辑
          window.location.reload()
        }
      }
    } catch (error) {
      console.error('Version check failed:', error)
    }
  }

  // 初始检查
  checkVersion()

  // 定时检查
  if (import.meta.env.VITE_APP_AUTO_UPDATE === 'true') {
    setInterval(checkVersion, checkInterval)
  }

  return {
    hasNewVersion
  }
}
```
> 2. 比较script标签的hash值文件指纹：[详见](https://juejin.cn/post/7185451392994115645)


## 结论

通过以上几种方法，我们可以有效地在前端应用重新部署后通知用户刷新网页，尽量确保用户总是使用最新版本的应用。每种方法有其适用场景，可以根据实际需要选择合适的实现方式。 
