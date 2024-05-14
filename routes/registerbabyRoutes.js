const express = require("express");
const router = express.Router();

//import model
const BabyCheckInOut = require("../models/Check");
const Baby = require("../models/registration");
const StaffRegistration = require("../models/sitters");
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
router.get("/babiesupdate/:id", async (req, res) => {
  try {
     // Find the baby by ID and update it
    const babyUpdate = await Baby.findById({_id: req.params.id});
    res.render("babyUpdate", {baby:babyUpdate})


  } catch (error) {
    console.log("error finding a baby!", error)
    res.status(400).send("unable to update baby in the db!");
  }
});

router.post("/babiesupdate", async(req, res)=> {
  try{
    await Baby.findOneAndUpdate({_id: req.query.id}, req.body, {
      new: true,
    });
    res.redirect("/babylist")
  } catch (error) {
    res.status(404).send("unable to update baby in the db!");
  }
});

//delete route for form in database
router.post("/babydelete", async (req, res) => {
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

// Route to render the check-in form
router.get("/checkin", async (req, res) => {
  try {
    // Fetch available sitters from the database
    const availableSitters = await StaffRegistration.find({ role: "Sitter" }).select('name');
    console.log(availableSitters);
    // Fetch list of babies from the database
    const babies = await Baby.find();
    // Render the check-in form with available sitters and babies
    res.render("checkin", { availableSitters, babies });
  } catch (error) {
    console.error("Error rendering check-in form:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to handle check-in form submission
router.post("/checkin", async (req, res) => {
  try {
    const newCheckin = new BabyCheckInOut(req.body);
    newCheckin.checkinTime = new Date();
    newCheckin.eventType = "checkin";

    await newCheckin.save();

    res.redirect("/checked");
  } catch (error) {
    console.error("Error checking in baby:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Route to display the list of checked-in babies
router.get("/checked", async (req, res) => {
  try {
    // Fetch list of checked-in babies from the database
    const checkedInBabies = await BabyCheckInOut.find({ eventType: "checkin" }).populate({ 
    path: 'sitter',
    select: 'name'
  });
    // Render the page with the list of checked-in babies
    res.render("checked", { babies: checkedInBabies });
  } catch (error) {
    console.error("Error fetching checked-in babies:", error);
    res.status(500).send("Internal Server Error");
  }
  });
module.exports = router;