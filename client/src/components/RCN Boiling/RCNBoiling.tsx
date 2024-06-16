import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'
import RCNBoilingEntryForm  from "./RCNBoilingEntryForm";
import { Button } from "@/components/ui/button";
import RCNBoilingTable from "./RCNBoilingTable";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import UseQueryData from "../common/dataFetcher";
import { PermissionRole, SumofAllCuntryData } from "@/type/type";

import { useContext } from 'react';
import Context from '../context/context';
import axios from 'axios';
import Loader from '../common/Loader';
import { pendingCheckRole } from '../common/exportData';
import {pendingCheckRoles} from  "@/type/type";

const RCNBoiling = () => {
    const { setEditPendingData } = useContext(Context);
    const Role = localStorage.getItem('role') as keyof PermissionRole
    const handleEditFetch = async () => {
        const Data = await axios.get('/api/rcnprimary/geteditpending');
        console.log(Data)
        setEditPendingData(Data.data);
    };

    const checkpending = ( tab: string ) => { 
        //console.log(Role)
        if (pendingCheckRole[tab as keyof pendingCheckRoles].includes(Role)) {
            return true
        }
        else{
            return false;
        }
       
    }
    const { data, isLoading, error } = UseQueryData('/api/rcnprimary/sum', 'GET', 'AllOriginRcnPrimary');
    if (isLoading) {
        return <Loader/>
    }

    if (error) {
        return <div>Error</div>;
    }
    return (
        <div>
            <DashboardHeader />
            
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                <div className="flexbox-header">
                {/* <div className="flexbox-tile bg-red-500 hover:bg-orange-400">
                        A <br /><p>{data.data[0].totalA ? data.data[0].totalA : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                        B <br /><p>{data.data[0].totalB ? data.data[0].totalB : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-blue-500 hover:bg-orange-400">
                        C <br /><p>{data.data[0].totalC ? data.data[0].totalC : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-sky-500 hover:bg-orange-400">
                        D <br /><p>{data.data[0].totalD ? data.data[0].totalD : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-green-500 hover:bg-orange-400">
                        E <br /><p>{data.data[0].totalE ? data.data[0].totalE : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-orange-400">
                        F <br /><p>{data.data[0].totalF ? data.data[0].totalF : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-violet-500 hover:bg-orange-400">
                        G <br /><p>{data.data[0].totalG ? data.data[0].totalG : 0} Bag</p>
                    </div>
                     */}

                </div>

                
                
                <div>
                <Dialog>
                    <DialogTrigger>   <Button className="bg-lime-500 mb-2 mt-5 ml-4 responsive-button-adjust">+ Add New Entry</Button></DialogTrigger>
                    <DialogContent className='max-w-2xl'>
                        <DialogHeader>
                            <DialogTitle><p className='text-1xl pb-2 text-center mt-5'>RCN Boiling Entry Form</p></DialogTitle>
                            <DialogDescription>
                                <p className='text-1xl text-center'>To Be Filled Up By Boiling Supervisor</p>
                            </DialogDescription>
                        </DialogHeader>

                        <RCNBoilingEntryForm />
                    </DialogContent>
                </Dialog>

                {checkpending('RCNPrimary') && <Button className="bg-orange-400 mb-2 ml-8 responsive-button-adjust" onClick={handleEditFetch}> 
                Pending Edit ({data.CountPendingEdit})</Button>}
                  
                </div>
                <RCNBoilingTable />

            </div>
        </div>


    )
}
export default RCNBoiling;