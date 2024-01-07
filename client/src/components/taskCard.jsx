import React, { useState } from "react";
import "../styles/scss/taskCard.scss";
import HubIcon from "@mui/icons-material/Hub";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ApiIcon from "@mui/icons-material/Api";
import AnchorIcon from "@mui/icons-material/Anchor";
import DeblurIcon from "@mui/icons-material/Deblur";
import GrassIcon from "@mui/icons-material/Grass";
import FilterVintageIcon from "@mui/icons-material/FilterVintage";
import HiveIcon from "@mui/icons-material/Hive";
import MediationIcon from "@mui/icons-material/Mediation";
import StreamIcon from "@mui/icons-material/Stream";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "../styles/scss/more.scss"
import DropDown from '../components/dropDown';
import Avatars from "../building-block/avatars";

import { ClickAwayListener } from "@mui/base/ClickAwayListener";

const TaskCard = ({ _id, title, description, people, progress }) => {
  const [openOption, setOpenOption] = useState(false);

  const handleClickAway = () => {
    setOpenOption(null);
  };
  return (
    <ClickAwayListener
      onClick={(e) => e.stopPropagation()}
      onClickAway={handleClickAway}
    >
      <div className="taskCard">
        <div className="iconShade">
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
        <div className="moreIconContainer">
          <div title="More Action">
            <MoreVertIcon
              className="moreIcon"
              onClick={(e) => {
                e.stopPropagation();
                setOpenOption(pre=>{
                 return pre ? null : _id
                });
              }}
            />
          </div>
         {openOption  && <DropDown taskId={_id} />}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default TaskCard;
