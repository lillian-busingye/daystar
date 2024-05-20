const express = require("express");
// const { model } = require("mongoose");
const router = express.Router();
const passport = require("passport");


router.get ("/login", (req, res)=> {
    res.render("login")
});

router.post("/login", passport.authenticate("local",{failureRedirect:"/login"}), (req, res)=> {
    req.session.user = req.user
    console.log(req.body)
 
   if (req.user.role ==="admin") {
        res.redirect("/admindashboard")   
    } else if(error){
        console.log("failed to login")
        return res.status(500).send("Error logging in..")   
    }
});

router.get("/logout", (req,res) => {
    if(req.session){
        req.session.destroy((error) =>{
            if(error){
                console.log("-----------------------", error)
                return res.status(500).send("Error logging out")
            }
            res.redirect("/")
        })
    }
});

module.exports = router;