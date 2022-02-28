import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDollarSign,faUsers,faTable,faArrowUp,faArrowDown} from '@fortawesome/free-solid-svg-icons';

import "./Card.css"
const Card = ({userCount, infoCount, increase, decrease}) => {
  return (
    <div className="admin__cardBox">
        <div className="admin__card">
          <div>
            <div className="admin__numbers">{userCount}</div>
            <div className="admin__cardName">Users count</div>
          </div>
          <div className="admin__iconBox"><FontAwesomeIcon icon={faUsers}/></div>
        </div>


        <div className="admin__card">
          <div>
            <div className="admin__numbers">{infoCount}</div>
            <div className="admin__cardName">Info input count</div>
          </div>
          <div className="admin__iconBox"><FontAwesomeIcon icon={faTable}/></div>
        </div>


        <div className="admin__card">
          <div>
            <div className="admin__numbers">{increase}</div>
            <div className="admin__cardName">User increase</div>
          </div>
          <div className="admin__iconBox"><FontAwesomeIcon icon={faArrowUp}/></div>
        </div>


        <div className="admin__card">
          <div>
            <div className="admin__numbers">{decrease}</div>
            <div className="admin__cardName">User decrease</div>
          </div>
          <div className="admin__iconBox"><FontAwesomeIcon icon={faArrowDown}/></div>
        </div>


    </div>
  )
}

export default Card
