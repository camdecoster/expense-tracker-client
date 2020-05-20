// React
import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

// Configuration
// import TrackerContext from "../../contexts/TrackerContext";
import TokenService from "../../services/token-service";

// Components
import SideBar from "./SideBar";

// Create mock service for TokenService
jest.mock("../../services/token-service");

describe("<SideBar> component", () => {
    // Create dummy context values for test
    // const contextValue = {
    //     showUserMenu: false,
    // };

    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <SideBar />
            </MemoryRouter>,
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    describe("renders the UI", () => {
        it("render the unauthorized UI", () => {
            TokenService.hasAuthToken.mockReturnValue(false);

            const tree = renderer
                .create(
                    <MemoryRouter>
                        <SideBar />
                    </MemoryRouter>
                )
                .toJSON();
            expect(tree).toMatchSnapshot();
        });

        it("renders the authorized UI", () => {
            TokenService.hasAuthToken.mockReturnValue(true);

            const tree = renderer
                .create(
                    <MemoryRouter>
                        <SideBar />
                    </MemoryRouter>
                )
                .toJSON();
            expect(tree).toMatchSnapshot();
        });
    });
});
