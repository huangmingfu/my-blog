---
sticky: 999
tag:
 - Technology
---

# 代码规范记录（持续更新） 🙂

::: tip 
记录一些规范，提高代码质量，减少bug
:::

- `空函数清理、注释代码清理、console.log清理。`
- `尽量都用 === 全等。`
- `后面没有代码了就不要多加一个return。`
- `公共js方法，公共组件，要多加注释。`
- `不是非常有必要，不要使用any，在很多情况下，我们可以使用 unknown 来替代 any，既灵活,又可以继续保证类型安全。`
- `provide/inject 是在解决多级透传问题的时候才能使用，而且使用要特别谨慎。因为它会将逻辑提升到组件树的更高层次来处理逻辑，会使高层组件变得更复杂。并且对于某些组件来说，不利于复用。对于全局状态的使用，都要谨慎。`
- `可选链在必要的情况下才能使用，禁止滥用；使用可选链简化代码。`
- `内联样式不超过两个；模版不建议写复杂判断，需要放在逻辑中维护。`
- `变量命名需要有具体语义，不能太泛化;单一组件功能变量名允许泛化。`
- `变量命名采用小驼峰。`
- `ts: interface命名用I开头，type命名用T开头，enum用E开头。`
- `import 顺序需要按照：全局vue，UI库，第三方库，公共方法，业务方法；按从广到窄的维度引入（封装的组件放最后）：vue、ui、第三方、全局 、私有`
- `vue单文件模块顺序：template  script  style。`
-  `新页面路由命名需要规范：一级菜单/二级菜单/页面名称，例子：/user/plateform/user-create。`
- `swich里赋值相同的话，合并case。`
- `组件应用时props参数：按照 ref、class、传入、传出 顺序书写。`
```vue
 <my-components
    ref="myComponents"
    class="home-my-components"
    :data="data"
    @changeHandle="changeHandle"
  />
```
- `方法命名。`
> can： 判断是否可执行某个动作 函数返回一个布尔值 true可执行 false不可执行  
has： 判断是否含有某个值 函数返回一个布尔值 true含有此值 false不含有此值  
is： 判断是否为某个值，函数返回一个布尔值 true为某个值 false不为某个值  
get： 获取某个值 函数返回一个非布尔值  
set： 设置某个值 无返回值或者返回是否加载完成的结果  

- `路由参数：query对象中属性必须是字符串；不建议传递复杂Json数据，传入标识进行查询。`
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
- `模板不能有复杂的运算，超过一层运算建议不在模版中处理。`
- `Vue官方提供了4-5种class绑定方式，建议统一使用一种，以数组的方式动态绑定类名。`
```vue
<div :class="['title-text', active ? 'active' : '', errorClass]">
  <!-- ... -->
</div>
```
- `不建议开发者大批量的对一个对象执行多次delete操作，原因是连续的delete操作代码显得冗余。`
```ts
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
- `函数注释。`
```ts
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
  return axios.post('***', { goodId, specs, amount, remarks })
}

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
- `利用提前返回简化逻辑。`
```ts
// ❌ 错误做法
function doSomething() {
  if (user) {
    if (user.role === "ADMIN") {
      return 'Administrator';
    } else {
      return 'User';
    }
  } else {
    return 'Anonymous';
  }
}
// ✅ 正确做法
function doSomething() {
  if (!user) return 'Anonymous'
  if (user.role === "ADMIN") return 'Administrator'

  return 'User'
}
```
- `双向数据绑定，双向数据绑定 和 change 函数共同使用可能会导致数据混乱，产生预期外的bug，change事件内会修改双向绑定值的情况下，应当改为单向数据流。`
```vue
<!-- bad -->
<a-input
  v-model:value="value"
  @change="value = formatHandle(value)"
/>

<!-- good -->
<a-input
  :value="value"
  @change="formatHandle"
/>

function formatHandle(e: InputEvent) {
    // value format
}
```