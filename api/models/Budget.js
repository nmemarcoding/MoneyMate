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


module.exports = mongoose.model('Budget', budgetSchema);
