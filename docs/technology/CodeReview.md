---
sticky: 999
top: 2
tag:
  - Technology
---

# 代码规范记录（持续更新） 🙂

::: tip
记录一些规范，提高代码质量，减少 bug
:::

## 空函数清理、注释代码清理、console.log清理

## 尽量都用 === 全等

## 后面没有代码了就不要多加一个return

## 公共js方法，公共组件，要多加注释

## 不是非常有必要，不要使用any，在很多情况下，我们可以使用 unknown 来替代 any，既灵活,又可以继续保证类型安全

## provide/inject 是在解决多级透传问题的时候才能使用，而且使用要特别谨慎。因为它会将逻辑提升到组件树的更高层次来处理逻辑，会使高层组件变得更复杂。并且对于某些组件来说，不利于复用。对于全局状态的使用，都要谨慎

## 可选链在必要的情况下才能使用，禁止滥用；使用可选链简化代码
> ? 可选链操作符，虽然好用，但也不能滥用。item?.name 会被编译成 item === null || item === void 0 ? void 0 : item.name，滥用会导致编译后的代码size增大。
```ts
// bad
const handleData = (data)=> {
  const { userList } = data;
  const newList = userList.map((item)=> `用户id是${item?.id}，用户名字是${item?.name},用户年龄是${item?.age}岁了`);
}
handleData({userList: [null]})

// good
const handleData = (data)=> {
  const { userList } = data;
  const newList = userList.map((item)=> {
    const { id, name, age } = item || {};
    return `用户id是${id}，用户名字是${name},用户年龄是${age}岁了`
  });
}
handleData({userList: [null]})
```

## 内联样式不超过两个；模版不建议写复杂判断，需要放在逻辑中维护

## 变量命名需要有具体语义，不能太泛化;单一组件功能变量名允许泛化

## 变量命名采用小驼峰

## ts: interface命名用I开头，type命名用T开头，enum用E开头

## import 顺序需要按照：全局vue，UI库，第三方库，公共方法，业务方法；按从广到窄的维度引入（封装的组件放最后）：vue、ui、第三方、全局 、私有

## vue单文件模块顺序：template  script  style

- `新页面路由命名需要规范：一级菜单/二级菜单/页面名称，例子：/user/plateform/user-create。`

## swich里赋值相同的话，合并case

## 组件应用时props参数：按照 ref、class、传入、传出 顺序书写

```html
<my-components
  ref="myComponents"
  class="home-my-components"
  :data="data"
  @changeHandle="changeHandle"
/>
```

## 方法命名

> can： 判断是否可执行某个动作 函数返回一个布尔值 true 可执行 false 不可执行  
> has： 判断是否含有某个值 函数返回一个布尔值 true 含有此值 false 不含有此值  
> is： 判断是否为某个值，函数返回一个布尔值 true 为某个值 false 不为某个值  
> get： 获取某个值 函数返回一个非布尔值  
> set： 设置某个值 无返回值或者返回是否加载完成的结果

## 路由参数：query对象中属性必须是字符串；不建议传递复杂Json数据，传入标识进行查询

```bash
// bad
router.push({
  path: '/example/path',
  query: {
    isView: true,
    info: JSON.stringify(data),
  },
});
// good
router.push({
  path: '/example/path',
  query: {
    isView: '1',
    id: infoId,
  },
});
```

## 模板不能有复杂的运算，超过一层运算建议不在模版中处理

## Vue官方提供了4-5种class绑定方式，建议统一使用一种，以数组的方式动态绑定类名

```html
<div :class="['title-text', active ? 'active' : '', errorClass]">
  <!-- ... -->
</div>
```

## 不建议开发者大批量的对一个对象执行多次delete操作，原因是连续的delete操作代码显得冗余

```typescript
使用解构赋值替代对象多个属性的 delete 操作；
使用 loadsh-es 提供的方法 unset/omit 等替代 delete 操作；

// bad
const params = { /** ... */ };
delete params['attr'];
delete params['sku_id'];
delete params['id'];

// good
const params = { /** ... */ };
const { attr, sku_id, id, ...unset } = params;
```

