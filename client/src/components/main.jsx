import React, { useEffect, useState } from "react";
import Card from "./card";
import "../styles/scss/main.scss";
import AddIcon from "@mui/icons-material/Add";
import Tabs from "./tabs";
import TaskCard from "./taskCard";
import AddTaskModal from "./addTaskModal";
import {useLocation, useSearchParams } from "react-router-dom";
import { fetchTasks } from "../api/services/taskServices";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/notificationSlice";
import { Pagination, Stack, Typography } from "@mui/material";

const Main = () => {
  const [openTaskModal, setOpenTaskModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [taskCategory, setTaskCategory] = useState({
    "inProgress" : 0,
    "onHold" : 0,
    "newAssigned" : 0,
    "completed" : 0,
  })
  let [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (value) => {
    setSearchParams({ page: value });
    setPage(value);
  };

  useEffect(() => {
    location.search == "" && setPage(1);
  }, [location.search]);
  
  useEffect(() => {
    (async function fetchAllTasks() {
      try {
        let query = location?.search == "" ? "?page=1" : location?.search;
        let tasks = await fetchTasks(query);
        let inProgress, newAssigned, completed, onHold;
        if (tasks?.ok) { 
          inProgress = tasks?.data?.filter(task=> task?.work_status == "In Progress")
          onHold = tasks?.data?.filter(task=> task?.work_status == "On Hold")
          completed = tasks?.data?.filter(task=> task?.work_status == "Completed")
          setTaskCategory(pre=>{
            return{
              ...pre,
              "inProgress": inProgress?.length,
              "onHold": onHold?.length,
              "completed": completed?.length,
            }
          })
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
    

  return (
    <div className="main">
      <div className="left">
        <div className="cardContainer">
          <Card value ={taskCategory?.inProgress} title="Task In Progress" bg={"#f48942"} />
          <Card value ={taskCategory?.newAssigned} title="New Assigned" bg={"#817cdf"} />
          <Card value ={taskCategory?.completed} title="Task completed" bg={"#38b7d3"} />
          <Card value ={taskCategory?.onHold} title="Task On Hold" bg={"#e54b6e"} />
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
                <TaskCard key={index} {...task} />
            );
          })}
          {tasks?.length == 0 ? <div className="noTask">No Task Found!</div> : null}
          {tasks?.length > 3 && <Stack spacing={2}>
            <Typography>Page: {page}</Typography>
            <Pagination count={10} page={page} onChange={handleChange} />
          </Stack>}
        </div>
      </div>
      <div className="right"></div>
      <AddTaskModal isOpen={openTaskModal} closeModal={setOpenTaskModal} />
    </div>
  );
};

export default Main;
