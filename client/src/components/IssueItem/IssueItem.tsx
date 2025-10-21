import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardSidebar from "../dashboard/DashboardSidebar";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { Button } from "../ui/button";
import { pendingCheckRoles, PermissionRole, rcvCheckRoles } from "@/type/type";
import { FY, pendingCheckRole, rcvCheckRole } from "../common/exportData";
import axios from "axios";
import { useContext, useState } from "react";
import Context from "../context/context";
import Loader from "../common/Loader";
import UseQueryData from "../common/dataFetcher";
import IssueCreateForm from "./IssueCreate";
import IssueTable from "./IssueTable";
import { RxUpdate } from "react-icons/rx";
import { LuDownload } from "react-icons/lu";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { MdPendingActions } from "react-icons/md";

const IssueItem = () => {

    const [loading, setLoading] = useState(false);
    const { setEditPendiningIssueItemData } = useContext(Context)
    const currDate = new Date().toLocaleDateString();
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
    function formatNumber(num: string) {
        return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
    }

    const exportToExcel = async () => {
        const response = await axios.get('/api/vendorSKU/skuexceldata')
        const data1 = await response.data
        let ws
        let transformed: any[] = [];

        transformed = data1.data.map((item: any, idx: number) => ({
            Sl_No: idx + 1,

            Item_Name: item.sku,
            //Receive_GatePass_Qty: formatNumber(item.quantity),
            //Receive_Backlog_Qty: formatNumber(item.thresoldquantity),
            //Total_Receive_Qty: Number(formatNumber(item.thresoldquantity))+Number(formatNumber(item.quantity)),
            Total_Receive_Qty: formatNumber(item.quantity),
            Issue_Qty: item.consumedquantity,
            //Backlog_Qty:(Number(formatNumber(item.thresoldquantity))+Number(formatNumber(item.quantity)))-item.consumedquantity,
            Backlog_Qty: Number(formatNumber(item.quantity)) - item.consumedquantity,
        }));
        // setTransformedData(transformed);
        ws = XLSX.utils.json_to_sheet(transformed);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'Stock_Backlog_' + currDate + '.xlsx');
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

                <div className='dashboard-main-container '>

                    <div className="flexbox-header mx-2">
                        {

                            data.data && data.data.map((item: any, idx: any) => {
                                return (
                                    <div className="flexbox-tile bg-blue-500 hover:bg-blue-400 " key={idx}>
                                        <p>{item.sectionunit}</p> <br /><p>{item.count} </p>
                                    </div>
                                )
                            })

                        }

                    </div>
                    <p className='md:text-lg md:mt-0 mt-2 text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold text-md'>CURRENT FY : {FY} SECTION WISE ISSUE COUNT</p>
                    <div className="w-['90%'] mx-2">
                        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-10 md:-ml-5">

                            {checkreceiving('StorePrimaryEntry') && <Dialog>
                                <DialogTrigger disabled={data.EditData > 0 ? true : false}>   <Button className="md:w-40 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-400 hover:to-red-400 text-white font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 drop-shadow-md" disabled={data.EditData > 0 ? true : false}>+ Add New</Button></DialogTrigger>
                                <DialogContent className='max-w-screen' style={{ display: 'block' }}>
                                    <DialogHeader>
                                        <DialogTitle><p className='text-lg text-gray-600 text-center py-5 tracking-wider drop-shadow-xl font-bold'>Item Issue Form</p></DialogTitle>

                                    </DialogHeader>

                                    <IssueCreateForm />
                                </DialogContent>
                            </Dialog>}



                            {checkpending('RCNPrimary') && data.EditData > 0 && (

                                <Drawer>
                                    <DrawerTrigger asChild >
                                        <div className="relative inline-block  ml-1.5 top-5 ">
                                            <Button
                                                className="md:w-40 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-400 hover:to-green-300 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md "
                                                /* FIX 1: Use ?? 0 for the disabled prop */
                                                disabled={data.EditData === 0}
                                                onClick={handleEditFetch}
                                            >
                                                <div className="flex items-center gap-1">
                                                    <MdPendingActions size={16} />
                                                    Pending
                                                </div>
                                            </Button>

                                            {/* FIX 2: Use ?? 0 for the badge display condition and value */}
                                            {data.EditData > 0 && (
                                                <span className="absolute -top-3 -right-2 md:right-1 bg-red-600 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center transform scale-90 origin-center animate-pulse shadow-lg ring-2 ring-white dark:ring-gray-800">
                                                    {data?.EditData}
                                                </span>
                                            )}
                                        </div>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader>
                                            <DrawerTitle>Pending Actions</DrawerTitle>
                                            <DrawerDescription>Approve Or Reject Modify Request</DrawerDescription>
                                        </DrawerHeader>
                                        <div className='mx-5'>   <IssueTable props='edit' /></div>
                                        <DrawerFooter>

                                            <DrawerClose asChild>
                                                <Button className="w-28 md:w-40 bg-gradient-to-r from-red-600 to-rose-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md"
                                                >Close</Button>
                                            </DrawerClose>
                                        </DrawerFooter>

                                    </DrawerContent>

                                </Drawer>


                            )}




                            <Button className="md:w-40 bg-white text-red-500 hover:bg-gray-400 hover:text-white font-bold rounded-md shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-4 md:ml-1.5 drop-shadow-lg" onClick={exportToExcel}> Stock <LuDownload size={20} className="ml-2" /> </Button>

                            <Button className="md:w-40  bg-white text-green-600 hover:bg-orange-400 hover:text-white font-bold rounded-md shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-4 md:ml-1.5 drop-shadow-md"
                                disabled={loading} onClick={handleStockUpdateFetch} >  {loading ? 'Updating...' : 'Sync'} <RxUpdate size={20} className="ml-2" /></Button>






                        </div>
                    </div>




                    <IssueTable props='non-edit'/>
                </div>
            </div>

        </>
    )

}

export default IssueItem;