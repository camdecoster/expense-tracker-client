// React
import React from "react";

// Configuration
import "./PaymentMethodsBarChart.css";

// Components
import { HorizontalBar } from "react-chartjs-2";
import colorScale from "../Utilities/colorScale";

export default function PaymentMethodsBarChart(props) {
    // Get category info
    const { payment_methods } = props;

    // Create currency formatter
    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <section id='PaymentMethodsBarChart'>
            <HorizontalBar
                data={{
                    labels: payment_methods.map((payment_method) =>
                        payment_method.payment_method_name !== null
                            ? payment_method.payment_method_name
                            : "No Payment Method"
                    ),
                    datasets: [
                        {
                            data: payment_methods.map(
                                (payment_method) => payment_method.total
                            ),
                            backgroundColor: colorScale(
                                payment_methods.length,
                                0,
                                1
                            ),
                            borderColor: "white",
                            borderWidth: 1,
                            // label: `${dateString} Expenses`,
                        },
                    ],
                }}
                options={{
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        fontColor: "white",
                        fontSize: 15,
                        text: `Payment Method Spending`,
                    },
                    legend: {
                        // labels: {
                        //     boxWidth: 15,
                        //     fontColor: "white",
                        //     fontSize: 15,
                        // },
                        // position: "bottom",
                        // align: "start",
                        display: false,
                    },
                    tooltips: {
                        callbacks: {
                            label: (tooltipItem, data) => {
                                // Get item name
                                // const name = data.labels[tooltipItem.index];
                                // Get item total, format to currency
                                const total = currencyFormatter.format(
                                    data.datasets[tooltipItem.datasetIndex]
                                        .data[tooltipItem.index]
                                );
                                return `${total}`;
                            },
                        },
                    },
                    scales: {
                        xAxes: [
                            {
                                ticks: {
                                    fontColor: "white",
                                    callback: (value, index, values) => {
                                        return `$${value}`;
                                    },
                                },
                                gridLines: {
                                    zeroLineColor: "white",
                                    color: "white",
                                },
                            },
                        ],
                        yAxes: [
                            {
                                ticks: {
                                    fontColor: "white",
                                },
                                gridLines: {
                                    zeroLineColor: "white",
                                    display: false,
                                },
                            },
                        ],
                    },
                }}
            />
        </section>
    );
}
