<template>
<div class="house-index" v-infinite-scroll="loadHouseData" infinite-scroll-distance="50" infinite-scroll-immediate-check="false">
  <!-- navbar-search -->
  <navbar-search v-if="!browser.isApp"></navbar-search>
  <!-- banner -->
  <div class="swipe-wrapper" v-if="bannerList.length > 0">
    <swipe :auto="4000" :show-indicators="bannerList.length > 1">
      <swipe-item v-for="banner of bannerList" :key="banner.sequenceNum" @click.native="onBannerClick(banner)">
        <img v-lazy="banner.fileUrl">
      </swipe-item>
    </swipe>
  </div>
  <!-- nav -->
  <div class="nav">
    <div class="item" @click="goEntireRentPage">
      <img class="icon-entire-rent" src="../img/icon-entire-rent.png"><br>整租
    </div>
    <div class="item" @click="goJoinRentPage">
      <img class="icon-join-rent" src="../img/icon-join-rent.png"><br>合租
    </div>
    <div v-if="browser.isApp" class="item" @click="goFlatmapPage">
      <img class="icon-map" src="../img/icon-map.png"><br>地图找房
    </div>
  </div>
  <!-- list -->
  <div class="list">
    <div class="tit" @click="goRentflatListPage">品牌公寓精选<span class="all">查看全部 <i class="iconfont if-rightarrow"></i></span></div>
    <list-item v-for="house of houseList" :key="house.houseId" :house="house" :brand-recom-id="brandRecomId"></list-item>
    <div class="infinite-loading">
      <div v-show="loading">
        <spinner type="fading-circle"></spinner>加载中...
      </div>
      <template v-if="houseList.length > 0 && !hasNextPage">— 没有更多房源了 —</template>
    </div>
  </div>

  <download-alert page="flathome">下载APP查看更多优质好房源</download-alert>
</div>
</template>

<script>
import { Swipe, SwipeItem, Spinner } from 'mint-ui'
import NavbarSearch from 'global/components/navbar-search'
import ListItem from '../components/list-item'
import DownloadAlert from 'global/components/download-alert'
import api from '../api'

export default {
  name: 'house-index',
  components: {
    Swipe,
    SwipeItem,
    Spinner,
    NavbarSearch,
    DownloadAlert,
    ListItem
  },
  data () {
    return {
      bannerList: [], // 广告列表
      houseList: [], // 公寓推荐列表
      brandRecomId: '', // 品牌公寓推荐ID
      loading: false, // 加载中
      pageNo: 1, // 页号
      hasNextPage: false // 是否有分页
    }
  },
  created () {
    this.setRefreshHeader()
    this.loadData()
  },
  methods: {
    // 注册原生下拉刷新
    setRefreshHeader () {
      bridge.call('setrefreshhead', {
        status: 1,
        jsRefresh: 'pulldownRefresh'
      })
      bridge.onCall('pulldownRefresh', () => {
        this.loadData()
      })
    },
    // 加载首页数据，包括公告，推荐
    loadData () {
      this.loading = true
      api('bannerList', true).then(result => {
        this.bannerList = result.data || []
      }).catch(err => console.log(err))

      api('getRecommendList', {
        type: 1, // 业务类型  1公寓首页（公寓首页不需要传房源id）  2房源详情
        pageSize: 20
      }).then(result => {
        let { list, brandRecomId } = result.data || result
        this.houseList = list || []
        this.brandRecomId = brandRecomId || ''
        this.pageNo = 1
        this.hasNextPage = true

        if (this.houseList <= 5) {
          this.loadHouseData()
        }

        this.loading = false

        if (this.houseList.length > 0) {
          iwjw.log({
            vtp: 8,
            act_k: 20,
            act_v: this.brandRecomId
          })
        }
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    // 加载公寓列表
    loadHouseData () {
      if (!this.hasNextPage || this.loading) {
        return
      }
      this.loading = true
      api('getBrandList', {
        offset: (this.pageNo - 1) * 20, // 业务类型  1公寓首页（公寓首页不需要传房源id）  2房源详情
        pageSize: 20
      }).then(result => {
        let { list, hasNextPage } = result.data || result
        list = list || []
        this.houseList = this.houseList.concat(list)
        this.hasNextPage = hasNextPage ? list.length > 0 : false
        // console.log(hasNextPage, result.list)
        this.loading = false
        if (this.hasNextPage) {
          this.pageNo ++
        }
      }).catch(err => {
        this.loading = false
        console.log(err)
      })
    },
    // 点击广告
    onBannerClick (banner) {
      iwjw.go({
        href: banner.dispachUrl
      }, {
        page: banner.urlType,
        url: banner.dispachUrl
      })
    },
    // 去整租页面
    goEntireRentPage () {
      iwjw.go({
        href: `${pageConfig.mobileMainSiteUrl}/brandhouse/shanghai/?rentType=2`
      }, {
        page: 'rentflatlist',
        type: 2
      })
    },
    // 去合租页面
    goJoinRentPage () {
      iwjw.go({
        href: `${pageConfig.mobileMainSiteUrl}/brandhouse/shanghai/?rentType=1`
      }, {
        page: 'rentflatlist',
        type: 1
      })
    },
    // 去地图页面
    goFlatmapPage () {
      iwjw.go(null, {
        page: 'flatmap'
      })
    },
    // 去品牌公寓列表页面
    goRentflatListPage () {
      iwjw.go({
        href: `${pageConfig.mobileMainSiteUrl}/brandhouse/shanghai/`
      }, {
        page: 'rentflatlist',
        type: 0
      })
    }
  }
}
</script>

<style lang="sass">
.house-index {
  min-height: 100%;
  /*overflow: auto;*/
  /*-webkit-overflow-scrolling: touch;*/
  // position: relative;

  .h5 & {
    padding-top: 40px;
    padding-bottom: 48px;
  }

  .mint-loadmore {
    // overflow: visible;
    min-height: 100%;
  }

  .swipe-wrapper {
    padding-top: 170 / 320 * 100%;
    position: relative;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 86px;
    background-color: #FFF;
    color: #4A4A4A;
    font-size: 12px;

    .item {
      flex: 1;
      text-align: center;
    }

    img {
      margin-bottom: 8px;
    }
  }

  .icon-entire-rent, .icon-map {
    width: 28px;
  }

  .icon-join-rent {
    width: 32px;
  }

  .list {
    margin-top: 10px;

    .tit {
      font-size: 16px;
      font-weight: bold;
      padding-top: 18px;
      background-color: #fff;
      padding: 18px 12px 0;

      .all {
        float: right;
        color: #BDBDBD;
        font-size: 12px;
        padding-top: 2px;
        font-weight: normal;
      }
    }
  }
}
</style>
