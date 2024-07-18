import DashboardHeader from "../dashboard/DashboardHeader"
import DashboardSidebar from "../dashboard/DashboardSidebar"

const PackagingMetirialReceiving = () => {
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                <div className="flexbox-header">
                    <div className="flexbox-tile bg-green-500 hover:bg-green-600">
                        Active Asset<br /><p>new</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-600">
                        Inactive Asset<br /><p>n2</p>
                    </div>
                    <div className="flexbox-tile bg-cyan-500 hover:bg-cyan-600">
                        Discarded <br /><p>n3</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PackagingMetirialReceiving