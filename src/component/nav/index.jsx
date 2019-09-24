import * as React from "React";
import "./nav.css";
class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "初始化的state",
            staticTitle: "getDerivedStateFromProps功能验证: "
        }
    }
    // 根据 getDerivedStateFromProps(nextProps, prevState) 的函数签名可知: 
    // 其作用是根据传递的 props 来更新 state。它的一大特点是 无副作用 : 
    // 由于处在 Render Phase 阶段，所以在每次的更新都要触发， 故在设计 API 时采用了静态方法，
    // 其好处是单纯 —— 无法访问实例、无法通过 ref 访问到 DOM 对象等，保证了单纯且高效。
    // 值得注意的是，其仍可以通过 props 的操作来产生副作用，这时应该将操作 props 
    // 的方法移到 componentDidUpdate 中，减少触发次数。
    static getDerivedStateFromProps(nextProps, prevState) { // 替代componentWillReceiveProps的所有用法
        console.log("Nav：", "getDerivedStateFromProps>>>>>>>>>", nextProps, prevState);
        // const initTitle = this.state.title; 
        // 不能通过this得到state
        return {
            title: nextProps.title || prevState.title
        };
        // 它应该返回一个对象来更新状态，或者返回null来不更新任何内容。
    }
    componentDidMount() {
        console.log("Nav：","componentDidMount>>>>>>>>>");
    }
    shouldComponentUpdate(nextProps, nextState){
        // 每当父组件重新render导致的重传props，子组件将直接跟着重新渲染，
        // 无论props是否有变化。可通过shouldComponentUpdate方法优化。
        // 默认情况是返回的true
        return true;
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        // 被调用于render之后，可以读取但无法使用DOM的时候。它使您的组件可以在可能更改之前从DOM捕获一些信息（例如滚动位置）。
        console.log("Nav：","getSnapshotBeforeUpdate>>>>>>>>>" ,prevProps, prevState);
        // Nav.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.
        // 需要返回 的值作为componentDidUpdate的第三个参数（snapshot）
        return 1111;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Nav：","componentDidUpdate>>>>>>>>>",this.props, prevProps, prevState, snapshot);
    }
    componentDidCatch(error, info) {
        console.log("Nav：","componentDidCatch>>>>>>>>>" ,error, info);
    }
    render(){
        console.log("Nav：","render>>>>>>>>>");
        return <div className="nav_content">
            <h2>{this.props.children}</h2>
            <p>{this.state.staticTitle}{this.state.title}</p>
        </div>
    }
}
export default Nav;