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
import StorePrimaryTable from "./StorePrimaryTable"
import StoreInitial from "./StorePrimaryInitial";

const StorePrimary = () => {
    const { recevingPackagematerialOverView } = useContext(Context);
    console.log(recevingPackagematerialOverView)
    const [lotdata, setLotData] = useState<rcnpendingLotData[]>([])
    const Role = localStorage.getItem('role') as keyof PermissionRole
    const handleOpenLotNo = async () => {
        axios.get('/api/packageMaterial/getPMNotEntried/0').then(res => {
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
                <div className="flexbox-header">
                    <div className="flexbox-tile bg-green-500 hover:bg-green-600">
                        Vendor Count<br /><p>{recevingPackagematerialOverView?.vendorName}</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-600">
                        Item(SKU) Count<br /><p>{recevingPackagematerialOverView?.skuData}</p>
                    </div>
                    <div className="flexbox-tile bg-cyan-500 hover:bg-cyan-600">
                        Financial Year Entry <br /><p>{recevingPackagematerialOverView?.sumOfAllRecenvingPackageMaterial}</p>
                    </div>
                </div>
                {checkreceiving('StorePrimaryEntry') && <Dialog>
                <DialogTrigger>   <Button className="bg-lime-500 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left"
                onClick={handleOpenLotNo}>+ Add New Entry</Button></DialogTrigger>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle><p className='text-1xl pb-1 text-center mt-2'>Packaging Material Pending List</p></DialogTitle>
                       
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