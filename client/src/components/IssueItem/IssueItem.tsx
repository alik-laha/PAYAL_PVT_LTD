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
import { useContext, useState } from "react";
import Context from "../context/context";
import Loader from "../common/Loader";
import UseQueryData from "../common/dataFetcher";
import IssueCreateForm from "./IssueCreate";
import IssueTable from "./IssueTable";
import { RxUpdate } from "react-icons/rx";
import { LuDownload } from "react-icons/lu";

const IssueItem = () => {

    const [loading, setLoading] = useState(false);
    const { setEditPendiningIssueItemData } = useContext(Context)
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
    const checkreceiving = (tab: string) => {
        //console.log(Role)
        if (rcvCheckRole[tab as keyof rcvCheckRoles].includes(Role)) {
            return true
        }
        else {
            return false;
        }

    }

    const handleEditFetch = async () => {
        axios.get('/api/issue/getPendingIssueData')
            .then(res => {
                setEditPendiningIssueItemData(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const exportToExcel = async () => {
        axios.get('/api/vendorSKU/skuexceldata')
    }

    const handleStockUpdateFetch = async () => {

       setLoading(true);
        try {
            const response = await fetch('/api/issue/update-stock', {
                method: 'POST',
            });
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            alert('Failed to update stock.');
        } finally {
            setLoading(false);
        }
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
                <p className='text-lg font-semibold text-center py-1 '>ITEM ISSUE</p>
                <div>
                {checkreceiving('StorePrimaryEntry') && <Dialog>
                        <DialogTrigger disabled= {data.EditData>0?true:false}>   <Button className="bg-red-500 mb-2 mt-5 ml-4 responsive-button-adjust" disabled= {data.EditData>0?true:false}>+ Add New Entry</Button></DialogTrigger>
                        <DialogContent className='max-w-4xl' style={{display:'block'}}>
                            <DialogHeader>
                                <DialogTitle><p className='text-1xl pb-1 text-center mt-5'>Item Issue Form</p></DialogTitle>

                            </DialogHeader>

                            <IssueCreateForm />
                        </DialogContent>
                    </Dialog>}


                    {checkpending('RCNPrimary') && <Button className="bg-orange-400 mb-2 ml-8 responsive-button-adjust" onClick={handleEditFetch} disabled={data.EditData===0?true:false}> Pending Edit ({data.EditData})</Button>}
                    
                    <Button className="bg-orange-400 mb-2 ml-8 responsive-button-adjust" 
                    disabled={loading} onClick={handleStockUpdateFetch} >  {loading ? 'Updating...' : 'Update Stock'} <RxUpdate size={20} className="ml-2"/></Button>

                    <span className="mb-2 ml-8 responsive-button-adjust"><Button className="bg-green-700 h-8 mt-4 w-30 text-sm  mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>
                
                </div>
             <IssueTable/>
                </div>
            </div>

        </>
    )

}

export default IssueItem;