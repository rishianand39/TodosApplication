import React, { useState } from "react";
import "../styles/scss/task.scss";
import { useParams } from "react-router-dom";
import Comment from "./comment";
import Avatar from "../building-block/avatar";
import SaveBtn from "../building-block/saveBtn";
import CancelBtn from "../building-block/cancelBtn";
import TextArea from "../building-block/textArea";
import Search from "../building-block/search";
import Avatars from "../building-block/avatars";

const Task = () => {
  const { id } = useParams();
  const [addCommentActive, setAddCommentActive] = useState(false);

  return (
    <div className="taskContainer">
      <div className="left">
        <h2>Project Meelo</h2>
        <p>create a navbar with 10 placeholders</p>
        <div className="addMember">
          <Search placeholder="Search and add member.." />
          <Avatars />
        </div>
        <div className="changeUser">
          <div className="mainPerson">Reporter</div>
          <div className="worker">
            <Avatar size="30px" />
            <span>PushpRaj Patel</span>
          </div>
        </div>
        <div className="changeUser">
          <div className="mainPerson">Assignee</div>
          <div className="worker">
            <Avatar size="30px" />
            <span>PushpRaj Patel</span>
          </div>
        </div>
        <div className="timeEstimate">
          <span>Original estimate</span>
          <span>2h</span>
        </div>
      </div>
      <div className="right">
        <h3>Activity</h3>
        <div className="addComment">
          <Avatar />
          <div>
            {addCommentActive ? (
              <TextArea value="" placeholder="Add a comment" />
            ) : (
              <input
                type="text"
                onFocus={() => setAddCommentActive(true)}
                placeholder="Add a comment"
              />
            )}

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
    </div>
  );
};

export default Task;
