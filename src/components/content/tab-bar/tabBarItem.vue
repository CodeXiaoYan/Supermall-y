<template>
  <div class="tab-bar-item"
       @click="btnclick">
    <div v-if="isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-active"></slot>
    </div>
    <div :style="activestyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //      isActive: true,
  //   }
  // },
  props: {
    path: String,
    activecolor: { type: String, default: "red" },
  },
  computed: {
    // 动态决定用户isActive为ture,false
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activestyle() {
      return this.isActive ? { color: this.activecolor } : {};
    },
  },
  methods: {
    btnclick() {
      this.$router.replace(this.path).catch((err) => err);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
  /* z-index: 99; */
}
</style>
