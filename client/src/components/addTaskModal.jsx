import React, { useEffect, useState } from "react";
import "../styles/scss/addTaskModal.scss";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import Chip from "../building-block/chip";
import { createTask } from "../api/services/taskServices";
import { setMessage } from "../redux/notificationSlice";
import { useDispatch } from "react-redux";

const AddTaskModal = ({ isOpen, closeModal }) => {
   const dispatch = useDispatch()
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [taskInfo, setTaskInfo] = useState({
    title : "",
    description : "",
    dueDate : "",
    priority : "",
    tags : tags,
    taskType : ""
  })
  const addTags = (tag) => {
    setTags((pre) => {
      return [...pre, tag];
    });
    setTagInput("");
  };
  const handleInputs =(event)=>{
    setTaskInfo({...taskInfo, [event?.target?.id] : event?.target?.value})
  }

  const handleInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      addTags(tagInput);
    }
  };
  const removeChip = (tagName, index) => {
    setTags((pre)=>{
      let allTags = [...tags]
      allTags.splice(index,1)
      return allTags
    })
  };
  useEffect(() => {
    setTaskInfo((prevTaskInfo) => ({
      ...prevTaskInfo,
      tags: tags,
    }));
  }, [tags]);
  const handleSubmit = async()=>{
    try {
     let taskResponse = await createTask(taskInfo);
     if(taskResponse?.ok){
      dispatch(setMessage({
        notificationType : 'success',
        message : taskResponse?.message
      }))
     }
    } catch (error) {
      dispatch(setMessage({
        notificationType : 'error',
        message : error?.message
      }))
    }
    closeModal(false)

  }

  return (
    <div className={`modalWrapper ${isOpen ? "open" : "close"}`}>
      <div className="modalBody">
        <div className="action">
          <h2 className="title">Create Task</h2>
          <MinimizeIcon className="icon" />
          <CloseIcon className="icon" onClick={() => closeModal(false)} />
        </div>
        <label htmlFor="title">Title</label>
        <input onChange={handleInputs} id="title" type="text" placeholder="Title" />
        <label htmlFor="description">Description</label>
        <textarea
          onChange={handleInputs}
          name="description"
          placeholder="Description"
          id="description"
          cols="37"
          rows="4"
        ></textarea>
        <label htmlFor="due_date">Due Date</label>
        <input onChange={handleInputs} type="date" id="dueDate" />
        <label htmlFor="priority">Priority</label>
        <select id="priority" onChange={handleInputs} name="priority">
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <label htmlFor="Tags">Tags</label>
        <input
          type="text"
          value={tagInput}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Type and press Enter to add tags"
        />
        <div className="tags">
          {tags.map((tag, index) => (
            <Chip key={index} tag={tag} index={index} remove={removeChip} />
          ))}
        </div>
        <button onClick={handleSubmit} className="create">Create</button>
      </div>
    </div>
  );
};

export default AddTaskModal;
