
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

import Context from '../context/context';
import { useContext, useState } from 'react';

import axios from 'axios'
import UseQueryData from '../common/dataFetcher';
import Loader from '../common/Loader';
import { HumidpendingLotData, pendingCheckRoles, PermissionRole } from '@/type/type';
import RCNHumidCreateForm from './HumidifierCreateForm';
import { FY, pendingCheckRole } from '../common/exportData';
import HumidTable from './HumidifierTable';
import { MdPendingActions } from 'react-icons/md';
import DashboardFooter from '../dashboard/DashboardFooter';

// import BormaTable from './RCNBormaTable';


const Humidifier = () => {

    const { setEditHumidLotWiseData } = useContext(Context)
    const [lotdata, setLotData] = useState<HumidpendingLotData[]>([])



    const { data, isLoading, error } = UseQueryData('/api/humid/sumofallhumid', 'GET', 'AllHumidSum');
    const handleEditFetch = async () => {

        axios.get("/api/humid/findEditHumidAll").then(res => {
            console.log(res)
            setEditHumidLotWiseData(res.data.scoopingAllEdit)
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
        axios.get('/api/humid/getUnHumidEntry/0').then(res => {
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
            <div className='dashboard-main-container'>
                <div className="flexbox-header mx-2">
                    <div className="flexbox-tile bg-red-500 hover:bg-red-400">
                    <p>India</p><br/> <p>{data.data[0].India ? formatNumber(Number(data.data[0].India))  : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-slate-500 hover:bg-slate-400">
                    <p>Ghana</p> <br/><p>{data.data[0].Ghana? formatNumber(Number(data.data[0].Ghana)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-purple-500 hover:bg-purple-400">
                    <p>Togo</p> <br/><p>{data.data[0].Togo? formatNumber(Number(data.data[0].Togo)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-sky-500 hover:bg-sky-400">
                    <p>Tanzania</p> <br/><p>{data.data[0].Tanzania ? formatNumber(Number(data.data[0].Tanzania)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-green-500 hover:bg-green-400">
                    <p>Nigeria</p> <br/><p>{data.data[0].Nigeria  ? formatNumber(Number(data.data[0].Nigeria)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
                    <p>Benin</p> <br/><p>{data.data[0].Benin  ?  formatNumber(Number(data.data[0].Benin)): 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-violet-500 hover:bg-violet-400">
                    <p>IVC</p> <br/><p>{data.data[0].IVC ?  formatNumber(Number(data.data[0].IVC)) : 0} Kg</p>
                    </div>





                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}
                <p className='md:text-lg md:mt-0 mt-2 text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold text-md'>CURRENT F.Y. {FY} REPORT (HUMIDIFIER)</p>
                <div>
                    <Dialog>
                        <DialogTrigger> <Button className="w-40 bg-gradient-to-r from-blue-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md" onClick={handleOpenLotNo}>+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-3xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-lg text-gray-600 text-center tracking-wider drop-shadow-xl font-bold'>RCN Humidifier Entry Form</p></DialogTitle>

                            </DialogHeader>

                            <RCNHumidCreateForm props={lotdata} />
                        </DialogContent>
                    </Dialog>


                  

                    {checkpending('Humidifier') && (data?.EditData ?? 0) > 0 && <Drawer>
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
                            <div className='mx-5'>   <HumidTable props='edit' /></div>
                            <DrawerFooter>

                                <DrawerClose asChild>
                                    <Button className="w-28 md:w-40 bg-gradient-to-r from-red-600 to-rose-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md"
                                    >Close</Button>
                                </DrawerClose>
                            </DrawerFooter>

                        </DrawerContent>
                    </Drawer>}

                </div>
                <HumidTable props='non-edit'/>

            </div>
            <DashboardFooter/>
        </div>


    )
}
export default Humidifier;