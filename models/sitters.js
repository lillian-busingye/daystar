const mongoose = require("mongoose");
//Access the schema in mongoose function 

const sittersSchema = new mongoose.Schema({
  name:{
   type:String,
   trim:true  
  },
  gender:{
    type:String,
    trim:true  
   },
  email:{
    type:String,
    trim:true  
  },
  dateofBirth:{
    type:String,
    trim:true  
  },
  nextofKin:{
    type:String,
    trim:true  
  },
  nin:{
    type:String,
    trim:true  
  },
  religion:{
    type:String,
    trim:true  
  },
  recommendersname:{
    type:String,
    trim:true  
  },
  levelofeducation:{
    type:String,
    trim:true  
  },
  phonenumber:{
    type:String,
    trim:true  
  },

  currentAddress:{
    type:String,
    trim:true  
  },

  Experience:{
    type:String,
    trim:true  
  }, 
  sitternumber:{
    type:Number,
    trim:true  
  }, 
  Availability:{
    type:String,
    trim:true  
  },
  role:{
    type:String,
    trim:true  
  },
  timeofArrival:{
    type:String,
    trim:true  
  },
  timeofDeparture:{
    type:String,
    trim:true  
  },
  status:{
    type:String,
    enum:['Present', 'Absent'],
    trim:true  
  }

});

module.exports = mongoose.model("sitters", sittersSchema);

