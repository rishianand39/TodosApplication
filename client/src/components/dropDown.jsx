import React from 'react'
import "../styles/scss/dropdown.scss"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddLinkOutlinedIcon from '@mui/icons-material/AddLinkOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ListItem from '../building-block/listItem';



const DropDown = () => {
  return (
    <div className='moreDropdownContainer'>
      <ListItem icon={VisibilityOutlinedIcon} text={'View'}/>
      <ListItem icon={AddLinkOutlinedIcon} text={'Get Link'}/>
      <ListItem icon={EditNoteOutlinedIcon} text={'Edit'}/>
      <ListItem icon={OpenInNewOutlinedIcon} text={'Open in New Tab'}/>
      {/* <ListItem icon={ContentCopyOutlinedIcon} text={'Duplicate Task'}/> */}
      <ListItem icon={DeleteOutlineOutlinedIcon} text={'Delete'}/>
    </div>
  )
}

export default DropDown
