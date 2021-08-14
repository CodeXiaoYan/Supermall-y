<template>
  <!-- 主要组件 tabBar tabBarItem 的封装-->
  <tab-bar>
    <tab-bar-item path="/home">
      <img src="@/assets/img/sy.png"
           alt=""
           slot="item-icon" />
      <img src="@/assets/img/sy.png"
           alt=""
           slot="item-active" />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img src="@/assets/img/fl.png"
           alt=""
           slot="item-icon" />
      <img src="@/assets/img/fl.png"
           alt=""
           slot="item-active" />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img src="@/assets/img/gwc.png"
           alt=""
           slot="item-icon" />
      <img src="@/assets/img/gwc.png"
           alt=""
           slot="item-active" />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img src="@/assets/img/wd.png"
           alt=""
           slot="item-icon" />
      <img src="@/assets/img/wd.png"
           alt=""
           slot="item-active" />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import tabBar from "@/components/content/tab-bar/tabBar.vue";
import tabBarItem from "@/components/content/tab-bar/tabBarItem.vue";
export default {
  components: {
    tabBar,
    tabBarItem,
  },
};
</script>

<style scoped>
/* tab-bar {
  height: 100%;
} */
</style>
