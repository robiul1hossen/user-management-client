import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Updateuser from "./components/Home/Updateuser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/update/:id",
    element: <Updateuser></Updateuser>,
    loader: ({ params }) => fetch(`https://user-management-server-sigma.vercel.app/users/${params.id}`),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="max-w-screen-xl mx-auto	">
      {" "}
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
