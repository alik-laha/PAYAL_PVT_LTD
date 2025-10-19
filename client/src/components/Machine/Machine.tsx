
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
import MachineTable from './MachineTable';
import MachineCreateForm from './MachineCreateForm'
import UseQueryData from '../common/dataFetcher';




const Machine = () => {
    const { data, error, isLoading } = UseQueryData('/api/asset/activemachinecount', 'GET', 'getTotalActiveAsset')
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
                    <div className="flexbox-tile bg-red-400 hover:bg-red-300">
                        <p>Active</p><br /><p>{data.Data}</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
                      <p>Inactive</p>  <br /><p>{data.inactive}</p>
                    </div>
                    <div className="flexbox-tile bg-cyan-400 hover:bg-cyan-300">
                        <p>Discarded</p> <br /><p>{data.Dicarded}</p>
                    </div>
                </div>
               


                <Dialog>
                    <DialogTrigger>   <Button className="w-40 bg-gradient-to-r from-blue-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md">+ Add New Asset</Button></DialogTrigger>
                    <DialogContent className='max-w-4xl'>
                        <DialogHeader>
                            <DialogTitle><p className='text-lg text-gray-600 text-center pt-4 tracking-wider drop-shadow-xl uppercase font-bold'>New Asset Creation</p></DialogTitle>
                            <DialogDescription>
                                <p className='text-1xl text-center pb-3'>To Be Filled Up By Admin</p>
                            </DialogDescription>
                        </DialogHeader>

                        <MachineCreateForm/>
                    </DialogContent>
                </Dialog>

               
               <MachineTable/>

            </div>
        </div>


    )
}
export default Machine;