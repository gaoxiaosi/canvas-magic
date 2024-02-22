#!/usr/bin/env sh

# 发生错误时终止
set -e

# 构建
npm run build

# 进入构建文件夹
cd dist

time=$(date "+%Y-%m-%d %H:%M")

# 初次部署的时候需要这两条命令
# git init
git checkout main
git add -A
git commit -m "deploy at ${time}"

# 部署在 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:gaoxiaosi/canvas-magic.git main:gh-pages
