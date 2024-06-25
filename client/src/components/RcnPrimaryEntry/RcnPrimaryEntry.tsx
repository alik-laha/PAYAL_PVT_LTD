import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'
import RcnPrimaryEntryForm from "./RcnPrimaryEntryForm";
import { Button } from "@/components/ui/button";
import RcnPrimaryEntryTable from "./RcnPrimaryEntryTable";
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

const RcnPrimaryEntry = () => {
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
               {/* <div className='dashboard-flex-head bg-gradient-to-r from-green-500 to-red-600 text-white'> Origin Wise RCN Received In Current Financial Year</div> */}
                <div className="flexbox-header">
                    {
                        
                        data.AllOriginRcnPrimary &&  data.AllOriginRcnPrimary.map((item: SumofAllCuntryData) => {
                                return (
                                    <div className="flexbox-tile bg-cyan-400 hover:bg-cyan-600" key={item.origin}>
                                        {item.origin} <br /><p>{item.totalBags} Bag</p>
                                    </div>
                                )
                            })
                        
                    }

                </div>

                
                
                <div>
                <Dialog>
                    <DialogTrigger>   <Button className="bg-lime-500 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left">+ Add New Entry</Button></DialogTrigger>
                    <DialogContent className='max-w-2xl'>
                        <DialogHeader>
                            <DialogTitle><p className='text-1xl text-center mt-5'>RCN Primary Entry Form</p></DialogTitle>
                            <DialogDescription>
                                <p className='text-1xl text-center'>To Be Filled Up By Receiving Supervisor</p>
                            </DialogDescription>
                        </DialogHeader>

                        <RcnPrimaryEntryForm />
                    </DialogContent>
                </Dialog>

                {checkpending('RCNPrimary') && <Button className="bg-orange-400 mb-2 ml-8 responsive-button-adjust" onClick={handleEditFetch} disabled={data.CountPendingEdit===0 ? true : false}> 
                Pending Edit ({data.CountPendingEdit})</Button>}
                  
                </div>
                <RcnPrimaryEntryTable />

            </div>
        </div>


    )
}
export default RcnPrimaryEntry;