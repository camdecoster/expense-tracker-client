// React
import React, { useContext, useState } from "react";

// Configuration
import "./NewPaymentMethodForm.css";
import TrackerContext from "../../../contexts/TrackerContext";
import PaymentMethodApiService from "../../../services/payment_method-api-service";

// Components
import ErrorMessage from "../../Utilities/ErrorMessage/ErrorMessage";

export default function NewPaymentMethodForm(props) {
    // Access context
    const context = useContext(TrackerContext);

    // Initialize state
    const [error, setError] = useState(null);
    const [payment_methodData, setPayment_methodData] = useState({
        name: "",
        cycle_type: "monthly",
        cycle_start: 1,
        cycle_end: 31,
        description: "",
    });

    function handleInputChange(event) {
        const { id, value } = event.target;
        setPayment_methodData({
            ...payment_methodData,
            [id]: value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        // Get info from form
        const {
            payment_method_name,
            cycle_type,
            cycle_start,
            cycle_end,
            description = "",
        } = event.target;
        const payment_method = {
            payment_method_name: payment_method_name.value,
            cycle_type: cycle_type.value,
            cycle_start: cycle_start.value,
            cycle_end: cycle_end.value,
            description: description.value,
        };

        console.log("payment_method", payment_method);

        // Clear previous errors (if they exist)
        setError(null);

        try {
            const payment_methodInfo = await PaymentMethodApiService.postPayment_method(
                payment_method
            );
            console.log("payment_methodInfo", payment_methodInfo);

            // Clear form data
            payment_method_name.value = "";
            cycle_type.value = "monthly";
            cycle_start.value = "";
            cycle_end.value = "";
            description.value = "";

            // Add new payment method info to payment method array in state
            const newPayment_method = payment_methodInfo.payment_method;
            const payment_methods = context.payment_methods;
            payment_methods.push(newPayment_method);
            context.setPayment_methods(payment_methods);

            // Follow successful path
            props.onLoginSuccess(payment_methodInfo.path);
        } catch (error) {
            console.log(error.message);
            setError(error.message);
        }
    }

    return (
        <form
            className='NewPaymentMethodForm'
            onSubmit={(event) => handleSubmit(event)}
        >
            <div>
                {/* <!-- Add logic to check if name already exists --> */}
                <label htmlFor='payment_method_name'>Name</label>
                <input
                    type='text'
                    name='payment_method_name'
                    id='payment_method_name'
                    onChange={(event) => handleInputChange(event)}
                    required
                />
            </div>
            <div>
                <label htmlFor='cycle_type'>Cycle Type</label>
                <select
                    name='cycle_type'
                    id='cycle_type'
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
                    payment_methodData.cycle_type === "monthly" ? "hidden" : ""
                }
            >
                <div>
                    <label htmlFor='cycle_start'>Cycle Start Day</label>
                    <input
                        type='number'
                        name='cycle_start'
                        id='cycle_start'
                        defaultValue='1'
                        min='1'
                        max='31'
                        // How should I handle months with less than 31 days?
                        onChange={(event) => handleInputChange(event)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='cycle_end'>Cycle End Day</label>
                    <input
                        type='number'
                        name='cycle_end'
                        id='cycle_end'
                        defaultValue='31'
                        min='1'
                        max='31'
                        // How should I handle months with less than 31 days?
                        onChange={(event) => handleInputChange(event)}
                        required
                    />
                </div>
            </div>
            <div>
                <label htmlFor='description'>Description (Optional)</label>
                <br />
                <input
                    type='text'
                    name='description'
                    id='description'
                    onChange={(event) => handleInputChange(event)}
                />
            </div>
            <button type='submit'>Add Payment Method</button>
            <button type='button' onClick={() => props.onCancel()}>
                Cancel
            </button>
            {error ? <ErrorMessage message={error} /> : ""}
        </form>
    );
}
