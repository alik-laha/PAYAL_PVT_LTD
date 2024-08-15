
import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'



import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import GatePassCreateForm from './gatepasscreateform';

import GatePassTable from './gatePasstable';
import Loader from '../common/Loader';
import UseQueryData from '../common/dataFetcher';






const GatepassIn = () => {
   
    const { data, error, isLoading } = UseQueryData('/api/gatepass/activegatepasscount', 'GET', 'getTtotalActvGatePass')
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
                <div className="flexbox-tile bg-yellow-500 hover:bg-orange-400">
                        Total Issued <br /><p>{data.Issued} </p>
                    </div>
                    <div className="flexbox-tile bg-lime-500 hover:bg-orange-400">
                        Completed <br /><p>{data.completed} </p>
                    </div>
                    <div className="flexbox-tile bg-green-500 hover:bg-orange-400">
                       Pending Rcv/Disptch<br /><p>{data.PendingRcv}</p>
                    </div>
                    
                    <div className="flexbox-tile bg-red-500 hover:bg-orange-400">
                        Pending Approval<br /><p>{data.Pendingapprove} </p>
                    </div>
                    
                    <div className="flexbox-tile bg-purple-500 hover:bg-orange-400">
                       Pending Release<br /><p>{data.Pendingrelease} </p>
                    </div>
                   
                    
                   





                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}

                <div>
                    <Dialog>
                        <DialogTrigger> <Button className="bg-blue-500 mb-2 mt-5 ml-4 responsive-button-adjust">+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-2xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-1xl pb-1 text-center mt-2'>GatePass Entry Form</p></DialogTitle>

                            </DialogHeader>
                            <GatePassCreateForm/>
                        </DialogContent>
                    </Dialog>


                   

                </div>
                <GatePassTable />

            </div>
        </div>


    )
}
export default GatepassIn;