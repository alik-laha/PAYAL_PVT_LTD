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
       
       
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}` }>
                <a href="#" className="closebtn" onClick={closeSidebar}>&times;</a>
                <a>
                    <Collapsible >
                        <CollapsibleTrigger className="user-pvt"><MdOutlineAdminPanelSettings size={25}/><p>Admin & HR</p></CollapsibleTrigger>
                        <CollapsibleContent className="Items-pvt">
                            Create Employee
                        </CollapsibleContent >
                        <CollapsibleContent className="Items-pvt">
                            Modify/Export Employee
                        </CollapsibleContent>
                        <CollapsibleContent className="Items-pvt">
                            Create Dashboard User
                        </CollapsibleContent>
                        <CollapsibleContent className="Items-pvt">
                            Modify/Export Dashboard User
                        </CollapsibleContent>
                    </Collapsible>
                    <Collapsible >
                        <CollapsibleTrigger className="user-pvt"><MdCallReceived size={25}/><p>Receiving</p></CollapsibleTrigger>
                        <CollapsibleContent className="Items-pvt">
                            Create User
                        </CollapsibleContent>
                        <CollapsibleContent className="Items-pvt">
                            Create Employee
                        </CollapsibleContent>
                    </Collapsible>
                </a>
            </div>
            <div className="main">
                <span className="openbtn" onClick={openSidebar}>&#9776; </span>
            </div>
            
            
        
            
            
        </>
    )
}
export default DashboardSidebar