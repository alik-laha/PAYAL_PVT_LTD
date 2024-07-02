import GraddingMaintenance from "./GraddingMaintenance/Graddingmaintenance"
import DashboardHeader from "../dashboard/DashboardHeader"
import DashboardSidebar from "../dashboard/DashboardSidebar"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import BoillingMaintenance from "./boillingMaintenance/BoillingMaintenence"



const Maintenance = () => {
    const [GraddingView, setGraddingView] = useState("none")
    const [BoillingView, setBoillingView] = useState("none")
    const handleGraddingView = () => {
        if (GraddingView === "block") {
            setGraddingView("none")
        }
        else {
            setGraddingView("block")
            setBoillingView("none")
        }

    }
    const handleBoillingView = () => {
        if (BoillingView === "block") {
            setBoillingView("none")

        }
        else {
            setBoillingView("block")
            setGraddingView("none")
        }

    }
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                <Separator className="my-4" />
                <div className="flex h-5 items-center space-x-4 text-sm">
                    <div onClick={handleGraddingView}>Gradding</div>
                    <Separator orientation="vertical" onClick={handleBoillingView} />
                    <div>Boilling</div>
                </div>
                <div style={{ display: GraddingView }}>
                    <GraddingMaintenance />
                </div>
                <div style={{ display: BoillingView }}>
                    <BoillingMaintenance />
                </div>
            </div>
        </div>
    )
}
export default Maintenance