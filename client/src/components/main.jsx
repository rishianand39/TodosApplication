import React, { useEffect, useState } from "react";
import Card from "./card";
import "../styles/scss/main.scss";
import AddIcon from "@mui/icons-material/Add";
import Tabs from "./tabs";
import TaskCard from "./taskCard";
import AddTaskModal from "./addTaskModal";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  fetchTasks,
  fetchWorkStatusOfTask,
} from "../api/services/taskServices";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/notificationSlice";
import { Pagination, Stack, Typography } from "@mui/material";

const Main = () => {
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("All Tasks");
  const [workStatusCounts, setWorkStatusCounts] = useState({
    'In Progress': 0,
    'On Hold': 0,
    'Completed': 0,
  });
  let [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (event, value) => {
    setSearchParams({ page: value });
    setPage(value);
  };

  useEffect(() => {
    (async function () {
      try {
        let countOfWorkStatus = await fetchWorkStatusOfTask();
        setWorkStatusCounts(countOfWorkStatus?.data)
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    location.search == "" && setPage(1);
  }, [location.search]);

  useEffect(() => {
    (async function fetchAllTasks() {
      try {
        let query = location?.search == "" ? "?page=1" : location?.search;
        let tasks = await fetchTasks(query);
       
        if (tasks?.ok) {
          setTasks(tasks?.data);
        } else {
          dispatch(
            setMessage({
              notificationType: "error",
              message: tasks?.message,
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
  }, [openTaskModal, searchParams]);
  
  const filteredTasks = tasks.filter((task) => {
    switch (activeTab) {
      case "In Progress":
        return task.work_status === "In Progress";
      case "New Assigned":
        return task.work_status === "New Assigned";
        case "Completed":
        return task.work_status === "Completed";
        case "On Hold":
          return task.work_status === "On Hold";
      default:
        return true;
      }
    });
    
    const handleTabChange = (tab) => {
      setActiveTab(tab);
  };

  return (
    <div className="main">
      <div className="left">
        <div className="cardContainer">
          <Card
            value={workStatusCounts?.hasOwnProperty("In Progress") ? workStatusCounts["In Progress"] : 0}
            title="Task In Progress"
            bg={"#f48942"}
          />
          <Card
            value={workStatusCounts?.newAssigned || 0}
            title="New Assigned"
            bg={"#817cdf"}
          />
          <Card
            value={workStatusCounts?.Completed}
            title="Task completed"
            bg={"#38b7d3"}
          />
          <Card
            value={workStatusCounts?.hasOwnProperty("On Hold") ? workStatusCounts["On Hold"] : 0}
            title="Task On Hold"
            bg={"#e54b6e"}
          />
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
        <Tabs onTabChange={handleTabChange} />
        <div className="taskCards">
          {filteredTasks?.map((task, index) => {
            return <TaskCard key={index} {...task} />;
          })}
          {tasks?.length == 0 ? (
            <div className="noTask">No Task Found!</div>
          ) : null}
          <Stack spacing={2}>
            <Typography>Page: {page}</Typography>
            <Pagination count={10} page={page} onChange={handleChange} />
          </Stack>
        </div>
      </div>
      <div className="right"></div>
      <AddTaskModal isOpen={openTaskModal} closeModal={setOpenTaskModal} />
    </div>
  );
};

export default Main;
