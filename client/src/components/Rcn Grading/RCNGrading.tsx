
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


const RcnGrading = () => {

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
    const handleEditFetch = async () => {
        axios.get('/api/gradding/getPendingData')
            .then(res => {
                setEditPendiningGrinderData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                <div className="flexbox-header">
                    <div className="flexbox-tile bg-red-500 hover:bg-orange-400">
                        A <br /><p>11000 Bag</p>
                    </div>
                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                        B <br /><p>11000 Bag</p>
                    </div>
                    <div className="flexbox-tile bg-blue-500 hover:bg-orange-400">
                        C <br /><p>1000 Bag</p>
                    </div>
                    <div className="flexbox-tile bg-sky-500 hover:bg-orange-400">
                        D <br /><p>9000 Bag</p>
                    </div>
                    <div className="flexbox-tile bg-green-500 hover:bg-orange-400">
                        E <br /><p>9000 Bag</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-orange-400">
                        F <br /><p>9000 Bag</p>
                    </div>
                    <div className="flexbox-tile bg-violet-500 hover:bg-orange-400">
                        G <br /><p>9000 Bag</p>
                    </div>




                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}

                <div className="lex justify-center items-center">
                    <Dialog>
                        <DialogTrigger>   <Button className="bg-red-400 mb-2 mt-5 ml-4">+ Grading Entry</Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle><p className='text-1xl pb-1 text-center mt-5'>Grading Entry</p></DialogTitle>

                            </DialogHeader>

                            <RcnGradingCreateForm />
                        </DialogContent>
                    </Dialog>


                    <Button className="bg-orange-400 mb-2 ml-8 responsive-button-adjust" onClick={handleEditFetch}> Pending Edit 0</Button>

                </div>
                <RcnGradingTable />

            </div>
        </div>


    )
}
export default RcnGrading;