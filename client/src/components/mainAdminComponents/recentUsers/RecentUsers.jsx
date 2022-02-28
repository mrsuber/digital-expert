import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {ViewPopUp} from '../../../components'
import './RecentUsers.css'

const RecentUsers = ({img1}) => {
  const [users, setUsers] = useState([])
  const [popup, setPopup] = useState(false)
  const [data, setData] = useState('')

  useEffect(()=>{
    const getInfo = async () =>{
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`
        }
      }
      try{
        const res= await axios.get("/api/private/getallusers",config);
        setUsers(res.data.data)
      }catch(error){}
    }


    getInfo()
  },[])

  const userPopup =(item)=>{
    setPopup(true)
    setData(item)
  }

  return (
    <div className="admin__recentCustomers">
    {popup?<ViewPopUp setPopup={setPopup} userInfo={data}/>:''}
    <div className="admin__cardHeader">
      <h2>Recent Registered Users</h2>
    </div>
    <table>
      <tbody>
      {
        users.slice(0, 10).reverse().map((item,index)=>(
          <tr className="user__container" key={index} onClick={()=>userPopup(item)}>
            <td className="admin__td"><div className="admin__imgBox"><img src={item.profilePic} alt="user" /></div></td>
            <td><h4>{item.username}<br/><span>{item.email}</span><br/><span>Admin status:{item.isAdmin?' True':' False'}</span></h4></td>

          </tr>

        ))
      }

      </tbody>
    </table>

    </div>
  )
}

export default RecentUsers
