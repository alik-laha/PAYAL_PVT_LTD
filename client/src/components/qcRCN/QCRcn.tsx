import Loader from "../common/Loader"
import DashboardHeader from "../dashboard/DashboardHeader"
import DashboardSidebar from "../dashboard/DashboardSidebar"
import UseQueryData from '../common/dataFetcher';
import QCRcnTable from "./QCRcnTable"



const QCRcn = () => {
    const { data, error, isLoading } = UseQueryData('/api/qcRcn/getTotalQCCount', 'GET', 'getTotalQcCount')
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
                <div className="flexbox-tile bg-blue-500 hover:bg-red-600">
                        Approved<br /><p>{data.approvedQC}</p>
                    </div>
                    <div className="flexbox-tile bg-orange-500 hover:bg-red-600">
                        Report Uploaded<br /><p>{data.completereport}</p>
                    </div>
                <div className="flexbox-tile bg-green-500 hover:bg-red-600">
                        Pending Approval<br/><p>{data.pendingQC}</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-red-600">
                        Pending Report<br /><p>{data.pendingReport}</p>
                    </div>
                    


                </div>


                <QCRcnTable/>
                </div>
            
            
        </div>
    )
}
export default QCRcn