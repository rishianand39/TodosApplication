import React, { useEffect, useState } from "react";
import Avatar from "./avatar";
import "../styles/scss/dropdownOption.scss";
import Tick from "../assets/blacktick.gif";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/notificationSlice";
const IconAndName = ({ name, handleClick, user, membersDetail }) => {
  const [showTick, setShowTick] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    membersDetail?.map((member) => {
      return member._id == user._id && setShowTick(true);
    });
  }, []);
  console.log(user?._id, "mf")


  return (
    <div className="member" onClick={() =>{
      if(showTick){
        dispatch(
          setMessage({
            Notification : "info",
            message : `${name} already added in member list`
          })
        )
        return
      }
      handleClick(user)
      setShowTick(true)
    }
    } >
      <Avatar name={name} size="28px" />
      <span>{name}</span>
      {showTick && <img className="tick" src={Tick} alt="tick" />}
    </div>
  );
};

export default IconAndName;
