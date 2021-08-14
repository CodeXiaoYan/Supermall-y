<template>
  <div class="tabcontrol">
    <div v-for="(item,index) in titles"
         :key="index"
         class="tabcontrol-item"
         :class="{active: index === currentIndex}"
         @click="itemclick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    itemclick(index) {
      this.currentIndex = index;
      this.$emit("tabclick", index);
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
};
</script>

<style>
.tabcontrol {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  bottom: 1px;
}
.tabcontrol-item {
  flex: 1;
}
.tabcontrol-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>