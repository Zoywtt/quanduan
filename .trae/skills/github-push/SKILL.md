---
name: github-push
description: Commit and push the qianduan project to GitHub Zoywtt/quanduan using SSH key. Use when the user asks to push to GitHub, 提交到github, or sync with GitHub repo. Do not use for Gitee pushes.
---

# GitHub 推送 Skill

把本项目（`C:\Users\64020\OneDrive\Desktop\学工\qianduan`）用 SSH 公钥提交并推送到 GitHub 仓库 `git@github.com:Zoywtt/quanduan.git`。

## 固定参数

| 项目 | 值 |
|---|---|
| 工作目录 | `C:\Users\64020\OneDrive\Desktop\学工\qianduan` |
| GitHub 仓库（标准 SSH） | `git@github.com:Zoywtt/quanduan.git` |
| GitHub 仓库（443 端口 fallback） | `ssh://git@ssh.github.com:443/Zoywtt/quanduan.git` |
| SSH 私钥 | `~/.ssh/id_ed25519`（2026-10-15 创建，已加入 GitHub） |
| 本地 git 身份 | user.name=`张耀夫`, user.email=`1827735290@qq.com` |

## 触发场景

用户说「推送到 GitHub」「提交到 github」「同步到 GitHub 仓库」「push to github」等时使用。

## 前置条件

SSH 公钥 `id_ed25519.pub` 已加入 GitHub 账号 `Zoywtt`，仓库 `Zoywtt/quanduan` 已创建且可见。

## 执行步骤

### 1. 确认 SSH 可达性

首先测试标准 22 端口：
```
$env:GIT_SSH_COMMAND = "ssh -o StrictHostKeyChecking=no"
git -C "<workdir>" ls-remote git@github.com:Zoywtt/quanduan.git
```
- exit code 0 → 22 端口可用，后续用标准地址
- exit code 255 + "Connection refused" 或超时 → 22 端口被校园网/公司网阻断，**切换到 443 fallback**

### 2. 若 22 端口不通，启用 SSH over 443 fallback

在 PowerShell 中设置当前会话环境变量：
```
$env:GIT_SSH_COMMAND = "ssh -p 443 -o StrictHostKeyChecking=no"
```
后续所有 git 命令都会自动走 `ssh.github.com:443`。推送目标地址相应改为 `ssh://git@ssh.github.com:443/Zoywtt/quanduan.git`。

### 3. 检查并添加 GitHub remote

```
git -C "<workdir>" remote -v
```
- origin 可能已指向 Gitee（`https://gitee.com/...`），**不要修改 origin**
- 检查是否存在名为 `github` 的 remote：
  - 不存在 → `git -C "<workdir>" remote add github <地址>`
  - 存在但地址不对 → `git -C "<workdir>" remote set-url github <地址>`

`<地址>` 根据步骤 1 的结果选择标准 SSH 或 443 fallback 地址。

### 4. 查看变更并提交

```
git -C "<workdir>" status --short
git -C "<workdir>" add -A
git -C "<workdir>" commit -m "说明性提交信息"
```
- 提交信息简洁描述变更，如 `add 16-1 数7游戏`
- 若无变更（nothing to commit），跳过 commit 直接 push

### 5. 推送到 GitHub

```
git -C "<workdir>" push -u github HEAD
```
- 首次推送加 `-u` 建立分支追踪关系
- 后续推送可直接 `git -C "<workdir>" push github`

### 6. 汇报结果

输出：commit hash + 提交信息 + 推送分支 + GitHub 仓库地址。

## 注意事项

- **不要 --force push**；如果远端有新提交导致被拒绝，用 `git pull --rebase github <branch>` 解决
- **不要修改 origin**（Gitee remote 保持不变）
- 提交前不要修改 git 全局配置（user.name/user.email 已在仓库级配置好）
- 敏感文件（密钥、`.env`、凭据 token）不要提交，确保 `.gitignore` 覆盖
- 如果 443 也不通，告知用户检查网络或手动配置代理
