<template>
  <div id="detail">
    <datail-navbar class="detail-navbar" />
    <scroll class="content"
            :pull-up-load="true"
            ref="scroll">
      <datail-swiper :topImages="topImages" />
      <detail-baseinfo :goods="goods" />
      <detail-shopinfo :shop="shop" />
      <detail-goodsinfo :detailInfo="detailInfo"
                        @imageload="imageload" />
      <detail-paraminfo :paramInfo="paramInfo"></detail-paraminfo>
    </scroll>
  </div>
</template>

<script>
import DatailNavbar from "./ChlidDetail/DetailNavbar.vue";
import DatailSwiper from "./ChlidDetail/DetailSwiper.vue";
import DetailBaseinfo from "./ChlidDetail/DetailBaseinfo.vue";
import DetailShopinfo from "./ChlidDetail/DteailShopinfo.vue";
import DetailGoodsinfo from "./ChlidDetail/DetailGoodsinfo.vue";
import DetailParaminfo from "./ChlidDetail/DetailParamsInfo.vue";

import Scroll from "@/components/common/scroll/Scroll.vue";

import { Getdetail, Goods, Shop, GoodsParam } from "@/network/detail.js";

export default {
  name: "Detail",
  components: {
    Scroll,
    DatailNavbar,
    DatailSwiper,
    DetailBaseinfo,
    DetailShopinfo,
    DetailGoodsinfo,
    DetailParaminfo,
  },
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
    };
  },
  methods: {
    imageload() {
      this.$refs.scroll.refresh();
    },
  },
  created() {
    // 保存传入的iid

    this.iid = this.$route.params.iid;
    // 根据iid请求的详细数据
    Getdetail(this.iid).then((result) => {
      console.log(result);
      // 数据太多,分离数据
      const data = result.result;
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 店铺信息
      this.shop = new Shop(data.shopInfo);
      //保存详细的图片信息
      this.detailInfo = data.detailInfo;
      // 尺码信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
    });
  },
};
</script>

<style scoped>
#detail {
  width: 100%;
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.detail-navbar {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>