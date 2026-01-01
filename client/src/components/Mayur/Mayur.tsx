
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

import Context from '../context/context';
import { useContext, useState } from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import axios from 'axios'
import UseQueryData from '../common/dataFetcher';
import Loader from '../common/Loader';
import {  pendingCheckRoles, PermissionRole } from '@/type/type';
// import RCNHumidCreateForm from './HumidifierCreateForm';
import { FY, pendingCheckRole } from '../common/exportData';
import MayurInitial from './MayurInitial';
import MayurTable from './MayurTable';
import MayurHistoryTable from './MayurHistoryTable';
import DashboardFooter from '../dashboard/DashboardFooter';
import { MdPendingActions } from 'react-icons/md';
import { FaHistory } from 'react-icons/fa';



const Mayur = () => {

    const { setEditMayurLotWiseData } = useContext(Context)
    const [lotdata, setLotData] = useState<any[]>([])
    const [maintable, setMainTable] = useState<string>('block')
    const [historytable, setHistoryTable] = useState<string>('none')
    const { data, isLoading, error } = UseQueryData('/api/mayur/sumofallMayur', 'GET', 'AllMayurSum');
    const handleEditFetch = async () => {

        axios.get("/api/mayur/findEditMayurAll").then(res => {
            console.log(res)
            setEditMayurLotWiseData(res.data.scoopingAllEdit)
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
    const handleTransferFetch =  () => {
        if(maintable === 'block'){
            setMainTable('none')
            setHistoryTable('block')
        }
        else{
            setMainTable('block')
            setHistoryTable('none')
        }
    }
    console.log(data)

    const handleOpenLotNo = async () => {
        axios.get('/api/mayur/getUnMayurEntry/0').then(res => {
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
                       <p> Issue Hamsa</p> <br /><p>{data.data[0].issue_pw_w && data.data[0].issue_w_lot && data.data[0].issue_ww ? formatNumber(parseFloat(data.data[0].issue_pw_w)+parseFloat(data.data[0].issue_w_lot)+parseFloat(data.data[0].issue_ww)
                        )  : 0}  Kg</p>
                    </div>
               
                    <div className="flexbox-tile bg-red-500 hover:bg-red-400">
                    <p>Issue Big Taiho</p> <br /><p>{data.data[0].issue_bigTaiho ? formatNumber(parseFloat(data.data[0].issue_bigTaiho))  : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-cyan-500 hover:bg-orange-400">
                    <p>Issue Village</p> <br /><p>{data.data[0].issue_village ? formatNumber(parseFloat(data.data[0].issue_village))  : 0}  Kg</p>
                    </div>
                    <div className="flexbox-tile bg-green-500 hover:bg-green-400">
                    <p>Issue LW</p> <br /><p>{data.data[0].issue_LW ? formatNumber(parseFloat(data.data[0].issue_LW))  : 0}  Kg</p>
                    </div>
                    <div className="flexbox-tile bg-violet-500 hover:bg-violet-400">
                    <p>Issue Wholes(JB)</p> <br /><p>{data.data[0].issue_JB ? formatNumber(parseFloat(data.data[0].issue_JB))  : 0}  Kg</p>
                    </div>
                    <div className="flexbox-tile bg-purple-500 hover:bg-purple-400">
                    <p>Issue Rejection</p> <br /><p>{data.data[0].issue_rejection  ?  formatNumber(parseFloat(data.data[0].issue_rejection)): 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-blue-500 hover:bg-blue-400">
                    <p>Current Backlog</p> <br /><p>{data.Sumdata[0].current_backlog  ?  formatNumber(parseFloat(data.Sumdata[0].current_backlog)): 0} Kg</p>
                    </div>
                  
                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}
                <p className='md:text-lg md:mt-0 mt-2 text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold text-md'>CURRENT F.Y. {FY} REPORT (MAYUR)</p>
                <div>
                    <Dialog>
                        <DialogTrigger> <Button className="md:w-40 w-28 bg-gradient-to-r from-blue-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md" onClick={handleOpenLotNo}>+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-4xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold'>Mayur Entry Form</p></DialogTitle>

                            </DialogHeader>

                            <MayurInitial props={lotdata} />
                        </DialogContent>
                    </Dialog>


        


                     {checkpending('Mayur') && (data?.EditData ?? 0) > 0 && <Drawer>
                        <DrawerTrigger asChild >
                            <div className="relative inline-block ml-4 top-1 responsive-button-adjust">
                                <Button
                                    className="w-28 md:w-40 bg-gradient-to-r from-orange-400 to-red-200 hover:from-red-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md "
                                    /* FIX 1: Use ?? 0 for the disabled prop */
                                    disabled={(data?.EditData ?? 0) === 0}
                                    onClick={handleEditFetch}
                                >
                                    <div className="flex items-center gap-2">
                                        <MdPendingActions size={18} />
                                        Pending 
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
                            <div className='mx-5'>   <MayurTable props='edit' /></div>
                            <DrawerFooter>

                                <DrawerClose asChild>
                                    <Button className="w-28 md:w-40 bg-gradient-to-r from-red-600 to-rose-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md"
                                    >Close</Button>
                                </DrawerClose>
                            </DrawerFooter>

                        </DrawerContent>
                    </Drawer>}
                    <Button className="w-28 md:w-40 bg-gradient-to-r from-purple-600 to-blue-400 hover:from-slate-500 hover:to-slate-300 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left drop-shadow-md" onClick={handleTransferFetch}> {maintable==='block' ? 'History':'Main Entry '}<FaHistory size={16} className='ml-2'/></Button>
                </div>
                <div style={{ display: maintable }}>
                    <MayurTable props='non-edit'/>
                </div>
                <div style={{ display: historytable }}>
                    <MayurHistoryTable/>
                </div>
                

            </div>
            <DashboardFooter/>
        </div>


    )
}
export default Mayur;