// React
import React, { useContext, useState } from "react";
// import { useHistory } from "react-router-dom";

// Configuration
import "./NewCategoryForm.css";
import TrackerContext from "../../../contexts/TrackerContext";
import CategoryApiService from "../../../services/category-api-service";

// Components
import ErrorMessage from "../../Utilities/ErrorMessage/ErrorMessage";

export default function NewCategoryForm(props) {
    // Access context
    const context = useContext(TrackerContext);

    // Access history
    // const history = useHistory();

    // Initialize state
    const [error, setError] = useState(null);
    // const [categoryData, setCategoryData] = useState({
    //     name: "",
    //     type: "monthly",
    //     amount: "",
    //     description: "",
    // });

    // function handleInputChange(event) {
    //     const { id, value } = event.target;
    //     setCategoryData({
    //         ...categoryData,
    //         [id]: value,
    //     });
    // }

    async function handleSubmit(event) {
        event.preventDefault();

        // Get info from form
        const { category_name, type, amount, description = "" } = event.target;

        // Clear previous errors (if they exist)
        setError(null);

        try {
            const categoryInfo = await CategoryApiService.postCategory({
                category_name: category_name.value,
                type: type.value,
                amount: amount.value,
                description: description.value,
            });

            // Clear form data
            category_name.value = "";
            type.value = "monthly";
            amount.value = "";
            description.value = "";

            // Add new category info to category array in state
            const newCategory = categoryInfo.category;
            const categories = context.categories;
            categories.push(newCategory);
            context.setCategories(categories);

            // Follow successful path
            props.onLoginSuccess(categoryInfo.path);
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        }
    }

    return (
        <form id='NewCategoryForm' onSubmit={(event) => handleSubmit(event)}>
            <div>
                {/* <!-- Add logic to check if name already exists --> */}
                <label htmlFor='category_name'>Name</label>
                <input
                    type='text'
                    name='category_name'
                    id='category_name'
                    required
                />
            </div>
            <div>
                <label htmlFor='type'>Budget Type</label>
                <select name='type' id='type'>
                    <option value='monthly' defaultValue>
                        Monthly
                    </option>
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
                <input type='text' name='description' id='description' />
            </div>
            <button type='submit'>Add Category</button>
            <button type='button' onClick={() => props.onCancel()}>
                Cancel
            </button>
            {error ? <ErrorMessage message={error} /> : ""}
        </form>
    );
}
