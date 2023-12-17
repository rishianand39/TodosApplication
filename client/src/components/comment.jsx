import React, { useState } from "react";
import "../styles/scss/comment.scss";
import Avatar from "../building-block/avatar";
import SaveBtn from "../building-block/saveBtn";
import CancelBtn from "../building-block/cancelBtn";
import TextArea from "../building-block/textArea";

const Comment = ({ commentsInfo }) => {
  const [edit, setEdit] = useState(false);
  
  const dateAndTime = new Date(commentsInfo?.createdAt);
  const formattedDate = dateAndTime.toLocaleString(); 
  const handleCommentEdit = (comment) => {
    setEdit(false)
  }



  return (
    <div className="previousComment">
      <Avatar />
      <div className="info">
        <div className="top">
          <div className="name">Pushpraj Patel</div>
          <div className="dateAndTime">
            <span>{formattedDate}</span>
          </div>
        </div>
        <div className="middle">
          {edit ? (
            <TextArea text={commentsInfo} value={commentsInfo?.comment} />
          ) : (
            <div className="comment">{commentsInfo?.comment}</div>
          )}
        </div>
        <div className="bottom">
          {edit ? (
            <>
              <SaveBtn handleSumbit={handleCommentEdit} />
              <CancelBtn cancel={setEdit} />
            </>
          ) : (
            <>
              <button onClick={() => setEdit(true)}>Edit</button>
              <button>Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
