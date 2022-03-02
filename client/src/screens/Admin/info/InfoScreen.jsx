import React from 'react'
import {useState,useEffect} from 'react'
import MaterialTable from 'material-table'
import {title,tableIcons} from '../../../data/data'
import {Sidebar,Topbar,ViewPopUp} from '../../../components'
import {Delete,Edit,ZoomIn,CloudDownload,PrintOutlined} from '@material-ui/icons';
import {Link} from 'react-router-dom'
import axios from 'axios'
// import XLSX from 'xlsx'
import * as XLSX from 'xlsx/xlsx.mjs';
import jsPDF from 'jspdf'
import 'jspdf-autotable'


const InfoScreen = ({history}) => {
  const [info, setInfo] = useState([])
  const [tableData,setTableData]=useState(info)
  const [columsData,setColumsData] = useState(info)
const [error,setError] =useState("")
  const [userInfo,setUserInfo]=useState([]);

  const [allUsers, setAllUsers] = useState([])
  const [popup, setPopup] = useState(false)
  const [data, setData] = useState('')
  const [download, setDownload] = useState('')

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

  useEffect(()=>{
    const getInfo = async () =>{
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`

        }
      }
      try{
        const res= await axios.get("/api/fileupload/getallMultipleFiles",config);
        setInfo(res.data)


      }catch(error){}
    }


    getInfo()
  },[])


  const userPopup =(item)=>{

    setData(item)
    setDownload('')
    setPopup(true)
  }



  const deleteInfo = async (info) =>{
    if(userInfo.isAdmin===false){
      return alert("you are not admin")
    }
    if (window.confirm("Do you really want to delete?")) {
      let id = info._id
      setInfo(prevInfo => {
        return prevInfo.filter(info => info._id !== id)
      })
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`
        }
      }
      try{
        const res= await axios.delete(`/api/private/deleteprodject/${id}`,config);

      }catch(error){

      }

}



  }
  const actions = [
   { icon: ZoomIn, tooltip: 'View', onClick: (event, rowData) => userPopup(rowData)},
   { icon: Delete, tooltip: 'Delete', onClick: (event, rowData) => deleteInfo(rowData)},
   { icon: CloudDownload, tooltip: 'Export to excel',isFreeAction: true, onClick: () => downloadExcel("clicked")},
   { icon: PrintOutlined, tooltip: 'Export to PDF',isFreeAction: true, onClick: () => downloadPDF("clicked")}
]

let columns = [

      {title:"FirstName",field:"FirstName"},
      {title:"LastName",field:"LastName"},
      {title:"DateOfBirth",field:"DateOfBirth", align:"center"},
      {title:"IdCardNumber",field:"IdCardNumber",emptyValue:()=><em>null</em>},
      {title:"MotherName",field:"MotherName"},
      {title:"PhoneNumber",field:"PhoneNumber"},
      {title:"PlaceOfBirth",field:"PlaceOfBirth"},

      {title:"Region",field:"Region"},
      {title:"Residence",field:"Residence"}

    ]

  const downloadExcel = () =>{
    const newData= info.map(row=>{
      delete row.tableData
      delete row._id
      delete row.UserId
      delete row.files
      delete row.createdAt
      delete row.updatedAt
      delete row.__v
      return row
    })
    const worksheet = XLSX.utils.json_to_sheet(newData)
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(workbook,worksheet,"Information")
    //buffer
    let buffer = XLSX.write(workbook,{bookType:"xlsx", type:"buffer"})
    //binary string
    XLSX.write(workbook,{bookType:'xlsx',type:'binary'})
//download
    XLSX.writeFile(workbook,"IdData.xlsx")
  }




// var base64 = getBase64Image(document.getElementById("imageid"));
  const downloadPDF = async()=>{
    const config = {
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${localStorage.getItem("authToken")}`

      }
    }
    try{
      const res= await axios.get("/download",config);
      if(res){
        setDownload(res.data)
        setData('')
        setPopup(true)
      }



    }catch(error){}
  }



  return (
    <>
    <Sidebar history={history} />
    <div className="admin__main">
    {popup?<ViewPopUp setPopup={setPopup} info={data} download={download}/>:'' }
      {userInfo
        ?<Topbar avatar={userInfo.profilePic} loading={false}/>
        :<Topbar avatar={userInfo.profilePic} loading={true}/>
      }
        <div>
          <Link className="add__user" to="/addInfo">Add Info</Link>
        </div>

          <div className="material__table_container">

          <MaterialTable
          icons={tableIcons}
          columns={columns}
          data={info}
          title="Information list"
          actions={actions}
          // options={{
          //   selection: true
          // }}
          />
          </div>

        </div>
        </>
  )
}

export default InfoScreen
