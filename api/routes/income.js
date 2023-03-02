const router = require("express").Router();

const auth = require("../middlewear/auth.js");
const Income = require("../models/income.js");
const User = require("../models/user.js");
const MonthlyBudgetTracker = require("../models/monthlyBudgetTracker.js");
const Budget = require("../models/budget.js");


// creat icome after creating that find monthly budget tracker for the same month and add new income id to income array
// if monthly budget tracker not found then create new monthly budget tracker and add income id to income array
// router.post("/",auth, async (req, res) => {
//   try {
//     const income = await Income.create({
//       userId: req.userId,
//       amount: req.body.amount,
//       description: req.body.description,

//     });
//     const monthlyBudgetTracker = await MonthlyBudgetTracker.findOne({
//       userId: req.userId,
//       date: {
//         $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
//         $lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999),
//       },
//     });
//     if(monthlyBudgetTracker){
//       monthlyBudgetTracker.income.push(income._id);
//       await monthlyBudgetTracker.save();

//     }else{
//       const monthlyBudgetTracker = await MonthlyBudgetTracker.create({
//         userId: req.userId,
//         income: [income._id],
//         expense: [],
//       });
//     }
//     res.status(200).json(income);
//   } catch (err) {
//     res.status(400).json(err);
//     console.log(err);
//   }
// });


// creat income after creating that go to Budget model and look for the same user id and add new income to list of incomes
// if Budget not found with same user id then create new Budget and add income id to income array.
router.post("/",auth, async (req, res) => {
  try {
    const income = await Income.create({
      ...req.body,
      userId: req.userId,
    });
    const budget = await Budget.findOne({
      userId: req.userId,
    }).populate("incomes");
    if(budget){
      budget.incomes.push(income._id);
      await budget.save();

    }else{
      const budget = await Budget.create({
        userId: req.userId,
        incomes: [income._id],
        expenses: [],
      });
    }
   
    res.status(200).json(income);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});


// find all income base on month
// add body like this {"start": "2022-01-01","end": "2022-12-31",token:"token"}
router.get("/find", auth, async (req, res) => {
  try {
    const income = await Income.find({
      userId: req.userId,
      date: {
        $gte: new Date(req.body.start),
        $lte: new Date(req.body.end + 'T23:59:59.999Z'),
      },
    });
    res.status(200).json(income);
  } catch (err) {
    res.status(400).json(err);
  }
});

// find all income base on month and calculate total income 

router.get("/findTotal", auth, async (req, res) => {
  try {
    const income = await Income.find({
      userId: req.userId,
      date: {
        $gte: new Date(req.body.start),
        $lte: new Date(req.body.end + 'T23:59:59.999Z'),
      },
    });
    let total = 0;
    income.forEach((item) => {
      total += item.amount;
    });
    res.status(200).json(total);
  } catch (err) {
    res.status(400).json(err);
  }
});





module.exports = router;
