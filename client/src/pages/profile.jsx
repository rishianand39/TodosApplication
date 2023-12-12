import React, { useState } from "react";
import Input from "../building-block/Input";
import "../styles/scss/profile.scss";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ProfileImage from "../building-block/profileImage";
import SaveBtn from "../building-block/saveBtn";
const Profile = () => {
  const [updatedUserDetails, setUpdatedUserDetails] = useState({
    name : '',
    email : '',
    phone : '',
    city : '',
    country : '',
    avatar : '',
    coverImage : ''
  });
  const handleInputField = (event)=>{
    setUpdatedUserDetails(pre=>{
      return {
        ...pre,
        [event.target.name] : event.target.value 
      }
    })
  }
  const handleImageUpload = (event)=>{

  }


  return (
    <div className="profileContainer">
      <div className="cover">
        <img
          src="https://images.unsplash.com/photo-1701849484867-9058dc3964fc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <div className="upload">
          <label htmlFor="coverUpload">
            <CameraAltIcon />
            <span>Change Cover</span>
          </label>
          <input type="file" name="coverImage" id="coverUpload" onChange={handleImageUpload}/>
        </div>
        <ProfileImage handleImageUpload = {handleImageUpload}/>
      </div>
      <div className="updateFields">
        <Input label="Name" inputType="text" handleInput={handleInputField} />
        <Input label="Email" inputType="email" handleInput={handleInputField}/>
        <Input label="Phone" inputType="number" handleInput={handleInputField}/>
        <Input label="City" inputType="text" handleInput={handleInputField}/>
        <Input label="Country" inputType="text" handleInput={handleInputField}/>
      </div>
      <div className="update">
        <SaveBtn width="150px" text="Update" />
      </div>
    </div>
  );
};

export default Profile;
