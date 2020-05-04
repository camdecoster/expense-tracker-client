// React
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Configuration
import "./UserMenu.css";
import TrackerContext from "../../contexts/TrackerContext";
import TokenService from "../../services/token-service";

class UserMenu extends Component {
    static contextType = TrackerContext;

    handleLogOutClick = () => {
        // Clear auth token
        TokenService.clearAuthToken();

        this.handleLinkClick();
        this.context.setLoggedInState(false);
        // ALSO CLEAR EXPENSES IN STATE?
    };

    handleLinkClick = () => {
        // Close user menu
        this.context.toggleStateBoolean("showUserMenu");
    };

    renderLogInLink = () => {
        return (
            <div className='NavBar_not-logged-in'>
                <ul>
                    <li>
                        <Link to='/login' onClick={this.handleLinkClick}>
                            Log In
                        </Link>
                    </li>
                    <li>
                        <Link to='/register' onClick={this.handleLinkClick}>
                            Register
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    renderLogOutLink = () => {
        return (
            <div className='NavBar_logged-in'>
                <ul>
                    <li>
                        <p>Settings</p>
                    </li>
                    <li>
                        <Link to='/' onClick={this.handleLogOutClick}>
                            Log Out
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    render() {
        return (
            <div id='UserMenu' className='flexContainer'>
                {TokenService.hasAuthToken()
                    ? this.renderLogOutLink()
                    : this.renderLogInLink()}
            </div>
        );
    }
}

export default UserMenu;
