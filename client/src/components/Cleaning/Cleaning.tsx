import GraddingMaintenance from "./GraddingCleaning/GraddingCleaning"
import DashboardHeader from "../dashboard/DashboardHeader"
import DashboardSidebar from "../dashboard/DashboardSidebar"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import BoillingMaintenance from "./boillingCleaning/BoillingCleaning"



const Cleaning = () => {
    const [GraddingView, setGraddingView] = useState("none")
    const [GraddingBackground, setGraddingBackground] = useState("")
    const [BoillingView, setBoillingView] = useState("none")
    const [BoillingBackground, setBoillingBackground] = useState("")
    const handleGraddingView = () => {
        if (GraddingView === "block") {
            setGraddingView("none")
            setGraddingBackground("")
            setBoillingBackground("")
        }
        else {
            setGraddingView("block")
            setBoillingView("none")
            setBoillingBackground("")
            setGraddingBackground("bg-blue-500")
        }

    }
    const handleBoillingView = () => {
        if (BoillingView === "block") {
            setBoillingView("none")
            setBoillingBackground("")
            setGraddingBackground("")

        }
        else {
            setBoillingView("block")
            setGraddingView("none")
            setGraddingBackground("")
            setBoillingBackground("bg-blue-500")
            console.log(BoillingView)
        }

    }
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container cursor-pointer'>
                <Separator className="my-4" />
                <div className="flex h-5 items-center space-x-4 text-sm">
                    <div onClick={handleGraddingView} className={GraddingBackground}>Gradding</div>
                    <Separator orientation="vertical" />
                    <div onClick={handleBoillingView} className={BoillingBackground} >Boilling</div>
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
export default Cleaning