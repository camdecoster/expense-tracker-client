import React from "react";

const TrackerContext = React.createContext({
    addExpense: () => {}, // Temporary, delete when server is running
    categories: null,
    dateCurrent: null,
    expenses: null,
    loggedIn: null,
    setCategories: () => {},
    setClassNames: () => {},
    setLoggedInState: () => {},
    showNav: null,
    showUserMenu: null,
    toggleClassNames: () => {},
    toggleStateBoolean: () => {},
});

export default TrackerContext;
