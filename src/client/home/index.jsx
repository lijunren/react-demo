import * as React from "react";
import Nav from "../../component/nav/index";
import {httpRequest} from "../../httpRequest/httpRequest";
import {withRouter} from "react-router-dom";
import Buttons from "../../component/button"
import "./home.css";
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "简单的webpack配置",
            val: "",
            resName: "",
        }
    }
    static getDerivedStateFromProps(props, state){
        // 使用这个必须要初始化state`Home` uses `getDerivedStateFromProps`
        // but its initial state is undefined. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `Home`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.
        console.log("HOME：", "getDerivedStateFromProps>>>" ,state);
        // Home.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.
        // 需要return一个state
        return state;
    }
    componentDidMount() {
        console.log("HOME：", "componentDidMount>>>");
        document.title = "简单的webpack配置";
    }
    changeinput(e) {
        const val = e.target.value;
        this.setState({
            val
        });
    }
    toAddList() {
        this.props.history.push("/addInfo");
    }
    daili(type, e) {
        let url = '/proxys/api';
        let data = {
            name: "jack",
        };
        if (type === "get") {
            url = '/proxys/api?name=jack';
            data = {};
        }
        httpRequest({
            method: type,
            url,
            data,
        }).then((res) => {
            console.log(res);
        });
    }
    render() {
        return <div className="home_content">
            <Nav title={this.state.val}>React 16</Nav>
            <p className="title">{this.state.name}</p>
            <input className="input" type="text" name="" value={this.state.val} onChange={this.changeinput.bind(this)}/>
            {/* <img src={require("./image/img1.jpg")} width={"100%"} alt=""/> */}
            <p className="title">{this.state.resName}</p>
            <a href="javascript:void(0);" onClick={this.toAddList.bind(this)}>跳转到添加列表页</a>
            <a href="javascript:void(0);" onClick={this.daili.bind(this, "get")}>get代理</a>
            <a href="javascript:void(0);" onClick={this.daili.bind(this, "post")}>post代理</a>
            <Buttons></Buttons>
        </div>
    }
}
export default withRouter(Home);
