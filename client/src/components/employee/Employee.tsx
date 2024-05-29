
import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'


import Employeecreateform from './Employeecreateform';
import { Button } from "@/components/ui/button";
import EmployeeTable from "./EmployeeTable";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const Employee = () => {
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                <div className="flexbox-header">
                    <div className="flexbox-tile">
                    Employee <br /><p>11000</p>
                    </div>
                   
                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}


                <Dialog>
                    <DialogTrigger>   <Button className="bg-orange-400 mb-2 mt-5 ml-4">+ Add New Employee</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle><p className='text-1xl pb-2 text-center mt-5'>Employee Entry Form</p></DialogTitle>
                            <DialogDescription>
                            <p className='text-1xl text-center'>To Be Filled Up By Admin</p> 
                            </DialogDescription>
                        </DialogHeader>

                        <Employeecreateform/>
                    </DialogContent>
                </Dialog>

                <div>

                </div>
                <EmployeeTable/>

            </div>
        </div>


    )
}
export default Employee;