import React, { useEffect, useRef, useState } from "react";
import "../styles/scss/comment.scss";
import Avatar from "../building-block/avatar";
import SaveBtn from "../building-block/saveBtn";
import CancelBtn from "../building-block/cancelBtn";
import TextArea from "../building-block/textArea";
import { deleteComment, editComment } from "../api/services/taskServices";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/notificationSlice";
import { fetchUserData } from "../api/services/userServices";

const Comment = ({ commentsInfo }) => {
  const [edit, setEdit] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const commentRef = useRef();
  const dispatch = useDispatch();
  const dateAndTime = new Date(commentsInfo?.createdAt);
  const formattedDate = dateAndTime.toLocaleString();

  const handleCommentDelete = async () => {
    try {
      let res = await deleteComment(commentsInfo?._id);

      dispatch(
        setMessage({
          notificationType: "success",
          message: res?.message,
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
  const handleEditedComment = async () => {
    setEdit(false);
    try {
      let res = await editComment(commentsInfo?._id, {
        comment: commentRef?.current.value,
      });
      dispatch(
        setMessage({
          notificationType: "success",
          message: res?.message,
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
        let user = await fetchUserData(commentsInfo?.userId);
        if (user?.ok) {
          setUserInfo(user?.data);
        } else {
          dispatch(
            setMessage({
              notificationType: "error",
              message: user?.message,
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
  console.log(userInfo, "userInfo");
  return (
    <div className="previousComment">
      <Avatar image={userInfo?.avatar} name={userInfo?.name} />
      <div className="info">
        <div className="top">
          <div className="name">{userInfo?.name}</div>
          <div className="dateAndTime">
            <span>{formattedDate}</span>
          </div>
        </div>
        <div className="middle">
          {edit ? (
            <TextArea
              text={commentsInfo}
              value={commentsInfo?.comment}
              commentRef={commentRef}
            />
          ) : (
            <div className="comment">{commentsInfo?.comment}</div>
          )}
        </div>
        <div className="bottom">
          {edit ? (
            <>
              <SaveBtn handleSumbit={handleEditedComment} />
              <CancelBtn cancel={setEdit} />
            </>
          ) : (
            <>
              <button onClick={() => setEdit(true)}>Edit</button>
              <button onClick={() => handleCommentDelete()}>Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
