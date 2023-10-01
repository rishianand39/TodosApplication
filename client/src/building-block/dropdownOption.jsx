import React from "react";
import Avatar from "../building-block/avatar";
import "../styles/scss/dropdownOption.scss"
const DropDownOption = () => {
  return (
    <div className="member">
      <Avatar size="28px" />
      <span>Rishi Anand</span>
    </div>
  );
};

export default DropDownOption;
