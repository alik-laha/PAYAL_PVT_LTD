
import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'

import MachineCreateForm from './machineCreateForm';
import { Button } from "@/components/ui/button";
import MachineTable from './MachineTable'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"



const Machine = () => {
    
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                <div className="flexbox-header">
                    <div className="flexbox-tile bg-green-500 hover:bg-red-600">
                        Machine<br /><p>70</p>
                    </div>




                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}


                <Dialog>
                    <DialogTrigger>   <Button className="bg-orange-400 mb-2 mt-5 ml-4">+ Add New Machine</Button></DialogTrigger>
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

                <div>

                </div>
               <MachineTable/>

            </div>
        </div>


    )
}
export default machine;