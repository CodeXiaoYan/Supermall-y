<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners"
                 :key="index">
      <a :href="item.link"><img :src="item.image"
             @load="imgload"></a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper";

export default {
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imgload() {
      if (!this.isload) {
        this.$emit("swiperimgload");
        this.isload = true;
      }
    },
  },
  data() {
    return {
      isload: false,
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
</style>