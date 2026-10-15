---
name: submit-project
description: Use when the user asks to 提交项目 / 提交代码 / 上传项目 / commit 并 push the current project to Gitee. Commits all current changes and pushes the current project to the Gitee remote https://gitee.com/Zhang_yao_fu/advanced-web-design.
---

# 提交项目到 Gitee

把当前项目用 git 提交并推送到 Gitee 仓库：

```
https://gitee.com/Zhang_yao_fu/advanced-web-design
```

## 触发场景

用户说「提交项目」「提交代码」「上传到 gitee」「commit 并 push」「帮我 push」等，
且目标是上述 Gitee 仓库时使用本 skill。

## 默认项目路径

本 skill 默认针对下面这个本地项目目录操作（除非用户明确指定了别的目录）：

```
C:\Users\64020\OneDrive\Desktop\学工\qianduan
```

该目录已初始化为 git 仓库，`origin` 已指向上面的 Gitee 仓库，默认分支为 `master`。
执行时对 `git` 命令使用 `-C "C:\Users\64020\OneDrive\Desktop\学工\qianduan"` 指定该路径。
若用户指定了其他目录，则以用户指定的为准。

## 执行步骤

1. **确认是 git 仓库**
   - 运行 `git rev-parse --is-inside-work-tree`（在默认项目路径下）。
   - 若不是仓库，先 `git init`，并确保存在 `.gitignore`（至少忽略 `node_modules/`、`dist/`、`build/`、`.env` 等）。

2. **查看变更**
   - 运行 `git status` 与 `git diff --stat`，确认要提交的内容。
   - 不要提交密钥、令牌、`.env` 等敏感文件。发现敏感文件时先中止并告知用户。

3. **暂存并提交**
   - `git add -A`
   - 提交信息用简洁的祈使句，例如：
     - `git commit -m "update project"`
     - 有明确改动时按其内容编写，如 `git commit -m "add login page"`。
   - 若没有可提交的改动（nothing to commit），跳到第 5 步直接推送。

4. **确保远程指向目标仓库**
   - 运行 `git remote -v`。
   - 若没有 `origin`：`git remote add origin https://gitee.com/Zhang_yao_fu/advanced-web-design.git`
   - 若 `origin` 不是该地址：`git remote set-url origin https://gitee.com/Zhang_yao_fu/advanced-web-design.git`

5. **推送**
   - 首次推送当前分支：`git push -u origin HEAD`
   - 之后：`git push`
   - 若远端有新提交导致被拒绝：先 `git pull --rebase origin <branch>` 再 push，遇到冲突时告知用户手动解决，不要强推。
   - **不要**使用 `--force`，除非用户明确要求。

6. **汇报结果**
   - 用一句话说明：提交的 commit、推送的分支、仓库地址。

## 注意

- 只在用户明确要求「提交/推送」时才执行，不要主动提交。
- 提交前不要修改用户的 git 全局配置。
- 认证失败（需要 Gitee 账号密码/令牌）时，提示用户配置凭据后重试。
