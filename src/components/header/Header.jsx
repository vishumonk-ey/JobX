import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import {
  Sun,
  Moon,
  User,
  Mail,
  Briefcase,
  LogOut,
  Settings,
  ChevronDown,
  MailIcon,
} from "lucide-react";
import accountIcon from "../../assets/account.svg";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "../../appwrite/authService";
import { logout } from "../../store/authSlice";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dashboardForLarge = (
    <Link
      to="/dashboard"
      className="text-lg hover:underline hover:underline-offset-2 decoration-indigo-500 transition "
    >
      Dashboard
    </Link>
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const themeToggle = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };
  // const userData = useSelector((state)=>state.userData)
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userData = useSelector((state) => state.auth.userData);
  console.log("ud" ,userData);
  
  // const userData = {
  //   name: "John Doe",
  //   email: "john.doe@example.com",
  //   totalApplied: 12,
  //   avatar: accountIcon,
  // };
  const LogOutHanlder = async () => {
    try {
      const result = await authService.Logout();
      if (result) {
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      console.log("error while logging out", error);
    }
  };
  console.log("login ", isLoggedIn);
  const total = useSelector((state)=>state.jobs)
  console.log("T",total);
  
  return (
    <header className="w-full">
      <div className="px-6 md:px-15 bg-indigo-300 py-2 flex items-center justify-between dark:text-white">
        <Link className="flex items-center space-x-2" to="/">
          <Logo />
          <p className="font-bold text-2xl">JobX</p>
        </Link>
        <div className="flex items-center space-x-5">
          <div
            className="flex flex-1 items-center justify-center cursor-pointer "
            onClick={themeToggle}
          >
            {theme === "dark" ? (
              <Moon className="w-5 h-5 transition duration-300 " />
            ) : (
              <Sun className="w-5 h-5 transition duration-300" />
            )}
          </div>
          {isLoggedIn && (
            <div className="hidden md:flex flex-1 items-center justify-center ">
              {dashboardForLarge}
            </div>
          )}

          {/* Modern User Profile Popover */}
          {isLoggedIn && (
            <Popover className="hidden md:block relative">
              <PopoverButton className="group flex items-center space-x-2 p-2 rounded-full hover:bg-indigo-400/20 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-indigo-400">
                <div className="">
                  <img
                    src={accountIcon}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    alt="Profile"
                  />
                  {/* <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div> */}
                </div>
                <ChevronDown className="w-4 h-4 text-indigo-700 group-hover:text-indigo-800 transition-transform duration-200 group-data-[headlessui-state=open]:rotate-180" />
              </PopoverButton>

              <PopoverPanel
                anchor="bottom"
                className="z-50 mt-2 w-65 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="p-4">
                  {/* User Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <div>
                      <img
                        src={accountIcon}
                        className="w-12 h-12 rounded-full border-3 border-indigo-100"
                        alt="Profile"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {userData?.name}
                      </h3>
                      <p className="text-sm text-gray-500">{userData?.email}</p>
                    </div>
                  </div>

                  {/* User Stats */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Total Applied
                        </span>
                      </div>
                      <span className="text-lg font-bold text-indigo-600">
                        {total ? total : " - " }
                      </span>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-1">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors duration-150">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">Profile</span>
                    </button>

                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors duration-150">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">Messages</span>
                    </button>

                    <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors duration-150">
                      <Settings className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">Settings</span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 my-4"></div>

                  {/* Logout Button */}
                  <button
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                    onClick={LogOutHanlder}
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Sign Out</span>
                  </button>
                </div>
              </PopoverPanel>
            </Popover>
          )}
          {isLoggedIn && (
            <div
              className="flex flex-col justify-center items-center w-5 h-5 gap-[4px] md:hidden"
              onClick={() => {
                setisMenuOpen(!isMenuOpen);
              }}
            >
              <span
                className={
                  isMenuOpen
                    ? " rotate-45 translate-y-1 h-0.5 w-full bg-black rounded-sm transition"
                    : "h-0.5 w-full bg-black rounded-sm transition"
                }
              ></span>
              <span
                className={
                  isMenuOpen
                    ? "hidden transition"
                    : "h-0.5 w-full bg-black rounded-sm transition"
                }
              ></span>
              <span
                className={
                  isMenuOpen
                    ? " -rotate-45 h-0.5 w-full bg-black rounded-sm -translate-y-0.5 transition"
                    : "h-0.5 w-full bg-black rounded-sm transition"
                }
              ></span>
            </div>
          )}
        </div>
      </div>
      <div
        className={
          isMenuOpen
            ? "fixed left-0 top-0 bottom-0 right-0 opacity-100 transition duration-300 translate-x-0 bg-white"
            : "-translate-x-10 opacity-0 transition duration-300 hidden"
        }
      >
        <div className="p-6">
          {/* userProfile */}
          <div className="flex items-center space-x-3 mb-4">
            <div>
              <img
                src={accountIcon}
                className="w-12 h-12 rounded-full border-2 border-indigo-100"
                alt="profile"
              />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-lg">
                {userData?.name}
              </p>
              <p className="text-sm text-gray-500">{userData?.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 mb-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span className="text-gray-700 text-sm font-medium">
                Total Applied
              </span>
            </div>
            <span className="text-lg font-bold text-indigo-600">
              {userData?.totalApplied}
            </span>
          </div>
          {/* mobile navigation */}
          <div className="p-4 space-y-2 text-gray-700">
            <Link
              to="/dashboard"
              className="flex items-center space-x-2 py-3 hover:bg-indigo-50 rounded-lg transition"
              onClick={() => setisMenuOpen(false)}
            >
              <Briefcase className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <Link
              to="#"
              className="flex items-center space-x-2 py-3 hover:bg-indigo-50 rounded-lg transition"
              onClick={() => setisMenuOpen(false)}
            >
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Profile</span>
            </Link>
            <Link
              to="/messages"
              className="flex items-center space-x-2 py-3 hover:bg-indigo-50 rounded-lg transition"
              onClick={() => setisMenuOpen(false)}
            >
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Messages</span>
            </Link>
            <Link
              to="#"
              className="flex items-center space-x-2 py-3 hover:bg-indigo-50 rounded-lg transition"
              onClick={() => setisMenuOpen(false)}
            >
              <Settings className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Settings</span>
            </Link>
          </div>
          <span className="border-t border-gray-200 my-4"></span>
          <button
            className="p-3 rounded-lg text-red-500 space-x-2 flex items-center hover:bg-red-50 transition"
            onClick={LogOutHanlder}
          >
            <LogOut className="w-4 h-4 text-red-500" />
            <span className="text-red-700 text-sm font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
export default Header;
