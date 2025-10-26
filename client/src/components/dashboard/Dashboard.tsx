

import DashboardSidebar from './DashboardSidebar'
//import DashboardSidebarNew from './DashboardSidebarNew'
import DashboardHeader from './DashboardHeader'
import WelcomeImage from './WelcomeImage'
import DashboardFooter from './DashboardFooter'


export const Dashboard = () => {

    return (
        <div>
        <DashboardHeader/>
        {/* <DashboardSidebarNew/> */}
        <DashboardSidebar/>
        <div className='dashboard-main-container'>
            <WelcomeImage/>
        </div>
        <DashboardFooter/>
        </div>
        
    
    )
}
