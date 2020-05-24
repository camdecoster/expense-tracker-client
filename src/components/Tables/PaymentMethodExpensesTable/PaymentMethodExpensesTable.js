// React
import React, { useMemo, useState, useEffect, useContext } from "react";
// import { NavLink, withRouter } from "react-router-dom";

// Components
import SimpleTable from "../../SimpleTable/SimpleTable";

export default function PaymentMethodExpensesTable(props) {
    // Get selected date, payment method info from props
    const { dateSelected = new Date(), payment_methodTotals = [] } = props;

    // Create currency formatter
    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    // Create table data
    const data = useMemo(() => payment_methodTotals, [
        JSON.stringify(payment_methodTotals),
    ]);

    // Create column headers for payment method expenses table
    const columns = useMemo(
        () => [
            {
                Header: "Method",
                accessor: "payment_method_name", // accessor is the "key" in the data
            },
            {
                Header: "Expenses",
                accessor: (row) => currencyFormatter.format(row.total),
            },
            {
                Header: "Cycle",
                columns: [
                    {
                        Header: "Start",
                        accessor: (row) => {
                            const monthCurrent = dateSelected.getMonth() + 1;
                            if (row.cycle_type === "offset") {
                                return `${monthCurrent}/${row.cycle_start}`;
                            }
                            return `${monthCurrent}/01`;
                        },
                    },
                    {
                        Header: "End",
                        accessor: (row) => {
                            const monthCurrent = dateSelected.getMonth() + 1;
                            const monthNext = dateSelected.getMonth() + 2;
                            const lastDayOfMonthCurrent = new Date(
                                dateSelected.getFullYear(),
                                dateSelected.getMonth() + 1,
                                0
                            ).getDate();
                            if (row.cycle_type === "offset") {
                                return `${monthNext}/${row.cycle_end}`;
                            }
                            return `${monthCurrent}/${lastDayOfMonthCurrent}`;
                        },
                    },
                ],
            },
        ],
        [dateSelected]
    );

    return <SimpleTable columns={columns} data={data} />;
}
