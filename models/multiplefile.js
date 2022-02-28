const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const multipleFileSchema = new Schema({
  UserId:{type:String,required:true},
  FirstName:{type:String,required:true},
  LastName:{type:String,required:true},

  DateOfBirth:{type:String,required:true},
  PlaceOfBirth:{type:String,required:true},
  MotherName:{type:String,required:true},
  PhoneNumber:{type:String,required:true},
  IdCardNumber:{type:String,required:true},
  Region:{type:String,required:true},
  Residence:{type:String,required:true},
  // IdCardFront:{type:String,required:true},
  // IdCardBack:{type:String,required:true},
  // Passport1:{type:String,required:true},
  files:[Object]
},{timestamps:true});

module.exports= mongoose.model('MultipleFiles',multipleFileSchema)
