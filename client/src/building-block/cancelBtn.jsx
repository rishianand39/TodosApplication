import React from 'react'
import "../styles/scss/cancelBtn.scss"

const CancelBtn = ({cancel}) => {
  return (
    <>
       <button className="cancelBtn" onClick={()=>cancel(false)}>Cancel</button>
    </>
  )
}

export default CancelBtn
