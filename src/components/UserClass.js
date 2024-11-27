import React from "react";

class UserClass extends React.Component {

    constructor(props){
        super(props);

        /*this.state = {
            count: 0,
            count2: 2,
        };*/

        this.state = {
            userInfo: {
                name: "Dummy",
                location: "default",
                //avatar_url: "http://dummy-photo.com"
            },
        };

        console.log(this.props.name + "Child Constructor");
    }

    //async,await is used for api calls
    async componentDidMount(){
        //console.log(this.props.name + "Child Component Did Mount");
        const data = await fetch("https://api.github.com/users/abhijoysamaddar");
        const json =  await data.json();

        this.setState({
            userInfo: json, 
        });
        console.log(json);
    }

    componentDidMount(){
        this.timer = setInterval( () => {
            console.log("Namaste React OP");
        }, 1000);
        console.log("Child - componentDidMount called");
    }

    componentDidUpdate(prevProps, prevState){
        if(this.state.count !== prevState.count || this.state.count2 !== prevState.count2){ //similar o useEffect with parameter [count]
            
        }
        console.log("componentDidUpdate called");
    }

    componentWillUnmount(){
        clearInterval(this.timer);
        console.log("componentWillUnmount called");
    }

    render(){
        //const { name, location } = this.props;
        //const { count, count2 } = this.state;
        console.log(this.props.name + "Child Render");
        const {name, location, avatar_url} = this.state.userInfo;
        //debugger;

        return(
            <div className="user-card">
                {/* <h2>Name: {this.props.name}</h2>
                <h3>Location: {this.props.location}</h3>
                <h1>Count: {this.state.count}</h1> */}
                {/* <h1>Count: {count}</h1> */}
                {/* <button onClick={()=>{
                    this.setState({
                        count: this.state.count + 1
                    });
                }}>Increase</button> */}
                <img src={avatar_url} />
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h4>Contact: 9051092982</h4>
            </div>
        );
    }
}

export default UserClass;