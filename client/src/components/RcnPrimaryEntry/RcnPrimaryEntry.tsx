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
import { Skeleton } from "@/components/ui/skeleton"

const RcnPrimaryEntry = () => {
    const { data, error, isLoading } = UseQueryData('/api/rcnprimary/sum', 'GET', 'sumData')
    if (isLoading) {
        return <Skeleton className="w-[100px] h-[20px] rounded-full" />
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
                        data.AllOriginRcnPrimary.map((item: SumofAllCuntryData) => {
                            return (
                                <div className="flexbox-tile bg-blue-600 hover:bg-blue-700" key={item.origin}>
                                    {item.origin} <br /><p>{item.totalBags} Bag</p>
                                </div>
                            )
                        })
                    }

                </div>

                <Dialog>
                    <DialogTrigger>   <Button className="bg-lime-500 mb-2 mt-5 ml-4">+ Add New Entry</Button></DialogTrigger>
                    <DialogContent className='max-w-2xl'>
                        <DialogHeader>
                            <DialogTitle><p className='text-1xl pb-2 text-center mt-5'>RCN Primary Entry Form</p></DialogTitle>
                            <DialogDescription>
                                <p className='text-1xl text-center'>To Be Filled Up By Receiving Supervisor</p>
                            </DialogDescription>
                        </DialogHeader>

                        <RcnPrimaryEntryForm />
                    </DialogContent>
                </Dialog>
                <Button className="bg-orange-400 mb-2 mt-5 ml-8"> Pending Edit ({data.CountPendingEdit})</Button>

                <div>

                </div>
                <RcnPrimaryEntryTable />

            </div>
        </div>


    )
}
export default RcnPrimaryEntry;