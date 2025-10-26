import { useEffect, useState } from "react";
import img from '../../assets/Static_Images/flag.png'


const DashboardClock: React.FC = () => {

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

    useEffect(()=>{
        setDate(new Date().toISOString().slice(0,10))
        setTime(new Date().toTimeString().slice(0,8))

    },[])




  return (
    <div className="flex md:flex-row-reverse items-center gap-2 md:gap-6 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md">
    

      <div className="flex flex-col gap-5 justify-end md:flex-row items-end md:items-baseline md:gap-4">
        <div className="text-sm md:text-sm text-gray-300 flex flex-row gap-2 lg:gap-4 items-center">
            <img src={img} height={25} width={25}/>
            <p className="text-sm md:text-lg font-mono font-semibold">KOLKATA</p> 
             <p className="text-sm md:text-md font-mono font-semibold ">{date}</p>
             <p className="text-sm md:text-md font-mono font-semibold text-green-400">
          {time}
        </p>
             </div>
        
      </div>
    </div>
  );
};

export default DashboardClock;
