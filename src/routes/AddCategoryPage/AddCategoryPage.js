// React
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Configuration
import "./AddCategoryPage.css";
// import TrackerContext from "../../contexts/TrackerContext";
// import ExpenseApiService from "../../services/expense-api-service";

function AddCategoryPage() {
    // Access context
    // const context = useContext(TrackerContext);

    // Access history
    const history = useHistory();

    // Initialize state
    const [categoryData, setCategoryData] = useState({
        name: "",
        type: "monthly",
        amount: "",
        description: "",
    });

    function handleInputChange(event) {
        const { id, value } = event.target;
        setCategoryData({
            ...categoryData,
            [id]: value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Get info from form
        const { name, type, amount, description = "" } = event.target;

        const category = {
            name,
            type,
            amount,
            description,
        };

        // Clear previous errors (if they exist)
        // this.setState({ error: null });

        // ExpenseApiService.postExpense(expense);

        // Route user to Categories page
        history.push("/categories");

        // Post user registration info
        // AuthApiService.postUser({
        //     user_name: user_name.value,
        //     password: password.value,
        //     full_name: full_name.value,
        //     nickname: nick_name.value,
        // })
        //     .then((user) => {
        //         // Clear form values
        //         firstName.value = "";
        //         lastName.value = "";
        //         email.value = "";
        //         password.value = "";
        //         this.props.onRegistrationSuccess();
        //     })
        //     .catch((res) => {
        //         this.setState({ error: res.error });
        //     });
    }

    return (
        <section>
            <header role='banner'>
                <h2>Add Budget Category</h2>
            </header>

            <form
                className='add_category_form'
                onSubmit={(event) => handleSubmit(event)}
            >
                <div>
                    {/* <!-- Add logic to check if name already exists --> */}
                    <label htmlFor='category'>Name</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        onChange={(event) => handleInputChange(event)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='type'>Budget Type</label>
                    <select
                        name='type'
                        id='type'
                        onChange={(event) => handleInputChange(event)}
                    >
                        <option value='monthly' defaultValue>
                            Monthly
                        </option>
                        <option value='quarterly'>Quarterly</option>
                        <option value='annual'>Annual</option>
                    </select>
                </div>
                <div>
                    <label htmlFor='budget_amount'>Budget Amount</label>
                    <input
                        type='number'
                        name='budget_amount'
                        id='budget_amount'
                        min='0'
                        step='0.01'
                        onChange={(event) => handleInputChange(event)}
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
                        onChange={(event) => handleInputChange(event)}
                    />
                </div>
                <button type='submit'>Add Category</button>
            </form>
        </section>
    );
}

export default AddCategoryPage;
