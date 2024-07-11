// import {
//     Menubar,
//     MenubarMenu,
//     MenubarSeparator,
//     MenubarTrigger,
// } from "@/components/ui/menubar"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
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
                        <DialogTitle><p className='text-1xl text-center mt-5'>Grading Cleaning Report</p></DialogTitle>
                        <DialogDescription>
                            <p className='text-1xl text-center'>To Be Filled Up By Cleaning Supervisor</p>
                        </DialogDescription>
                    </DialogHeader>

                    <GraddingMaintenanceCreate />
                </DialogContent>
            </Dialog>
            <GraddingMaintenanceTable />
        </div>
    )
}
export default GraddingMaintenance