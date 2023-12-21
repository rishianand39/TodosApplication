import React from "react";
import "../styles/scss/textArea.scss";

const TextArea = ({ placeholder, commentRef, value}) => {
  return <textarea  ref={commentRef} type="text" defaultValue={value} className="textarea" placeholder={placeholder}/>;
};

export default TextArea;
