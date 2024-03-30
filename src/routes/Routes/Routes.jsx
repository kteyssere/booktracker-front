import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider/AuthProvider";
import RegisterPage from "../RegisterPage/RegisterPage";
import LoginPage from "../LoginPage/LoginPage";
import Logout from "../Logout/Logout";
import App from "../../App";
import Home from "../Home/Home";
import Explore from "../Explore/Explore";
import Discussions from "../Discussions/Discussions";
import ErrorPage from "../ErrorPage/ErrorPage";
import BookshelfPage from "../BookshelfPage/BookshelfPage";
import BookDetailsPage from "../BookDetailsPage/BookDetailsPage";

const Routes = () => {
  const { token } = useAuth();

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <App />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/",
          index: true,
          element: <Home />,
        },
        {
          path: "/bookshelf",
          element: <BookshelfPage />,
        },
        {
          path: "/explore",
          element: <Explore />,
        },
        {
          path: "/discussions",
          element: <Discussions />,
        },
        {
          path: "/book-details/:id",
          element: <BookDetailsPage />,
        },
      ],
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    }
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    }
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;