import {useState, useEffect } from "react";
import { MENU_API } from "../utils/constants";

const useResTaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);

    useEffect( () => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const data = await fetch(MENU_API + resId);
        const json = await data.json();
        //console.log("Menuu",json);
        setResInfo(json.data);
    };

    return resInfo;
}
export default useResTaurantMenu;