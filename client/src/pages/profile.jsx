import React, { useEffect, useState } from "react";
import Input from "../building-block/Input";
import "../styles/scss/profile.scss";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ProfileImage from "../building-block/profileImage";
import SaveBtn from "../building-block/saveBtn";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/imageUpload";
import { updateUserDetails } from "../api/services/userServices";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/notificationSlice";

const Profile = () => {
  const currentUserDetails = useSelector((store) => store?.user?.info);
  const dispatch = useDispatch();
  const [uploadProgress, setUploadProgress] = useState(0);
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
      "taskManagerImages/" + event.target.files[0]?.name
    );
    const uploadTask = uploadBytesResumable(
      storageRef,
      event.target.files[0],
      metadata
    );

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
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
            break;
          case "storage/canceled":
            console.log("storage/canceled");

            break;
          case "storage/unknown":
            console.log("storage/unknown");
            break;
        }
      },
      () => {
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
  const handleFormSubmit = async () => {
    try {
      let res = await updateUserDetails(updatedUserDetails);
      if (res.ok) {
        dispatch(
          setMessage({
            notificationType: "success",
            message: res?.message,
          })
        );
      } else {
        dispatch(
          setMessage({
            notificationType: "error",
            message: res?.message,
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
  };

  useEffect(() => {
    setUpdatedUserDetails({
      name: currentUserDetails?.name,
      email: currentUserDetails?.email,
      phone: currentUserDetails?.phone,
      city: currentUserDetails?.city,
      country: currentUserDetails?.country,
      avatar: currentUserDetails?.avatar,
      coverImage: currentUserDetails?.coverImage,
    });
  }, [currentUserDetails]);
  console.log(uploadProgress, "uploadprogress");

  return (
    <div className="profileContainer">
      <div className="cover">
        {updatedUserDetails?.coverImage && (
          <img src={updatedUserDetails.coverImage} alt="" />
        )}
        <div className="upload">
          <div
            style={{
              width: `${uploadProgress}%`,
              height: "100%",
              backgroundColor: "#4caf50",
              transition: "350ms width",
            }}
          ></div>
          <label htmlFor="coverUpload">
            <CameraAltIcon />
            <span>Change Cover</span>
          </label>
          <input
            type="file"
            name="coverImage"
            id="coverUpload"
            onChange={handleImageUpload}
            onClick={() => setUploadProgress(0)}
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
        <SaveBtn handleSumbit={handleFormSubmit} width="150px" text="Update" />
      </div>
    </div>
  );
};

export default Profile;
