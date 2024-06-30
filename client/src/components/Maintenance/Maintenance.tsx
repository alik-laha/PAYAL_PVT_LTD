import GraddingMaintenance from "./GraddingMaintenance/Graddingmaintenance"
import DashboardHeader from "../dashboard/DashboardHeader"
import DashboardSidebar from "../dashboard/DashboardSidebar"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"



const Maintenance = () => {
    const [GraddingView, setGraddingView] = useState("none")
    const handleGraddingView = () => {
        if (GraddingView === "block")
            setGraddingView("none")
        else
            setGraddingView("block")
    }
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <Separator className="my-4" />
            <div className="flex h-5 items-center space-x-4 text-sm">
                <div onClick={handleGraddingView}>Gradding</div>
                <Separator orientation="vertical" />
                <div>Boilling</div>
            </div>
            <div style={{ display: GraddingView }}>
                <GraddingMaintenance />
            </div>
        </div>
    )
}
export default Maintenance