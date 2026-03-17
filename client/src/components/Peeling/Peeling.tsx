
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
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import Context from '../context/context';
import { useContext, useState } from 'react';

import axios from 'axios'
import UseQueryData from '../common/dataFetcher';
import Loader from '../common/Loader';
import { HumidpendingLotData, pendingCheckRoles, PermissionRole } from '@/type/type';
// import RCNHumidCreateForm from './HumidifierCreateForm';
import { FY, pendingCheckRole } from '../common/exportData';
import PeelingInitial from './PeelingInitial';
import PeelingTable from './PeelingTable';
import DashboardFooter from '../dashboard/DashboardFooter';
import { MdPendingActions } from 'react-icons/md';
// import HumidTable from './HumidifierTable';

// import BormaTable from './RCNBormaTable';


const Peeling = () => {

    const { setEditPeelingLotWiseData } = useContext(Context)
    const [lotdata, setLotData] = useState<HumidpendingLotData[]>([])
    const { data, isLoading, error } = UseQueryData('/api/peeling/sumofallpeel', 'GET', 'AllPeelingSum');
    const handleEditFetch = async () => {

        axios.get("/api/peeling/findEditPeelingAll").then(res => {
            console.log(res)
            setEditPeelingLotWiseData(res.data.scoopingAllEdit)
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
        axios.get('/api/peeling/getUnPeelingEntry/0').then(res => {
            console.log(res)
            setLotData(res.data.scoopingLot)
            console.log(lotdata)
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
                <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
                      <p>Issue BigTaiho</p> <br /><p>{data.data[0].Big_Taiho  ?  formatNumber(parseFloat(data.data[0].Big_Taiho)): 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-cyan-500 hover:bg-cyan-400">
                    <p>Issue Mayur</p> <br /><p>{data.data[0].WholesPeel && data.data[0].WholesUnpeel? formatNumber(parseFloat(data.data[0].WholesPeel)+parseFloat(data.data[0].WholesUnpeel))  : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                    <p>Issue DPDS </p><br /><p>{data.data[0].DP && data.data[0].DS && data.data[0].DP1? formatNumber(parseFloat(data.data[0].DP)+parseFloat(data.data[0].DS)+parseFloat(data.data[0].DP1))  : 0}  Kg</p>
                    </div>
                    <div className="flexbox-tile bg-blue-500 hover:bg-blue-400">
                    <p>Issue Sorting</p> <br /><p>{data.data[0].SJH && data.data[0].JJH && data.data[0].SJH1 &&
                        data.data[0].SP1 && data.data[0].JK_K && data.data[0].JH1? formatNumber(parseFloat(data.data[0].SJH)+parseFloat(data.data[0].SJH1)+parseFloat(data.data[0].JJH)
                        +parseFloat(data.data[0].JK_K)+parseFloat(data.data[0].SP1)+parseFloat(data.data[0].JH1))  : 0}  Kg</p>
                    </div>
                    <div className="flexbox-tile bg-sky-500 hover:bg-sky-400">
                    <p>Issue Village</p> <br /><p>{data.data[0].UnpeelPiece ? formatNumber(parseFloat(data.data[0].UnpeelPiece)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-green-500 hover:bg-green-400">
                    <p>Issue Husk</p> <br /><p>{data.data[0].Husk  ? formatNumber(parseFloat(data.data[0].Husk)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-red-500 hover:bg-red-400">
                      <p>Backlog</p>  <br /><p>{data.data[0].Backlog  ? formatNumber(parseFloat(data.data[0].Backlog)) : 0} Kg</p>
                    </div>
                 
                    





                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}
                <p className='md:text-lg md:mt-0 mt-2 text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold text-md'>CURRENT F.Y. {FY} REPORT (PEELING)</p>
                <div>
                    <Dialog>
                        <DialogTrigger> <Button className="w-40 bg-gradient-to-r from-blue-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md" onClick={handleOpenLotNo}>+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-3xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>RCN Peeling Entry Form</p></DialogTitle>

                            </DialogHeader>

                            <PeelingInitial props={lotdata} />
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
                                         Actions
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
                            <div className='mx-5'>   <PeelingTable props='edit' /></div>
                            <DrawerFooter>

                                <DrawerClose asChild>
                                    <Button className="w-28 md:w-40 bg-gradient-to-r from-red-600 to-rose-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md"
                                    >Close</Button>
                                </DrawerClose>
                            </DrawerFooter>

                        </DrawerContent>
                    </Drawer>}

                </div>
                <PeelingTable props='non-edit'/>

            </div>

            <DashboardFooter/>
        </div>


    )
}
export default Peeling;