import Loader from "../common/Loader"
import DashboardHeader from "../dashboard/DashboardHeader"
import DashboardSidebar from "../dashboard/DashboardSidebar"
import UseQueryData from '../common/dataFetcher';
import QCRcnTable from "./QCRcnTable"
import { useContext } from "react";
import Context from "../context/context";
import { FY } from "../common/exportData";



const QCOutgoing = () => {
    const { data, error, isLoading } = UseQueryData('/api/qcRcn/getTotalQCCount', 'GET', 'getTotalQcCount')
    const { setpendingqcOutCount,setpendingreportOutCount } = useContext(Context);
    if (isLoading) {
        return <Loader/>
    }
    if (error) {
        return <div>Error</div>
    }
    if(data){
        setpendingqcOutCount(data.pendingQCOut)
        setpendingreportOutCount(data.pendingReportOut)
    }
   
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                <div className="flexbox-header">
                <div className="flexbox-tile bg-blue-500 hover:bg-blue-400">
                       Initial QC Approved<br /><p>{data.approvedQCOut}</p>
                    </div>
                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                        QC Report Uploaded<br /><p>{data.completereportOut}</p>
                    </div>
                <div className="flexbox-tile bg-purple-500 hover:bg-purple-400">
                        Pending Approval<br/><p>{data.pendingQCOut}</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
                        Pending QC Report<br /><p>{data.pendingReportOut}</p>
                    </div>
                    


                </div>

                <p className='text-lg text-center py-1 '>CURRENT FY {FY} OUTGOING QC TRANSACTION </p>
                {/* <QCRcnTable/> */}
                </div>
            
            
        </div>
    )
}
export default QCOutgoing