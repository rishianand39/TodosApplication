import React from 'react'
import {ProfileAvatar} from "../styles/styled-components/container"
import CameraAltIcon from '@mui/icons-material/CameraAlt';


const ProfileImage = () => {
  return (
    <ProfileAvatar>
      <div className='cameraIconContainer'>
      <label htmlFor="file">
        <CameraAltIcon className='icon' />
        </label>
        <input type="file" id='file' />
      </div>
    </ProfileAvatar>
  )
}

export default ProfileImage