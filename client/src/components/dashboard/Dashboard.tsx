

import DashboardSidebar from './DashboardSidebar'
import DashboardHeader from './DashboardHeader'


export const Dashboard = () => {

    return (
        <div>
        <DashboardHeader/>
        <DashboardSidebar/>
        <div className='dashboard-main-container'>
            Main Content
        </div>
        </div>
        
    
    )
}
