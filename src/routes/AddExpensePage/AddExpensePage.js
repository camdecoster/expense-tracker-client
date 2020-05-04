// React
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

// Configuration
import "./AddExpensePage.css";
import TrackerContext from "../../contexts/TrackerContext";
import ExpenseApiService from "../../services/expense-api-service";

class AddExpensePage extends Component {
    static contextType = TrackerContext;

    state = {
        error: null,
        date: "",
        type: "expense",
        amount: "",
        payee: "", // Set this to the first category alphabetically
        category: "", // Set this to the first category alphabetically
        paymentMethod: "", // Set this to the first category alphabetically
        description: "",
    };

    // Handle form submission
    handleSubmit = (ev) => {
        ev.preventDefault();

        // Get info from form
        const {
            date,
            type,
            amount,
            payee,
            category,
            paymentMethod,
            description = "",
        } = ev.target;

        const expense = {
            date,
            type,
            amount,
            payee,
            category,
            paymentMethod,
            description,
        };

        // Clear previous errors (if they exist)
        this.setState({ error: null });

        // ExpenseApiService.postExpense(expense);

        // Route user to Expense Log
        this.props.history.push("/expense-log");

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

    handleInputChange = (ev) => {
        const { id, value } = ev.target;
        this.setState({
            ...this.state,
            [id]: value,
        });
    };

    render() {
        return (
            <section className='AddExpensePage'>
                <header role='banner'>
                    <h1>Add Expense</h1>
                </header>

                <form className='AddExpenseForm' onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor='date'>Date</label>
                        {/* Date should default to current date */}
                        <input
                            type='date'
                            id='date'
                            name='date'
                            value={this.state.date}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='type'>Type</label>
                        <select
                            name='type'
                            id='type'
                            value={this.state.type}
                            onChange={this.handleInputChange}
                            required
                        >
                            <option value='expense'>Expense</option>
                            <option value='credit'>Credit</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='amount'>Amount</label>
                        <input
                            type='number'
                            name='amount'
                            id='amount'
                            min='0'
                            step='0.01'
                            value={this.state.amount}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='payee'>Payee</label>
                        {/* Suggest payees based on past inputs */}
                        <input
                            type='text'
                            name='payee'
                            id='payee'
                            value={this.state.payee}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor='category'>Category</label>
                        <select
                            name='category'
                            id='category'
                            value={this.state.category}
                            onChange={this.handleInputChange}
                            required
                        >
                            <option value='auto'>Auto</option>
                            <option value='bills'>Bills</option>
                            <option value='groceries'>Groceries</option>
                            <option value='uncategorized'>Uncategorized</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='paymentMethod'>Payment Method</label>
                        <select
                            name='paymentMethod'
                            id='paymentMethod'
                            value={this.state.paymentMethod}
                            onChange={this.handleInputChange}
                            required
                        >
                            <option value='visa'>Visa</option>
                            <option value='check'>Check</option>
                            <option value='cash'>Cash</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='description'>
                            Description (Optional)
                        </label>
                        <br />
                        <input
                            type='text'
                            name='description'
                            id='description'
                            value={this.state.description}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </section>
        );
    }
}

export default withRouter(AddExpensePage);
