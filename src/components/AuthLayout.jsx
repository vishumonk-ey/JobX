import { Loader, LoaderCircle, LoaderPinwheel } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function AuthLayout({ isRequired, children }) {
  console.log("children is :", children);
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);
  console.log(" whole state : ", isAuthenticated);

  const [isLoading, setisLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (isRequired && !isAuthenticated) {
      navigate("/login");
    } else if (!isRequired && isAuthenticated) {
      navigate("/");
    }
    setTimeout(()=>setisLoading(false),1000)    
  }, [isAuthenticated]);
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
