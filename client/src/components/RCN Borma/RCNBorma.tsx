
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
import { BormapendingLotData } from '@/type/type';
import RCNBormaCreateForm from './RCNBormaCreateForm';
import BormaTable from './RCNBormaTable';


const RCNBorma = () => {

    const { setEditBormaLotWiseData } = useContext(Context)
    const [lotdata, setLotData] = useState<BormapendingLotData[]>([])



    const { data, isLoading, error } = UseQueryData('/api/borma/sumofallborma', 'GET', 'AllBormaSum');
    const handleEditFetch = async () => {

        axios.get("/api/scooping/findEditBormaAll").then(res => {
            console.log(res)
            setEditBormaLotWiseData(res.data.scoopingAllEdit)
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
        axios.get('/api/borma/getUnBormaEntry/0').then(res => {
            console.log(res)
            setLotData(res.data.scoopingLot)
        })




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
                    <div className="flexbox-tile bg-red-500 hover:bg-orange-400">
                        India <br /><p>{data.data[0].India ? formatNumber(Number(data.data[0].India))  : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                        Ghana <br /><p>{data.data[0].Ghana? formatNumber(Number(data.data[0].Ghana)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-blue-500 hover:bg-orange-400">
                        Togo <br /><p>{data.data[0].Togo? formatNumber(Number(data.data[0].Togo)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-sky-500 hover:bg-orange-400">
                        Tanzania <br /><p>{data.data[0].Tanzania ? formatNumber(Number(data.data[0].Tanzania)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-green-500 hover:bg-orange-400">
                        Nigeria <br /><p>{data.data[0].Nigeria  ? formatNumber(Number(data.data[0].Nigeria)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-orange-400">
                        Benin <br /><p>{data.data[0].Benin  ?  formatNumber(Number(data.data[0].Benin)): 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-violet-500 hover:bg-orange-400">
                        IVC <br /><p>{data.data[0].IVC ?  formatNumber(Number(data.data[0].IVC)) : 0} Kg</p>
                    </div>





                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}

                <div>
                    <Dialog>
                        <DialogTrigger> <Button className="bg-red-500 mb-2 mt-5 ml-4" onClick={handleOpenLotNo}>+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-2xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-1xl pb-1 text-center mt-2'>RCN Borma Entry Form</p></DialogTitle>

                            </DialogHeader>

                            <RCNBormaCreateForm props={lotdata} />
                        </DialogContent>
                    </Dialog>


                    <Button className="bg-orange-400 mb-2 ml-8 responsive-button-adjust" onClick={handleEditFetch}> Pending Edit ({data.EditData})</Button> 

                </div>
                <BormaTable/>

            </div>
        </div>


    )
}
export default RCNBorma;