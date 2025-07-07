import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "books",
        element: <h1>I am from books</h1>,
      },
    ],
  },
]);

export default router;
