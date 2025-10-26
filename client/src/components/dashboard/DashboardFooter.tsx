"use client";

import React from "react";

const DashboardFooter: React.FC = () => {
  return (
    <footer className="w-full bg-gray-600 text-gray-300 py-4 mt-auto border-t border-gray-800 dashboard-footer">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-evenly px-4 text-sm ">
        {/* Company Name & Copyright */}
        <p className="text-center sm:text-left mb-2 sm:mb-0 text-sm ">
          © {new Date().getFullYear()} <span className="font-semibold text-white">Payal Dealers Pvt. Ltd.</span>. All rights reserved.
        </p>

        {/* Developer Credit */}
        <p className="text-center sm:text-right text-sm">
          Developed by aispkoldevs. Mail us at 
          <a
            href="https://your-portfolio-link.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors ml-2"
          >
            aisp.koldevs@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default DashboardFooter;