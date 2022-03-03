'use strict'
const SingleFile = require('../models/singlefile')
const MultipleFile = require('../models/multiplefile')

const singleFileUpload = async (req,res,next) =>{

  try{

    const file = new SingleFile({
      fileName:req.file.originalname,
      filePath:req.file.path,
      fileType:req.file.mimetype,
      fileSize:fileSizeFormatter(req.file.size,2) //0.00

    });
    await file.save();
    res.status(201).send('File Uploaded Successfully')
  }catch(error){
    res.status(400).send(error.message)
  }
}

const multipleFileUpload = async (req,res,next) =>{


  if(!req.body.id){
    return res.status(400).json({msg:"please upload user id"})

  }
if(!req.body.firstName){
  return res.status(400).json({msg:"please enter first name"})

}
if(!req.body.lastName){
  return res.status(400).json({msg:"please enter last name"})

}
if(!req.body.dateOfBirth){
  return res.status(400).json({msg:"please enter date of birth"})

}
if(!req.body.placeOfBirth){
  return res.status(400).json({msg:"please place of birth"})

}
if(!req.body.motherName){
  return res.status(400).json({msg:"please enter mother name"})

}
if(!req.body.phoneNumber){
  return res.status(400).json({msg:"please Phone number"})

}
if(!req.body.idCardNumber){
  return res.status(400).json({msg:"please id card number"})

}
if(!req.body.region){
  return res.status(400).json({msg:"please enter region"})

}
if(!req.body.residence){
  return res.status(400).json({msg:"please residence"})

}
  try{
    let filesArray =[]
    let count = 0
    req.files.forEach(element =>{
      count = count+1
      const file = {
        fileName:element.originalname,
        filePath:element.path,
        fileType:element.mimetype,
        fileSize:fileSizeFormatter(element.size,2)
      }
      filesArray.push(file)


    });
    if(count===0){
      return res.status(400).json({msg:"please upload files"})
    }
    if(count!==3){
      return res.status(400).json({msg:"please upload all files"})
    }

    const multipleFiles = new MultipleFile({

      UserId:req.body.id,
      FirstName:req.body.firstName,
      LastName:req.body.lastName,
      DateOfBirth:req.body.dateOfBirth,
      PlaceOfBirth:req.body.placeOfBirth,
      MotherName:req.body.motherName,
      PhoneNumber:req.body.phoneNumber,
      IdCardNumber:req.body.idCardNumber,
      Region:req.body.region,
      Residence:req.body.residence,
      files:filesArray
    });
    await multipleFiles.save()
    res.status(201).json({msg:'success'})
  }catch(error){
    res.status(422).send(error)
  }
}

const getallSingleFiles = async (req,res,next)=>{
  try{
    const files = await SingleFile.find()
    res.status(201).send(files)
  }catch(error){
    res.status(400).send(error.message )
  }
}

const getallMultipleFiles = async (req,res,next)=>{
  try{
    const files = await MultipleFile.find()
    res.status(201).send(files)
  }catch(error){
    res.status(401).send(error.message )
  }
}


const fileSizeFormatter= (bytes,decimal) =>{
  if(bytes===0){
    return '0 Bytes'
  }
  const dm = decimal || 2
  const sizes = ['Bytes','KB','MB','GB','TB','PB','EB','YB','ZB']
  const index= Math.floor(Math.log(bytes)/Math.log(1000));
  return parseFloat((bytes / Math.pow(1000,index)).toFixed(dm)) + ' ' + sizes[index];
}

module.exports ={
  singleFileUpload,
  multipleFileUpload,
  getallSingleFiles,
  getallMultipleFiles
}
