import React, { useEffect, useState } from "react";
import "./dashboard1.css"; // Optional CSS file
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import axios from "axios";
import { NavLink } from "react-router-dom";

// import { Button } from '../ui/button';
// import { FaWhatsapp } from "react-icons/fa6";
// import { pendingCheckRole } from '../common/exportData';
// import { pendingCheckRoles, PermissionRole } from '@/type/type';

type PanelData = {
  id: number;
  title: string;
  value1: string;
  value2: string;
  value3: string;
};

const DashboardPanel1: React.FC = () => {
  // Static data (can be replaced with API later)

  const [data, setData] = useState<PanelData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // const handlesendWp = async () => {

  //   setLoading(true);
  //   try {
  //     const response = await fetch('/api/dashboard/wp-dashboard-basic', {
  //       method: 'POST',
  //     });
  //     const data = await response.json();
  //     alert(data.message);
  //   } catch (error) {
  //     alert('Failed to send whatsapp.');
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  useEffect(() => {
    const fetchPanelData = async () => {
      try {
        axios.get("/api/dashboard/basicdashboard").then((res) => {
          console.log(res);
          const result = res.data;

          const mayurbacklog =
            result?.backlogMayurdata?.[0]?.current_backlog ?? "N/A";
          const latestLotmayur = result?.latestLotMayur?.LotNo ?? "N/A";
          const latestvLotmayur = result?.latestVLotMayur?.LotNo ?? "N/A";

          const hamsabacklog =
            result?.backloghamsadata?.[0]?.current_backlog ?? "N/A";
          const latestLothamsa = result?.latestLothamsa?.LotNo ?? "N/A";
          const latestvLothamsa = result?.latestVLothamsa?.LotNo ?? "N/A";

          const wholesbacklog =
            result?.backlogwholesdata?.[0]?.current_backlog ?? "N/A";
          const latestLotwholes = result?.latestLotwholes?.LotNo ?? "N/A";
          const latestvLotwholes = result?.latestvLotwholes?.LotNo ?? "N/A";

          const lwbacklog =
            result?.backloglwdata?.[0]?.current_backlog ?? "N/A";
          const latestLotlw = result?.latestLotlw?.LotNo ?? "N/A";
          const latestvLotlw = result?.latestvLotlw?.LotNo ?? "N/A";

          const dpdsbacklog =
            result?.backlogdpdsdata?.[0]?.current_backlog ?? "N/A";
          const latestLotdpds = result?.latestLotdpds?.LotNo ?? "N/A";
          const latestvLotdpds = result?.latestvLotdpds?.LotNo ?? "N/A";

          const sortbacklog =
            result?.backlogsortingdata?.[0]?.current_backlog ?? "N/A";
          const latestLotsort = result?.latestLotsorting?.LotNo ?? "N/A";
          const latestvLotsort = result?.latestvLotsorting?.LotNo ?? "N/A";

          const vilbacklog =
            result?.backlogvildata?.[0]?.current_backlog ?? "N/A";
          const latestLotvil = result?.latestLotvil?.LotNo ?? "N/A";
          const latestvLotvil = result?.latestvLotvil?.LotNo ?? "N/A";

          const bigbacklog =
            result?.backlogbigTdata?.[0]?.current_backlog ?? "N/A";
          const latestLotbig = result?.latestLotbigT?.LotNo ?? "N/A";
          const latestvLotbig = result?.latestvLotbigT?.LotNo ?? "N/A";

          const rejbacklog =
            result?.backlogrejdata?.[0]?.current_backlog ?? "N/A";
          const latestLotrej = result?.latestLotrej?.LotNo ?? "N/A";
          const latestvLotrej = result?.latestvLotrej?.LotNo ?? "N/A";

          const peelbacklog =
            result?.backlogpeeldata?.[0]?.current_backlog ?? "0";
          const latestLotpeel = result?.latestLotpeel?.LotNo ?? "N/A";
          const latestvLotpeel = result?.latestvLotpeel?.LotNo ?? "N/A";

          const latestvLotborma = result?.latestLotborma?.LotNo ?? "N/A";
          const bormabacklog1 =
            result?.backlogbormadata?.[0]?.current_backlog1 ?? "0";
          const bormabacklog2 =
            result?.backlogbormadata?.[0]?.current_backlog2 ?? "0";

          const latestLothumid = result?.latestLothumid?.LotNo ?? "N/A";
          const humidbacklog =
            result?.backloghumiddata?.[0]?.current_backlog ?? "0";
          //console.log(humidbacklog)

          const latestLotboil = result?.latestLotboil?.LotNo ?? "N/A";
          const latestLotscoop = result?.latestLotscoop?.LotNo ?? "N/A";
          const scoopbacklog1 =
            result?.backlogscoopdata?.[0]?.current_backlog1 ?? "0";
          const scoopbacklog2 =
            result?.backlogscoopdata?.[0]?.current_backlog2 ?? "0";

          const updatedData: PanelData[] = [
            {
              id: 1,
              title: "Boiling ",
              value1: `${latestLotboil} `,
              value2: "N/A",
              value3: "",
            },
            {
              id: 2,
              title: "Scooping ",
              value1: `${latestLotscoop} `,
              value2: "N/A",
              value3: ` ${formatNumber(
                String(Number(scoopbacklog1) + Number(scoopbacklog2))
              )} `,
            },
            {
              id: 3,
              title: "Borma ",
              value1: `${latestvLotborma} `,
              value2: "N/A",
              value3: ` ${formatNumber(
                String(Number(bormabacklog1) + Number(bormabacklog2))
              )} `,
            },
            {
              id: 4,
              title: "Humidifier ",
              value1: `${latestLothumid} `,
              value2: "N/A",
              value3: ` ${formatNumber(humidbacklog)} `,
            },
            {
              id: 5,
              title: "Peeling ",
              value1: `${latestLotpeel} `,
              value2: ` ${latestvLotpeel} `,
              value3: ` ${formatNumber(peelbacklog)} `,
            },
            {
              id: 6,
              title: "Mayur ",
              value1: `${latestLotmayur} `,
              value2: ` ${latestvLotmayur} `,
              value3: ` ${formatNumber(mayurbacklog)} `,
            },
            {
              id: 7,
              title: "Hamsa",
              value1: `${latestLothamsa} `,
              value2: ` ${latestvLothamsa} `,
              value3: ` ${formatNumber(hamsabacklog)} `,
            },
            {
              id: 8,
              title: "Wholes",
              value1: `${latestLotwholes} `,
              value2: ` ${latestvLotwholes} `,
              value3: ` ${formatNumber(wholesbacklog)} `,
            },
            {
              id: 9,
              title: "LW",
              value1: `${latestLotlw} `,
              value2: ` ${latestvLotlw} `,
              value3: ` ${formatNumber(lwbacklog)} `,
            },
            {
              id: 10,
              title: "DPDS",
              value1: `${latestLotdpds} `,
              value2: ` ${latestvLotdpds} `,
              value3: ` ${formatNumber(dpdsbacklog)} `,
            },
            {
              id: 11,
              title: "Sorting",
              value1: `${latestLotsort} `,
              value2: ` ${latestvLotsort} `,
              value3: ` ${formatNumber(sortbacklog)} `,
            },
            {
              id: 12,
              title: "Taiho",
              value1: `${latestLotbig} `,
              value2: ` ${latestvLotbig} `,
              value3: ` ${formatNumber(bigbacklog)} `,
            },
            {
              id: 13,
              title: "Village",
              value1: `${latestLotvil} `,
              value2: ` ${latestvLotvil} `,
              value3: ` ${formatNumber(vilbacklog)} `,
            },
            {
              id: 14,
              title: "Rejection",
              value1: `${latestLotrej} `,
              value2: ` ${latestvLotrej} `,
              value3: ` ${formatNumber(rejbacklog)} `,
            },
          ];

          setData(updatedData);
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPanelData();
  }, []);

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }
  function formatNumber(num: string) {
    return Number.isInteger(Number(num))
      ? parseInt(num)
      : parseFloat(num).toFixed(2);
  }

  return (
    <>
      <DashboardHeader />
      <DashboardSidebar />
      <div
        className="dashboard-main-container"
        style={{ backgroundColor: "white" }}>
        <div className="dashboard-container">
          <div className="panel-container mb-5 ">
            <div className="panel1 bg-cyan-400 hover:bg-cyan-500">
              <p className=" mt-3">Factory Manager</p>
              <NavLink to="/dashboard/dashboard1/factoryManager">
                <p className="mt-2 text-sm underline">Click here</p>
              </NavLink>
            </div>
            <div className="panel1  bg-orange-400 hover:bg-orange-500">
              <p className=" mt-3">Production Manager</p>
              <p className="mt-2 text-sm underline">Click here</p>
            </div>
          </div>

          <div className="text-center py-5">
            <p className="text-xl tracking-widest italic drop-shadow-xl">Current Lot & Section Backlog</p>
          </div>

          <div className="panel-container mt-5 justify-evenly">
            {data.map((item) => (
              <div key={item.id} className="panel bg-lime-100">
                <h2 className="text-rose-500">{item.title}</h2>
                <p className="font-semibold pt-2 "> {item.value1}</p>
                <p className="font-semibold pt-1"> {item.value2}</p>
                <p className="pt-2 text-2xl font-bold text-red-500">
                  {item.value3 ? `Backlog: ${item.value3} Kg` : ""}
                </p>
              </div>
            ))}
          </div>
          {/* {checkpending('LW') &&<div className='flex w-100 mt-5 text-center items-center'>
            <Button className="bg-green-400 mb-2  responsive-button-adjust"
              disabled={loading} onClick={handlesendWp} >  {loading ? 'Sending...' : 'Send'} <FaWhatsapp size={20} className="ml-2" /></Button>
          </div>} */}
        </div>
      </div>
    </>
  );
};

export default DashboardPanel1;
