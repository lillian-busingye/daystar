const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const checkinandoutSchema = new mongoose.Schema({
name:{
    type:String,
    trim:true
},
location:{
    type:String,
    trim:true
},
contact:{
    type:Number,
    trim:true
},
nin:{
    type:String,
    trim:true
},
reason:{
    type:String,
    trim:true
},
date:{
    type:String,
    trim:true
},
in:{
    type:String,
    trim:true
},
out:{
    type:String,
    trim:true
}

});
// checkinandoutSchema.plugin(passportLocalMongoose, {
//     usernameField:'email'
// });
module.exports = mongoose.model('checkinsandcheckouts', checkinandoutSchema);