import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store/store.js";
import { StyledEngineProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
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
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </StyledEngineProvider>
  </StrictMode>
);
