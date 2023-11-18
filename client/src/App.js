import Main from "./components/main";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/navbar";
import Auth from "./components/auth";
import Task from "./components/task"
import Alert from "@mui/material/Alert";
function App() {
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
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
