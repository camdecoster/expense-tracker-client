// React
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Configuration
import "./LoginForm.css";
import TrackerContext from "../../contexts/TrackerContext";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";

class LoginForm extends Component {
    static contextType = TrackerContext;

    static defaultProps = {
        onLoginSuccess: () => {},
    };

    state = {
        error: null,
    };

    handleSubmit = (ev) => {
        ev.preventDefault();

        // Get info from form
        const { email, password } = ev.target;

        // Clear previous errors (if they exist)
        this.setState({ error: null });

        AuthApiService.postLogin({
            email: email.value,
            password: password.value,
        })
            .then((res) => {
                email.value = "";
                password.value = "";
                TokenService.saveAuthToken(res.authToken);
                this.props.onLoginSuccess();
            })
            .catch((res) => {
                this.setState({ error: res.error });
            });
    };

    // handleSubmitBasicAuth = (ev) => {
    //     ev.preventDefault();

    //     // Get form values entered by user
    //     const { email, password } = ev.target;

    //     // Create basic auth token
    //     TokenService.saveAuthToken(
    //         TokenService.makeBasicAuthToken(email.value, password.value)
    //     );

    //     // Clear form values
    //     email.value = "";
    //     password.value = "";
    //     // this.props.onLoginSuccess();
    //     this.context.setLoggedInState(true);

    //     // Route user to dashboard
    //     this.props.history.push("/");
    // };

    render() {
        return (
            <form className='LoginForm' onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        // Only use value for testing
                        // defaultValue='test@test.com'
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
                        // defaultValue='test'
                        required
                    />
                </div>
                <button type='submit'>Sign In</button>
                <div>
                    <p>Reset your password</p>
                </div>
                <div>
                    <p>
                        <Link to='/register'>Register</Link> for a new account
                    </p>
                </div>
                <div role='alert'>
                    {this.state.error && (
                        <p className='red'>{this.state.error}</p>
                    )}
                </div>
            </form>
        );
    }
}

export default LoginForm;
