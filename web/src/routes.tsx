import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Default } from "./layout/Default";
import { Reports } from "./pages/Reports/Reports";
import { Tutorials } from "./pages/Tutorials/Tutorials";
import { Editor } from "./pages/Editor/Editor";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
      {
        path: "/tutorials",
        element: <Tutorials />,
      },
      {
        path: "/tutorials/editor/:id",
        element: <Editor />,
      },
    ],
  },
]);