## 函数注释

```typescript
/**
 * @Description 加入购物车
 * @Author luochen_ya
 * @Date 2024-03-13
 * @param {Number} goodId 商品id
 * @param {Array<Number>} specs sku规格
 * @param {Number} amount 数量
 * @param {String} remarks 备注
 * @returns <Promise> 购物车信息
 */
apiProductAddCard = (goodId, specs, amount, remarks) => {
  return axios.post("***", { goodId, specs, amount, remarks });
};

/**
 * @Description 网络请求
 * @param {object} options 配置对象
 * @param {string} options.url 请求地址
 * @param {'GET'|'POST'} options.method 请求方法
 * @param {object} options.body
 * @param {object} options.headers
 */

/**
 * 获取指定范围内的随机整数
 * @param {number} min 随机数的最小值
 * @param {number} max 随机数的最大值
 * @returns {number} 随机数
 * @example
 * getRandom(1，10); //获取[1,10]之间的随机整数
 */
```

## 利用提前返回简化逻辑

```typescript
// ❌ 错误做法
function doSomething() {
  if (user) {
    if (user.role === "ADMIN") {
      return "Administrator";
    } else {
      return "User";
    }
  } else {
    return "Anonymous";
  }
}
// ✅ 正确做法
function doSomething() {
  if (!user) return "Anonymous";
  if (user.role === "ADMIN") return "Administrator";

  return "User";
}
```

## 双向数据绑定，双向数据绑定 和 change 函数共同使用可能会导致数据混乱，产生预期外的bug，change事件内会修改双向绑定值的情况下，应当改为单向数据流

```html
<!-- bad -->
<a-input v-model:value="value" @change="value = formatHandle(value)" />

<!-- good -->
<a-input :value="value" @change="formatHandle" />
```

```typescript
function formatHandle(e: InputEvent) { 
  // value format 
}
```

## 回调函数代码简化

```typescript
// bad
articles.map(article => getArticle(article))

// good
articles.map(getArticle)
```

## try/catch的空白catch

```typescript
// bad
try {
  const info = await fetch('xxx')
} catch (e) {
  // 为了避免报错的空白catch
}

// good
// 报错是个好事，该报错就报错
try {
  const info = await fetch('xxx')
} catch (e) {
  // 打印错误信息
  // 上报异常信息
  // 业务逻辑
}
```

## 函数参数一堆

```typescript
// bad
// 造成心智负担，不仅需要知道每个参数，还需要知道每个参数的位置
const getUserInfo = (
  name,
  age,
  weight,
  ...
)=>{}

// good
const getUserInfo = (options)=>{
  const {name,age,...} = options
}
```

## 命名多余

```typescript
// bad
class User{
  userName;
  userAge;

  userLogin(){}
  getUserProfile(){}
}

// good
class User{
  name;
  age;

  login(){}
  getProfile(){}
}
```

## switch/case分支过多

```typescript
// bad
// 后面越加越多分支就越来越多
switch (type){
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
   return state - 1
  default:
   return state
}

// good
const ins = {
  INCREMENT: 1,
  DECREMENT: -1
}
return state + (ins[type] || 0)
```

## 无法阅读的条件

```typescript
// bad
// 一大堆条件，不知道是干嘛的
if(
  remaining ===0 || 
  (remaining === 1 && remainingPlayers === 1) || 
  remainingPlayers === 0
)
{
  quitGame()
}

// good
// 将条件提成函数
function isGameOver(){
  return (
    remaining ===0 || 
    (remaining === 1 && remainingPlayers === 1) || 
    remainingPlayers === 0
  )
}

if(isGameOver()){
  quitGame()
}
```

## 异常处理和成功的处理耦合
```typescript
// bad
// 错误处理和正确处理耦合在一起
if(isLoggedIn()){
  if(post){
    if(isPostDoubleChecked()){
      doPost(post)
    }else{
      throw new Error('不要发重复文章')
    }
  }else{
    throw new Error('文章不可为空')
  }
}else{
  throw new Error('请先登录')
}

// good
// 先处理错误，再处理正确

if(isLoggedIn()){
  throw new Error('请先登录')
}

if(!post){
  throw new Error('文章不可为空')
}

if(!isPostDoubleChecked()){
  throw new Error('不要发重复文章')
}

// 后面全是正常的
```

