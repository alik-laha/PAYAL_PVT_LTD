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
import UseQueryData from "../common/dataFetcher";
import { SumofAllCuntryData } from "@/type/type";

const RcnPrimaryEntry = () => {
    const { data, error, isLoading } = UseQueryData('/api/rcnprimary/sum', 'GET', 'sumData')
    if (isLoading) {
        return <div>Loading...</div>
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
                    {
                        data.map((item: SumofAllCuntryData) => {
                            return (
                                <div className="flexbox-tile" key={item.origin}>
                                    {item.origin} <br /><p>{item.totalBags} Bag</p>
                                </div>
                            )
                        })
                    }

                </div>

                <Dialog>
                    <DialogTrigger>   <Button className="bg-orange-400 mb-2 mt-5 ml-4">+ Add New Entry</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle><p className='text-1xl pb-2 text-center mt-5'>RCN Primary Entry Form</p></DialogTitle>
                            <DialogDescription>
                                <p className='text-1xl text-center'>To Be Filled Up By RCN Accountant</p>
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