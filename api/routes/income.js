const router = require("express").Router();
const { model } = require("mongoose");
const Income = require("../models/income");
const User = require("../models/User");

// creat income
router.post("/", async (req, res) => {
  try {
    
    const userValidation = await User.find({ _id: req.body.userId});
    if (!userValidation) return res.status(200).json({ message: "User not found" });
    const income = await Income.create(req.body);
    res.status(200).json(income);
  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;
