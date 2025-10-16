import Loader from "../common/Loader"
import DashboardHeader from "../dashboard/DashboardHeader"
import DashboardSidebar from "../dashboard/DashboardSidebar"
import UseQueryData from '../common/dataFetcher';
import QCRcnTable from "./QCRcnTable"
import { useContext } from "react";
import Context from "../context/context";
import { FY } from "../common/exportData";



const QCRcn = () => {
    const { data, error, isLoading } = UseQueryData('/api/qcRcn/getTotalQCCount', 'GET', 'getTotalQcCount')
    const { setpendingqcCount,setpendingreportCount } = useContext(Context);
    if (isLoading) {
        return <Loader/>
    }
    if (error) {
        return <div>Error</div>
    }
    if(data){
        setpendingqcCount(data.pendingQC)
        setpendingreportCount(data.pendingReport)
    }
   
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                <div className="flexbox-header">
                <div className="flexbox-tile bg-blue-500 hover:bg-blue-400">
                       Initial QC Approved<br /><p>{data.approvedQC}</p>
                    </div>
                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                        QC Report Uploaded<br /><p>{data.completereport}</p>
                    </div>
                <div className="flexbox-tile bg-purple-500 hover:bg-purple-400">
                        Pending Approval<br/><p>{data.pendingQC}</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
                        Pending QC Report<br /><p>{data.pendingReport}</p>
                    </div>
                    


                </div>

                <p className='text-lg text-center py-1 tracking-widest italic drop-shadow-xl'>CURRENT FY {FY} QC RCN TRANSACTION </p>
                <QCRcnTable/>
                </div>
            
            
        </div>
    )
}
export default QCRcn