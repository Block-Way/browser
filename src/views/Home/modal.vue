<template>
    <div class="alet_container">
      <section class="tip_text_container">
                   <div data-v-18b505e9="" data-v-92014c5c="">
                    <div data-v-18b505e9="" class="full">
                        <div data-v-18b505e9="" class="part cp-rich">
                            <div data-v-18b505e9="" class="content">
                                <div data-v-18b505e9="" class="inner">
                                    <div data-v-18b505e9="" class="rich_list">
                                        <li data-v-18b505e9="" class="item">
                                            <div data-v-18b505e9="" class="index dposeindex"><b data-v-18b505e9="">序号</b></div>        
                                            <div data-v-18b505e9="" class="address"><b data-v-18b505e9="">地址</b></div>                                        
                                            <div data-v-18b505e9="" class="votes"><b data-v-18b505e9="">投票</b></div>
                                            <div data-v-18b505e9="" class="name"><b data-v-18b505e9="">名称</b></div>                                 
                                        </li>
                                        <li data-v-18b505e9="" class="item" v-for="(item,index) in dposlistDatas" :key="index">
                                            <div data-v-18b505e9="" class="index dposeindex">{{ index+1}}</div>
                                            <div data-v-18b505e9="" class="address" :title="item.address">
                                                <a data-v-18b505e9="" href="javascript:void(0)" class="hash">
                                                    <span data-v-18b505e9="" class="el-tooltip" aria-describedby="el-tooltip-6004" tabindex="0">
                                                        {{ item.address }}
                                                    </span></a>

                                            </div>
                                            <div data-v-18b505e9="" class="votes">{{ item.votes }}</div>
                                            <div data-v-18b505e9="" class="name">{{ item.name }}</div>
                                        </li>
                                       
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
          <div >{{address}}</div>
            <div class="confrim" @click="closeTip">确认</div>
            </div>
            </div>
        </section>
    </div>
</template>
 
<script>
    export default {
      data(){
            return{
                positionY: 0,
                timer: null,
                 dposlistDatas: []
            }
        },
        mounted(){
       
        },
        props: ['address'],
        methods: {
            closeTip(){
                this.$emit('closeTip')
            },
                getList() {
                let params = {
                    page: this.pagenum,
                    pagesize: this.pageSize
                };
                let that = this
                this.$api.listdelegate(params).then(res => {
                    that.dposlistDatas = res
                  
                });
            }
        },
          created() {         
            this.getList()           
        }
    }
</script>
 
<style scoped>
  @keyframes tipMove{
       0%   { transform: scale(1) }
       35%  { transform: scale(.8) }
       70%  { transform: scale(1.1) }
       100% { transform: scale(1) }
    }
    .alet_container{
      position: fixed;
      top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
    }
    .tip_text_container{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -6rem;
        margin-left: -6rem;
        width: 12rem;
        animation: tipMove .4s ;
        background-color: rgba(255,255,255,1);
        border: 1px;
        padding-top: .6rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border: 1px;
        border-radius: 0.25rem;
        .tip_icon{
            @include wh(3rem, 3rem);
            border: 0.15rem solid #f8cb86;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            span:nth-of-type(1){
                @include wh(.12rem, 1.5rem);
                background-color: #f8cb86;
            }
            span:nth-of-type(2){
                @include wh(.2rem, .2rem);
                border: 1px;
                border-radius: 50%;
                margin-top: .2rem;
                background-color: #f8cb86;
            }
        }
        .tip_text{
            @include sc(.7rem, #333);
            line-height: .9rem;
            text-align: center;
            margin-top: .8rem;
            padding: 0 .4rem;
        }
        .confrim{
             float:right;
            @include sc(.8rem, #fff);
            font-weight: bold;
            margin-top: .8rem;
            background-color: #4cd964;
            width: 100%;
            text-align: center;
            line-height: 1.8rem;
            border: 1px;
            border-bottom-left-radius: 0.25rem;
            border-bottom-right-radius: 0.25rem;
           
        }
    }
          .cp-rich .rich_list {min-height:auto;}

     
</style>