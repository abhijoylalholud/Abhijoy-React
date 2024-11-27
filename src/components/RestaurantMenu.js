import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useResTaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {

    //const [resInfo, setResInfo] = useState(null); 

    const {resId} = useParams();

    const dummy = "Dummy data";

    const resInfo = useResTaurantMenu(resId); //Custom Hook

    //const [showIndex, setShowIndex] = useState(null); //for all accordions close
    const [showIndex, setShowIndex] = useState(0); // for 1st accordion open

    /*useEffect( () => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const data = await fetch(MENU_API + resId);
        const json = await data.json();
        console.log(json);
        setResInfo(json.data);
    };*/

    if(resInfo == null) return <Shimmer/>

    const {name, cuisines, costForTwoMessage} = resInfo?.cards[2]?.card?.card?.info;  

    const {itemCards} = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card;
    //console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards);

    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter( (c) => c.card?.card?.["@type"]
        === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
    //console.log(categories);

    return (
        <div className="text-center"> 
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">{cuisines.join(", ")} - {costForTwoMessage}</p>
            {/* <h2>Menu</h2>
            <ul>
                { itemCards.map(item => <li key={item.card.info.id}>{item.card.info.name} - Rs. {item.card.info.price/100 || item.card.info.defaultPrice}</li>) }
            </ul> */}

            {/* Categories accordion */}
            { categories.map( (category, index) =>
                //Controlled component
                <RestaurantCategory 
                    key={category?.card?.card.title} 
                    data={category?.card?.card} 
                    showItems={index === showIndex ? true : false }
                    setShowIndex={ () => setShowIndex(index) }
                    dummy = {dummy}
                /> 
            ) }
        </div>
    );

    /*return resInfo == null ? (
        <Shimmer/>
    ) : (
        <div className="menu"> 
            <h1>{resInfo?.cards[2]?.card?.card?.info?.name}</h1>
            <h1>{name}</h1>
            <p>{cuisines.join(", ")} - {costForTwoMessage}</p>
            <h2>Menu</h2>
            <ul>
                <li>{itemCards[0].card.info.name}</li>
                <li>{itemCards[1].card.info.name}</li>
                <li>{itemCards[2].card.info.name}</li>
                <li>{itemCards[3].card.info.name}</li>
                <li>{itemCards[4].card.info.name}</li>
            </ul>
        </div>
    );*/
};

export default RestaurantMenu;