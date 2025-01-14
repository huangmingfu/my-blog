---
sticky: 500
tag:
 - Technology
---

# js操作符简化操作

## 一、简介
随着 JavaScript 的不断发展，一些新的操作符被引入以简化常见的编程模式，提高代码的可读性和简洁性。  
本文将介绍几个常用的新增操作符：空值合并操作符 (`??`)、逻辑或赋值操作符 (`||=`) 和空值合并赋值操作符 (`??=`)。

## 二、空值合并操作符 (`??`)
### 1. 简介
- 用于处理 `null` 或 `undefined` 的情况，当左侧表达式为 `null` 或 `undefined` 时返回右侧表达式的值。
- 不会将 `false`、`0`、`''`（空字符串）等“假值”视为 `null` 或 `undefined`。

### 2. 示例
```javascript
const user = {
  name: "Alice",
  age: null,
  email: undefined,
  isActive: false
};

// 使用 ?? 操作符
const userName = user.name ?? 'Default Name'; // 输出 "Alice"
const userAge = user.age ?? 30; // 输出 30
const userEmail = user.email ?? 'no-reply@example.com'; // 输出 "no-reply@example.com"
const userStatus = user.isActive ?? true; // 输出 false (因为 isActive 是 false)
```

## 三、逻辑或赋值操作符 (`||=`)
### 简介
- 如果左侧表达式的值为“假值”（例如 `null`、`undefined`、`false`、`0`、`NaN`、`''`），则将右侧表达式的值赋给左侧变量。
- 如果左侧表达式的值为“真值”，则保持不变。

### 示例
```javascript
let counter = 0;
counter ||= 5; // counter 仍然是 0，因为 0 是假值
console.log(counter); // 输出 5

let isActive = true;
isActive ||= false; // isActive 仍然是 true，因为 true 是真值
console.log(isActive); // 输出 true
```

## 四、空值合并赋值操作符 (`??=`)
### 简介
- 类似于 `??` 操作符，但用于赋值操作。如果左侧表达式的值为 `null` 或 `undefined`，则将右侧表达式的值赋给左侧变量。
- 如果左侧表达式的值不是 `null` 或 `undefined`，则保持不变。

### 示例
```javascript
let nickname = null;
nickname ??= 'Anonymous';
console.log(nickname); // 输出 "Anonymous"

let username = 'Alice';
username ??= 'Default User';
console.log(username); // 输出 "Alice"
```

## 五、逻辑与赋值操作符 (`&&=`)
### 简介
- 逻辑与赋值操作符 (`&&=`) 是 JavaScript 中引入的一种简洁的操作符，用于在左侧表达式的值为“真值”时，将右侧表达式的值赋给左侧变量。
- 如果左侧表达式的值为“假值”（例如 `null`、`undefined`、`false`、`0`、`NaN`、`''`），则不会进行赋值操作。

### 示例
```javascript
let isActive = true;
isActive &&= false; // isActive 仍然是 true，因为 true 是真值
console.log(isActive); // 输出 true

let hasPermission = false;
hasPermission &&= true; // hasPermission 仍然是 false，因为 false 是假值
console.log(hasPermission); // 输出 false

let count = 5;
count &&= 10; // count 变为 10，因为 5 是真值
console.log(count); // 输出 10

let user = null;
user &&= { name: 'Alice' }; // user 仍然是 null，因为 null 是假值
console.log(user); // 输出 null
```

## 六、双重否定 (`!!`)
### 简介
- 将任何值转换为布尔值（`true` 或 `false`）。第一次 `!` 将值转换为其相反的布尔值，第二次 `!` 再次取反，从而得到原始值对应的布尔值。
- 常用于将非布尔值转换为布尔值，特别是在条件判断中。

### 示例
```javascript
const value1 = !!'hello'; // true
const value2 = !!'';      // false
const value3 = !!0;       // false
const value4 = !!1;       // true
const value5 = !!null;    // false
const value6 = !!undefined; // false
const value7 = !!{ key: 'value' }; // true
```

## 七、双波浪号 (`~~`)
### 简介
- 双波浪号 `~~` 实际上是两次按位取反操作，其效果类似于 `Math.floor()`，但只对正数有效。对于负数，它相当于 `Math.ceil()`。
- 它可以用来快速截断小数部分，但在现代 JavaScript 中推荐使用 `Math.floor()` 或 `Math.trunc()`，因为它们语义更明确且不易引起混淆。

### 示例
```javascript
const value1 = ~~3.7;   // 3
const value2 = ~~-3.7;  // -3
const value3 = ~~3.2;   // 3
const value4 = ~~-3.2;  // -3
```

## 八、注意事项
### 1. `??` 与 `||` 的区别
- `??` 只会在左侧表达式为 `null` 或 `undefined` 时才返回右侧表达式的值，而 `||` 会在左侧表达式为任何“假值”时返回右侧表达式的值。

```javascript
const value1 = null || 'default'; // 输出 "default"
const value2 = null ?? 'default'; // 输出 "default"

const value3 = 0 || 'default'; // 输出 "default"
const value4 = 0 ?? 'default'; // 输出 0
```

### 2. `||=` 与 `??=` 的选择
- 根据实际需求选择合适的操作符。如果需要区分 `null` 和 `undefined` 与其他“假值”，应使用 `??=`；如果只需要处理所有“假值”，则可以使用 `||=`。