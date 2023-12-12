import React, { useEffect, useState } from "react";
import Input from "../building-block/Input";
import "../styles/scss/profile.scss";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ProfileImage from "../building-block/profileImage";
import SaveBtn from "../building-block/saveBtn";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../utils/imageUpload";
import { fetchUserData } from "../api/services/userServices";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/notificationSlice";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
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

  useEffect(() => {
    (async function () {
      try {
        let user = await fetchUserData(id);
        console.log(user, "user")
        if (user?.ok) {
          updatedUserDetails({
            name: user.data?.name,
            email: user.data?.email,
            phone: user.data?.phone,
            city: user.data?.city,
            country: user.data?.country,
            avatar: user.data?.avatar,
            coverImage: user.data?.coverImage,
          });
        } else {
          dispatch(
            setMessage({
              notificationType: "error",
              message: user?.message,
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
  }, []);

  return (
    <div className="profileContainer">
      <div className="cover">
        <img src={updatedUserDetails.coverImage} alt="" />
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
        <Input label="Name" inputType="text" handleInput={handleInputField} />
        <Input label="Email" inputType="email" handleInput={handleInputField} />
        <Input
          label="Phone"
          inputType="number"
          handleInput={handleInputField}
        />
        <Input label="City" inputType="text" handleInput={handleInputField} />
        <Input
          label="Country"
          inputType="text"
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
