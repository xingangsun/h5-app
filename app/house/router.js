/**
 * 品牌公寓
 */
const Index = r => require.ensure([], () => r(require('./views/index')), 'house-index')
const Detail = r => require.ensure([], () => r(require('./views/detail')), 'house-detail')

export default [{
    path: '/house/index', // 公寓首页
    alias: '/', // 公寓首页
    name: 'house-index',
    component: Index,
    meta: {
        title: '公寓首页'
    }
}, {
    path: '/house/detail', // 公寓详情页
    name: 'house-detail',
    component: Detail,
    meta: {
        title: '公寓详情页'
    }
}]
