// React
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

// Configuration
import "./LoginPage.css";
import TrackerContext from "../../contexts/TrackerContext";
import TokenService from "../../services/token-service";

class LoginPage extends Component {
    static contextType = TrackerContext;

    static defaultProps = {
        onLoginSuccess: () => {},
    };

    state = {
        error: null,
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
            <section className='LoginPage'>
                <header role='banner'>
                    <h1>Log in to Expense Tracker</h1>
                </header>

                {/* ADD ERROR ELEMENT HERE */}
                <form
                    className='loginForm'
                    onSubmit={this.handleSubmitBasicAuth}
                >
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
                    <button type='submit'>Sign In</button>
                    <div>
                        <p>Reset your password</p>
                    </div>
                    <div>
                        <p>
                            <Link to='/register'>Register</Link> for a new
                            account
                        </p>
                    </div>
                </form>
            </section>
        );
    }
}

// Use withRouter to get access to this.props.history.push
export default withRouter(LoginPage);
