<template>
  <navbar>
    <div slot="left"
         class="back"
         @click="backclick">
      <img src="@/assets/img/common/back.svg">
    </div>
    <div slot="center"
         class="title">
      <div v-for="(item,index) in titles"
           :key="index"
           class="title-item"
           :class="{active: index === currentIndex}"
           @click="titleclick(index)">{{item}}</div>
    </div>
  </navbar>
</template>

<script>
import navbar from "@/components/common/navbar/NavBar.vue";
export default {
  components: {
    navbar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleclick(index) {
      this.currentIndex = index;
    },
    backclick() {
      this.$router.push("/home/");
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 15px;
}
.active {
  color: var(--color-high-text);
}
.back img {
  height: 22px;
  width: 22px;
  margin-top: 10px;
}
</style>