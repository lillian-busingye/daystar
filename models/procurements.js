const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const procurementSchema = new mongoose.Schema({
item:{
    type:String,
    trim:true
},
quantity:{
    type:Number,
    trim:true
},
description:{
    type:String,
    trim:true
}
});
// procurementSchema.plugin(passportLocalMongoose, {
//     usernameField:'email'
// });
module.exports = mongoose.model('procurements', procurementSchema );