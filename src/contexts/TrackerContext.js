import React from "react";

const TrackerContext = React.createContext({
    addExpense: () => {}, // Temporary, delete when server is running
    dateCurrent: null,
    expenses: null,
    loggedIn: null,
    setClassNames: () => {},
    setLoggedInState: () => {},
    showNav: null,
    showUserMenu: null,
    toggleClassNames: () => {},
    toggleStateBoolean: () => {},
});

export default TrackerContext;
