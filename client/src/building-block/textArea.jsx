import React from "react";
import "../styles/scss/textArea.scss";

const TextArea = ({ text, placeholder }) => {
  return <textarea type="text" className="textarea" value={text} placeholder={placeholder}/>;
};

export default TextArea;
