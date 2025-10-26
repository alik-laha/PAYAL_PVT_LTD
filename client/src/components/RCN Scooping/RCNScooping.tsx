
import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'


import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import RCNScoopingTable from './RCNScoopingTable';
import RCNScoopingCreateForm from './RCNScoopingCreateForm';
import Context from '../context/context';
import { useContext, useState } from 'react';

import axios from 'axios'
import UseQueryData from '../common/dataFetcher';
import Loader from '../common/Loader';
import { pendingCheckRoles, PermissionRole, scoopingpendingLotData } from '@/type/type';
import { FY, pendingCheckRole } from '../common/exportData';
import { MdPendingActions } from 'react-icons/md';
import DashboardFooter from '../dashboard/DashboardFooter';


const RCNScooping = () => {

    const { setEditScoopingLotWiseData, searchType } = useContext(Context)
    const [lotdata, setLotData] = useState<scoopingpendingLotData[]>([])



    const { data, isLoading, error } = UseQueryData('/api/scooping/sumofallscoop', 'GET', 'AllScoopingSum');
    const handleEditFetch = async () => {

        axios.get("/api/scooping/findEditScoopingAll").then(res => {
            console.log(res)
            setEditScoopingLotWiseData(res.data.scoopingAllEdit)
        })
            .catch(err => {
                console.log(err)
            })

    }
    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <div>Error</div>;
    }
    console.log(data)

    const handleOpenLotNo = async () => {

       
        axios.get('/api/scooping/getUnscoopedEntry/0').then(res => {
            console.log(res)
            setLotData(res.data.scoopingLot)
        })




    }
    const Role = localStorage.getItem('role') as keyof PermissionRole
    const checkpending = (tab: string) => {
        //console.log(Role)
        if (pendingCheckRole[tab as keyof pendingCheckRoles].includes(Role)) {
            return true
        }
        else {
            return false;
        }

    }

    function formatNumber(num: any) {
        return Number.isInteger(num) ? parseInt(num) : num.toFixed(2);
    }
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container mx-2'>
                <div className="flexbox-header">
                    <div className="flexbox-tile bg-red-500 hover:bg-red-400">
                        <p>A</p><br /><p> {data.data[0].WholesA && data.data[0].BrokenA ? formatNumber(Number(data.data[0].WholesA) + Number(data.data[0].BrokenA)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-slate-400 hover:bg-slate-500">
                    <p>B</p><br /><p>{data.data[0].WholesB && data.data[0].BrokenB ? formatNumber(Number(data.data[0].WholesB) + Number(data.data[0].BrokenB)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-purple-500 hover:bg-purple-400">
                   <p>C</p><br /><p>{data.data[0].WholesC && data.data[0].BrokenC ? formatNumber(Number(data.data[0].WholesC) + Number(data.data[0].BrokenC)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-sky-500 hover:bg-sky-400">
                   <p>D</p><br /> <p>{data.data[0].WholesD && data.data[0].BrokenD ? formatNumber(Number(data.data[0].WholesD) + Number(data.data[0].BrokenD)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-green-500 hover:bg-green-400">
                    <p>E</p><br /><p>{data.data[0].WholesE && data.data[0].BrokenE ? formatNumber(Number(data.data[0].WholesE) + Number(data.data[0].BrokenE)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
                   <p>F</p><br /><p>{data.data[0].WholesF && data.data[0].BrokenF ? formatNumber(Number(data.data[0].WholesF) + Number(data.data[0].BrokenF)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-violet-500 hover:bg-violet-400">
                   <p>G</p> <br /><p>{data.data[0].WholesG && data.data[0].BrokenG ? formatNumber(Number(data.data[0].WholesG) + Number(data.data[0].BrokenG)) : 0} Kg</p>
                    </div>





                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}
                <p className='md:text-lg md:mt-0 mt-2 text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold text-md'>CURRENT FY : {FY} WHOLES AND BROKEN REPORT (SCOOPING)</p>
                <div>
                    <Dialog>
                        <DialogTrigger> <Button className="w-40 bg-gradient-to-r from-blue-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md" onClick={handleOpenLotNo}>+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-3xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>RCN Scooping Entry Form</p></DialogTitle>

                            </DialogHeader>

                            <RCNScoopingCreateForm props={lotdata} />
                        </DialogContent>
                    </Dialog>


                    


                     {checkpending('Scooping') && (data?.EditData ?? 0) > 0 && searchType === "LotWise" &&<Drawer>
            <DrawerTrigger asChild >
                        <div className="relative inline-block ml-4 top-1 responsive-button-adjust">
                            <Button
                                className="w-40 bg-gradient-to-r from-orange-400 to-red-200 hover:from-red-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md "
                                /* FIX 1: Use ?? 0 for the disabled prop */
                                disabled={(data?.EditData ?? 0) === 0}
                                onClick={handleEditFetch}
                            >
                                <div className="flex items-center gap-2">
                                    <MdPendingActions size={18} />
                                    Pending Actions
                                </div>
                            </Button>

                            {/* FIX 2: Use ?? 0 for the badge display condition and value */}
                            {(data?.EditData ?? 0) > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center transform scale-90 origin-center animate-pulse shadow-lg ring-2 ring-white dark:ring-gray-800">
                                    {data?.EditData ?? 0}
                                </span>
                            )}
                        </div>
                        </DrawerTrigger>
                          <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Pending Actions</DrawerTitle>
                <DrawerDescription>Approve Or Reject Modify Request</DrawerDescription>
              </DrawerHeader>
              <div className='mx-5'>   <RCNScoopingTable props='edit' /></div>
              <DrawerFooter>

                <DrawerClose asChild>
                  <Button className="w-28 md:w-40 bg-gradient-to-r from-red-600 to-rose-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md"
                   >Close</Button>
                </DrawerClose>
              </DrawerFooter>

            </DrawerContent>
             </Drawer>}

                </div>
                <RCNScoopingTable props='non-edit'/>

            </div>
            <DashboardFooter/>
        </div>


    )
}
export default RCNScooping;