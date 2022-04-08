<template>
　<span size="medium" @contextmenu.prevent.native="openMenu($event)" />
 
</template>


<script>
 
    export default {
        name: "dpos",
        data() {
            return {
                dposlistDatas: [],
                  showa:false,
                  address:'',
                  visible: false,
                  top: 0,
                  left: 0
            }
        },
        methods: {
          
            closeTip(){
                this.showa=false
            },
              openTip(address){
                this.address =address;
                this.showa=true;
                console.log(this.showa);
              },
             handleWindow(dposAddress) {                
                var route = this.$router.resolve({
                    name: 'dposDetail',
                })               
                sessionStorage.setItem("dposAddress", dposAddress);                
                window.open(route.href, '_blank')
                },
                openMenu(e) {
                    const menuMinWidth = 105
                    const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
                    const offsetWidth = this.$el.offsetWidth // container width
                    const maxLeft = offsetWidth - menuMinWidth // left boundary
                    const left = e.clientX - offsetLeft // 15: margin right

                    if (left > maxLeft) {
                        this.left = maxLeft
                    } else {
                        this.left = left
                    }

                    this.top = e.clientY - 60 // fix 位置bug
                    this.visible = true
                    },
                    closeMenu() {
                    this.visible = false
                    } 

         
        },
        created() {         
                  
        },
          components: {
          
        },
        watch: {
            visible(value) {
            if (value) {
                document.body.addEventListener('click', this.closeMenu)
            } else {
                document.body.removeEventListener('click', this.closeMenu)
            }
            }
        },
    }
</script>

<style>
    @import url("../../assets/css/app.css");
    @import url("../../assets/css/rank.css");
    @import url("../../assets/css/dpos.css");

    h1, h2 {
  font-weight: normal;
}
 
ul {
  list-style-type: none;
  padding: 0;
}
 
li {
  display: inline-block;
  
}
 
a {
  color: #2d8cf0;
}
</style>