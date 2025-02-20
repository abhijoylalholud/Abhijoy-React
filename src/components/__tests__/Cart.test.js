import { act, fireEvent, render, screen } from "@testing-library/react";
//import { act } from "react-dom/test-utils";
import Header from "../Header";
import RestaurantMenu from "../RestaurantMenu";
import Cart from "../Cart";
import MOCK_DATA_NAME from "../mocks/mockResMenu.json";

import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

/*global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_DATA);
        }
    });
});*/

//same as above without return
global.fetch = jest.fn(() => 
    Promise.resolve({
        json: () => Promise.resolve(MOCK_DATA_NAME),
    })
);

it("should load Restaurant menu component", async() => {
    await act(async() => render(
                <BrowserRouter>
                    <Provider store={appStore}>
                        <Header/>
                        <RestaurantMenu/>
                        <Cart/>
                    </Provider>
                </BrowserRouter>
    ));
    const accordionHeader = screen.getByText("Desserts (2)");
    fireEvent.click(accordionHeader);
    expect(screen.getAllByTestId("foodItems").length).toBe(2);

    expect(screen.getByText("Cart - (0 items)")).toBeInTheDocument();

    const addBtns = screen.getAllByRole("button", {name: "Add +"}); //name is label/text of button
    fireEvent.click(addBtns[0]);
    expect(screen.getByText("Cart - (1 items)")).toBeInTheDocument();

    fireEvent.click(addBtns[0]);
    expect(screen.getByText("Cart - (2 items)")).toBeInTheDocument();
    expect( screen.getAllByTestId("foodItems").length ).toBe(4);

    fireEvent.click(screen.getByRole("button", {name: "Clear Cart"}));

    expect( screen.getAllByTestId("foodItems").length ).toBe(2);

    expect(screen.getByText("Cart is empty. Add items to cart!!")).toBeInTheDocument();
}); 