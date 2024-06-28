// import {
//     Menubar,
//     MenubarMenu,
//     MenubarSeparator,
//     MenubarTrigger,
// } from "@/components/ui/menubar"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
} from "@/components/ui/dialog"
import DashboardHeader from "../../dashboard/DashboardHeader"
import DashboardSidebar from "../../dashboard/DashboardSidebar"
import GraddingMaintenanceCreate from "./GraddingMaintenanceCreate"
import { Button } from "@/components/ui/button"


const Maintenance = () => {
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                {/* <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>
                        Gradding
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarSeparator />
                <MenubarMenu>
                    <MenubarTrigger>
                        boilling
                    </MenubarTrigger>
                </MenubarMenu>
                <MenubarSeparator />
            </Menubar> */}
                <Dialog>
                    <DialogTrigger>   <Button className="bg-lime-500 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left">+ Add New Entry</Button></DialogTrigger>
                    <DialogContent className='max-w-2xl'>
                        <DialogHeader>
                            <DialogTitle><p className='text-1xl text-center mt-5'>RCN Primary Entry Form</p></DialogTitle>
                            <DialogDescription>
                                <p className='text-1xl text-center'>To Be Filled Up By Receiving Supervisor</p>
                            </DialogDescription>
                        </DialogHeader>

                        <GraddingMaintenanceCreate />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
export default Maintenance