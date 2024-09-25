---
sticky: 999
tag:
  - Technology
---

# 代码规范记录（持续更新） 🙂

::: tip
记录一些规范，提高代码质量，减少 bug
:::

## `空函数清理、注释代码清理、console.log清理。`

## `尽量都用 === 全等。`

## `后面没有代码了就不要多加一个return。`

## `公共js方法，公共组件，要多加注释。`

## `不是非常有必要，不要使用any，在很多情况下，我们可以使用 unknown 来替代 any，既灵活,又可以继续保证类型安全。`

## `provide/inject 是在解决多级透传问题的时候才能使用，而且使用要特别谨慎。因为它会将逻辑提升到组件树的更高层次来处理逻辑，会使高层组件变得更复杂。并且对于某些组件来说，不利于复用。对于全局状态的使用，都要谨慎。`

## `可选链在必要的情况下才能使用，禁止滥用；使用可选链简化代码。`

## `内联样式不超过两个；模版不建议写复杂判断，需要放在逻辑中维护。`

## `变量命名需要有具体语义，不能太泛化;单一组件功能变量名允许泛化。`

## `变量命名采用小驼峰。`

## `ts: interface命名用I开头，type命名用T开头，enum用E开头。`

## `import 顺序需要按照：全局vue，UI库，第三方库，公共方法，业务方法；按从广到窄的维度引入（封装的组件放最后）：vue、ui、第三方、全局 、私有`

## `vue单文件模块顺序：template  script  style。`

- `新页面路由命名需要规范：一级菜单/二级菜单/页面名称，例子：/user/plateform/user-create。`

## `swich里赋值相同的话，合并case。`

## `组件应用时props参数：按照 ref、class、传入、传出 顺序书写。`

```vue
<my-components
  ref="myComponents"
  class="home-my-components"
  :data="data"
  @changeHandle="changeHandle"
/>
```

## `方法命名。`

> can： 判断是否可执行某个动作 函数返回一个布尔值 true 可执行 false 不可执行  
> has： 判断是否含有某个值 函数返回一个布尔值 true 含有此值 false 不含有此值  
> is： 判断是否为某个值，函数返回一个布尔值 true 为某个值 false 不为某个值  
> get： 获取某个值 函数返回一个非布尔值  
> set： 设置某个值 无返回值或者返回是否加载完成的结果

## `路由参数：query对象中属性必须是字符串；不建议传递复杂Json数据，传入标识进行查询。`

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

## `模板不能有复杂的运算，超过一层运算建议不在模版中处理。`

## `Vue官方提供了4-5种class绑定方式，建议统一使用一种，以数组的方式动态绑定类名。`

```vue
<div :class="['title-text', active ? 'active' : '', errorClass]">
  <!-- ... -->
</div>
```

## `不建议开发者大批量的对一个对象执行多次delete操作，原因是连续的delete操作代码显得冗余。`

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

## `函数注释。`

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

## `利用提前返回简化逻辑。`

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

## `双向数据绑定，双向数据绑定 和 change 函数共同使用可能会导致数据混乱，产生预期外的bug，change事件内会修改双向绑定值的情况下，应当改为单向数据流。`

```vue
<!-- bad -->
<a-input v-model:value="value" @change="value = formatHandle(value)" />

<!-- good -->
<a-input :value="value" @change="formatHandle" />

function formatHandle(e: InputEvent) { // value format }
```

## `回调函数代码简化`

```typescript
<!-- bad -->
articles.map(article => getArticle(article))

<!-- good -->
articles.map(getArticle)
```

## `try/catch的空白catch`

```typescript
<!-- bad -->
try {
  const info = await fetch('xxx')
} catch (e) {
  // 为了避免报错的空白catch
}

<!-- good -->
// 报错是个好事，该报错就报错
try {
  const info = await fetch('xxx')
} catch (e) {
  // 打印错误信息
  // 上报异常信息
  // 业务逻辑
}
```

## `函数参数一堆`

```typescript
<!-- bad -->
// 造成心智负担，不仅需要知道每个参数，还需要知道每个参数的位置
const getUserInfo = (
  name,
  age,
  weight,
  ...
)=>{}

<!-- good -->
const getUserInfo = (options)=>{
  const {name,age,...} = options
}
```

## `命名多余`

```typescript
<!-- bad -->
class User{
  userName;
  userAge;

  userLogin(){}
  getUserProfile(){}
}

<!-- good -->
class User{
  name;
  age;

  login(){}
  getProfile(){}
}
```

## `switch/case分支过多`

```typescript
<!-- bad -->
// 后面越加越多分支就越来越多
switch (type){
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
   return state - 1
  default:
   return state
}

<!-- good -->
const ins = {
  INCREMENT: 1,
  DECREMENT: -1
}
return state + (ins[type] || 0)
```

## `无法阅读的条件`

```typescript
<!-- bad -->
// 一大堆条件，不知道是干嘛的
if(
  remaining ===0 || 
  (remaining === 1 && remainingPlayers === 1) || 
  remainingPlayers === 0
)
{
  quitGame()
}

<!-- good -->
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

## `异常处理和成功的处理耦合`
```typescript
<!-- bad -->
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

<!-- good -->
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

## `隐式耦合`
```typescript
<!-- bad -->
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

<!-- good -->
// 提取常量
const AUTH_HEADER_KEY = 'authorization'
const AUTH_KEY = 'token'
```

## `函数/hooks功能单一性`
```typescript
<!-- bad -->
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


<!-- good -->
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

## `zIndex最好不要超过4位数`
```typescript
 z-index: 999999;// bad
 z-index: 1000;// good
```

## `展示组件和容器组件（表单抽离降耦）`
```typescript
表单功能涉及到：新增、编辑、查看（大部分是相同的。些许不同，如标题/提交按钮文字等）

<!-- bad -->
全部合并为一个组件，里面通过一个变量type判断，if/else。
导致耦合，编辑出现问题，需要到处找编辑的代码，改的时候也需要非常小心，因为可能会动到其他的

<!-- good -->
展示组件和容器组件（经典普遍成熟的开发模式）：

展示组件（只有界面逻辑，只管界面样式等）：只负责展示，不负责逻辑处理，只负责接收props，抛出emit事件
容器组件（调用“展示组件”）：

如：
新增：调用展示组件
编辑：调用展示组件
<product-form :formData="formData" text="新增商品" :loading="loading" @submit="onSubmit" />
```