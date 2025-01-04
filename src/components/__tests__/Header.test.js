import { render, screen } from "@testing-library/react";
import Header from '../Header';
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

it("Should render Header component with a login button", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
            </Provider>
        </BrowserRouter>
    );

    const loginButton = screen.getByRole("button", {name: "Login" }); 
    //const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();
}); 

it("Should render Header component with Cart", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
            </Provider>
        </BrowserRouter>
    );

    //const cartItems = screen.getByText("Cart - (0 items)");
    const cartItems = screen.getByText(/Cart/);
    expect(cartItems).toBeInTheDocument();
}); 