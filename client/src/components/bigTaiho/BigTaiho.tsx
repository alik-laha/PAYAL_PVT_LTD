
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




const BigTaiho = () => {

    const { setEditBigTaihoLotWiseData } = useContext(Context)
    const [lotdata, setLotData] = useState<any[]>([])
    const [maintable, setMainTable] = useState<string>('block')
    const [historytable, setHistoryTable] = useState<string>('none')
    const { data, isLoading, error } = UseQueryData('/api/bigTaiho/sumofallBigTaiho', 'GET', 'AllBigTaihoSum');
    const handleEditFetch = async () => {

        axios.get("/api/bigTaiho/findEditBigTaihoAll").then(res => {
            console.log(res)
            setEditBigTaihoLotWiseData(res.data.scoopingAllEdit)
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
        axios.get('/api/bigTaiho/getUnBigTaihoEntry/0').then(res => {
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
                        Issue Packing <br /><p>{data.data[0].issue_ssp && data.data[0].issue_ssp_small && data.data[0].issue_swp_1 
                        && data.data[0].issue_wsp && data.data[0].issue_bits && data.data[0].issue_swp && data.data[0].issue_bb 
                        && data.data[0].issue_w_bb && data.data[0].issue_bb_A && data.data[0].issue_bb1 && data.data[0].issue_bb1_A && data.data[0].issue_bb_2
                        && data.data[0].issue_ssp_1 && data.data[0].issue_ssp_1_small && data.data[0].issue_ssp_2
                        && data.data[0].issue_ssp_2_small && data.data[0].issue_sdp
                        && data.data[0].issue_add_1 && data.data[0].issue_add_2 && data.data[0].issue_add_3
                        && data.data[0].issue_add_4 && data.data[0].issue_add_5 && data.data[0].issue_add_6
                        && data.data[0].issue_add_7 && data.data[0].issue_add_8 && data.data[0].issue_add_9
                        && data.data[0].issue_add_10 
                        ? formatNumber(parseFloat(data.data[0].issue_ssp)+parseFloat(data.data[0].issue_ssp_small)+parseFloat(data.data[0].issue_swp_1)
                        +parseFloat(data.data[0].issue_wsp)+parseFloat(data.data[0].issue_bits)+parseFloat(data.data[0].issue_swp)+
                        parseFloat(data.data[0].issue_bb)+parseFloat(data.data[0].issue_w_bb)+parseFloat(data.data[0].issue_bb_A)
                        + parseFloat(data.data[0].issue_bb1)+parseFloat(data.data[0].issue_bb1_A)+parseFloat(data.data[0].issue_bb_2)
                        +parseFloat(data.data[0].issue_ssp_1)+parseFloat(data.data[0].issue_ssp_1_small)+parseFloat(data.data[0].issue_ssp_2)
                        +parseFloat(data.data[0].issue_ssp_2_small)+parseFloat(data.data[0].issue_sdp)
                        +parseFloat(data.data[0].issue_add_1)+parseFloat(data.data[0].issue_add_2)+parseFloat(data.data[0].issue_add_3)
                            +parseFloat(data.data[0].issue_add_4)+parseFloat(data.data[0].issue_add_5)+parseFloat(data.data[0].issue_add_6)
                            +parseFloat(data.data[0].issue_add_7)+parseFloat(data.data[0].issue_add_8)+parseFloat(data.data[0].issue_add_9)
                            +parseFloat(data.data[0].issue_add_10)): 0} Kg</p>
                  
                        
                    </div>
               

                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                    Issue Sorting <br /><p>{data.data[0].issue_sorting ? formatNumber(parseFloat(data.data[0].issue_sorting))  : 0}  Kg</p>
                    </div>
                    
                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                    Issue Village <br /><p>{data.data[0].issue_village ? formatNumber(parseFloat(data.data[0].issue_village))  : 0}  Kg</p>
                    </div>

                    <div className="flexbox-tile bg-green-500 hover:bg-orange-400">
                    Issue DPDS <br /><p>{data.data[0].issue_dpds ? formatNumber(parseFloat(data.data[0].issue_dpds))  : 0}  Kg</p>
                    </div>
                    
                
                    <div className="flexbox-tile bg-yellow-500 hover:bg-orange-400">
                    Issue Rejection <br /><p>{data.data[0].issue_rejection  ?  formatNumber(parseFloat(data.data[0].issue_rejection)): 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-violet-500 hover:bg-orange-400">
                    Issue Husk <br /><p>{data.data[0].issue_husk  ?  formatNumber(parseFloat(data.data[0].issue_husk)): 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-cyan-500 hover:bg-orange-400">
                    Current Backlog <br /><p>{data.data[0].current_backlog  ?  formatNumber(parseFloat(data.data[0].current_backlog)): 0} Kg</p>
                    </div>
                  

                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}
                <p className='text-lg font-semibold text-center '>DPDS</p>
                <div>
                    <Dialog>
                        <DialogTrigger> <Button className="bg-red-500 mb-2 mt-5 ml-4 no-margin-left responsive-button-adjust" onClick={handleOpenLotNo}>+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-2xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-1xl pb-1 text-center mt-2'>BigTaiho Entry Form</p></DialogTitle>

                            </DialogHeader>

                            <BigTaihoInitial props={lotdata} />
                        </DialogContent>
                    </Dialog>


                    {checkpending('BigTaiho') &&  <Button className="bg-orange-400 mb-2 ml-4 responsive-button-adjust" onClick={handleEditFetch}> Pending Edit ({data.EditData})</Button> }
                    <Button className="bg-blue-400 mb-2 ml-4 responsive-button-adjust no-margin-left" onClick={handleTransferFetch}> {maintable==='block' ? 'Incoming/Mixing':'Main Entry '}</Button>
                </div>
                <div style={{ display: maintable }}>
                    <BigTaihoTable/>
                </div>
                <div style={{ display: historytable }}>
                    <BigTaihoHistoryTable/>
                </div>
                

            </div>
        </div>


    )
}
export default BigTaiho;