import { Loader, LoaderCircle, LoaderPinwheel } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authService } from "../appwrite/authService";
function AuthLayout({ isRequired, children }) {

  // console.log("children is :", children);
  console.log('authlayout ran and will prevent home page without login')
   authService.getCurrentUser().then(
    (res)=>{
      console.log("respone from get user",res);
    }
   ).catch((err) => console.log("err recieved in get user" , err)
  )
  
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  console.log(" isAuthenticated val : ", isAuthenticated);
  console.log(" isRequired val : ", isRequired);

  const [isLoading, setisLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation()
  // console.log("loc" , location);
  
  useEffect(() => {
    // console.log('useEffect ran');
    
    if (isRequired && !isAuthenticated) {
      console.log(" whole state : ", isAuthenticated);
      console.log('should have navigated to login');
      
      navigate("/login");
    } else if (!isRequired && isAuthenticated) {
      navigate("/");
    }
    setTimeout(()=>setisLoading(false),1000)    
  }, [location.pathname]);
  return isLoading ? (
    <div className="w-full h-[680px] flex justify-center items-center">
      <LoaderCircle className="animate-spin size-10 text-indigo-500" />
    </div>
  ) : (
    // if i am trying to load any page then AuthLayout has to be loaded , there will be useEffect check which is taking a bit of time and at that instant isLoading is true and my spinner loads ... and its just for few milliseconds which looks very bad UI wise.
    children
  );
}

export default AuthLayout;
