import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { pendingCheckRoles, PermissionRole, rcvCheckRoles } from "@/type/type";
import { pendingCheckRole, rcvCheckRole } from "../common/exportData";
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
    const { data, isLoading, error } = UseQueryData('/api/issue/sumofallIssueUnit', 'GET', 'AllSectionIssueSum');
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
                                    {item.sectionunit} <br /><p>{item.count} </p>
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

                </div>
             <QCWaterTable/>
                </div>
            </div>

        </>
    )

}

export default QCWater;