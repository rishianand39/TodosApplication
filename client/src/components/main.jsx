import React, { useEffect, useState } from "react";
import Card from "./card";
import "../styles/scss/main.scss";
import AddIcon from "@mui/icons-material/Add";
import Tabs from "./tabs";
import TaskCard from "./taskCard";
import AddTaskModal from "./addTaskModal";
import { NavLink } from "react-router-dom";
import { fetchTasks } from "../api/services/taskServices";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/notificationSlice";

const Main = () => {
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch()
  useEffect(()=>{
    (async function fetchAllTasks(){
      try {
        let tasks = await fetchTasks()
        if(tasks?.ok){
          setTasks(tasks?.data)
        }else{
         dispatch(setMessage({
           notificationType : 'error',
           message : tasks?.message
         }))
        }
       } catch (error) {
         dispatch(setMessage({
           notificationType : 'error',
           message : error?.message
         }))
       }
    })()

  },[])
  return (
    <div className="main">
      <div className="left">
        <div className="cardContainer">
          <Card title="Task In Progress" bg={"#f48942"} />
          <Card title="New Assigned" bg={"#817cdf"} />
          <Card title="Task completed" bg={"#38b7d3"} />
        </div>
        <div className="tasks">
          <div className="title">My Tasks</div>
          <button
            onClick={() => {
              setOpenTaskModal(true);
            }}
          >
            <AddIcon />
            Add Task
          </button>
        </div>
        <Tabs />
        <div className="taskCards">
          {tasks?.map((task, index) => {
            return (
              <NavLink key={index} to={`task/${task?._id}`} className="link">
                <TaskCard task={task}/>
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="right"></div>
      <AddTaskModal isOpen={openTaskModal} closeModal={setOpenTaskModal} />
    </div>
  );
};

export default Main;
