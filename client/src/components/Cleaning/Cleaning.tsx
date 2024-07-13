import GraddingMaintenance from "./GraddingCleaning/GraddingCleaning"
import DashboardHeader from "../dashboard/DashboardHeader"
import DashboardSidebar from "../dashboard/DashboardSidebar"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import BoillingMaintenance from "./boillingCleaning/BoillingCleaning"
import ScoopinSectionCuttingCleaning from "./ScoopingSectionCuttingCleaning/ScoopingSecCuttingCleaning"
import { set } from "lodash"



const Cleaning = () => {
    const [GraddingView, setGraddingView] = useState("none")
    const [GraddingBackground, setGraddingBackground] = useState("")
    const [CuttingBackground, setCuttingBackground] = useState("")
    const [CuttingView, setCuttingView] = useState("none")
    const [BoillingView, setBoillingView] = useState("none")
    const [BoillingBackground, setBoillingBackground] = useState("")
    const handleGraddingView = () => {
        if (GraddingView === "block") {
            setGraddingView("none")
            setGraddingBackground("")
            setBoillingBackground("")
            setCuttingBackground("")
        }
        else {
            setGraddingView("block")
            setBoillingView("none")
            setCuttingView("none")
            setCuttingBackground("")
            setBoillingBackground("")
            setGraddingBackground("flexbox-tile-clean-select bg-blue-400")
        }

    }
    const handleBoillingView = () => {
        if (BoillingView === "block") {
            setBoillingView("none")
            setBoillingBackground("")
            setGraddingBackground("")
            setCuttingBackground("")

        }
        else {
            setBoillingView("block")
            setGraddingView("none")
            setCuttingView("none")
            setCuttingBackground("")
            setGraddingBackground("")
            setBoillingBackground("flexbox-tile-clean-select bg-red-400")
            console.log(BoillingView)
        }

    }
    const handleCuttingView = () => {
        if (CuttingView === "block") {
            setCuttingView("none")
            setCuttingBackground("")
            setGraddingBackground("")
            setBoillingBackground("")
        }
        else {
            setCuttingView("block")
            setGraddingView("none")
            setBoillingView("none")
            setGraddingBackground("")
            setBoillingBackground("")
            setCuttingBackground("flexbox-tile-clean-select bg-green-400")
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

                    <div onClick={handleCuttingView} className={`flexbox-tile-clean-notselect ${CuttingBackground}`} >Cutting</div>
                </div>
                <Separator className="my-4" />
                <div style={{ display: GraddingView }}>
                    <GraddingMaintenance />
                </div>
                <div style={{ display: BoillingView }}>
                    <BoillingMaintenance />
                </div>
                <div style={{ display: CuttingView }}>
                    <ScoopinSectionCuttingCleaning />
                </div>
            </div>
        </div>
    )
}
export default Cleaning