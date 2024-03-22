---
sticky: 999
tag:
  - Technology
---

# ☠ Vue2/3 响应式原理剖析

## 一、Vue2

### 响应式原理：

#### 1.对象

> **Vue.js 2.x 中的响应式是通过使用 ES5 的 Object.defineProperty() 方法实现的（一次只能定义一个属性，如果需要监听多个属性，你需要对每个属性都调用一次 Object.defineProperty()）。这个方法允许我们定义一个对象的属性，其中包括 getter 和 setter。当对象的属性被访问或者修改时，这些 getter 和 setter 会被调用，这就是 Vue 的响应式实现。**

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

> **同样地，Vue 3 使用 Proxy 对象来监听数组的变化，包括对数组的元素的修改、添加和删除。当对数组进行变化操作时，Proxy 会捕获到这些变化并触发相应的更新。Proxy 对基本数据类型也可以监听到。**

#### 3.Proxy 和 Reflect 的简单认识

```js
/* Proxy对象允许你创建一个代理来包裹另一个对象，并拦截该对象的各种操作，
比如属性查找、赋值、函数调用等。
这使得你可以在原始操作被执行之前或之后执行自定义的行为。 */

// 创建一个简单的对象
const target = {
  name: "Alice",
  age: 30,
};

// 创建一个代理对象
const handler = {
  // 在获取属性时拦截
  get: function (target, prop) {
    console.log(`获取属性：${prop}`);
    return target[prop];
  },
  // 在设置属性时拦截
  set: function (target, prop, value) {
    console.log(`设置属性：${prop} 值：${value}`);
    target[prop] = value;
  },
};

const proxy = new Proxy(target, handler);

// 获取属性
console.log(proxy.name); // 输出：获取属性：name  Alice

// 设置属性
proxy.age = 35; // 输出：设置属性：age 值：35

console.log(proxy.age); // 输出：获取属性：age  35
```
```js
/* Reflect对象提供了一组与Proxy对象的拦截操作对应的方法，
你可以在这些方法上执行与默认行为类似的操作。
它为元编程操作提供了一种更加标准和统一的方式。 */

const target = {
  name: 'Alice',
  age: 30
};

const handler = {
  get: function(target, prop) {
    console.log(`获取属性：${prop}`);
    // 使用Reflect对象的对应方法
    return Reflect.get(target, prop);
  },
  set: function(target, prop, value) {
    console.log(`设置属性：${prop} 值：${value}`);
    // 使用Reflect对象的对应方法
    return Reflect.set(target, prop, value);
  }
};

const proxy = new Proxy(target, handler);

console.log(proxy.name); // 输出：获取属性：name  Alice

proxy.age = 35; // 输出：设置属性：age 值：35

console.log(proxy.age); // 输出：获取属性：age  35
```
## 三、Vue2和Vue3比较
### 选项式api和组合式api
> **`选项 API（Options API）`**：这是 Vue 2 中最常见的一种方式，通过在组件选项中声明 data、methods、computed、watch 等来组织代码。它将相关功能按照选项的形式组织在一起，使得组件的结构相对清晰，适合较小规模的应用或者新手入门。  
**`组合式 API（Composition API）`**：这是 Vue 3 中引入的一种全新的 API，它允许开发者根据逻辑功能来组织代码，而不是按照固定的选项。它提供了 setup 函数，使得代码更加灵活和可复用，尤其适用于大型应用或者需要更高度组织的情况。  
**`比较：`** Vue 2的选项 API一旦项目大起来功能越来越多，维护就变得困难。Vue 3的组合式 API很好的解决了这一问题，因为它可以将某一个功能模块放在一起。
### 生命周期
> setup：相当于vue2前的created周期->创建时（beforeCreate和created的结合）  
onBeforeMount：DOM即将挂载  
onMounted：DOM挂载完毕  
onBeforeUpdate：DOM即将更新  
onUpdated：DOM更新完毕  
onBeforeUnmount：即将销毁  
onUnmounted：销毁完毕  

> 添加了路由缓存后新增两个（当卸载和重新进去组件后只会执行这两个）：  
onActivated 和 onDeactivated 

### v-for和v-if优先级
> `vue2`  v-for优先级更大：v-if < v-for   
`vue3`  v-if优先级更大：v-if > v-for   

### diff算法的优化
> 当数据发生改变的时候，vue会生成新的dom树，然后和之前的dom树进行比较，也就是新旧虚拟dom的一个对比，但是在vue2中这是一个全量的比较，它是每一个节点都会进行比较，没有变化的静态内容也会进行比较，会消耗一些时间。
怎么样快速区别出更新的内容，这就是vue3所优化的一个地方。它是根据节点会不会发生变化来添加静态标记、动态标记，而后比较时会忽略所有的静态节点，只对有标记的动态节点进行对比，而且在多层的嵌套下依然有效，提高了效率。  

### 静态提升
> 以前vue2不管元素有没有更新，每次都会创建然后渲染。
vue3使用静态提升后，静态元素页面初始的时候只渲染一次，而在更新渲染的时候，不需要再创建，提升性能  

### 事件监听缓存
> 以前事件是一个动态绑定，追踪变化，现在是缓存起来进行复用，以减少事件绑定的开销  

### 响应式实现方式的升级
> Vue2用object.defineProties有两个缺点：
深层对象需要递归遍历监听；新增的对象属性需要通过$set解决无响应式。数组需要用数组方法更改才有响应式。
vue3用proxy后直接监听整个对象，无论嵌套多少层都可以监听到，同样对数组，基本类型适用。

### vue2和vue3组件通信对比
![](https://friend-z.gitee.io/drawing-bed/images/technology/blog-tread-02.png)