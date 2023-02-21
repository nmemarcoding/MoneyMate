// income schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = require("./User.js");

const IncomeSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    isMontlyIncome: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Income", IncomeSchema);
