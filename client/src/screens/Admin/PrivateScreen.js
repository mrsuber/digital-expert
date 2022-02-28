import {useState,useEffect} from 'react'
import axios from 'axios'
import img1 from '../../images/me.webp'
import {Sidebar1,Sidebar,Topbar,Card,RecentUsers,RecentInfoInput,ViewPopUp} from '../../components'

import './PrivateScreen.css'



const PrivateScreen = ({history}) => {
  const [error,setError] =useState("")
  const [userInfo,setUserInfo]=useState([]);
  const [allUsers, setAllUsers] = useState([])

  useEffect(()=>{
    if(!localStorage.getItem("authToken")){
      history.push("/login")
    }

    const fetchUserInfo = async () =>{
      const id = localStorage.getItem("someRandomNumber")
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`
        }
      }
      try{
        const {data} = await axios.get(`/api/private/finduser/${id}`,config)

        setUserInfo(data.data)

      }catch(error){

        localStorage.removeItem("authToken")
        setError("You are not authorized please login")
      }
    }
    const fectchAllUsers = async () =>{
      const id = localStorage.getItem("someRandomNumber")
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`
        }
      }
      try{
        const {data} = await axios.get(`/api/private/getallusers`,config)

        setAllUsers(data.data)

      }catch(error){

        localStorage.removeItem("authToken")
        setError("You are not authorized please login")
      }
    }
    if(userInfo.isAdmin===true){
      fectchAllUsers()
    }


    fetchUserInfo()
  },[history,userInfo.isAdmin])


  let infoCount=1
  let userCount=allUsers.length
  let increase=allUsers.length
  let decrease=0

  return (
    error? <span className="error-message">{error}</span>
    :
    <> {userInfo.isAdmin===false
      ?<>
        <Sidebar1 history={history} />

        <div className="admin__main">
            {userInfo
              ?<Topbar avatar={userInfo.profilePic} loading={false}/>
              :<Topbar avatar={userInfo.profilePic} loading={true}/>
            }
            <span className="error-message">You are not admin, your page is still under construction</span>
          </div>
      </>

    :  <>
    <Sidebar history={history} />
    <div className="admin__main">
        {userInfo
          ?<Topbar avatar={userInfo.profilePic} loading={false}/>
          :<Topbar avatar={userInfo.profilePic} loading={true}/>
        }

        <Card
        userCount={userCount}
         infoCount={infoCount}
         increase={increase}
         decrease={decrease}
        />
          <div className="admin__details">
            <RecentInfoInput />
            <RecentUsers img1={img1} />

          </div>
        </div>
        </>
      }

    </>

  )
}

export default PrivateScreen
