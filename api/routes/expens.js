const router = require("express").Router();
const { model } = require("mongoose");
const auth = require("../middlewear/auth");
const Expense = require("../models/Expense");
const Income = require("../models/income");
const User = require("../models/User");

// creat expense
router.post("/",auth, async (req, res) => {
    try {
        
        const expense = await Expense.create({
        userId: req.userId,
        amount: req.body.amount,
        description: req.body.description,
        
        });
        res.status(200).json(expense);
    } catch (err) {
        res.status(400).json(err);
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








// export router
module.exports = router;