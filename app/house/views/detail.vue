<template>
<div class="house-detail" v-if="house != null">
    <!-- 照片 -->
    <div class="swipe-wrapper" v-if="house.picUrls && house.picUrls.length > 0">
        <swipe :auto="0" :show-indicators="false" :prevent="true">
            <swipe-item v-for="(picUrl, index) of house.picUrls" :key="index"
            v-lazy:background-image="picUrl">
                <span class="lb">{{index + 1}}/{{house.picUrls.length}}</span>
            </swipe-item>
        </swipe>
        <div class="home" @click="goHome"><i class="iconfont if-listhome"></i></div>
    </div>
    <div class="info">
        <div class="info-1">{{house.zoneName}}
            <span class="lbel" :class="'lbel-' + house.rentType">{{house.rentType == 1 ? '合租' : '整租'}}</span>
        </div>
        <div class="info-2">{{house.houseRoom}}{{house.rentType == 1 ? '·' + house.roomName : ''}}·{{house.houseSpace}}</div>
        <div class="info-3 clearfix">
            <span class="price">{{house.rentPrice}}<span class="unit">元/月</span>
                <span v-if="house.backAmount" class="back" t="返">{{house.backAmount}}元</span>
            </span>
            <span class="right"><i class="iconfont if-gongyu_dimond"> {{house.brandName}}</i></span>
        </div>
    </div>
    <div class="chek" v-if="house.features && house.features.length > 0">
        <span v-for="f of house.features"><i class="iconfont if-featureinstruction"> {{f}}</i></span>
    </div>
    <div class="area">
        <div class="item">
            <span class="tit">编号：</span><span class="val">{{house.houseCode}}</span>
        </div>
        <div class="item item-2">
            <span>
                <span class="tit">楼层：</span><span class="val">{{house.floorType}}</span>
            </span>
            <span>
                <span class="tit">朝向：</span><span class="val">{{house.forward}}</span>
            </span>
        </div>
        <div class="item item-s" v-if="house.subwayList && house.subwayList.length > 0">
            <span class="tit">地铁：</span><span class="val" v-html="house.subwayList && house.subwayList.join('<br>')"></span>
        </div>
        <div class="item">
            <span class="tit">小区：</span><span class="val">{{house.zoneName}}</span>
        </div>
        <div class="item item-h" :style="{backgroundImage: backgroundImage}">
            <span class="tit">地址：</span><span class="val">{{house.zoneAddress}}</span>
        </div>
    </div>
    <div class="desc">
        <div class="tit-b">房屋描述</div>
        <div class="cont" :class="{open: descOpen}">{{house.describe}}</div>
        <div class="btn-more" v-if="!descOpen" @click="descOpen = true">展开更多 <i class="iconfont if-rightarrow"></i></div>
    </div>
    <div class="support" v-if="house.houseSupports && house.houseSupports.length > 0">
        <div class="tit-b">房屋配套</div>
        <div class="cont">
            <div v-for="s of house.houseSupports" class="item" :class="{gray: !s.flag}">
                <img :src="s.url"><br>{{s.name}}
            </div>
        </div>
    </div>
    <div class="rmd">
        <div class="tit-b">推荐房源</div>
        <div class="cont">
            <list-item v-for="house of recommendList" :key="house.houseId" :house="house" :brand-recom-id="brandRecomId"></list-item>
        </div>
    </div>

    <download-alert page="flathome">下载APP预约看房</download-alert>
</div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui'
import ListItem from '../components/list-item'
import DownloadAlert from 'global/components/download-alert'
import api from '../api'

export default {
    name: 'house-detail',
    components: {
        Swipe,
        SwipeItem,
        ListItem,
        DownloadAlert
    },
    data () {
        return {
            house: null, // 详情数据
            descOpen: false, // 房屋描述展开
            recommendList: [], // 推荐列表
            brandRecomId: '',  // 品牌公寓推荐ID
            loading: false // 加载中
        }
    },
    computed: {
        backgroundImage () {
            let iconUrl = require('global/img/location.nobase.png?nobase').replace('https', 'http')
            let { lon, lat } = this.house
            return lon && lat ? `-webkit-linear-gradient(left, rgba(255, 255, 255, 1) 33.3%, rgba(255, 255, 255, 0) 75%), url(${location.protocol}//api.map.baidu.com/staticimage?center=${lon - 0.0035},${lat}&width=608&height=128&zoom=17&scale=2&markers=${lon},${lat}&markerStyles=-1,${iconUrl})` : ''
        }
    },
    created () {
        this.loadData()
    },
    methods: {
        // 加载详情数据
        loadData () {
            this.loading = true
            let { houseId } = this.$route.query
            api('getBrandDetail', {
                houseId
            }).then(result => {
                console.log(result)
                this.house = result.data || result
            }).catch(err => console.log(err))

            api('getRecommendList', {
                type: 2, // 业务类型  1公寓首页（公寓首页不需要传房源id）  2房源详情
                pageSize: 20
            }).then(result => {
                let { list, brandRecomId } = result.data || result
                this.recommendList = list || []
                this.brandRecomId = brandRecomId
            }).catch(err => {
                this.loading = false
                console.log(err)
            })
        },
        // 去主页
        goHome () {
            iwjw.go({
                href: `${pageConfig.mobileMainSiteUrl}`
            })
        }
    }
}
</script>

