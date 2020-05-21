// React
import React, { useContext } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

// Configuration
import "./ExpensesPage.css";
import TrackerContext from "../../../contexts/TrackerContext";
import dummyData from "../../../dummyData";

// Components
import EditExpensePage from "../EditExpensePage/EditExpensePage";
import NewExpensePage from "../NewExpensePage/NewExpensePage";
import SimpleTable from "../../../components/SimpleTable/SimpleTable";

export default function ExpensesPage() {
    // Access context
    const context = useContext(TrackerContext);

    // Get path info from Route
    const { path, url } = useRouteMatch();

    // Create currency formatter
    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const data = React.useMemo(() => context.expenses, []);

    const columns = React.useMemo(
        () => [
            {
                Header: "Amount",
                accessor: (row) =>
                    row.type === "expense" ? (
                        <Link to={`${url}/${row.id}`}>
                            {currencyFormatter.format(row.amount)}
                        </Link>
                    ) : (
                        <Link to={`${url}/${row.id}`}>
                            {currencyFormatter.format(row.amount * -1)}
                        </Link>
                    ),
            },
            {
                Header: "Date",
                accessor: (row) => new Date(row.date).toLocaleString(), // Change this to short form of date
            },
            {
                Header: "Payee",
                accessor: "payee",
            },
            {
                Header: "Category",
                accessor: (row) => {
                    // Get category name from ID taken from expense
                    const category = context.categories.filter(
                        (category) => category.id == row.category
                    )[0];
                    return category.category_name;
                }, // Make link that filters table to just this category
            },
            {
                Header: "Payment Method",
                accessor: (row) => {
                    // Get payment method name from ID taken from expense
                    const payment_method = context.payment_methods.filter(
                        (payment_method) =>
                            payment_method.id == row.payment_method
                    )[0];
                    return payment_method.payment_method_name;
                }, // Make link that filters table to just this method
            },
            {
                Header: "Description",
                accessor: "description",
            },
        ],
        []
    );

    return (
        <section id='ExpensesPage' className='route_page'>
            <Switch>
                <Route path={`${path}/new`}>
                    <NewExpensePage />
                </Route>
                <Route path={`${path}/:expenseId`}>
                    <EditExpensePage />
                </Route>
                <Route path={path}>
                    <div>
                        <header role='banner'>
                            <h1>Expense Log</h1>
                        </header>
                        <Link to={`${url}/new`}>Add new expense</Link>
                        <SimpleTable columns={columns} data={data} />
                    </div>
                </Route>
            </Switch>
        </section>
    );
}
