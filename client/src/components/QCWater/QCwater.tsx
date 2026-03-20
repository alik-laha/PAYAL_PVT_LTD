import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button";
import { pendingCheckRoles, PermissionRole } from "@/type/type";
import { pendingCheckRole } from "../common/exportData";
import axios from "axios";
import { useContext } from "react";
import Context from "../context/context";
import Loader from "../common/Loader";
import UseQueryData from "../common/dataFetcher";
import QCWaterCreate from "./QCWaterCreate";
import QCWaterTable from "./QCWaterTable";
import DashboardFooter from "../dashboard/DashboardFooter";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { MdPendingActions } from "react-icons/md";

// import IssueTable from "./IssueTable";

const QCWater = () => {
    const { setEditPendiningQCWaterData } = useContext(Context)
    const Role = localStorage.getItem('role') as keyof PermissionRole
    const checkpending = (tab: string) => {

        //console.log(Role)
        if (pendingCheckRole[tab as keyof pendingCheckRoles].includes(Role)) {
            return true
        }
        else {
            return false;
        }

    }


    const handleEditFetch = async () => {
        axios.get('/api/qcWater/getPendingQCWaterData')
            .then(res => {
                setEditPendiningQCWaterData(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const { data, isLoading, error } = UseQueryData('/api/qcWater/sumofallQCWater', 'GET', 'AllBoilerQCWaterSum');
    if (isLoading) {
        return <Loader/>
    }

    if (error) {
        return <div>Error</div>;
    }
    return (
        <>
            <div>
                <DashboardHeader />
                <DashboardSidebar />

                <div className='dashboard-main-container'>
                    <div className="flexbox-header mx-2">
                        {

                            data && data.data && data.data.map((item: any, idx: any) => {
                                return (
                                    <div className="flexbox-tile bg-sky-500 hover:bg-sky-400" key={idx}>
                                        <p>{item.boilertype}</p> <br /><p>{item.count} </p>
                                    </div>
                                )
                            })

                        }

                    </div>
                    <p className='text-lg text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold'>QC WATER READING TRANSACTION</p>
                    <div>
                        <Dialog>
                            <DialogTrigger>   <Button className="w-40 bg-gradient-to-r from-blue-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md">+ Add New Entry</Button></DialogTrigger>
                            <DialogContent className='max-w-7xl' style={{ display: 'block' }}>
                                <DialogHeader>
                                    <DialogTitle><p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>QC Water Entry</p></DialogTitle>

                                </DialogHeader>

                                <QCWaterCreate />
                            </DialogContent>
                        </Dialog>

                        {checkpending('QCRCN') && (data?.EditData ?? 0) > 0 && <Drawer>
                            <DrawerTrigger asChild >
                                <div className="relative inline-block ml-4 top-1 responsive-button-adjust">
                                    <Button
                                        className="w-40 bg-gradient-to-r from-orange-400 to-red-200 hover:from-red-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md "
                                        /* FIX 1: Use ?? 0 for the disabled prop */
                                        disabled={(data?.EditData ?? 0) === 0}
                                        onClick={handleEditFetch}
                                    >
                                        <div className="flex items-center gap-2">
                                            <MdPendingActions size={18} />
                                            Pending Actions
                                        </div>
                                    </Button>

                                    {/* FIX 2: Use ?? 0 for the badge display condition and value */}
                                    {(data?.EditData ?? 0) > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center transform scale-90 origin-center animate-pulse shadow-lg ring-2 ring-white dark:ring-gray-800">
                                            {data?.EditData ?? 0}
                                        </span>
                                    )}
                                </div>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>Pending Actions</DrawerTitle>
                                    <DrawerDescription>Approve Or Reject Modify Request</DrawerDescription>
                                </DrawerHeader>
                                <div className='mx-5'>   <QCWaterTable props='edit' /></div>
                                <DrawerFooter>

                                    <DrawerClose asChild>
                                        <Button className="w-28 md:w-40 bg-gradient-to-r from-red-600 to-rose-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md"
                                        >Close</Button>
                                    </DrawerClose>
                                </DrawerFooter>

                            </DrawerContent>
                        </Drawer>}


                        <Dialog>
                            <DialogTrigger>   <Button className="w-40 bg-gradient-to-r from-purple-500 to-yellow-500 hover:from-purple-600 hover:to-yellow-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left drop-shadow-md">+Parameters</Button></DialogTrigger>
                            <DialogContent className='max-w-2xl' style={{ display: 'block' }}>
                                <DialogHeader>
                                    <DialogTitle><p className='text-lg text-gray-600 text-center my-2 tracking-wider drop-shadow-xl font-bold'>Feed Water Parameters</p></DialogTitle>

                                </DialogHeader>
                                <Table className="mt-4">
                                    <TableHeader className="bg-neutral-100 text-stone-950 ">


                                        <TableHead className="text-center" >Parameter</TableHead>
                                        <TableHead className="text-center" >Standard</TableHead>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-center font-semibold">PH</TableCell>
                                            <TableCell className="text-center">8.5 to 9.5</TableCell>

                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-center font-semibold">TDS</TableCell>
                                            <TableCell className="text-center">Max 300 PPM</TableCell>

                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-center font-semibold">Hardness</TableCell>
                                            <TableCell className="text-center">0 to 5 mg/ltr</TableCell>

                                        </TableRow>


                                    </TableBody>
                                </Table>

                                <DialogHeader>
                                    <DialogTitle><p className='text-lg text-gray-600 text-center pt-5 tracking-wider drop-shadow-xl font-bold'>Blown Down Water Parameters</p></DialogTitle>

                                </DialogHeader>
                                <Table className="mt-4">
                                    <TableHeader className="bg-neutral-100 text-stone-950 ">


                                        <TableHead className="text-center" >Parameter</TableHead>
                                        <TableHead className="text-center" >Standard</TableHead>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-center font-semibold">PH</TableCell>
                                            <TableCell className="text-center">11 to 12</TableCell>

                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-center font-semibold">TDS</TableCell>
                                            <TableCell className="text-center">Max 3000 PPM</TableCell>

                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-center font-semibold">Used Water</TableCell>
                                            <TableCell className="text-center">ltr*100</TableCell>

                                        </TableRow>


                                    </TableBody>
                                </Table>
                            </DialogContent>
                        </Dialog>



                    </div>
                    <QCWaterTable props='non-edit' />
                </div>
                <DashboardFooter />
            </div>

        </>
    )

}

export default QCWater;