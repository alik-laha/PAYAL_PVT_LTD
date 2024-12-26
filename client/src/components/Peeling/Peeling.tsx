
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
import { HumidpendingLotData, pendingCheckRoles, PermissionRole } from '@/type/type';
// import RCNHumidCreateForm from './HumidifierCreateForm';
import { pendingCheckRole } from '../common/exportData';
import PeelingInitial from './PeelingInitial';
import PeelingTable from './PeelingTable';
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
                <div className="flexbox-header">
                <div className="flexbox-tile bg-yellow-500 hover:bg-orange-400">
                        Big Taiho <br /><p>{data.data[0].Big_Taiho  ?  formatNumber(parseFloat(data.data[0].Big_Taiho)): 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-cyan-500 hover:bg-orange-400">
                        Mayur <br /><p>{data.data[0].WholesPeel && data.data[0].WholesUnpeel? formatNumber(parseFloat(data.data[0].WholesPeel)+parseFloat(data.data[0].WholesUnpeel))  : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                        DP & DS <br /><p>{data.data[0].DP && data.data[0].DS && data.data[0].DP1? formatNumber(parseFloat(data.data[0].DP)+parseFloat(data.data[0].DS)+parseFloat(data.data[0].DP1))  : 0}  Kg</p>
                    </div>
                    <div className="flexbox-tile bg-blue-500 hover:bg-orange-400">
                        Sorting <br /><p>{data.data[0].SJH && data.data[0].JJH && data.data[0].SJH1 &&
                        data.data[0].SP1 && data.data[0].JK_K && data.data[0].JH1? formatNumber
                        (parseFloat(data.data[0].SJH)+parseFloat(data.data[0].SJH1)+parseFloat(data.data[0].JJH)
                        +parseFloat(data.data[0].JK_K)+parseFloat(data.data[0].SP1)+parseFloat(data.data[0].JH1))  : 0}  Kg</p>
                    </div>
                    <div className="flexbox-tile bg-sky-500 hover:bg-orange-400">
                        Village <br /><p>{data.data[0].UnpeelPiece ? formatNumber(parseFloat(data.data[0].UnpeelPiece)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-green-500 hover:bg-orange-400">
                        Husk <br /><p>{data.data[0].Husk  ? formatNumber(parseFloat(data.data[0].Husk)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-red-500 hover:bg-orange-400">
                        Backlog <br /><p>{data.data[0].Backlog  ? formatNumber(parseFloat(data.data[0].Backlog)) : 0} Kg</p>
                    </div>
                 
                    





                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}
                <p className='text-lg font-semibold text-center '>RCN PEELING</p>
                <div>
                    <Dialog>
                        <DialogTrigger> <Button className="bg-red-500 mb-2 mt-5 ml-4" onClick={handleOpenLotNo}>+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-2xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-1xl pb-1 text-center mt-2'>RCN Peeling Entry Form</p></DialogTitle>

                            </DialogHeader>

                            <PeelingInitial props={lotdata} />
                        </DialogContent>
                    </Dialog>


                    {checkpending('Humidifier') &&  <Button className="bg-orange-400 mb-2 ml-8 responsive-button-adjust" onClick={handleEditFetch}> Pending Edit ({data.EditData})</Button> }

                </div>
                <PeelingTable/>

            </div>
        </div>


    )
}
export default Peeling;