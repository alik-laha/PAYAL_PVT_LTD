
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
import VillageInitial from './VillageInitial';
import VillageTable from './VillageTable';
import VillageHistoryTable from './VillageHistoryTable';



const Village = () => {

    const { setEditVillageLotWiseData } = useContext(Context)
    const [lotdata, setLotData] = useState<any[]>([])
    const [maintable, setMainTable] = useState<string>('block')
    const [historytable, setHistoryTable] = useState<string>('none')
    const { data, isLoading, error } = UseQueryData('/api/villageout/sumofallVillage', 'GET', 'AllVillageSum');
    const handleEditFetch = async () => {

        axios.get("/api/villageout/findEditVillageAll").then(res => {
            console.log(res)
            setEditVillageLotWiseData(res.data.scoopingAllEdit)
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
        axios.get('/api/villageout/getUnVillageEntry/0').then(res => {
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
                            {
                                data.data[0].issue_packing
                                    ? formatNumber(
                                        parseFloat(data.data[0].issue_packing) 
                                    ) : 0
                            } Kg
                        </p>


                    </div>


                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                        Issue Mayur <br /><p>{data.data[0].issue_mayur ? formatNumber(parseFloat(data.data[0].issue_mayur)) : 0}  Kg</p>
                    </div>

                    <div className="flexbox-tile bg-yellow-500 hover:bg-orange-400">
                        Issue Hamsa <br /><p>{data.data[0].issue_hamsa ? formatNumber(parseFloat(data.data[0].issue_hamsa)) : 0}  Kg</p>
                    </div>

                    <div className="flexbox-tile bg-violet-500 hover:bg-orange-400">
                        Issue BigTaiho <br /><p>{data.data[0].issue_bigTaiho ? formatNumber(parseFloat(data.data[0].issue_bigTaiho)) : 0}  Kg</p>
                    </div>

                    <div className="flexbox-tile bg-green-500 hover:bg-orange-400">
                        Issue Rejection <br /><p>{data.data[0].issue_rejection ? formatNumber(parseFloat(data.data[0].issue_rejection)) : 0}  Kg</p>
                    </div>

                    <div className="flexbox-tile bg-green-500 hover:bg-orange-400">
                        Issue Outside <br /><p>{data.data[0].issue_outside ? formatNumber(parseFloat(data.data[0].issue_outside)) : 0}  Kg</p>
                    </div>

                    <div className="flexbox-tile bg-cyan-500 hover:bg-orange-400">
                        Current Backlog <br /><p>{data.Sumdata[0].current_backlog  ?  formatNumber(parseFloat(data.Sumdata[0].current_backlog)): 0} Kg</p>
                    </div>


                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}
                <p className='text-lg font-semibold text-center capitalize'>CURRENT F.Y. REPORT (VILLAGE)</p>
                <div>
                    <Dialog>
                        <DialogTrigger> <Button className="bg-red-500 mb-2 mt-5 ml-4 no-margin-left responsive-button-adjust" onClick={handleOpenLotNo}>+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-2xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-1xl pb-1 text-center mt-2'>Village Entry Form</p></DialogTitle>

                            </DialogHeader>

                            <VillageInitial props={lotdata} />
                        </DialogContent>
                    </Dialog>


                    {checkpending('Village') && <Button className="bg-orange-400 mb-2 ml-4 responsive-button-adjust" onClick={handleEditFetch}> Pending Edit ({data.EditData})</Button>}
                    <Button className="bg-blue-400 mb-2 ml-4 responsive-button-adjust no-margin-left" onClick={handleTransferFetch}> {maintable === 'block' ? 'Incoming/Mixing' : 'Main Entry '}</Button>
                </div>
                <div style={{ display: maintable }}>
                    <VillageTable />
                </div>
                <div style={{ display: historytable }}>
                    <VillageHistoryTable />
                </div>


            </div>
        </div>


    )
}
export default Village;