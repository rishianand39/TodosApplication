import React from 'react'
import "../styles/scss/saveBtn.scss"

const SaveBtn = ({saveComment}) => {
  return (
    <>
       <button className="saveBtn" onClick={()=>saveComment()}>Save</button>
    </>
  )
}

export default SaveBtn
