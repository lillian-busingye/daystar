const mongoose = require("mongoose");

const purchaseSchema = mongoose.Schema({
    item:{
        type:String,
        trim:true
    },
    unit:{
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
    dateOfPurchase:{
        type:String,
        trim:true
    }
});

module.exports = mongoose.model("purchaseRegister", purchaseSchema);
