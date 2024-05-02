const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const paymentsSchema = new mongoose.Schema({
name:{
    type:String,
    trim:true
},
email:{
    type:String,
    trim:true
},
number:{
    type:Number,
    trim:true
},
nin:{
    type:Number,
    trim:true
},
baby:{
    type:String,
    trim:true
},
amount:{
    type:String,
    trim:true
},
age:{
    type:String,
    trim:true
},
kin:{
    type:String,
    trim:true
},
contact:{
    type:Number,
    trim:true
},
card:{
    type:String,
    trim:true
}

});
// paymentsSchema.plugin(passportLocalMongoose, {
//     usernameField:'email'
// });
module.exports = mongoose.model('paymentss', paymentsSchema );