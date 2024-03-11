---
top: 4
sticky: 998
tag:
 - Technology
---

# 🛡️ 防抖方案（防止用户频繁点击而发送多次重复请求）

::: tip
以下代码以React+Ts为例
:::

## 1.利用原生setTimeout方法实现防抖：
```sh
const timer = useRef<NodeJS.Timeout | null>(null)
const handleClick = useCallback(() => {
    timer.current && clearTimeout(timer.current)
    timer.current = setTimeout(()=>{
        //...逻辑
    },500)
})
```

## 2.使用lodash-es的debounce方法实现防抖
```sh
//react使用lodash-es的debounce方法需要用useCallback包裹，不然会有bug
const handleClick = useCallback(debounce((v) => {
    //...逻辑
}, 500), [])
```

## 3.使用loading加载配合（推荐）：
::: warning 原因
上述实现方法其实都存在一个问题，这个问题也是运营和后端反馈给我的bug，我在项目中就是使用了第二种方法，
但是会导致一个问题：  
`如果请求还在等待中，用户缓慢的点击比如隔了600ms（越过了防抖设置的时间），还是会再次发重复请求，从而导致业务创建了3次公会`  
`解决如下👇`
:::
```sh
//提交后显示全屏loading蒙版效果，且在逻辑里return掉
const [loading, setLoading] = useState(false)
const refLoading = useRef(loading)
refLoading.current = loading

//提交请求的函数
if (refLoading.current) return
setLoading(true)
const { data, code, message } = await xxxxx()
setLoading(false)
```