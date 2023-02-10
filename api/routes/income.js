const router = require("express").Router();
const { model } = require("mongoose");
const auth = require("../middlewear/auth");
const Income = require("../models/income");
const User = require("../models/User");

// creat income
router.post("/",auth, async (req, res) => {
  try {
    
    const income = await Income.create({
      userId: req.userId,
      amount: req.body.amount,
      description: req.body.description,
      
    });
    res.status(200).json(income);
  } catch (err) {
    res.status(400).json(err);
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
