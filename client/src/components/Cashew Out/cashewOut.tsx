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
import UseQueryData from "../common/dataFetcher";
import { PermissionRole, rcnpendingLotData, rcvCheckRoles, SumofAllTypeDataCashewOut } from "@/type/type";

import { useContext, useState } from 'react';
import Context from '../context/context';
import axios from 'axios';
import Loader from '../common/Loader';
import { FY, pendingCheckRole, rcvCheckRole } from '../common/exportData';
import { pendingCheckRoles } from "@/type/type";
import CashewOutInitialForm from './cashewOutInitial';
import CashewOutTable from './cashewOutTable';



const CashewOut = () => {
    const { setEditPendingCashewOutData } = useContext(Context);
    const Role = localStorage.getItem('role') as keyof PermissionRole
    const [lotdata, setLotData] = useState<rcnpendingLotData[]>([])

    const handleEditFetch = async () => {
        const Data = await axios.get('/api/cashewOut/getCashewOuteditpending');
        console.log(Data)
        setEditPendingCashewOutData(Data.data);
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
    
    const { data, isLoading, error } = UseQueryData('/api/cashewOut/sumofAllCashewOutEntry', 'GET', 'AllOriginCashewOutPrimary');
    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <div>Error</div>;
    }
    const handleOpenLotNo = async () => {
        axios.get('/api/cashewOut/getCashewOutNotEntried/0').then(res => {
            console.log(res)
            setLotData(res.data.rcnLot)
        })

    }
    function formatNumber(num: string) {
        return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
    }
    return (
        <div>
            <DashboardHeader />

            <DashboardSidebar />
            <div className='dashboard-main-container'>
                {/* <div className='dashboard-flex-head bg-gradient-to-r from-green-500 to-red-600 text-white'> Origin Wise RCN Received In Current Financial Year</div> */}
                <div className="flexbox-header">
                    {

                        data.AllOriginRcnPrimary && data.AllOriginRcnPrimary.map((item: SumofAllTypeDataCashewOut) => {
                            return (
                                <div className="flexbox-tile bg-sky-500 hover:bg-sky-400" key={item.origin}>
                                    {item.origin} <br /><p>{item.quantity ? formatNumber(String(item.quantity)):0} Kg</p>
                                </div>
                            )
                        })

                    }

                </div>

                <p className='text-lg text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold '>CURRENT FY {FY} FINISHED CASHEW OUT TRANSACTION</p>

                <div>
                {checkreceiving('RCNPrimaryEntry') && <Dialog>
                        <DialogTrigger>   <Button className="bg-lime-500 mb-2 mt-5 ml-6 responsive-button-adjust no-margin-left drop-shadow-md" onClick={handleOpenLotNo}>+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-3xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>Cashew Out Pending List</p></DialogTitle>
                               
                            </DialogHeader>
                          
                            <CashewOutInitialForm props={lotdata}/>
                        </DialogContent>
                    </Dialog>}

                    {checkpending('RCNPrimary') && <Button className="bg-orange-400 mb-2 ml-8 responsive-button-adjust drop-shadow-md" onClick={handleEditFetch} disabled={data.CountPendingEdit === 0 ? true : false}>
                        Pending Edit ({data.CountPendingEdit})</Button>}

                </div>
                <CashewOutTable />

            </div>
        </div>


    )
}
export default CashewOut;