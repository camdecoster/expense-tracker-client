// React
import React, { Component } from "react";
import { Route } from "react-router-dom";

// Configuration
import "./App.css";
import config from "../../config";
import TrackerContext from "../../contexts/TrackerContext";
import ExpenseApiService from "../../services/expense-api-service";
import TokenService from "../../services/token-service";

// Components
import ErrorItem from "../ErrorItem/ErrorItem";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

// Routes
import AddCategoryPage from "../../routes/AddCategoryPage/AddCategoryPage";
import AddExpensePage from "../../routes/AddExpensePage/AddExpensePage";
import AddPaymentMethodPage from "../../routes/AddPaymentMethodPage/AddPaymentMethodPage";
import CategoriesPage from "../../routes/CategoriesPage/CategoriesPage";
import DashboardPage from "../../routes/DashboardPage/DashboardPage";
import ExpenseLogPage from "../../routes/ExpenseLogPage/ExpenseLogPage";
import LandingPage from "../../routes/LandingPage/LandingPage";
import LoginPage from "../../routes/LoginPage/LoginPage";
import PaymentMethodsPage from "../../routes/PaymentMethodsPage/PaymentMethodsPage";
import RegistrationPage from "../../routes/RegistrationPage/RegistrationPage";

class App extends Component {
    state = {
        classNames: {
            container_page: "container_page",
            SideBar: "closed",
        },
        classNamesContainerPage: "container_page",
        classNamesSideBar: "closed",
        dateCurrent: new Date(),
        error: null,
        expenses: [],
        loggedIn: false,
        showSideBar: true,
        showUserMenu: false,
    };

    // Toggle variable (true becomes false, etc.) for showing an element
    toggleStateBoolean = (element) => {
        this.setState({
            [element]: !this.state[element],
        });
    };

    toggleClassNames = (element, classNamesToToggleString) => {
        // Split given classNames into array
        // classNamesToToggle should be space delimited string: 'class1 class2'
        let classNamesToToggle = classNamesToToggleString.split(" ");

        // Split current classNames into array
        // let classNames = this.state.classNames[element].split(" ");
        let classNames = this.state[element].split(" ");

        // See if each new className is listed or not, toggle it on/off
        classNamesToToggle.forEach((classNameToToggle) => {
            const classNameFound = classNames.find(
                (className) => className === classNameToToggle
            );
            if (classNameFound) {
                classNames = classNames.filter(
                    (className) => className !== classNameToToggle
                );
            } else {
                classNames.push(classNameToToggle);
            }
        });

        // Update classNames for element, leave rest as is
        this.setState({
            // classNames: {
            //     ...this.state.classNames,
            [element]: classNames.join(" "),
            // },
        });
    };

    setClassNames = (element, classNames) => {
        this.setState({
            [element]: classNames,
        });
    };

    setLoggedInState = (loggedIn) => {
        this.setState({
            loggedIn,
        });
    };

    // Get expenses from server (eventually)
    getExpenses = () => {
        // fetch statement in the future
        this.setState({
            expenses: ExpenseApiService.getExpenses(),
        });
    };

    // Temp function to add new expenses to state without server
    addExpense = (expense) => {
        let expenses = this.state.expenses;
        expenses.push(expense);
        this.setState({
            expenses,
        });
    };

    componentDidMount() {
        console.log("APP.JS: <App> did mount");
        this.getExpenses();
    }

    render() {
        const contextValue = {
            addExpense: this.addExpense,
            dateCurrent: this.state.dateCurrent,
            expenses: this.state.expenses,
            loggedIn: this.state.loggedIn,
            setClassNames: this.setClassNames,
            setLoggedInState: this.setLoggedInState,
            showNav: this.state.showNav,
            showUserMenu: this.state.showUserMenu,
            toggleClassNames: this.toggleClassNames,
            toggleStateBoolean: this.toggleStateBoolean,
        };

        const sideBarElement = this.state.showSideBar ? (
            <SideBar className={this.state.SideBarClassNames} />
        ) : (
            ""
        );

        return (
            <div id='App'>
                <TrackerContext.Provider value={contextValue}>
                    <SideBar className={this.state.classNamesSideBar} />

                    <section className={this.state.classNamesContainerPage}>
                        <NavBar />
                        <main>
                            <Route
                                exact
                                path='/'
                                render={(routerProps) => (
                                    <ErrorItem
                                        message={
                                            TokenService.hasAuthToken()
                                                ? `Couldn't load Dashboard page`
                                                : `Couldn't load Landing page`
                                        }
                                    >
                                        {TokenService.hasAuthToken() ? (
                                            <DashboardPage />
                                        ) : (
                                            <LandingPage />
                                        )}
                                    </ErrorItem>
                                )}
                            />
                            <Route
                                exact
                                path='/register'
                                render={(routerProps) => (
                                    <ErrorItem
                                        message={`Couldn't load Registration page`}
                                    >
                                        <RegistrationPage />
                                    </ErrorItem>
                                )}
                            />
                            <Route
                                exact
                                path='/login'
                                render={(routerProps) => (
                                    <ErrorItem
                                        message={`Couldn't load Login page`}
                                    >
                                        <LoginPage />
                                    </ErrorItem>
                                )}
                            />
                            <Route
                                exact
                                path='/add-expense'
                                render={(routerProps) => (
                                    <ErrorItem
                                        message={`Couldn't load Add Expense page`}
                                    >
                                        <AddExpensePage />
                                    </ErrorItem>
                                )}
                            />
                            <Route
                                exact
                                path='/expense-log'
                                render={(routerProps) => (
                                    <ErrorItem
                                        message={`Couldn't load Expense Log page`}
                                    >
                                        <ExpenseLogPage />
                                    </ErrorItem>
                                )}
                            />
                            <Route
                                exact
                                path='/categories'
                                render={(routerProps) => (
                                    <ErrorItem
                                        message={`Couldn't load Categories page`}
                                    >
                                        <CategoriesPage />
                                    </ErrorItem>
                                )}
                            />
                            <Route
                                exact
                                path='/add-category'
                                render={(routerProps) => (
                                    <ErrorItem
                                        message={`Couldn't load Add Category page`}
                                    >
                                        <AddCategoryPage />
                                    </ErrorItem>
                                )}
                            />
                            <Route
                                exact
                                path='/payment-methods'
                                render={(routerProps) => (
                                    <ErrorItem
                                        message={`Couldn't load Payment Methods page`}
                                    >
                                        <PaymentMethodsPage />
                                    </ErrorItem>
                                )}
                            />
                            <Route
                                exact
                                path='/add-payment-method'
                                render={(routerProps) => (
                                    <ErrorItem
                                        message={`Couldn't load Add Payment Method page`}
                                    >
                                        <AddPaymentMethodPage />
                                    </ErrorItem>
                                )}
                            />
                        </main>
                        <Footer />
                    </section>
                </TrackerContext.Provider>
            </div>
        );
    }
}

export default App;
