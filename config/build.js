const config = require("./webpack.config-prd.js");
const path =  require("path");
const webpack = require("webpack");
const fs = require("fs-extra");
const chalk = require("chalk");

fs.emptyDirSync(path.resolve(__dirname, "../build"));
console.log(chalk.red("START----------"));
console.log("PENDING...");
const startTime = new Date();
const compiler = webpack(config);
compiler.run((err, status) => {
    if (err) {
        throw new Error(err);
    }
    const endTime = new Date();
    console.log("build time:",chalk.blue(`${((endTime - startTime) / 1000).toFixed(2)}s`));
    console.log(chalk.red("END----------"));
});