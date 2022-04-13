<template>

    <div isHome="true" class="footer_wrap cn" data-v-35696748 data-v-02b3c3b7>

        <el-row :gutter="20">

            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div>
                    <span>{{$t('eFooterBar.link')}}</span>
                    <a href="javascript:void(0);" class="social">
                    <img src="../../assets/images/custom/twitter.png" class="fa fa-twitter">
                    </a>
                    <a href="javascript:void(0);" class="social">
                     <img src="../../assets/images/custom/facebook.png" class="fa fa-twitter">
                    </a>
                    <a href="https://github.com/Block-Way" target="_blank" class="social">                    
                    <!--<img src="../../assets/images/icon/hah.png" class="fa fa-twitter">-->
                    <img src="../../assets/images/custom/logo.jpg" class="fa fa-web">
                    
                    </a>
                    
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="12">
                <div>
                    <p class="text-center reset">
                    <a href="https://github.com/Block-Way/browser"  target="_blank"  class="btn btn-default btn-lg btn-gh">
                    <i class="fa fa-github"></i>
                    {{$t('eFooterBar.fork')}}
                    </a>
                    </p>        
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div>
                    <p class="text-right">
                    {{$t('eFooterBar.power')}} <a href="https://blockway.io/"  target="_blank" >Block_Way {{$t('eFooterBar.webService')}}</a><br>
                    © 2022 - Block_Way
                    </p>
                </div>
            </el-col>
          
        </el-row>
    </div>

</template>

<script>
    export default {
        name: "eFooterBar"
    }
</script>
