// React
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

// Configuration
import "./App.css";
// import config from "../../config";
import TrackerContext from "../../contexts/TrackerContext";
import ExpenseApiService from "../../services/expense-api-service";
import TokenService from "../../services/token-service";
import CategoryApiService from "../../services/category-api-service";

// Components
import ErrorItem from "../ErrorItem/ErrorItem";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import PrivateRoute from "../Utilities/PrivateRoute/PrivateRoute";
import PublicOnlyRoute from "../Utilities/PublicOnlyRoute/PublicOnlyRoute";
import SideBar from "../SideBar/SideBar";

// Routes
// import NewCategoryPage from "../../routes/Categories/NewCategoryPage/NewCategoryPage";
import AddExpensePage from "../../routes/AddExpensePage/AddExpensePage";
// import AddPaymentMethodPage from "../../routes/AddPaymentMethodPage/AddPaymentMethodPage";
import CategoriesPage from "../../routes/Categories/CategoriesPage/CategoriesPage";
import DashboardPage from "../../routes/DashboardPage/DashboardPage";
import ExpenseLogPage from "../../routes/ExpenseLogPage/ExpenseLogPage";
import LandingPage from "../../routes/LandingPage/LandingPage";
import LoginPage from "../../routes/LoginPage/LoginPage";
import Payment_methodsPage from "../../routes/Payment_methods/Payment_methodsPage/Payment_methodsPage";
import RegistrationPage from "../../routes/RegistrationPage/RegistrationPage";

class App extends Component {
    state = {
        categories: [],
        classNames: {
            App_container_page: "container_page",
            SideBar: "",
        },
        dateCurrent: new Date(),
        error: null,
        expenses: [],
        loggedIn: false,
        showSideBar: true,
        showUserMenu: false,
        test: false,
    };

    setTest = (test) => {
        this.setState({
            test,
        });
    };

    // Toggle variable (true becomes false, etc.) for showing an element
    toggleStateBoolean = (element) => {
        this.setState({
            [element]: !this.state[element],
        });
    };

    // Toggle classNames for every item in given object
    toggleClassNames = (classNamesObj) => {
        const newClassNames = {};

        for (let element in classNamesObj) {
            const classNamesToToggleString = classNamesObj[element];
            // Split given classNames into array
            // classNamesToToggle should be space delimited string: 'class1 class2'
            let classNamesToToggle = classNamesToToggleString.split(" ");

            // Split current classNames into array
            let classNames = this.state.classNames[element].split(" ");
            // let classNames = this.state[element].split(" ");

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
            // Save new classNames for current element
            newClassNames[element] = classNames.join(" ");
        }

        // Update classNames for all elements, leave rest as is
        this.setState({
            classNames: {
                ...this.state.classNames,
                ...newClassNames,
            },
        });
    };

    // Save category info in state
    setCategories = (categories) => {
        console.log("`setCategories` ran");
        this.setState({
            categories,
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

    // MOVE THIS TO DIFFERENT LIFECYCLE STAGE?
    componentDidMount() {
        // Only get info from API if user is logged in
        if (TokenService.hasAuthToken()) {
            // Get categories from API, store in context
            CategoryApiService.getCategories().then((categories) =>
                this.setCategories(categories)
            );

            // Get payment methods from API, store in context
            // Payment_methodApiService.getPayment_methods().then((payment_methods) =>
            //     context.setPayment_methods(payment_methods)
            // );
        }
        console.log("APP.JS: <App> did mount");
        this.getExpenses();
    }

    render() {
        const contextValue = {
            addExpense: this.addExpense,
            categories: this.state.categories,
            dateCurrent: this.state.dateCurrent,
            expenses: this.state.expenses,
            loggedIn: this.state.loggedIn,
            setCategories: this.setCategories,
            setClassNames: this.setClassNames,
            setLoggedInState: this.setLoggedInState,
            showNav: this.state.showNav,
            showUserMenu: this.state.showUserMenu,
            toggleClassNames: this.toggleClassNames,
            toggleStateBoolean: this.toggleStateBoolean,
            setTest: this.setTest,
            test: this.state.test,
        };

        const sideBarElement = this.state.showSideBar ? (
            <SideBar className={this.state.SideBarClassNames} />
        ) : (
            ""
        );

        return (
            <div id='App'>
                <TrackerContext.Provider value={contextValue}>
                    <SideBar className={this.state.classNames.SideBar} />

                    <section
                        id='container_page'
                        className={this.state.classNames.App_container_page}
                    >
                        <NavBar />
                        <main>
                            <Switch>
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
                                <PublicOnlyRoute
                                    path='/register'
                                    render={(routerProps) => (
                                        <ErrorItem
                                            message={`Couldn't load Registration page`}
                                        >
                                            <RegistrationPage
                                                {...routerProps}
                                            />
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
                                <PrivateRoute
                                    path='/add-expense'
                                    render={(routerProps) => (
                                        <ErrorItem
                                            message={`Couldn't load Add Expense page`}
                                        >
                                            <AddExpensePage {...routerProps} />
                                        </ErrorItem>
                                    )}
                                />
                                <PrivateRoute
                                    path='/expense-log'
                                    render={(routerProps) => (
                                        <ErrorItem
                                            message={`Couldn't load Expense Log page`}
                                        >
                                            <ExpenseLogPage {...routerProps} />
                                        </ErrorItem>
                                    )}
                                />
                                <PrivateRoute
                                    path='/categories'
                                    render={(routerProps) => (
                                        <ErrorItem
                                            message={`Couldn't load Categories page`}
                                        >
                                            <CategoriesPage {...routerProps} />
                                        </ErrorItem>
                                    )}
                                />
                                {/* <Route
                                    path='/categories'
                                    render={(routerProps) => (
                                        <ErrorItem
                                            message={`Couldn't load Categories page`}
                                        >
                                            <CategoriesPage {...routerProps} />
                                        </ErrorItem>
                                    )}
                                /> */}
                                {/* <PrivateRoute
                                    path='/add-category'
                                    render={(routerProps) => (
                                        <ErrorItem
                                            message={`Couldn't load Add Category page`}
                                        >
                                            <NewCategoryPage {...routerProps} />
                                        </ErrorItem>
                                    )}
                                /> */}
                                <PrivateRoute
                                    path='/payment-methods'
                                    render={(routerProps) => (
                                        <ErrorItem
                                            message={`Couldn't load Payment Methods page`}
                                        >
                                            <Payment_methodsPage
                                                {...routerProps}
                                            />
                                        </ErrorItem>
                                    )}
                                />
                                {/* <PrivateRoute
                                    path='/add-payment-method'
                                    render={(routerProps) => (
                                        <ErrorItem
                                            message={`Couldn't load Add Payment Method page`}
                                        >
                                            <AddPaymentMethodPage
                                                {...routerProps}
                                            />
                                        </ErrorItem>
                                    )}
                                /> */}
                                {/* NEED TO ADD NOT FOUND PAGE */}
                            </Switch>
                        </main>
                        <Footer />
                    </section>
                </TrackerContext.Provider>
            </div>
        );
    }
}

export default App;
