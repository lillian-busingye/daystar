const express = require("express");
const router = express.Router();
const multer = require("multer");

//import model
const  dollregister = require("../models/dollregister");

// Image upload configs
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images/images");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  let upload = multer({ storage: storage });

// Doll form
router.get("/dollAdd", (req, res) => {
    res.render("addDoll");
  });
  
  // Installing async function
  router.post(
    "/dollAdd",
    // connectEnsureLogin.ensureLoggedIn(),
    upload.single("imageUpload"),
    async (req, res) => {
      try {
        const doll = new dollregister(req.body);
        doll.imageUpload = req.file.path; // Sends image url to db
        console.log("Doll added", doll);
        await doll.save();
        res.redirect("/dollsList");
    } catch (error) {
        res.status(400).render("addDoll");
        console.log(error);
      }
    }
  );
  
  // Fetching doll from the db
  router.get(
    "/dollsList",
    // connectEnsureLogin.ensureLoggedIn(),
    async (req, res) => {
      try {
        let dolls = await dollregister.find();
        res.render("dollStall", { dolls: dolls });
      } catch (error) {
        res.status(400).send("Unable to fetch dolls from the database");
      }
    }
  );
  
 // Sell Doll Route
 router.get("/sellDoll/:id", async (req, res) => {
    try {
      const sellDoll = await dollregister.findOne({ _id: req.params.id });
      res.render("dollSell", {
        doll: sellDoll,
      });
    } catch (error) {
      console.log("Error fetching data for sell", error);
      res.status(400).send("Unable to find doll in the db");
    }
  });
  
  router.post("/sellDoll", async (req, res) => {
    const dollId = req.body.id; // Get the doll ID from the form body
    const quantityToSell = req.body.quantity; // Get the quantity to sell from the form body

    try {
      // Find the doll by ID
      const doll = await dollregister.findById(dollId);
  
      if (!doll) {
        return res.status(404).send("Doll not found");
      }
  
      console.log("Current doll quantity:", doll.quantity);
      console.log("Quantity to sell:", quantityToSell);
  
      // Reduce the quantity of the doll
      if (doll.quantity >= quantityToSell && quantityToSell > 0) {
        doll.quantity -= quantityToSell;
      if (doll.quantity === 0) {
        doll.status = "Sold";
      }
      await doll.save();
      res.redirect("/dollsList"); // Redirect to the dolls list after selling
    } else {
      console.log("Invalid quantity or insufficient stock");
      console.log("Available quantity:", doll.quantity);
      console.log("Requested quantity to sell:", quantityToSell);
      return res.status(400).send("Invalid quantity or insufficient stock");
    }
} catch (error) {
    console.log("Error selling doll", error);
    res.status(404).send("Unable to sell doll");
  }
});


module.exports = router;