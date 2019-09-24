import * as React from "react";
import propsTypes from "prop-types";
// Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言

// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 name 创建一个 context（“context”为默认值）。
const NameContext = React.createContext({val: "context1"});
class Context extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "context"
        }
    }
    onchange(e) {
        const val = e.target.value;
        this.setState({
            name: val
        });
    }
    render(){ 
        return <NameContext.Provider value={{val: this.state.name}}>
            <h2 style={{textAlign: "center"}}>context的用法</h2>
            <input type="text" value={this.state.name} onChange={this.onchange.bind(this)}/>
            <BoxOut></BoxOut>
            {/* <BoxOut name="外层组件传进来的值"></BoxOut> */}
        </NameContext.Provider>;
    }
}

class BoxOut extends React.Component {
    constructor(props) {
        super(props);
    }
    // 中间的组件再也不必指明往下传递 theme 了。
    render(){ 
        return <div>
            <BoxInner></BoxInner>
            <BoxInner2></BoxInner2>
            {/* <BoxInner name={this.props.name}></BoxInner> */}
        </div>;
    }
}

class BoxInner extends React.Component {
    constructor(props) {
        super(props);
    }
    // 指定 contextType 读取当前的 name context。
    // React 会往上找到最近的 name Provider，然后使用它的值。
    // 在这个例子中，当前的 name 值为 context
    // static contextType = NameContext;
    render(){ 
        // console.log(this.context);
        return <div>
            box-inner：
            <p>{this.context.val}</p>
            {/* <p>{this.props.name}</p> */}
        </div>;
    }
}
BoxInner.propsTypes = {
    name: propsTypes.string
}
// 挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。
// 这能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。
BoxInner.contextType = NameContext;

class BoxInner2 extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){ 
        // console.log(this.context);
        return <div>
            box2-inner：
            <NameContext.Consumer>
                {(context) => {
                    return <p>{context.val}</p>
                }}
            </NameContext.Consumer>
        </div>;
    }
}
export default Context;