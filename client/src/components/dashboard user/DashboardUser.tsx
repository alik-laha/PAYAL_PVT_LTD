
import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'


import Employeecreateform from './Employeecreateform';
import { Button } from "@/components/ui/button";
import EmployeeTable from "./EmployeeTable";
import {
    Dialog,
    DialogContent,
    
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
                    User<br /><p>1100</p>
                    </div>
                    
                   
                    
                   
                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}


                <Dialog>
                    <DialogTrigger>   <Button className="bg-orange-400 mb-2 mt-5 ml-4">+ Add New User</Button></DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle><p className='text-1xl pb-1 text-center mt-5'>New User Creation</p></DialogTitle>
                       
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