import Main from "./components/main";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Auth from "./components/auth";
import Task from "./components/task"
import Notification from "./building-block/notification";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Profile from "./pages/profile";


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const getCookie = (name) => {
      const cookies = document.cookie.split('; ');
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
          return cookieValue;
        }
      }
      return null;
    };

    // Check if the 'yourToken' cookie exists
    const storedToken = getCookie('yourToken');

    if (storedToken) {
      // If the token exists, update Redux state with the user information
      
    } else {
      // If the token doesn't exist, you may choose to log the user out or take other actions
      // dispatch(logout());
    }
  }, []);

  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Main />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/task/:id",
          element : <Task />
        }
      ],
    },
  ]);

  return (
    <div className="container">
      <Notification />
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
