import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "../styles/scss/more.scss"
import DropDown from '../components/dropDown';
const More = ({openOption, setOpenOption}) => {
  return (
    <div className='moreIconContainer' title="More Action">
      <MoreVertIcon className='moreIcon' onClick={(e)=>{
        e.stopPropagation()
        setOpenOption(pre=>!pre)
        }}/>
     {openOption && <DropDown/>}
    </div>
  )
}

export default More
