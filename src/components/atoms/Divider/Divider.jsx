import { isVisible } from "@testing-library/user-event/dist/utils";
import React from "react";

class Divider extends React.Component{
    constructor(props){
        super(props);
        console.log("Objet Actualisé");
        this.state ={
            isVisible: true,
            sentence: "tata"
        };
        this.handleVisibility = this.handleVisibility.bind(this);
    }

    componentDidMount(){
        this.setState(() => ({
            sentence: "toto",
        }));
    }

    componentWillUnmount(){
        console.log("unmount");
    }

    componentDidUpdate(){
        console.log("updated");
    }

    handleVisibility(e ) {
        this.setState((prevState) => ({
            isVisible:  !prevState.isVisible,
        }));
    }

    render() {
        return (
        <div 
        onClick={this.handleVisibility}
            style={{
                height:"10px",
                backgroundColor:this.state.isVisible ? "blue" : "white",
                width:"90vw",
                
            }}

            >{" "}{this.state.sentence}</div>)
    }
}

export default Divider;