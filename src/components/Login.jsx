import React, { useState , useEffect } from "react";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../appwrite/authService";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import googleLogo from "../assets/google.svg";
import { GithubIcon } from "lucide-react";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.origin);
  const secret = urlParams.get("secret");
  const userId = urlParams.get("userId");
  const LoginHandler = async (data) => {
    try {
      let loggedInUserData;
      loggedInUserData = await authService.Login(data);
      if (loggedInUserData) {
        dispatch(login(loggedInUserData));
        navigate("/");
      }
    } catch (error) {
      setError(error);
      console.log("error in logging in", error);
    }
  };
  const googleAuthHandler = () => {
    authService.OAuthGoogle();
  };
  const githubAuthHandler = () => {
    authService.OAuthGithub();
  };
  const loginWithToken = async () => {
    try {
      if (secret && userId) {
        const userData = await authService.createSessionWithToken({
          userId,
          secret,
        });
        loggedInUserData = userData;
        console.log("loggedInUserData : ", loggedInUserData);
        if (loggedInUserData) {
          dispatch(login(loggedInUserData));
          navigate("/");
        }
      }
    } catch (error) {
      console.log("error in loggin in with token : ", error);
    }
  };
  useEffect(() => {
    loginWithToken()
  }, [loginWithToken]);
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-lg bg-indigo-200 flex flex-col items-center p-10 rounded-lg">
        <Logo />
        <h1 className="font-bold text-2xl">Login in to your account</h1>
        <p>
          Don't have an account ?{" "}
          <Link to="/signup">
            <span className="text-white hover:text-indigo-500 transition-colors ease-in-out duration-300">
              Signup
            </span>
          </Link>
        </p>
        <form onSubmit={handleSubmit(LoginHandler)} className="mt-4 w-full">
          {error && <p className="text-red-400 mb-1">{error.message}</p>}
          {/* <div className="w-full">
                <Input
                  type="text"
                  placeholder="Name"
                  autoComplete="off"
                  label="Name"
                  {...register("name", {
                    required: true,
                  })}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                )}
              </div> */}
          <div className="w-full">
            <Input
              label="Email "
              type="text"
              placeholder="Email"
              autoComplete="off"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}

              // connects the input with the react hook form , which helps the RHF to track its value,validate its value and include it in form submission
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="w-full mt-2">
            <Input
              label="Password"
              placeholder="Password"
              type="password"
              autoComplete="off"
              {...register("password", {
                required: true,
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                  message:
                    "Password must be 8+ chars, with uppercase, lowercase, number & symbol",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button className="w-full text-white mt-4">Login</Button>
        </form>

        <div className="w-full flex items-center mt-2">
          <p className="h-px flex-1 bg-gray-200"></p>
          <p className="text-base text-indigo-600 px-3">Or continue with</p>
          <p className="h-px flex-1 bg-gray-200"></p>
        </div>
        <div className="w-full mt-2 flex items-center space-x-3">
          <Button
            className="flex-1 flex items-center justify-center"
            onClick={googleAuthHandler}
          >
            <img src={googleLogo} className="h-5 w-5 mr-1" />
            Google
          </Button>
          <Button
            className="flex-1 flex items-center justify-center"
            onClick={githubAuthHandler}
          >
            <GithubIcon className="w-5 h-5 mr-1" />
            Github
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
