// React
import React, { useMemo, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// Components
import SimpleTable from "../../SimpleTable/SimpleTable";

export default function CategoryExpensesTable(props) {
    // Get selected date from props
    const { categoryTotals = [] } = props;

    // Create currency formatter
    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    // Create table data
    const data = useMemo(() => categoryTotals, [
        JSON.stringify(categoryTotals),
    ]);

    // Create column headers for category expenses table
    const columns = useMemo(
        () => [
            {
                Header: "Category",
                // accessor: "category_name", // accessor is the "key" in the data
                accessor: (row) => (
                    <Link to={`/categories/${row.id}`}>
                        {row.category_name}
                    </Link>
                ),
            },
            {
                Header: "Expenses",
                accessor: (row) => currencyFormatter.format(row.total),
            },
            {
                Header: "Budget",
                accessor: (row) => currencyFormatter.format(row.amount),
            },
            {
                Header: "Remain",
                accessor: (row) =>
                    currencyFormatter.format(row.amount - row.total),
            },
        ],
        []
    );

    return <SimpleTable columns={columns} data={data} />;
}
