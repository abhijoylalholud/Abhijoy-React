import User from "./User";
import UserClass from "./UserClass";
//import React from "react";
import { Component } from "react";

//class About extends React.Component{
class About extends Component{
    constructor(props){
        super(props);
        //console.log("Parent Constructor");
        
    }

    componentDidMount(){
        //console.log("Parent Component Did Mount");
    }

    render(){
        //console.log("Parent Render");
        return(
            <div>
                <h1>About Class Component</h1>
                <h2>This is a Namaste React Web Series</h2>
                {/* <User name={"Abhijoy Samaddar(function)"} /> */}
                <UserClass name={"First"} location={"Kolkata(Class)"} />
                {/* <UserClass name={"Debjit Dutta"} location={"Bangalore"} />
                <UserClass name={"Third child"} location={"Bangalore"} /> */}
            </div>
        );
    }
}

export default About;