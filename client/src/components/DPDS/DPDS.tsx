
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
import { pendingCheckRole } from '../common/exportData';
import DPDSInitial from './DPDSInitial';
import DPDSTable from './DPDSTable';
import DPDSHistoryTable from './DSDSHistoryTable';




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
                <div className="flexbox-header">
                <div className="flexbox-tile bg-blue-500 hover:bg-orange-400">
                        Issue Packing <br /><p>{data.data[0].issue_m_ds && data.data[0].issue_m_dp && data.data[0].issue_k_dp 
                        && data.data[0].issue_ds_1 && data.data[0].issue_ds_2 && data.data[0].issue_sp_2 && data.data[0].issue_yjh 
                        && data.data[0].issue_yk && data.data[0].issue_kp && data.data[0].issue_wp && data.data[0].issue_rs && data.data[0].issue_dp_2
                        && data.data[0].issue_dp_3 && data.data[0].issue_dp_4 && data.data[0].issue_dp_3l
                        && data.data[0].issue_ss && data.data[0].issue_os && data.data[0].issue_os1
                        
                        && data.data[0].issue_add_7 && data.data[0].issue_add_8 && data.data[0].issue_add_9
                        && data.data[0].issue_add_10 
                        ? formatNumber(parseFloat(data.data[0].issue_m_ds)+parseFloat(data.data[0].issue_m_dp)+parseFloat(data.data[0].issue_k_dp)
                        +parseFloat(data.data[0].issue_ds_1)+parseFloat(data.data[0].issue_ds_2)+parseFloat(data.data[0].issue_sp_2)+
                        parseFloat(data.data[0].issue_yjh)+parseFloat(data.data[0].issue_yk)+parseFloat(data.data[0].issue_kp)
                        + parseFloat(data.data[0].issue_wp)+parseFloat(data.data[0].issue_rs)+parseFloat(data.data[0].issue_dp_2)
                        +parseFloat(data.data[0].issue_dp_3)+parseFloat(data.data[0].issue_dp_4)+parseFloat(data.data[0].issue_dp_3l)
                        +parseFloat(data.data[0].issue_ss)+parseFloat(data.data[0].issue_os)+parseFloat(data.data[0].issue_os1)
                        +
                            +parseFloat(data.data[0].issue_add_7)+parseFloat(data.data[0].issue_add_8)+parseFloat(data.data[0].issue_add_9)
                            +parseFloat(data.data[0].issue_add_10)): 0} Kg</p>
                  
                        
                    </div>
               
                    <div className="flexbox-tile bg-red-500 hover:bg-orange-400">
                    Issue Big Taiho <br /><p>{data.data[0].issue_bigTaiho ? formatNumber(parseFloat(data.data[0].issue_bigTaiho))  : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                    Issue Village <br /><p>{data.data[0].issue_village ? formatNumber(parseFloat(data.data[0].issue_village))  : 0}  Kg</p>
                    </div>
                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                    Issue Mayur <br /><p>{data.data[0].issue_mayur ? formatNumber(parseFloat(data.data[0].issue_mayur))  : 0}  Kg</p>
                    </div>
                    
                    <div className="flexbox-tile bg-yellow-500 hover:bg-orange-400">
                    Issue Rejection <br /><p>{data.data[0].issue_rejection  ?  formatNumber(parseFloat(data.data[0].issue_rejection)): 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-cyan-500 hover:bg-orange-400">
                    Current Backlog <br /><p>{data.data[0].current_backlog  ?  formatNumber(parseFloat(data.data[0].current_backlog)): 0} Kg</p>
                    </div>
                  
                   
                 
                    





                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}
                <p className='text-lg font-semibold text-center '>CURRENT F.Y. REPORT (DPDS)</p>
                <div>
                    <Dialog>
                        <DialogTrigger> <Button className="bg-red-500 mb-2 mt-5 ml-4 no-margin-left responsive-button-adjust" onClick={handleOpenLotNo}>+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-2xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-1xl pb-1 text-center mt-2'>DPDS Entry Form</p></DialogTitle>

                            </DialogHeader>

                            <DPDSInitial props={lotdata} />
                        </DialogContent>
                    </Dialog>


                    {checkpending('DPDS') &&  <Button className="bg-orange-400 mb-2 ml-4 responsive-button-adjust" onClick={handleEditFetch}> Pending Edit ({data.EditData})</Button> }
                    <Button className="bg-blue-400 mb-2 ml-4 responsive-button-adjust no-margin-left" onClick={handleTransferFetch}> {maintable==='block' ? 'Incoming/Mixing':'Main Entry '}</Button>
                </div>
                <div style={{ display: maintable }}>
                    <DPDSTable/>
                </div>
                <div style={{ display: historytable }}>
                    <DPDSHistoryTable/>
                </div>
                

            </div>
        </div>


    )
}
export default DPDS;