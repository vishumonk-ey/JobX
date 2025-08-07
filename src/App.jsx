import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Input from "./components/Input";
import Signup from "./components/Signup";
import { Login } from "./components";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import JobItem from "./components/JobItem";
import JobTable from "./components/JobTable";
import DashBoard from "./components/DashBoard";
import { BellRing, LoaderCircle, LoaderPinwheel } from "lucide-react";
import { JobPage } from "./components/index";
import { Outlet } from "react-router-dom";
import { authService } from "./appwrite/authService";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
function App() {
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(true);
  const fetchActiveSession = async () => {
    try {
      const userData = await authService.getCurrentUser();
      if (userData) {
        dispatch(login(userData));
        // console.log("userDta" , userData);
        
      } else {
        dispatch(logout());
      }
      // the value wont be returned yet but will be remebered , and then my finally block runs and then the remembered value is returned .
    } catch (error) {
      console.log("error in fetching the active session : ", error);
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    fetchActiveSession();
  }, [fetchActiveSession]);
  // const [count, setCount] = useState(0);
  return isLoading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <LoaderCircle className="animate-spin size-10 text-indigo-600" />
    </div>
  ) : (
    <div className=" min-h-screen w-full">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
