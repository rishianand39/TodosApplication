import React, { useEffect } from "react";
import "../styles/scss/dropdown.scss";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ListItem from "../building-block/listItem";
import { NavLink } from "react-router-dom";
import { deleteTask } from "../api/services/taskServices";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/notificationSlice";

const DropDown = ({ taskId }) => {
  const dispatch = useDispatch();

  const handleDeleteTask = async () => {
    try {
      let res = await deleteTask(taskId);
      if (res?.ok) {
        dispatch(
          setMessage({
            notificationType: "success",
            message: res?.message,
          })
        );
      } else {
        dispatch(
          setMessage({
            notificationType: "error",
            message: res?.message,
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
  };

  return (
    <div className="moreDropdownContainer">
      <NavLink to={`task/${taskId}`} className="link">
        <ListItem icon={VisibilityOutlinedIcon} text={"View and Edit"} />
      </NavLink>

      <NavLink target="blank" to={`task/${taskId}`} className="link">
        <ListItem icon={OpenInNewOutlinedIcon} text={"Open in New Tab"} />
      </NavLink>

      <ListItem icon={ContentCopyOutlinedIcon} text={"Duplicate Task"} />
      <div onClick={() => handleDeleteTask()}>
        <ListItem icon={DeleteOutlineOutlinedIcon} text={"Delete"} />
      </div>
    </div>
  );
};

export default DropDown;
