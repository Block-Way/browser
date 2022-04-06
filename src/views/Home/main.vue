<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 @click="openTip">Essential Links</h2>
    <alert-tip v-if="showa" @closeTip="closeTip" :alertText="alertText"></alert-tip>
  </div>
</template>
 
<script>
import alertTip from './modal.vue'
 
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      showa:false,
      alertText:"弹出的内容"
    }
  },
  components: {
    alertTip
  },methods:{
    closeTip(){
        this.showa=false
    },
    openTip(){
        this.showa=true;
        this.alertText="弹出来"
    }
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
 
ul {
  list-style-type: none;
  padding: 0;
}
 
li {
  display: inline-block;
  margin: 0 10px;
}
 
a {
  color: #42b983;
}
</style>