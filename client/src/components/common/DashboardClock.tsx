import { useEffect, useState } from "react";
import img from "../../assets/Static_Images/flag.png";

const DashboardClock: React.FC = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Day and formatted date like [Thu, 22-08-2025]
      const options: Intl.DateTimeFormatOptions = { weekday: "short" };
      const dayName = new Intl.DateTimeFormat("en-US", options).format(now);
      const formattedDate = `${dayName}, ${now
        .getDate()
        .toString()
        .padStart(2, "0")}-${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${now.getFullYear()}`;

      // Format time with AM/PM
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;

      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${ampm}`;

      setDate(formattedDate);
      setTime(formattedTime);
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex md:flex-row-reverse items-center gap-2 md:gap-6 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md">
      <div className="flex flex-col gap-5 justify-end md:flex-row items-end md:items-baseline md:gap-4">
        <div className="text-sm md:text-sm text-gray-300 flex flex-row gap-2 lg:gap-4 items-center">
          <img src={img} height={25} width={25} alt="Flag" />
          <p className="text-sm md:text-lg font-mono font-semibold">KOLKATA</p>
          <p className="text-sm md:text-md font-mono font-semibold">
            {date}
          </p>
          <p className="text-sm md:text-md font-mono font-semibold text-green-400">
            {time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardClock;
