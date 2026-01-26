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
import { FY, pendingCheckRole } from "../common/exportData";
import OrderCreateForm from "./OrderCreateForm";
import ProdTransacTable from "./prodTransacTable";
import axios from "axios";
import OrderMappingInitial from "./OrderMappingInitial";
import UseQueryData from "../common/dataFetcher";
import Loader from "../common/Loader";
import { FaHistory } from "react-icons/fa";
import DashboardFooter from "../dashboard/DashboardFooter";


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
        return <Loader />
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
                    <div className="flexbox-header mx-2">
                        <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
                            <p>Total Issued</p> <br /><p>{data.Issued} </p>
                        </div>
                        <div className="flexbox-tile bg-cyan-500 hover:bg-cyan-400">
                            <p>Completed</p> <br /><p>{data.Completed}</p>
                        </div>
                        <div className="flexbox-tile bg-green-500 hover:bg-green-400">
                            <p>Rejected</p><br /><p>{data.Rejected}</p>
                        </div>
                        <div className="flexbox-tile bg-lime-500 hover:bg-lime-400">
                            <p>Cancelled</p> <br /><p>{data.Cancelled} </p>
                        </div>


                        <div className="flexbox-tile bg-purple-500 hover:bg-purple-400">
                            <p>Pending Approval</p><br /><p>{data.PendingApproval} </p>
                        </div>
                        <div className="flexbox-tile bg-red-500 hover:bg-red-400">
                            <p>Pending Mapping</p> <br /><p>{data.PendingMapping} </p>
                        </div>

                        <div className="flexbox-tile bg-violet-500 hover:bg-violet-400">
                            <p>Pending Packing</p><br /><p>{data.PendingPacking} </p>
                        </div>


                    </div>
                    <p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold '>CURRENT F.Y. {FY} ORDER COUNT</p>
                    <div className="flex flex-row-reverse">

                    </div>
                    <div>
                        {checkpending('OrderCreate') && <Dialog>
                            <DialogTrigger>   <Button className="md:w-40 w-28 bg-gradient-to-r from-blue-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md" >+ Sales order</Button></DialogTrigger>
                            <DialogContent className='max-w-7xl' style={{ display: 'block' }}>
                                <DialogHeader>
                                    <DialogTitle><p className='text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold'>Sales Order Create Form</p></DialogTitle>

                                </DialogHeader>

                                <OrderCreateForm />
                            </DialogContent>
                        </Dialog>}

                        {checkpending('OrderMapping') && <div className="relative inline-block ml-4 responsive-button-adjust"> <Dialog>
                            <DialogTrigger>

                                <Button
                                    className="w-28 md:w-40 bg-gradient-to-r from-purple-500 to-lime-500 hover:from-purple-600 hover:to-lime-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md "
                                    /* FIX 1: Use ?? 0 for the disabled prop */

                                    onClick={handleOpenMapping}
                                >+ Map Order</Button>



                            </DialogTrigger>
                            <DialogContent className='max-w-6xl' style={{ display: 'block' }}>
                                <DialogHeader>
                                    <DialogTitle><p className='text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold'>Order Mapping Form</p></DialogTitle>

                                </DialogHeader>

                                <OrderMappingInitial props={mappeddata} />
                            </DialogContent>
                        </Dialog></div>
                        }

                        {checkpending('StockUpdate') && <div className="relative inline-block ml-4 responsive-button-adjust">

                            <Button className="w-28 md:w-40 bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-600 hover:to-red-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md"
                                disabled={loading} onClick={handleProdStockUpdateFetch} >  {loading ? 'Updating...' : 'Update Stock'} <RxUpdate size={20} className="ml-2" /></Button>
                        </div>

                        }

                        {checkpending('StockUpdate') && <div className="relative inline-block ml-4 responsive-button-adjust">

                            <Button className="w-28 md:w-40 bg-gradient-to-r from-stone-500 to-black-500 hover:from-stone-600 hover:to-black-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md" onClick={handleTransferFetch}> {stocktable === 'block' ? 'Order History ' : ' Stock History'}<FaHistory size={16} className='ml-2'/></Button>
                        </div>}
                    </div>


               


                    <div style={{ display: stocktable }}>
                        <ProdStockTable />
                    </div>
                    <div style={{ display: transactable }}>
                        <ProdTransacTable />
                    </div>


                </div>
                <DashboardFooter/>
            </div>
        </>
    )

}

export default Packing;