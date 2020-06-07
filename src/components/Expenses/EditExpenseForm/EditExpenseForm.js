// React
import React, { useContext, useState, useEffect } from "react";

// Configuration
import "./EditExpenseForm.css";
import TrackerContext from "../../../contexts/TrackerContext";
import ExpenseApiService from "../../../services/expense-api-service";

// Components
import ErrorMessage from "../../Utilities/ErrorMessage/ErrorMessage";

export default function EditExpenseForm(props) {
    // Access context
    const context = useContext(TrackerContext);

    // Initialize state
    const [error, setError] = useState(null);
    const [allowEdit, setAllowEdit] = useState(false);
    const [expense, setExpense] = useState({});
    const [defaultCategory, setDefaultCategory] = useState(null);
    const [allowDelete, setAllowDelete] = useState(false);

    // Get category ID from props
    const id = parseInt(props.id);

    // Get expense from API, store in context
    useEffect(() => {
        ExpenseApiService.getExpense(id).then((expense) => setExpense(expense));
    }, [JSON.stringify(expense)]);

    // useEffect(() => {
    //     const foundCategory = context.categories.find(
    //         (category) => category.id === expense.category
    //     );
    //     setDefaultCategory(foundCategory ? foundCategory["category_name"] : "");
    // }, [JSON.stringify(defaultCategory), JSON.stringify(expense)]);

    // console.log(
    //     "Category is:",
    //     context.categories.find((category) => category.id === expense.category)
    //         .category_name
    // );

    // Create options for category select
    const categoryOptions = context.categories.map((category) => (
        <option
            key={category.id}
            value={category.id}
            selected={category.id === expense.category}
        >
            {category.category_name}
        </option>
    ));
    categoryOptions.unshift(
        <option
            key={0}
            value={"Uncategorized"}
            selected={expense.category === null}
        >
            {"Uncategorized"}
        </option>
    );

    // const CategorySelect = (props) => {
    //     const { defaultValue } = props;
    //     const options = context.categories.map((category) => (
    //         <option
    //             key={category.id}
    //             value={category.id}
    //             // selected={category.id === expense.category}
    //         >
    //             {category.category_name}
    //         </option>
    //     ));

    //     if (defaultValue) {
    //         console.log(defaultValue);
    //         return (
    //             <div>
    //                 <label htmlFor='category'>Category</label>
    //                 <select
    //                     name='category'
    //                     id='category'
    //                     defaultValue={defaultValue}
    //                     // defaultValue='Home'
    //                     disabled={!allowEdit}
    //                     required
    //                 >
    //                     {options}
    //                 </select>
    //             </div>
    //         );
    //     } else {
    //         return <div></div>;
    //     }
    // };

    // Create options for payment method select
    const payment_methodOptions = context.payment_methods.map(
        (payment_method) => (
            <option
                key={payment_method.id}
                value={payment_method.id}
                selected={payment_method.id === expense.payment_method}
            >
                {payment_method.payment_method_name}
            </option>
        )
    );
    payment_methodOptions.unshift(
        <option
            key={0}
            value={"No Payment Method"}
            selected={expense.payment_method === null}
        >
            {"No Payment Method"}
        </option>
    );

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
        const updatedExpense = {
            id: id,
            amount: amount.value,
            type: type.value,
            date: date.value,
            payee: payee.value,
            description: description.value,
        };

        // Only add category/payment method ID if one has been selected from list
        category.value !== "Uncategorized"
            ? (updatedExpense.category = parseInt(category.value))
            : (updatedExpense.category = null);
        payment_method.value !== "No Payment Method"
            ? (updatedExpense.payment_method = parseInt(payment_method.value))
            : (updatedExpense.payment_method = null);

        // Clear previous errors (if they exist)
        setError(null);

        try {
            const res = await ExpenseApiService.updateExpense(updatedExpense);

            // Disable expense edit, don't show confirm delete button
            setAllowEdit(false);
            setAllowDelete(false);

            // Update expense info in expense array in state
            const expenses = context.expenses;

            // Get index of expense in state
            const index = expenses.findIndex(
                (expenses) => expenses.id === updatedExpense.id
            );

            // Replace old expense with updated expense, do this last so App state
            // update doesn't call this page again
            expenses.splice(index, 1, updatedExpense);
            context.setExpenses(expenses);

            // Follow successful path
            props.onUpdateSuccess();
        } catch (newError) {
            setError(newError.message);
        }
    }

    async function handleDelete(event) {
        // Clear previous errors (if they exist)
        setError(null);

        try {
            const res = await ExpenseApiService.deleteExpense(id);

            // Disable expense edit, don't show confirm delete button
            setAllowEdit(false);
            setAllowDelete(false);

            // Update expense info in expense array in state
            const expenses = context.expenses;

            // Get index of expense in state
            const index = expenses.findIndex((expense) => expense.id === id);

            // Follow successful path
            props.onDeleteSuccess();

            // Delete expense from state, do this last so App state update doesn't
            // call this page again
            const newExpenses = expenses
                .slice(0, index)
                .concat(expenses.slice(index + 1));
            context.setExpenses(newExpenses);
        } catch (newError) {
            setError(newError.message);
        }
    }

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
                    defaultValue={expense.amount || ""}
                    disabled={!allowEdit}
                    required
                />
            </div>
            <div>
                <label htmlFor='type'>Type</label>
                <select
                    name='type'
                    id='type'
                    defaultValue={expense.type || ""}
                    disabled={!allowEdit}
                    required
                >
                    <option
                        value='expense'
                        selected={(expense.type = "expense")}
                    >
                        Expense
                    </option>
                    <option value='credit' selected={(expense.type = "credit")}>
                        Credit
                    </option>
                </select>
            </div>
            <div>
                <label htmlFor='date'>Date</label>
                <input
                    type='date'
                    id='date'
                    name='date'
                    defaultValue={
                        expense.date ? expense.date.split("T")[0] : ""
                    }
                    // onChange={(event) => console.log(event.target.value)}
                    disabled={!allowEdit}
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
                    defaultValue={expense.payee ? expense.payee : ""}
                    disabled={!allowEdit}
                    required
                />
            </div>
            <div>
                <label htmlFor='category'>Category</label>
                <select
                    name='category'
                    id='category'
                    // defaultValue={defaultCategory}
                    disabled={!allowEdit}
                    required
                >
                    {categoryOptions}
                </select>
            </div>
            {/* <CategorySelect defaultValue={defaultCategory} /> */}
            <div>
                <label htmlFor='payment_method'>Payment Method</label>
                <select
                    name='payment_method'
                    id='payment_method'
                    // defaultValue={expense.payment_method || ""}
                    disabled={!allowEdit}
                    required
                >
                    {payment_methodOptions}
                </select>
            </div>
            <div>
                <label htmlFor='description'>Description (Optional)</label>
                <textarea
                    name='description'
                    id='description'
                    wrap='soft'
                    defaultValue={expense.description || ""}
                    disabled={!allowEdit}
                />
            </div>
            {allowEdit || (
                <button type='button' onClick={() => setAllowEdit(true)}>
                    Edit
                </button>
            )}
            {!allowEdit || <button type='submit'>Update Expense</button>}
            {!allowEdit || (
                <button
                    type='button'
                    onClick={() => {
                        setAllowEdit(false);
                        setAllowDelete(false);
                    }}
                >
                    Cancel
                </button>
            )}
            {!allowDelete ? (
                <button type='button' onClick={() => setAllowDelete(true)}>
                    Delete
                </button>
            ) : (
                ""
            )}
            {allowDelete ? (
                <button type='button' onClick={(event) => handleDelete(event)}>
                    Confirm Deletion
                </button>
            ) : (
                ""
            )}
            <button type='button' onClick={() => props.onCancel()}>
                Go Back
            </button>
            {error ? <ErrorMessage message={error} /> : ""}
        </form>
    );
}
