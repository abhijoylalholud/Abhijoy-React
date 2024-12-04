import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        //items: ["burger", "pizza"]
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            //Vanilla redux(older) - DON'T MUTATE STATE, returning was mandatory
            /*const newState=[...state];
            newState.items.push(action.payload);
            return newState;*/

            //Redux Toolkit
            //We have to Mutate the state, so mutating the state here
            state.items.push(action.payload);
        },
        removeItem: (state) => {
            state.items.pop();
        },
        //originalState = { items: ["pizza"]}
        clearCart: (state) => {
            /*console.log(state);
            console.log(current(state));
            state=[]; //updates local state variable, not the original state
            console.log(state);*/

            //state.items.length = 0; // originalState = []

            return { items: [] }; //This new object [] will be replaced originalState = { items: [] }
        }
    }
});

export const {addItem, removeItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;