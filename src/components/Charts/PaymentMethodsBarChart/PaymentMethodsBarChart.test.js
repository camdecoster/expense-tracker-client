// React
import React from "react";
import ReactDOM from "react-dom";

// Components
import PaymentMethodsBarChart from "./PaymentMethodsBarChart";

const testPayment_methods = [
    {
        payment_method_name: "Test1",
        total: 50,
    },
    {
        category_name: "Test2",
        total: 50,
    },
];

describe("<PaymentMethodsBarChart> component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<PaymentMethodsBarChart payment_methods={[]} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
