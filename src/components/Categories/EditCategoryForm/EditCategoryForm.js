// React
import React, { useContext, useState, useEffect } from "react";

// Configuration
import "./EditCategoryForm.css";
import TrackerContext from "../../../contexts/TrackerContext";
import CategoryApiService from "../../../services/category-api-service";

// Components
import ErrorMessage from "../../Utilities/ErrorMessage/ErrorMessage";

export default function EditCategoryForm(props) {
    // Access context
    const context = useContext(TrackerContext);

    // Get category with given ID from state
    // If ID doesn't exist, use empty object
    // const category =
    //     context.categories.filter(
    //         (category) => category.id === parseInt(id)
    //     )[0] || {};

    // Initialize state
    const [error, setError] = useState(null);
    const [allowEdit, setAllowEdit] = useState(false);
    const [category, setCategory] = useState({});
    const [allowDelete, setAllowDelete] = useState(false);

    // Get category from API, store in context
    useEffect(() => {
        CategoryApiService.getCategory(id).then((category) =>
            setCategory(category)
        );
    }, [JSON.stringify(category)]);

    // Get category ID from props
    const id = parseInt(props.id);

    async function handleSubmit(event) {
        event.preventDefault();

        // Get info from form
        const { category_name, type, amount, description = "" } = event.target;
        const updatedCategory = {
            id: id,
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

            // Follow successful path
            props.onLoginSuccess(updatedCategory.id);

            // Replace old category with updated category
            categories.splice(index, 1, updatedCategory);
            context.setCategories(categories);
        } catch (newError) {
            setError(newError.message);
        }
    }

    async function handleDelete(event) {
        // Clear previous errors (if they exist)
        setError(null);

        try {
            const res = await CategoryApiService.deleteCategory(id);

            // Disable expense edit, don't show confirm delete button
            setAllowEdit(false);
            setAllowDelete(false);

            // Update expense info in expense array in state
            const categories = context.categories;

            // Get index of expense in state
            const index = categories.findIndex(
                (category) => category.id === id
            );

            // Follow successful path
            props.onDeleteSuccess();

            // Delete category from state, do this last so App state update doesn't
            // call this page again
            const newCategories = categories
                .slice(0, index)
                .concat(categories.slice(index + 1));
            context.setCategories(newCategories);
        } catch (newError) {
            setError(newError.message);
        }
    }

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
                <select name='type' id='type' disabled={!allowEdit}>
                    <option
                        value='monthly'
                        selected={category.type === "monthly"}
                    >
                        Monthly
                    </option>
                    <option
                        value='quarterly'
                        selected={category.type === "quarterly"}
                    >
                        Quarterly
                    </option>
                    <option value='yearly' selected={category.type === ""}>
                        Yearly
                    </option>
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
                <textarea
                    name='description'
                    id='description'
                    wrap='soft'
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
                <button
                    type='button'
                    onClick={() => {
                        setAllowEdit(false);
                        setAllowDelete(false);
                    }}
                >
                    Cancel
                </button>
            )}
            {!allowDelete ? (
                <button type='button' onClick={() => setAllowDelete(true)}>
                    Delete
                </button>
            ) : (
                ""
            )}
            {allowDelete ? (
                <button type='button' onClick={(event) => handleDelete(event)}>
                    Confirm Deletion
                </button>
            ) : (
                ""
            )}
            <button type='button' onClick={() => props.onCancel()}>
                Go Back
            </button>
            {error ? <ErrorMessage message={error} /> : ""}
        </form>
    );
}
