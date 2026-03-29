
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

import axios from 'axios'
import UseQueryData from '../common/dataFetcher';
import Loader from '../common/Loader';
import {  pendingCheckRoles, PermissionRole } from '@/type/type';
import { FY, pendingCheckRole } from '../common/exportData';
import DPDSInitial from './DPDSInitial';
import DPDSTable from './DPDSTable';
import DPDSHistoryTable from './DSDSHistoryTable';
import { MdPendingActions } from 'react-icons/md';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { FaHistory } from 'react-icons/fa';
import PendingBacklog from '../common/PendingBacklog';
import DashboardFooter from '../dashboard/DashboardFooter';



const DPDS = () => {

    const { setEditDPDSLotWiseData } = useContext(Context)
    const [lotdata, setLotData] = useState<any[]>([])
    const [maintable, setMainTable] = useState<string>('block')
    const [historytable, setHistoryTable] = useState<string>('none')
    const { data, isLoading, error } = UseQueryData('/api/dpds/sumofallDPDS', 'GET', 'AllDPDSSum');
    const handleEditFetch = async () => {

        axios.get("/api/dpds/findEditDPDSAll").then(res => {
            console.log(res)
            setEditDPDSLotWiseData(res.data.scoopingAllEdit)
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
        axios.get('/api/dpds/getUnDPDSEntry/0').then(res => {
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
                <div className="flexbox-tile bg-blue-500 hover:bg-blue-400">
                        <p>Issue Packing</p> <br /><p>{data.data[0].issue_m_ds && data.data[0].issue_m_dp && data.data[0].issue_k_dp 
                        && data.data[0].issue_ds_1 && data.data[0].issue_ds_2 && data.data[0].issue_sp_2 && data.data[0].issue_yjh 
                        && data.data[0].issue_yk && data.data[0].issue_kp && data.data[0].issue_wp && data.data[0].issue_rs && data.data[0].issue_dp_2
                        && data.data[0].issue_dp_3 && data.data[0].issue_dp_4 && data.data[0].issue_dp_3l
                        && data.data[0].issue_ss && data.data[0].issue_os && data.data[0].issue_os1

                        && data.data[0].issue_V_ds && data.data[0].issue_V_m_ds && data.data[0].issue_V_dp &&
        data.data[0].issue_V_m_dp && data.data[0].issue_V_lp && data.data[0].issue_V_lp_2 &&
        data.data[0].issue_V_k_dp && data.data[0].issue_V_ss && data.data[0].issue_V_yjh &&
        data.data[0].issue_V_yk && data.data[0].issue_V_sp_2 && data.data[0].issue_V_kp &&
        data.data[0].issue_V_dp_2 && data.data[0].issue_V_dp_3 && data.data[0].issue_V_dp_4 &&
        data.data[0].issue_V_os && data.data[0].issue_V_os_1 && data.data[0].issue_V_wp &&
        data.data[0].issue_V_rs && data.data[0].issue_ext_grade_1 && data.data[0].issue_ext_grade_2 &&
        data.data[0].issue_ext_grade_3 && data.data[0].issue_ext_grade_4 && data.data[0].issue_ext_grade_5 &&
        data.data[0].issue_ext_grade_6 && data.data[0].issue_ext_grade_7 && data.data[0].issue_ext_grade_8 &&
        data.data[0].issue_ext_grade_9 && data.data[0].issue_ext_grade_10                
                        && data.data[0].issue_add_7 && data.data[0].issue_add_8 && data.data[0].issue_add_9
                        && data.data[0].issue_add_10 
                        ? formatNumber(parseFloat(data.data[0].issue_m_ds)+parseFloat(data.data[0].issue_m_dp)+parseFloat(data.data[0].issue_k_dp)
                        +parseFloat(data.data[0].issue_ds_1)+parseFloat(data.data[0].issue_ds_2)+parseFloat(data.data[0].issue_sp_2)+
                        parseFloat(data.data[0].issue_yjh)+parseFloat(data.data[0].issue_yk)+parseFloat(data.data[0].issue_kp)
                        + parseFloat(data.data[0].issue_wp)+parseFloat(data.data[0].issue_rs)+parseFloat(data.data[0].issue_dp_2)
                        +parseFloat(data.data[0].issue_dp_3)+parseFloat(data.data[0].issue_dp_4)+parseFloat(data.data[0].issue_dp_3l)
                        +parseFloat(data.data[0].issue_ss)+parseFloat(data.data[0].issue_os)+parseFloat(data.data[0].issue_os1)
                        +parseFloat(data.data[0].issue_V_ds) +
                        parseFloat(data.data[0].issue_V_m_ds) +
                        parseFloat(data.data[0].issue_V_dp) +
                        parseFloat(data.data[0].issue_V_m_dp) +
                        parseFloat(data.data[0].issue_V_lp) +
                        parseFloat(data.data[0].issue_V_lp_2) +
                        parseFloat(data.data[0].issue_V_k_dp) +
                        parseFloat(data.data[0].issue_V_ss) +
                        parseFloat(data.data[0].issue_V_yjh) +
                        parseFloat(data.data[0].issue_V_yk) +
                        parseFloat(data.data[0].issue_V_sp_2) +
                        parseFloat(data.data[0].issue_V_kp) +
                        parseFloat(data.data[0].issue_V_dp_2) +
                        parseFloat(data.data[0].issue_V_dp_3) +
                        parseFloat(data.data[0].issue_V_dp_4) +
                        parseFloat(data.data[0].issue_V_os) +
                        parseFloat(data.data[0].issue_V_os_1) +
                        parseFloat(data.data[0].issue_V_wp) +
                        parseFloat(data.data[0].issue_V_rs) +
                        parseFloat(data.data[0].issue_ext_grade_1) +
                        parseFloat(data.data[0].issue_ext_grade_2) +
                        parseFloat(data.data[0].issue_ext_grade_3) +
                        parseFloat(data.data[0].issue_ext_grade_4) +
                        parseFloat(data.data[0].issue_ext_grade_5) +
                        parseFloat(data.data[0].issue_ext_grade_6) +
                        parseFloat(data.data[0].issue_ext_grade_7) +
                        parseFloat(data.data[0].issue_ext_grade_8) +
                        parseFloat(data.data[0].issue_ext_grade_9) +
                        parseFloat(data.data[0].issue_ext_grade_10) +
                            +parseFloat(data.data[0].issue_add_7)+parseFloat(data.data[0].issue_add_8)+parseFloat(data.data[0].issue_add_9)
                            +parseFloat(data.data[0].issue_add_10)): 0} Kg</p>
                  
                        
                    </div>
               
                    <div className="flexbox-tile bg-red-500 hover:bg-red-400">
                   <p>Issue Big Taiho </p> <br /><p>{data.data[0].issue_bigTaiho ? formatNumber(parseFloat(data.data[0].issue_bigTaiho))  : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                    <p>Issue Village</p> <br /><p>{data.data[0].issue_village ? formatNumber(parseFloat(data.data[0].issue_village))  : 0}  Kg</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
                    <p>Issue Mayur </p><br /><p>{data.data[0].issue_mayur ? formatNumber(parseFloat(data.data[0].issue_mayur))  : 0}  Kg</p>
                    </div>
                    
                    <div className="flexbox-tile bg-purple-500 hover:bg-purple-400">
                    <p>Issue Rejection</p> <br /><p>{data.data[0].issue_rejection  ?  formatNumber(parseFloat(data.data[0].issue_rejection)): 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-cyan-500 hover:bg-cyan-400">
                   <p>Current Backlog</p> <br /><p>{data.Sumdata[0].current_backlog  ?  formatNumber(parseFloat(data.Sumdata[0].current_backlog)): 0} Kg</p>
                    </div>
                  
                   
                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}
                 <p className='md:text-lg md:mt-0 mt-2 text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold text-md'>CURRENT F.Y. {FY} REPORT (DPDS)</p>
                <div>
                  

                    <Dialog>
                        <DialogTrigger> <Button className="md:w-40 w-25 bg-gradient-to-r from-blue-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md" onClick={handleOpenLotNo}>+ Add Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-4xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold'>DPDS Entry Form</p></DialogTitle>

                            </DialogHeader>

                            <DPDSInitial props={lotdata} />
                        </DialogContent>
                    </Dialog>


                    {/* {checkpending('DPDS') &&  <Button className="bg-orange-400 mb-2 ml-4 responsive-button-adjust drop-shadow-md" onClick={handleEditFetch} disabled={data.EditData===0 ? true:false}> Pending Edit ({data.EditData})</Button> } */}


                    {checkpending('DPDS') && (data?.EditData ?? 0) > 0 && <Drawer>
                        <DrawerTrigger asChild >
                            <div className="relative inline-block ml-2 md:ml-4 top-1 responsive-button-adjust">
                                <Button
                                    className="w-25 md:w-40 bg-gradient-to-r from-orange-400 to-red-200 hover:from-red-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md "
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
                            <div className='mx-5'>   <DPDSTable props='edit' /></div>
                            <DrawerFooter>

                                <DrawerClose asChild>
                                    <Button className="w-28 md:w-40 bg-gradient-to-r from-red-600 to-rose-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md"
                                    >Close</Button>
                                </DrawerClose>
                            </DrawerFooter>

                        </DrawerContent>
                    </Drawer>}



                   <Button className="w-25 md:w-40 bg-gradient-to-r from-purple-600 to-blue-400 hover:from-slate-500 hover:to-slate-300 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left drop-shadow-md" onClick={handleTransferFetch}> {maintable==='block' ? 'History':'Main Entry '}<FaHistory size={16} className='ml-2'/></Button>

                    { (data?.PendingData ?? 0) > 0 && <Dialog>
                        <DialogTrigger>
                            <div className="relative inline-block ml-2 md:ml-4 top-1 responsive-button-adjust">
                                <Button
                                    className="w-25 md:w-40 bg-gradient-to-r from-red-500 to-yellow-400 hover:from-red-600 hover:to-yellow-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md "
                                    /* FIX 1: Use ?? 0 for the disabled prop */
                                    disabled={(data?.PendingData ?? 0) === 0}
                                    
                                >
                                    <div className="flex items-center gap-2">
                                        <MdPendingActions size={18} />
                                        Backlog 
                                    </div>
                                </Button>

                                {/* FIX 2: Use ?? 0 for the badge display condition and value */}
                                {(data?.PendingData ?? 0) > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center transform scale-90 origin-center animate-pulse shadow-lg ring-2 ring-white dark:ring-gray-800">
                                        {data?.PendingData ?? 0}
                                    </span>
                                )}
                            </div>
                        </DialogTrigger>
                        <DialogContent className='max-w-4xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold'>DPDS Backlog</p></DialogTitle>

                            </DialogHeader>

                            <PendingBacklog props={'dpds'} />
                        </DialogContent>
                    </Dialog>}




                   
                </div>
                <div style={{ display: maintable }}>
                    <DPDSTable props='non-edit'/>
                </div>
                <div style={{ display: historytable }}>
                    <DPDSHistoryTable/>
                </div>
                

            </div>

            <DashboardFooter/>
        </div>


    )
}
export default DPDS;