// React
import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";

// Configuration
import TrackerContext from "../../../contexts/TrackerContext";

// Components
import PaymentMethodsPage from "./PaymentMethodsPage";

describe("<PaymentMethodsPage> component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <TrackerContext.Provider
                    value={{
                        payment_methods: [],
                    }}
                >
                    <PaymentMethodsPage />
                </TrackerContext.Provider>
            </MemoryRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
