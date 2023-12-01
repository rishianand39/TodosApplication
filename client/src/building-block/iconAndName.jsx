import React from "react";
import Avatar from "./avatar";
import "../styles/scss/dropdownOption.scss"
const IconAndName = ({name}) => {
  return (
    <div className="member">
      <Avatar name={name} size="28px" />
      <span>{name}</span>
    </div>
  );
};

export default IconAndName;
