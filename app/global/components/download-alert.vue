<template>
<div v-if="!browser.isApp" class="download-alert" @click="downApp">
  <img src="../../global/img/downlogo.png" alt="爱屋吉屋"> <slot>下载APP</slot>
</div>
</template>

<script>
export default {
  name: 'download-alert',
  props: {
    page: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 下载APP
    downApp () {
      iwjw.checkApp(this.page)
    }
  }
}
</script>

<style lang="sass">
.download-alert {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  line-height: 48px;
  background-color: #E84A01;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-align: center;

  img {
    width: 32px;
  }
}
</style>
