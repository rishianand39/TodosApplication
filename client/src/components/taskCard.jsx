import React from 'react'
import "../styles/scss/taskCard.scss"
import HubIcon from '@mui/icons-material/Hub';
import Avatars from '../building-block/avatar';
const TaskCard = () => {
  return (
    <div className='taskCard'>
      <div className='iconShade'>
        <HubIcon />
      </div>
      <div className='description'>
        <h3>Project Meelo</h3>
        <p>create real estate landing page</p>
      </div>
      <div className='members'>
        <Avatars />
      </div>
      <div className='progress'>
        <div>
            <span>Progress</span>
            <span>70%</span>
        </div>
      <progress value="32" max="100"></progress>
      </div>
    </div>
  )
}

export default TaskCard
