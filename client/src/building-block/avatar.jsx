import React from "react";
import { AvatarIcon } from "../styles/styled-components/container";

const Avatar = ({ size , name="Gest User"}) => {
  let Icon = name?.split(" ")
  return (
    <AvatarIcon size={size} >
      {Icon[0][0]}{Icon?.length==2 && Icon[1][0]}
    </AvatarIcon>
  );
};

export default Avatar;
