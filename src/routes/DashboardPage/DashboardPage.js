// React
import React, { useState, useEffect, useContext } from "react";

// Configuration
import "./DashboardPage.css";
import TrackerContext from "../../contexts/TrackerContext";

// Components
import CategoryExpensesTable from "../../components/Tables/CategoryExpensesTable/CategoryExpensesTable";
import PaymentMethodExpensesTable from "../../components/Tables/PaymentMethodExpensesTable/PaymentMethodExpensesTable";
import CategoriesBarChart from "../../components/Charts/CategoriesBarChart/CategoriesBarChart";
import PaymentMethodsBarChart from "../../components/Charts/PaymentMethodsBarChart/PaymentMethodsBarChart";

// Make first letter of string uppercase
function firstLetterUppercase(stringToChange) {
    if (typeof stringToChange !== "string") return "";
    return stringToChange.charAt(0).toUpperCase() + stringToChange.slice(1);
}

export default function DashboardPage() {
    // Access context
    const context = useContext(TrackerContext);
    const { dateCurrent = new Date() } = context;

    // Initialize state
    const [dateSelected, setDateSelected] = useState(new Date(dateCurrent));
    const [dateString, setDateString] = useState(
        `${dateSelected.toLocaleString("default", {
            month: "long",
        })} ${dateSelected.getFullYear()}`
    );
    const [spendingInterval, setSpendingInterval] = useState("month");

    const [categoryTotals, setCategoryTotals] = useState([]);
    const [payment_methodTotals, setPayment_methodTotals] = useState([]);

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

    // Get categories, payment methods, expenses from context
    const { categories, payment_methods, expenses } = context;

    // Get totals of expenses in each category, payment method
    useEffect(() => {
        // Make sure info has been received from API
        if (categories[0] && payment_methods[0] && expenses[0]) {
            // Add total item to each category
            const categoryTotals = categories.map((category) => {
                return {
                    ...category,
                    total: 0,
                };
            });
            // Add total item to each payment method
            const payment_methodTotals = payment_methods.map(
                (payment_method) => {
                    return {
                        ...payment_method,
                        total: 0,
                    };
                }
            );

            expenses.forEach((expense) => {
                // Add up expense info for the selected period of time
                // Just use monthly for now

                if (spendingInterval === "month") {
                    const dateExpense = new Date(expense.date);

                    // Check if expense should be added to category total
                    categoryTotals.forEach((category) => {
                        if (
                            expense.category === category.id &&
                            dateExpense.getMonth() === dateSelected.getMonth()
                        )
                            category.total += parseFloat(expense.amount);
                    });
                    // Check if expense should be added to payment method total
                    payment_methodTotals.forEach((payment_method) => {
                        // Is this payment method linked to this expense?
                        if (expense.payment_method === payment_method.id) {
                            // console.log("Expense at", expense.payee);
                            // console.log(payment_method.payment_method_name);

                            // Check if payment method uses offset cycle
                            if (payment_method.cycle_type === "offset") {
                                // console.log("Uses offset cycle");
                                let cycleStartDate = new Date(dateSelected);
                                let cycleEndDate = new Date(dateSelected);
                                // Check if month cycle starts in current month
                                if (
                                    dateSelected.getDate() >=
                                    payment_method.cycle_start
                                ) {
                                    // DON'T FORGET TO CHECK FOR DAY FALLING OUTSIDE OF MONTH (like day 31 in February)
                                    // Get cycle start date and end date, see if expense date is in that range

                                    cycleStartDate.setDate(
                                        payment_method.cycle_start
                                    );

                                    cycleEndDate.setMonth(
                                        dateSelected.getMonth() + 1
                                    );
                                    cycleEndDate.setDate(
                                        payment_method.cycle_end
                                    );
                                }
                                // Else month cycle starts in last month
                                else {
                                    // DON'T FORGET TO CHECK FOR DAY FALLING OUTSIDE OF MONTH (like day 31 in February)
                                    // Get cycle start date and end date, see if expense date is in that range
                                    // let cycleStartDate = new Date(dateSelected);
                                    cycleStartDate.setMonth(
                                        dateSelected.getMonth() - 1
                                    );
                                    cycleStartDate.setDate(
                                        payment_method.cycle_start
                                    );

                                    cycleEndDate.setDate(
                                        payment_method.cycle_end
                                    );
                                }
                                // If expense falls in cycle range, add total
                                if (
                                    dateExpense >= cycleStartDate &&
                                    dateExpense <= cycleEndDate
                                ) {
                                    // console.log(
                                    //     "Cycle start date is",
                                    //     cycleStartDate
                                    // );
                                    // console.log(
                                    //     "Cycle end date is",
                                    //     cycleEndDate
                                    // );
                                    payment_method.total += parseFloat(
                                        expense.amount
                                    );
                                }
                            }
                            // If not offset, then it should be monthly
                            // Add all expenses that are from current month
                            else if (
                                dateExpense.getMonth() ===
                                dateSelected.getMonth()
                            ) {
                                // console.log("Uses monthly cycle");
                                payment_method.total += parseFloat(
                                    expense.amount
                                );
                            }
                        }
                    });
                }
            });

            setCategoryTotals(categoryTotals);
            setPayment_methodTotals(payment_methodTotals);
            // console.log("Checked expenses");
        }
    }, [
        JSON.stringify(categories),
        JSON.stringify(payment_methods),
        JSON.stringify(expenses),
        dateSelected,
    ]);

    // Update date string after selection changes
    useEffect(() => {
        setDateString(
            `${dateSelected.toLocaleString("default", {
                month: "long",
            })} ${dateSelected.getFullYear()}`
        );
    }, [dateSelected]);

    return (
        <section id='DashboardPage' className='route_page'>
            <header role='banner'>
                <h2>Expenses Dashboard</h2>
            </header>
            <section>
                {/* <div className='intervalSelector'>
                    {createIntervalChangeButton("month")}
                    {createIntervalChangeButton("quarter")}
                    {createIntervalChangeButton("year")}
                </div> */}
                <select
                    name='display-month'
                    id='display-month'
                    onChange={(ev) => {
                        const tempDate = new Date(dateCurrent);
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
                {categoryTotals[0] ? (
                    <CategoryExpensesTable categoryTotals={categoryTotals} />
                ) : (
                    "Add some categories to track your progress"
                )}
            </section>
            <CategoriesBarChart date={dateString} categories={categoryTotals} />
            <section>
                <h3>Payment Methods</h3>
                {payment_methodTotals[0] ? (
                    <PaymentMethodExpensesTable
                        dateSelected={dateSelected}
                        payment_methodTotals={payment_methodTotals}
                    />
                ) : (
                    "Add some payment methods to track your progress"
                )}
            </section>
            <PaymentMethodsBarChart
                date={dateString}
                payment_methods={payment_methodTotals}
            />
        </section>
    );
}
