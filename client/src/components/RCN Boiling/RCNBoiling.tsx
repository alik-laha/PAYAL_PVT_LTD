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
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import UseQueryData from "../common/dataFetcher";
import { PermissionRole } from "@/type/type";
import { useContext, useEffect } from 'react';
import Context from '../context/context';
import axios from 'axios';
import Loader from '../common/Loader';
import { FY, pendingCheckRole } from '../common/exportData';
import {pendingCheckRoles} from  "@/type/type";
import { MdPendingActions } from 'react-icons/md';

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
                <div className="flexbox-header mx-2">
                <div className="flexbox-tile bg-red-500 hover:bg-red-400">
                    <p>A</p><br /><p>{data.data[0].totalA ? (parseFloat(data.data[0].totalA)/80).toFixed(2) : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-slate-400 hover:bg-slate-500">
                    <p>B</p><br /><p>{data.data[0].totalB ? (parseFloat(data.data[0].totalB)/80).toFixed(2) : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-blue-500 hover:bg-blue-400">
                    <p>C</p><br /><p>{data.data[0].totalC ? (parseFloat(data.data[0].totalC)/80).toFixed(2) : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-purple-500 hover:bg-purple-400">
                    <p>D</p><br /><p>{data.data[0].totalD ? (parseFloat(data.data[0].totalD)/80).toFixed(2) : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-green-500 hover:bg-green-400">
                    <p>E</p><br /><p>{data.data[0].totalE ? (parseFloat(data.data[0].totalE)/80).toFixed(2) : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
                    <p>F</p><br /><p>{data.data[0].totalF ? (parseFloat(data.data[0].totalF)/80).toFixed(2) : 0} Bag</p>
                    </div>
                    <div className="flexbox-tile bg-violet-500 hover:bg-violet-400">
                    <p>G</p><br /><p>{data.data[0].totalG ? (parseFloat(data.data[0].totalG)/80).toFixed(2) : 0} Bag</p>
                    </div>
                    

                </div>
                <p className='md:text-lg md:mt-0 mt-2 text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold text-md '>CURRENT  F.Y. {FY} REPORT (BOILING)</p>
                
                
                <div>
                <Dialog>
                    <DialogTrigger>   <Button className="w-40 bg-gradient-to-r from-blue-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md">+ Add New Entry</Button></DialogTrigger>
                    <DialogContent style={{display:'block'}} className='max-w-screen'>
                        <DialogHeader>
                            <DialogTitle><p className='text-lg text-gray-600 text-center tracking-wider drop-shadow-xl font-bold'>RCN Boiling Entry Form</p></DialogTitle>
                            
                        </DialogHeader>

                        <RCNBoilingEntryForm />
                    </DialogContent>
                </Dialog>

                {/* {checkpending('Boiling') && <Button className="bg-orange-400 mb-2 ml-8 responsive-button-adjust drop-shadow-md" onClick={handleEditFetch} disabled={data.EditData===0?true:false}> Pending Edit ({data.EditData})</Button>} */}


                {checkpending('Boiling') && (data?.EditData ?? 0) > 0 &&<Drawer>
            <DrawerTrigger asChild >
                        <div className="relative inline-block ml-4 top-1 responsive-button-adjust">
                            <Button
                                className="w-40 bg-gradient-to-r from-orange-400 to-red-200 hover:from-red-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md "
                                /* FIX 1: Use ?? 0 for the disabled prop */
                                disabled={(data?.EditData ?? 0) === 0}
                                onClick={handleEditFetch}
                            >
                                <div className="flex items-center gap-2">
                                    <MdPendingActions size={18} />
                                    Pending Actions
                                </div>
                            </Button>

                            {/* FIX 2: Use ?? 0 for the badge display condition and value */}
                            {(data?.EditData ?? 0) > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center transform scale-90 origin-center animate-pulse shadow-lg ring-2 ring-white dark:ring-gray-800">
                                    {data?.EditData ?? 0}
                                </span>
                            )}
                        </div>
                        </DrawerTrigger>
                          <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Pending Actions</DrawerTitle>
                <DrawerDescription>Approve Or Reject Modify Request</DrawerDescription>
              </DrawerHeader>
              <div className='mx-5'>   <RCNBoilingTable props='edit' /></div>
              <DrawerFooter>

                <DrawerClose asChild>
                  <Button className="w-28 md:w-40 bg-gradient-to-r from-red-600 to-rose-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md"
                   >Close</Button>
                </DrawerClose>
              </DrawerFooter>

            </DrawerContent>
             </Drawer>}
               
                  
                </div>
                <RCNBoilingTable props='non-edit'/>

            </div>
        </div>


    )
}
export default RCNBoiling;