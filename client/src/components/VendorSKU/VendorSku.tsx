
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
import DashboardFooter from '../dashboard/DashboardFooter';




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
                <div className="flexbox-header mx-2">
                <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
                       <p>Section</p>  <br /><p>{SKUSection.length}</p>
                    </div>
                    <div className="flexbox-tile bg-red-500 hover:bg-red-400">
                       <p>Item/SKU</p> <br /><p>{data.SKU}</p>
                    </div>
                  
                    <div className="flexbox-tile bg-cyan-500 hover:bg-cyan-400">
                        <p>Vendor/Party</p>  <br /><p>{data.Vendor}</p>
                    </div>
                   
                </div>
              

                <p className='md:text-lg md:mt-0 mt-2 text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold text-md '>SKU & VENDOR</p>
         

                
                <Dialog>
                   <DialogTrigger> <Button
                            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-orane-500 hover:from-orange-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 px-5 py-2.5 text-sm mt-5 ml-2 mb-2 responsive-button-adjust w-40"
                        >
                            <span className="text-lg font-bold">+</span> Add Vendor
                        </Button></DialogTrigger>
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
                <Dialog>
                   <DialogTrigger> <Button
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 px-5 py-2.5 text-sm mt-5 ml-6 mb-2 responsive-button-adjust w-40"
                        >
                            <span className="text-lg font-bold">+</span> Add SKU
                        </Button></DialogTrigger>
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

               
                <VendorSKUTable/>
            </div>
            <DashboardFooter/>
        </div>


    )
}
export default VendorSKU;