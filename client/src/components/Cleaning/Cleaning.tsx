import GraddingMaintenance from "./GraddingCleaning/GraddingCleaning"
import DashboardHeader from "../dashboard/DashboardHeader"
import DashboardSidebar from "../dashboard/DashboardSidebar"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import BoillingMaintenance from "./boillingCleaning/BoillingCleaning"
import ScoopinSectionCuttingCleaning from "./ScoopingSectionCuttingCleaning/ScoopingSecCuttingCleaning"
import AbhayMcCleaning from "./AbhayMcCleaning/AbhayMcCleaning"



const Cleaning = () => {
    const [GraddingView, setGraddingView] = useState("none")
    const [GraddingBackground, setGraddingBackground] = useState("")
    const [CuttingBackground, setCuttingBackground] = useState("")
    const [CuttingView, setCuttingView] = useState("none")
    const [BoillingView, setBoillingView] = useState("none")
    const [BoillingBackground, setBoillingBackground] = useState("")
    const [AbhayMcView, setAbhayMcView] = useState("none")
    const [AbhayMcBackground, setAbhayMcBackground] = useState("")
    const handleGraddingView = () => {
        if (GraddingView === "block") {
            setGraddingView("none")
            setGraddingBackground("")
            setBoillingBackground("")
            setCuttingBackground("")
            setAbhayMcBackground("")
        }
        else {
            setGraddingView("block")
            setBoillingView("none")
            setCuttingView("none")
            setCuttingBackground("")
            setBoillingBackground("")
            setGraddingBackground("flexbox-tile-clean-select bg-blue-400")
            setAbhayMcBackground("")
            setAbhayMcView("none")
        }

    }
    const handleBoillingView = () => {
        if (BoillingView === "block") {
            setBoillingView("none")
            setBoillingBackground("")
            setGraddingBackground("")
            setCuttingBackground("")
            setAbhayMcBackground("")
        }
        else {
            setBoillingView("block")
            setGraddingView("none")
            setCuttingView("none")
            setCuttingBackground("")
            setGraddingBackground("")
            setBoillingBackground("flexbox-tile-clean-select bg-red-400")
            setAbhayMcBackground("")
            setAbhayMcView("none")
        }

    }
    const handleCuttingView = () => {
        if (CuttingView === "block") {
            setCuttingView("none")
            setCuttingBackground("")
            setGraddingBackground("")
            setBoillingBackground("")
            setAbhayMcBackground("")
        }
        else {
            setCuttingView("block")
            setGraddingView("none")
            setBoillingView("none")
            setAbhayMcView("none")
            setAbhayMcBackground("")
            setGraddingBackground("")
            setBoillingBackground("")
            setCuttingBackground("flexbox-tile-clean-select bg-green-400")
        }

    }
    const handleAbhayMcView = () => {
        if (AbhayMcView === "block") {
            setAbhayMcView("none")
            setAbhayMcBackground("")
            setGraddingBackground("")
            setBoillingBackground("")
            setCuttingBackground("")
        }
        else {
            setAbhayMcView("block")
            setGraddingView("none")
            setBoillingView("none")
            setGraddingBackground("")
            setBoillingBackground("")
            setAbhayMcBackground("flexbox-tile-clean-select bg-green-400")
            setCuttingBackground("")
            setCuttingView("none")
        }

    }
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container cursor-pointer'>

                <Separator className="my-4" />
                <div className="flex h-5 items-center space-x-2 text-sm ">
                    <div onClick={handleGraddingView} className={`flexbox-tile-clean-notselect ${GraddingBackground}`}>Rcn Grading</div>

                    <div onClick={handleBoillingView} className={`flexbox-tile-clean-notselect ${BoillingBackground}`} >Cooking</div>

                    <div onClick={handleCuttingView} className={`flexbox-tile-clean-notselect ${CuttingBackground}`} >Scooping Section Cutting M\c</div>

                    <div onClick={handleAbhayMcView} className={`flexbox-tile-clean-notselect ${AbhayMcBackground}`} >Abhay M\c and Other Parts</div>
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
                <div style={{ display: AbhayMcView }}>
                    <AbhayMcCleaning />
                </div>
            </div>
        </div>
    )
}
export default Cleaning