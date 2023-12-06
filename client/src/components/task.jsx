import React, { useEffect, useRef, useState } from "react";
import "../styles/scss/task.scss";
import Comment from "./comment";
import Avatar from "../building-block/avatar";
import SaveBtn from "../building-block/saveBtn";
import CancelBtn from "../building-block/cancelBtn";
import TextArea from "../building-block/textArea";
import Search from "../building-block/search";
import Avatars from "../building-block/avatars";
import { useParams } from "react-router-dom";
import { setMessage } from "../redux/notificationSlice";
import { useDispatch } from "react-redux";
import { addMember, fetchTaskById, removeMember, updateTask } from "../api/services/taskServices";
import { fetchUserData, findMember } from "../api/services/userServices";
import IconAndName from "../building-block/iconAndName";
import RemoveIcon from "../assets/outlineremove.gif";
const Task = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [addCommentActive, setAddCommentActive] = useState(false);
  const [changeReporter, setChangeReporter] = useState(false);
  const [changeAssignee, setChangeAssignee] = useState(false);
  const [foundUsers, setFoundUsers] = useState(false);
  const [membersDetail, setMembersDetail] = useState([]);
  const [assignee, setAssignee] = useState(null)
  const [reporter, setReporter] = useState(null)
  const commentRef = useRef();
  const dispatch = useDispatch();
  const saveComment = async () => {};

  const handleFindMember = async (searchText) => {
    let users = await findMember(searchText);
    setFoundUsers(users.data);
  };
  const fetchDataForAllUsersConcurrently = async () => {
    try {
      const promises = task?.people?.map((userId) => fetchUserData(userId));
      const userDataArray = await Promise.all(promises);
      setMembersDetail(userDataArray);
    } catch (error) {}
  };

  const handleAddMember = async (user) => {
    try {
      let response = await addMember(id, user);
      dispatch(
        setMessage({
          notificationType: response?.ok ? "success" : "error",
          message: response?.message,
        })
      );
      setMembersDetail((pre) => [...pre, user]);
    } catch (error) {
      dispatch(
        setMessage({
          notificationType: "error",
          message: error?.message,
        })
      );
    }
  };

  const handleReporterChange =(user)=>{

  }
  const handleAssigneeChange =async(user)=>{
    try {
      let response = await updateTask(id)
      dispatch(
        setMessage({
          notificationType: response?.ok ? "success" : "error",
          message: response?.message,
        })
      );
      response?.ok && setAssignee(user)
    } catch (error) {
      dispatch(
        setMessage({
          notificationType: "error",
          message: error?.message,
        })
      );
    }
  }
  const handleMemberRemove = async(member)=>{
    try {
     let response = await removeMember(id, member)
    !response?.ok && dispatch(
      setMessage({
        notificationType: "error",
        message: response?.message,
      })
    );
    response?.ok && dispatch(
      setMessage({
        notificationType: "success",
        message: response?.message,
      })
    )
    if(response?.ok){
      let updatedMember = membersDetail?.filter(e=>e?._id !== member?._id)
      setMembersDetail(updatedMember)
    }


    } catch (error) {
      dispatch(
        setMessage({
          notificationType: "error",
          message: error?.message,
        })
      );
    }
  }

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

  useEffect(() => {
    task?.people?.length >= 1 && fetchDataForAllUsersConcurrently();
  }, [task]);

  return (
    <div className="taskContainer">
      <div className="left">
        <h2 contentEditable={true}>{task?.title}</h2>
        <p contentEditable={true}>{task?.description}</p>
        <div className="addedMembers">
          <h3>Members</h3>
          <div className="members">
            {membersDetail?.map((member, index) => {
              return (
                <div>
                  <Avatar key={index} name={member?.name} size="30px" />
                  <img onClick={()=>handleMemberRemove(member)} src={RemoveIcon} alt="remove" />
                </div>
              )
            })}
          </div>
        </div>
        <div className="addMember">
          <Search
            placeholder="Search and add member.."
            handleFindMember={handleFindMember}
          />
          {foundUsers && (
            <div className="results">
              {foundUsers?.map((user, index) => {
                return (
                  <IconAndName user={user} membersDetail={membersDetail} handleClick={handleAddMember}  key={index} name={user?.name} />
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
                {membersDetail?.map((member, index) => {
                  return <IconAndName  user={member} handleClick={handleReporterChange} key={index} name={member?.name} />;
                })}
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
                {membersDetail?.map((member, index) => {
                  return <IconAndName user={member} handleClick={handleAssigneeChange} key={index} name={member?.name} />;
                })}
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
