import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {ViewPopUp} from '../../../components'

const RecentInfoInput = () => {
  const [info, setInfo] = useState([])
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
        const res= await axios.get("/api/fileupload/getallMultipleFiles",config);
        setInfo(res.data)

      }catch(error){}
    }


    getInfo()
  },[])

  const userPopup =(item)=>{
    setPopup(true)
    setData(item)
  }

  return (
    <div className="admin__recentOrder">
    {popup?<ViewPopUp setPopup={setPopup} info={data}/>:''}
      <div className="admin__cardHeader">
        <h2>Recent Information</h2>
        <Link to="/infos" className="admin__btn">View all</Link>
      </div>
      <table>

        <thead>
          <tr>
            <td>FirstName</td>
            <td>LastName</td>
            <td>Region</td>
            <td>Residence</td>





          </tr>
        </thead>
        <tbody>
        {
          info.reverse().slice(0, 10).map((item,index)=>(
            <tr key={index} onClick={()=>userPopup(item)}>
              <td>{item.FirstName}</td>
              <td>{item.LastName}</td>
              <td>{item.Region}</td>
              <td>{item.Residence}</td>
            </tr>

          ))
        }

        </tbody>
      </table>
    </div>
  )
}

export default RecentInfoInput
