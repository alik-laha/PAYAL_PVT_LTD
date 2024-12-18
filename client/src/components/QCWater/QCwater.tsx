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
import { pendingCheckRoles, PermissionRole} from "@/type/type";
import { pendingCheckRole } from "../common/exportData";
import axios from "axios";
import { useContext } from "react";
import Context from "../context/context";
import Loader from "../common/Loader";
import UseQueryData from "../common/dataFetcher";
import QCWaterCreate from "./QCWaterCreate";
import QCWaterTable from "./QCWaterTable";

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
        return <Loader />
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
                <div className="flexbox-header">
                    {

                        data.data && data.data.map((item: any,idx:any) => {
                            return (
                                <div className="flexbox-tile bg-cyan-400 hover:bg-cyan-600" key={idx}>
                                    {item.boilertype} <br /><p>{item.count} </p>
                                </div>
                            )
                        })

                    }

                </div>
                <p className='text-lg font-semibold text-center py-1 '>QC Water</p>
                <div>
                <Dialog>
                        <DialogTrigger disabled= {data.EditData>0?true:false}>   <Button className="bg-red-500 mb-2 mt-5 ml-4" disabled= {data.EditData>0?true:false}>+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-3xl' style={{display:'block'}}>
                            <DialogHeader>
                                <DialogTitle><p className='text-1xl pb-1 text-center mt-5'>QC Water</p></DialogTitle>

                            </DialogHeader>

                            <QCWaterCreate />
                        </DialogContent>
                    </Dialog>
                   


                    {checkpending('QCRCN') && <Button className="bg-orange-400 mb-2 ml-8 responsive-button-adjust" onClick={handleEditFetch} disabled={data.EditData===0?true:false}> Pending Edit ({data.EditData})</Button>}
                    <Dialog>
                        <DialogTrigger>   <Button className="bg-blue-500 mb-2 mt-5 ml-8" >Parameters</Button></DialogTrigger>
                        <DialogContent className='max-w-2xl' style={{display:'block'}}>
                            <DialogHeader>
                                <DialogTitle><p className='text-1xl pb-1 text-center mt-5'>Feed Water Parameters</p></DialogTitle>

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
                                <DialogTitle><p className='text-1xl pb-1 text-center mt-3'>Blown Down Water Parameters</p></DialogTitle>

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
             <QCWaterTable/>
                </div>
            </div>

        </>
    )

}

export default QCWater;