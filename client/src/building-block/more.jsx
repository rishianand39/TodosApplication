import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "../styles/scss/more.scss"
import DropDown from '../components/dropDown';
const More = ({openOption, setOpenOption, taskId}) => {
  return (
    <div className='moreIconContainer' >
      <div title="More Action">

      <MoreVertIcon className='moreIcon' onClick={(e)=>{
        e.stopPropagation()
        setOpenOption(pre=>!pre)
      }}/>
      </div>
     {openOption && <DropDown taskId = {taskId}/>}
    </div>
  )
}

export default More
