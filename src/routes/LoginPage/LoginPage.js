// React
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

// Configuration
import "./LoginPage.css";
import TrackerContext from "../../contexts/TrackerContext";

// Components
import LoginForm from "../../components/LoginForm/LoginForm";

export default function LoginPage() {
    // Access context
    const context = useContext(TrackerContext);

    // Access history
    const history = useHistory();

    function handleLoginSuccess() {
        // SHOULD I GET ACCOUNT INFO (EXPENSES, ETC.) HERE OR IN DASHBOARD?

        // Route user to dashboard
        history.push("/");
    }

    return (
        <section id='LoginPage' className='route_page'>
            <header role='banner'>
                <h1>Log in to Expense Tracker</h1>
            </header>

            <LoginForm onLoginSuccess={handleLoginSuccess} />
        </section>
    );
}
