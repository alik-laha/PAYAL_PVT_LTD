/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
// import { useNavigate } from "react-router-dom"
import img from '../../assets/Static_Images/backgroundsidebar.png'
import "./dashboard.css"
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom";
import { PermissionRol, PermissionDep } from "../common/exportData";
import { PermissionRole, PermissionDept } from "@/type/type";

import { RiMenuUnfoldLine ,RiMenuFoldLine   } from "react-icons/ri";

import {
    MdOutlineAdminPanelSettings, MdOutlineStorefront,
    MdHolidayVillage, MdCallReceived, MdOutlineFactory, MdOutlineOilBarrel, MdOutlineHighQuality,
    
    MdDashboard,
    
} from "react-icons/md";
import { IoIosNavigate, IoIosQrScanner, IoMdSettings   } from "react-icons/io";
import { LuDonut, LuBadgeCheck  } from "react-icons/lu";
import { GoPackageDependents } from "react-icons/go";
import { TbBrandPeanut, TbSitemap } from "react-icons/tb";
import { BiSolidUserPlus } from "react-icons/bi";
import { FaUserTie, FaWater, FaSortAmountDownAlt ,FaAcquisitionsIncorporated } from "react-icons/fa";
import { PiPackageLight, PiWashingMachineLight,PiTestTubeDuotone  } from "react-icons/pi";
import { GiBoilingBubbles, GiIceCreamScoop, GiGate, GiPillDrop ,GiBoxingRing,GiVendingMachine, GiBoxUnpacking, GiVillage, GiOpenedFoodCan } from "react-icons/gi";
import { AiFillCodeSandboxSquare, AiOutlineLogout, AiOutlineProduct } from "react-icons/ai";
import { CiCreditCard1, CiPill } from "react-icons/ci";
import { GrEject } from "react-icons/gr";

import { CgSmartHomeBoiler } from "react-icons/cg";
import { BsMoisture, BsUpcScan } from "react-icons/bs";
import { GiChopsticks } from "react-icons/gi";
import { IoArrowRedoOutline } from "react-icons/io5";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import axios from "axios";

//import { GiPizzaCutter } from "react-icons/gi";


