<template>
<div id="app" :class="['app', { scrollable: isIos, native: browser.isApp, h5: !browser.isApp }]">
    <!-- 页面视图 -->
    <router-view></router-view>
    <!-- app sidebar -->
    <sidebar v-if="!browser.isApp && $route.name == 'house-index'"></sidebar>
</div>
</template>

<script>
import Sidebar from 'global/components/sidebar'

export default {
    name: 'app',
    components: {
        Sidebar
    },
    data () {
        return {
            isIos: utils.os.isIos // 兼容iOS回弹效果的滚动，Android任然使用window滚动
        }
    }
}
</script>

<style lang="sass">
@import "global/module/reset.scss"; // 全局样式重置
@import "./app.scss"; // app样式
</style>
