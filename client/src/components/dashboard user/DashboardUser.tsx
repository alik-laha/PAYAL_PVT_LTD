
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
import DashboardFooter from '../dashboard/DashboardFooter';


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
                <div className="flexbox-header mx-2">
                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                      <p>Total</p> <br /><p>{data.count}</p>
                    </div>

                    <div className="flexbox-tile bg-cyan-500 hover:bg-cyan-400">
                      <p>Admin</p> <br /><p>{data.adminRoleCount}</p>
                    </div>

                    <div className="flexbox-tile bg-red-500 hover:bg-red-400">
                      <p>Gatepass</p> <br /><p>{data.gatepassCount}</p>
                    </div>

                     <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
                      <p>Logistics</p> <br /><p>{data.receivingRoleCount}</p>
                    </div>

                     <div className="flexbox-tile bg-green-500 hover:bg-green-400">
                      <p>Production</p> <br /><p>{data.prodRoleCount}</p>
                    </div>

                    <div className="flexbox-tile bg-purple-500 hover:bg-purple-400">
                      <p>Quality</p> <br /><p>{data.QCCount}</p>
                    </div>




                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}
               

                <Dialog>
                    <DialogTrigger>   <Button className="w-40 bg-gradient-to-r from-blue-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md">+ Add User</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle><p className='text-lg text-gray-600 text-center pt-4 tracking-wider drop-shadow-xl font-bold'>New User Creation</p></DialogTitle>
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
            <DashboardFooter/>
        </div>


    )
}
export default DashboardUser;