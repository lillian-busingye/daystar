const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const sitterregistrationSchema = new mongoose.Schema({
name:{
    type:String,
    trim:true
},
location:{
    type:String,
    trim:true
},
kin:{
    type:String,
    trim:true
},
phone:{
    type:Number,
    trim:true
},
age:{
    type:String,
    trim:true
},
education:{
    type:String,
    trim:true
},
nin:{
    type:String,
    trim:true
},
contact:{
    type:Number
    trim:true
}

});
// sitterregistrationSchema.plugin(passportLocalMongoose, {
//     usernameField:'email'
// });
module.exports = mongoose.model('sitterregistrations', sitterregistrationSchema );