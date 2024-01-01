import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import ApplicationStatus from "./Pages/ApplicationStatus";
import CreateApplication from "./Pages/CreateApplication";
import CheckApplication from "./Pages/CheckApplication";
import Application from "./Pages/Application";
import Admin from "./Pages/Admin/Admin";
import AdminApplication from "./Pages/Admin/Application";
import ApplicationList from "./Pages/Admin/ApplicationList";
import { useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";

const RedirectFromRoot = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/basvuru-olustur");
  }, [navigate]);

  return null;
};

function App() {
  const router = createBrowserRouter([
    {
      // parent route component
      element: <Layout />,
      // child route components
      children: [
        {
          path: "/",
          element: <RedirectFromRoot />,
        },
        {
          path: "/basvuru-olustur",
          element: <CreateApplication />,
        },
        {
          path: "/basvuru-basarili/:insertId",
          element: <ApplicationStatus />,
        },
        {
          path: "/basvuru-sorgula",
          element: <CheckApplication />,
        },
        {
          path: "/basvuru/:id",
          element: <Application />,
        },
        {
          path: "/admin",
          children: [
            {
              index: true,
              element: <Admin />,
            },
            {
              path: "basvuru/:id",
              element: <PrivateRoute Component={AdminApplication} />,
            },
            {
              path: "basvuru-listesi",
              element: <PrivateRoute Component={ApplicationList} />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
