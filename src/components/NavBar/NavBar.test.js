// React
import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

// Configuration
import TrackerContext from "../../contexts/TrackerContext";

// Components
import NavBar from "./NavBar";

describe("<Footer> component", () => {
    // Create dummy context values for test
    const contextValue = {
        showUserMenu: false,
    };

    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <TrackerContext.Provider value={contextValue}>
                    <NavBar />
                </TrackerContext.Provider>
            </MemoryRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    // it("renders the UI as expected", () => {
    //     const tree = renderer
    //         .create(
    //             <MemoryRouter>
    //                 <TrackerContext.Provider>
    //                     <NavBar />
    //                 </TrackerContext.Provider>
    //             </MemoryRouter>
    //         )
    //         .toJSON();
    //     expect(tree).toMatchSnapshot();
    // });
});
