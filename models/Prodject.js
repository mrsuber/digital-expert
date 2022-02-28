const mongoose = require("mongoose")

const ProdjectSchema = new mongoose.Schema(
  {
    SubmitedBy:{type:String,required:true},
    FirstName:{type:String,required:true},
    LastName:{type:String,required:true},

    DateOfBirth:{type:String,required:true},
    PlaceOfBirth:{type:String,required:true},
    MotherName:{type:String,required:true},
    PhoneNumber:{type:String,required:true},
    IdCardNumber:{type:String,required:true},
    Region:{type:String,required:true},
    Residence:{type:String,required:true},
    Images:{
      type:Array,
      required:true
    }
},
{timestamps:true}
);

module.exports = mongoose.model("Prodject",ProdjectSchema)
