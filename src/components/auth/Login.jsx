import React, { useEffect, useState } from "react";
import { signInWithGoogle } from "@/firebase"; // Import the function
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import RightContent from "../../assets/RightContent.jpg";
import Logo from "../../assets/Logo.png";
import { Button } from "../ui/button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [searchParams] = useSearchParams();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        dispatch(setLoading(true));
        const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // Ensures cookies are sent
        });

        if (res.data.success) {
            dispatch(setUser(res.data.user));

            // Store the token in localStorage ✅
            localStorage.setItem("token", res.data.token);

            const redirectUrl = searchParams.get("redirect") || "/";
            navigate(redirectUrl);
            toast.success(res.data.message);
        }
    } catch (error) {
        console.error(error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
    } finally {
        dispatch(setLoading(false));
    }
};


  useEffect(() => {
    if (user) {
      const redirectUrl = searchParams.get("redirect") || "/";
      navigate(redirectUrl); // Ensure the user is redirected correctly
    }
  }, [user, navigate, searchParams]);

  // Check theme from localStorage and apply on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkTheme(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkTheme(false);
    }
  }, []);


  const googleLoginHandler = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    const result = await signInWithGoogle(); // Assume this returns { idToken, success }
  
    if (result.success) {
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/google-login`,
          { idToken: result.idToken }, // ✅ Send the ID token
          { withCredentials: true } // Ensure cookies are handled correctly
        );
  
        if (res.data.success) {
          dispatch(setUser(res.data.user));
          localStorage.setItem("token", res.data.token); // Store JWT token in localStorage
          toast.success("Logged in successfully!");
          navigate("/"); // Redirect after successful login
        }
      } catch (error) {
        toast.error("Google Login failed.");
      }
    } else {
      toast.error("Google Login failed.");
    }
  };
  


  return (
    <div className="bg-[#141718] h-screen">
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login to your account" />
        <link rel="canonical" href="https://jobsintech.live/login" />
      </Helmet>
      <Link to="/">
        <img
          src={Logo}
          alt="Logo"
          className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-5 w-24 z-[100]"
        />
      </Link>
      <div className="flex h-full">
        <div className="w-full lg:w-1/2 h-full relative">
          <img
            src={RightContent}
            alt="Man and a giant snowball artistic"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center lg:hidden">
            <form
              onSubmit={submitHandler}
              autoComplete="off"
              className="bg-gray-800 p-6 rounded-md shadow-lg w-11/12 max-w-md"
            >
              <h1 className="font-bold text-xl mb-5 text-white">
                Welcome back!
              </h1>
              <div className="my-4">
                <Label className="text-gray-700 dark:text-gray-300">
                  Email
                </Label>
                <Input
                  type="email"
                  value={input.email}
                  name="email"
                  onChange={changeEventHandler}
                  placeholder="Your Email Address"
                  className="mt-2 px-3 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
              <div className="my-4">
                <Label className="text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <Input
                  type="password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  placeholder="Your Password"
                  className="mt-2 px-3 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
              {loading ? (
                <Button className="w-full my-4 bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Please wait
                </Button>
              ) : (
                <div>
                  {" "}
                  <Button className="w-full my-4 bg-blue-500 text-white hover:bg-blue-600">
                    Login
                  </Button>
                  <Button
                    onClick={(e) => googleLoginHandler(e)} // Ensure it doesn't trigger form submit
                    className="w-full my-4 bg-red-500 text-white hover:bg-red-600"
                  >
                    Sign in with Google
                  </Button>
                </div>
              )}
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-600 dark:text-blue-400">
                  Signup
                </Link>
              </span>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center w-1/2 bg-gray-900">
          <form
            onSubmit={submitHandler}
            autoComplete="off"
            className="w-full rounded-md p-6 bg-white dark:bg-gray-800 shadow-lg max-w-md"
          >
            <h1 className="font-bold text-xl mb-5 text-black dark:text-white">
              Welcome back!
            </h1>
            <div className="my-4">
              <Label className="text-gray-700 dark:text-gray-300">Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="Your Email Address"
                className="mt-2 px-3 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
            <div className="my-4">
              <Label className="text-gray-700 dark:text-gray-300">
                Password
              </Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="Your Password"
                className="mt-2 px-3 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
            {loading ? (
              <Button className="w-full my-4 bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <div>
                <Button
                  onClick={(e) => googleLoginHandler(e)} // Ensure it doesn't trigger form submit
                  className="w-full my-4 bg-red-500 text-white hover:bg-red-600"
                >
                  Sign in with Google
                </Button>
                <Button className="w-full my-4 bg-blue-500 text-white hover:bg-blue-600">
                  Login
                </Button>
              </div>
            )}
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 dark:text-blue-400">
                Signup
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
