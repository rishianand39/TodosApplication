import React, { useState } from "react";
import "../styles/scss/task.scss";
import { useParams } from "react-router-dom";
import Comment from "./comment";
import Avatar from "../building-block/avatar";
import SaveBtn from "../building-block/saveBtn";
import CancelBtn from "../building-block/cancelBtn";
import TextArea from "../building-block/textArea";

const Task = () => {
  const { id } = useParams();
  const [addCommentActive, setAddCommentActive] = useState(false);

  return (
    <div className="taskContainer">
      <div className="left">
        <div className="addComment">
          <Avatar />
          <div>

          {addCommentActive ? <TextArea value="" placeholder="Add a comment"/> : <input type="text" onFocus={()=>setAddCommentActive(true)} placeholder="Add a comment"/>}
          
          {addCommentActive && (
            <div className="btnHolder">
              <SaveBtn />
              <CancelBtn cancel={setAddCommentActive} />
            </div>
          )}
          </div>
        </div>
        <div className="comments">
          <Comment comment="Header controller first layer functionality implemented " />
          <Comment comment="Header controller first layer functionality implemented " />
          <Comment comment="Header controller first layer functionality implemented " />
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Task;
