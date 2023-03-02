// schema to save expenses
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    isAutoExpense: {
        type: Boolean,
        default: false,
    },
});


// export model
module.exports = mongoose.model("Expense", expenseSchema);
