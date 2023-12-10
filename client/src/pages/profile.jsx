import React from 'react';
import Input from '../building-block/Input';
import "../styles/scss/profile.scss";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
const Profile = () => {
  return (
    <div className='profileContainer'>
      <div className='cover'>
        <img src="https://images.unsplash.com/photo-1701849484867-9058dc3964fc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <div className='upload'>
          <CameraAltIcon />
          <span>Change Cover</span>
          <input type="file" name="" id="" />
        </div>
      </div>
      <Input label="Name" inputType="text"/>
    </div>
  )
}

export default Profile