
import UseQueryData from '../common/dataFetcher';
import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'




import PackagingMetrialtable from './packagingMetrialQualityTable';
import Loader from '../common/Loader';


const PackagingMetirialQuality = () => {

    const { data, error, isLoading } = UseQueryData('/api/qcpackage/getTotalQCCountPM', 'GET', 'getTotalQcCount')
    
    if (isLoading) {
        return <Loader/>
    }
    if (error) {
        return <div>Error</div>
    }
    
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container'>
            <div className="flexbox-header">
                <div className="flexbox-tile bg-blue-500 hover:bg-blue-400">
                    Approved QC<br /><p>{data.approvedQC}</p>
                    </div>
                    
                <div className="flexbox-tile bg-purple-500 hover:bg-purple-600">
                        Pending QC<br/><p>{data.pendingQC}</p>
                    </div>
                    
                    


                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}

                <p className='text-lg font-cursive text-center py-1 '>QC Packaging Material TRANSACTION</p>

                <div>

                </div>
                
               <PackagingMetrialtable />

            </div>
        </div>
    )
}

export default PackagingMetirialQuality