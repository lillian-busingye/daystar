const express = require("express");
const router = express.Router();
const passport = require("passport");

//import model
const AdminRegistration = require("../models/AdminRegistration");

//creating a route
router.get("/user-login", (req,res)=>{
    res.render("user-login");
});

router.post("/user-login", async(req,res)=>{
    try {
      const adminRegistration = new AdminRegistration(req.body);
      await AdminRegistration.register(adminRegistration,req.body.password, (error)=>{
        if(error){
            throw error
        }
        res.redirect("/user-login")
      });
    } catch (error) {
      res.status(400).send("Sorry something went wrong")
    }

});

module.exports = router;