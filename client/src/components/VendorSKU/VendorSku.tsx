
import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'


import { Button } from "@/components/ui/button";
import Loader from '../common/Loader';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import UseQueryData from '../common/dataFetcher';
import VendorCreateForm from './VendorCreateForm';
import SKUCreateForm from './SKUCreateForm';
import VendorSKUTable from './VendorSKUTable';
import { SKUSection } from '../common/exportData';




const VendorSKU = () => {
    const { data, error, isLoading } = UseQueryData('/api/vendorSKU/SKUVendorCount', 'GET', 'getTotalSKUVendor')
    if (isLoading) {
        return <Loader/>
    }
    if (error) {
        return <div>Error</div>
    }
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                <div className="flexbox-header">
                <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
                         Section <br /><p>{SKUSection.length}</p>
                    </div>
                    <div className="flexbox-tile bg-red-500 hover:bg-red-400">
                        Item/SKU<br /><p>{data.SKU}</p>
                    </div>
                  
                    <div className="flexbox-tile bg-cyan-500 hover:bg-cyan-400">
                         Vendor/Party <br /><p>{data.Vendor}</p>
                    </div>
                   
                </div>
              

                <p className='text-lg text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold'>SKU & VENDOR</p>
         

                <Dialog>
                    <DialogTrigger>   <Button className="bg-lime-500 w-28 mb-2 mt-5 ml-6 responsive-button-adjust no-margin-left drop-shadow-md">+ Add SKU</Button></DialogTrigger>
                    <DialogContent className='max-w-2xl'>
                        <DialogHeader>
                            <DialogTitle><p className='text-lg text-gray-600 text-center pt-4 tracking-wider drop-shadow-xl font-bold'>New SKU Creation</p></DialogTitle>
                            <DialogDescription>
                                <p className='text-1xl text-center pb-4'>To Be Filled Up By Admin</p>
                            </DialogDescription>
                        </DialogHeader>

                        <SKUCreateForm/>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger>   <Button className="bg-slate-500 w-28 mb-2 mt-5 ml-8 r no-margin-left responsive-button-adjust drop-shadow-md">+ Add Vendor</Button></DialogTrigger>
                    <DialogContent className='max-w-2xl'>
                        <DialogHeader>
                            <DialogTitle><p className='text-lg text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold'>New Vendor Creation</p></DialogTitle>
                            <DialogDescription>
                                <p className='text-1xl text-center'>To Be Filled Up By Admin</p>
                            </DialogDescription>
                        </DialogHeader>

                        <VendorCreateForm/>
                    </DialogContent>
                </Dialog>

               
                <VendorSKUTable/>
            </div>
        </div>


    )
}
export default VendorSKU;