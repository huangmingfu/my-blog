---
sticky: 500
tag:
 - Technology
---

# 小知识点

## 知识点

### 费曼学习法

以教的方式，逼迫自己自觉，甚至是开心的完成有意识的主动学习。

在教别人之前自己也是一知半解的，但是为了教别人就需要想办法思考很多细节，这个过程是个主动思考、解决问题的过程，也是区别于单纯听课的最大差别。
等教完以后听的人也许还有疑问，为了回答对方的疑问又需要很多思考和准备，这样下来等教完别人自己也就掌握深刻了。
这也是为什么都喜欢有经验的教师的原因，因为老教师在日复一日的反复教学中会得到很多新的感悟，面对过各式各样的提问，所以尽管才多，教学方法也就随之改进了。

### `SPU` 与 `SKU`

- `SPU` = Standard Product Unit(标准化产品单元)：指的是商品，spu属性就是不会影响到库存和价格的属性, 又叫`关键属性`
  ，与商品是一对一的关系。
- `SKU` = Stock Keeping Unit(库存量单位)：指的是具体规格单品，sku属性就是会影响到库存和价格的属性, 又叫`销售属性`
  ，与商品是多对一的关系。

例子：

iphone15 -> 颜色：白，灰，蓝；存储容量：128G，256G

- spu指商品：iphone15
- sku指具体规格单品：白 256G
  sku一共有3*2=6个（机身颜色、存储容量）

## 技巧类

### Window 中杀死指定端口 cmd 命令行 taskkill

```shell
# 查询端口占用
netstat -aon|findstr "2375"
# 强行杀死进程
taskkill -pid 4724 -t -f

# 查看是被哪个程序占用了 这里ex:`svchost.exe`
tasklist|findstr "pid"

# 结束该进程
taskkill /f /t /im svchost.exe
```

### 查看电脑配置信息

cmd 执行命令 `dxdiag`  

### Github使用技巧

> 可参考链接：

1. https://mp.weixin.qq.com/s?__biz=MzAxODcyNjEzNQ==&mid=2247488018&idx=1&sn=5d64a97f058c90fe2cb6e3f3926f3c6c&chksm=9bd0bf8aaca7369ca71868327273fc681ce17b1393806e1f4d95fc6c6fb65a291ddc9f4e6b2c&mpshare=1&scene=1&srcid=&sharer_sharetime=1565311032972&sharer_shareid=936076bf8d5bee83e89fd7e769b5c6db&key=060acdb9ee560e139a4d7fdcb77c3ca102f01f42219febda98e7a1dcbefc5f73b56d11a6e72f2a75fe261f00646d9466fb88f8dcf54bb880cb8bb5a4723693328a5060a9615e824219263eee237657c0&ascene=1&uin=MTg4MzA0MzMxNA%3D%3D&devicetype=Windows+7&version=62060833&lang=zh_CN&pass_ticket=CIAeflQaDY95g7eLUlhq8J41M4BEHWFZoBWSBF%2BU8hbCLSos0E%2BBY5gk2ignlL0V

#### 精准分享关键代码高亮显示

比如你有一个文件里的某一行代码写得非常酷炫或者关键，想分享一下。可以在url后面加上#L行号比如，点击下面这个url：
https://github.com/zhengqingya/weixin-demo/blob/master/src/main/java/com/zhengqing/demo/DemoApplication.java#L10   ->
跳到DemoApplication.java的第10行。

那么问题来了？如果我是一段代码，即多行代码想分享呢？也很简单：url后面加上#L开始行号-L结束行号比如，AlloyTouch的运动缓动和逆向缓动函数如下面代码段所示：
https://github.com/zhengqingya/weixin-demo/blob/master/src/main/java/com/zhengqing/demo/DemoApplication.java#L6-L13

###### 其实也不用记忆你直接在网址后面操作，github自动会帮你生成url。比如你点击6行 -> 单选一行  再按住shift点击13行 -> 多选一段代码

#### 通过提交的msg自动关闭issues

比如有人提交了个issues https://github.com/AlloyTeam/AlloyTouch/issues/6
然后你去主干上改代码，改完之后提交填msg的时候，填入：
fix  https://github.com/AlloyTeam/AlloyTouch/issues/6

