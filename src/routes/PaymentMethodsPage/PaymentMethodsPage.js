// React
import React from "react";
import { Link } from "react-router-dom";

// Configuration
import "./PaymentMethodsPage.css";
// import TrackerContext from "../../contexts/TrackerContext";
import dummyData from "../../dummyData";

// Components
import SimpleTable from "../../components/SimpleTable/SimpleTable";

function PaymentMethodsPage() {
    const data = React.useMemo(() => dummyData.methods, []);

    const columns = React.useMemo(
        () => [
            {
                Header: "Payment Method",
                accessor: "name",
            },
            {
                Header: "Cycle",
                accessor: "cycleType",
            },
            {
                Header: "Start Day",
                accessor: "cycleStart",
            },
            {
                Header: "End Day",
                accessor: "cycleEnd",
            },
            {
                Header: "Description",
                accessor: "description",
            },
        ],
        []
    );

    return (
        <section className='PaymentMethodsPage'>
            <header role='banner'>
                <h1>Payment Methods</h1>
                <Link to='/add-payment-method'>Add new payment method</Link>
                <SimpleTable columns={columns} data={data} />
            </header>
        </section>
    );
}

export default PaymentMethodsPage;
