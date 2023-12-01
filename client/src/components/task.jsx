import React, { useEffect, useRef, useState } from "react";
import "../styles/scss/task.scss";
import Comment from "./comment";
import Avatar from "../building-block/avatar";
import SaveBtn from "../building-block/saveBtn";
import CancelBtn from "../building-block/cancelBtn";
import TextArea from "../building-block/textArea";
import Search from "../building-block/search";
import Avatars from "../building-block/avatars";
import DropDownOption from "../building-block/dropdownOption";
import axios from "axios";
import { useParams } from "react-router-dom";
import { setMessage } from "../redux/notificationSlice";
import { useDispatch } from "react-redux";
import { addMember, fetchTaskById } from "../api/services/taskServices";
import { findMember } from "../api/services/userServices";

const Task = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [addCommentActive, setAddCommentActive] = useState(false);
  const [changeReporter, setChangeReporter] = useState(false);
  const [changeAssignee, setChangeAssignee] = useState(false);
  const [foundUsers, setFoundUsers] = useState(false);
  const commentRef = useRef();
  const dispatch = useDispatch();
  const saveComment = async () => {
    console.log(commentRef);
    try {
      console.log("commenting");
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1MGZlOGM5NzNjZmZiZjcxMmYzYzU4NiIsIm5hbWUiOiJSaXNoaSBBbmFuZCIsImVtYWlsIjoicmlzaGkucm44MThAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJjcmVhdGVkQXQiOiIyMDIzLTA5LTI0VDA3OjQ0OjA5LjQ3OVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA5LTI0VDA4OjUwOjQ3Ljk0N1oifSwiaWF0IjoxNjk2NDE1NTU2LCJleHAiOjE2OTY2NzQ3NTZ9.azvkknwfPMoGxESNSYTBGu4LU8CZJ0fCjbfSC-mWNjE";

      await axios.post(
        "https://apigw-task-manager.vercel.app/task/651079ae720b2470baafa7d7/comments",
        {
          comment: commentRef.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(error, "error");
    }
    setAddCommentActive(false);
  };

  const handleFindMember = async (searchText) => {
    let users = await findMember(searchText);
    setFoundUsers(users.data);
  };

  const handleAddMember = async(user) => {
    try {
      console.log(user, id)
      let response = await addMember(id, user);
      dispatch(
        setMessage({
          notificationType: response?.ok ? "success" : "error",
          message: response?.message,
        })
      );
    } catch (error) {
      dispatch(
        setMessage({
          notificationType: "error",
          message: error?.message,
        })
      );
    }
  };

  useEffect(() => {
    (async function () {
      try {
        let task = await fetchTaskById(id);
        if (task?.ok) {
          setTask(task?.data);
        } else {
          dispatch(
            setMessage({
              notificationType: "error",
              message: task?.message,
            })
          );
        }
      } catch (error) {
        dispatch(
          setMessage({
            notificationType: "error",
            message: error?.message,
          })
        );
      }
    })();
  }, []);

  return (
    <div className="taskContainer">
      <div className="left">
        <h2 contentEditable={true}>{task?.title}</h2>
        <p contentEditable={true}>{task?.description}</p>
        <div className="addMember">
          <Search
            placeholder="Search and add member.."
            handleFindMember={handleFindMember}
          />
          {foundUsers && (
            <div className="results">
              {foundUsers?.map((user, index) => {
                return (
                  <div key={index} className="result" onClick={()=>handleAddMember(user)}>
                    <Avatar name={user?.name} size="30px" />
                    <span>{user?.name}</span>
                  </div>
                );
              })}
            </div>
          )}
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
          <select>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="priority">
          <span className="title">Work</span>
          <select>
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
              <TextArea placeholder="Add a comment" commentRef={commentRef} />
            ) : (
              <input
                type="text"
                onFocus={() => setAddCommentActive(true)}
                placeholder="Add a comment"
              />
            )}

            {addCommentActive && (
              <div className="btnHolder">
                <SaveBtn saveComment={saveComment} />
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
