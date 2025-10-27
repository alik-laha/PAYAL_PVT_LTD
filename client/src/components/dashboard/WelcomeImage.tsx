import React from "react";
import wimage from "./DashboardImage.jpg";

const WelcomeImage: React.FC = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-br from-gray-400 via-gray-100 to-gray-50 text-white min-h-[85vh] px-6 sm:px-10 md:px-16 lg:px-24 py-10 md:py-20 h-[80vh]">
      {/* Left Section: Text */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 animate-fadeIn w-full md:w-1/2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-indigo-700 via-pink-400 to-orange-400 bg-clip-text text-transparent">
          Welcome 👋
        </h1>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-md tracking-wide">
          We're glad to have you here. Let's get started and make something
          amazing together!
        </p>
        <span className="text-red-800 text-xs sm:text-sm md:text-base font-medium mt-4 border border-red-400/50 rounded-lg px-4 py-2 bg-red-950/20">
          <strong>Note:</strong> This is the Beta Version of the software.  
          All the datas displayed here is for development and testing purposes only.
        </span>
      </div>

      {/* Right Section: Image */}
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <div className="relative group">
          <img
            src={wimage}
            alt="Welcome"
            className="rounded-2xl shadow-2xl max-h-96 object-cover transform transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:shadow-pink-500/40"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeImage;
