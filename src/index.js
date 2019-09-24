import * as React from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter, HashRouter} from "react-router-dom";
import App from "./router/index";
ReactDOM.render(
    (<BrowserRouter>
        <App/>
    </BrowserRouter>), document.getElementById("app")
);