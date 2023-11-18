import React, { useEffect, useState } from "react";
import "../styles/scss/auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { handleSignIn, handleSignUp } from "../api/services/userServices";
import { useSelector, useDispatch } from "react-redux";
import {
  setError,
  setLoading,
  setMessage,
  setRedirect,
  setUser,
} from "../redux/userSlice";
import Alert from "@mui/material/Alert";

const Auth = () => {
  const state = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signInInfo, setSignInInfo] = useState({
    email: "",
    password: "",
  });
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSignUpState = (event) => {
    setSignUpInfo({ ...signUpInfo, [event.target.id]: event.target.value });
  };
  const handleSignInState = (event) => {
    setSignInInfo({ ...signInInfo, [event.target.id]: event.target.value });
  };

  const btnclick = () => {
    const container = document?.getElementById("container");

    let rightPanelActive = container.classList.contains("right-panel-active");
    if (rightPanelActive) {
      container.classList.remove("right-panel-active");
    } else {
      container.classList.add("right-panel-active");
    }
  };
  const handleSignInLogic = async (event) => {
    event.preventDefault();
    if (!signInInfo?.email) {
      dispatch(setError("Please add email id"));
      return;
    } else if (!signInInfo?.password) {
      dispatch(setError("Please enter your password"));
      return;
    } else if (signInInfo?.password.length < 6) {
      dispatch(setError("Password must be of length 6"));
      return;
    }
    dispatch(setLoading());
    try {
      let userData = await handleSignIn(signInInfo);
      userData?.ok && dispatch(setUser(userData));
      userData?.ok && dispatch(setRedirect("/"));
      userData?.ok && dispatch(setMessage("Logged in successfully"));
      if (!userData?.ok) {
        dispatch(setError(userData?.message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const handleSignUpLogic = async (event) => {
    event.preventDefault();
    if (!signUpInfo?.name) {
      dispatch(setError("Please enter your name"));
      return;
    } else if (!signUpInfo?.email) {
      dispatch(setError("Please add email id"));
      return;
    } else if (!signUpInfo?.password) {
      dispatch(setError("Please enter your password"));
      return;
    } else if (signUpInfo?.password.length < 6) {
      dispatch(setError("Password must be of length 6"));
      return;
    }
    dispatch(setLoading());
    try {
      let userData = await handleSignUp(signUpInfo);
      userData?.ok && dispatch(setMessage(userData?.message));
      userData?.ok && dispatch(setRedirect("loginForm"));
      if (!userData?.ok) {
        dispatch(setError(userData?.message));
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  useEffect(() => {
    if (state.redirectPath === "loginForm") {
      const container = document?.getElementById("container");
      container.classList.remove("right-panel-active");
    }
  }, [state.redirectPath]);

  useEffect(() => {
    if (state?.redirectPath === "/") {
      navigate("/");
      dispatch(setRedirect(null));
    }
  }, [state?.redirectPath]);

  useEffect(() => {
    let timer;
    if (state?.error) {
      timer = setTimeout(() => {
        dispatch(setError(null));
        dispatch(setRedirect(null));
      }, 5000);
    } else if (state?.message) {
      timer = setTimeout(() => {
        dispatch(setMessage(null));
        dispatch(setRedirect(null));
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [state.error, state?.message]);

  return (
    <div className="authContainer" id="container">
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignUpLogic}>
          <h1>Create Account</h1>
          <input
            id="name"
            type="text"
            placeholder="Name"
            onChange={handleSignUpState}
          />
          <input
            id="email"
            type="email"
            placeholder="Email"
            onChange={handleSignUpState}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={handleSignUpState}
          />
          <button className="button">
            {state?.loading ? "Please Wait..." : "Sign Up"}
          </button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form onSubmit={handleSignInLogic}>
          <h1>Sign in</h1>
          <input
            id="email"
            type="email"
            placeholder="Email"
            onChange={handleSignInState}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            onChange={handleSignInState}
          />
          <Link className="link" to="/resetpassword">
            Forgot your password?
          </Link>
          <button className="button" type="submit">
            {state?.loading ? "Please Wait..." : "Sign In"}
          </button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button
              className="button ghost"
              id="signUp"
              onClick={() => btnclick()}
            >
              Sign Up
            </button>
          </div>
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button
              className="button ghost"
              id="signIn"
              onClick={() => btnclick()}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      {state?.error && (
        <Alert
          severity="error"
          className="errorAlert"
          onClose={() => {
            dispatch(setError(null));
          }}
        >
          {state?.error}!
        </Alert>
      )}
      {(state?.redirectPath === "loginForm" || state?.message) && (
        <Alert
          severity="success"
          className="errorAlert"
          onClose={() => {
            dispatch(setMessage(null));
          }}
        >
          {state?.message}!
        </Alert>
      )}
    </div>
  );
};

export default Auth;
