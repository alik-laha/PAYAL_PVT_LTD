
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
                <div className="flexbox-tile bg-yellow-500 hover:bg-cyan-600">
                         Section <br /><p>{SKUSection.length}</p>
                    </div>
                    <div className="flexbox-tile bg-green-500 hover:bg-green-600">
                        Item/SKU<br /><p>{data.SKU}</p>
                    </div>
                  
                    <div className="flexbox-tile bg-cyan-500 hover:bg-cyan-600">
                         Vendor/Party <br /><p>{data.Vendor}</p>
                    </div>
                   
                </div>
              


         

                <Dialog>
                    <DialogTrigger>   <Button className="bg-orange-400 w-28 mb-2 mt-5 ml-8 responsive-button-adjust no-margin-left">+ Add SKU</Button></DialogTrigger>
                    <DialogContent className='max-w-2xl'>
                        <DialogHeader>
                            <DialogTitle><p className='text-1xl pb-1 text-center mt-5'>New SKU Creation</p></DialogTitle>
                            <DialogDescription>
                                <p className='text-1xl text-center'>To Be Filled Up By Admin</p>
                            </DialogDescription>
                        </DialogHeader>

                        <SKUCreateForm/>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger>   <Button className="bg-red-400 w-28 mb-2 mt-5 ml-8 r no-margin-left responsive-button-adjust">+ Add Vendor</Button></DialogTrigger>
                    <DialogContent className='max-w-2xl'>
                        <DialogHeader>
                            <DialogTitle><p className='text-1xl pb-1 text-center mt-5'>New Vendor Creation</p></DialogTitle>
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