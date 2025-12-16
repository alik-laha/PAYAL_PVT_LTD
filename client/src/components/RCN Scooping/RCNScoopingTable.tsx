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
import { PermissionRole, ScoopData, pendingCheckRoles, rcnScoopingData } from "@/type/type";

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { SelectType, pageNo, pagelimit, pendingCheckRole } from "../common/exportData"



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
import RCNLineCreateEditForm from "./RCNLineCreateEditForm";
import RcnTableLineWise from "./RcnScoopingTableLineWise";
import RCNLineCreateApproveForm from "./RCNLineCreateApproveForm";
import { FcApprove } from "react-icons/fc";

const RCNScoopingTable = (props:any) => {


    const [origin, setOrigin] = useState<string>("")
    const [selectType, setselectType] = useState<string>("LotWise")
    const [fromdate, setfromDate] = React.useState<string>('');
    const [todate, settoDate] = React.useState<string>('');
    //const [hidetodate, sethidetoDate] = React.useState<string>('');
    const [blConNo, setBlConNo] = useState<string>("")
    // const [Data, setData] = useState<rcnScoopingData[]>([])
    const [LotWiseData, setLotWiseData] = useState<rcnScoopingData[]>([])
    const [LineWiseData, setLineWiseData] = useState<rcnScoopingData[]>([])
    const [page, setPage] = useState(pageNo)
    const [EditData, setEditData] = useState<rcnScoopingData[]>([])
    const limit = pagelimit
    const { editScoopingLotWiseData, setSearchType } = useContext(Context);
    const [blockpagen, setblockpagen] = useState('flex')
    const currDate = new Date().toLocaleDateString();
    const approvesuccessdialog = document.getElementById('rcneditapproveScsDialog') as HTMLInputElement;
    const approvecloseDialogButton = document.getElementById('rcneditScscloseDialog') as HTMLInputElement;

    const rejectsuccessdialog = document.getElementById('rcneditapproveRejectDialog') as HTMLInputElement;
    const rejectcloseDialogButton = document.getElementById('rcneditRejectcloseDialog') as HTMLInputElement;
    const [tablesearch, settablesearch] = useState<string>("LotWise")
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


    useEffect(() => {
        if (editScoopingLotWiseData) {
            //console.log(editPendingData)
            setEditData(editScoopingLotWiseData)
            if(props.props==='edit'){
                setblockpagen('none')
            }
            
        }
    }, [editScoopingLotWiseData, props.props])

    const handleSearch = async () => {
        //console.log('search button pressed')
        //setEditPendingBoilingData([])
        setEditData([])
        setSearchType(selectType)
        settablesearch(selectType)
        const response = await axios.post('/api/scooping/searchScooping', {
            blConNo: blConNo,
            origin: origin,
            fromDate: fromdate,
            toDate: todate,
            type: selectType

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
        if (selectType === 'LotWise') {
            setLotWiseData(data)
        }
        else {
            // setData(data)
            setLineWiseData(data)
        }

    }


    useEffect(() => {
        setEditData([])
        //setEditPendingBoilingData([])
        setblockpagen('flex')
        handleSearch()
    }, [page])
    const [scoopdata, setscoopdata] = useState<ScoopData[]>([])
    const [scoopeditdata, setscoopeditdata] = useState<ScoopData[]>([])


    //let scoopdata:ScoopData[]=[]

    const handleLineEntry = async (lotNO: string) => {
        axios.get(`/api/scooping/getScoopByLot/${lotNO}`).then(res => {
            console.log(res)
            if (Array.isArray(res.data.scoopingLot)) {
                //scoopdata=res.data.scoopingLot
                setscoopdata(res.data.scoopingLot)
                console.log(scoopdata)
            }

            //set(res.data.scoopingLot)
        })
    }
    const handleEditLineEntry = async (lotNO: string) => {
        axios.get(`/api/scooping/getEditScoopByLot/${lotNO}`).then(res => {
            console.log(res)
            if (Array.isArray(res.data.scoopingLot)) {
                //scoopdata=res.data.scoopingLot
                setscoopeditdata(res.data.scoopingLot)
                console.log(scoopdata)
            }

            //set(res.data.scoopingLot)
        })
    }
    function formatNumber(num: any) {
        return Number.isInteger(num) ? parseInt(num) : num.toFixed(2);
    }
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

    const exportToExcel = async () => {
        const response = await axios.post('/api/scooping/searchScooping', {
            blConNo: blConNo,
            origin: origin,
            fromDate: fromdate,
            toDate: todate,
            type: selectType
        })
        const data1 = await response.data
        let ws
        let transformed: any = [];
        if (EditData.length > 0) {
            transformed = EditData.map((item: any, idx: number) => ({
                SL_No: idx + 1,
                LotNo: item.LotNo,
                date: handletimezone(item.date),
                origin: item.origin,
                Opening_Qty: Number(item.Opening_Qty) || 0,
                Receiving_Qty: Number(item.Receiving_Qty) || 0,
                Wholes: Number(item.Wholes) || 0,
                Broken: Number(item.Broken) || 0,
                Uncut: Number(item.Uncut) || 0,
                Unscoop: Number(item.Unscoop) || 0,
                NonCut: Number(item.NonCut) || 0,
                Rejection: Number(item.Rejection) || 0,
                Dust: Number(item.Dust) || 0,
                TotBagCutting: Number(item.TotBagCutting) || 0,
                KOR: Number(item.KOR) || 0,
                LineWiseLadies: Number(item.noOfEmployees) || 0,
                Common_Ladies: Number(item.noOfLadies) || 0,
                Common_Gents: Number(item.noOfGents) || 0,
                Common_Supervisors: Number(item.noOfSupervisors) || 0,
                LineWiseOperator: Number(item.noOfOperators) || 0,
                CreatedBy: item.CreatedBy,
                editStatus: item.editStatus,
                modifiedBy: item.modifiedBy,
            }));



        }
        else {

            if (selectType === 'LotWise') {
                transformed = data1.map((item: rcnScoopingData, idx: number) => ({
                    SL_No: idx + 1,
                    LotNo: item.LotNo,
                    date: handletimezone(item.date),
                    origin: item.origin,
                    Opening_Qty: Number(item.Opening_Qty) || 0,
                    Receiving_Qty: Number(item.Receiving_Qty) || 0,
                    Wholes: Number(item.Wholes) || 0,
                    Broken: Number(item.Broken) || 0,
                    Uncut: Number(item.Uncut) || 0,
                    Unscoop: Number(item.Unscoop) || 0,
                    NonCut: Number(item.NonCut) || 0,
                    Rejection: Number(item.Rejection) || 0,
                    Dust: Number(item.Dust) || 0,
                    TotBagCutting: Number(item.TotBagCutting) || 0,
                    KOR: Number(item.KOR) || 0,
                    LineWiseLadies: Number(item.noOfEmployees) || 0,
                    Common_Ladies: Number(item.noOfLadies) || 0,
                    Common_Gents: Number(item.noOfGents) || 0,
                    Common_Supervisors: Number(item.noOfSupervisors) || 0,
                    LineWiseOperator: Number(item.noOfOperators) || 0,
                    CreatedBy: item.CreatedBy,
                    editStatus: item.editStatus,
                    modifiedBy: item.modifiedBy,
                }));
            }
            else {
                transformed = data1.map((item: rcnScoopingData, idx: number) => ({
                    SL_No: idx + 1,
                    LotNo: item.LotNo,
                    Scooping_Line_Mc: item.Scooping_Line_Mc,
                    date: handletimezone(item.date),
                    origin: item.origin,
                    Opening_Qty: Number(item.Opening_Qty) || 0,
                    Receiving_Qty: Number(item.Receiving_Qty) || 0,
                    SizeName: item.SizeName,
                    Wholes: Number(item.Wholes) || 0,
                    Broken: Number(item.Broken) || 0,
                    Uncut: Number(item.Uncut) || 0,
                    Unscoop: Number(item.Unscoop) || 0,
                    NonCut: Number(item.NonCut) || 0,
                    Rejection: Number(item.Rejection) || 0,
                    Dust: Number(item.Dust) || 0,

                    KOR: Number(item.KOR) || 0,
                    Trolley_Broken: Number(item.Trolley_Broken) || 0,
                    Trolley_Small_JB: Number(item.Trolley_Small_JB) || 0,
                    LineWiseLadies: Number(item.noOfEmployees) || 0,
                    Common_Ladies: Number(item.noOfLadies) || 0,
                    Common_Gents: Number(item.noOfGents) || 0,
                    Common_Supervisors: Number(item.noOfSupervisors) || 0,
                    LineWiseOperator: Number(item.noOfOperators) || 0,
                    CreatedBy: item.CreatedBy,
                    editStatus: item.editStatus,
                    modifiedBy: item.modifiedBy,
                    Mc_on: handleAMPM(item.Mc_on.slice(0, 5)),
                    Mc_off: handleAMPM(item.Mc_off.slice(0, 5)),
                    Mc_breakdown: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),
                    Brkdwn_reason: item.Brkdwn_reason,
                    otherTime: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),
                    scoopStatus: item.scoopStatus ? 'Done' : 'Not-Done',
                    Mc_runTime: item.Mc_runTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/^0/, ''),
                    Transfered_Qty:Number(item.Transfered_Qty) || 0,
                    Transfered_To: item.Transfered_To
                }));

            }
        }


        // setTransformedData(transformed);
        ws = XLSX.utils.json_to_sheet(transformed);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'Scooping_' + currDate + '.xlsx');
    };



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
        <div className="mx-2 mt-4 ">

            {props.props === 'non-edit' && <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-4 items-end">

                    {/* Type */}
                    <div className="flex flex-col gap-1">
                        {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                            Type
                        </label> */}
                        <select
                            className="select-with-icon font-semibold bg-yellow-100 w-full text-sm  border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150  dark:text-gray-200 appearance-none"
                            onChange={(e) => setselectType(e.target.value)}
                            value={selectType}
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
                        {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                            Lot No. / Line Name
                        </label> */}
                        <Input
                            className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150 dark:text-gray-200"
                            placeholder="Lot No./ Line Name"
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



                    {/* Search & Export Buttons */}
                    <div className="flex flex-wrap justify-end md:justify-between gap-3 mt-2 md:mt-0">
                        <Button
                            className="flex w-36 items-center justify-center gap-2 bg-slate-500 hover:bg-slate-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                            onClick={handleSearch}
                        >
                            <FaSearch size={14} />
                            Search
                        </Button>

                        {checkpending('Scooping') && (
                            <Button
                                className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                onClick={exportToExcel}
                            >
                                <LuDownload size={16} />

                            </Button>
                        )}
                    </div>
                </div>
            </div>}

            {props.props === 'edit' && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}



            {tablesearch === "LotWise" ? (
                <Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Sl⠀No</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Action</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Boiling⠀Lot⠀No</TableHead>
                        
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Origin</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Scooping⠀Date</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Opening⠀(Kg)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Receiving⠀(Kg)</TableHead>
                     
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Uncut⠀(Kg)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Unscoop⠀(Kg)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >NonCut⠀(Kg)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Wholes⠀(kg)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Broken⠀(Kg)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Rejection⠀(Kg)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Dust⠀(Kg)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >KOR</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Bag⠀Cutting</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Female⠀(Common)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Male⠀(Common)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >SuperVisor⠀(Common)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Operator⠀(total)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Female⠀(total)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Edit⠀Status</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-200 text-gray-700':''}`} >Entried⠀By </TableHead>
                       
                    </TableHeader>
                    <TableBody>
                        {EditData.length > 0 && props.props==='edit'? (
                            EditData.map((item: rcnScoopingData, idx) => {

                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center">{idx + 1}</TableCell>
                                        <TableCell className="text-center">
                                            
                                             <Dialog>
                                                        <DialogTrigger className="flex">

                                                              <div className="flex flex-row gap-1 bg-green-50 px-3 py-1 rounded border border-green-300 "> <FcApprove size={18} />
                                                                                          <button className="text-green-600" onClick={() => handleEditLineEntry(item.LotNo)}>
                                                                                            Approve
                                                                                          </button>
                                                            
                                                                                        </div>
                                                            {/* <button className="p-2 text-white rounded bg-green-500 flex flex-row gap-2 hover:text-green-400 items-center" onClick={() => handleEditLineEntry(item.LotNo)}><FcApprove size={20} />Approve</button> */}
                                                        </DialogTrigger>
                                                        <DialogContent className='max-w-screen'>
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className="text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold">Scooping Approve</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <RCNLineCreateApproveForm scoop={scoopeditdata} />
                                                            {/* <RcnPrimaryModify data={item} /> */}
                                                        </DialogContent>
                                                    </Dialog></TableCell>

                                        
                                        <TableCell className="text-center font-semibold text-orange-600">{item.LotNo}</TableCell>
                                       
                                        <TableCell className="text-center font-semibold text-cyan-500">{item.origin}</TableCell>
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.Opening_Qty))} </TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.Receiving_Qty))} </TableCell>

                                        
                                        <TableCell className="text-center ">{formatNumber(parseFloat(item.Uncut))} </TableCell>


                                        <TableCell className="text-center">{formatNumber(parseFloat(item.Unscoop))} </TableCell>
                                        <TableCell className="text-center ">{formatNumber(parseFloat(item.NonCut))} </TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.Wholes))} </TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.Broken))} </TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.Rejection))} </TableCell>
                                        <TableCell className="text-center ">{formatNumber(parseFloat(item.Dust))} </TableCell>
                                        <TableCell className="text-center ">{formatNumber(parseFloat(item.KOR))}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(parseFloat(item.TotBagCutting))}</TableCell>
                                      
                                       
                                      
                                        
                                        <TableCell className="text-center ">{item.noOfLadies}</TableCell>
                                        <TableCell className="text-center">{item.noOfGents}</TableCell>
                                        <TableCell className="text-center ">{item.noOfSupervisors}</TableCell>
                                        <TableCell className="text-center ">{item.noOfOperators}</TableCell>
                                        <TableCell className="text-center ">{item.noOfEmployees}</TableCell>
                                        <TableCell className="text-center ">{item.editStatus}</TableCell>
                                        <TableCell className="text-center ">{item.CreatedBy}</TableCell>
                                      
                                    </TableRow>
                                );
                            })
                        ) : (
                            console.log(LotWiseData),
                            LotWiseData.length > 0 ? (LotWiseData.map((item: rcnScoopingData, idx) => {

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
                                                            <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" onClick={() => handleLineEntry(item.LotNo)}>Modify</button>
                                                        </DialogTrigger>
                                                        <DialogContent className='max-w-screen'>
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>Line Wise Scooping Modify</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <RCNLineCreateEditForm scoop={scoopdata} />
                                                            {/* <RcnPrimaryModify data={item} /> */}
                                                        </DialogContent>
                                                    </Dialog>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                        <TableCell className="text-center font-semibold text-orange-600">{item.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                       
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.Opening_Qty))} </TableCell>
                                        <TableCell className="text-center">{formatNumber(parseFloat(item.Receiving_Qty))} </TableCell>

                                       
                                        
                                        <TableCell className="text-center  bg-yellow-100">{formatNumber(parseFloat(item.Uncut))} </TableCell>
                                        <TableCell className="text-center  bg-yellow-100">{formatNumber(parseFloat(item.Unscoop))} </TableCell>
                                        <TableCell className="text-center  bg-yellow-100">{formatNumber(parseFloat(item.NonCut))} </TableCell>
                                        <TableCell className="text-center font-semibold bg-green-100">{formatNumber(parseFloat(item.Wholes))} </TableCell>
                                        <TableCell className="text-center font-semibold bg-green-100">{formatNumber(parseFloat(item.Broken))} </TableCell>
                                        <TableCell className="text-center font-semibold bg-red-100">{formatNumber(parseFloat(item.Rejection))} </TableCell>
                                        <TableCell className="text-center font-semibold bg-red-100">{formatNumber(parseFloat(item.Dust))} </TableCell>
                                        <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(parseFloat(item.KOR))}</TableCell>
                                        <TableCell className="text-center font-semibold">{formatNumber(parseFloat(item.TotBagCutting))}</TableCell>
                                        
                                        
                                        <TableCell className="text-center ">{item.noOfLadies}</TableCell>
                                        <TableCell className="text-center">{item.noOfGents}</TableCell>
                                        <TableCell className="text-center ">{item.noOfSupervisors}</TableCell>
                                        <TableCell className="text-center ">{item.noOfOperators}</TableCell>
                                        <TableCell className="text-center ">{item.noOfEmployees}</TableCell>
                                        <TableCell className="text-center ">{item.editStatus}</TableCell>
                                        <TableCell className="text-center ">{item.CreatedBy}</TableCell>



                                        
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
                                <TableCell><p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">No Result </p></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>)
                        )}
                    </TableBody>
                </Table>) : (<RcnTableLineWise LineWise={LineWiseData} page={page} />)
            }
          <Pagination  style={{ display: blockpagen }} className="pt-5 flex flex-row justify-end ">
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
                              </Pagination>



        </div>
    )
}
export default RCNScoopingTable;

