// React
import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";

// Configuration
import TrackerContext from "../../../contexts/TrackerContext";

// Components
import NewExpensePage from "./NewExpensePage";

describe("<NewExpensePage> component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <TrackerContext.Provider
                    value={{
                        categories: [],
                        payment_methods: [],
                        expenses: [],
                    }}
                >
                    <NewExpensePage />
                </TrackerContext.Provider>
            </MemoryRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});
