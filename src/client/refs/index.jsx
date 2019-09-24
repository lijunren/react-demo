import * as React from "react";
import "./refs.css"
class Refs extends React.Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
    }
    focusTextInput() {
        this.input.current.focus();
    }
    componentDidCatch(err, info) {
        console.log(">>>>>>>>>>.", err, info);
    }
    
    render() {
        const InputComponent = React.forwardRef((props, ref) => {
            return <input type="text" ref={ref} className="ref_input"/>
        })
        return <div>
            <h2 className="ref_title">refs</h2>
            <InputComponent ref={this.input}></InputComponent>
            <button onClick={this.focusTextInput.bind(this)} className="ref_button">input获取焦点</button>
        </div>
    }
}

class Input extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.ref);
        return <div>
            <input type="text" ref={this.props.ref} className="ref_input"/>
            {/* <input type="text" ref={el => this.input = el} className="ref_input"/> */}
        </div>
    }
}

export default Refs;