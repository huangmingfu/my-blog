---
sticky: 999
tag:
  - Technology
---

# ☠ Vue2/3 的对比与响应式原理剖析

## 一、Vue2

### 响应式原理：

#### 1.对象

> **Vue.js 2.x 中的响应式是通过使用 ES5 的 Object.defineProperty() 方法实现的。这个方法允许我们定义一个对象的属性，其中包括 getter 和 setter。当对象的属性被访问或者修改时，这些 getter 和 setter 会被调用，这就是 Vue 的响应式实现。（一次只能监听一个属性，如果需要监听多个属性，你需要对每个属性都调用一次 Object.defineProperty()，遇到深层对象，需要进行递归遍历）**

#### 2.数组

> **Vue 2.x 中监听数组的方式是通过重写数组的变异方法（mutator methods），比如 push()、pop()、shift()、unshift()、splice()、sort() 和 reverse() 等。Vue 在这些方法被调用时，会触发视图的更新。**

#### 3.Object.defineProperty 的简单认识

```js
// 定义一个新的属性 'name'
Object.defineProperty(obj, "name", {
  // 获取属性值时的操作
  get: function () {
    console.log(`获取属性 ${key}: ${internalValue}`);
    return internalValue;
  },
  // 设置属性值时的操作
  set: function (newValue) {
    console.log(`设置属性 ${key}: ${newValue}`);
    internalValue = newValue;
    // 这里可以添加额外的响应逻辑，比如更新UI等
  },
  // 设置属性的值为 'John'
  value: "John",
  // 设置属性为可写的
  writable: true,
  // 设置属性为可枚举的，即可被遍历
  enumerable: true,
  // 设置属性为可配置的，即可修改或删除
  configurable: true,
});
```

## 二、Vue3

### 响应式原理：

#### 1.对象

> **Vue3 主要基于 ES6 的 Proxy 对象和 Reflect 对象，使用 Proxy 对象来监听对象的属性的变化。当对对象的属性进行修改、添加或删除时，Proxy 会捕获到这些变化并触发相应的更新。**

#### 2.数组

> **同样地，Vue 3 使用 Proxy 对象来监听数组的变化，包括对数组的元素的修改、添加和删除。当对数组进行变化操作时，Proxy 会捕获到这些变化并触发相应的更新。**

#### 3.基本数据类型

> **类似于 Vue2，将基本类型包装在一个内部对象中，然后对这个对象进行代理**

#### 3.Proxy 和 Reflect 的简单认识

::: tip Proxy  
const p = new Proxy(target, handler)  
**参数:**  
target:要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）  
handler:一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

**注意：**  
1.Proxy 可以代理对象、数组，不能代理基本数据类型，会报错。Proxy 常常搭配 Reflect 使用

2.访问 proxyObj 的深层属性时，并不会触发 set。所以 proxy 如果想实现深度监听，也需要实现一个递归函数,
使用 proxy 逐个对对象中的每个属性进行拦截

3.直接 Proxy 代理是懒代理：  
&nbsp;&nbsp;&nbsp;&nbsp;set：只对第一层监听，只能拦截直接属性的赋值  
&nbsp;&nbsp;&nbsp;&nbsp;get：无论几层都可以监听到，不存在的属性仍然可以被 get 拦截到

4.代理数组：  
push 时会触发两次 get 和两次 set，这和 push 的实现原理有关：push 操作除了增加数组的数据项之外，也会引发数组本身其他相关属性的改变；  
proxyArr[1]这种修改只会执行一次。  
:::

```js
// 创建一个简单的对象
const target = {
  name: "张三",
  age: 30,
  family: {
    father: "李四",
  },
};

const handler = {
  // 在获取属性时拦截
  get: function (target, key) {
    console.log(`获取属性：${key}`);
    return target[key];
  },
  // 在设置属性时拦截
  set: function (target, key, value) {
    console.log(`设置属性：${key} 值：${value}`);
    target[key] = value;
  },
};

// 创建代理对象
const proxyObj = new Proxy(target, handler);

//执行了get
console.log(proxyObj.name); //输出：获取属性：name (张三)

// 执行了set
proxyObj.age = 35; //输出：设置属性：age 值：35

//执行了get
proxyObj.family.father = "王五"; //输出：获取属性：family

//执行了set
proxyObj.family = { a: "test" }; //输出：设置属性：family 值：{a:'test'}

//执行了get
console.log(proxyObj.family.father); //输出：获取属性：family (李四)

//执行了get
console.log(proxyObj.family.mother); //输出：获取属性：family (undefined)
```

```js
/* Reflect对象（内置）提供了一组与Proxy对象的拦截操作对应的方法 */

let target = {
  name: "John",
  age: 30,
};

let handler = {
  get: function (target, prop, receiver) {
    console.log(`获取属性：${prop}`);
    return Reflect.get(target, prop, receiver); // 使用 Reflect.get 方法获取属性值
  },
  set: function (target, prop, value, receiver) {
    console.log(`设置属性：${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver); // 使用 Reflect.set 方法设置属性值
  },
};

