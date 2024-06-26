const express = require('express');
const router = express.Router();

// import model
const Accounts = require("../models/accounts");

// Render Accounts form
router.get("/accounts", (req, res) => {
    res.render("accounts");
});
// installing the async function
router.post("/accounts", async(req, res) =>{
    if (req.session.user) {
        try {
            const records = new Accounts(req.body);
            console.log(records);
            await records.save();
            res.redirect("/accounts");
        }   catch (error) {
            res.status(400).send("Sorry! something went wrong");
            console.log("Error registering record.", error);
        }
    }   else {
        res.redirect("/login");
    }
});
// Route to fetch all accounts records
router.get("/accrecords", async(req, res) => {
    if (req.session.user) {
        try {
            const records = await Accounts.find();
            res.render("accountslist", { records: records });   
        } catch (err) {
            res.status(400).json({ message: err.message });     
        }
    }   else {
        res.redirect("/login");
    }
});

// Route to render the update form with the selected account record
router.get("/accountsupdate/:id", async (req, res) => {
    try {
        const record = await Accounts.findById(req.params.id);
        if (!record) {
            return res.status(400).send("Record not found");
        }
        res.render("accountsupdate", {record: record});
    }   catch (error){
        console.error("Error fetching account record:", error);
        res.status(500).send("Internal Server Error");
    }
});
// Route to handle submission of the update form
router.post("/accounts/update/:id", async (req, res) => {
    if (req.session.user) {
        try{
            const { id } = req.params;
            const updateFields = req.body;

            const existingRecord = await Accounts.findById(id);
            if (!existingRecord) {
                return res.status(404).send("Record not found");
            }
            // Preserve creation date and time
            updateFields.createdAt = existingRecord.createdAt;

            const updatedRecord = await Accounts.findByIdAndUpdate(id, updateFields, {
                new: true,
            });
            res.redirect("/accrecords");
        }   catch (err) {
            console.error("Error updating record:", err);
            res.status(500).send("Error updating Record");
        }
    }   else {
        res.redirect("/login");
    }
});
// Route to delete an existing accounts record
router.post("/accountdelete", async (req, res) => {
    if (req.session.user) {
        try {
          await Accounts.deleteOne({ _id: req.body.id });
          res.redirect("back");
        } catch (err) {
          res.status(400).json({ message: "Unable to delete record.." });
        }
    }   else {
        res.redirect("/login");
    }
});

module.exports = router;