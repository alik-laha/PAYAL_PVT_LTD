import DashboardHeader from "../dashboard/DashboardHeader"
import DashboardSidebar from "../dashboard/DashboardSidebar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import PackagingMetirialReceivingCreateForm from "./packagingMetirialReceivingCreateForm"
import PackageMetrialRecivingTable from "./PackagingMetrialReceivingtable"
import { useContext } from 'react';
import Context from '../context/context';

const PackagingMetirialReceiving = () => {
    const { recevingPackagematerialOverView } = useContext(Context);
    console.log(recevingPackagematerialOverView)
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                <div className="flexbox-header">
                    <div className="flexbox-tile bg-green-500 hover:bg-green-600">
                        Vendor Count<br /><p>{recevingPackagematerialOverView?.vendorName}</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-600">
                        Item(SKU) Count<br /><p>{recevingPackagematerialOverView?.skuData}</p>
                    </div>
                    <div className="flexbox-tile bg-cyan-500 hover:bg-cyan-600">
                        Financial Year Entry <br /><p>{recevingPackagematerialOverView?.packagingMaterial}</p>
                    </div>
                </div>
                <Dialog>
                <DialogTrigger>   <Button className="bg-lime-400 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left">+ Add New Entry</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle><p className='text-1xl pb-1 text-center mt-5'>Packaging Material Receiving Entry</p></DialogTitle>
                        <DialogDescription>
                            <p className='text-1xl text-center'>To Be Filled Up By Receving Supervisor</p>
                        </DialogDescription>
                    </DialogHeader>

                    <PackagingMetirialReceivingCreateForm />
                </DialogContent>
            </Dialog>
            <PackageMetrialRecivingTable />
            </div>
            
        </div>
    )
}
export default PackagingMetirialReceiving