const User = require('../models/User')
const Prodject=require('../models/Prodject')

const bcrypt = require('bcryptjs')
const ErrorResponse = require('../utils/errorResponse')
var ObjectId = require('mongoose').Types.ObjectId;


//update user

exports.updateUser= async (req,res,next)=>{

  if(req.body.password){
    const salt =await bcrypt.genSalt(10)
    req.body.password=await bcrypt.hash(req.body.password,salt)
  }

  if(req.body.isAdmin && !req.user.isAdmin){
    return next(new ErrorResponse("Only Admin has privilage", 400))
  }


  //now we are working with database
  try{
    const user= await User.findByIdAndUpdate((req.params.id),{ $set:req.body },{new:true})
    res.status(201).json({success:true,data:"User update successfull"})

  }catch(error){
    next(error)

  }
}

//delet user

exports.deleteUser= async (req,res,next)=>{
  //now we are working with database
  try{
     await User.findByIdAndDelete(req.params.id)
    res.status(201).json({success:true,data:"User has been deleted ...."})

  }catch(error){
    next(error)

  }
}

//find user
exports.findUser= async (req,res,next)=>{
  //now we are working with database
  try{
     const user = await User.findById(req.params.id)
    res.status(201).json({success:true,data:user})

  }catch(error){
    next(error)

  }
}

//find all users
exports.getAllUsers= async (req,res,next)=>{
  const query = req.query.new;
  //now we are working with database
  try{
     const users = query? await User.find().sort({_id:-1}).limit(10) : await User.find()
    res.status(201).json({success:true,data:users})

  }catch(error){
    next(error)

  }
}



//management of prodjects
//create Prodject
exports.createNewProdject = async (req,res,next) =>{

  try{
    const prodject = await Prodject.create({
      SubmitedBy:req.body.SubmitedBy,
      FirstName:req.body.FirstName,
      LastName:req.body.LastName,
      DateOfBirth:req.body.DateOfBirth,
      PlaceOfBirth:req.body.PlaceOfBirth,
      MotherName:req.body.MotherName,
      PhoneNumber:req.body.PhoneNumber,
      IdCardNumber:req.body.IdCardNumber,
      Region:req.body.Region,
      Residence:req.body.Residence,
      Images:req.body.Images,



    });
    // await prodject.save();
    // const newProdject = await Prodject.create(req.body)
    // const saveProdject = await prodject.save()
    res.status(200).json({success:true, data:prodject})
  }catch(error){next(error)}

}

//updateProdject
exports.updateProdject = async (req,res,next) =>{
  try{
    const updateProdject = await Prodject.findByIdAndUpdate({_id:(req.params.prodjectId)},{$set:req.body},{new:true})
    res.status(200).json({success:true,updateProdject})
  }catch(error){next(error)}

}

//delet pordject
exports.deleteProdject = async (req,res,next) =>{
  try{
  await Prodject.findByIdAndDelete((req.params.prodjectId))
    res.status(200).json({success:true,data:"Prodject deleted"})
  }catch(error){next(error)}

}

//get a Prodject
exports.getAProdject = async (req,res,next) =>{
  try{
  const prodject = await Prodject.findById({ _id: ObjectId(req.params.prodjectId)})

    res.status(200).json({success:true,data:prodject})
  }catch(error){next(error)}

}

//get all Prodject
exports.getAllProdject = async (req,res,next) =>{
  try{
  const prodject = await Prodject.find()
    res.status(200).json({success:true,data:prodject.reverse()})
  }catch(error){next(error)}

}


//get random prodject
exports.getRandomProdject = async (req,res,next) =>{

  let prodject;
  try{

      prodject=await Prodject.aggregate([
        {$match:{active:true}},
        {$sample:{size:1}}
      ])

    res.status(200).json({success:true,data:prodject})
  }catch(error){next(error)}

}






exports.getPrivateData = (req,res,next) =>{
  res.status(200).json(
    {
      sucess:true,
      data:"You got access to the private data in this route",

    }
  )
}
