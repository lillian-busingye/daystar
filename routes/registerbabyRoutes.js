const express = require("express");
const router = express.Router();

//import model
const BabyCheckInOut = require("../models/Check");
const Baby = require("../models/registration");
// const StaffRegistration = require("../models/sitters");
const registration = require("../models/registration");
const sitters = require("../models/sitters");
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

// Baby check-in routes
router.get("/checkInBaby/:id", async (req, res) => {
  try {
    const sitter = await sitters.find();
    const checkInBaby = await registration.findOne({ _id: req.params.id });
    res.render("checkin", {
      baby: checkInBaby,
      sitters: sitter,
    });
  } catch (error) {
    console.log("Error fetching data for check-in", error);
    res.status(400).send("Unable to find baby in the db");
  }
});

router.post("/checkInBaby", async (req, res) => {
  try {
    console.log('=======================', req.body)
    const newCheckin = new BabyCheckInOut(req.body);
    newCheckin.checkinTime = new Date();
    newCheckin.eventType = "checkin";
    await newCheckin.save();
    console.log(req.body);
    res.redirect("/checkedInBabies");
  } catch (error) {
    console.log("Error checking-in baby", error);
    res.status(404).send("Unable to update baby in the db");
  }
});

// List of Checked-in babies from the db
router.get("/checkedInBabies", async (req, res) => {
  try {
    let babiesCheckedIn = await BabyCheckInOut.find({ eventType: "checkin" }).populate({
      path:"sitter",
      select:"name"
    })
    console.log("Fetched checked-in babies:", babiesCheckedIn);
    res.render("checked", {
      babies: babiesCheckedIn,
    });
    console.log("Display babies checked-in", babiesCheckedIn);
  } catch (error) {
    res.status(400).send("Unable to find babies present in the db");
  }
});

// Baby check-out routes
router.get("/checkOutBaby/:id", async (req, res) => {
  try {
    // const sitters = await sitters.find();
    const baby = await BabyCheckInOut.findById(req.params.id );
    if (!baby) {
      res.status(404).send("Baby not found");
    }

    res.render("checkout", {
      baby: baby,
      name: baby.babyName,
      
    });
  } catch (error) {
    console.log("Error finding a baby!", error);
    res.status(400).send("unable to find baby from the db!");
  }
});

router.post("/checkOutBaby/:id", async (req, res) => {
  try {
    await BabyCheckInOut
    .findOneAndUpdate({ _id: req.params.id },
      {
        ...req.body,
        eventType: "checkout",
        checkoutTime: new Date()
      });
    res.redirect("/checkedInBabies");
  } catch (error) {
    res.status(404).send("Unable to update baby in the db!");
  }
});

// List of Checked-out babies from the db
router.get("/checkedOutBabies", async (req, res) => {
  try {
    let babiesCheckedOut = await BabyCheckInOut.find({ eventType: "checkout" });
    res.render("babiesCheckedOut", { babies: babiesCheckedOut }); // to display babies from data base
    console.log("Display babies checked-out", babiesCheckedOut);
  } catch (error) {
    res.status(400).send("Unable to find babies absent in the db");
    console.log("Unable to find babies in the database", error);
  }
});

// // Route to render the check-in form
// router.get("/checkin", async (req, res) => {
//   try {
//     // Fetch available sitters from the database
//     const availableSitters = await StaffRegistration.find({ role: "Sitter" }).select('name');
//     console.log(availableSitters);
//     // Fetch list of babies from the database
//     const babies = await Baby.find();
//     // Render the check-in form with available sitters and babies
//     res.render("checkin", { availableSitters, babies });
//   } catch (error) {
//     console.error("Error rendering check-in form:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Route to handle check-in form submission
// router.post("/checkin", async (req, res) => {
//   try {
//     const newCheckin = new BabyCheckInOut(req.body);
//     newCheckin.checkinTime = new Date();
//     newCheckin.eventType = "checkin";

//     await newCheckin.save();

//     res.redirect("/checked");
//   } catch (error) {
//     console.error("Error checking in baby:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// //Route to display the list of checked-in babies
// router.get("/checked", async (req, res) => {
//   try {
//     // Fetch list of checked-in babies from the database
//     const checkedInBabies = await BabyCheckInOut.find({ eventType: "checkin" }).populate({ 
//     path: 'sitter',
//     select: 'name'
//   });
//     // Render the page with the list of checked-in babies
//     res.render("checked", { babies: checkedInBabies });
//   } catch (error) {
//     console.error("Error fetching checked-in babies:", error);
//     res.status(500).send("Internal Server Error");
//   }
//   });

//   router.get("/checkinupdate/:id", async (req, res) => {
//     try {
//       // Find the checked-in baby record by ID
//       const babyCheckInOut = await BabyCheckInOut.findById(req.params.id);
  
