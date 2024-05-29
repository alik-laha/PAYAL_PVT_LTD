import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import RcnPrimaryEntryForm from "./RcnPrimaryentryForm";
import { Button } from "@/components/ui/button";
import RcnPrimaryEntryTable from "./RcnPrimaryEntryTable";



const RcnPrimaryEntryMain = () => {
    return (
        <>
            {/* <p className='text-2xl font-semibold text-center drop-shadow-md items-center justify-center '>RCN Entry Dashboard</p> */}
            <div className="flexbox-header">
                <div className="flexbox-tile">
                    Ghana <br /><p>1100</p>
                </div>
                <div className="flexbox-tile">
                    Nizeria <br /><p>5000</p>
                </div>
                <div className="flexbox-tile">
                    Tanzania<br /><p>5000</p>
                </div>
                <div className="flexbox-tile">
                    IVC<br /><p>1000</p>
                </div>
                <div className="flexbox-tile">
                    Origin5<br /><p>1340</p>
                </div>
                <div className="flexbox-tile">
                    Origin6<br /><p>987</p>
                </div>
            </div>
            {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}
            <Popover>
                <PopoverTrigger >
                    <Button className="bg-orange-400 mb-2 mt-5 ml-4">+ Add New Entry</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <RcnPrimaryEntryForm />
                </PopoverContent>

            </Popover>

            <div>

            </div>
            <RcnPrimaryEntryTable />

        </>


    )
}
export default RcnPrimaryEntryMain;