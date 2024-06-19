

import DashboardSidebar from './DashboardSidebar'
import DashboardHeader from './DashboardHeader'
import WelcomeImage from './WelcomeImage'


export const Dashboard = () => {

    return (
        <div>
        <DashboardHeader/>
        <DashboardSidebar/>
        <div className='dashboard-main-container'>
            <WelcomeImage/>
        </div>
        </div>
        
    
    )
}
