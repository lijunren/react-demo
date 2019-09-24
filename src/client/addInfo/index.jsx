import * as React from "react";
import {httpRequest} from "../../httpRequest/httpRequest";
import { withRouter } from 'react-router-dom';
import "./addInfo.css";
class AddInfo extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            name: "",
            age: "",
        }
    }
    change(proto, e) {
        const val = e.target.value;
        this.setState({
            [proto]: val,
        });
    }
    addData() {
        const {name, age} = this.state;
        console.log(name, age);
        httpRequest({
            method: "POST",
            // url: "/info/addInfo.api", // mongodb操作数据库
            url: "/info/add.api",   // mongoose操作数据库
            data: {
                name,
                age,
            }
        }).then((res) => {
            if (res.code !== 0) {
                alert(res.msg);
            } else {
                this.props.history.push("/infoList");
            }
        });
    }
    render() {
        return <div className="addInfoContent">
            <label htmlFor=""><span>name:</span>
                <input type="text" onChange={this.change.bind(this, "name")} value={this.state.name}/>
            </label>
            <label htmlFor=""><span>age:</span>
                <input type="number" onChange={this.change.bind(this, "age")} value={this.state.age}/>
            </label>
            <button onClick={this.addData.bind(this)}>添加</button>
        </div>;
    }
}
export default withRouter(AddInfo);
