---
sticky: 500
tag:
 - Technology
---

# ES6 生成器（Generator）

## 学习背景

在维护公司老项目时，发现项目中使用了 `redux-saga` 进行状态管理和副作用处理。`redux-saga` 的核心正是基于 ES6 的生成器（Generator）实现的。为了更好地理解和维护这些代码，深入学习生成器的原理和用法变得十分必要。

生成器作为 JavaScript 异步编程的重要基础，不仅在 `redux-saga` 中广泛应用，也是理解现代 `async/await` 语法的关键。掌握生成器将有助于：
- 理解 `redux-saga` 的工作原理
- 更好地维护基于生成器的旧代码
- 深入理解 JavaScript 异步编程的本质
- 为学习更现代的异步方案打下基础

## 什么是生成器？

生成器是ES6引入的一种特殊函数，它具有以下特点：
- 可以暂停和恢复执行流程
- 使用 `function*` 语法声明
- 内部包含一个或多个 `yield` 表达式
- 返回一个迭代器对象，可通过 `next()` 方法控制执行

生成器的主要优势在于能够**惰性计算**和**控制执行流程**，适用于处理大数据集、实现状态机、简化异步编程等场景。

## 基础语法

### 声明生成器函数

```javascript
// 使用 function* 声明生成器函数
function* generatorFunc() {
    yield 1;    // 暂停点，返回值 1
    yield 2;    // 暂停点，返回值 2
    return 3;   // 执行完毕，返回 3
}

// 也可以使用箭头函数形式（但较少用）
const generatorFunc2 = function* () {
    yield 'A';
    yield 'B';
};
```

### yield 的作用

`yield` 关键字有两个重要作用：
1. **暂停**：暂停函数的执行
2. **返回**：向外部返回一个值

## 执行流程控制

### 基础用法示例

```javascript
function* simpleGenerator() {
    console.log('开始执行');
    
    // yield 相当于暂停点，每次 next() 执行到下一个 yield
    yield '第一次暂停，返回这个字符串';
    
    console.log('从第一次暂停恢复');
    yield '第二次暂停';
    
    console.log('从第二次暂停恢复');
    return '生成器结束'; // return 表示生成器执行完毕
}

// 创建生成器实例 - 此时函数不会立即执行
const gen = simpleGenerator();

// 第一次调用 next() - 开始执行，遇到第一个 yield 暂停
console.log(gen.next()); 
// 输出: { value: '第一次暂停，返回这个字符串', done: false }

// 第二次调用 next() - 从上次暂停处继续，遇到第二个 yield 暂停
console.log(gen.next());
// 输出: { value: '第二次暂停', done: false }

// 第三次调用 next() - 继续执行直到 return
console.log(gen.next());
// 输出: { value: '生成器结束', done: true }

// 后续调用都返回 { value: undefined, done: true }
console.log(gen.next());
// 输出: { value: undefined, done: true }
```

### 执行过程解析

1. **创建生成器对象**：调用生成器函数返回一个生成器对象
2. **首次调用 next()**：开始执行代码，直到遇到第一个 `yield`
3. **后续调用 next()**：从上次暂停的 `yield` 处继续执行，直到下一个 `yield` 或 `return`
4. **结束状态**：`done: true` 表示生成器执行完毕

## 双向通信机制

生成器不仅能够向外返回值，还能接收外部传入的值。

### 传参示例

```javascript
function* twoWayGenerator() {
    console.log('生成器启动');
    
    // 第一个 yield 的返回值来自 next() 的传入参数
    const fromNext1 = yield '请给我第一个值';
    console.log(`收到第一个值: ${fromNext1}`);
    
    const fromNext2 = yield '请给我第二个值';
    console.log(`收到第二个值: ${fromNext2}`);
    
    return '通信完成';
}

const twoWayGen = twoWayGenerator();

// 启动生成器，第一次 next() 不需要参数（即使传了也会被忽略）
console.log(twoWayGen.next()); 
// 输出: { value: '请给我第一个值', done: false }

// 第二次 next() 的参数会成为第一个 yield 的返回值
console.log(twoWayGen.next('Hello'));
// 输出: { value: '请给我第二个值', done: false }

// 第三次 next() 的参数会成为第二个 yield 的返回值
console.log(twoWayGen.next('World'));
// 输出: { value: '通信完成', done: true }
```

