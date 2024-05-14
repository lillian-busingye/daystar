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

  module.exports = router;
