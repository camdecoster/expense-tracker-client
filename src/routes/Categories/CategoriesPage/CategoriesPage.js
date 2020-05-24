// React
import React, { useContext } from "react";
import {
    Link,
    Route,
    Switch,
    useRouteMatch,
    // useParams,
} from "react-router-dom";

// Configuration
import "./CategoriesPage.css";
import TrackerContext from "../../../contexts/TrackerContext";
// import CategoryApiService from "../../services/category-api-service";

// Components
import EditCategoryPage from "../EditCategoryPage/EditCategoryPage";
import NewCategoryPage from "../NewCategoryPage/NewCategoryPage";
import SimpleTable from "../../../components/SimpleTable/SimpleTable";

export default function CategoriesPage() {
    // Set state values
    // const [error, setError] = useState(null);

    // Access context
    const context = useContext(TrackerContext);

    // Get path info from Route
    const { path, url } = useRouteMatch();

    // Create currency formatter
    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const data = React.useMemo(() => context.categories, []);

    const columns = React.useMemo(
        () => [
            {
                Header: "Category",
                accessor: (row) => {
                    return (
                        <Link to={`${url}/${row.id}`}>{row.category_name}</Link>
                    );
                },
            },
            {
                Header: "Budget",
                columns: [
                    // Only show budget amount if category is that type
                    {
                        id: "budgetMonthly",
                        Header: "Monthly",
                        accessor: (row) =>
                            row.type === "monthly"
                                ? currencyFormatter.format(row.amount)
                                : "-",
                    },
                    {
                        id: "budgetQuarterly",
                        Header: "Quarterly",
                        accessor: (row) =>
                            row.type === "quarterly"
                                ? currencyFormatter.format(row.amount)
                                : "-",
                    },
                    {
                        id: "budgetYearly",
                        Header: "Yearly",
                        accessor: (row) =>
                            row.type === "yearly"
                                ? currencyFormatter.format(row.amount)
                                : "-",
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
        <section id='CategoriesPage' className='route_page'>
            <Switch>
                <Route path={`${path}/new`}>
                    <NewCategoryPage />
                </Route>
                <Route path={`${path}/:categoryId`}>
                    <EditCategoryPage />
                </Route>
                <Route path={path}>
                    <div>
                        <header role='banner'>
                            <h1>Budget Categories</h1>
                        </header>
                        <Link to={`${url}/new`}>Add new category</Link>
                        <SimpleTable columns={columns} data={data} />
                    </div>
                </Route>
            </Switch>
        </section>
    );
}
