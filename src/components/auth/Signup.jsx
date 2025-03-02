import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";
import RightContent from "../../assets/RightContent.jpg";
import LogoSignUp from "../../assets/LogoSignUp.png";
import {
  FaBriefcase,
  FaLightbulb,
  FaClipboardList,
  FaGlobe,
} from "react-icons/fa";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/"); 
    }
  }, []);

  return (
    <div className="bg-white dark:bg-[#141718] h-screen">
    <Helmet>
      <title>Sign In</title>
      <meta name="description" content="Signup" />
      <link rel="canonical" href="/signin" />
    </Helmet>
    
    <Link to="/">
      <img
        src={LogoSignUp}
        alt="Logo"
        className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-5 w-24 z-[100]"
      />
    </Link>
    <div className="flex flex-col lg:flex-row h-full">
      {/* Left Section: Form */}
      <div className="flex justify-center items-center w-full lg:w-1/2 h-full">
        {/* Form */}
        <form
          onSubmit={submitHandler}
          autoComplete="off"
          className="w-full rounded-md p-6 bg-white dark:bg-gray-800 shadow-lg max-w-md"
        >
          <h1 className="font-bold text-xl mb-5 text-black dark:text-white">
            Create a Free Account
          </h1>
          <div className="my-4">
            <Label className="text-gray-700 dark:text-gray-300">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Your Name"
              className="mt-2 px-3 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              autoComplete="off"
            />
          </div>
          <div className="my-4">
            <Label className="text-gray-700 dark:text-gray-300">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="example@example.com"
              className="mt-2 px-3 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              autoComplete="off"
            />
          </div>
          <div className="my-4">
            <Label className="text-gray-700 dark:text-gray-300">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Your Password"
              className="mt-2 px-3 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              autoComplete="off"
            />
          </div>
          {loading ? (
            <Button className="w-full my-4 bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button className="w-full my-4 bg-blue-500 text-white hover:bg-blue-600">
              Signup
            </Button>
          )}
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 dark:text-blue-400">
              Login
            </Link>
          </span>
        </form>
      </div>
  
      {/* Right Section: Desktop Content */}
      <div className="relative w-full lg:w-1/2 h-full hidden lg:block">
        {/* Background Photo */}
        <img
          src={RightContent}
          alt="Man and a giant snowball artistic"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay for Content */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70"></div>
        {/* Content */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white px-8 lg:px-20">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-center">
            Explore tech jobs around the world and be a part of them!
          </h2>
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
            <div className="flex items-center justify-center bg-teal-500 bg-opacity-50 p-4 rounded-md shadow-md hover:bg-teal-600 transition">
              <FaBriefcase className="text-white mr-2" />
              <span>Active Jobs Only!</span>
            </div>
            <div className="flex items-center justify-center bg-blue-500 bg-opacity-50 p-4 rounded-md shadow-md hover:bg-blue-600 transition">
              <FaLightbulb className="text-white mr-2" />
              <span>Suggested Action Steps</span>
            </div>
            <div className="flex items-center justify-center bg-red-500 bg-opacity-50 p-4 rounded-md shadow-md hover:bg-red-600 transition">
              <FaClipboardList className="text-white mr-2" />
              <span>Track Your Applications</span>
            </div>
            <div className="flex items-center justify-center bg-green-500 bg-opacity-50 p-4 rounded-md shadow-md hover:bg-green-600 transition">
              <FaGlobe className="text-white mr-2" />
              <span>Become a Digital Nomad</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default Signup;
