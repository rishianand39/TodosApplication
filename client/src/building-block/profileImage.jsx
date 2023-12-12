import React from 'react'
import {ProfileAvatar} from "../styles/styled-components/container"
import CameraAltIcon from '@mui/icons-material/CameraAlt';


const ProfileImage = ({handleImageUpload, image}) => {
  return (
    <ProfileAvatar image={image}>
      <div className='cameraIconContainer'>
      <label htmlFor="file">
        <CameraAltIcon className='icon' />
        </label>
        <input type="file" id='file' name="avatar" onChange={handleImageUpload}/>
      </div>
    </ProfileAvatar>
  )
}

export default ProfileImage