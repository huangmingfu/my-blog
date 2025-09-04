---
top: 3
sticky: 900
tag:
 - Technology
---

# H5 嵌 App，Ios/Android 兼容问题记录（持续更新）

## 共同问题

### 字体粗细显示不一致

**现象：**
同一字体（如 `font-weight: 500`）在iOS和Android上显示粗细、清晰度不一致，导致视觉稿还原度差。特别是 `font-weight: 500` 在苹果手机里面显示很粗，与 `<strong>` 标签一致的粗细。

**原因：**
iOS和Android使用不同的字体渲染引擎：
- iOS使用Quartz渲染引擎
- Android使用Skia渲染引擎

这导致对字体的抗锯齿、字重的处理方式不同。

**解决方案：**

1. **避免使用奇数字重**
   - 避免使用 300、500 等奇数字重
   - 优先使用 400(normal)、700(bold) 等浏览器支持度更好的字重

2. **使用CSS抗锯齿属性**
   ```css
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   ```
   主要对iOS有效，可以尝试调整抗锯齿效果。

3. **与设计师沟通**
   - 明确移动端双平台存在渲染差异
   - 以iOS的设计效果为主或取一个折中的显示方案

### 动画性能与卡顿

**现象：**
H5页面中的动画在移动设备上容易出现卡顿、掉帧等性能问题，影响用户体验。

**解决方案：**

1. **开启GPU加速**
   ```css
   .animated-element {
     transform: translateZ(0);
     /* 或者 */
     will-change: transform;
   }
   ```
   强制触发GPU渲染，提升动画性能。

2. **使用高性能属性**
   - 尽可能只使用 `transform` 和 `opacity` 来做动画
   - 这两个属性是性能开销最小的属性

3. **避免过度绘制**
   - 简化DOM结构，减少不必要的层级
   - 减少背景色设置

4. **必要时降级动画**
   - 通过能力检测，在低端设备上关闭一些复杂的动画效果

### 页面生命周期与App状态交互

**现象：**
- H5页面播放着音乐或视频，用户切换到后台或跳转到App其他页面，WebView可能被销毁或挂起，导致播放中断
- App锁屏或来电时，H5定时器（`setInterval`）可能被暂停，导致业务逻辑出错

**解决方案：**

1. **监听visibilitychange事件**
   ```javascript
   document.addEventListener('visibilitychange', function() {
     if (document.hidden) {
       // 页面被隐藏时，暂停媒体播放或计算耗时
       pauseMedia();
     } else {
       // 页面重新可见时，恢复播放
       resumeMedia();
     }
   });
   ```

2. **与客户端协作**
   - 通过Bridge监听App的生命周期事件（如onPause, onResume）
   - 在WebView被挂起前保存状态，恢复时再重新初始化

3. **使用Page Visibility API**
   - 根据页面是否可见来控制动画、轮询等行为

### 输入框（Input）被键盘遮挡

**现象：**
尤其是在Android端，点击页面底部的输入框，弹出的软键盘可能会遮挡输入框。

**解决方案：**
在输入框聚焦时，手动滚动页面到可视区域：

```javascript
function onInputFocus(e) {
  setTimeout(() => {
    const target = e.target;
    target.scrollIntoView({ 
      block: 'center', 
      behavior: 'smooth' 
    });
    // 或者使用 window.scrollTo
  }, 100); // 加个小延迟确保键盘已弹出
}
```

### Input数字输入框兼容性问题

**现象：**
`<input type="number">` 在移动端存在多种兼容性问题：
- Safari和IE不完全支持，iPhone上的Chrome也不支持（因为使用Safari内核）
- 虽然能弹出数字键盘，但仍能输入字符串、符号等
- 可以输入 `.`、`e`、`-`、`+` 等字符，且不会触发onChange事件
- 阿拉伯语数字无法通过onChange限制

**测试结果：**
1. `<input type="number">` - 弹起带小数点的键盘，但键盘不干净，有其它字符，可切换输入法
2. `<input type="tel">` - 弹起纯数字键盘，加#*特殊字符，不可切换输入法，但没有小数点
3. `<input type="text" pattern="\d*">` - 弹起只有数字的键盘，不可切换输入法，没有小数点

**解决方案：**
使用 `type='tel'` + 正则过滤的组合方案：

```html
<input 
  type='tel' 
  inputMode="numeric" 
  pattern="[0-9]*" 
  onChange={handleNumberChange}
/>
```

配合JavaScript过滤函数：

```javascript
// 只取数字（目的：限制只能输入阿拉伯数字）
export function onlyNumber(number) {
  const numberArr = number.toString().match(/\d+/g) || []
  return numberArr.join('')
}

function handleNumberChange(e) {
  const value = onlyNumber(e.target.value);
  // 处理过滤后的纯数字
}
```

**注意事项：**
- `inputMode="numeric"` 和 `pattern="[0-9]*"` 单独使用效果有限
- 必须结合JavaScript正则过滤才能完全限制输入
- 阿拉伯语数字不会触发onChange，需要特别处理

### 原生桥接（JS Bridge）调用方式不统一

**现象：**
iOS和Android原生提供的JS Bridge方法名、调用方式、回调机制可能不同。

**解决方案：**
封装统一SDK：在前端封装一个统一的Bridge SDK，对外提供一致的API。在内部判断平台（通过UA或客户端注入的变量），分别调用：
- iOS：`webkit.messageHandlers.xxx.postMessage`
- Android：`window.xxx.xxx`

### 1像素边框（Retina屏下的边框变粗）

**现象：**
在高清屏下设置1px的边框，看起来会比实际更粗。

