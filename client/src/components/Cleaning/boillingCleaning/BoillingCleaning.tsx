import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import BoillingMaintenanceCreate from "./boillingCleaningCreate"
import BoillingMaintenanceTable from "./boillingCleaningTable"


const BoillingMaintenance = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger>   <Button className="bg-red-400 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left">+ Add Clean Report</Button></DialogTrigger>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        {/* <DialogTitle><p className='text-1xl text-center mt-5'>Boilling Maintenance Entry Form</p></DialogTitle>
                        <DialogDescription>
                            <p className='text-1xl text-center'>To Be Filled Up By Maintenance Supervisor</p>
                        </DialogDescription> */}
                    </DialogHeader>

                    <BoillingMaintenanceCreate />
                </DialogContent>
            </Dialog>
            <BoillingMaintenanceTable />
        </div>
    )
}
export default BoillingMaintenance