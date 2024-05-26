import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { useNavigate } from "react-router-dom"
import "./dashboard.css"
import { useState } from "react"

const DashboardSidebar = () => {
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(true);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };
    return (
        <>
            <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <a href="#" className="closebtn" onClick={closeSidebar}>&times;</a>
                <a>
                    <Collapsible >
                        <CollapsibleTrigger >HR & user Management</CollapsibleTrigger>
                        <CollapsibleContent >
                            Create User
                        </CollapsibleContent>
                        <CollapsibleContent >
                            Create Employee
                        </CollapsibleContent>
                    </Collapsible>
                </a>
            </div>
            <div className="main">
                <span className="openbtn" onClick={openSidebar}>&#9776;</span>
            </div>
        </>
    )
}
export default DashboardSidebar