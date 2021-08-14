<template>
  <div class="recommend">
    <div v-for="(item,index) in recommend"
         :key="index"
         class="recommend-item">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommend: Array,
    default() {
      return [];
    },
  },
};
</script>

<style>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  margin-bottom: 10px;
  padding: 15px 0px 20px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 68px;
  height: 68px;
}
</style>