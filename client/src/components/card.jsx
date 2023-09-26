import React from 'react'
import "../styles/scss/card.scss"
import InsertChartIcon from '@mui/icons-material/InsertChart';
import { Card } from '../styles/styled-components/container';


const card = ({bg, title}) => {
  return (
    <Card bg={bg} className='card'>
      <div className='top'>
        <div className='iconShade'>
        <InsertChartIcon />
        </div>
        <div className='title'> <div>{title?.split(" ")[0]}</div>{title.split(" ").splice(1)?.join(" ")}</div>
      </div>
      <div className='bottom'>
        10
      </div>
    </Card>
  )
}

export default card
