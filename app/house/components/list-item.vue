<template>
<div class="house-list-item" @click="goDetailPage">
  <div :class="['label', 'label-' + house.rentType]">{{house.rentType == 1 ? '合租' : '整租'}}</div>
  <img class="item-img" v-lazy.app="house.imageUrl.replace('.webp', '')">
  <div class="item-info">
    <div class="title text-ellipsis">{{house.name}}</div>
    <div class="subtitle text-ellipsis">{{house.houseRoom}}{{house.rentType == 1 ? '·' + house.roomName : ''}}·{{house.spaceArea}}</div>
    <div class="price text-ellipsis">{{house.rentPrice}}<span class="unit">元/月</span></div>
    <div class="addr text-ellipsis">{{house.subwayInfo}}</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'house-list-item',
  props: {
    house: {
      type: Object,
      required: true
    },
    brandRecomId: {
      type: String,
      required: true
    }
  },
  methods: {
    // 详情页
    goDetailPage () {
      let houseId = this.house.houseId
      iwjw.go({
        href: `${pageConfig.mobileSiteUrl}/house/detail?houseId=${houseId}`
      }, {
        page: 'flatdetail',
        houseid: houseId
      })
      iwjw.log({
        vtp: 8,
        act_k: 22,
        act_v: {
          id: this.brandRecomId,
          cid: houseId
        }
      })
    }
  }
}
</script>

<style lang="sass">
.house-list-item {
  display: flex;
  padding: 12px;
  background-color: #fff;
  border-bottom: 1px solid #E6E6E6;
  position: relative;

  .label {
    position: absolute;
    top: 12px;
    left: 12px;
    width: 80px;
    height: 32px;
    line-height: 32px;
    border-bottom-right-radius: 8px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    transform-origin: 0 0;
    transform: scale(0.5);
  }

  .label-1 {
    background-color: #4CAF50;
  }

  .label-2 {
    background-color: #3083FB;
  }

  .item-img {
    width: 132px;
    height: 92px;
    flex: none;
  }

  .item-info {
    display: flex;
    flex: auto;
    flex-direction: column;
    margin-left: 8px;
    overflow-x: auto;

    .title {
      font-size: 15px;
      font-weight: bold;
    }

    .subtitle {
      font-size: 13px;
      font-weight: bold;
    }

    .price {
      font-size: 16px;
      color: #E84A01;
      font-weight: bold;
    }

    .unit {
      font-size: 12px;
      font-weight: normal;
    }

    .addr {
      font-size: 11px;
      color: #757575;
    }
  }
}
</style>
