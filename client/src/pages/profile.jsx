import React, { useState } from "react";
import Input from "../building-block/Input";
import "../styles/scss/profile.scss";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ProfileImage from "../building-block/profileImage";
import SaveBtn from "../building-block/saveBtn";
const Profile = () => {
  const [coverImage, setCoverImage] = useState(null);

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
          <input type="file" id="coverUpload" />
        </div>
        <ProfileImage />
      </div>
      <div className="updateFields">
        <Input label="Name" inputType="text" />
        <Input label="Email" inputType="email" />
        <Input label="Phone" inputType="number" />
        <Input label="City" inputType="text" />
        <Input label="Country" inputType="text" />
      </div>
      <div className="update">
        <SaveBtn width="150px" text="Update" />
      </div>
    </div>
  );
};

export default Profile;
