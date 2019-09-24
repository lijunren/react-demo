import * as React from "react";
import {httpRequest} from "../../httpRequest/httpRequest";
import { withRouter } from 'react-router-dom';

class InfoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }
    componentDidMount() {
        this.getListInfo();
    }
    getListInfo() {
        httpRequest({
            method: "POST",
            // url: "/info/query.api",  // mongodb操作数据库
            url: "/info/mongoosequery.api",  // mongoose操作数据库
            data: {},
        }).then((res) => {
            this.setState({
                list: res.data,
            });
        });
    }
    edit(id, e) {
        this.props.history.push(`/editInfo/${id}`);
    }
    delete(id, e) {
        httpRequest({
            method: "POST",
            // url: "/info/delete.api", // mongodb操作数据库
            url: "/info/mongooseDelete.api",  // mongoose操作数据库
            // data: {
            //     id,
            // }
            data: {
                _id: id,
            }
        }).then((res) => {
            console.log(res);
        });
    }
    render(){ 
        const {list} = this.state;
        return <div style={{fontSize: ".5rem"}}>
            {list.map((ele, index) => {
                return <div key={index}>名字：{ele.name}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a href="javascript:void(0)" onClick={this.edit.bind(this, ele._id)}>修改</a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a href="javascript:void(0)" onClick={this.delete.bind(this, ele._id)}>删除</a>
                </div>
            })}
        </div>;
    }
}
export default withRouter(InfoList);