<style lang="sass">
.house-detail {
    min-height: 100%;
    margin-bottom: 56px;

    .swipe-wrapper {
        padding-top: 214 / 320 * 100%;

        .mint-swipe-item {
            background-repeat: no-repeat;
            background-position: center;

            &[lazy=loaded] {
                background-size: cover;
            }
        }
    }

    .home {
        position: absolute;
        left: 16px;
        top: 16px;
        width: 32px;
        height: 32px;
        line-height: 32px;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .5);
        text-align: center;
        color: #fff;
        font-weight: bold;
        font-size: 18px;
    }

    .lb {
        position: absolute;
        right: 8px;
        bottom: 8px;
        background-color: rgba(0, 0, 0, .54);
        color: #fff;
        width: 42px;
        line-height: 22px;
        text-align: center;
        border-radius: 2px;
    }

    .info {
        padding: 16px;
        background-color: #fff;
    }

    .info-1 {
        font-size: 14px;
        color: #757575;
    }

    .lbel {
        float: right;
        width: 38px * 2;
        border-radius: 9px * 2;
        border-width: 1px * 2;
        border-style: solid;
        font-size: 10px * 2;
        text-align: center;
        line-height: 16px * 2;
        display: inline-block;
        transform-origin: 100% 0;
        transform: scale(.5);
    }

    .lbel-1 {
        background-color: rgba(76, 175, 80, .10);
        border-color: #4CAF50;
        color: #4CAF50;
    }

    .lbel-2 {
        background-color: rgba(48, 131, 251, .10);
        border-color: #3083FB;
        color: #3083FB;
    }

    .info-2 {
        font-size: 18px;
    }

    .info-3 {
        display: flex;
        justify-content: space-between;

        .price {
            font-size: 22px;
            color: #E84A01;
            float: left;
            flex: 1;
            position: relative;
        }

        .unit {
            font-size: 12px;
        }

        .back {
            display: inline-block;
            width: 52px * 2;
            line-height: 14px * 2;
            font-size: 10px * 2;
            border: 1px * 2 solid #E84A01;
            border-radius: 1px * 2;
            transform-origin: 0;
            transform: scale(.5);
            position: absolute;
            margin-left: 2px * 2;
            padding-left: 20px * 2;

            &:before {
                content: attr(t);
                font-size: 11px * 2;
                color: #fff;
                background-color: #E84A01;
                width: 18px * 2;
                line-height: 14px * 2;
                margin-right: 2px * 2;
                display: inline-block;
                text-align: center;
                position: absolute;
                left: 0;
                top: 0;
            }
        }

        .right {
            float: right;
            color: #757575;
            font-size: 11px;
            line-height: 32px;
        }
    }

    .chek {
        height: 36px;
        line-height: 36px;
        background-color: #fcfbf8;
        font-size: 11px;
        color: #C6B57D;
        padding: 0 16px;

        span {
            margin-right: 16px;
        }
    }

    .area {
        padding-left: 16px;
        background-color: #fff;
        margin-top: 8px;

        .item {
            line-height: 44px;
            border-bottom: 1px solid #E5E5E5;
            margin-right: 16px;
            display: flex;

            &:last-child {
                border-bottom: none;
            }
        }

        .tit {
            color: rgba(0, 0, 0, .54);
        }

        .item-2 {
            display: flex;
            justify-content: space-between;

            span {
                flex: 1;
            }
        }

        .item-s {
            padding: 10px 0;

            .tit {
                line-height: 1.5;
            }

            .val {
                line-height: 1.5;
            }
        }

        .item-h {
            height: 64px;
            line-height: 64px;
            margin-right: 0;
            background-repeat: no-repeat;
            background-size: cover;
        }
    }

    .tit-b {
        font-size: 16px;
        font-weight: bold;
    }

    .desc, .support {
        margin-top: 8px;
        background-color: #fff;
        padding: 16px;
    }

    .desc {
        padding-bottom: 0;

        .tit-b {
            margin-bottom: 20px;
        }

        .cont {
            height: 14px * 1.5 * 3;
            overflow: hidden;
            white-space: pre-wrap;
            position: relative;

            &:after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: linear-gradient(to bottom, rgba(255, 255, 255, .3), rgba(255, 255, 255, 1));
            }

            &.open {
                height: auto;
                overflow: auto;
                padding-bottom: 16px;

                &:after {
                    background-image: none;
                }
            }
        }

        .btn-more {
            line-height: 50px;
            text-align: center;
        }

        .if-rightarrow {
            display: inline-block;
            transform: rotate(90deg);
            vertical-align: bottom;
        }
    }

    .support {
        .cont {
            display: flex;
            flex-wrap: wrap;

            .item {
                width: 25%;
                text-align: center;
                font-size: 11px;
                margin-top: 20px;

                img {
                    width: 32px;
                }

                &.gray {
                    opacity: .5;
                }
            }
        }
    }

    .rmd {
        margin-top: 8px;
        background-color: #fff;

        .tit-b {
            padding: 16px;
            margin-bottom: 0;
            border-bottom: 1px solid #E6E6E6;
        }
    }
}
</style>
