// React
import React, { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Configuration
import "./NavBar.css";
import TrackerContext from "../../contexts/TrackerContext";
import TokenService from "../../services/token-service";

// Components
import AddItemLinkButton from "../Utilities/AddItemLinkButton/AddItemLinkButton";

export default function NavBar() {
    // Access context
    const context = useContext(TrackerContext);

    // Access history
    const history = useHistory();

    // Handle tasks when logging out
    function handleLogOutClick() {
        // Clear auth token
        TokenService.clearAuthToken();

        // Route to homepage
        history.push("/");

        // Clear out User information
        context.setExpenses([]);
        context.setPayment_methods([]);
        context.setCategories([]);
    }

    function createNavLinkList(navLinkTargets) {
        // Build list of NavLinks for <ul> in SideBar
        let navLinks = "";

        navLinks = navLinkTargets.map((navLink) => {
            return (
                <AddItemLinkButton
                    to={"/" + navLink.link}
                    name={navLink.name}
                    icon={navLink.icon}
                    key={navLink.name}
                />
            );
        });

        return navLinks;
    }

    function renderAuthorized() {
        const navLinkTargets = [
            // {
            //     name: "Dashboard",
            //     link: "",
            // },
            // {
            //     name: "New Expense",
            //     link: "expenses/new",
            // },
            {
                name: "Expenses",
                link: "expenses",
                icon: "dollar-sign",
            },
            {
                name: "Categories",
                link: "categories",
                icon: "list",
            },
            {
                name: "Payment Methods",
                link: "payment-methods",
                icon: "credit-card",
            },
        ];

        // Get NavLinks for NavBar
        const navLinks = createNavLinkList(navLinkTargets);

        // Add log out button
        navLinks.push(
            <button
                className='link_button'
                type='button'
                title='Log Out'
                key='Log Out'
                aria-label='Log Out'
                onClick={() => handleLogOutClick()}
            >
                <FontAwesomeIcon className='faIcon' icon='sign-out-alt' />
            </button>
        );

        return navLinks;
    }

    function renderUnauthorized() {
        const navLinkTargets = [
            {
                name: "Log In",
                link: "login",
                icon: "sign-in-alt",
            },
            {
                name: "Register",
                link: "register",
                icon: "plus-square",
            },
            // {
            //     name: "Demo",
            //     link: "demo",
            //     icon: "play-circle",
            // },
        ];

        return createNavLinkList(navLinkTargets);
    }

    return (
        <nav role='navigation'>
            <h1>
                <Link to='/' title='Go to Dashboard'>
                    Expense Tracker
                </Link>
            </h1>
            <div className='link_list'>
                {/* Links and logout should only be shown if user logged in */}
                {TokenService.hasAuthToken()
                    ? renderAuthorized()
                    : renderUnauthorized()}
            </div>
            {!!TokenService.getUser() ? (
                <p id='logged_in_note'>
                    {`Logged in as ${TokenService.getUser()}`}
                </p>
            ) : (
                ""
            )}
        </nav>
    );
}
