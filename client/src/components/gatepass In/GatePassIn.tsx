
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
import { FY } from '../common/exportData';
import DashboardFooter from '../dashboard/DashboardFooter';






const GatepassIn = () => {

    const { data, error, isLoading } = UseQueryData('/api/gatepass/activegatepasscount', 'GET', 'getTtotalActvGatePass')
    if (isLoading) {
        return <Loader />
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
                    <div className="flexbox-tile bg-purple-400 hover:bg-purple-300">
                        <p>Total Issued</p> <br /><p>{data.Issued} </p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
                      <p>Completed</p>  <br /><p>{data.completed} </p>
                    </div>
                    <div className="flexbox-tile bg-green-500 hover:bg-green-400">
                       <p>Pending Rcv/Dispatch</p> <br /><p>{data.PendingRcv}</p>
                    </div>
                    <div className="flexbox-tile bg-cyan-500 hover:bg-cyan-400">
                        <p>Pending NetWeight</p><br /><p>{data.PendingNtWt} </p>
                    </div>
                    <div className="flexbox-tile bg-red-500 hover:bg-red-400">
                        <p>Pending Approval</p><br /><p>{data.Pendingapprove} </p>
                    </div>

                    <div className="flexbox-tile bg-slate-400 hover:bg-slate-300">
                        <p>Pending Release</p><br /><p>{data.Pendingrelease} </p>
                    </div>








                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}
                <p className='md:text-lg md:mt-0 mt-2 text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold text-md '>CURRENT F.Y. {FY} GATE PASS COUNT</p>
                <div>
                    <Dialog>
                        <DialogTrigger> <Button
                            className="flex w-40 items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 px-5 py-2.5 text-sm mt-5 ml-2 mb-2 responsive-button-adjust"
                        >
                            <span className="text-lg font-bold">+</span> Add New Entry
                        </Button></DialogTrigger>
                        <DialogContent className='max-w-3xl max-h-screen overflow-auto'>
                            <DialogHeader>
                                <DialogTitle><p className='text-md text-gray-600 text-center py-4 tracking-wider drop-shadow-xl uppercase font-bold'>GatePass Entry Form</p></DialogTitle>

                            </DialogHeader>
                            <GatePassCreateForm />
                        </DialogContent>
                    </Dialog>




                </div>
                <GatePassTable />

            </div>
            <DashboardFooter/>
        </div>


    )
}
export default GatepassIn;