/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
// import { useNavigate } from "react-router-dom"
import "./dashboard.css"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { PermissionRol, PermissionDep } from "../common/exportData";
import { PermissionRole, PermissionDept } from "@/type/type";
import { RxDashboard } from "react-icons/rx";
import {
    MdOutlineAdminPanelSettings, MdOutlineStorefront, MdGrading,
    MdHolidayVillage, MdCallReceived, MdOutlineFactory, MdOutlineOilBarrel, MdOutlineHighQuality,
    MdOutlineSpaceDashboard
} from "react-icons/md";
import { IoIosNavigate, IoMdSettings } from "react-icons/io";
import { LuDonut, LuBadgeCheck } from "react-icons/lu";
import { GoPackageDependents } from "react-icons/go";
import { TbBrandPeanut, TbSitemap } from "react-icons/tb";
import { BiSolidUserPlus } from "react-icons/bi";
import { FaUserTie, FaWater, FaSortAmountDownAlt ,FaAcquisitionsIncorporated } from "react-icons/fa";
import { PiPackageLight, PiWashingMachineLight,PiTestTubeDuotone  } from "react-icons/pi";
import { GiBoilingBubbles, GiIceCreamScoop, GiGate, GiPillDrop ,GiBoxingRing,GiVendingMachine, GiBoxUnpacking, GiVillage, GiOpenedFoodCan } from "react-icons/gi";
import { AiFillCodeSandboxSquare, AiOutlineProduct } from "react-icons/ai";
import { CiPill } from "react-icons/ci";
import { GrEject } from "react-icons/gr";

import { CgSmartHomeBoiler } from "react-icons/cg";
import { BsMoisture } from "react-icons/bs";
import { GiChopsticks } from "react-icons/gi";
import { IoArrowRedoOutline } from "react-icons/io5";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

//import { GiPizzaCutter } from "react-icons/gi";


