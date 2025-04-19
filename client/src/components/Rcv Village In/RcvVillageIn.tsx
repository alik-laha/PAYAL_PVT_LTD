import DashboardHeader from "../dashboard/DashboardHeader"
import DashboardSidebar from "../dashboard/DashboardSidebar"
import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"


import { useContext, useState } from 'react';
import Context from '../context/context';

import axios from "axios"
import { PermissionRole, rcnpendingLotData, rcvCheckRoles } from "@/type/type"
import { rcvCheckRole } from "../common/exportData"
import RcvVillageInInitial from "./RcvVillageInInitial";
import RcvVillageInTable from "./RcvVillageInTable";
import VLOTInitial from "./VlotInitial";



const RcvVillageIn = () => {
    const { RcvVillageInPrimaryOverView } = useContext(Context);
    console.log(RcvVillageInPrimaryOverView)
    const [lotdata, setLotData] = useState<rcnpendingLotData[]>([])
    const [vlotdata, setVLotData] = useState<any[]>([])
    const Role = localStorage.getItem('role') as keyof PermissionRole
    const handleOpenLotNo = async () => {
        axios.get('/api/rcvVillageIn/getRcvVillageInNotEntried/0').then(res => {
            console.log(res)
            setLotData(res.data.rcnLot)
        })

    }

    const handleOpenVLotNo = async () => {
        axios.get('/api/rcvVillageIn/getRcvVillageInVLOT').then(res => {
            console.log(res)
            setVLotData(res.data.vlotsum)
        })

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
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                <div className="flexbox-header">
                   
                    <div className="flexbox-tile bg-cyan-500 hover:bg-cyan-600">
                        Financial Year Entry <br /><p>{RcvVillageInPrimaryOverView?.sumofRcvVillageInPrimary}</p>
                    </div>
                </div>

                <p className='text-lg font-semibold text-center py-1 '> Village In Primary</p>
                {checkreceiving('VillagePrimaryEntry') && <Dialog>
                <DialogTrigger>   <Button className="bg-red-500 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left"
                onClick={handleOpenLotNo}>+ Add New Entry</Button></DialogTrigger>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle><p className='text-1xl pb-1 text-center mt-2'>Village In Entry Pending List</p></DialogTitle>
                       
                    </DialogHeader>

                    <RcvVillageInInitial props={lotdata}/>
                </DialogContent>
            </Dialog>}


            {checkreceiving('VillagePrimaryEntry') && <Dialog>
                <DialogTrigger>   <Button className="bg-lime-500 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left"
                onClick={handleOpenVLotNo}>+ Create V-LOT</Button></DialogTrigger>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle><p className='text-1xl pb-1 text-center mt-2'>Day-Wise Pending List</p></DialogTitle>
                       
                    </DialogHeader>

                    <VLOTInitial props={vlotdata}/>
                </DialogContent>
            </Dialog>}


          <RcvVillageInTable/>
            </div>
            
        </div>
    )
}
export default RcvVillageIn