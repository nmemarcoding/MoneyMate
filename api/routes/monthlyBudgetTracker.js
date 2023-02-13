const router = require("express").Router();
const { model } = require("mongoose");
const auth = require("../middlewear/auth");
const Income = require("../models/income");
const User = require("../models/User");
const MonthlyBudgetTracker = require("../models/monthlyBudgetTracker");

// creat monthly budget tracker
router.post("/",auth, async (req, res) => {
   
    try {
        
        const monthlyBudgetTracker = await MonthlyBudgetTracker.create({
        userId: req.userId,
        income: req.body.income,
        expense: req.body.expense,
       
        
        });
        res.status(200).json(monthlyBudgetTracker);
    } catch (err) {
        res.status(400).json(err);
    }
});

// get totoal budget using totalbudget metod in monthlyBudgetTracker model
router.get("/totalBudget", auth, async (req, res) => {
    try {
        const monthlyBudgetTracker = await MonthlyBudgetTracker.find({
        userId: req.userId,
        date: {
            $gte: new Date(req.body.start),
            $lte: new Date(req.body.end + 'T23:59:59.999Z'),
        },
        }).populate("income").populate("expense");
        
        
        res.status(200).json(monthlyBudgetTracker[0].totalBudget());
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});


// put rout to find monthly budget tracker base on month and user id and add income to income array
router.put("/addIncome", auth, async (req, res) => {
    try {
        const monthlyBudgetTracker = await MonthlyBudgetTracker.findOneAndUpdate(
        {
            userId: req.userId,
            date: {
            $gte: new Date(req.body.start),
            $lte: new Date(req.body.end + 'T23:59:59.999Z'),
            },
        },
        {
            $push: {
            income: req.body.income,
            },
        },
        {
            new: true,
        }
        );
        res.status(200).json(monthlyBudgetTracker);
    } catch (err) {
        res.status(400).json(err);
    }
});
// finding monthly budget tracker base on month and pupulate income array
router.get("/findIncome", auth, async (req, res) => {
    try {
        const monthlyBudgetTracker = await MonthlyBudgetTracker.find({
        userId: req.userId,
        date: {
            $gte: new Date(req.body.start),
            $lte: new Date(req.body.end + 'T23:59:59.999Z'),
        },
        }).populate("income");
        res.status(200).json(monthlyBudgetTracker);
    } catch (err) {
        res.status(400).json(err);
    }
});


// export router
module.exports = router;
