import React, {lazy, Suspense, useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";
import UserContext from "./utils/UserContext";
//import Grocery from "./components/Grocery";

const Grocery = lazy( () => import("./components/Grocery") );

const About = lazy( () => import("./components/About") );

const Applayout = () => {
    //authentication
    const [userName, setUserName] = useState();

    useEffect(()=>{
        const data={
            name: "Abhijoy Samaddar"
        };
        setUserName(data.name);
    }, []);

    return (
        <UserContext.Provider value={{loggedInUser: userName}}>
            <div className="app">
                <UserContext.Provider value={{loggedInUser: "Ayana Chowdhury"}}>
                    <Header/>
                </UserContext.Provider>
                <Outlet/>
            </div>
        </UserContext.Provider>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <Applayout/>,
        children: [
            {
                path: "/",
                element: <Body/>
            },
            {
                path: "/about",
                element: <About/>
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/grocery",
                element: <Suspense fallback={<h1>Loading ...</h1>}><Grocery/></Suspense>
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu/>
            }
        ],
        errorElement: <Error/>
    },
]);

const root = ReactDOM.createRoot( document.getElementById("root") );

root.render(<RouterProvider router={appRouter} />); 
//Joy East Bengal