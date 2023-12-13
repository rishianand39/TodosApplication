import React, { useEffect, useState } from "react";
import Input from "../building-block/Input";
import "../styles/scss/profile.scss";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ProfileImage from "../building-block/profileImage";
import SaveBtn from "../building-block/saveBtn";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/imageUpload";
import { fetchUserData } from "../api/services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/notificationSlice";
import { useParams } from "react-router-dom";

const Profile = () => {
  const currentUserDetails = useSelector(
    (store) => store?.user?.info
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const [updatedUserDetails, setUpdatedUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    avatar: "",
    coverImage: "",
  });
  const handleInputField = (event) => {
    setUpdatedUserDetails((pre) => {
      return {
        ...pre,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleImageUpload = (event) => {
    const metadata = {
      contentType: "image/jpeg",
    };
    const storageRef = ref(
      storage,
      "taskManagerImages/" + event.target.files[0].name
    );
    const uploadTask = uploadBytesResumable(
      storageRef,
      event.target.files[0],
      metadata
    );

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            console.log("storage/unauthorized");
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            console.log("storage/canceled");

            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            console.log("storage/unknown");

            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUpdatedUserDetails((pre) => {
            return {
              ...pre,
              [event.target.name]: downloadURL,
            };
          });
        });
      }
    );
  };
  const handleFormSubmit = (event) => {
    
  }
  useEffect(()=>{
    setUpdatedUserDetails({
      name: currentUserDetails?.name,
      email: currentUserDetails?.email,
      phone: currentUserDetails?.phone,
      city: currentUserDetails?.city,
      country: currentUserDetails?.country,
      avatar: currentUserDetails?.avatar,
      coverImage: currentUserDetails?.coverImage,
    })
  },[currentUserDetails])
  console.log(currentUserDetails)
  return (
    <div className="profileContainer">
      <div className="cover">
        {updatedUserDetails?.coverImage && (
          <img src={updatedUserDetails.coverImage} alt="" />
        )}
        <div className="upload">
          <label htmlFor="coverUpload">
            <CameraAltIcon />
            <span>Change Cover</span>
          </label>
          <input
            type="file"
            name="coverImage"
            id="coverUpload"
            onChange={handleImageUpload}
          />
        </div>
        <ProfileImage
          image={updatedUserDetails?.avatar}
          handleImageUpload={handleImageUpload}
        />
      </div>
      <div className="updateFields">
        <Input
          label="Name"
          inputType="text"
          value={updatedUserDetails?.name}
          handleInput={handleInputField}
        />
        <Input
          label="Email"
          inputType="email"
          value={updatedUserDetails?.email}
          handleInput={handleInputField}
        />
        <Input
          label="Phone"
          inputType="number"
          value={updatedUserDetails?.phone}
          handleInput={handleInputField}
        />
        <Input
          label="City"
          inputType="text"
          value={updatedUserDetails?.city}
          handleInput={handleInputField}
        />
        <Input
          label="Country"
          inputType="text"
          value={updatedUserDetails?.country}
          handleInput={handleInputField}
        />
      </div>
      <div className="update">
        <SaveBtn width="150px" text="Update" />
      </div>
    </div>
  );
};

export default Profile;
