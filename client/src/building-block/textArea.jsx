import React from "react";
import "../styles/scss/textArea.scss";

const TextArea = ({ placeholder, commentRef }) => {
  return <textarea ref={commentRef} type="text" className="textarea" placeholder={placeholder}/>;
};

export default TextArea;
