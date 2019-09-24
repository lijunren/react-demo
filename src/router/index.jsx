import * as React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "../client/home"
import Context from "../client/context";
import Refs from "../client/refs";
import AddInfo from "../client/addInfo";
import InfoList from "../client/infoList";
import EditInfo from "../client/infoEdit";
class App extends React.Component {
    render() {
        return <Switch>
            <Route path="/addInfo" component={AddInfo}/>
            <Route path="/refs" component={Refs}/>
            <Route path="/context" component={Context}/>
            <Route path="/infoList" component={InfoList}/>
            <Route path="/editInfo/:id" component={EditInfo}/>
            <Route path="/" component={Home}/>
        </Switch>
    }
}
export default App;
