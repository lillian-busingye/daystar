const mongoose = require("mongoose");
const passportlocalmongoose = require("passport-local-mongoose")
//Access the schema in mongoose function 

const administerSchema = new mongoose.Schema({
  Fullname:{
    type:String,
    trim:true
  },
   
  email:{
    type:String,
    trim:true
  },
  
  role:{
    type:String,
    trim:true 
  },
  password:{
    type:String,
    trim:true
  },

  confirmPassword:{
    type:String,
    trim:true
  },
})

administerSchema.plugin(passportlocalmongoose, {
    usernameField:"email" 
})
module.exports = mongoose.model("Administer", administerSchema)