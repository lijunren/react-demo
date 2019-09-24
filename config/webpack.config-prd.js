const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtract = require("mini-css-extract-plugin"); // webpack4使用这个包做css压缩
const ManifestPlugin = require("webpack-manifest-plugin");
// const ManifestPlugin = require('webpack-manifest-plugin');
module.exports = {
    entry: path.resolve(__dirname, "../src/index.js"),
    output: {
        path: path.resolve(__dirname, "../build"),
        filename: "static/js/[name].[hash:8].js",
        publicPath: "/",
    },
    mode: "production",
    resolve: { //配置模块如何解析
        extensions: ['.webpack.js', '.web.js', '.ts', '.jsx', '.js'] 
    },
    module: {
        rules: [
            // css-loader用来处理css中url的路径
            // style-loader可以把css文件变成style标签插入head中
            // 多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换的
            {
                test: /\.css$/,
                use: [{
                    loader: miniCssExtract.loader,
                    options: {
                        publicPath: '../',
                        hmr: process.env.NODE_ENV === 'development',
                    }
                },
                'css-loader',],
                include: path.resolve(__dirname, "../src"),
                exclude: /node_modules/,
            }, 
            // file-loader 解决css等文件中引入图片路径的问题
            // url-loader 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝
            // file-loader是解析图片地址，把图片从源文件拷贝到目标文件并且修改源文件名字
            // 可以处理任意二进制，bootstrap里的字体
            // url-loader可以在文件比较小的时候，直接变成base64字符串内嵌到页面中
            {
                test: /\.(jpg|png|jepg|gif|svg)$/,
                use: [
                    // {
                    //     loader: "file-loader",
                    //     options: {
                    //         name: "[name].[ext]",
                    //         publicPath: "../build/static"
                    //     }
                    // },
                    {
                        loader: "url-loader",
                        options: {
                            name: "static/image/img[hash:8].[ext]",
                            limit: 5 * 1024,
                        }
                    }
                ],
            },
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: ['@babel/plugin-proposal-decorators']
                    } // env转换es6 stage-0(新版本不需要了) react转react
                }
            }
        ],
    },
    plugins: [
        new htmlWebpackPlugin({
            title: "webpack",
            template: path.resolve(__dirname, "../public/index.html"),
            favicon: path.resolve(__dirname, "../public/favicon.ico"),
        }),
        new miniCssExtract({
            name: "static/css/[name].[hash:8].css",
            chunkFilename: "static/css/[name].[hash:8].chunk.css",
            ignoreOrder: false,
        }),
        new ManifestPlugin({
            fileName: 'asset-manifest.json',
            publicPath: "../",
        }),
    ],
    optimization: {
        splitChunks: {
            chunks: "all", // chunks属性用来选择分割哪些代码块，可选值有：'all'（所有代码块），'async'（按需加载的代码块），'initial'（初始化代码块）。
            minSize: 30000, // 模块的最小体积
            minChunks: 1, // 模块的最小被引用次数
            maxAsyncRequests: 5, // 按需加载的最大并行请求数
            maxInitialRequests: 3, // 一个入口最大并行请求数
            automaticNameDelimiter: '~', // 文件名的连接符
            name: true,
            /**
             * 缓存组因该是SplitChunksPlugin中最有趣的功能了。
             * 在默认设置中，会将 node_mudules 文件夹中的模块打包进一个叫 vendors的bundle中，
             * 所有引用超过两次的模块分配到 default bundle 中。更可以通过 priority 来设置优先级。
             */
            cacheGroups: { // 缓存组
                vonder: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true // 表示可以使用已经存在的块，即如果满足条件的块已经存在就使用已有的，不再创建一个新的块。
                }
            }
        },
        /**配置 runtimeChunk 会给每个入口添加一个只包含runtime的额外的代码块，
         * name 的值也可以是字符串，不过这样就会给每个入口添加相同的 runtime，
         * 配置为函数时，返回当前的entry对象，即可分入口设置不同的runtime。 */
        runtimeChunk: {
            name: entrypoint => {
                console.log("entrypoint>>>>",entrypoint.name);
                return `manifest.${entrypoint.name}`
            }
        }
    },
    
}