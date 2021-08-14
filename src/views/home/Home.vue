<template>
  <div id="home">
    <!-- 顶部组件导航栏 -->
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
    <!-- 障眼法显示选项卡 -->
    <tabcontrol :titles="['流行', '新款', '精选']"
                @tabclick="tabclick"
                class="tab-control"
                ref="tabcontrol1"
                v-show="istabfixed" />
    <!-- 滚动区域 -->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentscroll"
            :pull-up-load="true"
            @pullingUp="loadmore">
      <!-- 轮播图组件 -->
      <homeswiper :banners="banners"
                  @swiperimgload="swiperimgload" />
      <!-- 推荐分类 -->
      <recommend :recommend="recommend" />
      <!-- 本周流行 -->
      <feature />
      <tabcontrol :titles="['流行', '新款', '精选']"
                  @tabclick="tabclick"
                  ref="tabcontrol2" />
      <!-- 商品的展示 -->
      <goodslist :goods="goods[currenttype].list"></goodslist>
    </scroll>
    <!-- 回到顶部组件 -->
    <backtop @click.native="backClick"
             v-show="isbackShow" />
  </div>
</template>

<script>
import { getHomedata, getHomegoods } from "@/network/home";

import Homeswiper from "./Childhome/Homeswiper.vue";
import Feature from "./Childhome/Feature.vue";
import recommend from "./Childhome/Homerecommend.vue";

import navbar from "@/components/common/navbar/NavBar.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";

import Tabcontrol from "@/components/content/tabcontrol/Tabcontrol.vue";
import Goodslist from "@/components/content/goods/Goodlist.vue";
import backtop from "@/components/content/backtop/Backtop.vue";

export default {
  components: {
    navbar,
    Homeswiper,
    recommend,
    Tabcontrol,
    Feature,
    Goodslist,
    Scroll,
    backtop,
  },
  data() {
    return {
      banners: [],
      recommend: [],
      goods: {
        pop: {
          page: 0,
          list: [],
        },
        new: {
          page: 0,
          list: [],
        },
        sell: {
          page: 0,
          list: [],
        },
      },
      currenttype: "pop",
      isbackShow: false,
      tabOffsettop: 0,
      istabfixed: false,
    };
  },
  created() {
    this.getHomedata();
    this.getHomegoods("pop");
    this.getHomegoods("new");
    this.getHomegoods("sell");
  },
  activated() {
    this.$refs.scroll.refresh();

    this.$refs.scroll.scrollTo(0, this.saveY, 0.001);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getscrolly();
    // console.log(this.saveY);
  },
  methods: {
    // 计算轮播图
    swiperimgload() {
      this.tabOffsettop = this.$refs.tabcontrol2.$el.offsetTop;
    },
    // 上拉加载方法
    loadmore() {
      this.getHomegoods(this.currenttype);
      // console.log("上拉加载更多");
      // 每次加载完成重新计算高度
      this.$refs.scroll.refresh();
    },

    // 回到顶部方法
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    contentscroll(position) {
      // console.log(position);
      // 判断回到顶部距离
      this.isbackShow = -position.y > 1000;
      // 判断是否吸顶
      this.istabfixed = -position.y > this.tabOffsettop;
    },
    // 事件监听
    tabclick(index) {
      switch (index) {
        case 0: {
          this.currenttype = "pop";
          break;
        }
        case 1: {
          this.currenttype = "new";
          break;
        }
        case 2: {
          this.currenttype = "sell";
          break;
        }
      }
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabcontrol2.currentIndex = index;
    },
    // 请求多个数据，网络请求
    getHomedata() {
      getHomedata().then((result) => {
        // console.log(result);
        this.banners = result.data.banner.list;
        this.recommend = result.data.recommend.list;
      });
    },
    // 请求流行，新款，精选，数据
    getHomegoods(type) {
      const page = this.goods[type].page + 1;
      getHomegoods(type, page).then((result) => {
        this.goods[type].list.push(...result.data.list);
        this.goods[type].page += 1;
        // 上拉加载完成
        this.$refs.scroll.finishPullUp();
        // console.log(result);
      });
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: aliceblue;
}
.tab-control {
  position: relative;
  z-index: 3;
  background-color: white;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
