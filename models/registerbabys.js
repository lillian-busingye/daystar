const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const registerbabySchema = new mongoose.Schema({
name:{
    type:String,
    trim:true
},
age:{
    type:String,
    trim:true
},
parent:{
    type:String,
    trim:true
},
contact:{
    type:Number,
    trim:true
},
address:{
    type:String,
    trim:true
},
kin:{
    type:String,
    trim:true
},

});
// registerbabySchema.plugin(passportLocalMongoose, {
//     usernameField:'email'
// });
module.exports = mongoose.model('registerbabys', registerbabySchema );