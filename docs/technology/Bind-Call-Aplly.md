---
sticky: 500
tag:
 - Technology
---

# apply、call 和 bind 的区别

在 JavaScript 中，`apply`、`call` 和 `bind` 是三个用于调用函数时设置 `this` 上下文的非常重要的方法。它们都能改变函数执行时的 `this` 指向，但在使用上有一些细微的差别。本文将逐一解释它们的区别。

### 1. call 方法
`call` 方法是用来调用一个函数，并且手动设置该函数的 `this` 值。它的语法如下：

```javascript
func.call(thisArg, arg1, arg2, ...);
```

**特点：**
- `thisArg`：是要绑定到 `this` 上的值。
- `arg1, arg2, ...`：是传递给函数的参数，可以一次性传递多个参数。

**示例：**

```javascript
function greet(name, age) {
  console.log(`Hello, my name is ${name} and I am ${age} years old.`);
}

const person = { name: "John" };
greet.call(person, "Alice", 25);
// Output: Hello, my name is Alice and I am 25 years old.
```

在上面的例子中，我们用 `call` 方法改变了 `greet` 函数的 `this` 指向，使其指向 `person` 对象。

### 2. apply 方法
`apply` 方法与 `call` 方法非常相似，它的区别在于参数的传递方式。`apply` 方法的语法如下：

```javascript
func.apply(thisArg, [argsArray]);
```

**特点：**
- `thisArg`：同样是要绑定到 `this` 上的值。
- `[argsArray]`：一个数组或类数组对象，包含传递给函数的所有参数。

**示例：**

```javascript
function greet(name, age) {
  console.log(`Hello, my name is ${name} and I am ${age} years old.`);
}

const person = { name: "John" };
greet.apply(person, ["Alice", 25]);
// Output: Hello, my name is Alice and I am 25 years old.
```

在此示例中，`apply` 的第二个参数是一个数组，它传递了参数 `name` 和 `age`。

### 3. bind 方法
`bind` 方法创建一个新的函数，这个函数会在调用时将 `this` 固定为指定的值。与 `call` 和 `apply` 不同的是，`bind` 不会立即调用函数，而是返回一个新的函数。

**语法：**

```javascript
const newFunc = func.bind(thisArg, arg1, arg2, ...);
```

**特点：**
- `thisArg`：要绑定到 `this` 上的值。
- `arg1, arg2, ...`：绑定时的预设参数，后续调用时可以继续传递参数。

**示例：**

```javascript
function greet(name, age) {
  console.log(`Hello, my name is ${name} and I am ${age} years old.`);
}

const person = { name: "John" };
const greetAlice = greet.bind(person, "Alice");
greetAlice(25);
// Output: Hello, my name is Alice and I am 25 years old.
```

在这个例子中，`greet.bind(person, "Alice")` 返回了一个新的函数 `greetAlice`，该函数的 `this` 始终指向 `person` 对象，并且预设了 `name` 参数为 `"Alice"`。

**bind 的一个应用场景：**

`bind` 常用于在事件监听器中绑定 `this`。例如：

```javascript
const button = document.querySelector("button");
button.addEventListener("click", greet.bind(person, "Alice", 25));
```

在上面的代码中，`greet` 函数被绑定到 `person` 对象，当按钮被点击时，`greet` 将使用预设的参数 `"Alice"` 和 `25`。

### 4. 总结对比

| 方法   | 调用时机 | 返回值   | 参数形式       | 适用场景                         |
|--------|----------|----------|----------------|----------------------------------|
| call   | 立即调用 | 无返回值 | 独立传参       | 需要立即调用并改变 `this` 时     |
| apply  | 立即调用 | 无返回值 | 数组传参       | 需要立即调用并改变 `this` 时     |
| bind   | 延迟调用 | 新函数   | 可以预设参数   | 需要返回一个新函数，延迟调用     |

- `call` 和 `apply` 都是立即调用函数的方法，区别在于传递参数的方式。
- `bind` 返回一个新的函数，并且这个新函数可以在未来的某个时刻执行。

通过合理选择这三者，我们可以灵活控制函数的执行时机和 `this` 的指向。