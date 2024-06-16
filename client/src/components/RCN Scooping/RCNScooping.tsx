
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
import RcnGradingTable from './RCNGradingTable';
import RcnGradingCreateForm from './RcnGradingCreateForm';
import Context from '../context/context';
import { useContext } from 'react';
import { useEffect } from 'react'
import axios from 'axios'
import UseQueryData from '../common/dataFetcher';
import Loader from '../common/Loader';


const RCNScooping = () => {

    const { setAllMachines, setEditPendiningGrinderData } = useContext(Context)

    useEffect(() => {
        axios.get('/api/asset/getMachineByType/Grading')
            .then(res => {
                console.log(res.data)
                setAllMachines(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    const { data, isLoading, error } = UseQueryData('/api/grading/sumofallgrade', 'GET', 'AllGradingSum');
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
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                <div className="flexbox-header">
                    <div className="flexbox-tile bg-red-500 hover:bg-orange-400">
                        A <br /><p>{data.data[0].totalA ? data.data[0].totalA : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                        B <br /><p>{data.data[0].totalB ? data.data[0].totalB : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-blue-500 hover:bg-orange-400">
                        C <br /><p>{data.data[0].totalC ? data.data[0].totalC : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-sky-500 hover:bg-orange-400">
                        D <br /><p>{data.data[0].totalD ? data.data[0].totalD : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-green-500 hover:bg-orange-400">
                        E <br /><p>{data.data[0].totalE ? data.data[0].totalE : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-orange-400">
                        F <br /><p>{data.data[0].totalF ? data.data[0].totalF : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-violet-500 hover:bg-orange-400">
                        G <br /><p>{data.data[0].totalG ? data.data[0].totalG : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-violet-500 hover:bg-orange-400">
                        Dust <br /><p>{data.data[0].totalDust ? data.data[0].totalDust : 0} Bag</p>
                    </div>




                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}

                <div>
                    <Dialog>
                        <DialogTrigger>   <Button className="bg-red-500 mb-2 mt-5 ml-4">+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-2xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-2xl pb-1 text-center mt-5'>Grading Entry</p></DialogTitle>

                            </DialogHeader>

                            <RcnGradingCreateForm />
                        </DialogContent>
                    </Dialog>


                    <Button className="bg-orange-400 mb-2 ml-8 responsive-button-adjust" onClick={handleEditFetch}> Pending Edit ({data.EditData})</Button>

                </div>
                <RcnGradingTable />

            </div>
        </div>


    )
}
export default RCNScooping;