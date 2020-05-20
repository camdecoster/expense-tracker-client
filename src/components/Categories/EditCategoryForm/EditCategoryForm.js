// React
import React, { useContext, useParams, useState } from "react";
// import { useRouteMatch } from "react-router-dom";

// Configuration
import "./EditCategoryForm.css";
import TrackerContext from "../../../contexts/TrackerContext";
import CategoryApiService from "../../../services/category-api-service";

// Components
import ErrorMessage from "../../Utilities/ErrorMessage/ErrorMessage";

export default function EditCategoryForm(props) {
    // Access context
    const context = useContext(TrackerContext);

    // Get category ID from props
    const { id } = props;

    // Get category with given ID
    // If ID doesn't exist, use empty object
    const category =
        context.categories.filter(
            (category) => category.id === parseInt(id)
        )[0] || {};

    // Access history
    // const history = useHistory();

    // Initialize state
    const [error, setError] = useState(null);
    const [allowEdit, setAllowEdit] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();

        // Get info from form
        const { category_name, type, amount, description = "" } = event.target;
        const updatedCategory = {
            id: parseInt(id),
            category_name: category_name.value,
            type: type.value,
            amount: amount.value,
            description: description.value,
        };

        // Clear previous errors (if they exist)
        setError(null);

        try {
            const res = await CategoryApiService.updateCategory(
                updatedCategory
            );

            // Clear form data
            // category_name.value = "";
            // type.value = "monthly";
            // amount.value = "";
            // description.value = "";

            // Disable category edit
            setAllowEdit(false);

            // Update category info in category array in state
            const categories = context.categories;

            // Get index of category in state
            const index = categories.findIndex(
                (category) => category.id === updatedCategory.id
            );
            // console.log(...categories, categories[index]);

            // Replace old category with updated category
            categories.splice(index, 1, updatedCategory);
            context.setCategories(categories);

            // Follow successful path
            props.onLoginSuccess(updatedCategory.id);
        } catch (newError) {
            setError(newError.message);
        }
    }

    // function handleCancel() {
    //     props.onCancel();
    // }

    return (
        <form id='EditCategoryForm' onSubmit={(event) => handleSubmit(event)}>
            <div>
                {/* <!-- Add logic to check if name already exists --> */}
                <label htmlFor='category_name'>Name</label>
                <input
                    type='text'
                    name='category_name'
                    id='category_name'
                    defaultValue={category.category_name || ""}
                    disabled={!allowEdit}
                    required
                />
            </div>
            <div>
                <label htmlFor='type'>Budget Type</label>
                <select
                    name='type'
                    id='type'
                    defaultValue={category.type}
                    disabled={!allowEdit}
                >
                    <option value='monthly'>Monthly</option>
                    <option value='quarterly'>Quarterly</option>
                    <option value='annual'>Annual</option>
                </select>
            </div>
            <div>
                <label htmlFor='amount'>Budget Amount</label>
                <input
                    type='number'
                    name='amount'
                    id='amount'
                    min='0'
                    step='0.01'
                    defaultValue={category.amount || ""}
                    disabled={!allowEdit}
                    required
                />
            </div>
            {/* <!-- <div>
                        <label for="rolling">Is this a rolling budget?</label>
                        Include mouseover explanation for what a rolling budget is
                        <input type="checkbox" name="rolling" id="rolling" />
                    </div> --> */}
            <div>
                <label htmlFor='description'>Description (Optional)</label>
                <input
                    type='text'
                    name='description'
                    id='description'
                    defaultValue={category.description || ""}
                    disabled={!allowEdit}
                />
            </div>
            {allowEdit || (
                <button type='button' onClick={() => setAllowEdit(!allowEdit)}>
                    Edit
                </button>
            )}
            {!allowEdit || <button type='submit'>Update Category</button>}
            {!allowEdit || (
                <button type='button' onClick={() => setAllowEdit(!allowEdit)}>
                    Cancel
                </button>
            )}
            {error ? <ErrorMessage message={error} /> : ""}
        </form>
    );
}
