
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
import RCNScoopingTable from './RCNScoopingTable';
import RCNScoopingCreateForm from './RCNScoopingCreateForm';
import Context from '../context/context';
import { useContext, useState } from 'react';

import axios from 'axios'
import UseQueryData from '../common/dataFetcher';
import Loader from '../common/Loader';
import { scoopingpendingLotData } from '@/type/type';


const RCNScooping = () => {

    const {  setEditPendiningGrinderData } = useContext(Context)
    const [lotdata, setLotData ]  = useState<scoopingpendingLotData[]>([])



    const { data, isLoading, error } = UseQueryData('/api/scooping/sumofallscoop', 'GET', 'AllScoopingSum');
    const handleEditFetch = async () => {
        axios.get('/api/grading/getPendingData')
            .then(res => {
                setEditPendiningGrinderData(res.data.data)
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
        axios.get('/api/scooping/getUnscoopedEntry/0').then(res=>{
            console.log(res)
            setLotData(res.data.scoopingLot)
        })

            
        

    }
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                <div className="flexbox-header">
                    <div className="flexbox-tile bg-red-500 hover:bg-orange-400">
                        A <br /><p>{data.data[0].WholesA && data.data[0].BrokenA  ? parseFloat(data.data[0].WholesA) + parseFloat(data.data[0].BrokenA ): 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                    B <br /><p>{data.data[0].WholesB && data.data[0].BrokenB  ? parseFloat(data.data[0].WholesB) + parseFloat(data.data[0].BrokenB ): 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-blue-500 hover:bg-orange-400">
                    C <br /><p>{data.data[0].WholesC && data.data[0].BrokenC  ? parseFloat(data.data[0].WholesA) + parseFloat(data.data[0].BrokenC ): 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-sky-500 hover:bg-orange-400">
                    D <br /><p>{data.data[0].WholesD && data.data[0].BrokenD  ? parseFloat(data.data[0].WholesD) + parseFloat(data.data[0].BrokenD ): 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-green-500 hover:bg-orange-400">
                    E <br /><p>{data.data[0].WholesE && data.data[0].BrokenE  ? parseFloat(data.data[0].WholesE) + parseFloat(data.data[0].BrokenE ): 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-orange-400">
                    F <br /><p>{data.data[0].WholesF && data.data[0].BrokenF  ? parseFloat(data.data[0].WholesF) + parseFloat(data.data[0].BrokenF ): 0} Kg</p>
                    </div>
                    <div className="flexbox-tile bg-violet-500 hover:bg-orange-400">
                    G <br /><p>{data.data[0].WholesG && data.data[0].BrokenG  ? parseFloat(data.data[0].WholesG) + parseFloat(data.data[0].BrokenG ): 0} Kg</p>
                    </div>
                  




                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}

                <div>
                    <Dialog>
                        <DialogTrigger> <Button className="bg-red-500 mb-2 mt-5 ml-4" onClick={handleOpenLotNo}>+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-2xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-1xl pb-1 text-center mt-2'>RCN Scooping Entry Form</p></DialogTitle>

                            </DialogHeader>

                            <RCNScoopingCreateForm props={lotdata}/>
                        </DialogContent>
                    </Dialog>


                    <Button className="bg-orange-400 mb-2 ml-8 responsive-button-adjust" onClick={handleEditFetch}> Pending Edit ({data.EditData})</Button>

                </div>
                <RCNScoopingTable />

            </div>
        </div>


    )
}
export default RCNScooping;