## 隐式耦合
```typescript
// bad
// 写死字符串在里面，当authorization或token变化，两个函数都要改动
function response(res){
  const token = res.headers.get('authorization')
  if(token){
    localStorage.setItem('token',token)
  }
}
function request(){
  const token = localStorage.getItem('token')
  if(token){
    res.headers.set('authorization',`Bearer ${token}`)
  }
}

// good
// 提取常量
const AUTH_HEADER_KEY = 'authorization'
const AUTH_KEY = 'token'
```

## 函数/hooks功能单一性
```typescript
让函数功能只对一件事负责

// bad
// 这是一个formItem的默认配置函数，但是在里面又修改elProps默认配置，项目里又有一个getDefaultElProps的函数
// 导致这个函数功能混乱，应该保持函数功能单一性

/**
 * @param formItem
 * @returns 包含默认配置的formItem
 */
export function getDefaultFormItem(formItem: FormGroupItem) {
  const defaultFormItem = { ...formItem };

  // elProps默认配置
  defaultFormItem['elProps'] = getDefaultElProps(formItem.fragmentKey, formItem.elProps);

  // 其他默认配置

  if (defaultFormItem.fragmentKey === 'renderRangePicker') {
    if (!isEmpty(defaultFormItem.rangePickerConfig)) {
      // 带tab的renderRangePicker组件，默认占两个搜索项的宽度
      defaultFormItem['colProps'] = defaultFormItem['colProps'] || {
        xs: 24,
        sm: 24,
        md: 24,
        lg: 16,
        xl: 12,
        xxl: 12,
      };
    } else {
      defaultFormItem['elProps'] = {
        style: {
          width: '100%',
        },
        ...defaultFormItem['elProps'],
      };
    }
  }

  return defaultFormItem;
}


// good
// 在getDefaultElProps修改elprops；抽离一个方法出来
/**
 * @param formItem
 * @returns 包含默认配置的formItem
 */
export function getDefaultFormItem(formItem: FormGroupItem) {
  const defaultFormItem = { ...formItem };

  // elProps默认配置
  defaultFormItem['elProps'] = getDefaultElProps(defaultFormItem['fragmentKey'], defaultFormItem);

  // colProps默认配置
  defaultFormItem['colProps'] = getDEfaultColProps(defaultFormItem['fragmentKey'], defaultFormItem);

  return defaultFormItem;
}
```

## 使用纯函数避免副作用

```typescript
编写函数时，最好避免修改该函数之外的任何变量。

// bad
let items = 5;
function changeNumber(number) {
  items = number + 3;
  return items;
}
changeNumber(5);


// good
function addThree(number) {
  return number + 3;
}
这里我们去掉了外部变量的依赖，让函数返回一个新值。它的功能现在是完全独立的，因此它的行为现在是完全可预测的。
```


## zIndex最好不要超过4位数

```css
/* bad */
z-index: 999999;

/* good */
z-index: 1000;
```

## 展示组件和容器组件（表单抽离降耦）

```typescript
表单功能涉及到：新增、编辑、查看（大部分是相同的。些许不同，如标题/提交按钮文字等）

// bad
全部合并为一个组件，里面通过一个变量type判断，if/else。
导致耦合，编辑出现问题，需要到处找编辑的代码，改的时候也需要非常小心，因为可能会动到其他的

// good
展示组件和容器组件（经典普遍成熟的开发模式）：

展示组件（只有界面逻辑，只管界面样式等）：只负责展示，不负责逻辑处理，只负责接收props，抛出emit事件
容器组件（调用“展示组件”）：

如：
新增：调用展示组件
编辑：调用展示组件
// 示例：<product-form :formData="formData" text="新增商品" :loading="loading" @submit="onSubmit" />
```

