// React
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faUserCircle,
    faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

// Configuration
import "./NavBar.css";
import TrackerContext from "../../contexts/TrackerContext";
import TokenService from "../../services/token-service";

// Components
import UserMenu from "../UserMenu/UserMenu";

export default class NavBar extends Component {
    static contextType = TrackerContext;

    renderNewExpense = () => {
        return (
            <Link to='/expenses/new'>
                <FontAwesomeIcon
                    className='faPlusCircle faIcon'
                    icon={faPlusCircle}
                />
            </Link>
        );
    };

    render() {
        const { showUserMenu } = this.context;

        const userMenuElement = showUserMenu ? <UserMenu /> : "";

        return (
            <nav role='navigation'>
                <div className='container_flex'>
                    <button
                        className='buttonShowNav'
                        onClick={() => {
                            this.context.toggleClassNames({
                                App_container_page: "nav_open",
                                SideBar: "open",
                            });
                        }}
                    >
                        <FontAwesomeIcon className='faIcon' icon={faBars} />
                    </button>
                    {/* Use div below to keep title and plus close together in flex container */}
                    <div>
                        <h3>
                            <Link to='/'>Expense Tracker</Link>
                        </h3>
                        {TokenService.hasAuthToken()
                            ? this.renderNewExpense()
                            : ""}
                    </div>
                    <div className='containerUserMenu'>
                        <button
                            className='buttonShowUserMenu'
                            onClick={() => {
                                this.context.toggleStateBoolean("showUserMenu");
                            }}
                        >
                            <FontAwesomeIcon
                                className='faIcon'
                                icon={faUserCircle}
                            />
                        </button>
                        {userMenuElement}
                    </div>
                </div>
            </nav>
        );
    }
}
