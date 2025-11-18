---
sticky: 500
tag:
 - Technology
---

# 效率终端：zsh + oh-my-zsh + agnoster（或powerlevel10k等其他主题）

## 介绍
传统的 bash 功能比较简陋，且不美观。Oh My Zsh（github已有`175k star`） 是基于 zsh 命令行的一个扩展工具集，提供了丰富的扩展功能，提升你的终端操作体验。（著名的[`Anthony Fu`](https://github.com/antfu/dotfiles/blob/main/.zshrc)也是使用的zsh终端哦~）  
本文将介绍 windows 下如何安装和配置 zsh 终端。mac 等其他系统安装比较简单，可以自行百度。

## 1. 安装zsh
安装包下载：https://packages.msys2.org/packages/zsh?repo=msys&variant=x86_64

a. 下载后，需要解压两次，`.pkg.tar.zst文件`解压器（安装后右键解压）：https://github.com/mcmilk/7-Zip-zstd/releases

b. 移动解压后的文件到`git 安装目录`，如：D:\software\Git

c. 打开 Git Bash 终端，`输入 zsh 命令`，然后直接输入 0 结束并`生成 .zshrc 配置文件`即可。（也可以输入1进行初始配置，然后输入0退出生成.zshrc文件）

## 2. 安装oh-my-zsh
git bash执行下面命令，出现oh-my-zsh则安装成功。
```sh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# sh -c "$(curl -fsSL https://gitee.com/pocmon/ohmyzsh/raw/master/tools/install.sh)"  # 上面不行的话，使用这个
```

## 3. 配置插件
```sh
cd ~/.oh-my-zsh/custom/plugins

git clone ... # 下载相关插件

# 推荐插件：
# zsh-autosuggestions 命令自动补全
# zsh-syntax-highlighting 命令语法高亮
# git git别名插件（内置）
# zsh-z 快速切换目录（内置）
```

### 相关插件克隆地址：
```sh
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# spaceship主题：
git clone https://github.com/denysdovhan/spaceship-prompt.git "$ZSH_CUSTOM/themes/spaceship-prompt" --depth=1
```

## 4.配置主题
```sh
cd ~/.oh-my-zsh/themes

git clone ... # 下载相关主题

# 推荐主题：
# agnoster 内置的主题，好看又方便，可直接使用
# powerlevel10k 最受欢迎的主题，但是需要配置相关字体，比较麻烦（需要git clone下载）
# spaceship antfu同款主题（需要git clone下载）
```

## 5. 配置zsh
```sh
vim ~/.zshrc # 不喜欢用vim编辑的，可以打开：c盘/用户/用户名/.zshrc 文件来直接txt文本编辑

# 主题配置
ZSH_THEME="spaceship"
# 启用插件（git、z）是zsh内置的插件
plugins=(git z zsh-autosuggestions zsh-syntax-highlighting)

# 然后esc退出编辑，冒号，wq保存并退出。

# 配置后不会立即生效，可以关闭所有终端重新打开，或者使用命令让配置生效：
source ~/.zshrc
```

## 6.设置git bash默认启动zsh
```sh
vim ~/.bashrc

if [ -t 1 ]; then
  exec zsh
fi

# 第二种方法（在../Git/etc/bash.bashrc文件末尾追加以下内容）：

# Launch Zsh
if [ -t 1 ]; then
exec zsh
fi
```

## 7.VSCode 配置 Git bash 为默认终端
控制台->终端->点击加号->选择默认配置文件->选择Git bash

## 其他
1. [git别名命令文档](https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/git/README.md)
2. 如果发现终端的`主机+用户名`前缀太长，以`agnoster.zsh-theme`主题文件为示例，可以修改为如下：
<details>
<summary>agnoster主题（搜索hmf替换为自己的）</summary>

```sh
# agnoster's Theme - https://gist.github.com/3712874

typeset -aHg AGNOSTER_PROMPT_SEGMENTS=(
    prompt_status
    prompt_context
    prompt_virtualenv
    prompt_dir
    prompt_git
    prompt_end
)

### Segment drawing
# A few utility functions to make it easy and re-usable to draw segmented prompts

CURRENT_BG='NONE'
if [[ -z "$PRIMARY_FG" ]]; then
	PRIMARY_FG=black
fi

# Characters
SEGMENT_SEPARATOR="\ue0b0"
PLUSMINUS="\u00b1"
BRANCH="\ue0a0"
DETACHED="\u27a6"
CROSS="\u2718"
LIGHTNING="\u26a1"
GEAR="\u2699"

# Begin a segment
# Takes two arguments, background and foreground. Both can be omitted,
# rendering default background/foreground.
prompt_segment() {
  local bg fg
  [[ -n $1 ]] && bg="%K{$1}" || bg="%k"
  [[ -n $2 ]] && fg="%F{$2}" || fg="%f"
  if [[ $CURRENT_BG != 'NONE' && $1 != $CURRENT_BG ]]; then
    print -n "%{$bg%F{$CURRENT_BG}%}$SEGMENT_SEPARATOR%{$fg%}"
  else
    print -n "%{$bg%}%{$fg%}"
  fi
  CURRENT_BG=$1
  [[ -n $3 ]] && print -n $3
}

# End the prompt, closing any open segments
prompt_end() {
  if [[ -n $CURRENT_BG ]]; then
    print -n "%{%k%F{$CURRENT_BG}%}$SEGMENT_SEPARATOR"
  else
    print -n "%{%k%}"
  fi
  print -n "%{%f%}"
  CURRENT_BG=''
}

### Prompt components
# Each component will draw itself, and hide itself if no information needs to be shown

# Context: user@hostname (who am I and where am I)
prompt_context() {
  local user=`whoami`

  if [[ "$user" != "$DEFAULT_USER" || -n "$SSH_CONNECTION" ]]; then
    prompt_segment $PRIMARY_FG default "hmf"
  fi
}

# Git: branch/detached head, dirty status
prompt_git() {
  local color ref
  is_dirty() {
    test -n "$(git status --porcelain --ignore-submodules)"
  }
  ref="$vcs_info_msg_0_"
  if [[ -n "$ref" ]]; then
    if is_dirty; then
      color=yellow
      ref="${ref} $PLUSMINUS"
    else
      color=green
      ref="${ref} "
    fi
    if [[ "${ref/.../}" == "$ref" ]]; then
      ref="$BRANCH $ref"
    else
      ref="$DETACHED ${ref/.../}"
    fi
    prompt_segment $color $PRIMARY_FG
    print -n " $ref"
  fi
}

# Dir: current working directory
prompt_dir() {
  prompt_segment blue $PRIMARY_FG ' %~ '
}

# Status:
# - was there an error
# - am I root
# - are there background jobs?
prompt_status() {
  local symbols
  symbols=()
  [[ $RETVAL -ne 0 ]] && symbols+="%{%F{red}%}$CROSS"
  [[ $UID -eq 0 ]] && symbols+="%{%F{yellow}%}$LIGHTNING"
  [[ $(jobs -l | wc -l) -gt 0 ]] && symbols+="%{%F{cyan}%}$GEAR"

  [[ -n "$symbols" ]] && prompt_segment $PRIMARY_FG default " $symbols "
}

# Display current virtual environment
prompt_virtualenv() {
  if [[ -n $VIRTUAL_ENV ]]; then
    color=cyan
    prompt_segment $color $PRIMARY_FG
    print -Pn " $(basename $VIRTUAL_ENV) "
  fi
}

## Main prompt
prompt_agnoster_main() {
  RETVAL=$?
  CURRENT_BG='NONE'
  for prompt_segment in "${AGNOSTER_PROMPT_SEGMENTS[@]}"; do
    [[ -n $prompt_segment ]] && $prompt_segment
  done
}

prompt_agnoster_precmd() {
  vcs_info
  PROMPT='%{%f%b%k%}$(prompt_agnoster_main) '
}

prompt_agnoster_setup() {
  autoload -Uz add-zsh-hook
  autoload -Uz vcs_info

  prompt_opts=(cr subst percent)

  add-zsh-hook precmd prompt_agnoster_precmd

  zstyle ':vcs_info:*' enable git
  zstyle ':vcs_info:*' check-for-changes false
  zstyle ':vcs_info:git*' formats '%b'
  zstyle ':vcs_info:git*' actionformats '%b (%a)'
}

prompt_agnoster_setup "$@"
```

</details>

## 参考链接
[zsh 安装与配置，使用 oh-my-zsh 美化终端](https://www.haoyep.com/posts/zsh-config-oh-my-zsh/#%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE)  
[一文搞定 Windows Terminal 设置与 zsh 安装【非WSL】](https://www.cnblogs.com/laugh12321/p/15788324.html#%E5%AE%89%E8%A3%85-oh-my-zsh)  
[Windows安装 Zsh 终端](https://blog.xlxs.top/archives/windows%E5%AE%89%E8%A3%85zsh%E7%BB%88%E7%AB%AF#id--1178998221)  

## 番外（Vim 简单操作）

```sh
1. 进入 Vim
vim 文件名：打开指定文件。

2. 模式切换
普通模式：默认进入的模式，用于执行命令。
插入模式：按 i 键进入，可以编辑文本。
退出插入模式：按 Esc 键返回普通模式。

3. 保存和退出
:w：保存文件。
:q：退出 Vim。
:wq：保存并退出。
:q!：强制退出且不保存。

4. 搜索
/关键词：在普通模式下输入，按 Enter 键开始搜索。
n：查找下一个匹配项。
N：查找上一个匹配项。

5. 编辑操作
x：删除当前光标下的字符。
dd：删除整行。
yy：复制当前行。
p：粘贴已复制或剪切的内容到光标下方。
u：撤销上一次操作。
Ctrl + r：重做上一次撤销的操作。

6. 光标移动
方向键或 h（左）、j（下）、k（上）、l（右）：移动光标。
0：跳转到行首。
$：跳转到行尾。
G：跳转到文件末尾。
gg：跳转到文件开头。
```