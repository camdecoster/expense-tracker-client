// React
import { v4 as uuidv4 } from "uuid";

// Configuration
// import TokenService from "../services/token-service";
// import config from "../config";
import dummyData from "../dummyData";

const ExpenseApiService = {
    getExpenses() {
        return dummyData.expenses;
    },
    getExpense(expenseId) {
        return dummyData.expenses.filter((expense) => expense.id === expenseId);
    },
    postExpense(expense) {
        const id = uuidv4();
        expense["id"] = id;
        // return this.getExpense(expense.id);
    },
    updateExpense(expense) {
        // Update expense logic
        return;
    },
};

export default ExpenseApiService;
