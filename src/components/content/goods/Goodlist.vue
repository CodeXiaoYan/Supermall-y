<template>
  <div class="goods">
    <goodslistitem v-for="(item,index) in goods"
                   :key="index"
                   :goodsitem="item" />
  </div>
</template>

<script>
import goodslistitem from "./Goodslistitem.vue";

export default {
  components: {
    goodslistitem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>