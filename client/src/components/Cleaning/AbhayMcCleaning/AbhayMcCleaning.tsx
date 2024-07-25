import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,

} from "@/components/ui/dialog"

import AbhayMcCleaningCreate from "./AbhayMcCleanCreate"
import AbhayMcTable from "./AbhayMcCleanTable"
import { Button } from "@/components/ui/button"



const AbhayMcCleaning = () => {
    return (
        <div >
            <Dialog>
                <DialogTrigger>   <Button className="bg-red-400 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left">+ Add Clean Report</Button></DialogTrigger>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                    </DialogHeader>

                    <AbhayMcCleaningCreate />
                </DialogContent>
            </Dialog>
            <AbhayMcTable />
        </div>
    )
}
export default AbhayMcCleaning