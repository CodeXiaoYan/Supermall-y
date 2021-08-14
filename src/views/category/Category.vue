<template>
  <div class="wraper">
    <ul class="content">
      <li>sdfwf</li>
      <li>sdfwf</li>
      <li>sdfwf</li>
      <li>sdfwf</li>
      <li>sdfwf</li>
      <li>sdfwf</li>
      <li>sdfwf</li>
      <li>sdfwf</li>
      <li>sdfwf</li>
      <li>sdfwf</li>
      <li>sdfwf</li>
      <li>sdfwf</li>
      <li>sdfwf</li>
      <li>sdfwf</li>
      <li>sdfwf</li>
      <li>sdfwf</li>
      <li>sdfwf</li>
      <li>sdfwf</li>
    </ul>
  </div>
</template>

<script>
import Bscrool from "better-scroll";
export default {
  mounted() {
    this.scroll = new Bscrool(".wraper", {
      pullUpLoad: true,
      probeType: 3,
      click: true,
    });
    this.scroll.on("scroll", (position) => {
      console.log(position);
    });
    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");
    });
  },
};
</script>

<style scoped>
.wraper {
  height: 150px;
  overflow: hidden;
  background-color: red;
}
</style>