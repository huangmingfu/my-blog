---
sticky: 500
tag:
 - Technology
---

# Ts 实现一个简单的洋葱模型的类

## 前置
> 💡 Tips：一提洋葱模型，就会联想到koa，没错，非常热门的koa框架也是使用了洋葱模型的设计模式。
网络流行的洋葱模型的图：
![](https://huangmingfu.github.io/drawing-bed/images/pic-go/202411111416100.png)

Koa 框架中的“洋葱模型”是指其中间件执行机制。Koa 是一个基于 Node.js 的轻量级 Web 开发框架，它使用 ES6 的 async/await 语法来简化异步编程，并且具有非常灵活的中间件系统。下面详细介绍 Koa 中间件的执行流程：
### **Koa 中间件执行流程**
1. **中间件注册**： 在 Koa 应用中，你可以通过 app.use() 方法注册中间件。这些中间件按照注册顺序依次执行。
```ts
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log('Middleware 1');
  await next();
  console.log('Middleware 1 (after)');
});

app.use(async (ctx, next) => {
  console.log('Middleware 2');
  await next();
  console.log('Middleware 2 (after)');
});
```
2. **中间件执行顺序**： 当请求到达时，中间件按照注册顺序依次执行。每个中间件可以通过调用 next() 函数来传递控制权给下一个中间件。
```ts
// 请求到达时，首先执行 Middleware 1
// Middleware 1 调用 next() 后，执行 Middleware 2
// Middleware 2 调用 next() 后，执行业务逻辑
// 业务逻辑完成后，控制权回溯到 Middleware 2 (after)
// 然后回溯到 Middleware 1 (after)
```
3. **控制权回溯**： 当所有中间件都执行完毕后，控制权会逐层回溯，执行每个中间件的“后处理”逻辑。这种回溯机制类似于洋葱的层层包裹。
```ts
// 假设业务逻辑完成后，控制权回溯
// Middleware 2 (after) 执行
// Middleware 1 (after) 执行
```

### 示例代码
下面是一个完整的示例代码，展示 Koa 中间件的执行过程：
```ts
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log('Middleware 1');
  await next();
  console.log('Middleware 1 (after)');
});

app.use(async (ctx, next) => {
  console.log('Middleware 2');
  await next();
  console.log('Middleware 2 (after)');
});

app.use(async (ctx, next) => {
  console.log('Business Logic');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```
在这个示例中，当请求到达时，输出顺序如下：
1. Middleware 1
2. Middleware 2
3. Business Logic
4. Middleware 2 (after)
5. Middleware 1 (after)
这就是 Koa 框架中“洋葱模型”的执行机制。

## Ts 实现
```ts
type Middleware = (ctx: Record<string, any>, next: () => Promise<void>) => Promise<void>;

class OnionModel {
  private middlewares: Middleware[] = [];

  // 添加中间件的方法
  use(middleware: Middleware): OnionModel {
    this.middlewares.push(middleware);
    return this;
  }

  // 执行中间件链的方法
  async handle(ctx: Record<string, any>): Promise<void> {
    const dispatch = async (index: number = 0) => {
      if (index >= this.middlewares.length) {
        return;
      }

      const middleware = this.middlewares[index];
      try {
        await middleware(ctx, async () => {
          await dispatch(index + 1);
        });
      } catch (error) {
        throw error;
      }
    };

    return dispatch();
  }
}

// 示例中间件
const middleware1 = async (ctx: Record<string, any>, next: () => Promise<void>) => {
  console.log('Middleware 1', ctx);
  await next();
  console.log('Middleware 1 (after)');
};

const middleware2 = async (ctx: Record<string, any>, next: () => Promise<void>) => {
  console.log('Middleware 2', ctx);
  ctx.a = 3;
  await next();
  console.log('Middleware 2 (after)');
};

const middleware3 = async (ctx: Record<string, any>, next: () => Promise<void>) => {
  console.log('Middleware 3', ctx);
  await next();
  console.log('Middleware 3 (after)');
};

// 创建洋葱模型实例
const onion = new OnionModel();

// 添加中间件
onion.use(middleware1).use(middleware2).use(middleware3);

// 创建上下文对象
const ctx = { test: 1 };

// 执行中间件链
onion
  .handle(ctx)
  .then(() => {
    console.log('All middlewares executed.');
  })
  .catch(error => {
    console.error('Error executing middlewares:', error);
  });
```

输出：
![](https://huangmingfu.github.io/drawing-bed/images/pic-go/202411111432547.png)

## 总结
可以用于处理一系列按顺序执行的异步操作，并且每个操作都可以访问到相同的数据上下文ctx。场景有：身份验证、日志记录、错误处理等。