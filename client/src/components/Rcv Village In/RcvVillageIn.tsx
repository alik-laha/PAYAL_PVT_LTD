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
import RcvVillageInInitial from "./RcvVillageInInitial";
import RcvVillageInTable from "./RcvVillageInTable";
import VLOTInitial from "./VlotInitial";
import DashboardFooter from "../dashboard/DashboardFooter";



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
                <div className="flexbox-header mx-2">
                   
                    <div className="flexbox-tile bg-sky-500 hover:bg-sky-400">
                       <p>FY: {FY}</p>  <br /><p>{RcvVillageInPrimaryOverView?.sumofRcvVillageInPrimary}</p>
                    </div>
                </div>

                 <p className='md:text-lg md:mt-0 mt-2 text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold text-md'>CURRENT FY : {FY} VILLAGE IN TRANSACTION</p>
               


        

             {checkreceiving('VillagePrimaryEntry') && <Dialog>
                <DialogTrigger>   <Button className="md:w-40 w-28 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md"
                onClick={handleOpenLotNo}>+ Add Entry</Button></DialogTrigger>
                <DialogContent className='max-w-3xl'>
                    <DialogHeader>
                        <DialogTitle><p className='text-lg text-gray-600 text-center pt-2 tracking-wider drop-shadow-xl font-bold'>Village In Pending List</p></DialogTitle>
                       
                    </DialogHeader>


                    <RcvVillageInInitial props={lotdata}/>
                </DialogContent>
            </Dialog>}

             {checkreceiving('RCNPrimaryEntry') && <Dialog>
            <DialogTrigger>   <Button className="w-28 md:w-40 bg-gradient-to-r from-purple-500 to-gray-500 hover:from-purple-600 hover:to-gray-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left drop-shadow-md"
              onClick={handleOpenVLotNo}>+ V-LOT</Button></DialogTrigger>
            <DialogContent className='max-w-3xl'>
              <DialogHeader>
                <DialogTitle><p className='text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold'>Day-Wise Pending List</p></DialogTitle>

              </DialogHeader>

              <VLOTInitial props={vlotdata} />
            </DialogContent>
          </Dialog>}


         


          <RcvVillageInTable/>
            </div>
             <DashboardFooter/>
        </div>
    )
}
export default RcvVillageIn