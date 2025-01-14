---
sticky: 500
tag:
 - Technology
---

# 深入js，知识巩固

## 深入理解浏览器事件循环与异步编程

浏览器的事件循环是 JavaScript 异步执行的基础。在 JavaScript 中，所有的操作都会被放入任务队列中，事件循环通过不断地检查任务队列，决定哪些任务可以执行。任务队列分为微任务队列（Microtask Queue）和宏任务队列（Macrotask Queue）。

- **宏任务**：包括 `setTimeout`、`setInterval`、I/O、UI 渲染等。
- **微任务**：包括 `Promise.then/catch/finally`、`MutationObserver` 等。

**示例：**

```javascript
console.log('start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('promise');
});

console.log('end');
```

**输出：**

```
start
end
promise
setTimeout
```

## 内存管理：JavaScript 中的垃圾回收

垃圾回收机制是 JavaScript 引擎的重要部分。它的目的是自动回收不再使用的内存，避免内存泄漏。在 JavaScript 中，垃圾回收的算法主要基于 **标记-清除（Mark-and-Sweep）** 和 **引用计数（Reference Counting）**。

**垃圾回收的触发：**
- **标记阶段**：通过从根对象开始遍历所有可达对象，标记那些不再使用的对象。
- **清除阶段**：清除标记为不可达的对象，释放内存。

**常见的内存泄漏：**
- **全局变量**：未清除的全局变量可能导致内存泄漏。
- **闭包**：闭包持有对外部函数的引用，可能会导致不必要的内存占用。
- **定时器**：`setInterval` 和 `setTimeout` 如果没有清除，会造成内存泄漏。

**防止内存泄漏的小技巧：**
- 使用 `let` 和 `const` 来声明变量，避免意外的全局变量。
- 确保在不需要时清除定时器。
- 使用 `WeakMap` 和 `WeakSet` 来避免对 DOM 元素等的强引用。

## CSS 变量与动态主题

CSS 变量（Custom Properties）使得我们可以在 CSS 中创建可重用的变量，动态改变样式非常方便。它们是 CSS 中的一种新特性，支持在 JavaScript 中进行动态修改。

**基本用法：**

```css
:root {
  --main-color: #3498db;
  --font-size: 16px;
}

body {
  color: var(--main-color);
  font-size: var(--font-size);
}
```

**动态修改：**

```javascript
document.documentElement.style.setProperty('--main-color', '#e74c3c');
```

动态主题切换非常简单，我们可以利用 CSS 变量来实现一个主题切换功能。

**示例：**

```html
<button onclick="changeTheme()">切换主题</button>

<script>
function changeTheme() {
  const currentColor = getComputedStyle(document.documentElement).getPropertyValue('--main-color');
  if (currentColor === 'rgb(52, 152, 219)') {
    document.documentElement.style.setProperty('--main-color', '#e74c3c');
  } else {
    document.documentElement.style.setProperty('--main-color', '#3498db');
  }
}
</script>
```

## 响应式设计中的视口单位

在响应式设计中，视口单位（`vw`、`vh`、`vmin`、`vmax`）非常有用。它们根据浏览器窗口的尺寸来动态调整元素的大小。可以有效实现适配各种屏幕尺寸的布局。

- **vw**：视口宽度的 1%。
- **vh**：视口高度的 1%。
- **vmin**：视口宽度和高度中的较小值的 1%。
- **vmax**：视口宽度和高度中的较大值的 1%。

**示例：**

```css
.container {
  width: 80vw; /* 容器宽度为视口宽度的 80% */
  height: 60vh; /* 容器高度为视口高度的 60% */
}
```

通过使用视口单位，我们可以确保布局在不同屏幕尺寸下都有良好的表现。

## Web Workers：多线程处理

JavaScript 本身是单线程的，但使用 Web Workers 可以在后台线程中执行计算密集型任务，避免阻塞主线程，提升页面的响应性。

**示例：**

```javascript
// main.js
const worker = new Worker('worker.js');

worker.onmessage = function(e) {
  console.log('Worker said: ', e.data);
};

worker.postMessage('Hello, Worker!');
```

```javascript
// worker.js
onmessage = function(e) {
  console.log('Main thread says: ', e.data);
  postMessage('Hello, Main Thread!');
};
```

Web Workers 的优势在于它们可以让复杂计算和数据处理在主线程之外进行，从而提升页面的性能和响应速度。