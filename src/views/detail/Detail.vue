<template>
  <div id="detail">
    <datail-navbar class="detail-navbar"
                   @titleclick="titleclick"
                   ref="nav" />
    <scroll class="content"
            :pull-up-load="true"
            ref="scroll"
            @scroll="contentscroll">
      <datail-swiper :topImages="topImages"
                     ref="base" />
      <detail-baseinfo :goods="goods" />
      <detail-shopinfo :shop="shop" />
      <detail-goodsinfo :detailInfo="detailInfo"
                        @imageload="imageload" />
      <detail-paraminfo ref="param"
                        :paramInfo="paramInfo" />
      <detail-comment ref="comments"
                      :comment-info="commentInfo" />
      <goods-list ref="recomment"
                  :goods="recommends" />
    </scroll>

    <detail-buttom @addToCart="addToCart"></detail-buttom>
    <back-top @click.native="backClick"
              v-show="isbackShow"></back-top>
  </div>
</template>

<script>
import DatailNavbar from "./ChlidDetail/DetailNavbar.vue";
import DatailSwiper from "./ChlidDetail/DetailSwiper.vue";
import DetailBaseinfo from "./ChlidDetail/DetailBaseinfo.vue";
import DetailShopinfo from "./ChlidDetail/DteailShopinfo.vue";
import DetailGoodsinfo from "./ChlidDetail/DetailGoodsinfo.vue";
import DetailParaminfo from "./ChlidDetail/DetailParamsInfo.vue";
import DetailComment from "./ChlidDetail/DetailComment.vue";
import DetailButtom from "./ChlidDetail/DetailButtom.vue";
import backTop from "@/components/content/backtop/Backtop.vue";

import { debounce } from "@/comment/utils.js";

import GoodsList from "@/components/content/goods/Goodlist.vue";

import Scroll from "@/components/common/scroll/Scroll.vue";

import {
  Getdetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "@/network/detail.js";

export default {
  name: "Detail",
  components: {
    Scroll,
    backTop,
    DatailNavbar,
    DatailSwiper,
    DetailBaseinfo,
    DetailShopinfo,
    DetailGoodsinfo,
    DetailParaminfo,
    DetailComment,
    DetailButtom,
    GoodsList,
  },
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      TopYs: [],
      getTopYs: null,
      currentIndex: 0,
      isbackShow: false,
    };
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid;
    // 根据iid请求的详细数据
    Getdetail(this.iid).then((result) => {
      // console.log(result);
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
      // 评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      // this.$nextTick(() => {

      // });
    });
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });
    this.getTopYs = debounce(() => {
      this.TopYs = [];
      this.TopYs.push(0);
      this.TopYs.push(this.$refs.param.$el.offsetTop);
      this.TopYs.push(this.$refs.comments.$el.offsetTop);
      this.TopYs.push(this.$refs.recomment.$el.offsetTop);
      this.TopYs.push(Number.MAX_VALUE);
      // console.log(this.TopYs);
    }, 290);
  },
  methods: {
    addToCart() {
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid;
      product.realPrice = this.goods.realPrice;
      // this.$store.dispatch("addCart", product).then((res) => {
      //   this.$toats.show(res, 2000);
      // });
      // this.$store.commit("addCart", product);
      this.$store.dispatch("addCart", product);
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    titleclick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.TopYs[index], 100);
    },
    imageload() {
      this.$refs.scroll.refresh();
      this.getTopYs();
    },
    contentscroll(position) {
      const positionY = -position.y;
      this.isbackShow = positionY > 1000;

      let lenth = this.TopYs.length;
      for (let i = 0; i < lenth - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.TopYs[i] &&
          positionY < this.TopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
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
