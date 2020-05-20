// React
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// Configuration
import "./LoginPage.css";
import TrackerContext from "../../contexts/TrackerContext";

// Components
import LoginForm from "../../components/LoginForm/LoginForm";

class LoginPage extends Component {
    static contextType = TrackerContext;

    static defaultProps = {
        onLoginSuccess: () => {},
    };

    handleLoginSuccess = () => {
        // SHOULD I GET ACCOUNT INFO (EXPENSES, ETC.) HERE OR IN DASHBOARD?

        // Route user to dashboard
        this.props.history.push("/");
    };

    render() {
        return (
            <section id='LoginPage' className='route_page'>
                <header role='banner'>
                    <h1>Log in to Expense Tracker</h1>
                </header>

                <LoginForm onLoginSuccess={this.handleLoginSuccess} />
            </section>
        );
    }
}

// Use withRouter to get access to this.props.history.push
export default withRouter(LoginPage);
