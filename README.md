# Vue 单页模板

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

基于 [vuejs][vuejs] 全家桶 和 `@mediinfo-ued/medi-ui@1.x` 开发的的系统。

## 目录结构

```bash
Project files/
├── .vscode/
├── config/
│   ├── proxy.js                ---- 请求代理
│   └── webpack.config.js       ---- 自定义 webpack 配置
├── public/
├── src/
│   ├── assets/                 ---- 公共资源
│   │   ├── images/
│   │   └── styles/
│   ├── components/             ---- 全局组件
│   ├── includes/               ---- 布局碎片，比如布局头部，侧边栏
│   ├── layouts/                ---- 布局结构文件
│   ├── lib/                    ---- 工具函数
│   ├── mocks/                  ---- 假数据
│   ├── router/                 ---- 路由
│   ├── store/                  ---- vuex
│   ├── views/                  ---- 路由视图
│   └── main.js                 ---- 应用入口
├── .env
├── package.json
├── README.md
└── vue.config.js               ---- @vue/cli 配置
```

## 启动项目

你需要安装 [node.js][node.js] 的版本为 `nodejs >= 10`。

克隆此仓库后运行:

```shell
# 安装依赖，推荐用 yarn 安装
$ npm install

# 启动本地服务
$ npm run serve
```

在 `package.json` 文件的 `scripts` 部分还有一些其他脚本可用.

[node.js]: https://nodejs.org/
[vuejs]: https://cn.vuejs.org/
