import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTable,faHome,faUsers,faLock,faSignOutAlt,faUserPlus,faFileUpload} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom'
import logo from '../../../images/mainlogo.jpeg'
import './Sidebar.css'

const Sidebar = ({history}) => {

  const logoutHandler=()=>{
    localStorage.removeItem("authToken")
    localStorage.removeItem("someRandomNumber")
    localStorage.removeItem("someName")
    history.push("/login")
  }
  return (
    <div className="admin">
      <div className="admin__container">
        <div className="admin__navigation">
          <ul>
            <li className="logoTitle">
            <Link to="/" className="link">
              <span className="admin__icon"><img src={logo} alt="digital experts" className="logo"/></span>
              <span className="admin__title"><h2>Digital Experts</h2></span>
              </Link>
            </li>

            <li>
            <Link to="/" className="link">
              <span className="admin__icon"><FontAwesomeIcon icon={faHome} /></span>
              <span className="admin__title">Dashboard</span>
              </Link>
            </li>
            <li>
            <Link to="/users" className="link">
              <span className="admin__icon"><FontAwesomeIcon icon={faUsers} /></span>
              <span className="admin__title">Users</span>
              </Link>
            </li>
            <li>
            <Link to="/infos" className="link">
              <span className="admin__icon"><FontAwesomeIcon icon={faTable} /></span>
              <span className="admin__title">Info input</span>
              </Link>
            </li>



            <li>
            <Link to="/password" className="link">
              <span className="admin__icon"><FontAwesomeIcon icon={faLock} /></span>
              <span className="admin__title">Account Update</span>
              </Link>
            </li>

            <li>
            <Link to="/register" className="link">
              <span className="admin__icon"><FontAwesomeIcon icon={faUserPlus} /></span>
              <span className="admin__title">Add User</span>
              </Link>
            </li>
            <li>
            <Link to="/addInfo" className="link">
              <span className="admin__icon"><FontAwesomeIcon icon={faFileUpload} /></span>
              <span className="admin__title">Upload Info</span>
              </Link>
            </li>

            <li onClick={logoutHandler}>
            <Link to="/" className="link">
              <span className="admin__icon"><FontAwesomeIcon icon={faSignOutAlt} /></span>
              <span className="admin__title">Sign Out</span>
              </Link>
            </li>
          </ul>
        </div>



      </div>
    </div>
  )
}

export default Sidebar
