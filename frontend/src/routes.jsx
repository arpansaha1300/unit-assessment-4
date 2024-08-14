import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layouts/default";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Suppliers from "./pages/Suppliers";
import Packages from "./pages/Packages";
import Profile from "./pages/Profile";
import EditSupplier from "./pages/suppliers/Edit";
import EditPackage from "./pages/packages/Edit";
import AddSupplier from "./pages/AddSupplier";
import AddPackage from "./pages/AddPackage";
import store from "./redux/store";
import Estimation from "./pages/Estimation";

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: () => {
      if (store.getState().auth.isAuthenticated) return null;

      return new Promise((res, rej) => {
        const unsub = store.subscribe(() => {
          unsub();
          if (store.getState().auth.isAuthenticated) res(null);
          else rej(redirect("/"));
        });
      });
    },
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
      {
        path: "/add-package",
        element: <AddPackage />,
      },
      {
        path: "/estimation",
        element: <Estimation />,
      },
    ],
  },

  {
    loader: () => {
      const isAuth = store.getState().auth.isAuthenticated;
      if (isAuth === null || isAuth === false) return null;
      else throw new Error("Forbidden");
    },
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: "/",
        element: <Login />,
      },

      {
        path: "/sign-up",
        element: <Signup />,
      },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