//       // Check if the checked-in baby exists
//       if (!babyCheckInOut || babyCheckInOut.eventType !== "checkin") {
//         // If the baby does not exist or is not checked in, return a 404 error
//         return res.status(404).send("Checked-in baby not found");
//       }
  
      // Fetch list of babies from the database
//       const babies = await Baby.find();
//       const availableSitters = await StaffRegistration.find({ role: "Sitter" }).select('name');
  
//       // Render the update form with the checked-in baby's data, list of babies, and baby's name
//       res.render("checkinupdate", { baby: babyCheckInOut, babies: babies, availableSitters: availableSitters, babyName: babyCheckInOut.babyName });
//     } catch (error) {
//       console.error("Error rendering check-in update form:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   });

//   router.post("/checkinupdate/:id", async (req, res) => {
//     try {
//       const babyId = req.params.id;
  
//       // Update the checked-in baby record in the database with the new fields
//       const updatedBabyCheckInOut = await BabyCheckInOut.findOneAndUpdate(
//         { _id: babyId, eventType: "checkin" }, // Match condition
//         { $set: req.body }, // Update with the request body
//         { new: true } // To return the updated document
//       );
  
//       // If the checked-in baby record was not found, return a 404 error
//     if (!updatedBabyCheckInOut) {
//       return res.status(404).send("Checked-in baby not found");
//     }

//     // Redirect to the page where checked-in babies are listed
//     res.redirect("/checked");
//   } catch (error) {
//     console.error("Error updating checked-in baby record:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Route to delete a checked-in baby
// router.post("/checkedin/:id", async (req, res) => {
//   try {
//     if (req.body._method === 'DELETE') {
//       const babyId = req.params.id;
  
//       // Find and delete the checked-in baby by ID
//       await BabyCheckInOut.findByIdAndDelete(babyId);
  
//       // Redirect to the page where checked-in babies are listed
//       res.redirect("/checked");
//     } else {
//       res.status(400).send("Invalid request");
//     }
//   } catch (error) {
//     console.error("Error deleting checked-in baby:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// router.get("/checkout/:id", async (req, res) => {
//   try {
//     console.log("Rendering checkout form for a specific baby...");
//     // Find the baby by ID
//     const baby = await BabyCheckInOut.findById(req.params.id);

//     // Check if the baby exists
//     if (!baby) {
//       // If the baby does not exist, return a 404 error
//       return res.status(404).send("Baby not found");
//     }

//     // Render the checkout form with the baby's name as a parameter
//     res.render("checkout", { baby: baby, babyName:baby.babyName }); // Pass the entire baby object to the template
//   } catch (error) {
//     console.error("Error rendering checkout form:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Route to handle checkout form submission
// router.post("/checkout/:id", async (req, res) => {
//   try {
//     console.log("Processing checkout form submission...");
//     const babyId = req.params.id;
//     const checkoutDetails = req.body;

//     // Update the checkout details for the baby in the database
//     await BabyCheckInOut.findByIdAndUpdate(babyId, { ...checkoutDetails, eventType: "checkout", checkoutTime: new Date() });

//     console.log("Redirecting to /checkedout after checkout...");
//     res.redirect("/checkedout");
//   } catch (error) {
//     console.error("Error handling checkout form submission:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// // Route to display a list of checked-out babies
// router.get("/checkedout", async (req, res) => {
//   try {
//     console.log("Fetching list of checked-out babies...");
//     // Fetch list of checked-out babies from the database
//     const checkedOutBabies = await BabyCheckInOut.find({ eventType: "checkout" });
//     const babyNames = checkedOutBabies.map(baby => baby.babyName);
//     // Render the checkedout.pug template with the list of checked-out babies
//     console.log("Rendering checkedout.pug template");
//     // Render the update form template with the checked-out baby's data
//     res.render("checkedout", { babies: checkedOutBabies });
//   } catch (error) {
//     console.error("Error fetching checked-out baby details:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// router.get("/checkoutupdate/:id", async (req, res) => {
//   try {
//     const babyId = req.params.id;
//     // Fetch the checked-out baby's information from the database
//     const checkedOutBaby = await BabyCheckInOut.findById(babyId);
    
//     // If no baby is found with the given ID, return a 404 Not Found response
//     if (!checkedOutBaby) {
//       console.error("Checked-out baby not found");
//       return res.status(404).send("Checked-out baby not found");
//     }
//     // Render the update form template with the checked-out baby's data
//     res.render("checkoutupdate", { checkedOutBaby });
//   } catch (error) {
//     console.error("Error fetching checked-out baby details:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

// router.post("/checkoutupdate/:id", async (req, res) => {
//   try {
//     const babyId = req.params.id;
    // Update the person picking up, contact number, and checkout notes for the baby in the database
//     await BabyCheckInOut.findByIdAndUpdate(babyId, req.body, { new: true });

//     console.log("Checkout details updated successfully.");
//     res.redirect("/checkedout");
//   } catch (error) {
//     console.error("Error updating checkout details:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });

module.exports = router;