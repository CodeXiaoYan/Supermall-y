<template>
  <swiper class="detailswiper">
    <swiper-item v-for="item,index in topImages"
                 :key="index">
      <img :src="item" />
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
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.detailswiper {
  height: 300px;
  overflow: hidden;
}
</style>