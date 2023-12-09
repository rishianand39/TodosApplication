import React from "react";
import { AvatarIcon } from "../styles/styled-components/container";

const Avatar = ({ size , name="Guest User"}) => {
  let Icon = name?.split(" ")
  return (
    <AvatarIcon size={size} >
      {Icon[0][0]?.toUpperCase()}{Icon?.length==2 && Icon[1][0]?.toUpperCase()}
    </AvatarIcon>
  );
};

export default Avatar;
