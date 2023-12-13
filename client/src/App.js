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
import { useDispatch, useSelector } from "react-redux";
import Profile from "./pages/profile";
import { getCurrentUserInfo } from "./api/services/userServices";
import { setMessage } from "./redux/notificationSlice";
import { setUser } from "./redux/userSlice";


function App() {
  const currentUser = useSelector((state) => state.user?.currentUser?.user);
  const dispatch = useDispatch()

  useEffect(() => {
    !currentUser && (async function retriveUserInfo(){
      try {
        let user = await getCurrentUserInfo()
        dispatch(setUser(user?.data));
      } catch (error) {
        dispatch(
          setMessage({
            notificationType: "error",
            message: error?.message,
          })
        );
      }
    })()
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
