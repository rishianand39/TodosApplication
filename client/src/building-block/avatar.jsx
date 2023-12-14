import React from "react";
import { AvatarIcon } from "../styles/styled-components/container";

const Avatar = ({ size , name="Guest User", image}) => {
  console.log(name, image)
  let Icon = name?.split(" ")
  let firstCharacter = Icon[0][0]?.toUpperCase()
  let lastCharacter = Icon?.length==2 && Icon[1][0]?.toUpperCase()
  return (
    <AvatarIcon size={size} >
      {image ? <img src={image} /> :
      <>
      {firstCharacter}
      {lastCharacter}
      </>
      }
    </AvatarIcon>
  );
};

export default Avatar;
