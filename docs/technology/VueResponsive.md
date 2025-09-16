---
sticky: 500
tag:
  - Technology
---

# ☠ Vue2/3 的对比与响应式原理剖析

## 一、Vue2

### 响应式原理：

#### 1.对象

> **Vue.js 2.x 中的响应式是通过使用 ES5 的 Object.defineProperty() 方法实现的。这个方法允许我们定义一个对象的属性，其中包括 getter 和 setter。当对象的属性被访问或者修改时，这些 getter 和 setter 会被调用，这就是 Vue 的响应式实现。（一次只能监听一个属性，如果需要监听多个属性，需要对每个属性都调用一次 Object.defineProperty()，遇到深层对象，需要进行递归遍历）**

#### 2.数组

> **Vue 2.x 中监听数组的方式是通过重写数组的变异方法（mutator methods），比如 push()、pop()、shift()、unshift()、splice()、sort() 和 reverse() 等。Vue 在这些方法被调用时，会触发视图的更新。**

#### 3.基本数据类型

> **也就是放在 data 对象里**

```ts
data: {
  message: "Hello, Vue!";
}
```

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

> **Vue3 主要基于 ES6 的 Proxy 对象，使用 Proxy 对象来监听对象的属性的变化。当对对象的属性进行修改、添加或删除时，Proxy 会捕获到这些变化并触发相应的更新。**

#### 2.数组

> **Proxy 也可以监听数组的变化，包括对数组的元素的修改、添加和删除。当对数组进行变化操作时，Proxy 会捕获到这些变化并触发相应的更新。**

#### 3.基本数据类型

> **通过 class RefImpl 的 get 和 set 可以劫持到变化**

```ts
export function ref(value?: unknown) {
  return createRef(value, false)
}

function createRef(rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) {
    return rawValue
  }
  return new RefImpl(rawValue, shallow)
}

// RefImpl类
constructor(
  value: T,
  public readonly __v_isShallow: boolean,
) {
  this._rawValue = __v_isShallow ? value : toRaw(value)// 保留原始值，用于比较新值和旧值，可以避免不必要的触发更新，从而提高性能
  this._value = __v_isShallow ? value : toReactive(value)
}

export const toReactive = <T extends unknown>(value: T): T =>
  isObject(value) ? reactive(value) : value // 如果是对象/数组类型，则使用reactive（reactive只能将引用类型变成响应式，而ref可以将引用类型和基本类型都变成响应式的原因所在）

// 数组也是为true
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object'
```

#### 3.原理总结
> `被代理对象中的任意属性发生修改，都应该将用到了这个属性的各个函数（副作用函数）重新执行一遍，那么在此执行之前，就需要先为每一个属性都做好副作用函数的收集（依赖收集）`

> effect: 回调函数，为被代理的对象加入依赖于它的处理函数  
track：（依赖追踪/收集）在访问属性时收集依赖，记录哪些属性被哪些 effect 函数依赖。为每一个被代理的对象加入依赖它的函数(effect)  
trigger：（依赖触发）在属性发生变化时，触发所有依赖于该属性的 effect 函数重新执行。 

```ts
get value() {
  track(this,'value') // 为this对象做依赖收集
  return this._value
}

set value(newVal) {
  if (newVal !== this._value) {
    this._value = convert(newVal)
    trigger(this, 'value') // 触发掉 'value' 上的所有副作用函数
  }
}
```

#### 4.Proxy 和 Reflect 的简单认识

::: tip Proxy  
const p = new Proxy(target, handler)  
**参数:**  
target:要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）  
handler:一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

**注意：**  
1.Proxy 可以代理对象、数组，不能代理基本数据类型，会报错。Proxy 常常搭配 Reflect 使用

2.访问 proxyObj 的深层属性时，并不会触发 set。所以 proxy 如果想实现深度监听，需要再次使用 proxy 对对象中的对象属性代理

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

// 只执行了set
proxyObj.age = 35; //输出：设置属性：age 值：35

// 只执行了get，没有执行set，但是是修改成功的。
// 只执行了 get 没有执行 set 是因为 family 属性本身也是一个对象，
// 当访问 proxyObj.family 时，get 拦截器会被触发，
// 因此，对 family 对象的修改并不会触发 proxyObj 的 set 拦截器。
// 而属性的值还是被修改成功，这是因为 proxyObj.family 返回的不是代理对象，
// 而是原始的 family 对象。因此，当你直接修改 family 对象的属性时，不会触发 proxyObj 的 set 拦截器
proxyObj.family.father = "王五"; //输出：获取属性：family

// 只执行了set
proxyObj.family = { a: "test" }; //输出：设置属性：family 值：{a:'test'}

// 只执行了get
console.log(proxyObj.family.father); //输出：获取属性：family (李四)

// 只执行了get
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

