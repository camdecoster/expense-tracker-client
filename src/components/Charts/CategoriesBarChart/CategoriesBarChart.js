// React
import React from "react";

// Configuration
import "./CategoriesBarChart.css";

// Components
import { HorizontalBar } from "react-chartjs-2";
import colorScale from "../Utilities/colorScale";

export default function CategoriesBarChart(props) {
    // Get category info
    const { categories, date } = props;

    // Create currency formatter
    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    return (
        <section id='CategoriesBarChart'>
            <HorizontalBar
                data={{
                    labels: categories.map(
                        (category) => category.category_name
                    ),
                    datasets: [
                        {
                            label: "Expenses",
                            data: categories.map((category) => category.total),
                            backgroundColor: colorScale(
                                categories.length,
                                0,
                                1
                            ),
                            borderColor: "white",
                            borderWidth: 1,
                            categoryPercentage: 0.6,
                        },
                        {
                            label: "Budget",
                            data: categories.map((category) => category.amount),
                            borderColor: "white",
                            borderWidth: 1,
                            backgroundColor: "gray",
                        },
                    ],
                }}
                options={{
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        fontColor: "white",
                        fontSize: 15,
                        text: `Category Spending`,
                    },
                    legend: {
                        labels: {
                            boxWidth: 15,
                            fontColor: "white",
                            fontSize: 15,
                        },
                        position: "bottom",
                        // align: "start",
                        // display: false,
                    },
                    tooltips: {
                        callbacks: {
                            label: (tooltipItem, data) => {
                                // Get item name
                                // const name = data.labels[tooltipItem.index];

                                // Get dataset name
                                const name =
                                    data.datasets[tooltipItem.datasetIndex]
                                        .label;
                                // Get item total, format to currency
                                const total = currencyFormatter.format(
                                    data.datasets[tooltipItem.datasetIndex]
                                        .data[tooltipItem.index]
                                );
                                return `${name}: ${total}`;
                            },
                        },
                    },
                    scales: {
                        xAxes: [
                            {
                                // stacked: true,
                                ticks: {
                                    beginAtZero: true,
                                    fontColor: "white",
                                    callback: (value, index, values) => {
                                        return `$${value}`;
                                    },
                                },
                                gridLines: {
                                    color: "white",
                                },
                            },
                        ],
                        yAxes: [
                            {
                                stacked: true,
                                ticks: {
                                    fontColor: "white",
                                },
                                gridLines: {
                                    display: false,
                                },
                            },
                        ],
                    },
                }}
                // height={categories.length * 30 + 100}
            />
        </section>
    );
}
