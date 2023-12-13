import React from 'react';
import "../styles/scss/input.scss"

const Input = ({label, inputType, handleInput, value}) => {
  return (
    <div className='inputContainer'>
        <label htmlFor="input">{label}</label>
        <input value={value} onInput={handleInput} type={inputType} name={label?.toLowerCase()} id='input' placeholder={`Type ${label}`}/>
    </div>
  )
}

export default Input