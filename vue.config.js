module.exports = {
    publicPath:"./",
    devServer:{
        proxy:{
            "/api":{
               // target:"http://119.8.55.78:7711/",
                target:"http://127.0.0.1:7711",
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
    lintOnSave: false,
    chainWebpack: config => {
        config.optimization.splitChunks({
            chunks: "initial",          // Async asynchronous code splitting initial synchronous code splitting all synchronous and asynchronous code splitting are enabled 
            minSize: 30000,         // Only when the file introduced by bytes is greater than 30KB can it be divided 
            //maxSize: 50000,         //50kb. Try to split files larger than 50kb into n 50kb files 
            minChunks: 1,           // Minimum number of times the module is used 
            maxAsyncRequests: 5,    // The maximum number of modules loaded at the same time is 5, and only the first 5 files imported at the same time are divided 
            maxInitialRequests: 3,  // The maximum number of files imported when the homepage is loaded is 3 
            automaticNameDelimiter: '~', // Connector between cache group and makefile name 
            name: true,                  // The filename in the cache group takes effect and overrides the default name 
            cacheGroups: { // Cache group: put all loading modules in the cache and package them together 
                vendors: {  // Custom packaging module 
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10, // Priority: which group is packed first. The higher the value, the higher the priority 
                    filename: 'vendors.js',
                },
                default: { // Default packaging module 
                    priority: -20,
                    reuseExistingChunk: true, // When modules are nested and introduced, judge whether to reuse the packaged modules 
                    filename: 'common.js'
                }
            }
        });
    }
}