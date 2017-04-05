<template>
<transition name="sidebar">
    <div class="sidebar-wrapper" @click="close" v-show="sidebar.show">
        <div class="sidebar" @click.prvent.stop>
            <div class="close" @click="close"><i class="iconfont if-delete"></i></div>
            <ul>
                <li v-if="showType.sale" @click="goPage('sale')"><i class="iconfont if-homesale"></i> 二手房</li>
                <li v-if="showType.newhouse" @click="goPage('newhouse')"><i class="iconfont if-homenewhouse"></i> 新房</li>
                <li v-if="showType.chuzu" @click="goPage('chuzu')"><i class="iconfont if-homerent"></i> 租房</li>
                <li v-if="showType.brandhouse" @click="goPage('brandhouse')" class="active"><i class="iconfont if-home_gongyu"></i> 品牌公寓</li>
                <li @click="goPage('service')"><i class="iconfont if-homecomission"></i> 业主委托</li>
            </ul>
            <div class="city" v-if="cityList.length > 0 && provinceId">所在城市&nbsp;
                <select v-model="provinceId" @change="onProvinceIdChange">
                    <option v-for="c of cityList" :value="c.id">{{c.name}}</option>
                </select>
                <i class="iconfont if-arrow-down"></i>
            </div>
            <div class="btn-down" @click="downApp"><i class="iconfont if-download"></i> 点击下载APP</div>
        </div>
    </div>
</transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import api from './api'

export default {
    name: 'sidebar',
    data () {
        return {
            cityList: [], // 城市列表
            showType: {}, // 要显示的业务
            provinceId: null // 城市ID，默认2上海
        }
    },
    computed: {
        ...mapGetters(['sidebar'])
    },
    // watch: {
    //     $route (to, from) {
    //         let { provinceId } = to.query
    //         if (!provinceId) {
    //             provinceId = utils.storage.get('sidebar.provinceId') || 2
    //         } else {
    //             provinceId = this.getCity(provinceId).id
    //         }
    //         provinceId = Number(provinceId)
    //         this.loadData(provinceId)
    //         this.setProvinceId(provinceId)
    //     }
    // },
    created () {
        let { provinceId } = this.$route.query
        if (!provinceId) {
            provinceId = utils.storage.get('sidebar.provinceId') || 2
        } else {
            provinceId = this.getCity(provinceId).id
        }
        provinceId = Number(provinceId)
        this.loadData(provinceId)
        this.setProvinceId(provinceId)
    },
    methods: {
        ...mapActions(['setSidebar']),
        getCity (provinceId) {
            provinceId = provinceId || this.provinceId
            return this.cityList.find(c => c.id == provinceId) || { id: 2, spell: 'shanghahi' }
        },
        onProvinceIdChange () {
            this.close()
            let { id, spell } = this.getCity()
            this.setProvinceId(id)
            location.href = `${pageConfig.mobileMainSiteUrl}/${spell}/`
        },
        // 设置城市ID
        setProvinceId (provinceId) {
            this.provinceId = provinceId
            utils.storage.set('sidebar.provinceId', provinceId)
        },
        // 加载数据
        loadData (provinceId) {
            api('cityList', { provinceId }, true).then(result => {
                if (result.data) {
                    let { list, bussinessType } = result.data
                    this.cityList = list
                    this.showType = bussinessType
                }
            }).catch(err => console.log(err))
        },
        goPage (page) {
            this.close()
            let { spell } = this.getCity()
            location.href = `${pageConfig.mobileMainSiteUrl}/${page}/${spell}`
        },
        // 关闭
        close () {
            this.setSidebar({ show: false })
        },
        // 下载APP
        downApp () {
            this.close()
            iwjw.checkApp()
        }
    }
}
</script>

<style lang="sass">
.sidebar-wrapper {
    position: fixed;
    z-index: 10000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: all .3s ease-out;

    &.sidebar-enter, &.sidebar-leave-active {
        background-color: transparent;

        .sidebar {
            transform: translateX(0);
        }
    }
}

.sidebar {
    position: absolute;
    top: 0;
    left: 100%;
    width: 220px;
    height: 100%;
    background-color: #fff;
    padding: 32px 0 0 32px;
    font-size: 16px;
    transform: translateX(-220px);
    transition: transform .3s ease-out;

    .close {
        line-height: 1;
        color: #C7C7CC;
        position: absolute;
        top: 16px - 6px;
        right: 32px - 6px;
        padding: 6px;
        font-size: 16px;
    }

    ul {
        margin-top: 12px;
        border-bottom: 1px solid #E5E5E5;
    }
    li {
        padding: 12px 0;

        &.active {
            color: #e84a01;
        }
    }

    .city {
        margin-top: 24px;

        select {
            vertical-align: baseline;
            background: transparent;
            width: 50px;
        }

        .iconfont {
            position: relative;
            left: -15px;
            z-index: -1;
        }
    }

    .btn-down {
        margin-top: 32px;
        border: 2px solid #E84A01;
        line-height: 40px;
        border-radius: 22px;
        text-align: center;
        font-weight: bold;
        color: #E84A01;
        margin-right: 32px;
    }
}
</style>
