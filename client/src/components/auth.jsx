import React, { useEffect, useState } from "react";
import "../styles/scss/auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { handleSignIn, handleSignUp } from "../api/services/userServices";
import { useSelector, useDispatch } from "react-redux";
import { setError, setLoading, setRedirect, setUser } from "../redux/userSlice";
import { setMessage } from "../redux/notificationSlice";


const Auth = () => {
  const userState = useSelector((state) => state.user);
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
    let message = {
      email: "Please add your email id",
      password: "Please enter your password",
      passwordLength: "Password must be of 6 length",
    };
    if (
      !signInInfo?.email ||
      !signInInfo?.password ||
      signInInfo?.password.length < 6
    ) {
      dispatch(setError(true));
      dispatch(
        setMessage({
          notificationType: "info",
          message:
            (!signInInfo?.email && message?.email) ||
            (!signInInfo?.password && message?.password) ||
            (signInInfo?.password.length < 6 && message?.passwordLength),
        })
      );
      return;
    }

    dispatch(setLoading());
    try {
      let userData = await handleSignIn(signInInfo);
      if (userData?.ok) {
        dispatch(setUser(userData));
        dispatch(setRedirect("/"));
        dispatch(
          setMessage({
            message: userData?.message,
            notificationType: "success",
          })
        );
      } else {
        dispatch(setError(true));
        dispatch(
          setMessage({ message: userData?.message, notificationType: "error" })
        );
      }
    } catch (error) {
      dispatch(setError(true));
      dispatch(
        setMessage({ message: error?.message, notificationType: "error" })
      );
    }
  };

  const handleSignUpLogic = async (event) => {
    event.preventDefault();
    let message = {
      name: "Please enter your name",
      email: "Please add your email id",
      password: "Please enter your password",
      passwordLength: "Password must be of 6 length",
    };
    if (
      !signUpInfo?.name ||
      !signUpInfo?.email ||
      !signUpInfo?.password ||
      signUpInfo?.password.length < 6
    ) {
      dispatch(setError(true));
      dispatch(
        setMessage({
          notificationType: "info",
          message:
            (!signUpInfo?.name && message?.name) ||
            (!signUpInfo?.email && message?.email) ||
            (!signUpInfo?.password && message?.password) ||
            (signUpInfo?.password?.length < 6 && message?.passwordLength),
        })
      );
      return;
    }

    dispatch(setLoading());
    try {
      const userData = await handleSignUp(signUpInfo);
      if (userData?.ok) {
        dispatch(setRedirect("loginForm"));
        dispatch(
          setMessage({
            message: userData?.message,
            notificationType: "success",
          })
        );
      } else {
        dispatch(setError(true));
        dispatch(
          setMessage({ message: userData?.message, notificationType: "error" })
        );
      }
    } catch (error) {
      dispatch(setError(true));
      dispatch(
        setMessage({ message: error?.message, notificationType: "error" })
      );
    }
  };

  useEffect(() => {
    if (userState.redirectPath === "loginForm") {
      const container = document?.getElementById("container");
      container.classList.remove("right-panel-active");
    }
  }, [userState.redirectPath]);

  useEffect(() => {
    if (userState?.redirectPath === "/") {
      navigate("/");
      dispatch(setRedirect(null));
    }
  }, [userState?.redirectPath]);

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
            {userState?.loading ? "Please Wait..." : "Sign Up"}
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
            {userState?.loading ? "Please Wait..." : "Sign In"}
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
    </div>
  );
};

export default Auth;