const DashboardSidebar = () => {
     const navigate = useNavigate()
    const Role = localStorage.getItem('role') as keyof PermissionRole
    const Dept = localStorage.getItem('dept') as keyof PermissionDept
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [currentHour, setCurrentHour] = useState(new Date().getHours());

    // Time ranges for each role
    const roleAccess:any = {
        MayurSupervisor: {  start: 0, end: 23 },
        SortingSupervisor: {  start: 0, end: 23 },
        VillageSupervisor: {  start: 0, end: 23 },
        WholesSupervisor: {  start: 0, end: 23 },
        PeelingSupervisor: { start: 0, end: 23 },
    };

const toggleSection = (sectionKey: string) => {
    setOpenSection(prev => (prev === sectionKey ? null : sectionKey));
};

    const isRestrictedRole = Object.keys(roleAccess).includes(Role);
    const roleConfig = roleAccess[Role];

    // Time check for restricted roles
    const isVisible = !isRestrictedRole || (
        roleConfig && currentHour >= roleConfig.start && currentHour < roleConfig.end
    );

    useEffect(() => {
        if (!isRestrictedRole) return;

        const interval = setInterval(() => {
            const hour = new Date().getHours();
            setCurrentHour(hour);

            if (!(hour >= roleConfig.start && hour < roleConfig.end)) {
                window.location.reload(); // Refresh if time range expired
            }
        }, 60000); // Every minute

        return () => clearInterval(interval);
    }, [isRestrictedRole, roleConfig]);


    const openSidebar = () => {
        setSidebarOpen(true);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const renderlink = (button: string) => {
        //console.log(Role)
        if (PermissionRol[Role].includes(button)) {
            return true
        }
        else {
            return false;
        }

    }

    const rendersection = (tab: string) => {
        // console.log(Dept)
        if (PermissionDep[Dept].includes(tab)) {
            return true
        }
        else {
            return false;
        }
    }
      const handleLogout = () => {
    axios.get('/api/user/logout').then(() => {
      
      localStorage.removeItem('timeLeft');
      localStorage.removeItem('role')
      localStorage.removeItem('dept')
      localStorage.removeItem('countdownStartTime')
      localStorage.removeItem('user')
      localStorage.removeItem('image')
      navigate('/login')
    }).catch((err) => {
      console.log(err)
    })
  }


    return (
      <>
        <div className="main">
          <button className="group flex items-center gap-2  px-4 py-2 font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all duration-300 text-black" onClick={openSidebar}>
            <RiMenuUnfoldLine size={24} className="transition-transform duration-300 group-hover:-translate-x-1"/>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
        Sidebar
      </span>
          </button>
        </div>

      

        <div className={`sidebar  ${sidebarOpen ? "open" : ""}`}>
          <div className="flex items-center justify-between bg-cyan-900 px-4 py-5 shadow-md text-white">
            {/* <a href="#" className="closebtn float-right" onClick={closeSidebar}> */}

                <div className="flex items-center gap-2">
              <img
                src={img}

                className="w-8 h-8 rounded-full border border-gray-300 shadow-md "></img>
              <p className="font-semibold italic text-sm md:text-base ml-2">
               Payal Dealers Pvt. Ltd.
              </p>
            </div>

           
              <button
              onClick={closeSidebar}
              className="p-2 hover:bg-cyan-800 rounded-full transition"
            >
              <RiMenuFoldLine size={22} />
            </button>
            {/* </a> */}
          </div>

           {/* Dashboard */}
        {rendersection("Dashboard") && (
          <div className="flex items-center flex-row justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 shadow-lg ">
            <NavLink
              to="/dashboard"
              className="flex items-center gap-2 group transition-all duration-200 flex-row"
            ><div className="flex flex-row items-center gap-2 mt-4">
                <MdDashboard
                  size={22}
                  className="text-white group-hover:scale-110 transition-transform duration-200"
                />
                <p className="text-white font-semibold tracking-widest text-sm group-hover:text-yellow-200 transition-colors duration-200 drop-shadow">
                  DASHBOARD
                </p>
              </div>

            </NavLink>
          </div>
        )}

          

          <div className="min-h-[143vh] pt-5 bg-gray-100 border-r-8 border-gray-300">
            <a>
              {/* <Collapsible
                open={openSection === "dashboard"}
                onOpenChange={() => toggleSection("dashboard")}>
                <CollapsibleTrigger
                  className={`flex flex-row items-center justify-center mb-4 user-pvt ${
                    openSection === "dashboard" ? "trigger-open" : ""
                  }`}>
                  <RxDashboard color="indigo" size={16} className="mb-1"/>
                  <p className="ml-2 text-indigo-800 italic font-extrabold drop-shadow-sm ">DASHBOARD</p>
                  <span className="ml-auto">
                    {openSection === "dashboard" ? (
                      <FiChevronDown size={18} />
                    ) : (
                      <FiChevronRight size={18} />
                    )}
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent className="Items-pvt">
                  <NavLink to="/dashboard/dashboard1">
                    <p className="flex">
                      <MdOutlineSpaceDashboard
                        size={22}
                        className="text-sky-500"
                      />{" "}
                      <p className="pl-3">General</p>
                    </p>
                  </NavLink>
                </CollapsibleContent>
              </Collapsible> */}

              {rendersection("HR & Admin") && (
                <Collapsible
                  open={openSection === "admin"}
                  onOpenChange={() => toggleSection("admin")}>
                  <CollapsibleTrigger
                    className={`flex flex-row items-center justify-center mb-4 user-pvt ${
                      openSection === "admin" ? "trigger-open" : ""
                    }`}>
                    <MdOutlineAdminPanelSettings
                      size={18}
                      className="text-orange-800 mb-1"
                    />
                    <p className="ml-2 text-orange-700 italic font-extrabold drop-shadow-sm">ADMIN & HR</p>
                    <span className="ml-auto">
                      {openSection === "admin" ? (
                        <FiChevronDown size={18} />
                      ) : (
                        <FiChevronRight size={18} />
                      )}
                    </span>
                  </CollapsibleTrigger>
                  {renderlink("Dashboard User") && (
                    <CollapsibleContent className="Items-pvt">
                      {renderlink("Dashboard User")}
                      <NavLink to="/dashboard/user" className="flex">
                        <p className="flex">
                          <BiSolidUserPlus size={21} className="text-red-500" />{" "}
                          <p className="pl-3">User</p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {renderlink("Employee") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/employee">
                        <p className="flex">
                          <FaUserTie size={17} className="text-green-500" />{" "}
                          <p className="pl-3">Employee</p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {renderlink("Asset") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/machine">
                        <p className="flex">
                          <TbSitemap size={20} className="text-blue-600" />{" "}
                          <p className="pl-3">Asset</p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              )}

              {rendersection("QR") && (
                <Collapsible
                  open={openSection === "qr"}
                  onOpenChange={() => toggleSection("qr")}>
                  <CollapsibleTrigger
                    className={`flex flex-row items-center justify-center mb-4 user-pvt ${
                      openSection === "qr" ? "trigger-open" : ""
                    }`}>
                    <BsUpcScan  size={16} className="text-violet-700 mb-1" />
                    <p className="ml-2 text-violet-700 italic font-extrabold drop-shadow-sm">SCAN</p>
                    <span className="ml-auto">
                      {openSection === "qr" ? (
                        <FiChevronDown size={18} />
                      ) : (
                        <FiChevronRight size={18} />
                      )}
                    </span>
                  </CollapsibleTrigger>
                  {renderlink("QRDispatch") && (
                    <CollapsibleContent className="Items-pvt">
                      
                      <NavLink to="/dashboard/qrDispatch">
                        <p className="flex">
                          <IoIosQrScanner  size={22} className="text-red-500" />{" "}
                          <p className="pl-3">Dispatch Scan</p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              )}

              {rendersection("GatePass") && (
                <Collapsible
                  open={openSection === "gatepass"}
                  onOpenChange={() => toggleSection("gatepass")}>
                  <CollapsibleTrigger
                    className={`flex flex-row items-center justify-center mb-4 user-pvt ${
                      openSection === "gatepass" ? "trigger-open" : ""
                    }`}>
                    <GiGate size={16} className="text-yellow-700 mb-1" />
                    <p className="ml-2 text-yellow-700 italic font-extrabold drop-shadow-sm">GATEPASS</p>
                    <span className="ml-auto">
                      {openSection === "gatepass" ? (
                        <FiChevronDown size={18} />
                      ) : (
                        <FiChevronRight size={18} />
                      )}
                    </span>
                  </CollapsibleTrigger>
                  {renderlink("Gatepass") && (
                    <CollapsibleContent className="Items-pvt">
                      {renderlink("Dashboard User")}
                      <NavLink to="/dashboard/gatepassIn">
                        <p className="flex">
                          <IoIosNavigate size={22} className="text-gray-500" />{" "}
                          <p className="pl-3">Entry</p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              )}

              {Role !== "Security" && rendersection("Receiving") && (
                <Collapsible
                  open={openSection === "receiving"}
                  onOpenChange={() => toggleSection("receiving")}>
                  <CollapsibleTrigger
                    className={`flex flex-row items-center justify-center mb-4 user-pvt ${
                      openSection === "receiving" ? "trigger-open" : ""
                    }`}>
                    <MdCallReceived size={20} color="purple" />
                    <p className="ml-2 text-purple-800 italic font-extrabold text-shadow-lg drop-shadow-md">LOGISTICS</p>
                    <span className="ml-auto">
                      {openSection === "receiving" ? (
                        <FiChevronDown size={18} />
                      ) : (
                        <FiChevronRight size={18} />
                      )}
                    </span>
                  </CollapsibleTrigger>
                  {renderlink("VendorSKU") && (
                    <CollapsibleContent className="Items-pvt">
                      {renderlink("Dashboard User")}
                      <NavLink to="/dashboard/vendorSKU">
                        <p className="flex">
                          <TbSitemap size={20} className="text-orange-500" />{" "}
                          <p className="pl-3">Item</p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {renderlink("Receiving Store Entry") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/storePrimary">
                        <p className="flex">
                          <MdOutlineStorefront
                            size={20}
                            className="text-green-500"
                          />
                          <p className="pl-3">Store External </p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {renderlink("Store Issue") && (
                    <CollapsibleContent className="Items-pvt">
                      {renderlink("Dashboard User")}
                      <NavLink to="/dashboard/StoreIssue">
                        <p className="flex">
                          <IoArrowRedoOutline
                            size={20}
                            className="text-yellow-600"
                          />{" "}
                          <p className="pl-3">Store Internal</p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {renderlink("Receiving Civil Entry") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/GeneralStore">
                        <p className="flex">
                          <PiPackageLight size={22} className="text-blue-500" />
                          <p className="pl-3"> General Item</p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {renderlink("Receiving Packaging Entry") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/recevingpackagingMaterial">
                        <p className="flex">
                          <GoPackageDependents
                            size={18}
                            className="text-purple-500"
                          />
                          <p className="pl-3"> Packaging Material </p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {renderlink("RCN Primary Entry") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/rcnprimaryentry">
                        <p className="flex">
                          <LuDonut size={20} className="text-sky-500" />{" "}
                          <p className="pl-3"> Raw cashew (In)</p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {renderlink("Cashew Exit") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/rcnprimaryexit">
                        <p className="flex">
                          <GiOpenedFoodCan
                            size={20}
                            className="text-rose-500"
                          />{" "}
                          <p className="pl-3">Finished Cashew (Out)</p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {renderlink("Cashew Exit") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/creditNote">
                        <p className="flex">
                          <CiCreditCard1
                            size={22}
                            className="text-orange-500"
                          />{" "}
                          <p className="pl-3">Credit Note </p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {renderlink("Receiving Almond Entry") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/AlmondPrimary">
                        <p className="flex">
                          <TbBrandPeanut size={20} className="text-gray-500" />{" "}
                          <p className="pl-3"> Almond </p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {renderlink("Receiving Agarbati Entry") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/AgarbatiPrimary">
                        <p className="flex">
                          <GiChopsticks size={20} className="text-green-500" />{" "}
                          <p className="pl-3"> Agarbatti </p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {renderlink("Receiving OilMill Entry") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/OilMill">
                        <p className="flex">
                          <MdOutlineOilBarrel
                            size={22}
                            className="text-fuchsia-500"
                          />{" "}
                          <p className="pl-3"> Oilmill </p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {/* {renderlink('Receiving Purchase Entry')
                            && <CollapsibleContent className="Items-pvt">
                                <NavLink to="/dashboard/recevingpackagingMaterial" >
                                    Purchase/Credit Note
                                </NavLink>
                                </CollapsibleContent>}  */}
                </Collapsible>
              )}

              {Role !== "Security" && rendersection("Production") && (
                <Collapsible
                  open={openSection === "production"}
                  onOpenChange={() => toggleSection("production")}>
                  <CollapsibleTrigger
                    className={`flex flex-row items-center justify-center mb-4 user-pvt ${
                      openSection === "production" ? "trigger-open" : ""
                    }`}>
                    <MdOutlineFactory color="green" size={18} className="mb-1"/>
                    <p className="ml-2 text-green-800 italic font-extrabold drop-shadow-sm">PRODUCTION</p>
                    <span className="ml-auto">
                      {openSection === "production" ? (
                        <FiChevronDown size={18} />
                      ) : (
                        <FiChevronRight size={18} />
                      )}
                    </span>
                  </CollapsibleTrigger>

                  {/* {renderlink("Grading") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/RcnGrading">
                        <p className="flex">
                          <MdGrading size={20} className="text-yellow-600" />
                          <p className="pl-4"> RCN Grading </p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )} */}

                  {renderlink("Boiling") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/RcnBoiling">
                        <p className="flex">
                          {" "}
                          <GiBoilingBubbles
                            size={20}
                            className="text-cyan-600"
                          />
                          <p className="pl-4 "> RCN Boiling </p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {renderlink("Scooping") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/RcnScooping">
                        <p className="flex">
                          {" "}
                          <GiIceCreamScoop size={20} color="red" />
                          <p className="pl-4"> RCN Scooping </p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {renderlink("Borma") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/RcnBorma">
                        <p className="flex">
                          {" "}
                          <CgSmartHomeBoiler
                            size={20}
                            className="text-lime-600"
                          />
                          <p className="pl-4"> DNW Borma </p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {renderlink("Humidifier") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/Humidifier">
                        <p className="flex">
                          {" "}
                          <BsMoisture size={20} color="blue" />
                          <p className="pl-4"> Humidifier </p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {renderlink("Peeling") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/Peeling">
                        <p className="flex">
                          {" "}
                          <PiWashingMachineLight
                            size={20}
                            className="text-purple-600"
                          />
                          <p className="pl-4"> Peeling </p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {(!isRestrictedRole ||
                    (Role === "MayurSupervisor" && isVisible)) &&
                    renderlink("Mayur") && (
                      <CollapsibleContent className="Items-pvt">
                        <NavLink to="/dashboard/Mayur">
                          <p className="flex">
                            <AiFillCodeSandboxSquare
                              size={20}
                              className="text-green-600"
                            />
                            <p className="pl-4"> Mayur </p>
                          </p>
                        </NavLink>
                      </CollapsibleContent>
                    )}

                  {(!isRestrictedRole ||
                    (Role === "MayurSupervisor" && isVisible)) &&
                    renderlink("Hamsa") && (
                      <CollapsibleContent className="Items-pvt">
                        <NavLink to="/dashboard/Hamsa">
                          <p className="flex">                  
                            <GiVendingMachine
                              size={20}
                              className="text-teal-500"
                            />
                            <p className="pl-4"> Hamsa </p>
                          </p>
                        </NavLink>
                      </CollapsibleContent>
                    )}

                  {(!isRestrictedRole ||
                    (Role === "SortingSupervisor" && isVisible)) &&
                    renderlink("DPDS") && (
                      <CollapsibleContent className="Items-pvt">
                        <NavLink to="/dashboard/DPDS">
                          <p className="flex">
                            <GiBoxingRing size={20} className="text-pink-600" />
                            <p className="pl-4"> DP & DS </p>
                          </p>
                        </NavLink>
                      </CollapsibleContent>
                    )}

                  {(!isRestrictedRole ||
                    (Role === "SortingSupervisor" && isVisible)) &&
                    renderlink("Sorting") && (
                      <CollapsibleContent className="Items-pvt">
                        <NavLink to="/dashboard/Sorting">
                          <p className="flex">
                            <FaSortAmountDownAlt
                              size={20}
                              className="text-orange-500"
                            />
                            <p className="pl-4"> Sorting </p>
                          </p>
                        </NavLink>
                      </CollapsibleContent>
                    )}

                  {(!isRestrictedRole ||
                    (Role === "PeelingSupervisor" && isVisible)) &&
                    renderlink("BigTaiho") && (
                      <CollapsibleContent className="Items-pvt">
                        <NavLink to="/dashboard/BigTaiho">
                          <p className="flex">
                            <AiOutlineProduct
                              size={20}
                              className="text-gray-500"
                            />
                            <p className="pl-4"> Big Taiho </p>
                          </p>
                        </NavLink>
                      </CollapsibleContent>
                    )}

                  {(!isRestrictedRole ||
                    (Role === "WholesSupervisor" && isVisible)) &&
                    renderlink("Wholes") && (
                      <CollapsibleContent className="Items-pvt">
                        <NavLink to="/dashboard/Wholes">
                          <p className="flex">
                            <CiPill size={20} className="text-violet-500" />
                            <p className="pl-4"> Wholes Grading</p>
                          </p>
                        </NavLink>
                      </CollapsibleContent>
                    )}

                  {(!isRestrictedRole ||
                    (Role === "WholesSupervisor" && isVisible)) &&
                    renderlink("LW") && (
                      <CollapsibleContent className="Items-pvt">
                        <NavLink to="/dashboard/LW">
                          <p className="flex">
                            <GiPillDrop size={20} className="text-blue-500" />
                            <p className="pl-4"> Lower Grading</p>
                          </p>
                        </NavLink>
                      </CollapsibleContent>
                    )}

                  {renderlink("Receiving Village Entry") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/RcvVillage">
                        <p className="flex">
                          <MdHolidayVillage
                            size={20}
                            className="text-red-500"
                          />
                          <p className="pl-4 font-semibold"> Village </p>
                          <FiChevronRight size={18} />
                          <p></p>Out
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {renderlink("Receiving Village Entry") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/RcvVillageIn">
                        <p className="flex">
                          <MdHolidayVillage
                            size={20}
                            className="text-green-500"
                          />
                          <p className="pl-4 font-semibold"> Village </p>
                          <FiChevronRight size={18} />
                          <p></p>In
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {(!isRestrictedRole ||
                    (Role === "VillageSupervisor" && isVisible)) &&
                    renderlink("Village") && (
                      <CollapsibleContent className="Items-pvt">
                        <NavLink to="/dashboard/VIllage">
                          <p className="flex">
                            <GiVillage size={20} className="text-blue-500" />
                            <p className="pl-4 font-semibold"> Village </p>{" "}
                            <FiChevronRight size={18} />
                            <p></p>Production
                          </p>
                        </NavLink>
                      </CollapsibleContent>
                    )}

                  {(!isRestrictedRole ||
                    (Role === "VillageSupervisor" && isVisible)) &&
                    renderlink("Rejection") && (
                      <CollapsibleContent className="Items-pvt">
                        <NavLink to="/dashboard/Rejection">
                          <p className="flex">
                            <GrEject size={20} className="text-purple-500" />
                            <p className="pl-4"> Rejection</p>
                          </p>
                        </NavLink>
                      </CollapsibleContent>
                    )}

                  {renderlink("Packing") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/Packing">
                        <p className="flex">
                          <GiBoxUnpacking
                            size={20}
                            className="text-yellow-600"
                          />
                          <p className="pl-4">Order & Packing</p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              )}

              {rendersection("Quality") && (
                <Collapsible
                  open={openSection === "quality"}
                  onOpenChange={() => toggleSection("quality")}>
                  <CollapsibleTrigger
                    className={`flex flex-row items-center justify-center user-pvt ${
                      openSection === "quality" ? "trigger-open" : ""
                    }`}>
                    <LuBadgeCheck size={18} className="text-indigo-800 mb-1" />
                    <p className="ml-2 text-blue-800 italic font-extrabold drop-shadow-sm capitalize">QUALITY</p>
                    <span className="ml-auto drop-shadow-lg">
                      {openSection === "quality" ? (
                        <FiChevronDown size={18} />
                      ) : (
                        <FiChevronRight size={18} />
                      )}
                    </span>
                  </CollapsibleTrigger>
                  {renderlink("RCN Incoming QC") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/qcRCN">
                        <p className="flex">
                     
                          <FaAcquisitionsIncorporated
                            size={20}
                            className="text-red-500"
                          />
                          <p className="pl-5"> RCN Incoming QC </p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}
                  {renderlink("RCN Incoming QC") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/qc_packaging_metirial">
                        <p className="flex">
                      
                          <MdOutlineHighQuality
                            size={20}
                            className="text-blue-500"
                          />
                          <p className="pl-5"> Packaging Material QC </p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}
                  {renderlink("RCN Incoming QC") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/qc_water">
                        <p className="flex">
                    
                          <FaWater size={20} className="text-yellow-600" />
                          <p className="pl-5"> Water QC </p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {renderlink("RCN Incoming QC") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/qc_online">
                        <p className="flex">
                      
                          <PiTestTubeDuotone
                            size={20}
                            className="text-green-600"
                          />
                          <p className="pl-5"> Online Test QC </p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )}

                  {/* {renderlink("RCN Incoming QC") && (
                    <CollapsibleContent className="Items-pvt">
                      <NavLink to="/dashboard/qc_out">
                        <p className="flex">
                       
                          <TbLogout 
                            size={20}
                            className="text-cyan-600"
                          />
                          <p className="pl-5">Cashew Outgoing QC </p>
                        </p>
                      </NavLink>
                    </CollapsibleContent>
                  )} */}
                </Collapsible>
              )}

              {/* {rendersection('Maintainance') && <Collapsible >
                        <CollapsibleTrigger className="user-pvt"><LuServerCrash size={25} />
                            <p>Maintainance</p></CollapsibleTrigger>

                            {renderlink('Cleaning') &&  <CollapsibleContent className="Items-pvt">
                            <NavLink to="/dashboard/cleaning" >
                                Cleaning
                            </NavLink>
                        </CollapsibleContent>}
                    </Collapsible>} */}
            </a>
          </div>

          <div className="min-h-[4vh] bg-cyan-900 pt-4 text-white border-r-8 border-gray-300">
            <a>
            

              <Popover
                open={openSection === "account"}
                onOpenChange={() => toggleSection("account")}>
                <PopoverTrigger 
                  className={`user-pvt 
                  }`}> 
                  <IoMdSettings size={20} color="white" />
                  <p className="ml-4 text-white text-shadow-md">Profile</p>
                  <span className="ml-auto">
                    {openSection === "account" ? (
                      <FiChevronRight size={18} />
                    ) : (
                      <FiChevronDown size={18} />
                    )}
                  </span>
                </PopoverTrigger>
                <PopoverContent side="right"       // 👈 opens to the right
                                align="center"      // 👈 aligns top edges
                                sideOffset={1}     // 👈 adds a little gap from the trigger
                className="text-sm flex flex-col gap-3 ">
                  <span className="flex flex-row gap-3 hover:font-semibold " ><FaUserTie size={18} color="black" />
                  <NavLink to="/dashboard/userprofile">  Account</NavLink></span>
                  <span className="flex flex-row gap-3 hover:font-semibold hover:text-red-500"><AiOutlineLogout size={18} color="black"/>

                    <a  onClick={handleLogout}>Logout</a>
                  </span>
                </PopoverContent>
              </Popover>
            </a>
          </div>
        </div>
      </>
    );
}
export default DashboardSidebar