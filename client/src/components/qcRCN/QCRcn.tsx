import Loader from "../common/Loader"
import DashboardHeader from "../dashboard/DashboardHeader"
import DashboardSidebar from "../dashboard/DashboardSidebar"
import UseQueryData from '../common/dataFetcher';
import QCRcnTable from "./QCRcnTable"
import { useContext,useEffect } from "react";
import Context from "../context/context";
import { FY } from "../common/exportData";
import DashboardFooter from "../dashboard/DashboardFooter";



const QCRcn = () => {
    const { data, error, isLoading } = UseQueryData('/api/qcRcn/getTotalQCCount', 'GET', 'getTotalQcCount')
    const { setpendingqcCount,setpendingreportCount } = useContext(Context);

      useEffect(() => {
        if (data) {
            setpendingqcCount(data.pendingQC);
            setpendingreportCount(data.pendingReport);
        }
    }, [data]);


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
                       <p>Initial QC Approved</p><br /><p>{data.approvedQC}</p>
                    </div>
                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                        <p>QC Report Uploaded</p><br /><p>{data.completereport}</p>
                    </div>
                <div className="flexbox-tile bg-purple-500 hover:bg-purple-400">
                        <p>Pending Approval</p><br/><p>{data.pendingQC}</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
                        <p>Pending QC Report</p><br /><p>{data.pendingReport}</p>
                    </div>
                    


                </div>

                <p className='text-lg text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold'>CURRENT FY {FY} QC RCN TRANSACTION </p>
                <QCRcnTable/>
                </div>

                <DashboardFooter/>
            
            
        </div>
    )
}
export default QCRcn