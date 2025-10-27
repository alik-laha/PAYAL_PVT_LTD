"use client";

import React from "react";

const DashboardFooter: React.FC = () => {
  return (
    <footer className="w-full bg-gray-500 text-white py-4 mt-auto border-t border-gray-300 dashboard-footer">
      <div className=" mx-auto flex flex-col sm:flex-row items-center justify-between px-4 text-sm ">
        {/* Company Name & Copyright */}
        <p className="text-center sm:text-left mb-2 sm:mb-0 text-sm ">
          <span className="font-semibold text-black-800">Payal Dealers Pvt. Ltd.</span> {new Date().getFullYear()} ©  All rights reserved.
        </p>

        {/* Developer Credit */}
        <p className="text-center sm:text-right text-sm">
          Developed by aispkoldevs. Mail us at 
          <a
            href="https://your-portfolio-link.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-300 font-bold transition-colors ml-2"
          >
            aisp.koldevs@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default DashboardFooter;