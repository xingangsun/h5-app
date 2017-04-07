<template>
<div class="static-what-house">
  <div class="intro-01"></div>
  <div class="intro-02"></div>
  <div class="intro-04-wrapper">
    <div class="intro-04"></div>
  </div>
  <div class="intro-03-wrapper" @click="go">
    <div class="intro-03"></div>
    <div class="txt">了解租金返利券</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'static-what-house',
  data () {
    return {}
  },
  created () {
    this.share()
  },
  methods: {
    go () {
      this.$router.push({
        name: 'static-about-rebate'
      })
    },
    share () {
      iwjw.share({
        type: 'link',
        title: '品牌公寓是什么',
        desc: '爱屋吉屋品牌公寓，租房新玩法！',
        link: location.href,
        imgUrl: require('global/img/wx_share_logo.jpg')
      })
    }
  }
}
</script>

<style lang="sass">
.static-what-house {
  min-height: 100%;
  background-color: #381E0D;
  padding-bottom: 24px;

  .intro-01 {
    padding-top: 792 / 960 * 100%;
    background: url(../img/intro_01.png) no-repeat;
    background-size: contain;
  }

  .intro-02 {
    padding-top: 1449 / 960 * 100%;
    background: url(../img/intro_02.png) no-repeat;
    background-size: contain;
  }

  .intro-03-wrapper {
    margin: 0 24px 0;
    position: relative;

    .txt {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: #2D1010;
      font-size: 16px;
      font-weight: bold;
    }
  }

  .intro-03 {
    padding-top: 120 / 816 * 100%;
    background: url(../img/intro_03.png) no-repeat;
    background-size: contain;
  }

  .intro-04-wrapper {
    margin: 24px 48px 0;
  }

  .intro-04 {
    padding-top: 186 / 591 * 100%;
    background: url(../img/intro_04.png) no-repeat;
    background-size: contain;
  }
}
</style>
