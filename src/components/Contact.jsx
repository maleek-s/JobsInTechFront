import React, { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import RightContent from "../assets/RightContent.jpg"; // Background image
import LogoWhite from "../assets/Logo-White.png";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Initialize EmailJS with your public key
  useEffect(() => {
    emailjs.init("yJpdlI4u6GEg7rrLN"); // Replace with your public key from EmailJS
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending email using EmailJS
      const result = await emailjs.send(
        "service_ml9nzcg",    // Replace with your service ID
        "template_w562ah3",   // Replace with your template ID
        input,                // Send the form data as email variables
      );

      console.log(result.text); // Check response from EmailJS

      // Show success toast
      toast.success("Your message has been sent successfully!");
      
      // Clear form after submission
      setInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("An error occurred while sending the message.");
    }
  };

  const Snowflakes = () => {
    const [flakes, setFlakes] = useState([]);

    useEffect(() => {
      const generateSnowflakes = () => {
        const newFlakes = Array.from({ length: 5 }, (_, i) => ({
          id: i,
          x: Math.random() * 100, // Horizontal position
          y: Math.random() * -100, // Start above the screen
          size: Math.random() * 3 + 2, // Size of snowflake
          speed: Math.random() * 5 + 2, // Falling speed
        }));
        setFlakes(newFlakes);
      };

      generateSnowflakes();
    }, []);

    return flakes.map((flake) => (
      <div
        key={flake.id}
        className="absolute bg-white rounded-full"
        style={{
          width: `${flake.size}px`,
          height: `${flake.size}px`,
          top: `${flake.y}vh`,
          left: `${flake.x}vw`,
          opacity: 0.9,
          zIndex: 50, // Highest priority
          animation: `fall ${flake.speed}s linear infinite`,
        }}
      ></div>
    ));
  };

  return (
    <div className="bg-white dark:bg-[#141718] h-screen relative overflow-hidden">
      <Helmet>
        <title>Contact Us</title>
        <meta name="description" content="Contact us page" />
        <link rel="canonical" href="https://jobsintech.live/contact" />
      </Helmet>

      {/* Snowflake Animation */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <Snowflakes />
      </div>

      {/* Page Content */}
      <div
        className="relative w-full h-full bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${RightContent})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60 z-30"></div>

        {/* Main Content */}
        <div className="relative z-40 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 bg-white dark:bg-[#1C1F21] bg-opacity-90 p-6 sm:p-8 rounded-lg shadow-xl">
          <Link to="/">
            <img
              src={LogoWhite}
              alt="Logo"
              className="mx-auto mb-6 w-20 md:w-24"
            />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 dark:text-white">
            Contact Us
          </h1>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-8">
            We're here to help! Please reach out to us with any questions or
            feedback.
          </p>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="mb-4">
              <Label className="text-gray-800 dark:text-gray-300">
                Full Name
              </Label>
              <Input
                type="text"
                value={input.name}
                name="name"
                onChange={handleChange}
                placeholder="Your Full Name"
                className="mt-2 px-3 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <Label className="text-gray-800 dark:text-gray-300">Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={handleChange}
                placeholder="example@example.com"
                className="mt-2 px-3 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <Label className="text-gray-800 dark:text-gray-300">Message</Label>
              <textarea
                value={input.message}
                name="message"
                onChange={handleChange}
                placeholder="Your Message"
                className="mt-2 px-3 py-2 w-full rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                rows="4"
              />
            </div>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 font-semibold">
              Send Message
            </Button>
          </form>
        </div>
      </div>

      {/* Tailwind Animation */}
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-10%);
            }
            100% {
              transform: translateY(100vh);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Contact;
