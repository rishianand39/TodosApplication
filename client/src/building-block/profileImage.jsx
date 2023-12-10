import React from 'react'
import {ProfileAvatar} from "../styles/styled-components/container"
import CameraAltIcon from '@mui/icons-material/CameraAlt';


const ProfileImage = () => {
  return (
    <ProfileAvatar>
        <CameraAltIcon className='icon'/>
    </ProfileAvatar>
  )
}

export default ProfileImage