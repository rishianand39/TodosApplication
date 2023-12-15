import React, { useState } from "react";
import "../styles/scss/comment.scss";
import Avatar from "../building-block/avatar";
import SaveBtn from "../building-block/saveBtn";
import CancelBtn from "../building-block/cancelBtn";
import TextArea from "../building-block/textArea";

const Comment = ({ commentsInfo }) => {
  const [edit, setEdit] = useState(false);

  return (
    <div className="previousComment">
      <Avatar />
      <div className="info">
        <div className="top">
          <div className="name">Pushpraj Patel</div>
          <div className="dateAndTime">
            <span>August 18, 2023 at 12:47 PM</span>
          </div>
        </div>
        <div className="middle">
          {edit ? (
           <TextArea text={commentsInfo} placeholder=""/>
          ) : (
            <div className="comment">{commentsInfo?.comment}</div>
          )}
        </div>
        <div className="bottom">
          {edit ? (
            <>
              <SaveBtn />
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
