
import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'


import RcnPrimaryEntryForm from "./RcnPrimaryEntryForm";
import { Button } from "@/components/ui/button";
import RcnPrimaryEntryTable from "./RcnPrimaryEntryTable";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

const RcnPrimaryEntry = () => {
    return (
        <div>
        <DashboardHeader/>
        <DashboardSidebar/>
        <div className='dashboard-main-container'>
        <div className="flexbox-header">
                <div className="flexbox-tile">
                    Ghana <br /><p>1100 Kg</p>
                </div>
                <div className="flexbox-tile">
                    Nizeria <br /><p>5000 Kg</p>
                </div>
                <div className="flexbox-tile">
                    Tanzania<br /><p>5000 Kg</p>
                </div>
                <div className="flexbox-tile">
                    IVC<br /><p>1000 Kg</p>
                </div>
                <div className="flexbox-tile">
                    Origin5<br /><p>1340 Kg</p>
                </div>
                <div className="flexbox-tile">
                    Origin6<br /><p>987 Kg</p>
                </div>
            </div>
            {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}
          

                <Dialog>
                    <DialogTrigger>   <Button className="bg-orange-400 mb-2 mt-5 ml-4">+ Add New Entry</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>RCN Primary Entry Form</DialogTitle>
                            <DialogDescription>
                                Enter RCN Receiving Data Carefully
                            </DialogDescription>
                        </DialogHeader>

                        <RcnPrimaryEntryForm />
                    </DialogContent>
                </Dialog>

            <div>

            </div>
            <RcnPrimaryEntryTable />
        
        </div>
        </div>
        
    
    )
}
export default RcnPrimaryEntry;