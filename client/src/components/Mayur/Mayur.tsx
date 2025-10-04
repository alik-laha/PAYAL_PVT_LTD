
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
// import RCNHumidCreateForm from './HumidifierCreateForm';
import { FY, pendingCheckRole } from '../common/exportData';
import MayurInitial from './MayurInitial';
import MayurTable from './MayurTable';
import MayurHistoryTable from './MayurHistoryTable';



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
                <div className="flexbox-header">
                <div className="flexbox-tile bg-blue-500 hover:bg-blue-400">
                        Issue Hamsa <br /><p>{data.data[0].issue_pw_w && data.data[0].issue_w_lot && data.data[0].issue_ww ? formatNumber
                        (parseFloat(data.data[0].issue_pw_w)+parseFloat(data.data[0].issue_w_lot)+parseFloat(data.data[0].issue_ww)
                        )  : 0}  Kg</p>
                    </div>
               
                    <div className="flexbox-tile bg-red-500 hover:bg-red-400">
                    Issue Big Taiho <br /><p>{data.data[0].issue_bigTaiho ? formatNumber(parseFloat(data.data[0].issue_bigTaiho))  : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-cyan-500 hover:bg-orange-400">
                    Issue Village <br /><p>{data.data[0].issue_village ? formatNumber(parseFloat(data.data[0].issue_village))  : 0}  Kg</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
                    Issue LW <br /><p>{data.data[0].issue_LW ? formatNumber(parseFloat(data.data[0].issue_LW))  : 0}  Kg</p>
                    </div>
                    <div className="flexbox-tile bg-violet-500 hover:bg-violet-400">
                    Issue Wholes(JB) <br /><p>{data.data[0].issue_JB ? formatNumber(parseFloat(data.data[0].issue_JB))  : 0}  Kg</p>
                    </div>
                    <div className="flexbox-tile bg-purple-500 hover:bg-purple-400">
                    Issue Rejection <br /><p>{data.data[0].issue_rejection  ?  formatNumber(parseFloat(data.data[0].issue_rejection)): 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-blue-500 hover:bg-blue-400">
                    Current Backlog <br /><p>{data.Sumdata[0].current_backlog  ?  formatNumber(parseFloat(data.Sumdata[0].current_backlog)): 0} Kg</p>
                    </div>
                  
                   
                 
                    





                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}
                <p className='text-lg font-cursive text-center '>CURRENT F.Y. {FY} REPORT (MAYUR)</p>
                <div>
                    <Dialog>
                        <DialogTrigger> <Button className="bg-lime-500 mb-2 mt-5 ml-4 no-margin-left responsive-button-adjust" onClick={handleOpenLotNo}>+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-3xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-1xl pb-1 text-center mt-2'>Mayur Entry Form</p></DialogTitle>

                            </DialogHeader>

                            <MayurInitial props={lotdata} />
                        </DialogContent>
                    </Dialog>


                    {checkpending('Mayur') &&  <Button className="bg-orange-400 mb-2 ml-4 responsive-button-adjust" onClick={handleEditFetch}> Pending Edit ({data.EditData})</Button> }
                    <Button className="bg-slate-400 mb-2 ml-4 responsive-button-adjust no-margin-left" onClick={handleTransferFetch}> {maintable==='block' ? 'Incoming/Mixing':'Main Entry '}</Button>
                </div>
                <div style={{ display: maintable }}>
                    <MayurTable/>
                </div>
                <div style={{ display: historytable }}>
                    <MayurHistoryTable/>
                </div>
                

            </div>
        </div>


    )
}
export default Mayur;