这个issues会自动被关闭。当然不仅仅是fix这个关键字。下面这些关键字也可以：

- close
- closes
- closed
- fixes
- fixed
- resolve
- resolves
- resolved

#### 通过HTML方式嵌入Github

如下面所示，user和repo改成你想要展示的便可以
<iframe src = "//ghbtns.com/github-btn.html?user=alloyteam&repo=alloytouch&type=watch&count=true" allowtransparency = "true" frameborder = "0" scrolling = "0" width = "110" height = "20" ></iframe>

#### .gitattributes文件 -> 设置项目语言

比如AlloyTouch最开始被识别成HTML项目。
因为HTML例子比JS文件多。怎么办呢？gitattributes来帮助你搞定。在项目的根目录下添加如下.gitattributes文件便可，
https://github.com/AlloyTeam/AlloyTouch/blob/master/.gitattributes 里面的：

```
*.html linguist-language= JavaScript   ->   主要意思是把所有html文件后缀的代码识别成js文件。
```

#### 查看自己项目的访问数据

在自己的项目下，点击Graphs，然后再点击Traffic
里面有Referring sites和Popular content的详细数据和排名。如：Referring sites
其中Referring sites代表大家都是从什么网站来到你的项目的，Popular content代表大家经常看你项目的哪些文件。

#### trending排行榜

上面教大家设置语言了，下面可以看看怎么查看某类型语言的每日排行榜。比如js每日排行榜：

- https://github.com/trending/javascript?since=daily
- https://github.com/trending/html?since=daily
- https://github.com/trending/css?since=daily
- Github推荐：https://github.com/explore

#### 其他

issue中输入冒号 : 添加表情
任意界面，shift + ？显示快捷键
issue中选中文字，R键快速引用

#### GitHub精确搜索项目

```
1.常用词含义
    watch：会持续收到项目的动态
    fork：复制某个项目到自己的仓库
    star：可以理解为点赞
    clone：将项目下载到本地
    follow：关注你感兴趣的作者，会收到他们的动态

2.in关键词限制搜索范围
（1）公式
    xxx in:name 项目名包含xxx的
    xxx in:description 项目描述包含xxx的
    xxx in:readme 项目
（2）case
    搜索项目名或者readme中包含秒杀的项目
        seckill in:name,readme
    
3.stars或fork数量关键词去查找
（1）公式
    :> 或者 :>=
    数字1..数字2
（2）case
    查找star数大于等于5000的springboot项目
        springboot stars:>=5000
    查找fork数大于500的springcloud项目
        springcloud forks:>500
    查找fork在100到200之间并且stars数在80到100之间的springboot项目
        springboot forks:100..200 stars:80..100
4.awesome加强搜索
（1）公式
    awesome 关键字
        awesome 系列一般是用来收集学习、工具、书籍类相关的项目
（2）case
    搜索优秀的redis相关的项目，包括框架、教程等
        awesome redis
5.高亮显示某一行代码
    地址后面紧跟#L数字
    地址后面紧跟#L数字1-数字2
6.项目内搜索
    英文t
    https://help.github.com/en/articles/keyboard-shortcuts
7.搜索某个地区内的牛逼人物
（1）公式
    location：地区
    language：语言
（2）case
    location:guangzhou language:java
```

github界面内按`。`可打开vscode进行文件编辑

## 工具类

### css生成工具

1. Neumorphism 地址：https://neumorphism.io/
2. 带有渐变的图标 地址：https://www.iconshock.com/svg-icons/
3. Interactions 地址：https://easings.co/
4. 大型数据库 地址：https://bansal.io/pattern-css
5. 自定义形状分隔线 地址：https://www.shapedivider.app/
6. 动画 地址：https://animista.net/
7. Mask 地址：https://bennettfeely.com/
8. 动画按钮 地址：https://tympanus.net/Development/MagneticButtons/index.html
9. 背景图案 地址：https://www.magicpattern.design/tools/css-backgrounds
10. SVG波浪 地址：https://svgwave.in/

### 临时邮箱

- https://mail.td/zh

### 临时手机号接收短信验证码

- https://receive-a-sms.com
- http://www.lothelper.com/cn
- https://yunduanxin.net
