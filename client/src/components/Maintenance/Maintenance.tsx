import GraddingMaintenance from "./GraddingMaintenance/Graddingmaintenance"
import DashboardHeader from "../dashboard/DashboardHeader"
import DashboardSidebar from "../dashboard/DashboardSidebar"



const Maintenance = () => {
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <GraddingMaintenance />
        </div>
    )
}
export default Maintenance