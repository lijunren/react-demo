import React, {useState, useReducer} from "react";

export default () => {
    const [buttonText, setButtonText] = useState("click me");
    const hanldClick = () => {
        return setButtonText("thanks, been clicked!");
    }
    const myReducer = (state, action) => {
        switch (action.type) {
            case "add":
                console.log("add");
                return {
                    ...state,
                    count: state.count + 1
                };
            default:
                return {...state};
        }
    }
    const [state, dispacth] = useReducer(myReducer, {count: 0});
    const add = () => {
        dispacth({
            type: "add"
        });
    }
    return <div>
            <button onClick={hanldClick}>{buttonText}</button>
            <button onClick={add}>{state.count}</button>
            </div>
}