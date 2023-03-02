// schema to array of income and expense schema each month\

const mongoose = require('mongoose');

const MonthlyBudgetTrackerSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
  date: {
    type: Date,
    default: Date.now,
  },
  income: [{type: mongoose.Schema.Types.ObjectId,
            ref: "Income"}],
  expense: [{type: mongoose.Schema.Types.ObjectId,
            ref: "Expense"}],
});

// model to calculate total budget by deductiong total expense from total income
MonthlyBudgetTrackerSchema.methods.totalBudget = function () {
    let totalIncome = 0;
    let totalExpense = 0;
    this.income.forEach((item) => {
        totalIncome += item.amount;
    });
    this.expense.forEach((item) => {
        totalExpense += item.amount;
    });
    return totalIncome - totalExpense;
};



const MonthlyBudgetTracker = mongoose.model('MonthlyBudgetTracker', MonthlyBudgetTrackerSchema);

// export model
exports = MonthlyBudgetTracker;