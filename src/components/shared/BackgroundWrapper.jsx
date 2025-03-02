import React from "react";
import Ellipse from "../../assets/Ellipse 5.svg";

const BackgroundWrapper = ({ children }) => {
  return (
    <div className="hidden md:flex lg:relative w-full">
      {/* Global Background Ellipse */}
      <img
        src={Ellipse}
        alt="Background Ellipse"
        className="fixed inset-0 w-full h-full object-cover pointer-events-none"
      />
      {children}
    </div>
  );
};

export default BackgroundWrapper;
