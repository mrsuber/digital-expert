import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'

import MaterialTable from 'material-table'
import {title,tableIcons} from '../../../data/data'
import {Sidebar,Topbar,ViewPopUp} from '../../../components'
import {Delete,Edit,ZoomIn} from '@material-ui/icons';
import {Link} from 'react-router-dom'

const UserScreen = ({history}) => {

  const [users, setUsers] = useState([])
  const [error,setError] =useState("")
  const [userInfo,setUserInfo]=useState([]);
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
fetchUserInfo()
  },[])
  let columns = [

        {title:"UserName",field:"username"},
        {title:"Email",field:"email"},


      ]
      const userPopup =(item)=>{
        setPopup(true)
        setData(item)
      }

      const deleteInfo = async (info) =>{
        if(userInfo.isAdmin===false){
          return alert("you are not admin")
        }
        if (window.confirm("Do you really want to delete?")) {
          let id = info._id
          setUsers(prevUsers => {
            return prevUsers.filter(user => user._id !== id)
          })
          const config = {
            headers:{
              "Content-Type":"application/json",
              Authorization:`Bearer ${localStorage.getItem("authToken")}`
            }
          }
          try{
            const res= await axios.delete(`/api/private/deleteuser/${id}`,config);

          }catch(error){

          }
        }

      }

  const actions = [
   { icon: ZoomIn, tooltip: 'View', onClick: (event, rowData) => userPopup(rowData)},
   { icon: Delete, tooltip: 'Delete', onClick: (event, rowData) => deleteInfo(rowData)}
]
  return (

    <>
    <Sidebar history={history} />
    <div className="admin__main">
    {popup?<ViewPopUp setPopup={setPopup} userInfo={data}/>:''}
    {userInfo
      ?<Topbar avatar={userInfo.profilePic} loading={false}/>
      :<Topbar avatar={userInfo.profilePic} loading={true}/>
    }

            <div>
              <Link className="add__user" to="/register">Add User</Link>
            </div>
          <div className="material__table_container">

          <MaterialTable
           icons={tableIcons}
           columns={columns}
           data={users}
           title="Users List"
           actions = {actions}
           />
          </div>

        </div>
        </>
  )
}

export default UserScreen
