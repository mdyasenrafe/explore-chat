import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Login from "./view/pages/Login";
import "../src/styles/common.css";
import Chat from "./view/pages/Chat";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Chat />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
