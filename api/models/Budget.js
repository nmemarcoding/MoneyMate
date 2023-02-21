// schema to store all income and expense for each user with user id

const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,

        default: Date.now,
    },
    incomes: [{type: mongoose.Schema.Types.ObjectId,
                ref: "Income"}],
    expenses: [{type: mongoose.Schema.Types.ObjectId,
                ref: "Expense"}],

});

// model to calculate total budget by deductiong total expense from total income
budgetSchema.methods.totalBudget = function () {
    let totalIncome = 0;
    let totalExpense = 0;
    this.incomes.forEach((item) => {
        totalIncome += item.amount;
    });
    this.expenses.forEach((item) => {
        totalExpense += item.amount;
    });
    return totalIncome - totalExpense;
};


module.exports = mongoose.model('Budget', budgetSchema);
