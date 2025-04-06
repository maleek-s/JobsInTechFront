import React, { useState, useEffect, useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { AvatarComponent } from "avatar-initials";
import {
  Moon,
  Mail,
  Sun,
  ChevronDown,
  ChevronUp,
  X,
  LogOut,
  User2,
  UserPlus,
  User,
  Headphones,
  Gamepad2,
  Smartphone,
  BarChart,
  PieChart,
  Monitor,
  Shield,
  Briefcase,
  MessageCircle,
  DollarSign,
  Code,
  Server,
  Package,
  Cloud,
  Wrench,
  Cpu,
  AlertCircle,
} from "lucide-react";
import Logo from "../../assets/Logo.png";
import LogoWhite from "../../assets/Logo-White.png";
import LogoMobile from "../../assets/Logo-Mobile.png";

const Navbar = ({ isHomePage }) => {
  const { user } = useSelector((store) => store.auth);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown menu

  // Function to get the icon for a category (defaults to AlertCircle if not found)
  const getCategoryIcon = (category) => {
    return categoryIconMap[category] || AlertCircle;
  };

  // Subscribe to the Redux state to get categories
  const jobCategories = useSelector((state) => state.job.jobCategory);

  const sortedCategories = [...jobCategories]
    .filter((category) => category) // Remove null, undefined, or falsy values
    .sort((a, b) => a.localeCompare(b));

  // Handle no categories available
  if (!jobCategories || jobCategories.length === 0) {
    return <p className="text-center text-white">No categories available.</p>;
  }

  // Mapping of categories to their corresponding icons
  const categoryIconMap = {
    UXUI: User,
    SupportIT: Headphones,
    GameDevelopment: Gamepad2,
    MobileDevelopment: Smartphone,
    DataAnalyst: BarChart,
    Marketing: PieChart,
    Frontend: Monitor,
    Security: Shield,
    ProductManager: Briefcase,
    CustomerSupport: MessageCircle,
    Finance: DollarSign,
    Fullstack: Code,
    Backend: Server,
    Miscellaneous: Package,
    Cloud: Cloud,
    DevOps: Wrench,
    Robotics: Cpu,
  };

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

  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle("dark");

    const newTheme = htmlElement.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setIsDarkTheme(newTheme === "dark");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) && // Ensure click is truly outside
        !event.target.closest("[data-ignore-outside-click]") // Allow bypass for specified elements
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryClick = (e) => {
    e.stopPropagation(); // Prevents the click event from propagating
    setIsDropdownOpen(false); // Closes the dropdown
    setMenuOpen(false); // Closes the mobile menu
  };

  const loginHandler = async () => {
    if (!user?._id) {
      navigate(
        `/login?redirect=${encodeURIComponent(window.location.pathname)}`
      );
      return;
    }}

    const logoutHandler = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/logout`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUser(null));
          navigate(window.location.pathname); // No need to encode the pathname
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "An error occurred");
      }
    };
    

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Add useEffect to monitor route changes
  useEffect(() => {
    setIsDropdownOpen(false); // Close dropdown on route change
    setMenuOpen(false); // Close menu on route change
  }, [location.pathname]); // Trigger when the route changes

  const formatCategoryDisplayName = (category) => {
    return category
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camel case words
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  };


  return (
    <div>
      <div
        className={`bg-white ${
          isHomePage
            ? "dark:bg-[#141718] lg:dark:bg-transparent"
            : "dark:bg-[#141718]"
        } ${
          menuOpen ? "dark:bg-[#232627]" : ""
        } fixed w-full z-50 top-0 left-0`}
      >
        <nav
          className={`bg-[#F5F5F5] border-gray-200 ${
            isHomePage ? "dark:bg-transparent" : "dark:bg-[#141718]"
          }`}
        >
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/">
              <img
                src={isDarkTheme ? Logo : LogoWhite}
                alt="Snowball Logo"
                className="h-8"
              />
            </Link>

            <div className="lg:hidden flex items-center">
              {/* Dark mode toggle */}
              <div
                id="dark-mode-toggle"
                onClick={toggleDarkMode}
                className="transition-transform duration-300 hover:scale-110 cursor-pointer"
              >
                {isDarkTheme ? (
                  <Sun className="text-yellow-400 w-6 h-6" />
                ) : (
                  <Moon className="text-gray-500 w-6 h-6" />
                )}
              </div>

              {/* Menu toggle button */}
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                aria-controls="navbar-cta"
                aria-expanded={menuOpen ? "true" : "false"}
              >
                <span className="sr-only">
                  {menuOpen ? "Close main menu" : "Open main menu"}
                </span>
                {menuOpen ? (
                  // Close Icon
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  // Hamburger Icon
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                )}
              </button>
            </div>
            {/* Mobile menu */}
            <div
              className={`fixed inset-0 bg-[#f5f5f5] dark:bg-[#232627] z-50 flex flex-col justify-between overflow-auto p-6 mt-16 transition-transform duration-500 ease-in-out ${
                menuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
            >
              {/* Menu Items */}
              <ul className="w-full mt-4 space-y-4">
                {/* Dropdown */}
                <li className="border-b border-gray-300 dark:border-gray-600 pb-4">
                  <button
                    onClick={toggleDropdown}
                    className="w-full text-left text-gray-900 dark:text-white flex justify-between items-center"
                  >
                    Job Categories
                    {isDropdownOpen ? (
                      <ChevronUp className="inline-block" />
                    ) : (
                      <ChevronDown className="inline-block" />
                    )}
                  </button>
                  {/* Dropdown Content */}
                  <div
                    className={`mt-2 rounded-lg transition-all duration-300 ease-in-out overflow-scroll ${
                      isDropdownOpen
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {sortedCategories.map((category, index) => {
                      const Icon = getCategoryIcon(category);
                      return (
                        <Link
                          key={index}
                          to={`/categories/${category}`}
                          onClick={handleCategoryClick}
                          className="flex items-center p-3 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                        >
                          <Icon className="w-6 h-6 mr-3 text-black dark:text-white" />
                          <div>
                            <h3>{formatCategoryDisplayName(category)}</h3>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </li>

                {/* Links */}
                <li className="border-b border-gray-300 dark:border-gray-600 pb-4">
                  <Link
                    to="/remote"
                    onClick={toggleMenu}
                    className="flex items-center gap-3 text-gray-900 hover:text-gray-400 dark:text-white dark:hover:text-gray-400"
                  >
                    <Briefcase className="w-5 h-5" />
                    Fully Remote Jobs
                  </Link>
                </li>
                <li className="border-b border-gray-300 dark:border-gray-600 pb-4">
                  <Link
                    to="/contact"
                    onClick={toggleMenu}
                    className="flex items-center gap-3 text-gray-900 hover:text-gray-400 dark:text-white dark:hover:text-gray-400"
                  >
                    <Mail className="w-5 h-5" />
                    Contact
                  </Link>
                </li>
              </ul>

              {/* User Authentication Options */}
              <div className="w-full mt-8 p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
                {!user ? (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                      Welcome!
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
                      Please login or create an account to access more features.
                    </p>
                    {/* Login Button */}
                    <Link onClick={loginHandler} className="w-full">
                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2 text-sm text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
                      >
                        <User2 className="w-5 h-5" /> Login
                      </Button>
                    </Link>
                    {/* Signup Button */}
                    <Link to="/signup" className="w-full mt-4">
                      <Button className="w-full flex items-center justify-center gap-2 text-sm bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
                        <UserPlus className="w-5 h-5" /> Signup
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                      Hello, {user.fullname}!
                    </h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-center gap-2">
                        <User2 className="w-5 h-5" />
                        <Button variant="link" className="text-sm">
                          <Link
                            to="/profile"
                            className="text-gray-900 dark:text-white"
                          >
                            View Profile
                          </Link>
                        </Button>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <LogOut className="w-5 h-5" />
                        <Button
                          onClick={logoutHandler}
                          variant="link"
                          className="text-sm text-red-500"
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-between w-full md:w-auto">
              <ul className="flex space-x-5 font-medium items-center">
                {/* Job Categories with Dropdown */}
                <li ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="block py-2 rounded text-gray-900 dark:text-white"
                  >
                    Job Categories
                    {isDropdownOpen ? (
                      <ChevronUp className="inline-block ml-2" />
                    ) : (
                      <ChevronDown className="inline-block ml-2" />
                    )}
                  </button>

                  {/* Dropdown Menu with Animation */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 p-6 w-max dark:bg-[#232627] bg-gray-200 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50 transition-all duration-300 ease-in-out ${
                      isDropdownOpen
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    <div className="grid xl:grid-cols-4 gap-4 grid-cols-3">
                      {sortedCategories.map((category, index) => {
                        const Icon = getCategoryIcon(category); // Get the appropriate icon
                        return (
                          <Link
                            key={index}
                            to={`/categories/${category}`} // Dynamically link to category
                            className="flex items-center p-2 text-black dark:text-white hover:bg-[#f5f5f5] dark:hover:bg-gray-700 rounded-lg"
                          >
                            {/* Render the appropriate icon */}
                            <Icon className="w-6 h-6 mr-3 text-black dark:text-white" />
                            <div>
                              <h3>{formatCategoryDisplayName(category)}</h3>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </li>

                <li>
                  <Link
                    to="/remote"
                    className={`block py-2 px-3 rounded ${
                      location.pathname === "/remote"
                        ? "text-gray-300 "
                        : "text-gray-900 hover:text-gray-400 dark:text-white dark:hover:text-gray-400"
                    }`}
                  >
                    Fully Remote Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className={`block py-2 px-3 rounded ${
                      location.pathname === "/contact"
                        ? "text-gray-300 "
                        : "text-gray-900 hover:text-gray-400 dark:text-white dark:hover:text-gray-400"
                    }`}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <div
                    id="dark-mode-toggle"
                    onClick={toggleDarkMode}
                    className="cursor-pointer transition-transform duration-300 hover:scale-110"
                  >
                    {isDarkTheme ? (
                      <Sun className="text-yellow-400 w-6 h-6" /> // Sun icon for light mode
                    ) : (
                      <Moon className="text-gray-500 w-6 h-6" /> // Moon icon for dark mode
                    )}
                  </div>{" "}
                </li>
              </ul>
            </div>

            {/* Login and Signup buttons for larger screens */}
            {!user && (
              <div className="hidden lg:flex md:order-2 space-x-3">
                <Link onClick={loginHandler} >
                  <Button variant="text">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white">
                    Join For Free
                  </Button>
                </Link>
              </div>
            )}

            {/* User avatar and dropdown for logged-in users on larger screens */}
            {user && (
              <div className="hidden lg:flex md:order-2 space-x-3 md:space-x-0">
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarComponent
                        classes="rounded-full"
                        useGravatar={false}
                        size={44}
                        color="#000000"
                        background="#f1f1f1"
                        fontSize={16}
                        fontWeight={400}
                        offsetY={24}
                        initials={`${user?.fullname
                          .substring(0, 2)
                          .toUpperCase()}`}
                      />
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="flex gap-2">
                      <Avatar>
                        <AvatarComponent
                          classes="rounded-full"
                          useGravatar={false}
                          size={44}
                          color="#000000"
                          background="#f1f1f1"
                          fontSize={16}
                          fontWeight={400}
                          offsetY={24}
                          initials={`${user?.fullname
                            .substring(0, 2)
                            .toUpperCase()}`}
                        />
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{user?.fullname}</h4>
                        <p className="text-sm text-muted-foreground">
                          {user?.profile?.bio}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col my-2 text-gray-600">
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <LogOut />
                        <Button onClick={logoutHandler} variant="link">
                          Logout
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
