
import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'


import Employeecreateform from './Employeecreateform';
import { Button } from "@/components/ui/button";
import EmployeeTable from "./EmployeeTable";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogHeader,

    DialogTrigger,
} from "@/components/ui/dialog"
import UseQueryData from '../common/dataFetcher';
import Loader from '../common/Loader';

const Employee = () => {
    const { data, error, isLoading } = UseQueryData('/api/employee/activeEmployeeCount', 'GET', 'EmployeeCount')
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
                    <div className="flexbox-tile bg-blue-400 hover:bg-blue-300">
                        <p>Active</p><br /><p>{data.Data}</p>
                    </div>
                    <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
                        <p>Resigned</p><br /><p>{data.ResignData}</p>
                    </div>
                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}

               
                <Dialog >
                    <DialogTrigger>   <Button className="w-40 bg-gradient-to-r from-blue-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md">+ Add Employee</Button></DialogTrigger>
                    <DialogContent className='max-w-5xl max-h-screen overflow-auto'>
                        <DialogHeader>
                            <DialogTitle><p className='text-lg text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold uppercase'>Employee Details</p></DialogTitle>
                       
                        </DialogHeader>

                        <Employeecreateform />
                    </DialogContent>
                </Dialog>

                <div>

                </div>
                <EmployeeTable />

            </div>
        </div>


    )
}
export default Employee;