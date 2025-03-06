
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
import { pendingCheckRoles, PermissionRole } from '@/type/type';
import { pendingCheckRole } from '../common/exportData';
import WholesInitial from './WholesInitial';
import WholesTable from './WholesTable';
import WholesHistoryTable from './WholesHistoryTable';





const Wholes = () => {

    const { setEditWholesLotWiseData } = useContext(Context)
    const [lotdata, setLotData] = useState<any[]>([])
    const [maintable, setMainTable] = useState<string>('block')
    const [historytable, setHistoryTable] = useState<string>('none')
    const { data, isLoading, error } = UseQueryData('/api/wholes/sumofallWholes', 'GET', 'AllWholesSum');
    const handleEditFetch = async () => {

        axios.get("/api/wholes/findEditWholesAll").then(res => {
            console.log(res)
            setEditWholesLotWiseData(res.data.scoopingAllEdit)
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
    const handleTransferFetch = () => {
        if (maintable === 'block') {
            setMainTable('none')
            setHistoryTable('block')
        }
        else {
            setMainTable('block')
            setHistoryTable('none')
        }
    }
    console.log(data)

    const handleOpenLotNo = async () => {
        axios.get('/api/wholes/getUnWholesEntry/0').then(res => {
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
                        Issue Packing <br />
                        <p>
                            {data.data[0].issue_pw_150 && data.data[0].issue_w_150 && data.data[0].issue_ww_150
                                && data.data[0].issue_s_150 && data.data[0].issue_aw_150 && data.data[0].issue_lw_150
                                && data.data[0].issue_pw_180 && data.data[0].issue_w_180 && data.data[0].issue_ww_180
                                && data.data[0].issue_s_180 && data.data[0].issue_aw_180 && data.data[0].issue_lw_180
                                && data.data[0].issue_pw_210 && data.data[0].issue_w_210 && data.data[0].issue_ww_210
                                && data.data[0].issue_s_210 && data.data[0].issue_aw_210 && data.data[0].issue_lw_210
                                && data.data[0].issue_pw_240 && data.data[0].issue_w_240 && data.data[0].issue_ww_240
                                && data.data[0].issue_ww_240_A && data.data[0].issue_aw_240 && data.data[0].issue_lw_240
                                && data.data[0].issue_pw_280 && data.data[0].issue_w_280 && data.data[0].issue_ww_280
                                && data.data[0].issue_ww_280_A && data.data[0].issue_aw_280 && data.data[0].issue_lw_280
                                && data.data[0].wholes_double && data.data[0].issue_pw_320 && data.data[0].issue_w_320
                                && data.data[0].issue_ww_320 && data.data[0].issue_ww_320_A && data.data[0].issue_aw_320
                                && data.data[0].issue_lw_320 && data.data[0].issue_pw_360 && data.data[0].issue_w_360
                                && data.data[0].issue_ww_360 && data.data[0].issue_ww_360_A && data.data[0].issue_aw_360
                                && data.data[0].issue_lw_360 && data.data[0].issue_pw_400 && data.data[0].issue_w_400
                                && data.data[0].issue_ww_400 && data.data[0].issue_ww_400_A && data.data[0].issue_aw_400
                                && data.data[0].issue_lw_400 && data.data[0].issue_jjb && data.data[0].issue_jjb1
                                ? formatNumber(
                                    parseFloat(data.data[0].issue_pw_150) + parseFloat(data.data[0].issue_w_150) + parseFloat(data.data[0].issue_ww_150)
                                    + parseFloat(data.data[0].issue_s_150) + parseFloat(data.data[0].issue_aw_150) + parseFloat(data.data[0].issue_lw_150)
                                    + parseFloat(data.data[0].issue_pw_180) + parseFloat(data.data[0].issue_w_180) + parseFloat(data.data[0].issue_ww_180)
                                    + parseFloat(data.data[0].issue_s_180) + parseFloat(data.data[0].issue_aw_180) + parseFloat(data.data[0].issue_lw_180)
                                    + parseFloat(data.data[0].issue_pw_210) + parseFloat(data.data[0].issue_w_210) + parseFloat(data.data[0].issue_ww_210)
                                    + parseFloat(data.data[0].issue_s_210) + parseFloat(data.data[0].issue_aw_210) + parseFloat(data.data[0].issue_lw_210)
                                    + parseFloat(data.data[0].issue_pw_240) + parseFloat(data.data[0].issue_w_240) + parseFloat(data.data[0].issue_ww_240)
                                    + parseFloat(data.data[0].issue_ww_240_A) + parseFloat(data.data[0].issue_aw_240) + parseFloat(data.data[0].issue_lw_240)
                                    + parseFloat(data.data[0].issue_pw_280) + parseFloat(data.data[0].issue_w_280) + parseFloat(data.data[0].issue_ww_280)
                                    + parseFloat(data.data[0].issue_ww_280_A) + parseFloat(data.data[0].issue_aw_280) + parseFloat(data.data[0].issue_lw_280)
                                    + parseFloat(data.data[0].wholes_double) + parseFloat(data.data[0].issue_pw_320) + parseFloat(data.data[0].issue_w_320)
                                    + parseFloat(data.data[0].issue_ww_320) + parseFloat(data.data[0].issue_ww_320_A) + parseFloat(data.data[0].issue_aw_320)
                                    + parseFloat(data.data[0].issue_lw_320) + parseFloat(data.data[0].issue_pw_360) + parseFloat(data.data[0].issue_w_360)
                                    + parseFloat(data.data[0].issue_ww_360) + parseFloat(data.data[0].issue_ww_360_A) + parseFloat(data.data[0].issue_aw_360)
                                    + parseFloat(data.data[0].issue_lw_360) + parseFloat(data.data[0].issue_pw_400) + parseFloat(data.data[0].issue_w_400)
                                    + parseFloat(data.data[0].issue_ww_400) + parseFloat(data.data[0].issue_ww_400_A) + parseFloat(data.data[0].issue_aw_400)
                                    + parseFloat(data.data[0].issue_lw_400) + parseFloat(data.data[0].issue_jjb) + parseFloat(data.data[0].issue_jjb1)
                                ) : 0} Kg
                        </p>


                    </div>


                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                        Issue LW <br /><p>{data.data[0].issue_lw ? formatNumber(parseFloat(data.data[0].issue_lw)) : 0}  Kg</p>
                    </div>

                    <div className="flexbox-tile bg-yellow-500 hover:bg-orange-400">
                        Issue BigTaiho <br /><p>{data.data[0].issue_bigTaiho ? formatNumber(parseFloat(data.data[0].issue_bigTaiho)) : 0}  Kg</p>
                    </div>

                    <div className="flexbox-tile bg-violet-500 hover:bg-orange-400">
                        Issue Village <br /><p>{data.data[0].issue_village ? formatNumber(parseFloat(data.data[0].issue_village)) : 0}  Kg</p>
                    </div>

                    <div className="flexbox-tile bg-green-500 hover:bg-orange-400">
                        Issue Rejection <br /><p>{data.data[0].issue_rejection ? formatNumber(parseFloat(data.data[0].issue_rejection)) : 0}  Kg</p>
                    </div>

                    <div className="flexbox-tile bg-cyan-500 hover:bg-orange-400">
                        Current Backlog <br /><p>{data.data[0].current_backlog ? formatNumber(parseFloat(data.data[0].current_backlog)) : 0} Kg</p>
                    </div>


                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}
                <p className='text-lg font-semibold text-center capitalize'>CURRENT F.Y. REPORT (WHOLES GRADING)</p>
                <div>
                    <Dialog>
                        <DialogTrigger> <Button className="bg-red-500 mb-2 mt-5 ml-4 no-margin-left responsive-button-adjust" onClick={handleOpenLotNo}>+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-2xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-1xl pb-1 text-center mt-2'>Wholes Entry Form</p></DialogTitle>

                            </DialogHeader>

                            <WholesInitial props={lotdata} />
                        </DialogContent>
                    </Dialog>


                    {checkpending('Wholes') && <Button className="bg-orange-400 mb-2 ml-4 responsive-button-adjust" onClick={handleEditFetch}> Pending Edit ({data.EditData})</Button>}
                    <Button className="bg-blue-400 mb-2 ml-4 responsive-button-adjust no-margin-left" onClick={handleTransferFetch}> {maintable === 'block' ? 'Incoming/Mixing' : 'Main Entry '}</Button>
                </div>
                <div style={{ display: maintable }}>
                    <WholesTable />
                </div>
                <div style={{ display: historytable }}>
                    <WholesHistoryTable />
                </div>


            </div>
        </div>


    )
}
export default Wholes;