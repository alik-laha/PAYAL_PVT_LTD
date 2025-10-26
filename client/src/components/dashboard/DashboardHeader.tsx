import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { FaSignOutAlt } from "react-icons/fa";
import { timerLogout } from "../common/exportData";

import { MdOutlineTimer } from "react-icons/md";
import icon from "../../assets/Static_Images/OIP.jpeg";
import icon2 from "../../assets/Static_Images/OIP-2.webp";
import DashboardClock from "../common/DashboardClock";

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();

  const [menuVisible, setMenuVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const savedTime = localStorage.getItem("timeLeft");
    return savedTime ? parseInt(savedTime, 10) : timerLogout;
  });

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const handleLogout = async () => {
    try {
      await axios.get("/api/user/logout");
      [
        "timeLeft",
        "role",
        "dept",
        "countdownStartTime",
        "user",
        "image",
      ].forEach((key) => localStorage.removeItem(key));
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const endTime = Date.now() + timeLeft * 1000;
    const timerId = setInterval(() => {
      const newTimeLeft = Math.max(
        0,
        Math.floor((endTime - Date.now()) / 1000)
      );
      setTimeLeft(newTimeLeft);
      localStorage.setItem("timeLeft", newTimeLeft.toString());

      if (newTimeLeft === 0) {
        clearInterval(timerId);
        localStorage.removeItem("timeLeft");
        handleLogout();
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const duration = moment.duration(seconds, "seconds");
    return `${String(duration.hours()).padStart(2, "0")}:${String(
      duration.minutes()
    ).padStart(2, "0")}:${String(duration.seconds()).padStart(2, "0")}`;
  };

  const image = localStorage.getItem("image");

  return (
    <header className="top-0 left-0 w-full bg-gray-800 shadow-md z-50 text-white">
      <div className="flex justify-between items-center px-4 md:px-8 py-2 ">

        {/* Left: Clock + Logo */}
        <div className="flex items-center gap-4">
          <DashboardClock />
          
        </div>

        {/* Right: Profile */}
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="flex items-center gap-3 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-full transition-all duration-300"
          >
            <img
              src={
                image
                  ? `/api/cleaning/view?filename=${image}`
                  : icon
              }
              alt="User"
              className="w-8 h-8 rounded-full border-2 border-gray-500"
            />
            <span className="hidden md:block font-medium text-sm">
              {localStorage.getItem("user")}
            </span>
          </button>

          {/* Dropdown Menu */}
          {menuVisible && (
            <div
              className="absolute -right-2 mt-2 w-60 bg-white text-gray-800 rounded-xl shadow-lg ring-1 ring-gray-300 overflow-hidden animate-fadeIn"
              style={{ zIndex: 9999 }}
            >
              <div className="flex flex-col items-center py-4 border-b border-gray-200">
                 {/* Center: Session Timer */}
                <div className="flex flex-row items-center text-sm gap-1 text-gray-800 font-medium  mb-4">
                  <MdOutlineTimer size={20} className="text-gray-800 "/> <p className="font-semibold tracking-wide text-gray-500">Session Left :</p>
                  <span className="text-red-500 font-semibold text-sm">
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <img
                  src={
                    image
                      ? `/api/cleaning/view?filename=${image}`
                      : icon2
                  }
                  alt="Profile"
                  className="w-16 h-16 rounded-full mb-2 border-2 border-gray-300"
                />
                <p className="font-semibold text-md">
                  {localStorage.getItem("user")}
                </p>
                <p className="text-xs text-gray-500">
                  Dept: {localStorage.getItem("dept")}
                </p>
                <p className="text-xs text-gray-500">
                  Role: {localStorage.getItem("role")}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex m-2 items-center justify-center py-3 gap-2 text-white bg-cyan-700 hover:bg-cyan-600 text-sm font-semibold transition-all duration-300 rounded-md w-60"
              >
                <FaSignOutAlt size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
