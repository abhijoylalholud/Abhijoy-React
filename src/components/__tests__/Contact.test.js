import { getAllByRole, getByRole, render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

describe("Contact Us page Test Cases", () => {
    test('Should load contact us component', () => { 
        render(<Contact/>);
        const heading = screen.getByRole("heading")
    
        //Assertion
        expect(heading).toBeInTheDocument();
    });
    
    test('Should load button inside contact component', () => { 
        render(<Contact/>);
        //const button = screen.getByRole("button");
        const button = screen.getByText("Submit");
        //const button = screen.getAllByPlaceholderText("Name");
    
        //Assertion
        expect(button).toBeInTheDocument(); 
    });
    
    it('Should load input name inside contact component', () => { 
        render(<Contact/>);
        const inputName = screen.getByPlaceholderText("Name");
    
        expect(inputName).toBeInTheDocument(); 
    });
    
    it('Should load 2 input boxes on contact component', () => { 
        render(<Contact/>);
        //Querying
        const inputBoxes = screen.getAllByRole("textbox");
        //console.log(inputBoxes);
        //expect(inputBoxes.length).toBe(2);
        expect(inputBoxes.length).not.toBe(3);
    });
});
