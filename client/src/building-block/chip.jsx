import React from 'react'
import CloseIcon from "@mui/icons-material/Close";
import "../styles/scss/chip.scss"

const Chip = ({tag, remove, index}) => {
  return (
    <div className='tag'>
      <span>{tag}</span>
      <CloseIcon className='removeTag' onClick={()=>remove(tag, index)}/>
    </div>
  )
}

export default Chip
