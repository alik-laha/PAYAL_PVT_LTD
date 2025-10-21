import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'

import { Button } from "@/components/ui/button";
import RcnPrimaryEntryTable from "./RcnPrimaryEntryTable";
import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import UseQueryData from "../common/dataFetcher";
import { PermissionRole, rcnpendingLotData, rcvCheckRoles, SumofAllCuntryData } from "@/type/type";

import { useContext, useState } from 'react';
import Context from '../context/context';
import axios from 'axios';
import Loader from '../common/Loader';
import { FY, pendingCheckRole, rcvCheckRole } from '../common/exportData';
import { pendingCheckRoles } from "@/type/type";
import RCNInitialForm from './RcnInitialForm';
import { MdPendingActions } from 'react-icons/md';

const RcnPrimaryEntry = () => {
    const { setEditPendingData } = useContext(Context);
    const Role = localStorage.getItem('role') as keyof PermissionRole
    const [lotdata, setLotData] = useState<rcnpendingLotData[]>([])

    const handleEditFetch = async () => {
        const Data = await axios.get('/api/rcnprimary/geteditpending');
        console.log(Data)
        setEditPendingData(Data.data);
    };

    const checkpending = (tab: string) => {
        //console.log(Role)
        if (pendingCheckRole[tab as keyof pendingCheckRoles].includes(Role)) {
            return true
        }
        else {
            return false;
        }

    }
    const checkreceiving = (tab: string) => {
        //console.log(Role)
        if (rcvCheckRole[tab as keyof rcvCheckRoles].includes(Role)) {
            return true
        }
        else {
            return false;
        }

    }
    
    const { data, isLoading, error } = UseQueryData('/api/rcnprimary/sum', 'GET', 'AllOriginRcnPrimary');
    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <div>Error</div>;
    }
    const handleOpenLotNo = async () => {
        axios.get('/api/rcnprimary/getRcnNotEntried/0').then(res => {
            console.log(res)
            setLotData(res.data.rcnLot)
        })

    }


    return (
        <div>
            <DashboardHeader />

            <DashboardSidebar />
            <div className='dashboard-main-container'>
                {/* <div className='dashboard-flex-head bg-gradient-to-r from-green-500 to-red-600 text-white'> Origin Wise RCN Received In Current Financial Year</div> */}
                <div className="flexbox-header mx-2">
                    {

                        data.AllOriginRcnPrimary && data.AllOriginRcnPrimary.map((item: SumofAllCuntryData) => {
                            return (
                                <div className="flexbox-tile bg-sky-500 hover:bg-sky-400" key={item.origin}>
                                  <p> {item.origin} </p> <br /><p>{item.totalBags} Bag</p>
                                </div>
                            )
                        })

                    }

                </div>




            

                  <p className='md:text-lg md:mt-0 mt-2 text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold text-md '>CURRENT FY : {FY} RCN INCOMING TRANSACTION</p>

                <div>

                          {checkreceiving('RCNPrimaryEntry') && <Dialog>
                <DialogTrigger>   <Button className="w-40 bg-gradient-to-r from-blue-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md"
                onClick={handleOpenLotNo}>+ Add Entry</Button></DialogTrigger>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle><p className='text-lg text-gray-600 text-center pt-2 tracking-wider drop-shadow-xl font-bold'>Pending List</p></DialogTitle>
                       
                    </DialogHeader>
                          
                            <RCNInitialForm props={lotdata}/>
                        </DialogContent>
                    </Dialog>}

                    {/* {checkpending('RCNPrimary') && <Button className="bg-orange-400 mb-2 ml-8 responsive-button-adjust drop-shadow-md" onClick={handleEditFetch} disabled={data.CountPendingEdit === 0 ? true : false}>
                        Pending Edit ({data.CountPendingEdit})</Button>} */}




                     {checkpending('RCNPrimary') && ((data?.CountPendingEdit ?? 0) !== 0)
                        &&(<Drawer>
            <DrawerTrigger asChild >

            
                                    <div className="relative inline-block ml-4 top-1 responsive-button-adjust">
                                        <Button
                                            className="w-40 bg-gradient-to-r from-orange-400 to-red-200 hover:from-red-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md "
                                            /* FIX 1: Use ?? 0 for the disabled prop */
                                            disabled={(data?.CountPendingEdit ?? 0) === 0}
                                            onClick={handleEditFetch}
                                        >
                                            <div className="flex items-center gap-2">
                                                <MdPendingActions size={18} />
                                                Pending Actions
                                            </div>
                                        </Button>
                    
                                        {/* FIX 2: Use ?? 0 for the badge display condition and value */}
                                        {(data?.CountPendingEdit ?? 0) > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center transform scale-90 origin-center animate-pulse shadow-lg ring-2 ring-white dark:ring-gray-800">
                                                {data?.CountPendingEdit ?? 0}
                                            </span>
                                        )}
                                    </div>
                                     </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Pending Actions</DrawerTitle>
                <DrawerDescription>Approve Or Reject Modify Request</DrawerDescription>
              </DrawerHeader>
              <div className='mx-5'>   <RcnPrimaryEntryTable props='edit' /></div>
              <DrawerFooter>

                <DrawerClose asChild>
                  <Button className="w-28 md:w-40 bg-gradient-to-r from-red-600 to-rose-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md"
                   >Close</Button>
                </DrawerClose>
              </DrawerFooter>

            </DrawerContent>

          </Drawer>
                                )}

                </div>
                <RcnPrimaryEntryTable props='non-edit'/>

            </div>
        </div>


    )
}
export default RcnPrimaryEntry;