import React from "react";
import "../styles/scss/select.scss";

const Select = ({ options }) => {
  return (
    <div className="selectContainer">
      <select>
        {options?.map((option, index) => {
          return <option value={option}>{option}</option>;
        })}
      </select>
    </div>
  );
};

export default Select;
