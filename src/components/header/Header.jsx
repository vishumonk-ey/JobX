import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import { Sun, Moon } from "lucide-react";
import accountIcon from '../../assets/account.svg'
// import { Button } from "@material-tailwind/react";
// import { Popover } from "@mui/material";
// import Profile from 'lucide-react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
function Header() {
  const dashboardForLarge = (
    <Link
      to="/dashboard"
      className="text-lg hover:underline hover:underline-offset-2 decoration-indigo-500 transition "
    >
      Dashboard
    </Link>
  );
  const [theme, setTheme] = useState("light");
  return (
    <header className="w-full px-5 bg-indigo-300 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Logo />
        <p className="font-bold text-2xl">JobX</p>
      </div>
      <div className="flex items-center space-x-1">
        <div className="flex flex-1 items-center justify-center">
          {theme === "dark" ? (
            <Moon className="w-5 h-5 transition duration-300" />
          ) : (
            <Sun className="w-5 h-5 transition duration-300" />
          )}
        </div>
        <div className="flex flex-1 items-center justify-center">
          {dashboardForLarge}
        </div>
        <Popover className="">
          <PopoverButton className="flex rounded-full border outline-none"><img src={accountIcon} className="w-6 h-6"/></PopoverButton>
          <PopoverPanel anchor="bottom" className="flex flex-col p-3 rounded-lg w-40 bg-indigo-200">
            <p>Name : {}</p>
            <p className="h-px bg-indigo-600"></p>
            <p>Email : {}</p>
            <p className="h-px bg-indigo-600"></p>
            <p>Total Applied : {}</p>
            <p className="h-px bg-indigo-600"></p>
          </PopoverPanel>
        </Popover>
        <accountIcon className="w-5 h-5 font-bold"/>
      </div>
    </header>
  );
}
export default Header;
