import React from 'react'
import {useState,useEffect} from 'react'
import MaterialTable from 'material-table'
import {title, data, columns,tableIcons} from '../../../data/data'
import {Sidebar,Topbar,Region} from '../../../components'
import {Delete,Edit,ZoomIn} from '@material-ui/icons';
import {Link} from 'react-router-dom'
import {db} from '../../../data/data'
import './AddInfo.css'
import axios from 'axios'
import {checkImage, imageUpload} from '../../../utils/imageUpload'
const OPTIONS= db.states

const AddInfo = ({history,changeModalVisibility,setData,selectRegion=false,selectRecident=false}) => {
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')
  const [dateOfBirth,setDateOfBirth]=useState('')
  const [placeOfBirth,setPlaceOfBirth]=useState('')
  const [motherName,setMotherName]=useState('')
  const [phoneNumber,setPhoneNumber]=useState('')
  const [idCardNumber,setIdCardNumber]=useState('')
  const [region,setRegion]=useState('')
  const [residence,setResidence]=useState('')
  const [idCardFront,setIdCardFront]=useState('')
  const [idCardBack,setIdCardBack]=useState('')
  const [passport1,setPassport1] = useState('')
  const [files,setFiles] = useState('')
  const [error,setError]=useState('')
  const [townData, setTownData] =useState([])
  const [townDataArray, setTownDataArray] =useState([])

  // FirstName: firstName,
  // LastName: lastName,
  // DateOfBirth: dateOfBirth,
  // PlaceOfBirth:,
  // MotherName:,
  // PhoneNumber:,
  // IdCardNumber:,
  // Region:,
  // Residence:,
  // IdCardFront: idCardFront,
  // IdCardBack: ,
  // Passport1: ,

  // const registerHandler= async (e)=>{
  //
  //   e.preventDefault()
  //   const config = {
  //     header:{
  //       "Content-Type":"application/json"
  //     }
  //   }
  //   if(password!==confirmpassword){
  //     setPassword("")
  //     setConfirmpassword("")
  //     setTimeout(()=>{
  //       setError("")
  //     },5000)
  //     return setError("Password do not match")
  //   }
  //
  //   try{
  //      const {data}= await axios.post("/api/auth/register",{username,email,password},config);
  //      localStorage.setItem("userRegistrationStatus",data.success)
  //      history.push("/")
  //   }catch(error){
  //     setError(error.response.data.error)
  //       setTimeout(()=>{
  //         setError("")
  //       },5000)
  //   }
  // }


const registerHandler = async(e)=>{
  e.preventDefault()
  const config = {
    headers:{
      "Content-Type":"application/json",
      Authorization:`Bearer ${localStorage.getItem("authToken")}`

    }
  }
  const id = localStorage.getItem("someRandomNumber")
  const err1 = checkImage(idCardFront)
  const err2 = checkImage(idCardBack)
  const err3 = checkImage(passport1)
  if (err1) {
    console.log(err1);

  }
  if (err2) {
    console.log(err1);
  }
  if (err3) {
    console.log(err1);
  }

  try{
  const images = await imageUpload([idCardFront, idCardBack, passport1]);


  let data={
    SubmitedBy: id,
    FirstName: firstName,
    LastName: lastName,
    DateOfBirth: dateOfBirth,
    PlaceOfBirth: placeOfBirth,
    MotherName: motherName,
    PhoneNumber: phoneNumber,
    IdCardNumber: idCardNumber,
    Region: region,
    Residence: residence,
    Images: images,
  }

     const res= await axios.post("/api/private/createnewprodject",data,config);
     console.log(res)
     history.push("/")
  }catch(error){
    // setError(error.response.data.error)
    //   setTimeout(()=>{
    //     setError("")
    //   },5000)

    console.log(error)
  }

}


const getState =(regionName)=>{
  setRegion(regionName)

}

useEffect(()=>{
  let town = {}

  for (let i = 0; i < OPTIONS.length; i++) {
    let state=OPTIONS[i];

    if (state.name === region) {
      town[region] = state.cities;

    }else continue;
  }

  setTownData(town)

},[region])

useEffect(()=>{
  if(townData){
    setTownDataArray(townData[Object.keys(townData)[0]])
  }
},[townData])

useEffect(()=>{
  let fileList ={}
  fileList[0]=idCardFront
  fileList[1]=idCardBack
  fileList[2]=passport1
  setFiles(fileList)
},[idCardFront,
idCardBack,
passport1])


  return (

    <>
    <Sidebar  />
    <div className="admin__main">
        <Topbar />

        <div className="register-container">
        <div className="align">
            <div class="register-box">

              <h2>Add Info</h2>
              {error && <span className="error-message">{error}</span>}
              <form onSubmit={registerHandler} >
                <div class="user-box">
                    <input type="text" name="firstname" id="firstname"required="" value={firstName} onChange={(e) =>setFirstName(e.target.value)}/>
                    <label htmlFor="firstname">First name</label>
                </div>
                <div class="user-box">
                    <input type="text" name="lastname" id="lastname"required="" value={lastName} onChange={(e) =>setLastName(e.target.value)}/>
                    <label htmlFor="lastname">First name</label>
                </div>
                <div class="user-box">
                    <input type="date" name="dateofbirth" id="dateofbirth"required="" value={dateOfBirth} onChange={(e) =>setDateOfBirth(e.target.value)}/>
                    <label htmlFor="dateofbirth">Date of birth</label>
                </div>
                <div class="user-box">
                    <input type="text" name="placeofbirth" id="placeofbirth"required="" value={placeOfBirth} onChange={(e) =>setPlaceOfBirth(e.target.value)}/>
                    <label htmlFor="placeofbirth">Place of birth</label>
                </div>
                <div class="user-box">
                    <input type="text" name="mothername" id="mothername"required="" value={motherName} onChange={(e) =>setMotherName(e.target.value)}/>
                    <label htmlFor="mothername">Mother Name</label>
                </div>
                <div class="user-box">
                    <input type="text" name="pMyComponenthonenumber" id="phonenumber"required="" value={phoneNumber} onChange={(e) =>setPhoneNumber(e.target.value)}/>
                    <label htmlFor="phonenumber">Phone Number</label>
                </div>
                <div class="user-box">
                    <input type="text" name="idcardnumber" id="idcardnumber"required="" value={idCardNumber} onChange={(e) =>setIdCardNumber(e.target.value)}/>
                    <label htmlFor="idcardnumber">Id card number</label>
                </div>
                <div class="user-box">
                  <select id="region" name="region" className="dropdownOption" onChange={(e) => getState(e.target.value)}>
                  <option selected>Select Region</option>
                  {
                    OPTIONS.map((option,index)=>(
                      <option key={index} value={option.name}>{option.name}</option>
                    ))
                  }
                  </select>
                  <label htmlFor="region">Choose Region</label>
                </div>

                <div class="user-box">
                  <select id="residence" name="residence" className="dropdownOption" onChange={(e) => setResidence(e.target.value)}>
                  {townDataArray?

                    townDataArray.map((option,index)=>(
                      <option key={index} value={option.name}>{option.name}</option>
                    ))

                  :<option selected>Select Region first</option>
                  }
                  </select>
                  <label htmlFor="residence">Choose Residence</label>
                </div>

                <div class="user-box">
                    <input type="file" name="idcardfront" id="idcardfront"  onChange={(e)=>setIdCardFront(e.target.files[0])} />
                    <label htmlFor="idcardfront">Id card Front Image</label>
                </div>

                <div class="user-box">
                    <input type="file" name="idcardback" id="idcardback"onChange={(e)=>setIdCardBack(e.target.files[0])} />
                    <label htmlFor="idcardback">Id card Back Image</label>
                </div>

                <div class="user-box">
                    <input type="file" name="idcardback" id="idcardback"onChange={(e)=>setPassport1(e.target.files[0])} />
                    <label htmlFor="idcardback">Passport Image</label>
                </div>

                <div className="register-button-container">
                <button type="submit" className="submit-btn">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Submit
                </button>
                </div>
            </form>
          </div>
      </div>
      </div>

        </div>
        </>
  )
}

export default AddInfo
