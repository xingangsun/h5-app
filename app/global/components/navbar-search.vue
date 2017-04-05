<template>
<div class="navbar-search">
    <div class="navbar">
        <i class="iconfont if-listhome" @click="goMainHome"></i>
        <div class="tip" @click="showSearchPanel(true)"><i class="iconfont if-message"> 请输入小区名或地址</i></div>
        <i class="iconfont if-nav" @click="openSidebar"></i>
    </div>
    <div class="search-panel" @click="showSearchPanel(false)" :class="{show: showPanel, hide: !showPanel}">
        <div class="search-bar" @click.prevent.stop>
            <i class="iconfont if-message"></i>
            <input ref="input" type="search" v-model.trim="kw" placeholder="请输入小区名或地址">
            <i v-show="kw != ''" class="iconfont if-close" @click="clearInput"></i>
            <div class="cancel" @click="showSearchPanel(false)">取消</div>
        </div>
        <ul class="search-result scrollable">
            <li v-for="s of list" :key="s.id" @click="gohouseListPage(s)">
                <div class="tit"><span>{{s.key}}</span><span v-if="s.houseNum">{{s.houseNum}}套</span></div>
                <div class="name" v-if="s.name">{{s.name}}</div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import api from './api'

export default {
    name: 'navbar-search',
    data () {
        return {
            showPanel: false, // 显示搜索面板
            kw: '', // 搜索关键词
            list: [] // 推荐列表
        }
    },
    watch: {
        kw (kw) { // 监控输入值变化
            if (this.timeout) {
                clearTimeout(this.timeout)
            }
            this.timeout = setTimeout(() => {
                this.loadData()
            }, 200)
        }
    },
    created () {
        this.loadData()
    },
    methods: {
        ...mapActions(['setSidebar']),
        // 打开侧边菜单
        openSidebar () {
            this.setSidebar({ show: true })
        },
        // 显示搜索面板
        showSearchPanel (showPanel) {
            this.showPanel = showPanel
            if (showPanel) {
                this.$nextTick(() => {
                    this.$refs.input.focus()
                })
            }
        },
        // 清空输入
        clearInput () {
            this.kw = ''
            this.loadData()
        },
        // 加载数据
        loadData () {
            if (this.kw == '') {
                let historyList = utils.storage.get('navbar-search.history') || []
                this.list = historyList
                return
            }
            api('getSuggestions', {
                provinceId: 2,
                searchName: this.kw,
                houseType: 4
            }, true).then(result => {
                this.list = result.data || []
            }).catch(err => console.log(err))
        },
        // 主站首页
        goMainHome () {
            location.href = pageConfig.mobileMainSiteUrl
        },
        // 去M站列表页
        gohouseListPage (s) {
            let historyList = utils.storage.get('navbar-search.history') || []
            if (!historyList.some(n => n.id == s.id)) {
                historyList.unshift(s)
            }
            historyList = historyList.slice(0, 10)
            utils.storage.set('navbar-search.history', historyList)

            let { g, id } = s
            let { kw } = this
            location.href = `${pageConfig.mobileMainSiteUrl}/brandhouse/shanghai/g${g}id${id}/?kw=${kw}`
        }
    }
}
</script>

<style lang="sass">
.navbar-search {
    position: fixed;
    z-index: 1000;
    width: 100%;
    line-height: 40px;
    left: 0;
    top: 0;
    background-color: #fff;

    .navbar {
        display: flex;
        align-items: center;

        > .iconfont {
            width: 16px * 3;
            text-align: center;
            font-size: 18px;
        }

        .tip {
            flex: 1;
            line-height: 28px;
            background-color: #F7F7F7;
            border-radius: 3px;
            color: #BDBDBD;
            padding: 0 10px;
        }
    }

    .search-panel {
        position: fixed;
        z-index: 1001;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, .5);
    }

    .search-bar {
        display: flex;
        align-items: center;
        line-height: 40px;
        padding: 0 16px;
        position: relative;
        border-bottom: 1px solid #e5e5e5;
        background-color: #fff;

        .if-message {
            position: absolute;
            left: 26px;
            color: #616161;
        }

        .if-close {
            position: absolute;
            right: 74px;
            color: #dfdfdf;
            font-size: 20px;
        }

        input {
            flex: 1;
            background-color: #F7F7F7;
            border-radius: 3px;
            padding: 0 32px;
            line-height: 28px;
        }

        .cancel {
            width: 48px;
            color: #e84a01;
            text-align: right;
            font-size: 16px;
        }
    }

    .search-result {
        line-height: 46px;
        color: #747e89;
        background-color: #fff;
        max-height: 100%;

        li {
            padding: 12px 16px;
            border-bottom: 1px solid #e5e5e5;
            line-height: 1;
        }

        .tit {
            display: flex;
            justify-content: space-between;
            font-size: 16px;

            span:nth-child(2) {
                font-size: 14px;
                color: #bdbdbd;
            }
        }

        .name {
            font-size: 12px;
            color: rgba(0,0,0,.54);
            margin-top: 6px;
        }
    }
}
</style>
