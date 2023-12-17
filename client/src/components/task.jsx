import React, { useEffect, useRef, useState } from "react";
import "../styles/scss/task.scss";
import Comment from "./comment";
import Avatar from "../building-block/avatar";
import SaveBtn from "../building-block/saveBtn";
import CancelBtn from "../building-block/cancelBtn";
import TextArea from "../building-block/textArea";
import MovingIcon from "@mui/icons-material/Moving";
import Search from "../building-block/search";
import Avatars from "../building-block/avatars";
import { useParams } from "react-router-dom";
import { setMessage } from "../redux/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  addMember,
  fetchAllComments,
  fetchTaskById,
  removeMember,
  updateTask,
} from "../api/services/taskServices";
import { fetchUserData, findMember } from "../api/services/userServices";
import IconAndName from "../building-block/iconAndName";
import RemoveIcon from "../assets/outlineremove.gif";
import PanToolIcon from "@mui/icons-material/PanTool";
import DoneIcon from "@mui/icons-material/Done";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import BalanceIcon from '@mui/icons-material/Balance';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import Select from "../building-block/select";
const Task = () => {
  const { id } = useParams();
  const currentUser = useSelector((store) => store?.user?.info);
  const [task, setTask] = useState(null);
  const [addCommentActive, setAddCommentActive] = useState(false);
  const [changeReporter, setChangeReporter] = useState(false);
  const [changeAssignee, setChangeAssignee] = useState(false);
  const [foundUsers, setFoundUsers] = useState(false);
  const [membersDetail, setMembersDetail] = useState([]);
  const [comments, setComments] = useState([]);
  const [assignee, setAssignee] = useState(null);
  const [reporter, setReporter] = useState(null);
  const work = "In Progress";
  let priority = "High"
  const commentRef = useRef();
  const dispatch = useDispatch();

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

  const handleReporterChange = (user) => {};
  const handleAssigneeChange = async (user) => {
    try {
      let response = await updateTask(id);
      dispatch(
        setMessage({
          notificationType: response?.ok ? "success" : "error",
          message: response?.message,
        })
      );
      response?.ok && setAssignee(user);
    } catch (error) {
      dispatch(
        setMessage({
          notificationType: "error",
          message: error?.message,
        })
      );
    }
  };
  const handleMemberRemove = async (member) => {
    try {
      let response = await removeMember(id, member);
      !response?.ok &&
        dispatch(
          setMessage({
            notificationType: "error",
            message: response?.message,
          })
        );
      response?.ok &&
        dispatch(
          setMessage({
            notificationType: "success",
            message: response?.message,
          })
        );
      if (response?.ok) {
        let updatedMember = membersDetail?.filter(
          (e) => e?._id !== member?._id
        );
        setMembersDetail(updatedMember);
      }
    } catch (error) {
      dispatch(
        setMessage({
          notificationType: "error",
          message: error?.message,
        })
      );
    }
  };

  const handleAddComment = async (commentText) => {
    try {
      let response = await addComment(id, commentRef?.current?.value);
      !response?.ok &&
        dispatch(
          setMessage({
            notificationType: "error",
            message: response?.message,
          })
        );
      response?.ok &&
        dispatch(
          setMessage({
            notificationType: "success",
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
    setAddCommentActive(false);
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
  
  useEffect(() => {
    (async function () {
      try {
        let task;
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

  useEffect(()=>{
    (async function(){
      try {
        let comments = await fetchAllComments(id)
        setComments(comments)
        if(!comments?.ok){
          dispatch(
            setMessage({
              notificationType: "error",
              message: comments?.message,
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
    })()
  },[])

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
                  <Avatar key={index} name={member?.name} image={member?.avatar} size="40px" />
                  <img
                    onClick={() => handleMemberRemove(member)}
                    src={RemoveIcon}
                    alt="remove"
                  />
                </div>
              );
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
                  <IconAndName
                    user={user}
                    membersDetail={membersDetail}
                    handleClick={handleAddMember}
                    key={index}
                    name={user?.name}
                  />
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
                  return (
                    <IconAndName
                      user={member}
                      handleClick={handleReporterChange}
                      key={index}
                      name={member?.name}
                    />
                  );
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
                  return (
                    <IconAndName
                      user={member}
                      handleClick={handleAssigneeChange}
                      key={index}
                      name={member?.name}
                    />
                  );
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
          <div>
            <Select options={["High", "Medium", "Low"]} />
            {priority == "High" && (
              <div className="iconAndText">
                <KeyboardDoubleArrowUpIcon /> {priority}
              </div>
            )}
            {priority == "Medium" && (
              <div className="iconAndText">
                <BalanceIcon />
                {priority}
              </div>
            )}
            {priority == "Low" && (
              <div className="iconAndText">
                <KeyboardDoubleArrowDownIcon />
                {priority}
              </div>
            )}
          </div>
        </div>
        <div className="priority">
          <span className="title">Work</span>
          <div>
            <Select options={["On Hold", "Completed", "In Progress"]} />
            {work == "In Progress" && (
              <div className="iconAndText">
                <MovingIcon /> {work}
              </div>
            )}
            {work == "On Hold" && (
              <div className="iconAndText">
                <PanToolIcon />
                {work}
              </div>
            )}
            {work == "Completed" && (
              <div className="iconAndText">
                <DoneIcon />
                {work}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="right">
        <h3>Activity</h3>
        <div className="addComment">
          <Avatar size="40px" name={currentUser?.name} image={currentUser?.avatar}/>
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
                <SaveBtn handleSumbit={handleAddComment} />
                <CancelBtn cancel={setAddCommentActive} />
              </div>
            )}
          </div>
        </div>
        <div className="comments">
          {comments?.map((comment, index) => {
            return (
              <Comment key={index} commentsInfo={comment} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Task;
