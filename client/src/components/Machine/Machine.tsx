
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
                <div className="flexbox-header">
                    <div className="flexbox-tile bg-green-500 hover:bg-green-600">
                        Active Asset<br /><p>{data.Data}</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-600">
                        Inactive Asset<br /><p>{data.inactive}</p>
                    </div>
                    <div className="flexbox-tile bg-cyan-500 hover:bg-cyan-600">
                        Discarded <br /><p>{data.Dicarded}</p>
                    </div>
                </div>
              


                <Dialog>
                    <DialogTrigger>   <Button className="bg-orange-400 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left">+ Add New Asset</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle><p className='text-1xl pb-1 text-center mt-5'>New Machine Creation</p></DialogTitle>
                            <DialogDescription>
                                <p className='text-1xl text-center'>To Be Filled Up By Admin</p>
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