## 魔法值的问题
> 魔法值，也叫做魔法数值、魔法数字，通常是指在代码编写时莫名出现的数字， 无法直接判断数值代表的含义，必须通过联系代码上下文分析才可以明白， 严重降低了代码的可读性。除数字之外，代码中作为key值的常量字符串也被认为是魔法值， 尽管其表示含义比数值较为清晰，但是仍然会产生不规范问题。  
```typescript
// bad
if(flag === '5'){
  .......
}

if (businessType === 101){
  .......
}

// good
const BusinessTypeEnum = {
  SYSTEM: 0, // 系统
  CRM: 1, // CRM
  JXC: 2, // JXC
  UNKNOWN: 404, // 未知对象类型
  CUSTOMER_MANAGEMENT: 100, // 客户管理
  CUSTOMER: 101, // 客户
  CUSTOMER_FOCUS: 102, // 重点客户
  CUSTOMER_DEAL: 103, // 成交���户
  CUSTOMER_FOLLOW: 104, // 跟进客户
  CUSTOMER_PUBLIC: 105 // 客户公海池
}

if (businessType === BusinessTypeEnum.CUSTOMER){
  .......
}
```

## **🌟 React 代码规范 🌟**

### 组件可以渲染其他组件，但是 请不要嵌套他们的定义

```typescript
// bad
export default function Gallery() {
  // 🔴 永远不要在组件中定义组件
  function Profile() {
    // ...
  }
  // ...
}

// good
// 上面这段代码 非常慢，并且会导致 bug 产生。因此，你应该在顶层定义每个组件：
export default function Gallery() {
  // ...
}

// ✅ 在顶层声明组件
function Profile() {
  // ...
}
```

### 如果你的标签和 return 关键字不在同一行，则必须把它包裹在一对括号中；没有括号包裹的话，任何在 return 下一行的代码都 将被忽略

### 不要创建未命名的组件，比如 export default () => {}，因为这样会使得调试变得异常困难

### 为了减少在默认导出和具名导出之间的混淆，一些团队会选择只使用一种风格（默认或者具名），或者禁止在单个文件内混合使用。这因人而异，选择最适合你的即可

### 内联 style 属性使用驼峰命名法编写

例如，HTML 中的：
```html
<ul style="background-color: black">
```

在 React 组件里应该写成：
```jsx
<ul style={{ backgroundColor: 'black' }}>
```

### Props 是只读的时间快照：每次渲染都会收到新版本的 props；你可以使用 `<Avatar {...props} />` JSX 展开语法转发所有 props，但不要过度使用它

### 切勿将数字放在 && 左侧

JavaScript 会自动将左侧的值转换成布尔类型以判断条件成立与否。然而，如果左侧是 0，整个表达式将变成左侧的值（0），React 此时则会渲染 0 而不是不进行渲染。

例如，一个常见的错误是 `messageCount && <p>New messages</p>`。其原本是想当 messageCount 为 0 的时候不进行渲染，但实际上却渲染了 0。

为了更正，可以将左侧的值改成布尔类型：`messageCount > 0 && <p>New messages</p>`。

### key 值不能改变，否则就失去了使用 key 的意义！所以千万不要在渲染时动态地生成 key

请不要在运行过程中动态地产生 key，像是 `key={Math.random()}` 这种方式。这会导致每次重新渲染后的 key 值都不一样，从而使得所有的组件和 DOM 元素每次都要重新创建。这不仅会造成运行变慢的问题，更有可能导致用户输入的丢失。所以，使用能从给定数据中稳定取得的值才是明智的选择。

有一点需要注意，组件不会把 key 当作 props 的一部分。Key 的存在只对 React 本身起到提示作用。如果你的组件需要一个 ID，那么请把它作为一个单独的 prop 传给组件： `<Profile key={id} userId={id} />。`

### 保持组件纯粹

React 便围绕着这个概念进行设计。React 假设你编写的所有组件都是纯函数。也就是说，对于相同的输入，你所编写的 React 组件必须总是返回相同的 JSX。不要多次调用这个组件会产生不同的 JSX！纯函数仅仅执行计算，因此调用它们两次不会改变任何东西。