const DashboardSidebar = () => {
    // const navigate = useNavigate()
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


    return (
        <>
            <div className="main">
                <span className="openbtn" onClick={openSidebar}>&#9776; </span>
            </div>

            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <a href="#" className="closebtn" onClick={closeSidebar}>&times;</a>
                <a>

                   <Collapsible open={openSection === 'dashboard'} onOpenChange={() => toggleSection('dashboard')}>
                        <CollapsibleTrigger  className={`user-pvt ${openSection === 'dashboard' ? 'trigger-open' : ''}`}><RxDashboard  size={20} />
                            <p className="ml-2">Dashboard</p>
                              <span className="ml-auto">
                                {openSection === 'dashboard' ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
                             </span>
                             </CollapsibleTrigger>
                        <CollapsibleContent className="Items-pvt">
                            <NavLink to="/dashboard/dashboard1" >
                                <p className="flex"><MdOutlineSpaceDashboard size={22} /> <p className="pl-3">General</p></p>
                            </NavLink>
                            
                        </CollapsibleContent >
                  
                        </Collapsible >

                    {rendersection('HR & Admin') && 
                    
                 <Collapsible open={openSection === 'admin'} onOpenChange={() => toggleSection('admin')}>
                        <CollapsibleTrigger  className={`user-pvt ${openSection === 'admin' ? 'trigger-open' : ''}`}><MdOutlineAdminPanelSettings size={20} />
                            <p className="ml-2">Admin & HR</p>
                            <span className="ml-auto">
                                   {openSection === 'admin' ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
                             </span>
                             </CollapsibleTrigger>
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
                    {rendersection('GatePass') && 
                 <Collapsible open={openSection === 'gatepass'} onOpenChange={() => toggleSection('gatepass')}>
                        <CollapsibleTrigger className={`user-pvt ${openSection === 'gatepass' ? 'trigger-open' : ''}`}><GiGate size={20} />
                            <p className="ml-2">Gate Pass</p>
                            <span className="ml-auto">
                                  {openSection === 'gatepass' ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
                             </span>
                             </CollapsibleTrigger>
                        {renderlink('Gatepass')
                            && <CollapsibleContent className="Items-pvt">
                                {renderlink('Dashboard User')}
                                <NavLink to="/dashboard/gatepassIn" >
                                    <p className="flex"><IoIosNavigate size={22} /> <p className="pl-3">Entry</p></p>
                                </NavLink>
                            </CollapsibleContent>}

                    </Collapsible>}

                    {Role !== 'Security' && rendersection('Receiving') &&
                     <Collapsible open={openSection === 'receiving'} onOpenChange={() => toggleSection('receiving')}>
                            <CollapsibleTrigger className={`user-pvt ${openSection === 'receiving' ? 'trigger-open' : ''}`}><MdCallReceived size={20} />
                                <p className="ml-2">Logistics</p>
                                 <span className="ml-auto">
                                 {openSection === 'receiving' ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
                             </span>
                                </CollapsibleTrigger>
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

                                        <p className="flex"><MdOutlineStorefront size={20} /><p className="pl-3">Store Item </p></p>
                                    </NavLink>

                                </CollapsibleContent>}

                            {renderlink('Store Issue')
                                && <CollapsibleContent className="Items-pvt">
                                    {renderlink('Dashboard User')}
                                    <NavLink to="/dashboard/StoreIssue" >
                                        <p className="flex"><IoArrowRedoOutline size={20} /> <p className="pl-3">Store Issue</p></p>
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

                                        <p className="flex"><LuDonut size={20} /> <p className="pl-3"> Raw Cachew IN</p></p>

                                    </NavLink>

                                </CollapsibleContent>}


                            {renderlink('Cashew Exit')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/rcnprimaryexit" >

                                        <p className="flex"><GiOpenedFoodCan  size={20} /> <p className="pl-3">Finished Cachew OUT</p></p>

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
                     <Collapsible open={openSection === 'production'} onOpenChange={() => toggleSection('production')}>
                            <CollapsibleTrigger className={`user-pvt ${openSection === 'production' ? 'trigger-open' : ''}`}><MdOutlineFactory size={20} />
                                <p className="ml-2">Production</p>
                                 <span className="ml-auto">
                                 {openSection==='production'? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
                             </span>
                                </CollapsibleTrigger>

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
                                        <p className="flex"> <CgSmartHomeBoiler size={20} /><p className="pl-3">  DNW Borma </p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                            {renderlink('Humidifier')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/Humidifier" >
                                        <p className="flex"> <BsMoisture size={20} /><p className="pl-3"> Humidifier </p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                            {renderlink('Peeling')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/Peeling" >
                                        <p className="flex"> < PiWashingMachineLight size={20} /><p className="pl-3"> Peeling </p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                            {(!isRestrictedRole || (Role === 'PeelingSupervisor' && isVisible)) && renderlink('BigTaiho')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/BigTaiho" >

                                        <p className="flex"> <AiOutlineProduct size={20} /><p className="pl-3"> BigTaiho </p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                            {(!isRestrictedRole || (Role === 'MayurSupervisor' && isVisible)) && renderlink('Mayur')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/Mayur" >
                                        <p className="flex"> <AiFillCodeSandboxSquare size={20} /><p className="pl-3"> Mayur </p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                                {(!isRestrictedRole || (Role === 'MayurSupervisor' && isVisible)) && renderlink('Hamsa')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/Hamsa" >
                                        <p className="flex"> <GiVendingMachine size={20} /><p className="pl-3">  Hamsa </p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                            {(!isRestrictedRole || (Role === 'SortingSupervisor' && isVisible)) && renderlink('DPDS')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/DPDS" >
                                        <p className="flex"> <GiBoxingRing size={20} /><p className="pl-3">  DP & DS </p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                            {(!isRestrictedRole || (Role === 'SortingSupervisor' && isVisible)) && renderlink('Sorting')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/Sorting" >
                                        <p className="flex"> <FaSortAmountDownAlt size={20} /><p className="pl-3">  Sorting </p></p>
                                    </NavLink>
                                </CollapsibleContent>}


                                {(!isRestrictedRole || (Role === 'WholesSupervisor' && isVisible)) && renderlink('Wholes')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/Wholes" >
                                        <p className="flex"> <CiPill size={20} /><p className="pl-3">  Wholes Grade</p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                                {(!isRestrictedRole || (Role === 'WholesSupervisor' && isVisible)) && renderlink('LW')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/LW" >
                                        <p className="flex"> <GiPillDrop  size={20} /><p className="pl-3">  Lower Grade</p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                                {renderlink('Receiving Village Entry')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/RcvVillage" >

                                        <p className="flex"> <MdHolidayVillage size={20} /><p className="pl-3">  Village Logistics ( OUT )</p></p>

                                    </NavLink>

                                </CollapsibleContent>}

                                {renderlink('Receiving Village Entry')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/RcvVillageIn" >

                                        <p className="flex"> <MdHolidayVillage size={20} /><p className="pl-3">  Village Logistics ( IN )</p></p>

                                    </NavLink>

                                </CollapsibleContent>}

                                {(!isRestrictedRole || (Role === 'VillageSupervisor' && isVisible)) && renderlink('Village')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/VIllage" >
                                        <p className="flex"> <GiVillage size={20} /><p className="pl-3">Village Production</p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                                

                                {(!isRestrictedRole || (Role === 'VillageSupervisor' && isVisible)) && renderlink('Rejection')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/Rejection" >
                                        <p className="flex"> <GrEject   size={20} /><p className="pl-3">  Rejection</p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                                


                                {renderlink('Packing')
                                && <CollapsibleContent className="Items-pvt">
                                    <NavLink to="/dashboard/Packing" >
                                        <p className="flex"> <GiBoxUnpacking size={20} /><p className="pl-3">Order & Packing</p></p>
                                    </NavLink>
                                </CollapsibleContent>}

                        
                        </Collapsible>}

                    {rendersection('Quality') && 
                    <Collapsible open={openSection === 'quality'} onOpenChange={() => toggleSection('quality')}>
                        <CollapsibleTrigger className={`user-pvt ${openSection === 'quality' ? 'trigger-open' : ''}`}><LuBadgeCheck size={20} />
                            <p className="ml-2">Quality</p>
                              <span className="ml-auto">
                                 {openSection==='quality' ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
                             </span>
                            </CollapsibleTrigger>
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

                        {renderlink('RCN Incoming QC')
                            && <CollapsibleContent className="Items-pvt">
                                <NavLink to="/dashboard/qc_online" >
                                    <p className="flex"> <PiTestTubeDuotone  size={20} /><p className="pl-3">  Online Test QC </p></p>

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


                     <Collapsible open={openSection === 'account'} onOpenChange={() => toggleSection('account')}>
                        <CollapsibleTrigger className={`user-pvt ${openSection === 'account' ? 'trigger-open' : ''}`}><IoMdSettings size={20} />
                            <p className="ml-2">Profile</p>
                            <span className="ml-auto">
                                 {openSection==='account' ? <FiChevronDown size={18} /> : <FiChevronRight size={18} />}
                             </span>
                             </CollapsibleTrigger>
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