const express = require("express");
// const { model } = require("mongoose");
const router = express.Router();
const passport = require("passport");


router.get ("/login", (req, res)=> {
    res.render("Adminlogin")
});

router.post("/login", passport.authenticate("local",{failureRedirect:"/login"}), (req, res)=> {
    req.session.user = req.user
    console.log(req.body)
 
   if (req.user.role ==="admin") {
        res.redirect("/babylist")   
    } else if(error){
        console.log("failed to login")
        return res.status(500).send("Error logging in..")   
    }
});
module.exports = router;