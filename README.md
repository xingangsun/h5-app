# H5-APP

一个标准的移动端单页应用样例。线上地址：[https://mrent.iwjw.com/](https://mrent.iwjw.com/)。

## 实现
+ vue2 + vuex + vue-router + vue-resource + mint-ui SPA
+ webpack2 + HMR
+ 模拟后端 + 环境配置 + 打包 + 发布
+ ES6+构建，ES6+代码 + ESLint
+ 适配Native APP + 微信浏览器 + 移动浏览器

## 使用
### 开发 + 模拟后端API
    npm run start

>1.此命令会启动开发和后端两个服务器，你可以在`config`文件夹中修改你的开发服务器配置  
2.开发服务器启动后，双击命令行上的链接地址即可在浏览器中打开  
3.编写`app`目录下的代码保存，浏览器即可热刷新  
4.编写`bkd`目录下的代码保存，后端服务器可热重启

### 开发
    npm run dev

### 构建发版
    npm run test
    npm run beta
    npm run prod

### 监听
    npm run watch

## 目录结构

h5-app 项目根目录
|---app 应用源码目录  
|　　|---demo demo业务源码  
|　　|　　|---components demo业务组件  
|　　|　　|---views demo业务页面  
|　　|　　|---api.js  
|　　|　　|---app.vue  
|　　|　　|---main.js demo业务入口  
|　　|---global 全局性  
|　　|　　|---bridge 与原生交互桥   
|　　|　　|---components 全局组件  
|　　|　　|---iconfont 字体图标  
|　　|　　|---img 全局图片  
|　　|　　|---iwjw 整站通用适配  
|　　|　　|---module 其他模块(样式重置，polyfill)    
|　　|　　|---utils 工具方法   
|　　|　　|---wechat 微信相关   
|---bkd 模拟后端API  
|　　|---api 模拟接口目录  
|　　|---img 模拟图片目录     
|---build 项目构建代码  
|　　|---config 构建项目用到的配置  
|　　|---task 构建任务入口  
|　　|---webpack.config.dev.js webpack开发配置  
|　　|---webpack.config.prod.js webpack上线配置  
|---config 项目配置  
|---doc 说明  
|---dist 打包生成代码目录  
|---zip 上线Zip包目录  
|---.babelrc babel运行时配置  
|---.editorconfig 编辑器配置  
|---.eslintignore eslint忽略配置  
|---.eslintrc.js eslint运行时配置  
|---.gitignore git忽略配置  
|---package.json npm配置  
|---README.md 项目自述  