### 通信要点

- **首次调用**：第一次 `next()` 的参数会被忽略
- **后续调用**：`next(arg)` 的参数会成为**上一次** `yield` 表达式的返回值
- **返回值**：`yield` 表达式本身可以向外返回值

## 实际应用场景

### 1. 无限序列生成

生成器可以创建无限序列，按需生成数值，避免一次性创建大量数据。

```javascript
function* infiniteSequence() {
    let num = 0;
    while (true) {
        yield num++;
    }
}

const numbers = infiniteSequence();
console.log(numbers.next().value); // 0
console.log(numbers.next().value); // 1
console.log(numbers.next().value); // 2
// 可以无限调用，每次返回递增的数字
```

### 2. 状态机实现

使用生成器可以清晰地实现状态机模式。

```javascript
function* trafficLight() {
    while (true) {
        yield '🔴 红灯 - 停止';
        yield '🟡 黄灯 - 准备';
        yield '🟢 绿灯 - 通行';
        yield '🟡 黄灯 - 准备';
    }
}

const light = trafficLight();
console.log(light.next().value); // 🔴 红灯 - 停止
console.log(light.next().value); // 🟡 黄灯 - 准备
console.log(light.next().value); // 🟢 绿灯 - 通行
console.log(light.next().value); // 🟡 黄灯 - 准备
console.log(light.next().value); // 🔴 红灯 - 停止 (循环)
```

### 3. 分批次处理数据

适合处理大数据集，避免内存溢出。

```javascript
function* batchProcessor(data, batchSize = 2) {
    for (let i = 0; i < data.length; i += batchSize) {
        const batch = data.slice(i, i + batchSize);
        yield batch;
    }
}

const data = [1, 2, 3, 4, 5, 6, 7];
const processor = batchProcessor(data, 3);

let result = processor.next();
while (!result.done) {
    console.log(`处理批次: ${result.value}`);
    // 输出: 处理批次: 1,2,3
    //       处理批次: 4,5,6
    //       处理批次: 7
    result = processor.next();
}
```

### 4. 惰性求值

只在需要时计算值，提高性能。

```javascript
function* lazyCalculator() {
    console.log('计算第一个值...');
    yield 1 + 1;
    
    console.log('计算第二个值...');
    yield 2 * 3;
    
    console.log('计算第三个值...');
    yield 10 / 2;
}

const calc = lazyCalculator();
// 只有在调用 next() 时才会执行计算
console.log(calc.next().value); // 计算第一个值... 2
console.log(calc.next().value); // 计算第二个值... 6
```

## 错误处理

生成器支持通过 `throw()` 方法向内部抛出错误。

```javascript
function* errorHandlingGenerator() {
    try {
        yield '第一步';
        yield '第二步';
        // 如果外部调用 gen.throw()，错误会在这里抛出
        yield '第三步';
    } catch (error) {
        console.log(`捕获到错误: ${error}`);
        yield '错误恢复';
    }
}

const errorGen = errorHandlingGenerator();
console.log(errorGen.next().value); // 第一步
console.log(errorGen.next().value); // 第二步

// 向生成器内部抛出错误
console.log(errorGen.throw('外部错误').value); 
// 输出: 捕获到错误: External error
//       错误恢复

// 错误处理后生成器可以继续执行
console.log(errorGen.next().value); // undefined (生成器已结束)
```

### 错误处理机制

1. **throw() 方法**：向生成器内部抛出错误
2. **try-catch 捕获**：在生成器内部捕获错误
3. **恢复执行**：错误处理后生成器可以继续执行

## 与迭代器配合

生成器返回的对象实现了迭代器协议，可以使用 `for...of` 遍历。

```javascript
function* iterableGenerator() {
    yield 'A';
    yield 'B';
    yield 'C';
}

// 使用 for...of 遍历生成器
for (const value of iterableGenerator()) {
    console.log(value); // 依次输出 A, B, C
}

// 也可以使用扩展运算符
const values = [...iterableGenerator()];
console.log(values); // ['A', 'B', 'C']
```

