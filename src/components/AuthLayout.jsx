import { LoaderPinwheel } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function AuthLayout({ isRequired, children }) {
  console.log("children is :", children);
  const isAuthenticated = useSelector((state) => state.isLoggedIn);
  const [isLoading , setisLoading] = useState(true)
  const navigate = useNavigate();
  useEffect(()=>{
    if(isRequired && !isAuthenticated){
        navigate('/login')
    }
    setisLoading(false)
  } , [isAuthenticated])
  return isLoading ? (
    <div className="w-full">
          <LoaderPinwheel className="animate-spin size-5"/> 
    </div>
  ) : children 
}

export default AuthLayout;
