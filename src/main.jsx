import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   path:'/' ,
      //   element : <Home/>
      // } ,
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Provider store = {store}> */}
      <RouterProvider router={router}></RouterProvider>
    {/* </Provider> */}
  </StrictMode>
);
