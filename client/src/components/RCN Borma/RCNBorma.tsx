
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


const RCNBorma = () => {

    const { setEditBormaLotWiseData } = useContext(Context)
    const [lotdata, setLotData] = useState<BormapendingLotData[]>([])



    const { data, isLoading, error } = UseQueryData('/api/scooping/sumofallscoop', 'GET', 'AllScoopingSum');
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
                        A <br /><p>{data.data[0].WholesA && data.data[0].BrokenA ? formatNumber(Number(data.data[0].WholesA) + Number(data.data[0].BrokenA)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                        B <br /><p>{data.data[0].WholesB && data.data[0].BrokenB ? formatNumber(Number(data.data[0].WholesB) + Number(data.data[0].BrokenB)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-blue-500 hover:bg-orange-400">
                        C <br /><p>{data.data[0].WholesC && data.data[0].BrokenC ? formatNumber(Number(data.data[0].WholesC) + Number(data.data[0].BrokenC)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-sky-500 hover:bg-orange-400">
                        D <br /><p>{data.data[0].WholesD && data.data[0].BrokenD ? formatNumber(Number(data.data[0].WholesD) + Number(data.data[0].BrokenD)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-green-500 hover:bg-orange-400">
                        E <br /><p>{data.data[0].WholesE && data.data[0].BrokenE ? formatNumber(Number(data.data[0].WholesE) + Number(data.data[0].BrokenE)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-orange-400">
                        F <br /><p>{data.data[0].WholesF && data.data[0].BrokenF ? formatNumber(Number(data.data[0].WholesF) + Number(data.data[0].BrokenF)) : 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-violet-500 hover:bg-orange-400">
                        G <br /><p>{data.data[0].WholesG && data.data[0].BrokenG ? formatNumber(Number(data.data[0].WholesG) + Number(data.data[0].BrokenG)) : 0} Kg</p>
                    </div>





                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}

                <div>
                    <Dialog>
                        <DialogTrigger> <Button className="bg-red-500 mb-2 mt-5 ml-4" onClick={handleOpenLotNo}>+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-2xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-1xl pb-1 text-center mt-2'>RCN Boiling Entry Form</p></DialogTitle>

                            </DialogHeader>

                           
                        </DialogContent>
                    </Dialog>


                    <Button className="bg-orange-400 mb-2 ml-8 responsive-button-adjust" onClick={handleEditFetch}> Pending Edit ({data.EditData})</Button> 

                </div>
                

            </div>
        </div>


    )
}
export default RCNBorma;