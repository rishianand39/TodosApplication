import React from 'react'
import "../styles/scss/listItem.scss"

const ListItem = ({icon, text}) => {
    let Icon = icon
  return (
    <div className='listItem'>
      {<Icon className="icon"/>}
      <span>{text}</span>
    </div>
  )
}

export default ListItem
