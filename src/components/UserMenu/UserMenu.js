// React
import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Configuration
import "./UserMenu.css";
import TrackerContext from "../../contexts/TrackerContext";
import TokenService from "../../services/token-service";

export default function UserMenu() {
    // Access context
    const context = useContext(TrackerContext);

    function handleLogOutClick() {
        // Clear auth token
        TokenService.clearAuthToken();

        handleLinkClick();
        // this.context.setLoggedInState(false);
        // ALSO CLEAR EXPENSES IN STATE?
    }

    function handleLinkClick() {
        // Close user menu
        context.toggleStateBoolean("showUserMenu");
    }

    function renderLogInLinks() {
        return (
            <div className='NavBar_not_logged_in'>
                <ul className='link_list'>
                    <li>
                        <Link to='/login' onClick={handleLinkClick}>
                            Log In
                        </Link>
                    </li>
                    <li>
                        <Link to='/register' onClick={handleLinkClick}>
                            Register
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }

    function renderLogOutLinks() {
        return (
            <div className='NavBar_logged_in'>
                <ul className='link_list'>
                    {/* <li>
                        <p>Settings</p>
                    </li> */}
                    <li>
                        <Link to='/' onClick={handleLogOutClick}>
                            Log Out
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }

    return (
        <div id='UserMenu' className='flex_container'>
            {TokenService.hasAuthToken()
                ? renderLogOutLinks()
                : renderLogInLinks()}
        </div>
    );
}
