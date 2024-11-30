import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import resList from "../utils/mockData";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {

    //State variable - super powerful variable
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    const [searchText, setSearchText] = useState("");

    //Higher order comp
    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

    //console.log("Body rendered");

    useEffect( () => {
        fetchData();
    }, [] ); 
    
    const fetchData = async () => {

        //const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.9615398&lng=79.2961468&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.51800&lng=88.38320&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

        const json = await data.json();
        console.log(json);
        

        setListOfRestaurants(
            json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants 
        ); 

        setFilteredRestaurant(
            json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants 
        ); 
   
    }

    const onlineStatus = useOnlineStatus();
    if (onlineStatus === false )    
        return (
            <h1>Looks like you're offline!! Please check your internet connection</h1>
        );

    const {loggedInUser, setUserName} = useContext(UserContext);
    //Testing purpose Abhijoy
    //Conditional Rendering
    /*if(listOfRestaurants.length==0){
        return <Shimmer/>
    }*/

    return !listOfRestaurants || listOfRestaurants.length==0 ? ( 
        <Shimmer/> 
    ) : (
        <div className="body">
            <div className="filter flex">
                <div className="search m-4 p-4">
                    <input type="text" className="border border-solid border-black" value={searchText} onChange={ (e) => { setSearchText(e.target.value); } } placeholder="Search restaurants" />
                    <button 
                    className="px-4 py-2 bg-green-100 m-4 rounded-lg"
                    onClick={ () => { 
                        const filteredRestaurant = listOfRestaurants.filter( 
                            (res) => res?.info?.name.toLowerCase().includes(searchText.toLowerCase())
                        );
                        setFilteredRestaurant(filteredRestaurant);
                    } }>Search</button>
                </div> 
                <div className="search m-4 p-4 flex items-center">
                    <button 
                        className="px-4 py-2 bg-gray-100 rounded-2xl" 
                        onClick={ () => { 
                            //Filter logic here
                            const filteredList = listOfRestaurants.filter(
                                (res) => res.info.avgRating > 4.5
                            );
                            setFilteredRestaurant(filteredList);
                        } }>
                        Top Rated Restaurants
                    </button>
                </div>

                {/* New button for context value change */}
                <div className="search m-4 p-4 flex items-center">
                <label>User Name: </label>
                    <input className="border border-black p-2" value={loggedInUser} onChange={(e)=>setUserName(e.target.value)} />
                </div>
                
            </div>
            <div className="flex flex-wrap">
                {/* <RestaurantCard resData={resObj[0]} />
                <RestaurantCard resData={resObj[1]} />
                <RestaurantCard resData={resObj[2]} /> */}
                {filteredRestaurant.map( (restaurant) => (
                    <Link 
                        key={restaurant.info.id} 
                        to={'/restaurants/' + restaurant.info.id}>
                            {
                                restaurant.info.veg ? <RestaurantCardPromoted resData={restaurant}/> : <RestaurantCard resData={restaurant}/>
                            }
                            {/* <RestaurantCard resData={restaurant}/> */}
                    </Link>
                ))}
            </div>
        </div>
    )
};

export default Body;