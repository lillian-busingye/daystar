const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');

const babySchema = new mongoose.Schema({
 name:{
    type:String,
    trim:true
 },
 date:{
    type:String,
    trim:true
 },
 parent:{
    type:String,
    trim:true
 },
 contact:{
    type:String,
    trim:true
 },
 email:{
    type:String,
    trim:true
 },
 address:{
    type:String,
    trim:true
 }

});
module.exports = mongoose.model('baby', babySchema );