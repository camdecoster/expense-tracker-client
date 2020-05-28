// React
import React, { useContext } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

// Configuration
import "./PaymentMethodsPage.css";
import TrackerContext from "../../../contexts/TrackerContext";

// Components
import EditPaymentMethodPage from "../EditPaymentMethodPage/EditPaymentMethodPage";
import NewPaymentMethodPage from "../NewPaymentMethodPage/NewPaymentMethodPage";
import SimpleTable from "../../../components/SimpleTable/SimpleTable";

export default function PaymentMethodsPage() {
    // Access context
    const context = useContext(TrackerContext);

    // Get path info from Route
    const { path, url } = useRouteMatch();

    const data = React.useMemo(() => context.payment_methods, []);

    const columns = React.useMemo(
        () => [
            {
                Header: "Method",
                accessor: (row) => {
                    return (
                        <Link to={`${url}/${row.id}`}>
                            {row.payment_method_name}
                        </Link>
                    );
                },
            },
            {
                Header: "Cycle",
                columns: [
                    {
                        Header: "Type",
                        accessor: (row) =>
                            `${
                                row.cycle_type.slice(0, 1).toUpperCase() +
                                row.cycle_type.slice(1)
                            }`,
                    },
                    // Show '-' instead of 0 if no cycle start/end set
                    {
                        id: "startDay",
                        Header: "Start Day",
                        accessor: (row) =>
                            row.cycle_start !== 0 ? row.cycle_start : "-",
                    },
                    {
                        id: "endDay",
                        Header: "End Day",
                        accessor: (row) =>
                            row.cycle_end !== 0 ? row.cycle_end : "-",
                    },
                ],
            },
            {
                Header: "Description",
                accessor: "description",
            },
        ],
        []
    );

    return (
        <section id='PaymentMethodsPage' className='route_page'>
            <Switch>
                <Route path={`${path}/new`}>
                    <NewPaymentMethodPage />
                </Route>
                <Route path={`${path}/:payment_methodId`}>
                    <EditPaymentMethodPage />
                </Route>
                <Route path={path}>
                    <div>
                        <header role='banner'>
                            <h1>Payment Methods</h1>
                        </header>
                        <Link to={`${url}/new`}>Add new payment method</Link>
                        {context.payment_methods[0] ? (
                            <SimpleTable columns={columns} data={data} />
                        ) : (
                            <div>
                                After you add some payment methods, they'll
                                appear on this page.
                            </div>
                        )}
                    </div>
                </Route>
            </Switch>
        </section>
    );
}
