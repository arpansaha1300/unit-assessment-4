import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Layout from "./layouts/default";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Suppliers from "./pages/Suppliers";
import Packages from "./pages/Packages";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [

          {
              path: "/suppliers-list",
              element: <Suppliers />,
            },

            {
                path: "/package-list",
                element: <Packages />,
              },

              {
                  path: "/supplier-profile",
                  element: <Profile />,
                },
    ]
  },
  
  {
    path: "/",
    element: <Login />,
  },

  {
      path: "/sign-up",
      element: <Signup />,
    },

]);

export function AppRoutes() {
    return <RouterProvider router={router} />
}