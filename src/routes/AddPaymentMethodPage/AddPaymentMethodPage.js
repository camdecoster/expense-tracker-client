// React
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Configuration
import "./AddPaymentMethodPage.css";
// import TrackerContext from "../../contexts/TrackerContext";
// import ExpenseApiService from "../../services/expense-api-service";

function AddPaymentMethodPage() {
    // Access context
    // const context = useContext(TrackerContext);

    // Access history
    const history = useHistory();

    // Initialize state
    const [paymentMethodData, setPaymentMethodData] = useState({
        name: "",
        cycleType: "monthly",
        cycleStart: 1,
        cycleEnd: 31,
        description: "",
    });

    function handleInputChange(event) {
        const { id, value } = event.target;
        setPaymentMethodData({
            ...paymentMethodData,
            [id]: value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Get info from form
        const {
            name,
            cycleType,
            cycleStart,
            cycleEnd,
            description = "",
        } = event.target;

        const category = {
            name,
            cycleType,
            cycleStart,
            cycleEnd,
            description,
        };

        // Clear previous errors (if they exist)
        // this.setState({ error: null });

        // ExpenseApiService.postExpense(expense);

        // Route user to Categories page
        history.push("/payment-methods");

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

    // let cycleDays = '';

    return (
        <section>
            <header role='banner'>
                <h1>Add Budget Category</h1>
            </header>

            <form
                class='add-category-form'
                onSubmit={(event) => handleSubmit(event)}
            >
                <div>
                    {/* <!-- Add logic to check if name already exists --> */}
                    <label for='category'>Name</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        onChange={(event) => handleInputChange(event)}
                        required
                    />
                </div>
                <div>
                    <label for='type'>Cycle Type</label>
                    <select
                        name='cycleType'
                        id='cycleType'
                        onChange={(event) => handleInputChange(event)}
                    >
                        <option value='monthly' defaultValue>
                            Monthly
                        </option>
                        <option value='offset'>Offset</option>
                    </select>
                </div>

                <div
                    className={
                        paymentMethodData.cycleType === "monthly"
                            ? "hidden"
                            : ""
                    }
                >
                    <div>
                        <label for='cycleStart'>Cycle Start Day</label>
                        <input
                            type='number'
                            name='cycleStart'
                            id='cycleStart'
                            value='1'
                            min='1'
                            max='31'
                            // How should I handle months with less than 31 days?
                            onChange={(event) => handleInputChange(event)}
                            required
                        />
                    </div>
                    <div>
                        <label for='cycleEnd'>Cycle End Day</label>
                        <input
                            type='number'
                            name='cycleEnd'
                            id='cycleEnd'
                            value='31'
                            min='1'
                            max='31'
                            // How should I handle months with less than 31 days?
                            onChange={(event) => handleInputChange(event)}
                            required
                        />
                    </div>
                </div>
                {/* <!-- <div>
                        <label for="rolling">Is this a rolling budget?</label>
                        Include mouseover explanation for what a rolling budget is
                        <input type="checkbox" name="rolling" id="rolling" />
                    </div> --> */}
                <div>
                    <label for='description'>Description (Optional)</label>
                    <br />
                    <input
                        type='text'
                        name='description'
                        id='description'
                        onChange={(event) => handleInputChange(event)}
                    />
                </div>
                <button type='submit'>Add Payment Method</button>
            </form>
        </section>
    );
}

export default AddPaymentMethodPage;
