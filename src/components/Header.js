import { LOGO_URL } from "../utils/constants";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Header = () => {

    const[btnNameReact, setBtnNameReact]=useState("Login");
    //console.log("Header render");

    useEffect( () => {
        //console.log("UseEffect called");
    }, [btnNameReact]); //will be called everytime btnNameReact changes

    const onlineStatus = useOnlineStatus();

    const {loggedInUser} = useContext(UserContext);
    console.log(loggedInUser);
    
    return (
        <div className="header flex justify-between bg-pink-100 shadow-lg m-4 sm:bg-yellow-200 lg:bg-green-100">
            <div className="logo-container">
                <img className="logo w-40" src={LOGO_URL} alt="" />
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4">
                    <li className="px-4">
                        Online status: { onlineStatus? "✅" : "🔴" }
                    </li>
                    <li className="px-4"><Link to='/'>Home</Link></li>
                    <li className="px-4"><Link to='/about'>About</Link></li>
                    <li className="px-4"><Link to='/contact'>Contact</Link></li>
                    <li className="px-4"><Link to='/grocery'>Grocery</Link></li>
                    <li className="px-4">Cart</li>
                    {/* <button className="login" onClick={ () => {
                        btnName = "Logout";
                        console.log(btnName);
                    } }>{btnName}</button> */}
                    <button className="login" onClick={ () => {
                        btnNameReact == "Login" ? setBtnNameReact("Logout") : setBtnNameReact("Login");
                    } }>{btnNameReact}</button>

                    <li className="px-4 font-bold">{loggedInUser}</li>
                </ul>
            </div>
        </div> 
    )
}

export default Header;