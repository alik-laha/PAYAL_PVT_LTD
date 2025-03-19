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

const Packing = () => {

    const [stocktable, setStockTable] = useState<string>('block')
    const [transactable, setTransacTable] = useState<string>('none')
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

    return (
        <>
            <div>

                <DashboardHeader />
                <DashboardSidebar />
                <div className='dashboard-main-container'>
                    <div className="flex flex-row-reverse">
                        <Button className="bg-orange-400 mb-2 mr-8 responsive-button-adjust "
                            disabled={loading} onClick={handleProdStockUpdateFetch} >  {loading ? 'Updating...' : 'Update Stock'} <RxUpdate size={20} className="ml-2" /></Button>
                    </div>
                    <div className="flex text-center">
                        <Button className="bg-blue-400 mb-2 ml-4 responsive-button-adjust no-margin-left" onClick={handleTransferFetch}> {stocktable === 'block' ? 'Order History' : 'Stock History'}</Button>
                        {checkpending('Packing') && <Dialog>
                            <DialogTrigger>   <Button className="bg-red-400 mb-2 ml-4 responsive-button-adjust no-margin-left" >+ New Order</Button></DialogTrigger>
                            <DialogContent className='max-w-6xl' style={{ display: 'block' }}>
                                <DialogHeader>
                                    <DialogTitle><p className='text-1xl pb-1 text-center mt-5'>Purchase Order Create Form</p></DialogTitle>

                                </DialogHeader>

                                <OrderCreateForm />
                            </DialogContent>
                        </Dialog>}
                    </div>

                    <p className='text-lg font-semibold text-center capitalize'>{stocktable === 'block' ? 'PRODUCTION STOCK / ORDER STOCK' : 'ORDER/PACKING TRANSACTION'}</p>





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