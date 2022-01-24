<template>
<div class="container-all">
  <div class="top">
    <nav-tab></nav-tab>
  </div>
  <div class="content">
    <router-view />
  </div>
  <page-bottom></page-bottom>
</div>
</template>

<script>
import pageBottom from '@/components/pageBottom'
import navTab from '@/components/navTab'
export default {
  components: { pageBottom, navTab},
}
</script>

<style lang="scss" scoped>
.container-all {
  
}
.top {
  position: sticky;
  top: 0;
  width: 100%;
  background: #424958;
  padding: 20px 0;
  z-index: 999;
}
.content {
  border: 1px solid #000;
  // padding-top: 20px;
  background: #000;
}
</style>
