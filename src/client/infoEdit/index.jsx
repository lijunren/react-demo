import * as React from "react";
import {httpRequest} from "../../httpRequest/httpRequest";
import { withRouter } from 'react-router-dom';
import "./addInfo.css";
class EditInfo extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            name: "",
            age: "",
            id: "",
        }
    }
    componentDidMount() {
        console.log(this.props.match.params.id);
        const id = this.props.match.params.id;
        this.setState({
            id,
        });
        this.getCurrentInfo(id);
    }
    getCurrentInfo(id) {
        httpRequest({
            method: "POST",
            url: "/info/mongoosequery.api",   // mongoose操作数据库
            data: {
                _id: id
            }
        }).then((res) => {
            console.log(res);
            this.setState({
                name: res.data.name,
                age: res.data.age,
            });
        });
    }
    change(proto, e) {
        const val = e.target.value;
        this.setState({
            [proto]: val,
        });
    }
    editData() {
        const {name, age, id} = this.state;
        httpRequest({
            method: "POST",
            // url: "/inEditaddInfo.api", // mongodb操作数据库
            url: "/info/mongooseModify.api",   // mongoose操作数据库
            data: {
                _id: id,
                name,
                age
            }
        }).then((res) => {
            this.props.history.goBack();
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
            <button onClick={this.editData.bind(this)}>修改</button>
        </div>;
    }
}

export default withRouter(EditInfo);
