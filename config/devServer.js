const config = require("./webpack.config-dev.js");
const path =  require("path");
const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const fs = require("fs-extra");
const chalk = require("chalk");
const devServerConfig = {
    contentBase: path.join(__dirname, "../build"), // 提供静态文件的位置 html位置
    // publicPath: path.resolve(__dirname, "../build/static/"),
    publicPath: "/",
    hot: true,
    inline: true,
    watchContentBase: true,
    compress: true,
}
const compiler = webpack(config);
const devServer = new WebpackDevServer(compiler, devServerConfig);
devServer.listen(8090, "localhost", () => {
    console.log("启动了");
});