/**
 * 别名
 */
const cwd = process.cwd() // 项目根目录

export default {
  app: `${cwd}/app`, // 源码目录
  global: `${cwd}/app/global`, // 全局目录

  utils: `${cwd}/app/global/utils`, // 工具
  bridge: `${cwd}/app/global/bridge`, // 与原生交互桥
  iwjw: `${cwd}/app/global/iwjw`, // 通用适配
  wechat: `${cwd}/app/global/wechat`, // 通用适配
}
