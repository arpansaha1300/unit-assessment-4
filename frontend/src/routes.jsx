import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/default";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Suppliers from "./pages/Suppliers";
import Packages from "./pages/Packages";
import Profile from "./pages/Profile";
import EditSupplier from "./pages/suppliers/Edit";
import EditPackage from "./pages/packages/Edit";
import AddSupplier from "./pages/AddSupplier";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/suppliers-list",
        element: <Suppliers />,
      },

      {
        path: "/suppliers-list/:supplierId/edit",
        element: <EditSupplier />,
      },

      {
        path: "/package-list",
        element: <Packages />,
      },

      {
        path: "/package-list/:packageId/edit",
        element: <EditPackage />,
      },

      {
        path: "/supplier-profile",
        element: <Profile />,
      },
      {
        path: "/add-supplier",
        element: <AddSupplier />,
      },
    ],
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
  return <RouterProvider router={router} />;
}
