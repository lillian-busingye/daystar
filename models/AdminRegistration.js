const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const registeradminSchema = new mongoose.Schema({
email:{
    type:String,
    trim:true
},
username:{
    type:String,
    trim:true
},
// password:{
//     type:String,
//     trim:true
// },
role:{
    type:String,
    trim:true
}
});
registeradminSchema.plugin(passportLocalMongoose, {
    usernameField:'email'
});
module.exports = mongoose.model('AdminRegistration', registeradminSchema );