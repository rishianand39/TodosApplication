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
import DropDownOption from "../building-block/dropdownOption";
import { AvatarIcon } from "../styles/styled-components/container";

const Task = () => {
  const { id } = useParams();
  const [addCommentActive, setAddCommentActive] = useState(false);
  const [changeReporter, setChangeReporter] = useState(false);
  const [changeAssignee, setChangeAssignee] = useState(false);
  const [results, setResults] = useState(false);

  return (
    <div className="taskContainer">
      <div className="left">
        <h2>Project Meelo</h2>
        <p>create a navbar with 10 placeholders</p>
        <div className="addMember">
          <Search placeholder="Search and add member.." />
          {results &&
           <div className="results">
           <div className="result">
             <Avatar size="30px" />
             <span>Rishi Anand</span>
           </div>
           <div className="result">
             <Avatar size="30px" />
             <span>Rishi Anand</span>
           </div>
           <div className="result">
             <Avatar size="30px" />
             <span>Rishi Anand</span>
           </div>
           <div className="result">
             <Avatar size="30px" />
             <span>Rishi Anand</span>
           </div>
         </div>
          }
          <Avatars />
        </div>
        <div className="changeUser">
          <div className="mainPerson">Reporter</div>
          <div className="worker">
            <div
              className="holder"
              onClick={() => setChangeReporter((pre) => !pre)}
            >
              <Avatar size="30px" />
              <span>PushpRaj Patel</span>
            </div>
            {changeReporter && (
              <div className="members">
                <DropDownOption />
                <DropDownOption />
                <DropDownOption />
                <DropDownOption />
              </div>
            )}
          </div>
        </div>
        <div className="changeUser">
          <div className="mainPerson">Assignee</div>
          <div className="worker">
            <div
              className="holder"
              onClick={() => setChangeAssignee((pre) => !pre)}
            >
              <Avatar size="30px" />
              <span>PushpRaj Patel</span>
            </div>
            {changeAssignee && (
              <div className="members">
                <DropDownOption />
                <DropDownOption />
                <DropDownOption />
                <DropDownOption />
              </div>
            )}
          </div>
        </div>
        <div className="timeEstimate">
          <span className="title">Original estimate</span>
          <span className="time">2h</span>
        </div>
        <div className="priority">
          <span className="title">Priority</span>
          <select >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="priority">
          <span className="title">Work</span>
          <select >
            <option value="hold">On Hold</option>
            <option value="completed">Completed</option>
            <option value="progress">In Progress</option>
          </select>
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
