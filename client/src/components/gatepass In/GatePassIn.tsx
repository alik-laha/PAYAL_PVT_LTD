
import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'



import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import GatePassCreateForm from './gatepasscreateform';





const GatepassIn = () => {




 
 


 
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                <div className="flexbox-header">
                    <div className="flexbox-tile bg-red-500 hover:bg-orange-400">
                        IN PASS ISSUED <br /><p>5 </p>
                    </div>
                    
                    <div className="flexbox-tile bg-green-500 hover:bg-orange-400">
                       APPROVED <br /><p>3 </p>
                    </div>
                   
                    <div className="flexbox-tile bg-purple-500 hover:bg-orange-400">
                        PENDING APPROVAL <br /><p>2 </p>
                    </div>
                   





                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}

                <div>
                    <Dialog>
                        <DialogTrigger> <Button className="bg-red-500 mb-2 mt-5 ml-4">+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-2xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-1xl pb-1 text-center mt-2'>GatePass Entry Form</p></DialogTitle>

                            </DialogHeader>
                            <GatePassCreateForm/>
                            {/* <RCNBormaCreateForm props={lotdata} /> */}
                        </DialogContent>
                    </Dialog>


                    <Button className="bg-orange-400 mb-2 ml-8 responsive-button-adjust" > Pending Edit (
                        )</Button> 

                </div>
                

            </div>
        </div>


    )
}
export default GatepassIn;