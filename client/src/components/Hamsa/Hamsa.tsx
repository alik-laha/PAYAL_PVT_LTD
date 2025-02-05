
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
import BigTaihoTable from './BigTaihoTable';
import BigTaihoHistoryTable from './BigTaihoHistoryTable';
import BigTaihoInitial from './BigTaihoInitial';
import HamsaInitial from './HamsaInitial';
import HamsaTable from './HamsaTable';
import HamsaHistoryTable from './HamsaHistory';




const Hamsa = () => {

    const { setEditHamsaLotWiseData } = useContext(Context)
    const [lotdata, setLotData] = useState<any[]>([])
    const [maintable, setMainTable] = useState<string>('block')
    const [historytable, setHistoryTable] = useState<string>('none')
    const { data, isLoading, error } = UseQueryData('/api/hamsa/sumofallHamsa', 'GET', 'AllHamsaSum');
    const handleEditFetch = async () => {

        axios.get("/api/hamsa/findEditHamsaAll").then(res => {
            console.log(res)
            setEditHamsaLotWiseData(res.data.scoopingAllEdit)
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
        axios.get('/api/hamsa/getUnHamsaEntry/0').then(res => {
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
                        Issue Wholes <br />
                        <p>{data.data[0].issue_pw_210 && data.data[0].issue_w_210 && data.data[0].issue_ww_210 
                        && data.data[0].issue_pw_240 && data.data[0].issue_w_240 && data.data[0].issue_ww_240      
                        && data.data[0].issue_pw_280 && data.data[0].issue_w_280 && data.data[0].issue_ww_280 
                        && data.data[0].issue_pw_320 && data.data[0].issue_w_320 && data.data[0].issue_ww_320
                        && data.data[0].issue_pw_400 && data.data[0].issue_w_400 && data.data[0].issue_ww_400
                        && data.data[0].issue_add_1 && data.data[0].issue_add_2 && data.data[0].issue_add_3
                        && data.data[0].issue_add_4 && data.data[0].issue_add_5 && data.data[0].issue_add_6
                        && data.data[0].issue_add_7 && data.data[0].issue_add_8 && data.data[0].issue_add_9
                        && data.data[0].issue_add_10 
                        ? formatNumber(parseFloat(data.data[0].issue_pw_210)+parseFloat(data.data[0].issue_w_210)+parseFloat(data.data[0].issue_ww_210)
                        +parseFloat(data.data[0].issue_pw_240)+parseFloat(data.data[0].issue_w_240)+parseFloat(data.data[0].issue_ww_240)
                        +parseFloat(data.data[0].issue_pw_280)+parseFloat(data.data[0].issue_w_280)+parseFloat(data.data[0].issue_ww_280)
                        +parseFloat(data.data[0].issue_pw_320)+parseFloat(data.data[0].issue_w_320)+parseFloat(data.data[0].issue_ww_320)
                        +parseFloat(data.data[0].issue_pw_400)+parseFloat(data.data[0].issue_w_400)+parseFloat(data.data[0].issue_ww_400)
                        +parseFloat(data.data[0].issue_add_1)+parseFloat(data.data[0].issue_add_2)+parseFloat(data.data[0].issue_add_3)
                            +parseFloat(data.data[0].issue_add_4)+parseFloat(data.data[0].issue_add_5)+parseFloat(data.data[0].issue_add_6)
                            +parseFloat(data.data[0].issue_add_7)+parseFloat(data.data[0].issue_add_8)+parseFloat(data.data[0].issue_add_9)
                            +parseFloat(data.data[0].issue_add_10)): 0} Kg</p>
                  
                        
                    </div>
               

                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                    Issue LW <br /><p>{data.data[0].issue_lw ? formatNumber(parseFloat(data.data[0].issue_lw))  : 0}  Kg</p>
                    </div>
                    
                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                    Issue BigTaiho <br /><p>{data.data[0].issue_bigTaiho ? formatNumber(parseFloat(data.data[0].issue_bigTaiho))  : 0}  Kg</p>
                    </div>

                    <div className="flexbox-tile bg-green-500 hover:bg-orange-400">
                    Issue JB <br /><p>{data.data[0].issue_jb? formatNumber(parseFloat(data.data[0].issue_jb))  : 0}  Kg</p>
                    </div>
                    
                    <div className="flexbox-tile bg-cyan-500 hover:bg-orange-400">
                    Current Backlog <br /><p>{data.data[0].current_backlog  ?  formatNumber(parseFloat(data.data[0].current_backlog)): 0} Kg</p>
                    </div>
                  

                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}
                <p className='text-lg font-semibold text-center '>Current F.Y. Report (HAMSA)</p>
                <div>
                    <Dialog>
                        <DialogTrigger> <Button className="bg-red-500 mb-2 mt-5 ml-4 no-margin-left responsive-button-adjust" onClick={handleOpenLotNo}>+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-2xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-1xl pb-1 text-center mt-2'>Hamsa Entry Form</p></DialogTitle>

                            </DialogHeader>

                            <HamsaInitial props={lotdata} />
                        </DialogContent>
                    </Dialog>


                    {checkpending('Hamsa') &&  <Button className="bg-orange-400 mb-2 ml-4 responsive-button-adjust" onClick={handleEditFetch}> Pending Edit ({data.EditData})</Button> }
                    <Button className="bg-blue-400 mb-2 ml-4 responsive-button-adjust no-margin-left" onClick={handleTransferFetch}> {maintable==='block' ? 'Incoming/Mixing':'Main Entry '}</Button>
                </div>
                <div style={{ display: maintable }}>
                    <HamsaTable/>
                </div>
                <div style={{ display: historytable }}>
                    <HamsaHistoryTable/>
                </div>
                

            </div>
        </div>


    )
}
export default Hamsa;