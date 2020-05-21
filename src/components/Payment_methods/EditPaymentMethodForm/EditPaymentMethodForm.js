// React
import React, { useContext, useState, useEffect } from "react";
// import { useRouteMatch } from "react-router-dom";

// Configuration
import "./EditPaymentMethodForm.css";
import TrackerContext from "../../../contexts/TrackerContext";
import PaymentMethodApiService from "../../../services/payment_method-api-service";

// Components
import ErrorMessage from "../../Utilities/ErrorMessage/ErrorMessage";

export default function EditPaymentMethodForm(props) {
    // Access context
    const context = useContext(TrackerContext);

    // Initialize state
    const [error, setError] = useState(null);
    const [allowEdit, setAllowEdit] = useState(false);
    const [payment_method, setPayment_method] = useState({});
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

    // Get payment method from API, store in context
    useEffect(() => {
        PaymentMethodApiService.getPayment_method(id).then((payment_method) =>
            setPayment_method(payment_method)
        );
    }, [JSON.stringify(payment_method)]);

    // Get payment method ID from props
    const { id } = props;

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
        const updatedPayment_method = {
            id: parseInt(id),
            payment_method_name: payment_method_name.value,
            cycle_type: cycle_type.value,
            cycle_start: cycle_start.value,
            cycle_end: cycle_end.value,
            description: description.value,
        };

        // Clear previous errors (if they exist)
        setError(null);

        try {
            const res = await PaymentMethodApiService.updatePayment_method(
                updatedPayment_method
            );

            // Disable form edit
            setAllowEdit(false);

            // Update category info in category array in state
            const payment_methods = context.payment_methods;

            // Get index of payment method in state
            const index = payment_methods.findIndex(
                (payment_method) =>
                    payment_method.id === updatedPayment_method.id
            );

            // Replace old payment method with updated payment method
            payment_methods.splice(index, 1, updatedPayment_method);
            context.setPayment_methods(payment_methods);

            // Follow successful path
            props.onLoginSuccess(updatedPayment_method.id);
        } catch (newError) {
            setError(newError.message);
        }
    }

    return (
        <form
            className='EditPaymentMethodForm'
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
                    defaultValue={payment_method.payment_method_name || ""}
                    disabled={!allowEdit}
                    required
                />
            </div>
            <div>
                <label htmlFor='cycle_type'>Cycle Type</label>
                <select
                    name='cycle_type'
                    id='cycle_type'
                    onChange={(event) => handleInputChange(event)}
                    defaultValue={payment_method.cycle_type || ""}
                    disabled={!allowEdit}
                >
                    <option
                        value='monthly'
                        selected={payment_method.cycle_type === "monthly"}
                    >
                        Monthly
                    </option>
                    <option
                        value='offset'
                        selected={payment_method.cycle_type === "offset"}
                    >
                        Offset
                    </option>
                </select>
            </div>
            {/* NEED TO FIX CYCLE START/END SHOWING DURING EDIT */}
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
                        min='1'
                        max='31'
                        // How should I handle months with less than 31 days?
                        onChange={(event) => handleInputChange(event)}
                        defaultValue={payment_method.cycle_start || "1"}
                        disabled={!allowEdit}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='cycle_end'>Cycle End Day</label>
                    <input
                        type='number'
                        name='cycle_end'
                        id='cycle_end'
                        min='1'
                        max='31'
                        // How should I handle months with less than 31 days?
                        onChange={(event) => handleInputChange(event)}
                        defaultValue={payment_method.cycle_end || "31"}
                        disabled={!allowEdit}
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
                    disabled={!allowEdit}
                    defaultValue={payment_method.description || ""}
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
