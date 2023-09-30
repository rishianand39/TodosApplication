import React from "react";
import "../styles/scss/addTaskModal.scss";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";

const AddTaskModal = ({ isOpen, closeModal }) => {
  return (
    <div className={`modalWrapper ${isOpen ? "open" : "close"}`}>
      <div className="modalBody">
        <div className="action">
          <h2 className="title">Create Task</h2>
          <MinimizeIcon className="icon" />
          <CloseIcon className="icon" onClick={() => closeModal(false)} />
        </div>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" placeholder="title" />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          placeholder="description"
          id="description"
          cols="37"
          rows="4"
        ></textarea>
        <label htmlFor="due_date">Due Date</label>
        <input type="date" id="due_date" />
        <label htmlFor="priority">Priority</label>
        <select name="priority" id="priority">
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <label htmlFor="Tags">Tags</label>
        <input type="text" />
        <button className="create">Create</button>
      </div>
    </div>
  );
};

export default AddTaskModal;
