<template>
  <div class="container">
    <div class="content">
      <div class="content-item" :class="index === 1 ? 'last-item' : ''" v-for="(item, index) in itemList" :key="index">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemList: {
      type: Array,
      default: () => [ 'Validators List', '0 Total' ]
    }
  },
  data() {
    
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 13px 0;
    background: #fff;
    position: sticky;
    top: 103px;
    .content {
      width: 80%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      &-item {
        color: #333;

        padding-right: 14px;
        font-size: 14px;
        font-weight: 800;
      }
      .last-item {
        
        padding-left: 14px;
        border-left: 1px solid #333;
         font-size: 12px;
        font-weight: 400;
      }
    }
  }
</style>