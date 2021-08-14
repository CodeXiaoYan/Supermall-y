<template>
  <div class="backtop">
    <img src="@/assets/img/top.png"
         alt="">
  </div>
</template>

<script>
export default {
  // 回到顶部(组件)
};
</script>

<style scoped>
.backtop {
  position: fixed;
  right: 10px;
  bottom: 60px;
}
.backtop img {
  width: 45px;
  height: 45px;
}
</style>