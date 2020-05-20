// React
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Configuration
import "./RegistrationForm.css";
import TrackerContext from "../../contexts/TrackerContext";
import TokenService from "../../services/token-service";
import AuthApiService from "../../services/auth-api-service";

class RegistrationForm extends Component {
    static contextType = TrackerContext;

    static defaultProps = {
        onRegistrationSuccess: () => {},
    };

    state = {
        error: null,
        showPasswordReqs: false,
    };

    // Handle form submission
    handleSubmit = (ev) => {
        ev.preventDefault();

        // Get info from form
        const { email, password } = ev.target;

        // Clear previous errors (if they exist)
        this.setState({ error: null });

        // Submit registration info
        AuthApiService.postUser({
            email: email.value,
            password: password.value,
        })
            .then((res) => {
                email.value = "";
                password.value = "";
                TokenService.saveAuthToken(res.authToken);
                this.props.onRegistrationSuccess();
            })
            .catch((res) => {
                this.setState({ error: res.error });
            });
    };

    toggleShowPasswordReqs = () => {
        this.setState({
            showPasswordReqs: !this.state.showPasswordReqs,
        });
    };

    render() {
        return (
            <form className='RegistrationForm' onSubmit={this.handleSubmit}>
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
                <button type='button' onClick={this.toggleShowPasswordReqs}>
                    Password Requirements
                </button>
                {this.state.showPasswordReqs && (
                    <div>
                        <p>Password requirements:</p>
                        <ul>
                            <li>
                                Password must be between 8 and 72 characters
                                long
                            </li>
                            <li>
                                Password must not start or end with empty spaces
                            </li>
                            <li>
                                Password must contain 1 upper case, lower case,
                                number and special character
                            </li>
                        </ul>
                    </div>
                )}
                <button type='submit'>Register</button>
                <div>
                    <p>
                        Already have an account? <Link to='/login'>Login</Link>.
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

export default RegistrationForm;
