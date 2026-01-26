
import UseQueryData from '../common/dataFetcher';
import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'




import PackagingMetrialtable from './packagingMetrialQualityTable';
import Loader from '../common/Loader';
import DashboardFooter from '../dashboard/DashboardFooter';


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
            <div className="flexbox-header mx-2">
                <div className="flexbox-tile bg-blue-500 hover:bg-blue-400">
                    <p>Approved QC</p><br /><p>{data.approvedQC}</p>
                    </div>
                    
                <div className="flexbox-tile bg-purple-500 hover:bg-purple-600">
                        <p>Pending QC</p><br/><p>{data.pendingQC}</p>
                    </div>
                    
                    


                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}

                <p className='text-lg text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold uppercase'>QC Packaging Material TRANSACTION</p>

                <div>

                </div>
                
               <PackagingMetrialtable />
               

            </div>
            <DashboardFooter/>
        </div>
    )
}

export default PackagingMetirialQuality