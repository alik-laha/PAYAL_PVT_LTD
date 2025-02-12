import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
// import { useNavigate } from "react-router-dom"
import "./dashboard.css"
import { useState } from "react"
import { NavLink } from "react-router-dom";
import { PermissionRol, PermissionDep } from "../common/exportData";
import { PermissionRole, PermissionDept } from "@/type/type";
import {
    MdOutlineAdminPanelSettings, MdOutlineStorefront, MdGrading,
    MdHolidayVillage, MdCallReceived, MdOutlineFactory, MdOutlineOilBarrel, MdOutlineHighQuality
} from "react-icons/md";
import { IoIosNavigate, IoMdSettings } from "react-icons/io";
import { LuDonut, LuBadgeCheck } from "react-icons/lu";
import { GoPackageDependents } from "react-icons/go";
import { TbBrandPeanut, TbSitemap } from "react-icons/tb";
import { BiSolidUserPlus } from "react-icons/bi";
import { FaUserTie, FaWater, FaSortAmountDownAlt ,FaAcquisitionsIncorporated } from "react-icons/fa";
import { PiPackageLight, PiWashingMachineLight } from "react-icons/pi";
import { GiBoilingBubbles, GiIceCreamScoop, GiGate, GiBoxingRing,GiVendingMachine } from "react-icons/gi";
import { AiFillCodeSandboxSquare, AiOutlineProduct } from "react-icons/ai";

import { CgSmartHomeBoiler } from "react-icons/cg";
import { BsMoisture } from "react-icons/bs";
import { GiChopsticks } from "react-icons/gi";
import { IoArrowRedoOutline } from "react-icons/io5";

//import { GiPizzaCutter } from "react-icons/gi";


