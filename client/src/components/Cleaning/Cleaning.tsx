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
            setGraddingBackground("flexbox-tile-clean-select bg-blue-400")
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
            setBoillingBackground("flexbox-tile-clean-select bg-red-400")
            console.log(BoillingView)
        }

    }
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container cursor-pointer'>
                
                <Separator className="my-4" />
                <div className="flex h-5 items-center space-x-2 text-sm ">
                    <div onClick={handleGraddingView} className={`flexbox-tile-clean-notselect ${GraddingBackground}`}>Grading</div>
                    
                    <div onClick={handleBoillingView} className={`flexbox-tile-clean-notselect ${BoillingBackground}`} >Boilling</div>
                </div>
                <Separator className="my-4" />
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