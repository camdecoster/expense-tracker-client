// React
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

// Configuration
import "./SideBar.css";
// import TrackerContext from "../../contexts/TrackerContext";
import TokenService from "../../services/token-service";

class SideBar extends Component {
    // static contextType = TrackerContext;

    // state = {};

    handleLinkClick = () => {
        // Close user menu
        // this.context.toggleStateBoolean("showNav");
    };

    createNavLinkList = (navLinkTargets) => {
        // Build list of NavLinks for <ul> in SideBar
        let navLinks = "";

        navLinks = navLinkTargets.map((navLink) => {
            return (
                <li key={navLink.link}>
                    <NavLink
                        exact
                        to={"/" + navLink.link}
                        onClick={this.handleLinkClick}
                    >
                        {navLink.name}
                    </NavLink>
                </li>
            );
        });

        return navLinks;
    };

    renderAuthorized = () => {
        const navLinkTargets = [
            {
                name: "Dashboard",
                link: "",
            },
            {
                name: "Add Expense",
                link: "add-expense",
            },
            {
                name: "Expense Log",
                link: "expense-log",
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

        return this.createNavLinkList(navLinkTargets);
    };

    renderUnauthorized = () => {
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

        return this.createNavLinkList(navLinkTargets);
    };

    render() {
        return (
            <div id='SideBar' className={this.props.className}>
                <h3>Expense Tracker</h3>

                {/* Links and logout should only be shown if user logged in */}
                <ul className='link_list'>
                    {TokenService.hasAuthToken()
                        ? this.renderAuthorized()
                        : this.renderUnauthorized()}
                </ul>
            </div>
        );
    }
}

export default SideBar;
