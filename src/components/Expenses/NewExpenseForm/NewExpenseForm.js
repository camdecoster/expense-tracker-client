// React
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

// Configuration
import "./NewExpenseForm.css";
import TrackerContext from "../../../contexts/TrackerContext";
import ExpenseApiService from "../../../services/expense-api-service";

// Components
import ErrorMessage from "../../Utilities/ErrorMessage/ErrorMessage";

export default function NewExpenseForm(props) {
    // Access context
    const context = useContext(TrackerContext);

    // Initialize state
    const [error, setError] = useState(null);

    // Create options for category select
    const categoryOptions = context.categories.map((category) => (
        <option key={category.id} value={category.id}>
            {category.category_name}
        </option>
    ));
    // Add Uncategorized to beginning of select options
    categoryOptions.unshift(
        <option key={0} value={"Uncategorized"}>
            {"Uncategorized"}
        </option>
    );

    // Create options for payment method select
    const payment_methodOptions = context.payment_methods.map(
        (payment_method) => (
            <option key={payment_method.id} value={payment_method.id}>
                {payment_method.payment_method_name}
            </option>
        )
    );
    // Add No Payment Method to beginning of select options
    payment_methodOptions.unshift(
        <option key={0} value={"No Payment Method"}>
            {"No Payment Method"}
        </option>
    );

    // Create defaultDate for date input defaultValue
    function defaultDate() {
        const dateParts = new Date().toLocaleDateString("en-GB").split("/");
        const yyyy = dateParts[2];
        const mm = dateParts[1];
        const dd = dateParts[0];
        return `${yyyy}-${mm}-${dd}`;
    }

    function showForm() {
        return (
            <form
                className='EditExpenseForm'
                onSubmit={(event) => handleSubmit(event)}
            >
                <div>
                    <label htmlFor='amount'>Amount</label>
                    <input
                        type='number'
                        name='amount'
                        id='amount'
                        min='0'
                        step='0.01'
                        required
                    />
                </div>
                <div>
                    <label htmlFor='type'>Type</label>
                    <select name='type' id='type' required>
                        <option value='expense' defaultValue>
                            Expense
                        </option>
                        <option value='credit'>Credit</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='date'>Date</label>
                    <input
                        type='date'
                        id='date'
                        name='date'
                        defaultValue={defaultDate()}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='payee'>Payee</label>
                    {/* Suggest payees based on past inputs */}
                    <input type='text' name='payee' id='payee' required />
                </div>
                <div>
                    <label htmlFor='category'>Category</label>
                    <select name='category' id='category' required>
                        {categoryOptions}
                    </select>
                </div>
                <div>
                    <label htmlFor='payment_method'>Payment Method</label>
                    <select name='payment_method' id='payment_method' required>
                        {payment_methodOptions}
                    </select>
                </div>
                <div>
                    <label htmlFor='description'>Description (Optional)</label>
                    <textarea name='description' id='description' wrap='soft' />
                </div>
                <button type='submit'>Add Expense</button>
                <button type='button' onClick={() => props.onCancel()}>
                    Go Back
                </button>
                {error ? <ErrorMessage message={error} /> : ""}
            </form>
        );
    }

    function showRedirect() {
        return (
            <h4>
                You need to add a{" "}
                <Link to='/categories/new'>budget category</Link> and{" "}
                <Link to='/payment-methods/new'>payment method</Link> before you
                can add an expense.
            </h4>
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // Get info from form
        const {
            amount,
            type,
            date,
            payee,
            category,
            payment_method,
            description = "",
        } = event.target;
        const expense = {
            amount: amount.value,
            type: type.value,
            date: date.value,
            payee: payee.value,
            description: description.value,
        };
        // Only add category/payment method ID if one has been selected from list
        category.value !== "Uncategorized"
            ? (expense.category = parseInt(category.value))
            : (expense.category = null);
        payment_method.value !== "No Payment Method"
            ? (expense.payment_method = parseInt(payment_method.value))
            : (expense.payment_method = null);

        // Clear previous errors (if they exist)
        setError(null);

        try {
            // Post new expense and get response back
            const expenseInfo = await ExpenseApiService.postExpense(expense);

            // Clear form data
            amount.value = "";
            type.value = "";
            date.value = "";
            payee.value = "";
            category.value = "";
            payment_method.value = "";
            description.value = "";

            // Follow successful path
            props.onLoginSuccess(expenseInfo.path);

            // Add new expense info to expense array in state
            const newExpense = expenseInfo.expense;
            const expenses = context.expenses;
            expenses.push(newExpense);
            context.setExpenses(expenses);
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
    }

    return (
        <div>
            {context.categories[0] && context.payment_methods
                ? showForm()
                : showRedirect()}
        </div>
    );
}
