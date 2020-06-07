// React
import React from "react";
import ReactDOM from "react-dom";

// Components
import NewCategoryForm from "./NewCategoryForm";

describe("<NewCategoryForm> component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<NewCategoryForm />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
