const router = require("express").Router();
const { model } = require("mongoose");
const auth = require("../middlewear/auth");
const Budget = require("../models/budget");

// rout to get budget base on user id an populate income and expense
router.get("/", auth, async (req, res) => {
    try {
        const budget = await Budget.find({ userId: req.userId }).populate("incomes").populate("expenses");
        res.status(200).json(budget);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

// rout to get total budget base on user id and populate income and expense
router.get("/totalBudget", auth, async (req, res) => {
    try {
        const budget = await Budget.find({ userId: req.userId }).populate("incomes").populate("expenses");
        res.status(200).json(budget[0].totalBudget());
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

//  rout to get total budget base on user id and month and year and populate income and expense
router.get("/totalBudget/:month/:year", auth, async (req, res) => {
    try {
        const budget = await Budget.find({
            userId: req.userId,
            
        }).populate("incomes").populate("expenses");
        // convert year input to int

     
        res.status(200).json(budget[0].totalBudgetByMonth(req.params.month-1 , parseInt(req.params.year)));
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});








module.exports = router;