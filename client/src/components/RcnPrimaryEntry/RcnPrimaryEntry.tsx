
import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'
import DashboardPrimaryEntryMain from '../RcnPrimaryEntry/RcnPrimaryEntryMain'

const RcnPrimaryEntry = () => {
    return (
        <div>
        <DashboardHeader/>
        <DashboardSidebar/>
        <div className='dashboard-main-container'>
        < DashboardPrimaryEntryMain/>
        </div>
        </div>
        
    
    )
}
export default RcnPrimaryEntry;