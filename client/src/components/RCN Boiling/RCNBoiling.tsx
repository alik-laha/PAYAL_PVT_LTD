import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'
import RCNBoilingEntryForm  from "./RCNBoilingEntryForm";
import { Button } from "@/components/ui/button";
import RCNBoilingTable from "./RCNBoilingTable";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import UseQueryData from "../common/dataFetcher";
import { PermissionRole } from "@/type/type";
import { useContext, useEffect } from 'react';
import Context from '../context/context';
import axios from 'axios';
import Loader from '../common/Loader';
import { FY, pendingCheckRole } from '../common/exportData';
import {pendingCheckRoles} from  "@/type/type";

const RCNBoiling = () => {
    const { setEditPendingBoilingData } = useContext(Context);
    const Role = localStorage.getItem('role') as keyof PermissionRole

    const handleEditFetch = async () => {
        const Data = await axios.get('/api/boiling/geteditpendingboiling');
        console.log(Data)
        setEditPendingBoilingData(Data.data.data);
        //console.log(editPendingBoilingData)
    };

    const checkpending = ( tab: string ) => { 
        //console.log(Role)
        if (pendingCheckRole[tab as keyof pendingCheckRoles].includes(Role)) {
            return true
        }
        else{
            return false;
        }
       
    }

    const { setAllMachines} = useContext(Context)
    const { setAllNewMachines} = useContext(Context)
    useEffect(() => {
        axios.get('/api/asset/getMachineByType/Boiling')
            .then(res => {
                //console.log(res.data)
                setAllMachines(res.data)
            })
            .catch(err => {
                console.log(err)
            })            
    }, [])
    
    useEffect(() => {
        axios.get('/api/asset/getMachineByType/Scooping')
        .then(res => {
            //console.log(res.data)
            setAllNewMachines(res.data)
          
        })
        .catch(err => {
            console.log(err)
        })   
    }, [])

 
    const { data, isLoading, error } = UseQueryData('/api/boiling/sumofallboil', 'GET', 'AllBoilingSum');

    if (isLoading) {
        return <Loader />
    }
    if (error) {
        return <div>Error</div>;
    }
    //console.log(data)
    return (
        <div>
            <DashboardHeader />
            
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                <div className="flexbox-header">
                <div className="flexbox-tile bg-red-500 hover:bg-red-400">
                    A<br /><p>{data.data[0].totalA ? (parseFloat(data.data[0].totalA)/80).toFixed(2) : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-slate-400 hover:bg-slate-500">
                    B<br /><p>{data.data[0].totalB ? (parseFloat(data.data[0].totalB)/80).toFixed(2) : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-blue-500 hover:bg-blue-400">
                    C<br /><p>{data.data[0].totalC ? (parseFloat(data.data[0].totalC)/80).toFixed(2) : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-purple-500 hover:bg-purple-400">
                    D<br /><p>{data.data[0].totalD ? (parseFloat(data.data[0].totalD)/80).toFixed(2) : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-green-500 hover:bg-green-400">
                    E<br /><p>{data.data[0].totalE ? (parseFloat(data.data[0].totalE)/80).toFixed(2) : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
                    F<br /><p>{data.data[0].totalF ? (parseFloat(data.data[0].totalF)/80).toFixed(2) : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-violet-500 hover:bg-violet-400">
                    G<br /><p>{data.data[0].totalG ? (parseFloat(data.data[0].totalG)/80).toFixed(2) : 0} Bag</p>
                    </div>
                    

                </div>
                <p className='text-lg text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold '>CURRENT  F.Y. {FY} REPORT (BOILING)</p>
                
                
                <div>
                <Dialog>
                    <DialogTrigger>   <Button className="bg-lime-500 mb-2 mt-5 ml-6 responsive-button-adjust drop-shadow-md">+ Add New Entry</Button></DialogTrigger>
                    <DialogContent style={{display:'block'}} className='max-w-screen'>
                        <DialogHeader>
                            <DialogTitle><p className='text-lg text-gray-600 text-center tracking-wider drop-shadow-xl font-bold'>RCN Boiling Entry Form</p></DialogTitle>
                            
                        </DialogHeader>

                        <RCNBoilingEntryForm />
                    </DialogContent>
                </Dialog>

                {checkpending('Boiling') && <Button className="bg-orange-400 mb-2 ml-8 responsive-button-adjust drop-shadow-md" onClick={handleEditFetch} disabled={data.EditData===0?true:false}> Pending Edit ({data.EditData})</Button>}
               
                  
                </div>
                <RCNBoilingTable />

            </div>
        </div>


    )
}
export default RCNBoiling;