let proxy = new Proxy(target, handler);

console.log(proxy.name); // 输出: 获取属性：name，然后输出 John
proxy.age = 35; // 输出: 设置属性：age to 35
```

## 三、Vue2 和 Vue3 比较

### 选项式 api 和组合式 api

> **`选项 API（Options API）`**：这是 Vue 2 中最常见的一种方式，通过在组件选项中声明 data、methods、computed、watch 等来组织代码。它将相关功能按照选项的形式组织在一起，使得组件的结构相对清晰，适合较小规模的应用或者新手入门。  
> **`组合式 API（Composition API）`**：这是 Vue 3 中引入的一种全新的 API，它允许开发者根据逻辑功能来组织代码，而不是按照固定的选项。它提供了 setup 函数，使得代码更加灵活和可复用，尤其适用于大型应用或者需要更高度组织的情况。  
> **`比较：`** Vue 2 的选项 API 一旦项目大起来功能越来越多，维护就变得困难。Vue 3 的组合式 API 很好的解决了这一问题，因为它可以将某一个功能模块放在一起。

### 生命周期

> setup：相当于 vue2 前的 created 周期->创建时（beforeCreate 和 created 的结合）  
> onBeforeMount：DOM 即将挂载  
> onMounted：DOM 挂载完毕  
> onBeforeUpdate：DOM 即将更新  
> onUpdated：DOM 更新完毕  
> onBeforeUnmount：即将销毁  
> onUnmounted：销毁完毕

> 添加了路由缓存后新增两个（当卸载和重新进去组件后只会执行这两个）：  
> onActivated 和 onDeactivated

### v-for 和 v-if 优先级

> `vue2` v-for 优先级更大：v-if < v-for  
> `vue3` v-if 优先级更大：v-if > v-for

### diff 算法的优化

> 当数据发生改变的时候，vue 会生成新的 dom 树，然后和之前的 dom 树进行比较，也就是新旧虚拟 dom 的一个对比，但是在 vue2 中这是一个全量的比较，它是每一个节点都会进行比较，没有变化的静态内容也会进行比较，会消耗一些时间。
> 怎么样快速区别出更新的内容，这就是 vue3 所优化的一个地方。它是根据节点会不会发生变化来添加静态标记、动态标记，而后比较时会忽略所有的静态节点，只对有标记的动态节点进行对比，而且在多层的嵌套下依然有效，提高了效率。

### 静态提升

> 以前 vue2 不管元素有没有更新，每次都会创建然后渲染。
> vue3 使用静态提升后，静态元素页面初始的时候只渲染一次，而在更新渲染的时候，不需要再创建，提升性能

### 事件监听缓存

> 以前事件是一个动态绑定，追踪变化，现在是缓存起来进行复用，以减少事件绑定的开销

### 更好的Tree-shaking（如果没用到，就不会被打包进来）

> 在 Vue 2 中，Vue实例在项目中是单例的，很多api功能都被放在了this上，捆绑程序无法检测到该对象的哪些属性在代码中被使用到，而且由于 Vue 的源代码是使用 CommonJS 格式编写的，所以它不支持 tree shaking。这意味着即使你只使用了 Vue 的一部分功能，你的最终打包文件仍然会包含整个 Vue 库的代码。  

> 在 Vue 3 中，Vue 的源代码被重写为使用 ES Modules 格式，这使得 Vue 3 支持 tree shaking。vue3将全局 API 进行分块，这意味着如果你只使用了 Vue 的一部分功能，那么你的最终打包文件只会包含你实际使用的那部分代码，未使用的代码会被移除。这可以帮助减小最终打包文件的大小，提高应用的加载性能。  

> tree shaking的前提是所有的东西都必须用ES6 module的import来写，要充分利用 tree shaking，你还需要使用支持 tree shaking 的打包工具，如 Webpack 或 Rollup，并且需要正确配置它们。

> 通过Tree shaking，Vue3给我们带来的好处是：  
减少程序体积（更小）  
减少程序执行时间（更快）  
便于将来对程序架构进行优化（更友好）

### 响应式实现方式的升级

> Vue2 用 object.defineProties 有以下几个缺点：  
1.一次只能对一个属性进行监听，需要遍历来对所有属性监听；  
2.在遇到一个对象的属性还是一个对象的情况下，需要递归监听，会消耗一些时间、性能；  
> 3.新增的对象属性监听不到，需要进行手动监听（vue2 通过$set 解决）；  
> 4.对于数组通过 push、unshift 方法增加的元素，无法监听（vue2 通过改写数组方法解决）。

vue3 用 proxy 后直接监听整个对象，无论嵌套多少层都可以监听到（proxy 的 get 方法），同样对数组适用,基本类型是类似Vue2包装在一个内部对象中，然后对这个对象进行代理（class的get和set）。

### vue2 和 vue3 组件通信对比

![](https://huangmingfu.github.io/drawing-bed/images/technology/blog-tread-02.png)
