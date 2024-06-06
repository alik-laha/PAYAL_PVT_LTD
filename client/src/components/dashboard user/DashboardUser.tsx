
import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'


import DashboardUserEntryForm from './DashboardUserEntryForm';
import { Button } from "@/components/ui/button";
import DashboardTable from "./DashboardTable";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import UseQueryData from '../common/dataFetcher';

import Loader from '../common/Loader';


const DashboardUser = () => {
    const { data, error, isLoading } = UseQueryData('/api/user/totaluserCount', 'GET', 'totaluserCount')
    if (isLoading) {
        return <Loader/>
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
                    <div className="flexbox-tile bg-red-500 hover:bg-red-600">
                        User<br /><p>{data.count}</p>
                    </div>




                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}


                <Dialog>
                    <DialogTrigger>   <Button className="bg-orange-400 mb-2 mt-5 ml-4">+ Add New User</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle><p className='text-1xl pb-1 text-center mt-5'>New User Creation</p></DialogTitle>
                            <DialogDescription>
                                <p className='text-1xl text-center'>To Be Filled Up By Director</p>
                            </DialogDescription>
                        </DialogHeader>

                        <DashboardUserEntryForm />
                    </DialogContent>
                </Dialog>

                <div>

                </div>
                <DashboardTable />

            </div>
        </div>


    )
}
export default DashboardUser;