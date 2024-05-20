const mongoose = require("mongoose");

const dollRegistrationSchema = mongoose.Schema({
    dollName:{
        type:String,
        trim:true
    },
    quantity:{
        type:Number,
        trim:true
    },
    rate:{
        type:Number,
        trim:true
    },
    amount:{
        type:Number,
        trim:true
    },
    imageUpload:{
        type:String,
    },
    dateOfPurchase:{
        type:Date,
        trim:true
    },
    dateOfSell:{
        type:Date,
        trim:true
    },
description:{
        type:String,
        trim:true
    },
    status:{
        type:String,
        default:"Available",
        enum:["Available", "Sold"],
    }
});

module.exports = mongoose.model("DollRegister", dollRegistrationSchema);