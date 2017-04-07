/**
 * 静态、活动页面
 */
const AboutRebate = r => require.ensure([], () => r(require('./views/about-rebate')), 'static-about-rebate')
const WhatHouse = r => require.ensure([], () => r(require('./views/what-house')), 'static-what-house')

export default [{
  path: '/static/about-rebate', // 关于租金返利券
  name: 'static-about-rebate',
  component: AboutRebate,
  meta: {
    title: '租金返利券首月节省45%'
  }
}, {
  path: '/static/what-house', // 关于品牌公寓
  name: 'static-what-house',
  component: WhatHouse,
  meta: {
    title: '品牌公寓是什么'
  }
}]
