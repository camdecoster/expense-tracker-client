// React
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

// Configuration
import "./RegistrationPage.css";
import TrackerContext from "../../contexts/TrackerContext";
import TokenService from "../../services/token-service";

class RegistrationPage extends Component {
    static contextType = TrackerContext;

    state = {
        error: null,
    };

    // Handle form submission
    handleSubmit = (ev) => {
        ev.preventDefault();

        // Get info from form
        const { firstName, lastName, email, password } = ev.target;

        // Clear previous errors (if they exist)
        this.setState({ error: null });

        // Treat as simple log in for now
        this.handleSubmitBasicAuth(ev);

        // Post user registration info
        // AuthApiService.postUser({
        //     user_name: user_name.value,
        //     password: password.value,
        //     full_name: full_name.value,
        //     nickname: nick_name.value,
        // })
        //     .then((user) => {
        //         // Clear form values
        //         firstName.value = "";
        //         lastName.value = "";
        //         email.value = "";
        //         password.value = "";
        //         this.props.onRegistrationSuccess();
        //     })
        //     .catch((res) => {
        //         this.setState({ error: res.error });
        //     });
    };

    handleSubmitBasicAuth = (ev) => {
        ev.preventDefault();

        // Get form values entered by user
        const { email, password } = ev.target;

        // Create basic auth token
        TokenService.saveAuthToken(
            TokenService.makeBasicAuthToken(email.value, password.value)
        );

        // Clear form values
        email.value = "";
        password.value = "";
        // this.props.onLoginSuccess();
        this.context.setLoggedInState(true);

        // Route user to dashboard
        this.props.history.push("/");
    };

    render() {
        return (
            <section className='RegistrationPage'>
                <header>
                    <h3>Sign up for Expense Tracker</h3>
                </header>
                <form className='RegistrationForm' onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor='firstName'>First Name</label>
                        <input
                            placeholder='First Name'
                            type='text'
                            name='firstName'
                            id='firstName'
                            // Only use value for testing
                            defaultValue='Test'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='lastName'>Last Name</label>
                        <input
                            type='text'
                            name='lastName'
                            id='lastName'
                            placeholder='Last Name'
                            // Only use value for testing
                            defaultValue='Guy'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            // Only use value for testing
                            defaultValue='test@test.com'
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            // Only use value for testing
                            defaultValue='test'
                            required
                        />
                    </div>
                    <button type='submit'>Register</button>
                    <div>
                        <p>
                            Already have an account?{" "}
                            <Link to='/login'>Login</Link>.
                        </p>
                    </div>
                </form>
            </section>
        );
    }
}

export default withRouter(RegistrationPage);
