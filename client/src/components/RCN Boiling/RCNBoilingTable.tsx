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
import { BoilingEntryData, BoilingExcelData, PermissionRole, pendingCheckRoles } from "@/type/type";

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { SelectType, Size, pageNo, pagelimit, pendingCheckRole } from "../common/exportData"
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
import RCNBoilingModify from './RCNBoilingModify'
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

import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";


const RCNBoilingTable = (props:any) => {
    const [origin, setOrigin] = useState<string>("")
    const [size, setSize] = useState<string>("")
    const [fromdate, setfromDate] = React.useState<string>('');
    const [todate, settoDate] = React.useState<string>('');
    //const [hidetodate, sethidetoDate] = React.useState<string>('');
    const [blConNo, setBlConNo] = useState<string>("")
    const [Data, setData] = useState<BoilingEntryData[]>([])
    const [lotData, setLotData] = useState<any[]>([])
    const [page, setPage] = useState(pageNo)
    const [EditData, setEditData] = useState<BoilingEntryData[]>([])
    const limit = pagelimit
    const { editPendingBoilingData, setEditPendingBoilingData } = useContext(Context);
    const [blockpagen, setblockpagen] = useState('flex')
    const currDate = new Date().toLocaleDateString();
    const approvesuccessdialog = document.getElementById('rcneditapproveScsDialog') as HTMLInputElement;
    const approvecloseDialogButton = document.getElementById('rcneditScscloseDialog') as HTMLInputElement;

    const rejectsuccessdialog = document.getElementById('rcneditapproveRejectDialog') as HTMLInputElement;
    const rejectcloseDialogButton = document.getElementById('rcneditRejectcloseDialog') as HTMLInputElement;

    //const [transformedData, setTransformedData] = useState<BoilingExcelData[]>([]);
    const [successtext, setSuccessText] = React.useState<string>('');
    const [errortext, seterrorText] = React.useState<string>('');

    const [selecttype, setSelecttype] = React.useState<string>('LotWise');
    const [selecttabletype, setSelecttabletype] = React.useState<string>('LotWise');
    const Role = localStorage.getItem('role') as keyof PermissionRole

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

    useEffect(() => {
        if (editPendingBoilingData.length > 0) {
            // console.log(editPendingBoilingData)
            setEditData(editPendingBoilingData)
            // console.log(EditData)
            if(props.props==='edit'){setblockpagen('none')}
            
        }
    }, [editPendingBoilingData, props.props])

    const handleSearch = async () => {
        //console.log('search button pressed')
        setEditPendingBoilingData([])
        //setEditData([])

        if(selecttype==='LineWise'){
            setSelecttabletype('LineWise')
            const response = await axios.post('/api/boiling/searchBoiling', {
            blConNo: blConNo,
            origin: origin,
            fromDate: fromdate,
            toDate: todate,
            SizeName: size,
            type:'line'
        }, {
            params: {
                page: page,
                limit: limit
            }
        })
        const data = await response.data
        //console.log(data)
        if (data.length === 0 && page > 1) {
            setPage((prev) => prev - 1)

        }
        setData(data)
        }
        else{
            setSelecttabletype('LotWise')
            const response = await axios.post('/api/boiling/searchBoiling', {
            blConNo: blConNo,
            origin: origin,
            fromDate: fromdate,
            toDate: todate,
            SizeName: size,
            type:'lot'
        }, {
            params: {
                page: page,
                limit: limit
            }
        })
        const data = await response.data
        //console.log(data)
        if (data.length === 0 && page > 1) {
            setPage((prev) => prev - 1)

        }
        setLotData(data)
        }

    }


    useEffect(() => {
        setEditData([])
        //setEditPendingBoilingData([])
        setblockpagen('flex')
        handleSearch()
    }, [page])

    const exportToExcel = async () => {
        const response = await axios.post('/api/boiling/searchBoiling', {
            blConNo: blConNo,
            origin: origin,
            fromDate: fromdate,
            toDate: todate,
            SizeName: size,
        })
        const data1 = await response.data

        let ws
        let transformed: BoilingExcelData[] = []
        if (EditData.length > 0) {

            transformed = EditData.map((item: BoilingEntryData, idx: number) => ({
                Sl_No: idx + 1,
                Lot_No: item.LotNo,
                Entry_Date: handletimezone(item.date),
                Origin: item.origin,
                Size: item.SizeName,
                Boiling_Qty: Number(item.Size) || 0,
                Scooping_Line: item.Scooping_Line_Mc,
                Pressure: item.Pressure,
                Moisture: item.moisture,
                Cooking_Time: item.CookingTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr.',
                Machine: item.MCName,
                MC_On: handleAMPM(item.Mc_on.slice(0, 5)),
                MC_Off: handleAMPM(item.Mc_off.slice(0, 5)),
                Labour_No: Number(item.noOfEmployees) || 0,
                Breakdown_Duration: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr.',
                Other_Duration: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr.',
                Run_Duration: item.Mc_runTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0/, '') + ' hr.',

                Edit_Status: item.editStatus,
                Entried_By: item.CreatedBy,
                ApprovedOrRejectedBy: item.modifiedBy

            }));
            //setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else {
            transformed = data1.map((item: BoilingEntryData, idx: number) => ({

                Sl_No: idx + 1,
                Lot_No: item.LotNo,
                Entry_Date: handletimezone(item.date),
                Origin: item.origin,
                Size: item.SizeName,
                Boiling_Qty: Number(item.Size) || 0,
                Scooping_Line: item.Scooping_Line_Mc,
                Pressure: item.Pressure,
                Cooking_Time: item.CookingTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr.',
                Machine: item.MCName,
                MC_On: handleAMPM(item.Mc_on.slice(0, 5)),
                MC_Off: handleAMPM(item.Mc_off.slice(0, 5)),
                Labour_No: Number(item.noOfEmployees) || 0,
                Breakdown_Duration: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr.',
                Other_Duration: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr.',
                Run_Duration: item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr.',
                Edit_Status: item.editStatus,
                Entried_By: item.CreatedBy,
                ApprovedOrRejectedBy: item.modifiedBy
            }));
            //setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'RCN_Boiling_Entry_' + currDate + '.xlsx');
    };

    const handleRejection = async (item: BoilingEntryData) => {
        const response = await axios.post(`/api/boiling/rejectededitrcnboiling/${item.id}`)
        const data = await response.data
        console.log(data)
        if (data.message === "RCN Boiling Modify Request is Reverted") {
            seterrorText(data.message)
            //console.log('rejected enter')
            if (rejectsuccessdialog != null) {
                (rejectsuccessdialog as any).showModal();
            }
        }
    }
    const handleApprove = async (item: BoilingEntryData) => {
        const response = await axios.post(`/api/boiling/approveEditrcnBoiling/${item.id}`)
        const data = await response.data
        console.log(data)
        if (data.message === "RCN Boiling Modify Request is Approved") {
            console.log('hi')
             setSuccessText('RCN Boiling Modify Request is Approved')
             console.log(successtext)
            if (approvesuccessdialog != null) {
                (approvesuccessdialog as any).showModal();
            }
            
        }
        if (data.message === "Can't Be approved/Scooping Done") {
            seterrorText(data.message)
            if (rejectsuccessdialog != null) {
                (rejectsuccessdialog as any).showModal();
            }
        }
    }
    const handleDelete = async (item: BoilingEntryData) => 
    {  
        const resStatus = await axios.post('/api/boiling/getStatusBoiling', { lotNo: item.LotNo})
        console.log(resStatus)
        if (resStatus.data.lotStatus.modifiedBy && resStatus.data.lotStatus.modifiedBy !== 'Boiling') 
        {
            seterrorText(`Lot has Already Crossed ${resStatus.data.lotStatus.modifiedBy} Section`)
            if (rejectsuccessdialog != null) {
                (rejectsuccessdialog as any).showModal();
            }
            return
        }

        const response = await axios.delete(`/api/boiling/deleteLotNoEntire/${item.LotNo}`)
        const data = await response.data
        if (data.message === "Lot No. has deleted successfully") {
            setSuccessText(data.message)
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
    const handleAMPM = (time: string) => {

        let [hours, minutes] = time.split(':').map(Number);
        let period = ' AM';

        if (hours === 0) {
            hours = 12;
        } else if (hours === 12) {
            period = ' PM';
        } else if (hours > 12) {
            hours -= 12;
            period = ' PM';
        }
        const finalTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + period.toString()

        // return ${hours}:${minutes.toString().padStart(2, '0')} ${period};
        return finalTime;
    }
    const checkpending = (tab: string) => {
        //console.log(Role)
        if (pendingCheckRole[tab as keyof pendingCheckRoles].includes(Role)) {
            return true
        }
        else {
            return false;
        }

    }

    return (
        <div className="mx-2 mt-5 ">

            {/* <div className="flex flexbox-search" >

                <Input className="no-padding w-44" placeholder=" Lot No./ Line Name" value={blConNo} onChange={(e) => setBlConNo(e.target.value)} />

                <select className='bg-yellow-100 flex text-xs h-8 flexbox-search-width  ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1
                    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                    onChange={(e) => setSelecttype(e.target.value)} value={selecttype}>
             
                    {SelectType.map((data, index) => (
                        <option className='relative flex text-xs w-full cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                            {data}
                        </option>
                    ))}
                </select>

             

                <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-left">From </label>
                <Input className="w-1/7 flexbox-search-width-calender"
                    type="date"
                    value={fromdate}
                    onChange={(e) => setfromDate(e.target.value)}
                    placeholder="From Date"

                />
                <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-right">To </label>
                <Input className="w-1/7 flexbox-search-width-calender"
                    type="date"
                    // value={hidetodate}
                    // onChange={handleTodate}
                      value={todate}
                    onChange={(e) => settoDate(e.target.value)}
                    placeholder="To Date"

                />
                {selecttype==='LineWise' && <select className='flexbox-search-width flex h-8 w-1/6 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                    onChange={(e) => setOrigin(e.target.value)} value={origin}>
                    <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Origin (All)</option>
                    {Origin.map((data, index) => (
                        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                            {data}
                        </option>
                    ))}
                </select>}
                   
               {selecttype==='LineWise' && <select className='flexbox-search-width no-margin-left-absolute flex text-xs h-8 w-1/6 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 
                    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                    onChange={(e) => setSize(e.target.value)} value={size}>
                    <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                        text-xs py-1.5 pl-8 pr-2  outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Size (All)</option>
                    {Size.map((data, index) => (
                        <option className='relative flex text-xs w-full cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                            {data}
                        </option>
                    ))}
                </select>} 
                
                 


                <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>

            </div>
            {checkpending('Boiling') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>} */}

          {props.props==='non-edit' && <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-4 items-end">
                     {/* Type */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                            Search Type
                        </label>
                        <select
                            className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 font-bold dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 appearance-none"
                            onChange={(e) => setSelecttype(e.target.value)}
                            value={selecttype}
                        >
                            {SelectType.map((data, index) => (
                                <option key={index} value={data}>
                                    {data}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Lot No. / Line Name */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                            Lot No. / Line Name
                        </label>
                        <Input
                            className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150 dark:text-gray-200"
                            placeholder="Enter Lot No. / Line Name"
                            value={blConNo}
                            onChange={(e) => setBlConNo(e.target.value)}
                        />
                    </div>

                   

                    {/* From Date */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                            From
                        </label>
                        <Input
                            type="date"
                            className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150 dark:text-gray-200"
                            value={fromdate}
                            onChange={(e) => setfromDate(e.target.value)}
                        />
                    </div>

                    {/* To Date */}
                    <div className="flex flex-col gap-1">
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

                    {/* Origin (conditional) */}
                    {selecttype === "LineWise" && (
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                Origin
                            </label>
                            <select
                                className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 appearance-none"
                                onChange={(e) => setOrigin(e.target.value)}
                                value={origin}
                            >
                                <option value="">Origin (All)</option>
                                {Origin.map((data, index) => (
                                    <option key={index} value={data}>
                                        {data}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Size (conditional) */}
                    {selecttype === "LineWise" && (
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                Size
                            </label>
                            <select
                                className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 appearance-none"
                                onChange={(e) => setSize(e.target.value)}
                                value={size}
                            >
                                <option value="">Size (All)</option>
                                {Size.map((data, index) => (
                                    <option key={index} value={data}>
                                        {data}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex flex-wrap justify-end md:justify-end gap-3 mt-2 md:mt-0 col-span-full">
                        <Button
                            className="flex w-40 items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                            onClick={handleSearch}
                        >
                            <FaSearch size={14} />
                            Search
                        </Button>

                        {checkpending("Boiling") && (
                            <Button
                                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-green-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                onClick={exportToExcel}
                            >
                                <LuDownload size={16} />

                            </Button>
                        )}
                    </div>
                </div>
            </div>}  

            {props.props==='edit' && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}


                {selecttabletype==='LineWise' || props.props==='edit' ? <Table className="mt-4">
                <TableHeader className="bg-neutral-100 text-stone-950 ">

                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Id</TableHead>
                     {props.props==='edit' && <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Action</TableHead>}
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Boiling_Lot_No</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Origin</TableHead>

                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Scooping_LineName</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Boiling_Date </TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Machine_Name</TableHead>
                 
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Size</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Qty_(Kg)</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Pressure</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Moisture</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Cooking_Time</TableHead>

                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Machine_ON</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Machine_OFF</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Breakdown</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Other</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >MC_Run_Duration</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Labour</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Entried_By</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Edit_Status</TableHead>
                    {props.props==='non-edit' && <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Action</TableHead>}

                </TableHeader>
                <TableBody>
                    {editPendingBoilingData.length > 0 && props.props==='edit'? (
                        editPendingBoilingData.map((item: BoilingEntryData, idx) => {
                            console.log(item)
                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">{idx + 1}</TableCell>
                                    <TableCell className="text-center flex flex-row gap-3">
                      

                                        <AlertDialog>
                                            <AlertDialogTrigger >
                                                <div className="flex flex-row gap-1"> <FcApprove size={20} />
                                                    <button className="text-green-500">
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
                                                <div className="flex flex-row gap-1">
                                                    <FcDisapprove size={20} />
                                                    <button className=" text-red-500">
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
                                    <TableCell className="text-center font-bold text-orange-600">{item.LotNo}</TableCell>
                                    <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                    <TableCell className="text-center font-semibold text-cyan-600">{item.Scooping_Line_Mc}</TableCell>


                                    <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                    <TableCell className="text-center">{item.MCName}</TableCell>
                                  
                                    <TableCell className="text-center font-bold">{item.SizeName}</TableCell>
                                    <TableCell className="text-center font-bold">{item.Size} </TableCell>
                                    <TableCell className="text-center font-bold">{item.Pressure} psi</TableCell>
                                    <TableCell className="text-center font-bold">{item.moisture}%</TableCell>
                                    <TableCell className="text-center">{item.CookingTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>

                                    <TableCell className="text-center">{handleAMPM(item.Mc_on.slice(0, 5))}</TableCell>
                                    <TableCell className="text-center">{handleAMPM(item.Mc_off.slice(0, 5))}</TableCell>
                                    <TableCell className="text-center">{item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                                    <TableCell className="text-center">{item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                                    <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00./g, '0.').replace(/^0/, '')} hr</TableCell>
                                    <TableCell className="text-center">{item.noOfEmployees}</TableCell>
                                    <TableCell className="text-center">{item.CreatedBy}</TableCell>
                                    <TableCell className="text-center">{item.editStatus}</TableCell>

                                  
                                </TableRow>
                            );
                        })
                    ) : (
                        Data.length > 0 && props.props==='non-edit'? (Data.map((item: BoilingEntryData, idx) => {


                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                    <TableCell className="text-center font-bold text-orange-600">{item.LotNo}</TableCell>
                                    <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                    <TableCell className="text-center font-semibold text-cyan-600">{item.Scooping_Line_Mc}</TableCell>

                                    <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                    <TableCell className="text-center">{item.MCName}</TableCell>
                           

                                    <TableCell className="text-center ">{item.SizeName}</TableCell>
                                    <TableCell className="text-center ">{item.Size} </TableCell>
                                    <TableCell className="text-center ">{item.Pressure} psi</TableCell>
                                    <TableCell className="text-center ">{item.moisture}%</TableCell>
                                    <TableCell className="text-center">{item.CookingTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>

                                    <TableCell className="text-center">{handleAMPM(item.Mc_on.slice(0, 5))}</TableCell>
                                    <TableCell className="text-center">{handleAMPM(item.Mc_off.slice(0, 5))}</TableCell>
                                    <TableCell className="text-center">{item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                                    <TableCell className="text-center">{item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                                    <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00./g, '0.').replace(/^0/, '')} hr</TableCell>
                                    <TableCell className="text-center">{item.noOfEmployees}</TableCell>
                                    <TableCell className="text-center">{item.CreatedBy}</TableCell>
                                    <TableCell className="text-center">{item.editStatus}</TableCell>





                                    <TableCell className="text-center">
                                        <Popover>
                                            <PopoverTrigger>
                                                <button className={`p-2 text-white rounded ${item.editStatus === 'Pending' ? 'bg-cyan-200' : 'bg-cyan-500'}`} disabled={item.editStatus === 'Pending' ? true : false}>Action</button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                                <Dialog>
                                                    <DialogTrigger className="flex"><CiEdit size={20} />
                                                        <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Modify</button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-3xl">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>RCN Boiling Entry Modification</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <RCNBoilingModify data={item} />
                                                    </DialogContent>
                                                </Dialog>
                                              
                                            </PopoverContent>
                                            
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            );
                        })) : (<TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell><p className="w-100 font-medium text-center text-red-500  pt-3 pb-6">No Result </p></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>



                        </TableRow>)
                    )}
                </TableBody>
            </Table>:(<Table className="mt-4">
                <TableHeader className="bg-neutral-100 text-stone-950 ">
                    <TableHead className="text-center" >Id</TableHead>
                    <TableHead className="text-center " >Boiling_Lot_No</TableHead>
                    <TableHead className="text-center " >Boiling_Date</TableHead>
                    <TableHead className="text-center" >Boiling_Quantity(Kg)</TableHead>
                    <TableHead className="text-center" >No_of_Labour</TableHead>
                    <TableHead className="text-center" >Created_By</TableHead>
                    <TableHead className="text-center" >Action</TableHead>

                </TableHeader>
                <TableBody>
                     
                        {lotData.length > 0 ? (lotData.map((item: any, idx) => {

                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                    <TableCell className="text-center font-bold text-orange-600">{item.LotNo}</TableCell>
                                    <TableCell className="text-center font-bold ">{handletimezone(item.date)}</TableCell>
                                    <TableCell className="text-center ">{item.quantity} </TableCell>
                                     <TableCell className="text-center ">{item.noOfEmployees} </TableCell>
                                     <TableCell className="text-center ">{item.CreatedBy} </TableCell>
                                    <TableCell className="text-center">
                                        <Popover>
                                            <PopoverTrigger>
                                                <button className={`p-2 text-white rounded bg-cyan-500`} >Action</button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                             
                                                <AlertDialog>
                                                    <AlertDialogTrigger className="flex">
                                                    <MdDelete color='Red' size={20} /> <button className="bg-transparent pb-2 pl-2 text-left hover:text-red-500"> Delete</button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Do you want to Delete Entire Items of Lot {item.LotNo}?</AlertDialogTitle>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(item)}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </PopoverContent>
                                            
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            );
                        })) : (<TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell><p className="w-100 font-medium text-center text-red-500  pt-3 pb-6">No Result </p></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>



                        </TableRow>)}
                    
                </TableBody>
            </Table>)}

            
            <Pagination style={{ display: blockpagen }} className="pt-5 ">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => setPage((prev) => {
                            if (prev === 1) {
                                return prev
                            }
                            if (prev <= 0) {
                                return prev + 1
                            }
                            return prev - 1
                        })} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">{page}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext onClick={() => setPage((prev) => prev + 1)} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <dialog id="rcneditapproveScsDialog" className="rounded-lg p-6 shadow-xl bg-white border border-green-300 text-center">
                <button id="rcneditScscloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium text-green-500">{props.props==='non-edit' ?successtext:'Modification Request Approved Successfully'} </p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="rcneditapproveRejectDialog" className="rounded-lg p-6 shadow-xl bg-white border border-red-300 text-center">
                <button id="rcneditRejectcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium text-red-500">{props.props==='non-edit' ?errortext:'Modification Request Reverted Successfully'}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </div>
    )

}
export default RCNBoilingTable;

