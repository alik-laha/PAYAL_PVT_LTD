import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
// import { useNavigate } from "react-router-dom"
import "./dashboard.css"
import { useState } from "react"
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdCallReceived } from "react-icons/md";
import { MdOutlineFactory } from "react-icons/md";
import { LuBadgeCheck } from "react-icons/lu";
//import {  LuServerCrash } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { PermissionRol, PermissionDep } from "../common/exportData";
import { PermissionRole, PermissionDept } from "@/type/type";
import { LuServerCrash } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";



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
                                <NavLink to="/dashboard/user" >
                                    Dashboard Users
                                </NavLink>
                            </CollapsibleContent>}

                        {renderlink('Employee')
                            && <CollapsibleContent className="Items-pvt">
                                <NavLink to="/dashboard/employee" >
                                    Employee
                                </NavLink>
                            </CollapsibleContent >}

                       

                        {renderlink('Asset')
                            && <CollapsibleContent className="Items-pvt" >
                                <NavLink to="/dashboard/machine" >
                                    Asset Mapping
                                </NavLink>
                            </CollapsibleContent >}



                    </Collapsible>}

                    {rendersection('Production') && <Collapsible >
                        <CollapsibleTrigger className="user-pvt"><MdOutlineFactory size={25} />
                            <p>Production</p></CollapsibleTrigger>
                        {renderlink('Grading')
                            && <CollapsibleContent className="Items-pvt">
                                <NavLink to="/dashboard/RcnGrading" >
                                    RCN Grading
                                </NavLink>
                            </CollapsibleContent>}

                        {renderlink('Boiling')
                            && <CollapsibleContent className="Items-pvt">
                                <NavLink to="/dashboard/RcnBoiling" >
                                    RCN Boiling
                                </NavLink>
                            </CollapsibleContent>}
                        {/* {renderlink('Scooping')
                            &&  <CollapsibleContent className="Items-pvt">
                             <NavLink to="/dashboard/RcnScooping" >
                                RCN Scooping
                            </NavLink>
                        </CollapsibleContent>} */}

                    </Collapsible>}

                    {rendersection('Receiving') && <Collapsible >
                        <CollapsibleTrigger className="user-pvt"><MdCallReceived size={25} />
                            <p>Receiving</p></CollapsibleTrigger>

                        {renderlink('RCN Primary Entry')
                            && <CollapsibleContent className="Items-pvt">
                                <NavLink to="/dashboard/rcnprimaryentry" >
                                    RCN Primary Entry
                                </NavLink>

                            </CollapsibleContent>}

                    </Collapsible>}

                    {rendersection('Quality') && <Collapsible >
                        <CollapsibleTrigger className="user-pvt"><LuBadgeCheck size={25} />
                            <p>Quality</p></CollapsibleTrigger>
                        {renderlink('RCN Incoming QC')
                            && <CollapsibleContent className="Items-pvt">
                                <NavLink to="/dashboard/qcRCN" >
                                    RCN Incoming QC
                                </NavLink>
                            </CollapsibleContent>}


                    </Collapsible>}

                    {rendersection('Maintainance') && <Collapsible >
                        <CollapsibleTrigger className="user-pvt"><LuServerCrash size={25} />
                            <p>Maintainance</p></CollapsibleTrigger>

                            {renderlink('Cleaning') &&  <CollapsibleContent className="Items-pvt">
                            <NavLink to="/dashboard/cleaning" >
                                Cleaning
                            </NavLink>
                        </CollapsibleContent>}

                    </Collapsible>}
                    <Collapsible>
                <CollapsibleTrigger className="flex user-pvt "><IoMdSettings   size={25} />
                <p>Settings</p></CollapsibleTrigger>
                <CollapsibleContent className="Items-pvt">
                                <NavLink to="/dashboard/userprofile" >
                                    Profile
                                </NavLink>
                            </CollapsibleContent ></Collapsible >


                </a>
            </div>






        </>
    )
}
export default DashboardSidebar