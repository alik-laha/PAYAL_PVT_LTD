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
import { LuBadgeCheck, LuServerCrash } from "react-icons/lu";



const DashboardSidebar = () => {
    // const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false);



    const openSidebar = () => {
        setSidebarOpen(true);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };


    return (
        <>
            <div className="main">
                <span className="openbtn" onClick={openSidebar}>&#9776; </span>
            </div>

            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <a href="#" className="closebtn" onClick={closeSidebar}>&times;</a>
                <a>
                    <Collapsible >
                        <CollapsibleTrigger className="user-pvt"><MdOutlineAdminPanelSettings size={25} />
                            <p>Admin & HR</p></CollapsibleTrigger>
                        <CollapsibleContent className="Items-pvt">
                            Employee
                        </CollapsibleContent >
                        <CollapsibleContent className="Items-pvt">
                            Dashboard User
                        </CollapsibleContent>
                        <CollapsibleContent className="Items-pvt">
                            Machine
                        </CollapsibleContent >
                        
                       
                        
                    </Collapsible>
                    <Collapsible >
                        <CollapsibleTrigger className="user-pvt"><MdOutlineFactory size={25} />
                            <p>Production</p></CollapsibleTrigger>
                            <CollapsibleContent className="Items-pvt">
                            RCN Grading
                        </CollapsibleContent>
                        <CollapsibleContent className="Items-pvt">
                            RCN Boiling
                        </CollapsibleContent>
                    </Collapsible>

                    <Collapsible >
                        <CollapsibleTrigger className="user-pvt"><MdCallReceived size={25} />
                            <p>Receiving</p></CollapsibleTrigger>
                        <CollapsibleContent className="Items-pvt">
                            RCN Primary Entry
                        </CollapsibleContent>
                        
                    </Collapsible>

                    <Collapsible >
                        <CollapsibleTrigger className="user-pvt"><LuBadgeCheck size={25} />
                            <p>Quality</p></CollapsibleTrigger>
                        <CollapsibleContent className="Items-pvt">
                            RCN Primary QC
                        </CollapsibleContent>
                        

                    </Collapsible>
                    <Collapsible >
                        <CollapsibleTrigger className="user-pvt"><LuServerCrash size={25} />
                            <p>Maintainance</p></CollapsibleTrigger>

                    </Collapsible>
               

                </a>
            </div>






        </>
    )
}
export default DashboardSidebar