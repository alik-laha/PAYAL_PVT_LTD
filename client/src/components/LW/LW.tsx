
import DashboardHeader from '../dashboard/DashboardHeader'
import DashboardSidebar from '../dashboard/DashboardSidebar'
import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import Context from '../context/context';
import { useContext, useState } from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import axios from 'axios'
import UseQueryData from '../common/dataFetcher';
import Loader from '../common/Loader';
import { pendingCheckRoles, PermissionRole } from '@/type/type';
import { FY, pendingCheckRole } from '../common/exportData';
import LWInitial from './LWInitial';
import LWHistoryTable from './LWHistory';
import LWTable from './LWTable';
import { FaHistory } from 'react-icons/fa';
import PendingBacklog from '../common/PendingBacklog';
import { MdPendingActions } from 'react-icons/md';
import DashboardFooter from '../dashboard/DashboardFooter';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const LW = () => {

    const { setEditLWLotWiseData } = useContext(Context)
    const [lotdata, setLotData] = useState<any[]>([])
    const [maintable, setMainTable] = useState<string>('block')
    const [historytable, setHistoryTable] = useState<string>('none')
    const { data, isLoading, error } = UseQueryData('/api/lw/sumofallLW', 'GET', 'AllLWSum');
    const handleEditFetch = async () => {

        axios.get("/api/lw/findEditLWAll").then(res => {
            console.log(res)
            setEditLWLotWiseData(res.data.scoopingAllEdit)
        })
            .catch(err => {
                console.log(err)
            })

    }
    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <div>Error</div>;
    }
    const handleTransferFetch = () => {
        if (maintable === 'block') {
            setMainTable('none')
            setHistoryTable('block')
        }
        else {
            setMainTable('block')
            setHistoryTable('none')
        }
    }
    console.log(data)

    const handleOpenLotNo = async () => {
        axios.get('/api/lw/getUnLWEntry/0').then(res => {
            console.log(res)
            setLotData(res.data.scoopingLot)
            console.log(lotdata)
        })




    }
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

    function formatNumber(num: any) {
        return Number.isInteger(num) ? parseInt(num) : num.toFixed(2);
    }

     const getIssueGrades = () => {
                const row = data?.data?.[0] || {};
            
                const excludeKeys = [
                    "issue_hamsa",
                    "issue_village",
                    "issue_bigTaiho",
                    "issue_rejection",
                  
                    ...Array.from({ length: 10 }, (_, i) => `issue_ext_grade_${i + 1}`),
                    ...Array.from({ length: 10 }, (_, i) => `issue_add_${i + 1}`)
                ];
            
                return Object.entries(row)
                    .filter(([key]) =>
                        key.startsWith("issue_") && !excludeKeys.includes(key)
                    )
                    .map(([key, value]) => ({
                        name: key,
                        value: parseFloat(value as string) || 0
                    }));
            };
            const downloadExcel = () => {
                const grades = getIssueGrades();
            
                const formattedData = grades.map(g => ({
                    Grade: g.name.replace("issue_", "").replace("_", " ").toUpperCase(),
                    Value: g.value
                }));
            
                // Create worksheet
                const worksheet = XLSX.utils.json_to_sheet(formattedData);
            
                // Create workbook
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Issue Grades");
            
                // Generate Excel file
                const excelBuffer = XLSX.write(workbook, {
                    bookType: "xlsx",
                    type: "array",
                });
            
                const blob = new Blob([excelBuffer], {
                    type: "application/octet-stream",
                });
            
                saveAs(blob, "issue_grades.xlsx");
            };
    return (
        <div>
            <DashboardHeader />
            <DashboardSidebar />
            <div className='dashboard-main-container'>
                <div className="flexbox-header mx-2">
                    

                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <div className="flexbox-tile bg-blue-500 hover:bg-blue-400 cursor-pointer">
                    
                    
                                                        <p >Issue Packing</p> <br />

                                                       <p className='underline'>
                            {
                                data.data[0].issue_kw && data.data[0].issue_kw_1 && data.data[0].issue_kw_2 && data.data[0].issue_kn
                                    && data.data[0].issue_dw && data.data[0].issue_dw_1 && data.data[0].issue_dw_2 && data.data[0].issue_ow
                                    && data.data[0].issue_ow_1 && data.data[0].issue_ow_2 && data.data[0].issue_jw && data.data[0].issue_pw
                                    && data.data[0].issue_row && data.data[0].issue_rej_1 && data.data[0].issue_lw3_180 && data.data[0].issue_lw3_210
                                    && data.data[0].issue_lw3_240 && data.data[0].issue_lw3_280 && data.data[0].issue_lw3_360 && data.data[0].issue_lw2
                                    && data.data[0].issue_lw4 && data.data[0].issue_lw5 && data.data[0].issue_lw6 && data.data[0].issue_lw7
                                    && data.data[0].issue_rej_3 && data.data[0].issue_rej_4 && data.data[0].issue_jb2 && data.data[0].issue_sjb
                                    && data.data[0].issue_k_240 && data.data[0].issue_k_280 && data.data[0].issue_k_360 && data.data[0].issue_pkw
                                    && data.data[0].issue_bw && data.data[0].issue_rw && data.data[0].issue_rrw && data.data[0].issue_fw
                                    && data.data[0].issue_lw && data.data[0].issue_ext_grade_1 && data.data[0].issue_ext_grade_2 &&
                                    data.data[0].issue_ext_grade_3 && data.data[0].issue_ext_grade_4 && data.data[0].issue_ext_grade_5 &&
                                    data.data[0].issue_ext_grade_6 && data.data[0].issue_ext_grade_7 && data.data[0].issue_ext_grade_8 &&
                                    data.data[0].issue_ext_grade_9 && data.data[0].issue_ext_grade_10
                                    ? formatNumber(
                                        parseFloat(data.data[0].issue_kw) + parseFloat(data.data[0].issue_kw_1) + parseFloat(data.data[0].issue_kw_2)
                                        + parseFloat(data.data[0].issue_kn) + parseFloat(data.data[0].issue_dw) + parseFloat(data.data[0].issue_dw_1)
                                        + parseFloat(data.data[0].issue_dw_2) + parseFloat(data.data[0].issue_ow) + parseFloat(data.data[0].issue_ow_1)
                                        + parseFloat(data.data[0].issue_ow_2) + parseFloat(data.data[0].issue_jw) + parseFloat(data.data[0].issue_pw)
                                        + parseFloat(data.data[0].issue_row) + parseFloat(data.data[0].issue_rej_1) + parseFloat(data.data[0].issue_lw3_180)
                                        + parseFloat(data.data[0].issue_lw3_210) + parseFloat(data.data[0].issue_lw3_240) + parseFloat(data.data[0].issue_lw3_280)
                                        + parseFloat(data.data[0].issue_lw3_360) + parseFloat(data.data[0].issue_lw2) + parseFloat(data.data[0].issue_lw4)
                                        + parseFloat(data.data[0].issue_lw5) + parseFloat(data.data[0].issue_lw6) + parseFloat(data.data[0].issue_lw7)
                                        + parseFloat(data.data[0].issue_rej_3) + parseFloat(data.data[0].issue_rej_4) + parseFloat(data.data[0].issue_jb2)
                                        + parseFloat(data.data[0].issue_sjb) + parseFloat(data.data[0].issue_k_240) + parseFloat(data.data[0].issue_k_280)
                                        + parseFloat(data.data[0].issue_k_360) + parseFloat(data.data[0].issue_pkw) + parseFloat(data.data[0].issue_bw)
                                        + parseFloat(data.data[0].issue_rw) + parseFloat(data.data[0].issue_rrw) + parseFloat(data.data[0].issue_fw)
                                        + parseFloat(data.data[0].issue_lw)+ parseFloat(data.data[0].issue_ext_grade_1) +
                                        parseFloat(data.data[0].issue_ext_grade_2) +
                                        parseFloat(data.data[0].issue_ext_grade_3) +
                                        parseFloat(data.data[0].issue_ext_grade_4) +
                                        parseFloat(data.data[0].issue_ext_grade_5) +
                                        parseFloat(data.data[0].issue_ext_grade_6) +
                                        parseFloat(data.data[0].issue_ext_grade_7) +
                                        parseFloat(data.data[0].issue_ext_grade_8) +
                                        parseFloat(data.data[0].issue_ext_grade_9) +
                                        parseFloat(data.data[0].issue_ext_grade_10) 
                                    ) : 0
                            } Kg
                        </p>
                    
                                                    </div>
                                                </DialogTrigger>
                    
                                                <DialogContent className="max-w-3xl">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-center font-semibold mb-3">
                                                            Issue Packing Breakdown
                                                        </DialogTitle>
                                                    </DialogHeader>
                    
                                                    {/* Table */}
                                                    <div className="max-h-[400px] overflow-y-auto">
                                                        <table className="w-full border">
                                                            <thead>
                                                                <tr className="bg-gray-200">
                                                                    <th className="border p-2">Grade</th>
                                                                    <th className="border p-2">Value (Kg)</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {getIssueGrades().map((g, i) => (
                                                                    <tr key={i}>
                                                                        <td className="border p-2">{i+1}. {g.name}</td>
                                                                        <td className="border p-2">{g.value}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                    
                                                    {/* Download Button */}
                                                    <div className="flex justify-end mt-4">
                                                        <Button
                                                            onClick={downloadExcel}
                                                            className="bg-green-500 hover:bg-green-600"
                                                        >
                                                            Download Excel
                                                        </Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog> 


                    <div className="flexbox-tile bg-orange-500 hover:bg-orange-400">
                        <p>Issue Hamsa </p><br /><p>{data.data[0].issue_lw ? formatNumber(parseFloat(data.data[0].issue_hamsa)) : 0}  Kg</p>
                    </div>

                    <div className="flexbox-tile bg-yellow-500 hover:bg-yellow-400">
                        <p>Issue BigTaiho</p> <br /><p>{data.data[0].issue_bigTaiho ? formatNumber(parseFloat(data.data[0].issue_bigTaiho)) : 0}  Kg</p>
                    </div>

                    <div className="flexbox-tile bg-violet-500 hover:bg-violet-400">
                       <p>Issue Village</p>  <br /><p>{data.data[0].issue_village ? formatNumber(parseFloat(data.data[0].issue_village)) : 0}  Kg</p>
                    </div>

                    <div className="flexbox-tile bg-green-500 hover:bg-green-400">
                        <p>Issue Rejection</p> <br /><p>{data.data[0].issue_rejection ? formatNumber(parseFloat(data.data[0].issue_rejection)) : 0}  Kg</p>
                    </div>

                    <div className="flexbox-tile bg-cyan-500 hover:bg-cyan-400">
                       <p>Current Backlog </p> <br /><p>{data.Sumdata[0].current_backlog  ?  formatNumber(parseFloat(data.Sumdata[0].current_backlog)): 0} Kg</p>
                    </div>


                </div>
                {/* <Button className="bg-orange-400 mb-2 mt-5 ml-4" type="submit">+ Add New Enrty</Button> */}
               <p className='md:text-lg md:mt-0 mt-2 text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold text-md'>CURRENT F.Y. {FY} REPORT (LOWER GRADING)</p>
                <div>
                   

                    <Dialog>
                                            <DialogTrigger> <Button className="md:w-40 w-25 bg-gradient-to-r from-blue-500 to-green-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md" onClick={handleOpenLotNo}>+ Add Entry</Button></DialogTrigger>
                                            <DialogContent className='max-w-4xl'>
                                                <DialogHeader>
                                                    <DialogTitle><p className='text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold'>LW Entry Form</p></DialogTitle>
                    
                                                </DialogHeader>
                    
                                                <LWInitial props={lotdata} />
                                            </DialogContent>
                                        </Dialog>


                      {checkpending('LW') && (data?.EditData ?? 0) > 0 && <Drawer>
                                             <DrawerTrigger asChild >
                                                 <div className="relative inline-block ml-2 md:ml-4 top-1 responsive-button-adjust">
                                                     <Button
                                                         className="w-25 md:w-40 bg-gradient-to-r from-orange-400 to-red-200 hover:from-red-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md "
                                                         /* FIX 1: Use ?? 0 for the disabled prop */
                                                         disabled={(data?.EditData ?? 0) === 0}
                                                         onClick={handleEditFetch}
                                                     >
                                                         <div className="flex items-center gap-2">
                                                             <MdPendingActions size={18} />
                                                             Actions 
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
                                                 <div className='mx-5'>   <LWTable props='edit' /></div>
                                                 <DrawerFooter>
                     
                                                     <DrawerClose asChild>
                                                         <Button className="w-28 md:w-40 bg-gradient-to-r from-red-600 to-rose-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md"
                                                         >Close</Button>
                                                     </DrawerClose>
                                                 </DrawerFooter>
                     
                                             </DrawerContent>
                                         </Drawer>}                   


                    
                   

                     <Button className="w-25 md:w-40 bg-gradient-to-r from-purple-600 to-blue-400 hover:from-slate-500 hover:to-slate-300 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left drop-shadow-md" onClick={handleTransferFetch}> {maintable==='block' ? 'History':'Main Entry '}<FaHistory size={16} className='ml-2'/></Button>

                     { (data?.PendingData ?? 0) > 0 && <Dialog>
                        <DialogTrigger>
                            <div className="relative inline-block ml-2 md:ml-4 top-1 responsive-button-adjust">
                                <Button
                                    className="w-25 md:w-40 bg-gradient-to-r from-red-500 to-yellow-400 hover:from-red-600 hover:to-yellow-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md "
                                    /* FIX 1: Use ?? 0 for the disabled prop */
                                    disabled={(data?.PendingData ?? 0) === 0}
                                    
                                >
                                    <div className="flex items-center gap-2">
                                        <MdPendingActions size={18} />
                                        Backlog 
                                    </div>
                                </Button>

                                {/* FIX 2: Use ?? 0 for the badge display condition and value */}
                                {(data?.PendingData ?? 0) > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center transform scale-90 origin-center animate-pulse shadow-lg ring-2 ring-white dark:ring-gray-800">
                                        {data?.PendingData ?? 0}
                                    </span>
                                )}
                            </div>
                        </DialogTrigger>
                        <DialogContent className='max-w-4xl'>
                            <DialogHeader>
                                <DialogTitle><p className='text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold'>LW Backlog</p></DialogTitle>

                            </DialogHeader>

                            <PendingBacklog props={'lw'} />
                        </DialogContent>
                    </Dialog>}
                </div>


                <div style={{ display: maintable }}>
                    <LWTable props='non-edit'/>
                </div>
                <div style={{ display: historytable }}>
                    <LWHistoryTable />
                </div>


            </div>
            <DashboardFooter/>
        </div>


    )
}
export default LW;