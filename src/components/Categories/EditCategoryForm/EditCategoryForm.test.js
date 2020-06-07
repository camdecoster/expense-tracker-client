// React
import React from "react";
import ReactDOM from "react-dom";

// Components
import EditCategoryForm from "./EditCategoryForm";

describe("<EditCategoryForm> component", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<EditCategoryForm />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
