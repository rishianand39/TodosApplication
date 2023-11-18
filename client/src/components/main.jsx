import React, { useState } from "react";
import Card from "./card";
import "../styles/scss/main.scss";
import AddIcon from "@mui/icons-material/Add";
import Tabs from "./tabs";
import TaskCard from "./taskCard";
import AddTaskModal from "./addTaskModal";
import { NavLink } from "react-router-dom";

const Main = () => {
  const [openTaskModal, setOpenTaskModal] = useState(false);
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
          <NavLink to="task/1" className="link">
            <TaskCard />
          </NavLink>
          <NavLink to="task/2" className="link">
            <TaskCard />
          </NavLink>
          <NavLink to="task/3" className="link">
            <TaskCard />
          </NavLink>
        </div>
      </div>
      <div className="right"></div>
      <AddTaskModal isOpen={openTaskModal} closeModal={setOpenTaskModal} />
    </div>
  );
};

export default Main;
