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
    montlyIncome: {
        type: Number,
        default: 0,
    },
    incomes: [{type: mongoose.Schema.Types.ObjectId,
                ref: "Income"}],
    expenses: [{type: mongoose.Schema.Types.ObjectId,
                ref: "Expense"}],
    autoExpenses: [{type: mongoose.Schema.Types.ObjectId,
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

// mode to calculate total budget base on mount and year provided by user
budgetSchema.methods.totalBudgetByMonth = function (month, year) {
    let totalIncome = 0;
    let totalExpense = 0;
    this.incomes.forEach((item) => {

        if (item.date.getMonth() === month && item.date.getFullYear() === year) {
         
            totalIncome += item.amount;
        }
    });
    this.expenses.forEach((item) => {
        if (item.date.getMonth() === month && item.date.getFullYear() === year) {
            totalExpense += item.amount;
        }
    });
    return totalIncome - totalExpense;
};

// model to calculate total budget remining after auto expense deduction by deduction monthly income from total auto expense
budgetSchema.methods.totalBudgetAfterAutoExpense = function () {
    let totalIncome = this.montlyIncome;
    let totalAutoExpense = 0;
    
    this.autoExpenses.forEach((item) => {
        totalAutoExpense += item.amount;
    });
    return totalIncome - totalAutoExpense;
};


module.exports = mongoose.model('Budget', budgetSchema);
