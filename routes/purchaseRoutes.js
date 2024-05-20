const express = require("express");
const router = express.Router();


//import model
const purchaseRegister = require("../models/purchaseRegister");

// Purchase form
router.get("/purchaseAdd", (req, res) => {
    res.render("addpurchase");
  });
  
  // Installing async function
  router.post(
    "/purchaseAdd",
    async (req, res) => {
      try {
        const purchase = new purchaseRegister(req.body);
        console.log(purchase);
        await purchase.save();
        res.redirect("/purchasesList");
      } catch (error) {
        res.status(400).send("Sorry, something went wrong");
      console.log("Error registering the item", error);
    }
  }
);

// Fetching purchase from the db
router.get(
  "/purchasesList",
  async (req, res) => {
    try {
      let purchases = await purchaseRegister.find();
      res.render("purchaseList", { purchases: purchases });
    } catch (error) {
      res.status(400).send("Unable to fetch purchases from the database");
    }
  }
);
// Updating purchase in the db
router.get("/purchasesUpdate/:id", async (req, res) => {
    try {
      const purchaseUpdate = await purchaseRegister.findOne({
        _id: req.params.id,
      });
      res.render("purchaseUpdate", { purchase: purchaseUpdate });
    } catch (error) {
      console.log("Error finding purchase", error);
      res.status(400).send("Unable to find purchase in the db");
    }
  });
  router.post("/purchasesUpdate", async (req, res) => {
    try {
      await purchaseRegister.findOneAndUpdate({ _id: req.query.id }, req.body);
      res.redirect("/purchasesList");
    } catch (error) {
      res.status(404).send("Unable to update purchase in the db");
    }
  });  
// Delete Purchase Route
router.post("/deleteItem", async (req, res) => {
    try {
      await purchaseRegister.deleteOne({ _id: req.body.id });
      res.redirect("back");
    } catch (error) {
      res.status(400).send("Unable to delete purchase from the db");
      console.log("Error deleting purchase", error);
    }
  });

module.exports = router;