import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,

} from "@/components/ui/dialog"

import GraddingMaintenanceCreate from "./GraddingCleaningCreate"
import { Button } from "@/components/ui/button"
import GraddingMaintenanceTable from "./GraddingCleaningTable"


const GraddingMaintenance = () => {
    return (
        <div >
            <Dialog>
                <DialogTrigger>   <Button className="bg-red-400 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left">+ Add Clean Report</Button></DialogTrigger>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                    </DialogHeader>

                    <GraddingMaintenanceCreate />
                </DialogContent>
            </Dialog>
            <GraddingMaintenanceTable />
        </div>
    )
}
export default GraddingMaintenance