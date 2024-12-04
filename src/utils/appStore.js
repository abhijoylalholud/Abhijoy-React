//const { configureStore } = require("@reduxjs/toolkit");
import { configureStore } from "@reduxjs/toolkit"
import cartReducerr from "./cartSlice";

const appStore = configureStore({
    reducer: {
        cart: cartReducerr,
        //user: userReducer
    }
});

export default appStore;