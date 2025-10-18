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
import { FY, rcvCheckRole } from "../common/exportData"
import StorePrimaryTable from "./StorePrimaryTable"
import StoreInitial from "./StorePrimaryInitial";

const StorePrimary = () => {
    const { StorePrimaryOverView } = useContext(Context);
    console.log(StorePrimaryOverView)
    const [lotdata, setLotData] = useState<rcnpendingLotData[]>([])
    const Role = localStorage.getItem('role') as keyof PermissionRole
    const handleOpenLotNo = async () => {
        axios.get('/api/storePrimary/getStoreNotEntried/0').then(res => {
            console.log(res)
            setLotData(res.data.rcnLot)
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
                <div className="flexbox-header ">
                   
                    <div className="flexbox-tile bg-purple-500 hover:bg-purple-400">
                        FY : {FY} <br /><p>{StorePrimaryOverView?.sumofStorePrimary}</p>
                    </div>
                </div>
                <p className='md:text-lg md:mt-0 mt-2 text-gray-600 text-center pt-1 tracking-wider italic drop-shadow-xl font-bold text-md '>OUTSIDE STORE TRANSACTION </p>
                {checkreceiving('StorePrimaryEntry') && <Dialog>
                <DialogTrigger>   <Button className="w-40 bg-gradient-to-r from-blue-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-6 responsive-button-adjust no-margin-left drop-shadow-md"
                onClick={handleOpenLotNo}>+ Add Entry</Button></DialogTrigger>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle><p className='text-lg text-gray-600 text-center pt-2 tracking-wider drop-shadow-xl font-bold'>Store Entry Pending List</p></DialogTitle>
                       
                    </DialogHeader>

                    <StoreInitial props={lotdata}/>
                </DialogContent>
            </Dialog>}
          <StorePrimaryTable/>
            </div>
            
        </div>
    )
}
export default StorePrimary