import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store/store.js";
import { StyledEngineProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import { AddJobPage, AuthLayout, DashboardPage, EditPage, HomePage, LoginPage, SignupPage, ViewPage } from "./components/index.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout isRequired={true}>
            <HomePage />
          </AuthLayout>
        ),
      },
      {
        path : "/view-page/:slug",
        element : (
          <AuthLayout isRequired={true}>
            <ViewPage/>
          </AuthLayout>
        )
      } ,
      {
        path : "/edit-page/:slug",
        element : (
          <AuthLayout isRequired={true}>
            <EditPage/>
          </AuthLayout>
        )
      } ,
      {
        path : "/add-page",
        element : (
          <AuthLayout isRequired={true}>
            <AddJobPage/>
          </AuthLayout>
        )
      } ,
      {
        path : "/login",
        element : (
          <AuthLayout>
            <LoginPage/>
          </AuthLayout>
        )
      } ,
      {
        path : "/signup",
        element : (
          <AuthLayout>
            <SignupPage/>
          </AuthLayout>
        )
      } ,
      {
        path : "/dashboard",
        element : (
          <AuthLayout isRequired={true}>
            <DashboardPage/>
          </AuthLayout>
        )
      } ,
      
      
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
