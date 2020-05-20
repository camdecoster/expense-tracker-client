// React
import React, { Component } from "react";
import { Link } from "react-router-dom";

// Configuration
import "./LandingPage.css";
import TrackerContext from "../../contexts/TrackerContext";

class LandingPage extends Component {
    static contextType = TrackerContext;

    render() {
        return (
            <section id='LandingPage' className='route_page'>
                <header role='banner'>
                    <h1>Expense Tracker</h1>
                </header>

                <section>
                    <h3>Start keeping track</h3>
                    <p>
                        [
                        <em>
                            Placeholder for image showing common items one might
                            purchase
                        </em>
                        ]
                    </p>
                    <p>
                        How do you spend your money? Most people can think of
                        big items like rent and car payments, but then it starts
                        to get fuzzy. Did I buy pizza this week or last week?
                        How much did I spend on groceries? Expense Tracker aims
                        to help people track their spending by making it easy to
                        add an expense and quickly see where money is being
                        spent by category.
                    </p>
                </section>

                <section>
                    <h3>Start using a budget</h3>
                    <p>
                        [
                        <em>
                            Placeholder for image showing representation of
                            budget
                        </em>
                        ]
                    </p>
                    <p>
                        Once you know where your money is being spent, you can
                        figure out how you should spend it in the future.
                        Expense Tracker can help you set a budget and keep your
                        spending focused on the things you want.
                    </p>
                </section>

                <section>
                    <h3>Start learning</h3>
                    <p>
                        [
                        <em>
                            Placeholder for image showing charts/graphs from
                            dashboard{" "}
                        </em>
                        ]
                    </p>
                    <p>
                        Expense Tracker will use your financial history to show
                        you monthly, annual, and lifetime spending. Use this
                        information to help guide your spending in the future.
                    </p>
                </section>

                <section>
                    <header>
                        <h3>Sign up for Expense Tracker</h3>
                    </header>
                    <p>
                        Sign up for a new account and start tracking your
                        expenses today.
                    </p>
                    <Link to='/register'>Sign Up</Link>
                </section>
            </section>
        );
    }
}

export default LandingPage;
