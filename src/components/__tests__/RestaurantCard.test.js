import { render, screen } from "@testing-library/react"
import RestaurantCard from "../RestaurantCard";
import MOCK_DATA from  "../mocks/resCardMock.json";

it("Should render Restaurant card component with props data", ()=>{
    render(<RestaurantCard resData={MOCK_DATA} />);

    const namee = screen.getByText("Pizza Hut");
    expect(namee).toBeInTheDocument();
});

it("Should render Restaurant card component with promoted label", ()=>{

});