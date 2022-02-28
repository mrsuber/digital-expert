import './LoginScreen.css'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Toast} from '../../../components'
import logo from '../../../images/mainlogo.jpeg'
const LoginScreen = ({history}) => {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  const [popupErrors, setPopupErrors]=([])
  const [show,setShow]=useState(false)

  useEffect(()=>{
    if(localStorage.getItem("authToken")){
      history.push("/")
    }
  },[history])


  const loginHandler= async (e)=>{
    e.preventDefault()
    const config = {
      header:{
        "Content-Type":"application/json"
      }
    }


    try{
       const {data}= await axios.post("/api/auth/login",{email,password},config);
       localStorage.setItem("authToken",data.token)
       localStorage.setItem("someRandomNumber", data.userId)
       localStorage.setItem("someName", data.username)
       history.push("/")
    }catch(error){
      // setPopupErrors(error.response.data)
      setShow(true)
      setError(error.response.data)


    }
  }

let msg = {
  title:"Error",
  body: error.msg
}

const handleShow =()=>{
  setShow(false)
}

  return (
    <>
    <div className="login-container">
     { show ? <Toast msg={msg} bgColor="social2-toast-red" handleShow={handleShow}/> : ''}
    <div className="align " id="login2">

        <div className="login-box">
        <div className="login_title_container">
        <span className="login__icon"><img src={logo} alt="digital experts" className="logo"/></span>
        <span className="login__title"><h2>Login</h2></span>

        </div>


          <form onSubmit={loginHandler} >
            <div class="user-box">
                <input type="text" name="" required=""  value={email} onChange={(e) =>setEmail(e.target.value)} tabIndex={1}/>
                <label>Email</label>
            </div>
            <div class="user-box">
              <input type="password" name="" required="" value={password} onChange={(e) =>setPassword(e.target.value)} tabIndex={2} />
              <label>Password</label>
            </div>
            <button type="submit" className="submit-btn">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Submit
            </button>
        </form>
      </div>
  </div>
  </div>


    </>
  )
}

export default LoginScreen
