/**
 * 获得API
 *
 * # Usage
 * api(API名称)
 */
let basePath = ''
if (__DEV__) {
  if (!utils.browser.isApp) {
    basePath = 'http://10.7.249.168:3001'
    // basePath = 'http://m.rent.iwjwtest.com'
    // basePath = 'http://m.rent.iwjwbeta.com'
  }
}

const apiMap = {
  bannerList: 'banner/list', // 广告列表
  getRecommendList: 'brandRent/getRecommendList', // 品牌公寓推荐列表
  getBrandList: 'brandRent/getBrandList', // 品牌公寓列表
  getBrandDetail: 'brandRent/getBrandDetail' // 品牌公寓详情
}

export default function (name, ...args) {
  return iwjw.ajax(`${basePath}/api/${apiMap[name]}`, ...args)
}
