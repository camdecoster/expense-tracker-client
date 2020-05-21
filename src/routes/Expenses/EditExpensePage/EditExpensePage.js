// React
import React, { useContext } from "react";
import { Link, useRouteMatch, useHistory, useParams } from "react-router-dom";

// Configuration
import "./EditExpensePage.css";
import TrackerContext from "../../../contexts/TrackerContext";

// Components
import EditExpenseForm from "../../../components/Expenses/EditExpenseForm/EditExpenseForm";

// Show form to edit expense
export default function EditExpensePage() {
    // Access context
    const context = useContext(TrackerContext);

    // Access history
    const history = useHistory();

    // Get path info from Route
    const { path, url } = useRouteMatch();

    // Get element ID from path parameter
    const { expenseId } = useParams();

    function handleFormCancel() {
        history.push("/expenses");
    }

    function handleFormSuccess() {
        // Route user to new element
        history.push(url);
    }

    return (
        <section id='EditExpensePage'>
            <header role='banner'>
                <h1>Edit Expense</h1>
            </header>
            <Link to='/expenses'>Back to all expenses</Link>
            <EditExpenseForm
                id={expenseId}
                onCancel={handleFormCancel}
                onLoginSuccess={handleFormSuccess}
            />
        </section>
    );
}
