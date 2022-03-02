import React,{useEffect,useState,useRef} from 'react'
import './ViewPopUp.css'
import axios from 'axios'

import {useReactToPrint} from 'react-to-print';



const ViewPopUp = ({setPopup,userInfo,info,download}) => {
  const [error,setError] =useState("")
  const [infos,setInfos]=useState([]);

useEffect(()=>{
  if(info) { const fetchUserInfo = async () =>{
      const id = info.UserId
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`
        }
      }
      try{
        const {data} = await axios.get(`/api/private/finduser/${id}`,config)

        setInfos(data.data)

      }catch(error){

        localStorage.removeItem("authToken")
        setError("You are not authorized please login")
      }
    }

    fetchUserInfo()
  }
},[info])

const componentRef = useRef();
const handlePrint = useReactToPrint({
  content: ()=>componentRef.current,
})

const print = (id) =>{


    let restorepage = document.body.innerHTML;
    let printcontent = document.getElementById(id)
    // document.body.innerHTML = printcontent;
    // window.print();
    // document.body.innerHTML=restorepage


}


  return (
    <div className="social2__select_family_card_wrapper" >


          {userInfo && <div className="social2__select_family_card">


          <div className="profile">
      <figure>
      <img src={userInfo.profilePic} alt=""/>
      </figure>
      <header>
      <h1>{userInfo.username}
      <small>{userInfo.email}</small></h1>
      </header>


      <main className="main">
      <dl>
      <dt>User Name</dt>
        <dd>{userInfo.username}</dd>
      <dt>Email</dt>
        <dd>{userInfo.email}</dd>

      </dl>
      </main>

      </div>
              <button className="popup__button" onClick={()=>setPopup(false)}>back</button>
          </div>}

          {info && <div className="social2__select_family_card">

          <div className="profile" id="print-section" ref={componentRef}>
      <figure>
      <img src={infos.profilePic? infos.profilePic : ''} alt=""/>
      </figure>
      <header>
      <h1> Submited by :{infos.username? infos.username : ''}
      <small>{infos.email? infos.email : ''}</small></h1>
      </header>


      <main className="main">
      <dl>
      <dt>Full name</dt>
        <dd>{info.FirstName}{' '}{info.LastName}</dd>
        <dt>Mothers name</dt>
          <dd>{info.MotherName}</dd>
          <dt>Phone Number</dt>
            <dd>{info.PhoneNumber}</dd>
      <dt>Date of birth</dt>
        <dd>{info.DateOfBirth}</dd>
        <dt>Place of birth</dt>
          <dd>{info.PlaceOfBirth}</dd>
          <dt>Region</dt>
            <dd>{info.Region}</dd>
            <dt>Residence</dt>
              <dd>{info.Residence}</dd>
              <hr  className="id_photo_title1" />
              <dt className="id_photo_title ">Front Id Image</dt>
                <dd>

                <img src={info.files[0].filePath} className="id__photo" alt=''/>

                </dd>
                <dt  className="id_photo_title">Back Id Image</dt>
                  <dd>

                  <img src={info.files[1].filePath} className="id__photo" alt=''/>

                  </dd>
                  <dt  className="id_photo_title">Photo</dt>
                    <dd>

                    <img src={info.files[2].filePath} className="id__photo" alt=''/>

                    </dd>

      </dl>

      </main>

      </div>


              <div className="popup__button_container">
              <button className="popup__button" onClick={()=>setPopup(false)}>back</button>
              <button className="popup__button" onClick={handlePrint}>print</button>
              </div>
          </div>}

          {download && <div className="social2__select_family_card">


          <div className="profile">
          <div className="popup__button_container">
          <a style={{textAlign:"center",textDecoration:'none'}}  className="popup__button" onClick={()=>setPopup(false)}>back</a>
          <a href={download.path} target="__blank" className="popup__button" style={{textAlign:"center",textDecoration:'none'}}>Download</a>
          </div>
          </div>
          </div>

        }



    </div>
  )
}

export default ViewPopUp
