// React
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

// Configuration
import "./ExpenseLogPage.css";
import TrackerContext from "../../contexts/TrackerContext";
import dummyData from "../../dummyData";

// Components
import SimpleTable from "../../components/SimpleTable/SimpleTable";

function ExpenseLogPage() {
    const data = React.useMemo(() => dummyData.expenses, []);

    const columns = React.useMemo(
        () => [
            {
                Header: "Date",
                accessor: "date", // accessor is the "key" in the data
            },
            {
                Header: "Type",
                accessor: "type",
            },
            {
                Header: "Amount",
                accessor: "amount",
            },
            {
                Header: "Payee",
                accessor: "payee",
            },
            {
                Header: "Category",
                accessor: "category",
            },
            {
                Header: "Payment Method",
                accessor: "method",
            },
            {
                Header: "Description",
                accessor: "description",
            },
        ],
        []
    );

    return (
        <section className='ExpenseLogPage'>
            <header role='banner'>
                <h1>Expense Log</h1>
                <SimpleTable columns={columns} data={data} />
            </header>
        </section>
    );
}

export default ExpenseLogPage;