### monorepo
> 在Vue2.x中，将代码根据功能模块进行了划分，像complier（编译）、core（运行时）、platforms（平台相关）等，但它是所有的代码都在src目录下，本质上还是一个项目。  
> ![](https://huangmingfu.github.io/drawing-bed/images/pic-go/202412221111840.png)
> 在Vue3.x中，则是拆分了不同的packages。  
> ![](https://huangmingfu.github.io/drawing-bed/images/pic-go/202412221111513.png)
> 这样以来，模块拆分粒度更细，职责划分更明确，开发人员也更容易阅读和理解，提高了维护性。  
> 另外，它允许一些功能包，如reactivity（响应式库），可以独立于Vue.js使用，这也是最初大家尝鲜时使用最多的包。

### TypeScript
> Vue.js 1.x的时候还没有用类型语言，当时也还不流行，到了Vue.js 2.x，作者选择了Flow，Flow是Facebook出品的静态类型检查工具，能以低成本迁入现有项目，但缺点是对于复杂场景的类型检查支持并不好。  
到了Vue.js 3.x，整个前端行业与几年前已不能同日而语，TypeScript在全世界流行开来，它提供了更好的类型检查，能支持复杂的类型推导，而且有着强大又活跃的生态，所以，Vue.js 3.x很自然地用TypeScript进行重构。

### API优化：选项式 api 和组合式 api

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

### 编译优化
> Vue.js 2.x中，数据更新的粒度是组件级，虽然能保证更新的组件最小化，但组件内部依然要遍历整个vnode树，这样做的缺点，就是组件内的元素和内容并不都是动态变化的，在进行前后状态对比时，有些对比是浪费掉的。  

> 理想情况是，**只关注和处理动态的部分**，Vue.js 3.x做到了。  

> 它通过编译阶段对静态模板分析，生成了Block Tree，Block Tree是将模板基于动态节点切割的区块，每个区块内部是固定的，借助于此，将代码更新的性能从与整体大小相关提升到了与动态内容数量相关，是非常大的突破。

#### diff 算法的优化
> 当数据发生改变的时候，vue 会生成新的 dom 树，然后和之前的 dom 树进行比较，也就是新旧虚拟 dom 的一个对比，但是在 vue2 中这是一个全量的比较，它是每一个节点都会进行比较，没有变化的静态内容也会进行比较，会消耗一些时间。
> 怎么样快速区别出更新的内容，这就是 vue3 所优化的一个地方。它是根据节点会不会发生变化来添加静态标记、动态标记，而后比较时会忽略所有的静态节点，只对有标记的动态节点进行对比，而且在多层的嵌套下依然有效，提高了效率。

### 静态提升
> 以前 vue2 不管元素有没有更新，每次都会创建然后渲染。
> vue3 使用静态提升后，静态元素页面初始的时候只渲染一次，而在更新渲染的时候，不需要再创建，提升性能

### 事件监听缓存
> 以前事件是一个动态绑定，追踪变化，现在是缓存起来进行复用，以减少事件绑定的开销

### 体积优化，更好的 Tree-shaking（如果没用到，就不会被打包进来）

| 特性 | Vue 2 | Vue 3 | 对 Tree-shaking 的影响 |
| --- | --- | --- | --- |
| **API 组织方式** | 全局 API，挂载在 `Vue` 上 | 模块化，命名导出 | Vue 3 允许按需引入，未使用的可被摇掉 |
| **代码结构** | 耦合度高，单体式 | 解耦，模块化 | Vue 3 的内部结构更易于静态分析 |
| **编译时/运行时** | 耦合较紧密 | 完全分离 | Vue 3 可单独使用运行时，移除编译器大幅减重 |

因此，Vue 3 通过全新的、面向 ESM 的模块化设计，极大地提升了 Tree-shaking 的效率，使得基于 Vue 3 的项目，尤其是那些只使用了部分功能的小型项目，最终打包体积可以远小于同等复杂度的 Vue 2 项目。这是其现代化和面向未来设计的一个重要体现。

> 通过 Tree shaking，Vue3 给我们带来的好处是：  
> 减少程序体积（更小）  
> 减少程序执行时间（更快）  
> 便于将来对程序架构进行优化（更友好）

### 数据劫持优化：响应式实现方式的升级

> Vue2 用 object.defineProties 有以下几个缺点：  
> 1.一次只能对一个属性进行监听，需要遍历来对所有属性监听；  
> 2.在遇到一个对象的属性还是一个对象的情况下（嵌套），需要递归监听，会消耗一些时间、性能，而且是直接默认就进行深度遍历，将里面的所有属性都变成响应式；  
> 3.新增的对象属性监听不到，需要进行手动监听（vue2 通过$set 解决）；  
> 4.对于数组通过 push、unshift 方法增加的元素，无法监听（vue2 通过改写数组方法解决）。

vue3 用 proxy 后直接监听整个对象，无论嵌套多少层都可以监听到（proxy 的 get 方法），同样对数组适用；深层嵌套对象也是需要递归监听，但不是一上来就直接递归监听，而是读的时候才进行监听（一读就会变成一个proxy代理对象）。想要在vue3获得响应式，就需要操作这个代理。

### vue2 和 vue3 组件通信对比

![](https://huangmingfu.github.io/drawing-bed/images/technology/blog-tread-02.png)
