// React
import React, { useState, useEffect, useContext } from "react";
// import { NavLink, withRouter } from "react-router-dom";

// Configuration
import "./DashboardPage.css";
import TrackerContext from "../../contexts/TrackerContext";
import dummyData from "../../dummyData";

// Components
import SimpleTable from "../../components/SimpleTable/SimpleTable";

// Get spending data from expenses
// Return dummy data for now
function getExpenseData(spendingInterval, data) {
    const { month, quarter, year } = dummyData;

    switch (spendingInterval) {
        case "month":
            return month[data];
        // break;
        case "quarter":
            return quarter[data];
        // break;
        case "year":
            return year[data];
        // break;
        default:
            throw new Error(
                "Wrong interval given. Interval must be month, quarter, or year."
            );
    }
}

// Make first letter of string uppercase
function firstLetterUppercase(stringToChange) {
    if (typeof stringToChange !== "string") return "";
    return stringToChange.charAt(0).toUpperCase() + stringToChange.slice(1);
}

// Create link to change interval
// function IntervalChangeLink(props) {
//     return (
//         <a
//             className={
//                 props.spendingInterval === props.interval
//                     ? "interval intervalActive"
//                     : "interval"
//             }
//             onClick={() => props.setSpendingInterval(props.interval)}
//         >
//             {firstLetterUppercase(props.interval) + "ly"}
//         </a>
//     );
// }

function DashboardPage() {
    // Access context
    const context = useContext(TrackerContext);

    // Initialize state
    const [dateSelected, setDateSelected] = useState(
        new Date(context.dateCurrent)
    );
    const [dateString, setDateString] = useState(
        `${dateSelected.toLocaleString("default", {
            month: "long",
        })} ${dateSelected.getFullYear()}`
    );
    const [spendingInterval, setSpendingInterval] = useState("month");
    const [spendingData, setSpendingData] = useState(
        React.useMemo(() => getExpenseData("month", "spendingData"), [])
    );
    const [paymentMethodData, setPaymentMethodData] = useState(
        React.useMemo(() => getExpenseData("month", "paymentMethodData"), [])
    );

    // Create link to change interval
    const createIntervalChangeButton = (interval) => {
        return (
            <button
                className={
                    spendingInterval === interval
                        ? "interval intervalActive"
                        : "interval"
                }
                onClick={() => setSpendingInterval(interval)}
            >
                {firstLetterUppercase(interval) + "ly"}
            </button>
        );
    };

    // Update items after state change
    useEffect(() => {
        // Update tables
        setSpendingData(getExpenseData(spendingInterval, "spendingData"));
        setPaymentMethodData(
            getExpenseData(spendingInterval, "paymentMethodData")
        );

        // Update date string
        setDateString(
            `${dateSelected.toLocaleString("default", {
                month: "long",
            })} ${dateSelected.getFullYear()}`
        );
    });

    // Create column headers for spending table
    const spendingColumns = React.useMemo(
        () => [
            {
                Header: "Category",
                accessor: "category", // accessor is the "key" in the data
            },
            {
                Header: "Expenses",
                accessor: "expenses",
            },
            {
                Header: "Budget",
                accessor: "budget",
            },
            {
                Header: "Remain",
                accessor: "remain",
            },
        ],
        []
    );

    // Create column headers for payment methods table
    const paymentMethodColumns = React.useMemo(
        () => [
            {
                Header: "Method",
                accessor: "paymentMethod", // accessor is the "key" in the data
            },
            {
                Header: "Expenses",
                accessor: "expenses",
            },
            {
                Header: "Cycle",
                accessor: "cycle",
                Cell: ({ cell: { value } }) => (
                    <div className='left_align'>{value}</div>
                ),
            },
        ],
        []
    );

    return (
        <section id='DashboardPage'>
            <header role='banner'>
                <h2>Expenses Dashboard</h2>
            </header>
            <section>
                <div className='intervalSelector'>
                    {createIntervalChangeButton("month")}
                    {createIntervalChangeButton("quarter")}
                    {createIntervalChangeButton("year")}
                </div>
                <select
                    name='display-month'
                    id='display-month'
                    onChange={(ev) => {
                        const tempDate = new Date(context.dateCurrent);
                        tempDate.setMonth(
                            tempDate.getMonth() - parseInt(ev.target.value)
                        );
                        setDateSelected(new Date(tempDate));
                    }}
                >
                    <option value='0'>Current Month</option>
                    <option value='1'>Previous Month</option>
                    <option value='2'>2 Months Ago</option>
                    <option value='3'>3 Months Ago</option>
                    <option value='4'>4 Months Ago</option>
                    <option value='5'>5 Months Ago</option>
                    <option value='6'>6 Months Ago</option>
                </select>
                <p>{dateString}</p>
            </section>
            <section>
                <h3>
                    {firstLetterUppercase(spendingInterval) + "ly"} Spending
                </h3>

                <SimpleTable columns={spendingColumns} data={spendingData} />
            </section>
            <section>
                <h3>Payment Methods</h3>
                <SimpleTable
                    columns={paymentMethodColumns}
                    data={paymentMethodData}
                />
            </section>
            <section>
                <p>
                    [
                    <em>Placeholder for pie chart showing monthly expenses </em>
                    ]
                </p>
            </section>
        </section>
    );
}

export default DashboardPage;
