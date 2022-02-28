import React from 'react'
import './Toast.css'
const Toast = ({msg,handleShow,bgColor}) => {
  return (
    <div className={`social2-toast ${bgColor}` }  >
    <div className={`social2-toast-header ${bgColor}`} >
    <strong className="social2-toast-title">{msg.title}</strong>
    <button onClick={handleShow} className={`social2ToastTitleButton ${bgColor}`}  data-dismiss="social2ToastTitleButtonDismiss">
    &times;
    </button>
    </div>

    <div className="social2-toast-body">
    {msg.body}
    </div>

    </div>
  )
}

export default Toast
