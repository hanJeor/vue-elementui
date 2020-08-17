//基础路径，注意发布之前先修改这里
// let baseUrl = process.env.VUE_APP_BASEURL;
// cdn预加载使用
const externals = {
  'vue': 'Vue',
  'element-ui': 'ELEMENT'
};
// gzip --start
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzip = true // 是否使用gzip
const productionGzipExtensions = ['js', 'css'] // 需要gzip压缩的文件后缀
module.exports = {
    // 基本路径 baseURL已经过时
    publicPath: './', // 打包文件相对路径地址
    // publicPath:baseUrl,
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    // compiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
    configureWebpack: config=> {
            const myConfig = {}
           // if (process.env.NODE_ENV === 'production') {
                // 1. 生产环境npm包转CDN
                myConfig.externals = externals

                myConfig.plugins = []
                // gzip
                // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
                productionGzip && myConfig.plugins.push(
                    new CompressionWebpackPlugin({
                        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                        threshold: 8192,
                        minRatio: 0.8
                    })
                )
                // 去掉注释
                myConfig.plugins.push(
                    /*new UglifyJsPlugin({
                        uglifyOptions: {
                            output: {
                                comments: false, // 去掉注释
                            },
                            compress: {
                                warnings: false,
                                drop_console: true,
                                drop_debugger: false,
                                pure_funcs: ['console.log'] //移除console
                            }
                        }
                    })*/
                )

        //    }

            /*if (process.env.NODE_ENV === 'development') {
                //关闭host check，方便使用ngrok之类的内网转发工具
                myConfig.devServer = {
                    disableHostCheck: true
                }
            }*/

            return myConfig
    },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    // vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
    // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        //   open: process.platform === 'darwin',
        //将服务启动后默认打开浏览器
        open: true,
        disableHostCheck: true,
        host: '127.0.0.1', //如果是真机测试，使用IP为www.test.com,还需要在本地的hosts文件中添加 127.0.0.1 www.test.com
        port: 1234,
        https: false,
        hotOnly: false,
        // proxy: {// 设置代理
        // '/api': {
        //     target: 'http://www.test.com',
        //     changeOrigin: true,
        //     pathRewrite: {
        //         '^/api': '/'
        //     }
        // }
        // },
        before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}