import React from 'react'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import "../styles/scss/avatar.scss"
const Avatars = () => {
  return (
    <div className='avatar'>
       <AvatarGroup max={4}>
       <Avatar alt="Remy Sharp" src="" />
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
      <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
       </AvatarGroup>
    </div>
  )
}

export default Avatars