const DashboardSidebar = () => {
    // const navigate = useNavigate()
    const Role = localStorage.getItem('role') as keyof PermissionRole
    const Dept = localStorage.getItem('dept') as keyof PermissionDept
    const [sidebarOpen, setSidebarOpen] = useState(false);



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


    return (
        <>
            <div className="main">
                <span className="openbtn" onClick={openSidebar}>&#9776; </span>
            </div>

            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <a href="#" className="closebtn" onClick={closeSidebar}>&times;</a>
                <a>

                    {rendersection('HR & Admin') && <Collapsible >
                        <CollapsibleTrigger className="user-pvt"><MdOutlineAdminPanelSettings size={25} />
                            <p>Admin & HR</p></CollapsibleTrigger>
                        {renderlink('Dashboard User')
                            && <CollapsibleContent className="Items-pvt">
                                {renderlink('Dashboard User')}
                                <NavLink to="/dashboard/user" className='flex' >
                                    <p className="flex"><BiSolidUserPlus size={21} /> <p className="pl-3">Users</p></p>
                                </NavLink>
                            </CollapsibleContent>}

                        {renderlink('Employee')
                            && <CollapsibleContent className="Items-pvt">
                                <NavLink to="/dashboard/employee" >

                                    <p className="flex"><FaUserTie size={17} /> <p className="pl-3">Employee</p></p>
                                </NavLink>
                            </CollapsibleContent >}




                        {renderlink('Asset')
                            && <CollapsibleContent className="Items-pvt" >
                                <NavLink to="/dashboard/machine" >
                                    <p className="flex"><TbSitemap size={20} /> <p className="pl-3">Asset Mapping</p></p>
                                </NavLink>
                            </CollapsibleContent >}





                    </Collapsible>}
                    {rendersection('GatePass') && <Collapsible >
                        <CollapsibleTrigger className="user-pvt"><GiGate size={25} />
                            <p>Gate Pass</p></CollapsibleTrigger>
                        {renderlink('Gatepass')
                            && <CollapsibleContent className="Items-pvt">
                                {renderlink('Dashboard User')}
                                <NavLink to="/dashboard/gatepassIn" >
                                    <p className="flex"><IoIosNavigate size={22} /> <p className="pl-3">Entry</p></p>
                                </NavLink>
                            </CollapsibleContent>}

                    </Collapsible>}

                    {Role !== 'Security' && rendersection('Receiving') &&
                        <Collapsible >
                            <CollapsibleTrigger className="user-pvt"><MdCallReceived size={25} />
                                <p>Logistics</p></CollapsibleTrigger>
                            {renderlink('VendorSKU')
                                && <CollapsibleContent className="Items-pvt">
                                    {renderlink('Dashboard User')}
                                    <NavLink to="/dashboard/vendorSKU" >
                                        <p className="flex"><TbSitemap size={20} /> <p className="pl-3">Item/Vendor Mapping</p></p>
                                    </NavLink>
                                </CollapsibleContent>}


                            {renderlink('Receiving Store Entry')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/storePrimary" >

                                        <p className="flex"><MdOutlineStorefront size={20} /><p className="pl-3">    Store Item </p></p>
                                    </NavLink>

                                </CollapsibleContent>}

                            {renderlink('Store Issue')
                                && <CollapsibleContent className="Items-pvt">
                                    {renderlink('Dashboard User')}
                                    <NavLink to="/dashboard/StoreIssue" >
                                        <p className="flex"><IoArrowRedoOutline size={20} /> <p className="pl-3">Store Item Issue</p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                            {renderlink('Receiving Civil Entry')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/GeneralStore" >

                                        <p className="flex"><PiPackageLight size={22} /><p className="pl-3"> General Item </p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                            {renderlink('Receiving Packaging Entry')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/recevingpackagingMaterial" >

                                        <p className="flex"><GoPackageDependents size={18} /><p className="pl-3">  Packaging Material </p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                            {renderlink('RCN Primary Entry')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/rcnprimaryentry" >

                                        <p className="flex"><LuDonut size={20} /> <p className="pl-3"> Raw Cachew </p></p>

                                    </NavLink>

                                </CollapsibleContent>}

                            {renderlink('Receiving Almond Entry')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/AlmondPrimary" >

                                        <p className="flex"><TbBrandPeanut size={20} /> <p className="pl-3"> Almond  </p></p>
                                    </NavLink>

                                </CollapsibleContent>}


                            {renderlink('Receiving Agarbati Entry')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/AgarbatiPrimary" >

                                        <p className="flex"><GiChopsticks size={20} /> <p className="pl-3">   Agarbatti </p></p>
                                    </NavLink>

                                </CollapsibleContent>}

                            {renderlink('Receiving OilMill Entry')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/OilMill" >

                                        <p className="flex"><MdOutlineOilBarrel size={22} /> <p className="pl-3">   OilMill </p></p>
                                    </NavLink>

                                </CollapsibleContent>}




                            {/* {renderlink('Receiving Purchase Entry')
                            && <CollapsibleContent className="Items-pvt">
                                <NavLink to="/dashboard/recevingpackagingMaterial" >
                                    Purchase/Credit Note
                                </NavLink>
                                </CollapsibleContent>}  */}




                        </Collapsible>}
                    {Role !== 'Security' && rendersection('Production') &&
                        <Collapsible >
                            <CollapsibleTrigger className="user-pvt"><MdOutlineFactory size={25} />
                                <p>Production</p></CollapsibleTrigger>

                            {renderlink('Grading')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/RcnGrading" >
                                        <p className="flex"><MdGrading size={20} /><p className="pl-3">  RCN Grading </p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                            {renderlink('Boiling')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/RcnBoiling" >
                                        <p className="flex"> <GiBoilingBubbles size={20} /><p className="pl-3">  RCN Boiling </p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                            {renderlink('Scooping')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/RcnScooping" >
                                        <p className="flex"> <GiIceCreamScoop size={20} /><p className="pl-3">  RCN Scooping </p></p>
                                    </NavLink>
                                </CollapsibleContent>}
                            
                            {renderlink('Borma')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/RcnBorma" >
                                        <p className="flex"> <CgSmartHomeBoiler size={20} /><p className="pl-3">  RCN Borma </p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                            {renderlink('Humidifier')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/Humidifier" >
                                        <p className="flex"> <BsMoisture size={20} /><p className="pl-3">  RCN Humidifier </p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                            {renderlink('Peeling')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/Peeling" >
                                        <p className="flex"> < PiWashingMachineLight size={20} /><p className="pl-3">  RCN Peeling </p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                            {renderlink('BigTaiho')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/BigTaiho" >

                                        <p className="flex"> <AiOutlineProduct size={20} /><p className="pl-3">  RCN BigTaiho </p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                            {renderlink('Mayur')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/Mayur" >
                                        <p className="flex"> <AiFillCodeSandboxSquare size={20} /><p className="pl-3">  RCN Mayur </p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                                {renderlink('Hamsa')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/Hamsa" >
                                        <p className="flex"> <GiVendingMachine size={20} /><p className="pl-3">  RCN Hamsa </p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                            {renderlink('DPDS')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/DPDS" >
                                        <p className="flex"> <GiBoxingRing size={20} /><p className="pl-3">  RCN DPDS </p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                            {renderlink('Sorting')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/Sorting" >
                                        <p className="flex"> <FaSortAmountDownAlt size={20} /><p className="pl-3">  RCN Sorting </p></p>
                                    </NavLink>
                                </CollapsibleContent>}


                           

                            

                            {renderlink('Receiving Village Entry')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/RcvVillage" >

                                        <p className="flex"> <MdHolidayVillage size={20} /><p className="pl-3">  Village Primary </p></p>

                                    </NavLink>

                                </CollapsibleContent>}
                        </Collapsible>}

                    {rendersection('Quality') && <Collapsible >
                        <CollapsibleTrigger className="user-pvt"><LuBadgeCheck size={25} />
                            <p>Quality</p></CollapsibleTrigger>
                        {renderlink('RCN Incoming QC')
                            && <CollapsibleContent className="Items-pvt">
                                <NavLink to="/dashboard/qcRCN" >
                                    <p className="flex"> <FaAcquisitionsIncorporated size={20} /><p className="pl-3">  RCN Incoming QC </p></p>

                                </NavLink>
                            </CollapsibleContent>}
                        {renderlink('RCN Incoming QC')
                            && <CollapsibleContent className="Items-pvt">
                                <NavLink to="/dashboard/qc_packaging_metirial" >
                                    <p className="flex"> <MdOutlineHighQuality size={20} /><p className="pl-3">  Packaging Material QC </p></p>

                                </NavLink>
                            </CollapsibleContent>}
                        {renderlink('RCN Incoming QC')
                            && <CollapsibleContent className="Items-pvt">
                                <NavLink to="/dashboard/qc_water" >
                                    <p className="flex"> <FaWater size={20} /><p className="pl-3">  Water QC </p></p>

                                </NavLink>
                            </CollapsibleContent>}


                    </Collapsible>}




                    {/* {rendersection('Maintainance') && <Collapsible >

                        <CollapsibleTrigger className="user-pvt"><LuServerCrash size={25} />
                            <p>Maintainance</p></CollapsibleTrigger>

                            {renderlink('Cleaning') &&  <CollapsibleContent className="Items-pvt">
                            <NavLink to="/dashboard/cleaning" >
                                Cleaning
                            </NavLink>
                        </CollapsibleContent>}

                    </Collapsible>} */}


                    <Collapsible>
                        <CollapsibleTrigger className="flex user-pvt "><IoMdSettings size={25} />
                            <p>Profile</p></CollapsibleTrigger>
                        <CollapsibleContent className="Items-pvt">
                            <NavLink to="/dashboard/userprofile" >
                                Account
                            </NavLink>
                        </CollapsibleContent ></Collapsible >


                </a>
            </div>






        </>
    )
}
export default DashboardSidebar