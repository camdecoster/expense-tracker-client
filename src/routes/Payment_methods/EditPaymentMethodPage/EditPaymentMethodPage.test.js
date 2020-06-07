// React
import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";

// Configuration
import TrackerContext from "../../../contexts/TrackerContext";

// Components
import EditPaymentMethodPage from "./EditPaymentMethodPage";

describe("<EditPaymentMethodPage> component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <TrackerContext.Provider
                    value={{
                        payment_methods: [],
                    }}
                >
                    <EditPaymentMethodPage />
                </TrackerContext.Provider>
            </MemoryRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
