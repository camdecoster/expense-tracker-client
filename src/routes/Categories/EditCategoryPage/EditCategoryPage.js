// React
import React, { useContext } from "react";
import {
    Link,
    // Route,
    // Switch,
    useRouteMatch,
    useHistory,
    useParams,
} from "react-router-dom";

// Configuration
import "./EditCategoryPage.css";
import TrackerContext from "../../../contexts/TrackerContext";
// import CategoryApiService from "../../../services/category-api-service";

// Components
// import SimpleTable from "../../../components/SimpleTable/SimpleTable";
import EditCategoryForm from "../../../components/Categories/EditCategoryForm/EditCategoryForm";

// Put this is in component file, but build here for now
// Use to display single category with link to edit the category
function EditCategoryPage() {
    // Access context
    const context = useContext(TrackerContext);

    // Access history
    const history = useHistory();

    // Get path info from Route
    const { path, url } = useRouteMatch();

    // Get category ID from path parameter
    const { categoryId } = useParams();

    function handleFormCancel() {
        history.push("/categories");
    }

    function handleFormSuccess() {
        // Route user to new category
        history.push(url);
    }

    return (
        <section id='CategoryPage'>
            <header role='banner'>
                <h1>Edit Category </h1>
            </header>
            <Link to='/categories'>Back to all categories</Link>
            <EditCategoryForm
                id={categoryId}
                onCancel={handleFormCancel}
                onLoginSuccess={handleFormSuccess}
            />
        </section>
    );
}

export default EditCategoryPage;
