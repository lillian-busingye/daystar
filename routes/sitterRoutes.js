const express = require("express");
const router = express.Router();


//import model
const Sitter = require("../models/sitters");
const sitters = require("../models/sitters");
router.get("/Reg", (req, res) => {
  res.render("babysitter");
});
//post route
router.post("/Reg", async (req, res) => {
    try {
      const sitter = new sitters(req.body);
      console.log(sitter);
      await sitter.save();
      res.redirect("/Reg");
    } catch (error) {
      // incase of errors
      res.status(400).send("sorry something went wrong");
      console.log("Error +registering the sitter..", error);
    }
  });

  //sitter list from database
router.get("/sitterlist", async (req, res) => {
  try {
    const Sitters = await Sitter.find(); //from line8
    res.render("sitterlist", { sitters: Sitters }); // to display sitters from data base
    console.log("display sitters", Sitters);
  } catch (error) {
    res.status(400).send("unable to find sitters from database!");
    console.log("unable to find sitters from database!...", error);
  }
});

// PUT API to update sitter details
router.get("/sittersupdate/:id", async (req, res) => {
  try {
     // Find the sitter by ID and update it
    const sitter = await sitters.findById({_id: req.params.id});
    res.render("sittersUpdate", { sitter: sitter })


  } catch (error) {
    console.log("error finding a sitter!", error);
    res.status(400).send("unable to update sitter in the database");
  }
});

router.post("/sittersupdate", async(req, res)=> {
  try{
    await sitters.findOneAndUpdate({ _id: req.query.id }, req.body, {
      new: true,
    });
    console.log();
    res.redirect("/sitterlist")
  } catch (error) {
    res.status(404).send("unable to update sitter in the db!");
  }
});

//delete route for form in database
router.post("/sitterdelete", async (req, res) => {
  try {
    await sitters.deleteOne({ _id: req.body.id });

    res.redirect("back");
    //res.send('success registering a siiter!');
    //to display on same page//res.redirect("/registerbabysitter")
  } catch (error) {
    res.status(400).send("unable to delete sitter from db!");
    console.log("error delete sitter...", error);
  }
});

// Sitter check-in routes
router.get("/sitterscheckin/:id", async (req, res) => {
  try {
    const checkInSitter = await sitters.findOne({ _id: req.params.id });
    res.render("sittercheckin", {
      sitter: checkInSitter,
    });
  } catch (error) {
    console.log("Error fetching data for check-in", error);
    res.status(400).send("Unable to find sitter in the db");
  }
});

router.post("/sitterscheckin", async (req, res) => {
  try {
    await sitters.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/sitterschecked");
  } catch (error) {
    console.log("Error checking-in sitter", error);
    res.status(404).send("Unable to update sitter in the db");
  }
});

// List of Checked-in sitters from the db
router.get("/sitterschecked", async (req, res) => {
  try {
    let sittersCheckedIn = await sitters.find({ status: "Present" });
    res.render("sitterchecked", {
      sitters: sittersCheckedIn,
    });
    console.log("Display sitters checked-in", sittersCheckedIn);
  } catch (error) {
    res.status(400).send("Unable to find sitters available in the db");
  }
});

// Sitter check-out routes
router.get("/sitterscheckout/:id", async (req, res) => {
  try {
    // const sitters = await sitters.find();
    const checkOutSitter = await sitters.findOne({ _id: req.params.id });

    res.render("sittercheckout", {
      sitter: checkOutSitter,
      // sitters: sitters,
    });
  } catch (error) {
    console.log("Error finding a sitter!", error);
    res.status(400).send("unable to find sitter in the db!");
  }
});
router.post("/sitterscheckout", async (req, res) => {
  try {
    await sitters.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/sitterscheckedout");
  } catch (error) {
    res.status(404).send("Unable to update sitter in the db!");
  }
});
// List of Checked-out sitters from the db
router.get("/sitterscheckedout", async (req, res) => {
  try {
    let sittersCheckedOut = await sitters.find({ status: "Absent" });
    res.render("sittercheckedout", { sitters: sittersCheckedOut });
    console.log("Display sitters checked-out", sittersCheckedOut);
  } catch (error) {
    res.status(400).send("Unable to find sitter off in the db");
    console.log("Unable to find sitters in the database", error);
  }
});


  module.exports = router;
