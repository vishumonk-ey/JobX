import { useState } from "react";
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
import PostForm from "./components/Postform";
import { BellRing } from "lucide-react";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full ">
      {/* <Login/> */}
      {/* <JobItem/> */}
      <Input icon={<BellRing className="w-5 h-4"/>} label="input"/>
    </div>
  );
}

export default App;
