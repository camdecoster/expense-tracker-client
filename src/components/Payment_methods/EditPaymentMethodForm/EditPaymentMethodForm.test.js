// React
import React from "react";
import ReactDOM from "react-dom";

// Components
import EditPaymentMethodForm from "./EditPaymentMethodForm";

describe("<EditPaymentMethodForm> component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<EditPaymentMethodForm />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
