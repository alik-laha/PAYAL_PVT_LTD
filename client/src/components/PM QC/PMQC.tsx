import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'




import PackagingMetrialtable from './packagingMetrialQualityTable';

const PackagingMetirialQuality = () => {
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                <div className="flexbox-header">
                    <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-300">
                        Active Employee<br /><p>count here</p>
                    </div>
                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}



                <div>

                </div>
                
               <PackagingMetrialtable />

            </div>
        </div>
    )
}

export default PackagingMetirialQuality