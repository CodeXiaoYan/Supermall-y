<template>
  <!-- 顶部组件(购物街) -->
  <div class="navbar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  display: flex;
  text-align: center;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.2);
}
.left,
.right {
  height: 44px;
  line-height: 44px;
  width: 20%;
}
.center {
  flex: 1;
  margin: auto;
}
</style>