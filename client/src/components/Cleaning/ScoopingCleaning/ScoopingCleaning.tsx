import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
} from "@/components/ui/dialog"


import { Button } from "@/components/ui/button"



const GraddingMaintenance = () => {
    return (
        <div >
            <Dialog>
                <DialogTrigger>   <Button className="bg-lime-500 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left">+ Add Gradding Clean Report</Button></DialogTrigger>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle><p className='text-1xl text-center mt-5'>Gradding Maintenance Entry Form</p></DialogTitle>
                        <DialogDescription>
                            <p className='text-1xl text-center'>To Be Filled Up By Maintenance Supervisor</p>
                        </DialogDescription>
                    </DialogHeader>

                    {/* <GraddingMaintenanceCreate /> */}
                </DialogContent>
            </Dialog>
            {/* <GraddingMaintenanceTable /> */}
        </div>
    )
}
export default GraddingMaintenance