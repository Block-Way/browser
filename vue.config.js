module.exports = {
    publicPath:"./",
    devServer:{
        proxy:{
            "/api":{
                target:"http://119.8.55.78:7711/",
                changeOrigin:true,
                secure: false,
                ws:true,
                pathRewrite:{
                    "^/api":""
                }
            }
        },
        open:true,
        https:false
    },
    lintOnSave: false
}