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
import { PermissionRole, rcnpendingLotData, rcvCheckRoles, SumofAllTypeDataAlmond } from "@/type/type";

import { useContext, useState } from 'react';
import Context from '../context/context';
import axios from 'axios';
import Loader from '../common/Loader';
import { pendingCheckRole, rcvCheckRole } from '../common/exportData';
import { pendingCheckRoles } from "@/type/type";
import AlmondInitialForm from './AlmondInitial';
import AlmondTable from './AlmondTable';


const Almond = () => {
    const { setEditPendingAlmondData } = useContext(Context);
    const Role = localStorage.getItem('role') as keyof PermissionRole
    const [lotdata, setLotData] = useState<rcnpendingLotData[]>([])

    const handleEditFetch = async () => {
        const Data = await axios.get('/api/rcnprimary/geteditpending');
        console.log(Data)
        setEditPendingAlmondData(Data.data);
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
    
    const { data, isLoading, error } = UseQueryData('/api/almondPrimary/sumofAllAlmondEntry', 'GET', 'AllOriginAlmondPrimary');
    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <div>Error</div>;
    }
    const handleOpenLotNo = async () => {
        axios.get('/api/almondPrimary/getAlmondNotEntried/0').then(res => {
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
                <div className="flexbox-header">
                    {

                        data.AllOriginRcnPrimary && data.AllOriginRcnPrimary.map((item: SumofAllTypeDataAlmond) => {
                            return (
                                <div className="flexbox-tile bg-cyan-400 hover:bg-cyan-600" key={item.type}>
                                    {item.type} <br /><p>{item.totalBags} Bag</p>
                                </div>
                            )
                        })

                    }

                </div>



                <div>
                {checkreceiving('AlmondPrimaryEntry') && <Dialog>
                        <DialogTrigger>   <Button className="bg-lime-500 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left" onClick={handleOpenLotNo}>+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-2xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-1xl text-center mt-5'>Almond Receiving/Dispatch Pending List</p></DialogTitle>
                               
                            </DialogHeader>
                          
                            <AlmondInitialForm props={lotdata}/>
                        </DialogContent>
                    </Dialog>}

                    {checkpending('RCNPrimary') && <Button className="bg-orange-400 mb-2 ml-8 responsive-button-adjust" onClick={handleEditFetch} disabled={data.CountPendingEdit === 0 ? true : false}>
                        Pending Edit ({data.CountPendingEdit})</Button>}

                </div>
                <AlmondTable />

            </div>
        </div>


    )
}
export default Almond;