**原因：**
CSS中的1px并不等于物理设备的1像素。例如，iOS的devicePixelRatio=3，1px CSS像素等于3物理像素。

**解决方案：**

1. **使用transform缩放**
   ```css
   .border-1px {
     position: relative;
   }
   .border-1px::after {
     content: '';
     position: absolute;
     bottom: 0;
     left: 0;
     width: 100%;
     height: 1px;
     background: #ccc;
     transform: scaleY(0.5);
   }
   ```

2. **使用box-shadow模拟**（效果不佳）
   ```css
   box-shadow: 0 0.5px 0 #ccc;
   ```

3. **使用border-image**（不灵活）

4. **推荐方案**
   - 使用postcss-write-svg等PostCSS插件
   - 或者直接使用SVG来绘制1px边框，兼容性最好

## iOS 特有问题

### 视频播放全屏问题

**现象：**
使用原生 `<video>` 标签播放视频时会强制进入系统全屏模式，无法实现页面内嵌播放（inline playback）。并且全屏后会出现"完成"、"AirPlay"等控件，体验与App不统一。

**解决方案：**
在video标签中添加 `playsinline` 和 `webkit-playsinline` 属性：

```html
<video 
  ref="videoRef" 
  :src="videoUrl" 
  autoplay 
  muted 
  playsinline 
  webkit-playsinline 
  @canplay="canPlay" 
  @play="playStart" 
  @ended="playEnd" 
  @error="loadErr"
></video>
```

### 键盘收起后页面未回弹（或位置错乱）

**现象：**
主要出现在iOS上。输入框聚焦键盘弹出，输入完成后键盘收起，但页面滚动位置没有自动恢复，底部留有大片空白。

**原因：**
iOS上WebView的 `overflow: scroll` 滚动在键盘收起后可能不会自动复位。

**解决方案：**
在输入框失焦（blur）时，手动强制滚动到页面顶部或某个特定位置：

```javascript
function onInputBlur() {
  setTimeout(() => {
    window.scrollTo(0, 0);
    // 或者使用
    // document.body.scrollIntoView();
  }, 100);
}
```

### 页面滚动阻尼效果

**现象：**
在iOS端，页面拉到顶部或底部后继续拖动会有"橡皮筋"回弹效果，而Android没有。有时产品不希望有这个效果。

**解决方案：**

1. **禁止页面级滚动**
   ```css
   body {
     height: 100vh;
     overflow: hidden;
   }
   ```
   改为内部div滚动（`overflow: auto`）

2. **使用第三方滚动库**
   - 使用 better-scroll、iscroll 等库来模拟滚动
   - 可以完全控制滚动行为
   - 注意：这会牺牲一些原生滚动的流畅性

### 音频自动播放限制

**现象：**
移动端浏览器普遍限制音频自动播放，`autoplay` 属性无效。

**解决方案：**
```javascript
// 必须在用户交互后播放
function playAudio() {
  const audio = document.getElementById('myAudio');
  const playPromise = audio.play();
  
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.log('自动播放失败:', error);
    });
  }
}

// 在用户首次点击后预加载音频
document.addEventListener('touchstart', function() {
  audio.load();
}, { once: true });
```

### 长按保存图片/复制文本问题

**现象：**
移动端长按图片或文本时，可能出现系统默认的保存/复制菜单，影响用户体验。

**解决方案：**
```css
/* 禁止长按选择 */
.no-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  
  /* 禁止长按弹出菜单 */
  -webkit-touch-callout: none;
}

/* 禁止图片拖拽 */
img {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
}
```

### 点击延迟（300ms延迟）

**现象：**
移动端点击事件有300ms延迟，影响用户体验。

**解决方案：**
```html
<!-- 方案1：设置viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
```

```css
/* 方案2：使用CSS touch-action */
.clickable {
  touch-action: manipulation;
}
```

```javascript
// 方案3：使用touchstart模拟点击
element.addEventListener('touchstart', function(e) {
  e.preventDefault();
  // 处理点击逻辑
});
```

### 滚动穿透问题

**现象：**
弹窗打开时，滚动弹窗内容会导致背景页面也跟着滚动。

**解决方案：**
```javascript
// 打开弹窗时
function openModal() {
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
}

// 关闭弹窗时
function closeModal() {
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
}
```

### Safari浏览器缓存问题

**现象：**
Safari浏览器对静态资源缓存过于激进，更新后用户看到的仍是旧版本。

**解决方案：**
```html
<!-- 添加版本号或时间戳 -->
<link rel="stylesheet" href="style.css?v=1.0.1">
<script src="app.js?t=20231201"></script>
```

```html
<!-- 设置meta标签 -->
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="0">
```

## Android 特有问题

### 软键盘弹出导致页面压缩

**现象：**
Android设备上，软键盘弹出时会压缩页面高度，导致布局错乱。

**解决方案：**
```javascript
// 监听窗口大小变化
let originalHeight = window.innerHeight;

window.addEventListener('resize', function() {
  const currentHeight = window.innerHeight;
  const diff = originalHeight - currentHeight;
  
  if (diff > 150) { // 键盘弹出
    document.body.style.height = originalHeight + 'px';
  } else { // 键盘收起
    document.body.style.height = 'auto';
  }
});
```

### WebView中location.href跳转失效

**现象：**
在某些Android WebView中，使用 `location.href` 或 `window.open` 跳转可能失效。

**解决方案：**
```javascript
// 优先使用原生方法
if (window.AndroidInterface && window.AndroidInterface.openUrl) {
  window.AndroidInterface.openUrl(url);
} else {
  window.location.href = url;
}
```

---

**持续更新中...**