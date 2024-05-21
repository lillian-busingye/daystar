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
 gender:{
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
 },
 babyNumber:{
   type:String,
   trim:true
},
personBrought: {
   type: String,
   trim: true
 },
 contactBrought: {
   type: String,
   trim:true
 },
 periodOfStay: {
   type: String,
   enum: ["Full Day(UGX 15,000)", "Half Day(UGX 10,000)"] // Specifies the periodOfStay
 },
 sitter: {
   type: String,
   trim: true
   // type: mongoose.Schema.Types.ObjectId,
   // ref: "sitters"
 },
 checkinTime: {
   type: String,
   trim: true
 },
 personPickingUp:{
   type: String,
   trim: true
 },
 contactNumber:{
   type: String,
   trim: true
 },
 checkoutTime: {
   type: String,
   trim:true
 },
 eventType: {
   type: String,
   enum: ["checkin", "checkout"],
   trim: true
 },
 checkoutNotes: {
   type: String
 }

});
module.exports = mongoose.model('baby', babySchema );