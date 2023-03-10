const router = require("express").Router();
const { model } = require("mongoose");
const auth = require("../middlewear/auth.js");
const Expense = require("../models/expense.js");
const Income = require("../models/income.js");
const User = require("../models/user.js");
const MonthlyBudgetTracker = require("../models/monthlyBudgetTracker.js");
const Budget = require("../models/budget.js");


// creat expense after creating that find monthly budget tracker for the same month and add new income id to income array
// if monthly budget tracker not found then create new monthly budget tracker and add expense id to expense array
// router.post("/",auth, async (req, res) => {
//     try {
//         const expense = await Expense.create({
//         userId: req.userId,
//         amount: req.body.amount,
//         description: req.body.description,

//         });
//         const monthlyBudgetTracker = await MonthlyBudgetTracker.findOne({
//         userId: req.userId,
//         date: {
//             $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
//             $lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999),
//         },
//         });
//         if(monthlyBudgetTracker){
//         monthlyBudgetTracker.expense.push(expense._id);
//         await monthlyBudgetTracker.save();

//         }else{
//         const monthlyBudgetTracker = await MonthlyBudgetTracker.create({
//             userId: req.userId,
//             income: [],
//             expense: [expense._id],
//         });
//         }
//         res.status(200).json(expense);
//     } catch (err) {
//         res.status(400).json(err);
//         console.log(err);
//     }
// });



// creat expens after creating that go to Budget model and look for the same user id and add new expens to list of expenses
// if Budget not found with same user id then create new Budget and add expens id to expenses array.
router.post("/",auth, async (req, res) => {
    try {
        const expense = await Expense.create({
        userId: req.userId,
        amount: req.body.amount,
        description: req.body.description,

        });
        const budget = await Budget.findOne({
        userId: req.userId,
        });
        if(budget){
        budget.expenses.push(expense._id);  
        await budget.save();
        }else{
        const budget = await Budget.create({
            userId: req.userId,
            incomes: [],
            expenses: [expense._id],
        });
        }
        res.status(200).json(expense);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});




// find all expense base on month and user id

router.get("/find", auth, async (req, res) => {
    try {
        const expense = await Expense.find({
        userId: req.userId,
        date: {
            $gte: new Date(req.body.start),
            $lte: new Date(req.body.end + 'T23:59:59.999Z'),
        },
        });
        res.status(200).json(expense);
    } catch (err) {
        res.status(400).json(err);
    }
});

// find all expense base on month and calculate total expense

router.get("/findTotal", auth, async (req, res) => {
    try {
        const expense = await Expense.find({
        userId: req.userId,
        date: {
            $gte: new Date(req.body.start),
            $lte: new Date(req.body.end + 'T23:59:59.999Z'),
        },
        });
        let total = 0;
        expense.forEach((item) => {
        total += item.amount;
        });
        res.status(200).json(total);
    } catch (err) {
        res.status(400).json(err);
    }
});

// find bought base on date 
// to get boudght we deduct total income from total expense base on statrt and end date 
router.get("/findBought", auth, async (req, res) => {
    try {
        const expense = await Expense.find({
        userId: req.userId,
        date: {
            $gte: new Date(req.body.start),
            $lte: new Date(req.body.end + 'T23:59:59.999Z'),
        },
        });
        let total = 0;
        expense.forEach((item) => {
        total += item.amount;
        });
        const income = await Income.find({
        userId: req.userId,
        date: {
            $gte: new Date(req.body.start),
            $lte: new Date(req.body.end + 'T23:59:59.999Z'),
        },
        });
        let totalIncome = 0;
        income.forEach((item) => {
        totalIncome += item.amount;
        });
        res.status(200).json(totalIncome - total);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

// creat expense with autoExpense true and add expense id to autoExpense array in Budget model
router.post("/autoExpense",auth, async (req, res) => {
    try {
        const expense = await Expense.create({
        userId: req.userId,
        amount: req.body.amount,
        description: req.body.description,
        isAutoExpense: true,
        });
        const budget = await Budget.findOne({
        userId: req.userId,
        });
        if(budget){
        budget.autoExpenses.push(expense._id);
        budget.expenses.push(expense._id);
        await budget.save();
        }else{
        const budget = await Budget.create({
            userId: req.userId,
            incomes: [],
            expenses: [expense._id],
            autoExpenses: [expense._id],
        });
        }
        res.status(200).json(expense);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});








// export router
module.exports = router;