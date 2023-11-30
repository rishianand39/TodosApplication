import React, { useState } from "react";
import "../styles/scss/taskCard.scss";
import HubIcon from "@mui/icons-material/Hub";
import Avatars from "../building-block/avatars";
import More from "../building-block/more";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

const TaskCard = ({ title, description, people, progress }) => {
  const [openOption, setOpenOption] = useState(false)
  
  const handleClickAway = () => {
    setOpenOption(false);
  };
  return (
    <ClickAwayListener onClick={(e)=>  e.stopPropagation()} onClickAway={handleClickAway}>
    <div className="taskCard">
      <div className="iconShade" >
        <HubIcon />
      </div>
      <div className="description">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="members">
        <Avatars people={people} />
      </div>
      <div className="progress">
        <div>
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <progress value={progress} max="100"></progress>
      </div>
      <More setOpenOption={setOpenOption} openOption={openOption}/>
    </div>
    </ClickAwayListener>
  );
};

export default TaskCard;
