const express = require('express');
const router = express.Router();

// import model
const Check = require('../models/Check');
const registration = require('../models/registration');
const sitters = require('../models/sitters');

// Admin dash route
router.get("/admindashboard", async (req, res) => {
  try {
    // const transactions = await AccountsRegister.find();
    // let totalIncome = 0;
    // let totalExpense = 0;

    // transactions.forEach((transaction) => {
    //   if (transaction.classification === "income") {
    //     totalIncome += transaction.amount;
    //   }
    //   if (transaction.classification === "expense") {
    //     totalExpense += transaction.amount;
    //   }
    // });
    // console.log("---------------------------", transactions);
    let enrolledBabies = await registration.countDocuments({});
    let babiesPresent = await Check.countDocuments({
      eventType: "checkin",
    });
    let enrolledSitters = await sitters.countDocuments({});
    let sittersPresent = await sitters.countDocuments({
      status: "Present",
    });

    // console.log("Income", totalIncome);
    // console.log("Expenses", totalExpense);
    console.log("Babies Registered:", enrolledBabies);
    console.log("Babies Present:", babiesPresent);
    console.log("Sitters Registered :", enrolledSitters);
    console.log("Sitters Available:", sittersPresent);

    res.render("dashboard", {
      // totalIncome: totalIncome,
      // totalExpense: totalExpense,
      enrolledBabies,
      babiesPresent,
      enrolledSitters,
      sittersPresent,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard details:", error);
    res.status(400).send("Unable to fetch details from the database");
  }
});




  module.exports = router;