import React from 'react';
import "../styles/scss/input.scss"

const Input = ({label, inputType}) => {
  return (
    <div className='inputContainer'>
        <label htmlFor="input">{label}</label>
        <input type={inputType} id='input' placeholder={`Type ${label}`}/>
    </div>
  )
}

export default Input