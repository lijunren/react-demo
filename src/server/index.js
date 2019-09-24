const express = require("express");
const bodyParse = require("body-parser");
const path = require("path");
const app = express();
const decorator = require("@babel/core");
decorator.transform("code", {
    plugins: ["@babel/plugin-proposal-decorators"]
});
app.use(bodyParse.urlencoded({urlencoded: false}));
app.use(bodyParse.json());
/**
 * 插入react代码 进行服务端改造
 */
import * as React from "react";
import ReactDOM from 'react-dom';
// 引入renderToString
import {renderToString, renderToStaticMarkup} from "react-dom/server";
// 服务端是没有BrowserRouter 所以用StaticRouter
import { StaticRouter } from "react-router-dom";
// 引入前端路由
import Routers from "../router/index";

app.use((req, res, next) => {
    console.log(">>>>>>>>", req.url);
    if (req.url.startsWith('/static/')) {
        return next();
    }
    const context = {};
    const frontComponents = renderToString(
        (<StaticRouter
            location={req.url}
            context={context}
        >
           <Routers></Routers> 
        </StaticRouter>)
    );
    return res.sendFile(path.resolve("build/index.html"));
});
// console.log(path.resolve("build"));
app.use("/", express.static(path.resolve("build")));

app.listen("9990", "localhost", () => {
    console.log("the server run on http://localhost:9990");
});