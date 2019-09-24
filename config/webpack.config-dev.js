const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: path.resolve(__dirname, "../src/index.js"),
    output: {
        path: path.resolve(__dirname, "../build"),
        filename: "static/js/[name].[hash:8].js",
        publicPath: "/",
    },
    mode: "development",
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
                use: ["style-loader", "css-loader"],
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
                            name: "static/image/img.[hash:8].[ext]",
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
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    } // env转换es6 stage-0(新版本不需要了) react转react
                }
            }
        ],
    },
    
    devtool: "eval-source-map",
    plugins: [
        new htmlWebpackPlugin({
            title: "webpack",
            template: path.resolve(__dirname, "../public/index.html"),
            favicon: path.resolve(__dirname, "../public/favicon.ico"),
        }),
    ],
}