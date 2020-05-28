// React
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

// Configuration
import "./SideBar.css";
import TokenService from "../../services/token-service";
import TrackerContext from "../../contexts/TrackerContext";

export default function SideBar(props) {
    // Access context
    const context = useContext(TrackerContext);

    function handleLinkClick() {
        // Close user menu
        context.toggleClassNames({
            App_container_page: "nav_open",
            SideBar: "open",
        });
    }

    function createNavLinkList(navLinkTargets) {
        // Build list of NavLinks for <ul> in SideBar
        let navLinks = "";

        navLinks = navLinkTargets.map((navLink) => {
            return (
                <li key={navLink.link}>
                    <NavLink
                        exact
                        to={"/" + navLink.link}
                        onClick={handleLinkClick}
                    >
                        {navLink.name}
                    </NavLink>
                </li>
            );
        });

        return navLinks;
    }

    function renderAuthorized() {
        const navLinkTargets = [
            {
                name: "Dashboard",
                link: "",
            },
            {
                name: "New Expense",
                link: "expenses/new",
            },
            {
                name: "Expenses",
                link: "expenses",
            },
            {
                name: "Categories",
                link: "categories",
            },
            {
                name: "Payment Methods",
                link: "payment-methods",
            },
            // {
            //     name: "Account",
            //     link: "account",
            // },
        ];

        return createNavLinkList(navLinkTargets);
    }

    function renderUnauthorized() {
        const navLinkTargets = [
            {
                name: "Log In",
                link: "login",
            },
            {
                name: "Register",
                link: "register",
            },
        ];

        return createNavLinkList(navLinkTargets);
    }

    return (
        <div id='SideBar' className={props.className}>
            <h3>Expense Tracker</h3>

            {/* Links and logout should only be shown if user logged in */}
            <ul className='link_list'>
                {TokenService.hasAuthToken()
                    ? renderAuthorized()
                    : renderUnauthorized()}
            </ul>
        </div>
    );
}
