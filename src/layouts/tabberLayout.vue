<template>
<div class="container-all">
  <nav-tab></nav-tab>
  <router-view />
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
  position: sticky;
  top: 0;
  width: 100%;
  background: #424958;
  padding: 20px 0;
  z-index: 999;
}
</style>
