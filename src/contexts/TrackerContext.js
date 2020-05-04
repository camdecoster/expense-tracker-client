import React from "react";

const TrackerContext = React.createContext({
    addExpense: () => {}, // Temporary, delete when server is running
    dateCurrent: null,
    expenses: null,
    loggedIn: null,
    setLoggedInState: () => {},
    showNav: null,
    showUserMenu: null,
    toggleStateBoolean: () => {},
});

export default TrackerContext;
