import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
import { Button } from "../ui/button";
import { pendingCheckRoles, PermissionRole} from "@/type/type";
import { pendingCheckRole, QC_Online_Section } from "../common/exportData";
import axios from "axios";
import { useContext, useState } from "react";
import Context from "../context/context";
import Loader from "../common/Loader";
import UseQueryData from "../common/dataFetcher";
import { Label } from "../ui/label";
import QCOnlineBoiler from "./QCOnlineBoiler";
import QCOnlineBoiling from "./QCOnlineBoiling";
import QCOnlineGrading from "./QCOnlineGrading";
import QCOnlineScooping from "./QCOnlineScooping";
import QCOnlineBorma from "./QCOnlineBorma";
//import QCWaterCreate from "./QCWaterCreate";
//import QCWaterTable from "./QCWaterTable";

// import IssueTable from "./IssueTable";

const QCOnline = () => {
    const { setEditPendiningQCWaterData } = useContext(Context)
    const [section,setSection]=useState<string>('')
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
                <p className='text-lg font-semibold text-center py-1 '>QC Online Test</p>
                <div>
                <Dialog>
                        <DialogTrigger disabled= {data.EditData>0?true:false}>   <Button className="bg-red-500 mb-2 mt-5 responsive-button-adjust no-margin-left ml-4" disabled= {data.EditData>0?true:false}>+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-3xl' style={{display:'block'}}>
                            <DialogHeader>
                                <DialogTitle><p className='text-1xl pb-1 text-center mt-5'>QC Online Test</p></DialogTitle>

                            </DialogHeader>
                <div className="flex mt-2 px-6 pt-6 pb-3">
                    <Label className="w-2/4 pt-1 ">Section Name</Label>
                    <Select value={section} onValueChange={(value) => setSection(value)} required={true}>
                        <SelectTrigger className="w-2/4 justify-center bg-cyan-100">
                            <SelectValue placeholder="Section Name" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    QC_Online_Section.map((item: any, indx) => {
                                        return (
                                            <SelectItem key={indx} value={item}>
                                                {item}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div> 

                    {section==='BOILER' && <QCOnlineBoiler/>}
                    {section==='BOILING' && <QCOnlineBoiling/>}
                    {section==='GRADING' && <QCOnlineGrading/>}
                    {section==='SCOOPING' && <QCOnlineScooping/>}
                      {section==='BORMA' && <QCOnlineBorma/>}
                            {/* <QCWaterCreate /> */}



                        </DialogContent>
                    </Dialog>
                   


                    {checkpending('QCRCN') && <Button className="bg-orange-400 mb-2 ml-4 responsive-button-adjust" onClick={handleEditFetch} disabled={data.EditData===0?true:false}> Pending Edit ({data.EditData})</Button>}
                   
                </div>
             {/* <QCWaterTable/> */}
                </div>
            </div>

        </>
    )

}

export default QCOnline;