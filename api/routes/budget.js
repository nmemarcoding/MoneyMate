const router = require("express").Router();
const { model } = require("mongoose");
const auth = require("../middlewear/auth");
const Budget = require("../models/budget");
const Income = require("../models/income");
const Expense = require("../models/Expense");

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
// also cheack and if for any income for this mounth has isMontlyInome = true if is not creat new income with amunt of montly income saved in budget schema and also make isMontlyInome = tru and description = montly income
router.get("/totalBudget", auth, async (req, res) => {
    try {
        let budget = await Budget.find({ userId: req.userId }).populate("incomes").populate("expenses").populate("autoExpenses");
        // if budget is not created yet creat new budget
        if (budget.length === 0) {
            const newBudget = await Budget.create({
                userId: req.userId,
                montlyIncome: 0,
                incomes: [],
                expenses: [],
                autoExpenses: [],
            });
            budget = await Budget.find({ userId: req.userId }).populate("incomes").populate("expenses").populate("autoExpenses");
        }

        let totalBudget = budget[0].totalBudget();
        
        // check if in incomes array for existing month there is montly income
        const isMontlyIncome = budget[0].incomes.find((income) => {
         
            
            return income.isMontlyIncome=== true && income.date.getMonth() === new Date().getMonth() && income.date.getFullYear() === new Date().getFullYear()
        });
        
        // cheack if in expenses array for existing month and year there is auto expense
        const isAutoExpense = budget[0].expenses.find((expense) => {
            return expense.isAutoExpense === true && expense.date.getMonth() === new Date().getMonth() && expense.date.getFullYear() === new Date().getFullYear()
        });
        
        //looping through expenses array and creat new expenses for each auto expense with sane amount and description
        if (!isAutoExpense ) { 
            budget[0].autoExpenses.forEach(async (expense) => {
                    const newExpense = await Expense.create({
                        userId: req.userId,
                        amount: expense.amount,
                        description: expense.description,
                        date: new Date(),
                        isAutoExpense: true,
                    });
                    // push new expense to expense array
                    budget[0].expenses.push(newExpense);
                    // save budget
                    await budget[0].save();
                    // add new expense amount to total budget
                    totalBudget = totalBudget - expense.amount;
                    
                
            });
        }   
        


        // if there is no montly income for this month creat new income with montly income amount and description montly income
        if (!isMontlyIncome && budget[0].montlyIncome !== 0) {
            const newIncome = await Income.create({
                userId: req.userId,
                amount: budget[0].montlyIncome,
                description: "montly income",
                date: new Date(),
                isMontlyIncome: true,
            });
            // push new income to income array
            budget[0].incomes.push(newIncome);
            // save budget
            await budget[0].save();
            // add new income amount to total budget
            totalBudget += newIncome.amount;
        }
        res.status(200).json({...budget[0]._doc,totalBudget});
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

     
        res.status(200).json(budget[0]?.totalBudgetByMonth(req.params.month-1 , parseInt(req.params.year)));
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

// update montly income if there is no budget for this user create new budget
router.put("/montlyIncome", auth, async (req, res) => {
    try {
        const budget = await Budget.find({ userId: req.userId });
        if (budget.length === 0) {
            const newBudget = await Budget.create({
                userId: req.userId,
                montlyIncome: req.body.montlyIncome,
                incomes: [],
                expenses: [],
                autoExpenses: [],
                date: new Date(),
            });
            res.status(200).json(newBudget);
        } else {
            budget[0].montlyIncome = req.body.montlyIncome;
            await budget[0].save();
            res.status(200).json(budget[0]);
        }
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});










module.exports = router;