import React from "react";
import "../styles/scss/select.scss";

const Select = ({currentValue, options, handleChange }) => {
  console.log(currentValue, "CURRENTvALUE")
  return (
    <div className="selectContainer">
      <select value={currentValue} onChange={(e)=>handleChange(e.target.value)}>
        {options?.map((option, index) => {
          return <option key={index} value={option}>{option}</option>;
        })}
      </select>
    </div>
  );
};

export default Select;
