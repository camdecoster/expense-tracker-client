// React
import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";

// Configuration
import TrackerContext from "../../../contexts/TrackerContext";

// Components
import NewExpenseForm from "./NewExpenseForm";

const testCategories = [
    {
        id: 1,
        category_name: "Test1",
        amount: 100,
        total: 50,
    },
    {
        id: 2,
        category_name: "Test2",
        amount: 100,
        total: 50,
    },
];

const testPayment_methods = [
    {
        id: 1,
        payment_method_name: "Test1",
        total: 50,
    },
    {
        id: 2,
        category_name: "Test2",
        total: 50,
    },
];

describe("<NewExpenseForm> component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <TrackerContext.Provider
                    value={{
                        categories: [],
                        payment_methods: [],
                    }}
                >
                    <NewExpenseForm />
                </TrackerContext.Provider>
            </MemoryRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
