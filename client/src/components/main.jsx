import React from "react";
import Card from "./card";
import "../styles/scss/main.scss";
import AddIcon from "@mui/icons-material/Add";
import Tabs from "./tabs";
import TaskCard from "./taskCard";

const Main = () => {
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
          <button>
            <AddIcon />
            Add Task
          </button>
        </div>
        <Tabs />
        <div className="taskCards">
          <TaskCard />
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Main;
