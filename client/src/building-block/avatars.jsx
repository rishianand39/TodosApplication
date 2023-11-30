import React from 'react'
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import "../styles/scss/avatars.scss";
import { useSelector } from 'react-redux';

const Avatars = ({people}) => {
  const currentUser = useSelector(store=>store.user)
  return (
    <div className='avatars'>
       <AvatarGroup max={4}>
        {people?.map((info, index)=><Avatar key={index} alt="Remy Sharp" src={info?.img} />)}
       </AvatarGroup>
    </div>
  )
}

export default Avatars
