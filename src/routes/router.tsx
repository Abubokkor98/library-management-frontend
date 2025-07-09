import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AllBooks from "@/pages/AllBooks";
import CreateBook from "@/pages/CreateBook";
import BorrowSummery from "@/pages/BorrowSummery";
import BookDetails from "@/pages/BookDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "books",
        Component: AllBooks,
      },
      {
        path: "create-book",
        Component: CreateBook,
      },
      {
        path: "books/:id",
        Component: BookDetails,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummery,
      },
    ],
  },
]);

export default router;
