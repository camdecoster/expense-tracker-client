// React
import React from "react";
import ReactDOM from "react-dom";

// Components
import CategoriesBarChart from "./CategoriesBarChart";

const testCategories = [
    {
        category_name: "Test1",
        amount: 100,
        total: 50,
    },
    {
        category_name: "Test2",
        amount: 100,
        total: 50,
    },
];

describe("<CategoriesBarChart> component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<CategoriesBarChart categories={[]} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
