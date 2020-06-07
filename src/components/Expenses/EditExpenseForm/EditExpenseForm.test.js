// React
import React from "react";
import ReactDOM from "react-dom";

// Configuration
import TrackerContext from "../../../contexts/TrackerContext";

// Components
import EditExpenseForm from "./EditExpenseForm";

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

describe("<EditExpenseForm> component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <TrackerContext.Provider
                value={{
                    categories: [],
                    payment_methods: [],
                }}
            >
                <EditExpenseForm />
            </TrackerContext.Provider>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
