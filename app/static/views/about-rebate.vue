<template>
<div class="static-about-rebate">
  <div class="card-01"></div>
  <div class="card-02-wrapper">
    <div class="card-02"></div>
  </div>
  <div class="card-03-wrapper">
    <div class="card-03"></div>
  </div>
  <div class="btn" @click="go">{{versionGte6_3_1 ? '前往购买' : '立即找房'}}</div>
</div>
</template>

<script>
export default {
  name: 'static-about-rebate',
  data () {
    return {
      versionGte6_3_1: utils.appVersionCompare(utils.browser.appVersion, '6.3.1') > -1 // 0 or 1
    }
  },
  created () {
    this.share()
  },
  methods: {
    go () {
      if (this.versionGte6_3_1) {
        iwjw.go({
          name: 'voucher-rebate-detail'
        }, {
          page: 'rebatesdetail',
          url: `${pageConfig.mobileSiteUrl}/voucher/rebate-detail`
        })
      } else {
        bridge.back()
      }
    },
    share () {
      iwjw.share({
        type: 'link',
        title: '租房返利券首月节省45%',
        desc: '免佣金，返租金，优质品牌公寓等你来挑选。',
        link: location.href,
        imgUrl: require('global/img/wx_share_logo.jpg')
      })
    }
  }
}
</script>

<style lang="sass">
.static-about-rebate {
  min-height: 100%;
  background-color: #77A9CE;
  padding-bottom: 80px;

  .card-01 {
    padding-top: 600 / 960 * 100%;
    background: url(../img/card_01.png) no-repeat;
    background-size: contain;
  }

  .card-02-wrapper {
    margin: 0 8px;
  }

  .card-02 {
    padding-top: 1086 / 912 * 100%;
    background: url(../img/card_02.png) no-repeat;
    background-size: contain;
  }

  .card-03-wrapper {
    margin: 24px 12px 0;
  }

  .card-03 {
    padding-top: 375 / 888 * 100%;
    background: url(../img/card_03.png) no-repeat;
    background-size: contain;
  }

  .btn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    background-color: #F5C137;
    color: #fff;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
