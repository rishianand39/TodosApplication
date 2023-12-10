import React from 'react'
import { Button } from '../styles/styled-components/container'

const SaveBtn = ({handleSumbit, width, text}) => {
  return (
    <>
       <Button width={width} onClick={()=>handleSumbit()}>{text? text : "Save"}</Button>
    </>
  )
}

export default SaveBtn