## 高级用法

### 生成器委托

使用 `yield*` 委托给另一个生成器或可迭代对象。

```javascript
function* generator1() {
    yield 1;
    yield 2;
}

function* generator2() {
    yield* generator1(); // 委托给 generator1
    yield 3;
    yield 4;
}

const gen = generator2();
console.log([...gen]); // [1, 2, 3, 4]
```

### 异步生成器

ES2018 引入了异步生成器，用于处理异步数据流。

```javascript
async function* asyncGenerator() {
    yield await Promise.resolve(1);
    yield await Promise.resolve(2);
    yield await Promise.resolve(3);
}

// 使用 for-await-of 遍历异步生成器
(async () => {
    for await (const value of asyncGenerator()) {
        console.log(value); // 1, 2, 3
    }
})();
```

## 性能考虑

### 内存效率

生成器是惰性计算的，不会一次性生成所有值，内存占用恒定。

```javascript
// 传统方式：一次性生成所有值
function createArray(n) {
    const result = [];
    for (let i = 0; i < n; i++) {
        result.push(i * 2);
    }
    return result;
}
const bigArray = createArray(1000000); // 占用大量内存

// 生成器方式：按需生成
function* createGenerator(n) {
    for (let i = 0; i < n; i++) {
        yield i * 2;
    }
}
const gen = createGenerator(1000000); // 几乎不占用内存
```

### 执行效率

生成器的执行效率与普通函数相当，但在处理大数据集时具有明显优势。

## 最佳实践

### 1. 使用场景选择

适合使用生成器的情况：
- 处理大数据集或无限序列
- 实现状态机或工作流
- 需要惰性计算的场景
- 简化迭代器实现

不适合使用生成器的情况：
- 简单的函数逻辑
- 需要立即执行所有计算的场景
- 性能要求极高的场景

### 2. 命名规范

```javascript
// 好的命名：明确表示生成器特性
function* idGenerator() { /* ... */ }
function* dataLoader() { /* ... */ }

// 避免的命名：不清楚是生成器
function* process() { /* ... */ }
function* handle() { /* ... */ }
```

### 3. 错误处理策略

```javascript
// 推荐：完整的错误处理
function* robustGenerator() {
    try {
        while (true) {
            const value = yield;
            // 处理逻辑
        }
    } catch (error) {
        console.error('生成器错误:', error);
        // 可以选择重新抛出或处理后继续
        throw error;
    }
}
```

## 与 async/await 的关系

生成器是 `async/await` 的基础，理解生成器有助于深入理解异步编程原理。

```javascript
// 生成器实现的类似 async/await 的效果
function* fetchUserGenerator() {
    const user = yield fetch('/api/user');
    const posts = yield fetch(`/api/posts?userId=${user.id}`);
    return { user, posts };
}

// 使用 co 库或手动执行
async function runGenerator() {
    const gen = fetchUserGenerator();
    let result = gen.next();
    
    while (!result.done) {
        const value = await result.value;
        result = gen.next(value);
    }
    
    return result.value;
}
```

## 总结要点

1. **语法基础**：使用 `function*` 声明，`yield` 暂停执行
2. **执行控制**：通过 `next()` 方法逐步执行
3. **双向通信**：`yield` 可以返回值，`next()` 可以传入值
4. **错误处理**：使用 `throw()` 向生成器内部抛出错误
5. **迭代器协议**：生成器返回迭代器，支持 `for...of` 遍历
6. **实际应用**：无限序列、状态机、分批处理、惰性计算等
7. **性能优势**：内存效率高，适合处理大数据集
8. **现代替代**：`async/await` 是基于生成器的异步解决方案

生成器虽然在日常开发中不常用，但在特定场景下能提供优雅且高效的解决方案。理解生成器的工作原理有助于更好地掌握 JavaScript 的异步编程模型。

## 参考资源

- [MDN - Generator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)
- [ECMAScript 6 入门 - Generator](https://es6.ruanyifeng.com/#docs/generator)
- [JavaScript 高级程序设计 - 迭代器与生成器](https://book.douban.com/subject/35175321/)