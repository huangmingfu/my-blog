---
sticky: 500
tag:
 - Technology
---

# Vue 项目源码结构分析

## 核心包结构

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

## 项目结构

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

## Vue 构建产物解释  

### 通过 CDN 或不使用打包工具时

- **`vue(.runtime).global(.prod).js`**:

  - 用于在浏览器中通过 `<script src="...">` 直接使用。暴露 `Vue` 全局变量。
  - 注意全局构建版本不是 [UMD](https://github.com/umdjs/umd) 构建，而是使用 [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) 格式，仅用于通过 `<script src="...">` 直接使用。
  - 浏览器内模板编译：
    - **`vue.global.js`** 是"完整"构建，包含编译器和运行时，因此支持动态编译模板。
    - **`vue.runtime.global.js`** 仅包含运行时，需要在构建步骤中预编译模板。
  - 内联了所有 Vue 核心内部包 - 即它是一个没有依赖其他文件的单独文件。这意味着你**必须**从这个文件中导入所有内容，且只能从这个文件导入，以确保你使用的是相同的代码实例。
  - 包含硬编码的生产/开发分支，生产版本已经预先压缩。在生产环境中使用 `*.prod.js` 文件。

- **`vue(.runtime).esm-browser(.prod).js`**:
  - 用于通过原生 ES 模块导入（在浏览器中使用 `<script type="module">`）。
  - 与全局构建版本共享相同的运行时编译、依赖内联和硬编码的生产/开发行为。

### 使用打包工具时

- **`vue(.runtime).esm-bundler.js`**:

  - 用于 `webpack`、`rollup` 和 `parcel` 等打包工具。
  - 保留带有 `process.env.NODE_ENV` 守卫的生产/开发分支（必须由打包工具替换）
  - 不提供压缩版本（打包后与其他代码一起压缩）
  - 导入依赖（如 `@vue/runtime-core`、`@vue/compiler-core`）
    - 导入的依赖也是 `esm-bundler` 构建，它们会继续导入自己的依赖（如 `@vue/runtime-core` 导入 `@vue/reactivity`）
    - 这意味着你**可以**单独安装/导入这些依赖，而不会得到这些依赖的不同实例，但你必须确保它们都解析到相同的版本。
  - 浏览器内模板编译：
    - **`vue.runtime.esm-bundler.js`（默认）** 仅包含运行时，需要预编译所有模板。这是打包工具的默认入口（通过 `package.json` 中的 `module` 字段），因为使用打包工具时模板通常是预编译的（如在 `*.vue` 文件中）。
    - **`vue.esm-bundler.js`**: 包含运行时编译器。如果你使用打包工具但仍需要运行时模板编译（如 DOM 内模板或通过内联 JavaScript 字符串的模板），请使用此版本。你需要配置打包工具将 `vue` 别名指向此文件。

### 打包工具构建功能标志

[详细参考请查看 vuejs.org](https://vuejs.org/api/compile-time-flags.html)

Vue 的 `esm-bundler` 构建暴露了可在编译时覆盖的全局功能标志：

- `__VUE_OPTIONS_API__`

  - 默认值：`true`
  - 启用/禁用选项式 API 支持

- `__VUE_PROD_DEVTOOLS__`

  - 默认值：`false`
  - 在生产环境中启用/禁用开发者工具支持

- `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__`
  - 默认值：`false`
  - 在生产环境中启用/禁用详细的水合不匹配警告

不配置这些标志构建也能工作，但**强烈建议**正确配置它们以获得最终打包时的正确树摇（tree-shaking）。

### 用于服务器端渲染

- **`vue.cjs(.prod).js`**:
  - 用于通过 `require()` 在 Node.js 服务器端渲染。
  - 如果你使用 webpack 的 `target: 'node'` 打包应用并正确外部化 `vue`，这就是将被加载的构建版本。
  - 开发/生产版本是预构建的，但会根据 `process.env.NODE_ENV` 自动加载适当的文件。
