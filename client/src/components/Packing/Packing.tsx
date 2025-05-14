import { useState } from "react";
import { Button } from "../ui/button";
import { RxUpdate } from "react-icons/rx";
import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import ProdStockTable from "./prodStockTable";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { pendingCheckRoles, PermissionRole } from "@/type/type";
import { pendingCheckRole } from "../common/exportData";
import OrderCreateForm from "./OrderCreateForm";
import ProdTransacTable from "./prodTransacTable";
import axios from "axios";
import OrderMappingInitial from "./OrderMappingInitial";
import UseQueryData from "../common/dataFetcher";
import Loader from "../common/Loader";


const Packing = () => {

    const [stocktable, setStockTable] = useState<string>('none')
    const [transactable, setTransacTable] = useState<string>('block')
    const [mappeddata, setMappedData] = useState<any[]>([])
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

    const handleProdStockUpdateFetch = async () => {

        setLoading(true);
        try {
            const response = await fetch('/api/packing/update-prodstock', {
                method: 'POST',
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            alert('Failed to update production stock.');
        } finally {
            setLoading(false);
        }
    }

    const handleOpenMapping = async () => {
            axios.get('/api/packing/getUnMappingEntry/0').then(res => {
                console.log(res)
                setMappedData(res.data.scoopingLot)
                console.log(mappeddata)
            })
        }


    const handleTransferFetch = () => {
        if (stocktable === 'block') {
            setStockTable('none')
            setTransacTable('block')
        }
        else {
            setStockTable('block')
            setTransacTable('none')
        }
    }
    const [loading, setLoading] = useState(false);

    const { data, error, isLoading } = UseQueryData('/api/packing/activeordercount', 'GET', 'getTtotalActvOrder')
    if (isLoading) {
        return <Loader/>
    }
    if (error) {
        return <div>Error</div>
    }

    return (
        <>
            <div>

                <DashboardHeader />
                <DashboardSidebar />
                <div className='dashboard-main-container'>
                <div className="flexbox-header">
                <div className="flexbox-tile bg-yellow-500 hover:bg-orange-400">
                        Total Issued <br /><p>{data.Issued} </p>
                    </div>
                    <div className="flexbox-tile bg-cyan-500 hover:bg-orange-400">
                       Completed<br /><p>{data.Completed}</p>
                    </div>
                    <div className="flexbox-tile bg-green-500 hover:bg-orange-400">
                      Rejected<br /><p>{data.Rejected}</p>
                    </div>
                    <div className="flexbox-tile bg-lime-500 hover:bg-orange-400">
                        Cancelled <br /><p>{data.Cancelled} </p>
                    </div>
                   
                    
                    <div className="flexbox-tile bg-purple-500 hover:bg-orange-400">
                       Pending Approval<br /><p>{data.PendingApproval} </p>
                    </div>
                    <div className="flexbox-tile bg-red-500 hover:bg-orange-400">
                        Pending Mapping<br /><p>{data.PendingMapping} </p>
                    </div>
                    
                    <div className="flexbox-tile bg-purple-500 hover:bg-orange-400">
                       Pending Packing<br /><p>{data.PendingPacking} </p>
                    </div>
                   
                    
                </div>
                <p className='text-lg font-semibold text-center py-1 '>CURRENT F.Y. ORDER COUNT</p>
                    <div className="flex flex-row-reverse">
                        <Button className="bg-orange-600 mb-2 mr-8 responsive-button-adjust "
                            disabled={loading} onClick={handleProdStockUpdateFetch} >  {loading ? 'Updating...' : 'Update Stock'} <RxUpdate size={20} className="ml-2" /></Button>
                    </div>
                    <div className="flex text-center">
                        {checkpending('OrderCreate') && <Dialog>
                            <DialogTrigger>   <Button className="bg-lime-500 mb-2 ml-4 responsive-button-adjust no-margin-left" >+ Sales Order</Button></DialogTrigger>
                            <DialogContent className='max-w-screen' style={{ display: 'block' }}>
                                <DialogHeader>
                                    <DialogTitle><p className='text-1xl pb-1 text-center mt-2'>Sales Order Create Form</p></DialogTitle>

                                </DialogHeader>

                                <OrderCreateForm />
                            </DialogContent>
                        </Dialog>}

                        {checkpending('OrderMapping') && <Dialog>
                            <DialogTrigger>   <Button className="bg-purple-600 mb-2 ml-4 responsive-button-adjust no-margin-left" onClick={handleOpenMapping}>+ Order Mapping</Button></DialogTrigger>
                            <DialogContent className='max-w-7xl' style={{ display: 'block' }}>
                                <DialogHeader>
                                    <DialogTitle><p className='text-1xl pb-3 text-center mt-4'>Order Mapping Form</p></DialogTitle>

                                </DialogHeader>

                                <OrderMappingInitial props={mappeddata}/>
                            </DialogContent>
                        </Dialog>}
                    </div>

                    
                    <div className="flex flex-col">
                        <span className="text-center w-100">            
                            <Button className="bg-gray-600 mb-3 hover:bg-gray-400" onClick={handleTransferFetch}> {stocktable === 'block' ? '< Switch To Order History ' : ' Switch To Stock History >'}</Button>
                        </span>


                        <p className='text-lg font-semibold text-center capitalize'>{stocktable === 'block' ? 'PRODUCTION & ORDER STOCK' : 'ORDER, MAPPING & PACKING'}</p>
                    </div>
                    

                    <div style={{ display: stocktable }}>
                        <ProdStockTable />
                    </div>
                    <div style={{ display: transactable }}>
                        <ProdTransacTable />
                    </div>


                </div>
            </div>
        </>
    )

}

export default Packing;