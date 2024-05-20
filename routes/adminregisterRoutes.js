const express = require("express");
const router = express.Router();

//import model
const Administer = require("../models/administer")

router.get("/adminregister", (req, res) =>{
    res.render("adminregister");
});

//post route
//installing the async function
router.post("/adminregister", async(req, res) => {
    try {
        const adminRegister = new Administer(req.body);
        console.log(adminRegister)
        await Administer.register(adminRegister, req.body.password,(err)=>{
            if(err){
            throw err
        }
        res.redirect("/")
    })
} catch (error) {
    res.status(400).send("user not registered")
    console.log(error)
}
});
module.exports = router;