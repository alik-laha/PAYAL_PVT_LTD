
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
                <div className="flexbox-header">
                    <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-300">
                        Active Employee<br /><p>{data.Data}</p>
                    </div>
                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}


                <Dialog >
                    <DialogTrigger>   <Button className="bg-blue-400 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left">+ Add New Employee</Button></DialogTrigger>
                    <DialogContent className='max-w-2xl'>
                        <DialogHeader>
                            <DialogTitle><p className='text-1xl text-center mt-2'>Employee Details</p></DialogTitle>
                       
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