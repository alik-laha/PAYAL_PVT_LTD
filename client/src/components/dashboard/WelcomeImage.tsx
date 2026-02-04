import React from "react";
import wimage from "./DashboardImage.jpg";
import {  PermissionDep } from "../common/exportData";
import DirectorDashboard from "./DirectorDashboard";
import { PermissionDept } from "@/type/type";
import DashboardPanel1 from "./dashboardpanel1";

const WelcomeImage: React.FC = () => {
  const Dept = localStorage.getItem('dept') as keyof PermissionDept;
    const rendersection = (tab: string) => {
    if (PermissionDep[Dept].includes(tab)) {
      return true
    }
    else {
      return false;
    }
  }
  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-[2.5%] sm:px-10 md:px-16 lg:px-10 py-5 md:py-5">
   

      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 w-full md:w-3/4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl">👋</span>
            </div>
            <h1 className="text-3xl sm:text-3xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
              Welcome {localStorage.getItem("user")?.toUpperCase() || "USER"}
            </h1>
          </div>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl font-medium">
            We're glad to have you here. Let's make something amazing together!
            🚀
          </p>
          <div className="flex items-start gap-2 mt-4 bg-red-50 border-l-4 border-red-500 rounded-lg px-4 py-3 shadow-sm">
            <span className="text-red-600 text-lg">⚠️</span>
            <div>
              <p className="text-red-800 text-md font-semibold">
                Beta Version Notice
              </p>
              <p className="text-red-700 text-md mt-1">
                All displayed data is for development and testing purposes only.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end md:w-1/4 mt-6 md:mt-0">
          <img
            src={wimage}
            alt="Welcome"
            className="rounded-2xl shadow-2xl max-h-96 md:max-h-56 w-full  object-cover ring-4 ring-white/50 hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
     
        {rendersection("Dashboard") && <DirectorDashboard/>}
           {rendersection("Dashboard") && <DashboardPanel1/>}
    </div>
  );
};

export default WelcomeImage;
