---
sticky: 500
tag:
 - Technology
---

# Vue 项目源码结构分析

### 核心包结构

**1.运行时相关：**

`@vue/runtime-dom`
- 处理浏览器 DOM 操作
- 提供所有浏览器 API 的包装
- 处理事件处理和 DOM 属性更新

`@vue/runtime-core`
- Vue 运行时核心引擎
- 实现虚拟 DOM diff 算法  
- 组件系统和生命周期
- 响应式系统的集成

`@vue/reactivity`
- 响应式系统的核心实现
- ref/reactive API
- computed/watch API
- 依赖收集与触发更新

**2.编译时相关：**

`@vue/compiler-dom`
- 将模板字符串编译为渲染函数
- 处理指令和插值语法

`@vue/compiler-core`
- 核心编译器逻辑
- 抽象语法树（AST）生成与操作
- 模板解析和代码生成的基础实现

`@vue/compiler-sfc`
- 单文件组件（.vue 文件）编译器
- 处理 `<template>、<script> 和 <style>` 块
- 提供自定义块支持

**3.工具包：**

`@vue/shared`
- 各个包之间共享的工具函数
- 通用类型定义
- 常量定义

`@vue/server-renderer`
- 服务端渲染实现
- 同构渲染支持
- 流式渲染能力

### 项目结构

```md
packages/
  ├── compiler-core/         # 编译核心
  │   └── package.json
  ├── compiler-dom/          # DOM编译相关
  │   └── package.json  
  ├── compiler-sfc/          # 单文件组件编译
  │   └── package.json
  ├── reactivity/           # 响应式系统
  │   └── package.json
  ├── runtime-core/         # 运行时核心
  │   └── package.json
  ├── runtime-dom/          # DOM运行时
  │   └── package.json
  ├── server-renderer/      # SSR相关
  │   └── package.json
  ├── shared/              # 共享工具
  │   └── package.json
  └── vue/                 # 完整构建
      └── package.json
```

### Vue 构建产物解释  

#### 1. `vue.cjs.js`
- **用途**：这是一个兼容 CommonJS 规范的构建版本，主要用于 Node.js 环境。
- **特点**：包含模板编译器，可以在运行时解析模板。

#### 2. `vue.cjs.prod.js`
- **用途**：这是 `vue.cjs.js` 的生产版本，经过压缩和优化。
- **特点**：适合在生产环境中使用，减小文件体积，提高加载速度。

#### 3. `vue.esm-browser.js`
- **用途**：这是一个完整的构建版本，包含模板编译器，适用于浏览器环境，使用 ES 模块格式。
- **特点**：可以通过 `<script type="module">` 标签引入，支持动态编译模板。

#### 4. `vue.esm-browser.prod.js`
- **用途**：这是 `vue.esm-browser.js` 的生产版本，经过压缩和优化。
- **特点**：适合在生产环境中使用，减小文件体积，提高加载速度。

#### 5. `vue.esm-bundler.js`
- **用途**：用于与打包工具（如 webpack、rollup 和 parcel）一起使用。
- **特点**：保留带有 `process.env.NODE_ENV` 保护的生产/开发分支，不提供压缩构建。导入依赖（例如 `@vue/runtime-core`、`@vue/compiler-core`），要求所有模板预先编译。

#### 6. `vue.global.js`
- **用途**：这是一个全局版本的 Vue 构建，可以直接通过 `<script>` 标签引入到 HTML 文件中，并且会在全局作用域下挂载 Vue。
- **特点**：包含模板编译器，可以在运行时解析模板。

#### 7. `vue.global.prod.js`
- **用途**：这是 `vue.global.js` 的生产版本，经过压缩和优化。
- **特点**：适合在生产环境中使用，减小文件体积，提高加载速度。

#### 8. `vue.runtime.esm-browser.js`
- **用途**：这是一个仅包含运行时的构建版本，适用于浏览器环境，使用 ES 模块格式。
- **特点**：不包含模板编译器，要求所有模板预先编译。

#### 9. `vue.runtime.esm-browser.prod.js`
- **用途**：这是 `vue.runtime.esm-browser.js` 的生产版本，经过压缩和优化。
- **特点**：适合在生产环境中使用，减小文件体积，提高加载速度。

#### 10. `vue.runtime.esm-bundler.js`
- **用途**：用于与打包工具（如 webpack、rollup 和 parcel）一起使用。
- **特点**：仅包含运行时，要求所有模板预先编译。保留带有 `process.env.NODE_ENV` 保护的生产/开发分支，不提供压缩构建。

#### 11. `vue.runtime.global.js`
- **用途**：这是一个仅包含运行时的全局版本的 Vue 构建，可以直接通过 `<script>` 标签引入到 HTML 文件中。
- **特点**：不包含模板编译器，要求所有模板预先编译。

#### 12. `vue.runtime.global.prod.js`
- **用途**：这是 `vue.runtime.global.js` 的生产版本，经过压缩和优化。
- **特点**：适合在生产环境中使用，减小文件体积，提高加载速度。