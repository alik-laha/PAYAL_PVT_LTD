import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { LuDownload } from "react-icons/lu";
import { format, toZonedTime } from 'date-fns-tz'
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react"
import { Input } from "../ui/input";
// import DatePicker from "../common/DatePicker";
import { PermissionRole, RcnPrimaryEntryData, pendingCheckRoles } from "@/type/type";
import { ExcelRcnPrimaryEntryData } from "@/type/type";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { pageNo, pagelimit, pendingCheckRole } from "../common/exportData"
import { FcApprove, FcDisapprove } from "react-icons/fc";


import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Origin } from "../common/exportData"
import { useState } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import RcnPrimaryModify from './RcnPrimaryModify'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,

    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from "axios";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useContext } from "react";
import Context from "../context/context";
import { EditPendingData } from "@/type/type";
import { CiEdit } from "react-icons/ci";
import { SiTicktick } from "react-icons/si";
import { MdOutlinePendingActions } from "react-icons/md";

const RcnPrimaryEntryTable = (props:any) => {
    const [origin, setOrigin] = useState<string>("")
    const [fromdate, setfromDate] = React.useState<string>('');
    const [todate, settoDate] = React.useState<string>('');
   // const [hidetodate, sethidetoDate] = React.useState<string>('');
    const [blConNo, setBlConNo] = useState<string>("")
    const [Data, setData] = useState<RcnPrimaryEntryData[]>([])
    const [page, setPage] = useState(pageNo)
    const [EditData, setEditData] = useState<EditPendingData[]>([])
    const limit = pagelimit
    const { editPendingData } = useContext(Context);
    const [blockpagen, setblockpagen] = useState('flex')
    const currDate = new Date().toLocaleDateString();
    const approvesuccessdialog = document.getElementById('rcneditapproveScsDialog') as HTMLInputElement;
    const approvecloseDialogButton = document.getElementById('rcneditScscloseDialog') as HTMLInputElement;

    const rejectsuccessdialog = document.getElementById('rcneditapproveRejectDialog') as HTMLInputElement;
    const rejectcloseDialogButton = document.getElementById('rcneditRejectcloseDialog') as HTMLInputElement;

    //const [transformedData, setTransformedData] = useState<ExcelRcnPrimaryEntryData[]>([]);

    if (rejectcloseDialogButton) {
        rejectcloseDialogButton.addEventListener('click', () => {
            if (rejectsuccessdialog != null) {
                (rejectsuccessdialog as any).close();
                window.location.reload()
            }


        });
    }
    if (approvecloseDialogButton) {
        approvecloseDialogButton.addEventListener('click', () => {
            if (approvesuccessdialog != null) {
                (approvesuccessdialog as any).close();
                window.location.reload()
            }

        });
    }

    const formatNumberWithSign = (number: number) => {
        if (number > 0) {
            return `+${number}`;
        } else {
            return `${number}`;
        }
    };

    useEffect(() => {
        if (editPendingData) {
            //console.log(editPendingData)
            setEditData(editPendingData)
                if(props.props==='edit'){ setblockpagen('none')}
        }
    }, [editPendingData, props.props])

    const handleSearch = async () => {
        //console.log('search button pressed')
        setEditData([])
        setblockpagen('flex')
        const response = await axios.put('/api/rcnprimary/rcnprimarysearch', {
            blConNo: blConNo,
            origin: origin,
            fromDate: fromdate,
            toDate: todate
        }, {
            params: {
                page: page,
                limit: limit
            }
        })
        const data = await response.data
        if (data.rcnEntries.length === 0 && page > 1) {
            setPage((prev) => prev - 1)

        }
        setData(data.rcnEntries)

    }



    useEffect(() => {
        handleSearch()
        setPage((prev) => {
            if (prev <= 0) {
                return 1
            }
            return prev
        })
    }, [page])

    const exportToExcel = async () => {
        const response = await axios.put('/api/rcnprimary/rcnprimarysearch', {
            blConNo: blConNo,
            origin: origin,
            fromDate: fromdate,
            toDate: todate
        })
        const data1 = await response.data

        let ws
        let transformed: ExcelRcnPrimaryEntryData[] = [];
        if (EditData.length > 0) {

            transformed = EditData.map((item: EditPendingData, idx: number) => ({
                SL_No: idx + 1,
                GatePass_No:item.gatePassNo,
                Date: handletimezone(item.date),
                Origin: item.origin,
                Bl_No: item.blNo,
                Con_No: item.conNo,
                RCN_QC_Status: item.rcnStatus,
                Physical_Bag_Count: item.noOfBags,
                System_Bag_Count:item.systemBags,
                Truck_No: item.truckNo,
                Gross_Weight:item.grossWt,
                Bl_Weight: item.blWeight,
                Net_Weight: item.netWeight,
                Difference: item.difference,
                Edit_Status: item.editStatus,
                Created_by: item.editedBy,
                // received by is updated as editedby in edit rcn table
                Approved_or_Reverted_By: item.approvedBy
                // approvedBy is not there in edit rcn table
            }));
            //setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else {
            transformed = data1.rcnEntries.map((item: RcnPrimaryEntryData, idx: number) => ({
                SL_No: idx + 1,
                GatePass_No:item.gatePassNo,
                Origin: item.origin,
                Bl_No: item.blNo,
                Con_No: item.conNo,
                RCN_QC_Status: item.rcnStatus,
                Date: handletimezone(item.date),
                Physical_Bag_Count: item.noOfBags,
                System_Bag_Count:item.systemBags,
                Truck_No: item.truckNo,
                Gross_Weight:item.grossWt,
                Bl_Weight: item.blWeight,
                Net_Weight: item.netWeight,
                Difference: item.difference,
                Edit_Status: item.editStatus,
                Created_by: item.receivedBy,
                Approved_or_Rejected_By: item.approvedBy

            }));
            // setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'RCN_Primary_Entry_' + currDate + '.xlsx');
    };

    const handleRejection = async (item: RcnPrimaryEntryData) => {
        const response = await axios.delete(`/api/rcnprimary/rejectededitrcn/${item.id}`)
        const data = await response.data
        console.log(data)
        if (data.message === "Rcn Entry rejected successfully") {
            //console.log('rejected enter')
            if (rejectsuccessdialog != null) {
                (rejectsuccessdialog as any).showModal();
            }
        }
    }
    const handleApprove = async (item: RcnPrimaryEntryData) => {
        const response = await axios.put(`/api/rcnprimary/approveeditrcn/${item.id}`)
        const data = await response.data
        if (data.message === "Edit Request of Rcn Entry is Approved Successfully") {

            if (approvesuccessdialog != null) {
                (approvesuccessdialog as any).showModal();
            }
        }
    }
    function handletimezone(date: string | Date) {
        const apidate = new Date(date);
        const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);
        const finaldate = format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
        return finaldate;
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
  
    function formatNumber(num: string) {
        return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
    }

    // const handleTodate = (e: React.ChangeEvent<HTMLInputElement>) => {

    //     const selected = e.target.value;
    //     if (!selected) {
    //         settoDate('')
    //         sethidetoDate('')
    //         return
    //     }
    //     //console.log(selected)
    //     const date = new Date(selected)
    //     date.setDate(date.getDate() + 1);
    //     //console.log(date)
    //     const nextday = date.toISOString().split('T')[0];
    //     //console.log(nextday)
    //     sethidetoDate(selected)
    //     settoDate(nextday)
    // }


    return (
        <div className="mx-2 mt-5 ">


            {props.props==='edit' ?'':<div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-end">

                    {/* BL / Con No */}
                    <div className="flex flex-col gap-1">
                        {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                            BL No. / Con No.
                        </label> */}
                        <Input
                            className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150"
                            placeholder="BL / Con No."
                            value={blConNo}
                            onChange={(e) => setBlConNo(e.target.value)}
                        />
                    </div>

               

                

                         {/* Origin */}
                    <div className="flex flex-col gap-1">
                        {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                            Origin
                        </label> */}
                        <select
                            className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 pr-8 appearance-none"
                            onChange={(e) => setOrigin(e.target.value)}
                            value={origin}
                        >
                            <option value="">Origin (All)</option>
                            {Origin.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>



                    </div>
                         {/* From Date */}
                                   <div className="flex flex-col md:flex-row gap-1 md:items-center ">
                                     <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                       From
                                     </label>
                                     <Input
                                       type="date"
                                       className="text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150 dark:text-gray-200"
                                       value={fromdate}
                                       onChange={(e) => setfromDate(e.target.value)}
                                     />
                                   </div>
                       
                                   {/* To Date */}
                                   <div className="flex flex-col md:flex-row gap-1 md:items-center">
                                     <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                       To
                                     </label>
                                     <Input
                                       type="date"
                                       className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150 dark:text-gray-200"
                                       value={todate}
                                       onChange={(e) => settoDate(e.target.value)}
                                     />
                                   </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap justify-end md:justify-between gap-3 mt-2 md:mt-0">
                        <Button
                            className="flex w-40 items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                            onClick={handleSearch}
                        >
                            <FaSearch size={14} />
                            Search
                        </Button>

                        {checkpending('RCNPrimary') && (
                            <Button
                                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                onClick={exportToExcel}
                            >
                                <LuDownload size={16} />
                                
                            </Button>
                        )}
                    </div>
                </div>
            </div>}

              {checkpending("RCNPrimary") && props.props==='edit' &&(
                <Button
                  className="flex justify-end items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm "
                  onClick={exportToExcel}
                >
                  <LuDownload size={16} />
                </Button>
              )}

           
            <Table className="mt-4">
                <TableHeader className="bg-neutral-100 text-stone-950 ">

                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Id</TableHead>
                  <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Action</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}  >GatePass⠀No</TableHead>
                 
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Origin</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}  >Date⠀of⠀Receiving </TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}  >Edit⠀Status </TableHead>
                     <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}  >QC⠀Status</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}  >BL⠀No</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}  >Container⠀No</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}  >Enrty⠀Vehicle⠀No</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}  >Gross⠀Weight⠀(Kg)</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}  >BL⠀Weight⠀(Kg)</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}  >Net⠀Weight⠀(Kg)</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}  >Difference⠀(Kg)</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}  >Physical⠀Bag</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}  >System⠀Bag</TableHead>
                   
                    
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Entried⠀By </TableHead>
                 

                </TableHeader>
                <TableBody>
                    {(EditData.length > 0 && props.props==='edit')? (
                        EditData.map((item: EditPendingData, idx) => {

                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center ">{idx + 1}</TableCell>
                                    <TableCell className="text-center flex flex-row gap-3">
         

                         <AlertDialog>
                              <AlertDialogTrigger >
                                                 <div className="flex flex-row gap-1 bg-green-50 px-3 py-1 rounded border border-green-300 "> <FcApprove size={18} />
                                                    <button className="text-green-600">
                                                        Approve
                                                    </button>

                                                </div>
                               
                              </AlertDialogTrigger>
                              <AlertDialogContent  >
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Do you want to Approve the Edit Request?
                                  </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleApprove(item)}>
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <AlertDialog>
                              <AlertDialogTrigger>
                                   <div className="flex flex-row gap-1 bg-red-50 px-3 py-1 rounded border border-red-300">
                                                                                   <FcDisapprove size={18} />
                                                                                   <button className=" text-red-600">
                                                                                       Revert
                                                                                   </button>
                                                                               </div>
                               
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Do you want to Decline the Edit Request?
                                  </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleRejection(item)}>
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                      </TableCell>
                                    <TableCell className="text-center font-bold">{item.gatePassNo}</TableCell>
                                    <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                    <TableCell className="text-center">{handletimezone(item.date)}</TableCell>
                                   <TableCell className="text-center" > <button
                                                                                className={`p-2 rounded w-20 border 
                                              ${item.editStatus === "Approved"
                                                                                        ? "text-green-600 border-green-600 bg-green-50"
                                                                                        : item.editStatus === "NA"
                                                                                            ? "text-gray-700 border-gray-400 bg-gray-100"
                                                                                            : "text-red-600 border-red-600 bg-red-50"
                                                                                    }`}
                                                                            >
                                                                                {item.editStatus}
                                                                            </button></TableCell>
                                                                             <TableCell className="text-center ">
                                        {item.rcnStatus === 'QC Approved' ? (
                                                                                <p className="flex flex-row justify-center">
                                                                                  <SiTicktick color="green" size={18} />
                                                                                </p>
                                                                              ) : item.rcnStatus === 'QC Pending' ? (
                                                                                
                                                                                 <p className="flex flex-row justify-center">
                                                                                  <MdOutlinePendingActions
                                                                                    color="red"
                                                                                    size={23}
                                                                                  />
                                                                                </p>
                                                                              ) : (
                                            <button className="bg-white p-2 text-red-500 rounded w-28 border font-semibold border-red-300">{item.rcnStatus}</button>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">{item.blNo}</TableCell>
                                    <TableCell className="text-center">{item.conNo}</TableCell>
                                    <TableCell className="text-center">{item.truckNo}</TableCell>
                                    <TableCell className="text-center">{formatNumber(item.grossWt)} </TableCell>
                                    <TableCell className="text-center">{item.blWeight} </TableCell>
                                    <TableCell className="text-center">{item.netWeight ? item.netWeight : 0} </TableCell>

                                    {Number(item.difference) < 0 ? (<TableCell className="text-center font-semibold text-red-600">{formatNumberWithSign(Number(item.difference))} Kg</TableCell>)
                                        : (<TableCell className="text-center font-semibold text-green-600">{formatNumberWithSign(Number(item.difference))} Kg</TableCell>)}

                                    <TableCell className="text-center font-semibold">{item.noOfBags}</TableCell>
                                    <TableCell className="text-center font-semibold">{item.systemBags}</TableCell>
                                   
                                    
                                    <TableCell className="text-center">{item.editedBy}</TableCell>
                                    
                                </TableRow>
                            );
                        })
                    ) : (
                        (Data.length > 0 && props.props==='non-edit')? (Data.map((item: RcnPrimaryEntryData, idx) => {


                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                     <TableCell className="text-center">
                                        <Popover>
                                            <PopoverTrigger>
                                                    <button className={`p-2 bg-white rounded ${item.editStatus === 'Pending' ? 'text-red-500 h-8  w-20 border border-red-400 font-bold rounded-lg opacity-60 hover:bg-red-200' : 'text-blue-500 h-8  w-20 border border-blue-400 font-bold rounded-lg hover:bg-blue-200'}`} disabled={item.editStatus === 'Pending' ? true : false}>Action</button>
                                                </PopoverTrigger>
                                            <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                           <Dialog>
                                                    <DialogTrigger className="flex"><CiEdit size={20} />
                                                        <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Modify</button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-3xl">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>RCN Primary Entry Modification</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <RcnPrimaryModify data={item} />
                                                    </DialogContent>
                                                </Dialog>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                    <TableCell className="text-center font-bold">{item.gatePassNo}</TableCell>
                                    <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                    <TableCell className="text-center">{handletimezone(item.date)}</TableCell>
                                     <TableCell className="text-center" > <button
                                                                                className={`p-2 rounded w-20 border 
                                              ${item.editStatus === "Approved"
                                                                                        ? "text-green-600 border-green-600 bg-green-50"
                                                                                        : item.editStatus === "NA"
                                                                                            ? "text-gray-700 border-gray-400 bg-gray-100"
                                                                                            : "text-red-600 border-red-600 bg-red-50"
                                                                                    }`}
                                                                            >
                                                                                {item.editStatus}
                                                                            </button></TableCell>
                                                                            <TableCell className="text-center">
                                         {item.rcnStatus === 'QC Approved' ? (
                                                                                <p className="flex flex-row justify-center">
                                                                                  <SiTicktick color="green" size={18} />
                                                                                </p>
                                                                              ) : item.rcnStatus === 'QC Pending' ? (
                                                                                
                                                                                 <p className="flex flex-row justify-center">
                                                                                  <MdOutlinePendingActions
                                                                                    color="red"
                                                                                    size={23}
                                                                                  />
                                                                                </p>
                                                                              ) : (
                                            <button className="bg-white p-2 text-red-500 rounded w-28 border font-semibold border-red-300">{item.rcnStatus}</button>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">{item.blNo}</TableCell>
                                    <TableCell className="text-center">{item.conNo}</TableCell>
                                    <TableCell className="text-center">{item.truckNo}</TableCell>
                                    <TableCell className="text-center">{formatNumber(item.grossWt)} </TableCell>
                                    <TableCell className="text-center">{item.blWeight} </TableCell>
                                    <TableCell className="text-center">{item.netWeight ? item.netWeight : 0} </TableCell>
                                    {Number(item.difference) < 0 ? (<TableCell className="text-center font-semibold text-red-600">{formatNumberWithSign(Number(item.difference))} Kg</TableCell>)
                                        : (<TableCell className="text-center font-semibold text-green-600">{formatNumberWithSign(Number(item.difference))} Kg</TableCell>)}
                                    <TableCell className="text-center font-semibold">{item.noOfBags}</TableCell>
                                    <TableCell className="text-center font-semibold">{item.systemBags}</TableCell>
                                    
                                    
                                    <TableCell className="text-center">{item.receivedBy}</TableCell>
                                   
                                </TableRow>
                            );
                        })) : (<TableRow>
                          
                            <TableCell colSpan={17}><p className="font-bold tracking-widest uppercase text-center text-red-500 py-4 text-lg">No Result Found</p></TableCell>
                        
                        </TableRow>)
                    )}
                </TableBody>
            </Table>
            {props.props==='non-edit' &&   <Pagination  style={{ display: blockpagen }} className="pt-5 flex flex-row justify-end ">
                                               <PaginationContent className="">
                                                   {page > 1 && <PaginationItem>
                                                       <PaginationPrevious onClick={() => setPage((prev) => {
                                                           if (prev === 1) {
                                                               return prev
                                                           }
                                                           if (prev <= 0) {
                                                               return prev + 1
                                                           }
                                                           return prev - 1
                                                       })} />
                                                   </PaginationItem>}
                                                   {page > 2 && <PaginationItem>
                                                       <PaginationLink onClick={() => setPage((prev) => prev - 2)}>{page - 2}</PaginationLink>
                                                   </PaginationItem>}
                                                   {page > 1 && <PaginationItem>
                                                       <PaginationLink onClick={() => setPage((prev) => prev - 1)}>{page - 1}</PaginationLink>
                                                   </PaginationItem>}
                               
                               
                                                   <PaginationItem>
                                                       <PaginationLink href="#" className="font-bold bg-blue-200  rounded-md">{page}</PaginationLink>
                                                   </PaginationItem>
                                                   <PaginationItem>
                                                       <PaginationLink onClick={() => setPage((prev) => prev + 1)}>{page + 1}</PaginationLink>
                                                   </PaginationItem>
                                                   <PaginationItem>
                                                       <PaginationLink onClick={() => setPage((prev) => prev + 2)}>{page + 2}</PaginationLink>
                                                   </PaginationItem>
                                                   <PaginationItem>
                                                       <PaginationEllipsis />
                                                   </PaginationItem>
                                                   <PaginationItem>
                                                       <PaginationNext onClick={() => setPage((prev) => prev + 1)} />
                                                   </PaginationItem>
                                               </PaginationContent>
                                           </Pagination>}
            <dialog id="rcneditapproveScsDialog" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
                <button id="rcneditScscloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium text-green-500">Modification Request has Been Approved</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="rcneditapproveRejectDialog" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
                <button id="rcneditRejectcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-red-500">Modification Request has Been Reverted</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </div>
    )

}
export default RcnPrimaryEntryTable;

