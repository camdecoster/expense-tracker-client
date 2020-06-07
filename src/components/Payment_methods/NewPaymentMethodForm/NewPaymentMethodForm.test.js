// React
import React from "react";
import ReactDOM from "react-dom";

// Components
import NewPaymentMethodForm from "./NewPaymentMethodForm";

describe("<NewPaymentMethodForm> component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<NewPaymentMethodForm />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
