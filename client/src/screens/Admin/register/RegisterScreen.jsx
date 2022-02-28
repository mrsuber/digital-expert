import React from 'react'
import {useState} from 'react'
import MaterialTable from 'material-table'
import {title, data, columns,tableIcons} from '../../../data/data'
import {Sidebar,Topbar} from '../../../components'
import {Delete,Edit,ZoomIn} from '@material-ui/icons';
import {Link} from 'react-router-dom'

import axios from 'axios'


const RegisterScreen = ({history}) => {
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [confirmpassword,setConfirmpassword]=useState('')
  const [error,setError]=useState('')


  const registerHandler= async (e)=>{

    e.preventDefault()
    const config = {
      header:{
        "Content-Type":"application/json"
      }
    }
    if(password!==confirmpassword){
      setPassword("")
      setConfirmpassword("")
      setTimeout(()=>{
        setError("")
      },5000)
      return setError("Password do not match")
    }

    try{
       const {data}= await axios.post("/api/auth/register",{username,email,password},config);
       localStorage.setItem("userRegistrationStatus",data.success)
       history.push("/")
    }catch(error){
      setError(error.response.data.error)
        setTimeout(()=>{
          setError("")
        },5000)
    }
  }
  return (

    <>
    <Sidebar history={history} />
    <div className="admin__main">
        <Topbar />

        <div className="register-container">
        <div className="align">
            <div class="register-box">

              <h2>Register</h2>
              {error && <span className="error-message">{error}</span>}
              <form onSubmit={registerHandler} >
                <div class="user-box">
                    <input type="text" name="name" id="name"required="" value={username} onChange={(e) =>setUsername(e.target.value)}/>
                    <label htmlFor="name">Username</label>
                </div>
                <div class="user-box">
                    <input type="email" name="email" id="email" required=""  value={email} onChange={(e) =>setEmail(e.target.value)}/>
                    <label htmlFor="email">Email</label>
                </div>
                <div class="user-box">
                  <input type="password" name="password" id="password" required="" value={password} onChange={(e) =>setPassword(e.target.value)}/>
                  <label htmlFor="password">Password</label>
                </div>
                <div class="user-box">
                  <input type="password" name="password" id="confirmpassword" required="" value={confirmpassword} onChange={(e) =>setConfirmpassword(e.target.value)}/>
                  <label htmlFor="confirmpassword">Confirm Password</label>
                </div>
                <div className="register-button-container">
                <button type="submit" className="submit-btn">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Register
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

export default RegisterScreen
