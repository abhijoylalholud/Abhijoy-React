import { act, fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import MOCK_DATA from '../mocks/mockResListData.json';
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(()=>{
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_DATA);
        }
    });
});

it("Should search Restaurant list with ch input", async() => {
    await act( async() => render(
        <BrowserRouter>
            <Body/>
        </BrowserRouter>
    ) );

    const cardsBeforeSearch = screen.getAllByTestId("resCard");
    expect(cardsBeforeSearch.length).toBe(8);

    const searchBtn = screen.getByRole("button", {name: "Search"});
    const searchInput = screen.getByTestId("searchInput");
    fireEvent.change(searchInput, { target: {value: "ch"}});
    fireEvent.click(searchBtn);
    //expect(searchBtn).toBeInTheDocument();
    const cardsAfterSearch = screen.getAllByTestId("resCard");
    expect(cardsAfterSearch.length).toBe(2);
});

it("Should filter Top Rated Restaurant", async() => {
    await act( async() => render(
        <BrowserRouter>
            <Body/>
        </BrowserRouter>
    ) );
    const cardsBeforeFilter = screen.getAllByTestId("resCard");
    expect(cardsBeforeFilter.length).toBe(8);
    const topRatedBtn = screen.getByRole("button", {name: "Top Rated Restaurants"});
    fireEvent.click(topRatedBtn);
    const cardsAfterFilter = screen.getAllByTestId("resCard");
    expect(cardsAfterFilter.length).toBe(2);
});