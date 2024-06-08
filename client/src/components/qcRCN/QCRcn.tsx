import DashboardHeader from "../dashboard/DashboardHeader"
import DashboardSidebar from "../dashboard/DashboardSidebar"
import QCRcnTable from "./QCRcnTable"
const QCRcn = () => {

    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                <div className="flexbox-header">
                <div className="flexbox-tile bg-blue-500 hover:bg-red-600">
                        Approved<br /><p>50</p>
                    </div>
                    <div className="flexbox-tile bg-orange-500 hover:bg-red-600">
                        Report Uploaded<br /><p>300</p>
                    </div>
                <div className="flexbox-tile bg-green-500 hover:bg-red-600">
                        Pending Approval<br /><p>100</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-red-600">
                        Pending Report<br /><p>200</p>
                    </div>
                    


                </div>


                <QCRcnTable/>
                </div>
            
            
        </div>
    )
}
export default QCRcn