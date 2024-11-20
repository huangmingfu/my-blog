---
sticky: 500
tag:
 - Technology
---

# git别名使用提高git操作效率

Git 提供了一个非常强大的功能叫做别名（alias），它可以让我们用自定义的简短命令来代替长长的Git命令。这样不仅可以提高我们的工作效率，还可以使命令更易于记忆。

## 配置方法

首先，你可以使用以下命令查看当前Git的配置：

```bash
git config --list --show-origin
```

要添加别名配置，你可以：

1. 执行上面的命令，然后直接 `ctrl+点击` 打开文件修改
2. 使用命令行配置：
```bash
git config --global alias.别名 '命令'
```
3. 使用 git config --global -e 命令直接编辑全局配置文件

## 常用别名配置

以下是一些常用的Git别名配置示例：

```bash
[alias]
    # 基础命令简写
    s = status                    # 查看仓库状态
    b = branch                    # 查看分支列表
    co = checkout                 # 切换分支
    cob = checkout -b             # 创建并切换到新分支

    # 提交相关
    cm = commit -m                # 提交修改
    ca = commit --amend          # 修改上次commit的信息
    undo = reset --soft HEAD^    # 撤销上次commit（保留修改）
    res = reset --hard HEAD^     # 撤销上次commit和修改

    # 分支管理
    # 批量删除包含指定字符的本地分支（默认匹配"huangmingfu"）（注意根据自己的进行修改）
    del = "!f() { local pattern=${1:-huangmingfu}; git branch | grep \"$pattern\" | xargs git branch -D; }; f"

    # 快速工作流
    # 一键添加、提交、推送（默认消息为"feat: update"）
    done = "!f() { local commitDescInfo=${1:-\"feat: update\"}; git add . && git commit -m \"${commitDescInfo}\" && git push; }; f"

    # 日志查看（美化版）
    lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
```

## 使用示例

### 基础操作

```bash
# 查看状态
git s

# 切换分支
git co develop

# 创建并切换到新分支
git cob feature/new-feature
```

### 提交操作

```bash
# 快速提交并推送
git done "feat: 添加新功能"

# 撤销上次提交（保留修改）
git undo

# 修改上次commit的信息
git ca
```

### 分支管理

```bash
# 删除所有包含"feature"的本地分支
git del feature

# 删除所有包含默认字符的分支
git del
```

### 查看日志

```bash
# 查看美化后的提交日志
git lg
```

## 进阶技巧

1. **组合命令**
   可以在别名中组合多个Git命令，使用 `&&` 连接：
   ```bash
   # 示例：拉取最新代码并重建分支
   update = "!f() { git fetch origin && git reset --hard origin/master; }; f"
   ```

2. **带参数的别名**
   使用函数方式可以接收参数：
   ```bash
   # 示例：快速切换到指定远程分支
   gcr = "!f() { git checkout -b $1 origin/$1; }; f"
   ```

## 其他

1. 使用 `!` 开头的别名表示这是一个shell命令
2. 使用函数定义（`f()`）可以处理参数
3. 可以根据自己的习惯定制自己喜欢的别名