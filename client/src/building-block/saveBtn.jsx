import React from 'react'
import "../styles/scss/saveBtn.scss"

const SaveBtn = ({handleSumbit}) => {
  return (
    <>
       <button className="saveBtn" onClick={()=>handleSumbit()}>Save</button>
    </>
  )
}

export default SaveBtn
