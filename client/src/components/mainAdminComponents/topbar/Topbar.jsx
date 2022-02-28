import React from 'react'
import './Topbar.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSearch,faBars} from '@fortawesome/free-solid-svg-icons';



const Topbar = ({avatar,loading}) => {

  function toggleMenu(){
    let toggle = document.querySelector('.admin__topbar')
    let navigation = document.querySelector('.admin__navigation')
    let main = document.querySelector('.admin__main')

    toggle.classList.toggle('admin__active')
    navigation.classList.toggle('admin__active')
    main.classList.toggle('admin__active')

  }

  return (
    <div className="admin__topbar">
      <div className="admin__toggle" onClick={toggleMenu}><FontAwesomeIcon icon={faBars}/></div>

        <div className="admin__user">
          {loading===true
            ?<>Loading ...</>
            :<img src={avatar} alt="profile"/>}
        </div>
      </div>
  )
}

export default Topbar
