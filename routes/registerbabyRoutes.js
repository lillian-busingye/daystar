const express = require("express");
const router = express.Router();

//import model
const BabyCheckInOut = require("../models/Check");
const Baby = require("../models/registration");
// const { post } = require("./");
router.get("/register", (req, res) => {
  res.render("registerbaby");
});
//post route

router.post("/register", async (req, res) => {
  try {
    const baby = new Baby(req.body);
    console.log(baby);
    await baby.save();
    res.redirect("/register");
  } catch (error) {
    // incase of errors
    res.status(400).send("sorry something went wrong");
    console.log("Error +registering the baby..", error);
  }
});

//baby list from database
router.get("/babylist", async (req, res) => {
  try {
    let babies = await Baby.find(); //from line8
    res.render("babylist", { babies: babies }); // to display babies from data base
    console.log("display babies", babies);
  } catch (error) {
    res.status(400).send("unable to find babies from database!");
    console.log("unable to find babies from database!...", error);
  }
});

// PUT API to update baby details
router.put("/babiesupdate/:id", async (req, res) => {
  try {
     // Find the baby by ID and update it
    const babyUpdate = await Baby.findOne({_id: req.params.id});
    res.render("babiesUpdate", {baby:babyUpdate})


  } catch (error) {
    console.log("error finding a baby!", error)
    res.status(400).send("unable to update baby in the db!");
  }
});

//delete route for form in database
router.post("/delete", async (req, res) => {
  try {
    await Baby.deleteOne({ _id: req.body.id });

    res.redirect("back");
    //res.send('success registering a baby!');
    //to display on same page//res.redirect("/registerbaby")
  } catch (error) {
    res.status(400).send("unable to delete baby from db!");
    console.log("error delete baby...", error);
  }
});

module.exports = router;