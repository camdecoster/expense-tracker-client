// React
import React from "react";
import { Link } from "react-router-dom";

// Configuration
import "./CategoriesPage.css";
// import TrackerContext from "../../contexts/TrackerContext";
import dummyData from "../../dummyData";

// Components
import SimpleTable from "../../components/SimpleTable/SimpleTable";

function CategoriesPage() {
    const data = React.useMemo(() => dummyData.categories, []);

    const columns = React.useMemo(
        () => [
            {
                Header: "Category",
                accessor: "name",
            },
            {
                Header: "Budget",
                columns: [
                    {
                        Header: "Monthly",
                        accessor: "amount.monthly",
                    },
                    {
                        Header: "Quarterly",
                        accessor: "amount.quarterly",
                    },
                    {
                        Header: "Yearly",
                        accessor: "amount.yearly",
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
        <section className='CategoriesPage'>
            <header role='banner'>
                <h1>Budget Categories</h1>
                <Link to='/add-category'>Add new category</Link>
                <SimpleTable columns={columns} data={data} />
            </header>
        </section>
    );
}

export default CategoriesPage;
