import { useContext, useEffect, useState } from "react";
import { Origin, pagelimit, pageNo, pendingCheckRole } from "../common/exportData";
import Context from "../context/context";
import axios from "axios";
import {  pendingCheckRoles, PermissionRole, MayurData } from "@/type/type";
import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";
import { LuDownload } from "react-icons/lu";
import { format, toZonedTime } from 'date-fns-tz'
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
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
import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CiBoxes, CiCrop, CiEdit } from "react-icons/ci";
import { FcApprove, FcDisapprove } from "react-icons/fc";
// import BormaModify from "./RCNBormaModify";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import RCNMayurReCreateForm from "./MayurReissueForm";
import RCNMayurEditForm from "./MayurEditForm";
import RCNMayurReMix from "./MayurMix";
//import PeelingModify from "./PeelingModify";
//import HumidifierModify from "./HumidifierModify";

const MayurTable = () => {
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
    const [hidetodate, sethidetoDate] = useState<string>('');
    const currDate = new Date().toLocaleDateString();
    const [origin, setOrigin] = useState<string>("")
    const [blockpagen, setblockpagen] = useState('flex')
    const [EditData, setEditData] = useState<MayurData[]>([])
    const [blConNo, setBlConNo] = useState<string>("")
    const { editMayurLotWiseData } = useContext(Context);
    const [Data, setData] = useState<MayurData[]>([])
    const approvesuccessdialog = document.getElementById('rcneditapproveScsDialog') as HTMLInputElement;
    const approvecloseDialogButton = document.getElementById('rcneditScscloseDialog') as HTMLInputElement;

    const rejectsuccessdialog = document.getElementById('rcneditapproveRejectDialog') as HTMLInputElement;
    const rejectcloseDialogButton = document.getElementById('rcneditRejectcloseDialog') as HTMLInputElement;
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
        handleSearch()
        setPage((prev) => {
            if (prev <= 0) {
                return 1
            }
            return prev
        })
    }, [page])
    const exportToExcel = async () => { 
        const response = await axios.put('/api/mayur/mayurprimarysearch', {
            searchitem: blConNo,
            fromDate: fromdate,
            toDate: todate,
            origin: origin,
        })
        const data1 = await response.data

        let ws
        let transformed: any[] = [];
        if (EditData.length > 0) {
            transformed = EditData.map((item: MayurData, idx: number) => ({
            Sl_No: idx + 1, 
            Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
            Item_Lot_No: item.LotNo,
            Origin: item.origin,
            Issue_No: item.altid,
            Mayur_Entry_Date: handletimezone(item.date),
            Mixing_Lot: item.mixingLot,
            Opening_Wholes_Peel: formatNumber(item.rcv_wholespeel),
            Opening_Wholes_Unpeel: formatNumber(item.rcv_wholesunpeel),
            Receive_Peeling: Number(formatNumber(item.rcv_wholespeel)) + Number(formatNumber(item.rcv_wholesunpeel)),
            Receive_DPDS: item.rcv_DPDS ? formatNumber(item.rcv_DPDS) : 0,
            Receive_Sorting: item.rcv_sorting ? formatNumber(item.rcv_sorting) : 0,
            Receive_Village: item.rcv_village ? formatNumber(item.rcv_village) : 0,
          
            Issue_PW_W: formatNumber(item.issue_pw_w),
            Issue_W_Lot: formatNumber(item.issue_w_lot),
            Issue_WW: formatNumber(item.issue_ww),
            Issue_Rejection: formatNumber(item.issue_rejection),
            Issue_Village: formatNumber(item.issue_village),
            Issue_Big_Taiho: formatNumber(item.issue_bigTaiho),
            Issue_LW: formatNumber(item.issue_LW),
            Issue_JB: formatNumber(item.issue_JB),
            Entry_Backlog: Number(item.entry_backlog) < 0 ? formatNumberWithSign(Number(item.entry_backlog)) : formatNumberWithSign(Number(item.entry_backlog)),
            Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),
            Mc_On_133: handleAMPM(item.Mc_on_133.slice(0, 5)),
            Mc_Off_133: handleAMPM(item.Mc_off_133.slice(0, 5)),
            Mc_Breakdown_133: item.Mc_breakdown_133.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
            Other_Time_133: item.otherTime_133.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
            Mc_On_331: handleAMPM(item.Mc_on_331.slice(0, 5)),
            Mc_Off_331: handleAMPM(item.Mc_off_331.slice(0, 5)),
            Mc_Breakdown_331: item.Mc_breakdown_331.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
            Other_Time_331: item.otherTime_331.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
            Mc_On_292: handleAMPM(item.Mc_on_292.slice(0, 5)),
            Mc_Off_292: handleAMPM(item.Mc_off_292.slice(0, 5)),
            Mc_Breakdown_292: item.Mc_breakdown_292.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
            Other_Time_292: item.otherTime_292.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
            Mc_On_293: handleAMPM(item.Mc_on_293.slice(0, 5)),
            Mc_Off_293: handleAMPM(item.Mc_off_293.slice(0, 5)),
            Mc_Breakdown_293: item.Mc_breakdown_293.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
            Other_Time_293: item.otherTime_293.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
            Runtime_133: item.Mc_runTime_133.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
            Runtime_331: item.Mc_runTime_331.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
            Runtime_292: item.Mc_runTime_292.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
            Runtime_293: item.Mc_runTime_293.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
            Operator_Day: item.noOfdayOperators,
            Operator_Night: item.noOfnightOperators,
            Edit_Status: item.editStatus,
            Created_By: item.CreatedBy,
            Modified_By: item.modifiedBy 

            }));
            //setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else {
            transformed = data1.rcnEntries.map((item: MayurData, idx: number) => ({
                Sl_No: idx + 1, 
                Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
                Item_Lot_No: item.LotNo,
                Origin: item.origin,
                Issue_No: item.altid,
                Mayur_Entry_Date: handletimezone(item.date),
                Mixing_Lot: item.mixingLot,
                Opening_Wholes_Peel: formatNumber(item.rcv_wholespeel),
                Opening_Wholes_Unpeel: formatNumber(item.rcv_wholesunpeel),
                Receive_Peeling: Number(formatNumber(item.rcv_wholespeel)) + Number(formatNumber(item.rcv_wholesunpeel)),
                Receive_DPDS: item.rcv_DPDS ? formatNumber(item.rcv_DPDS) : 0,
                Receive_Sorting: item.rcv_sorting ? formatNumber(item.rcv_sorting) : 0,
                Receive_Village: item.rcv_village ? formatNumber(item.rcv_village) : 0,
               
                Issue_PW_W: formatNumber(item.issue_pw_w),
                Issue_W_Lot: formatNumber(item.issue_w_lot),
                Issue_WW: formatNumber(item.issue_ww),
                Issue_Rejection: formatNumber(item.issue_rejection),
                Issue_Village: formatNumber(item.issue_village),
                Issue_Big_Taiho: formatNumber(item.issue_bigTaiho),
                Issue_LW: formatNumber(item.issue_LW),
                Issue_JB: formatNumber(item.issue_JB),
                Entry_Backlog: Number(item.entry_backlog) < 0 ? formatNumberWithSign(Number(item.entry_backlog)) : formatNumberWithSign(Number(item.entry_backlog)),
                Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),
                Mc_On_133: handleAMPM(item.Mc_on_133.slice(0, 5)),
                Mc_Off_133: handleAMPM(item.Mc_off_133.slice(0, 5)),
                Mc_Breakdown_133: item.Mc_breakdown_133.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                Other_Time_133: item.otherTime_133.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                Mc_On_331: handleAMPM(item.Mc_on_331.slice(0, 5)),
                Mc_Off_331: handleAMPM(item.Mc_off_331.slice(0, 5)),
                Mc_Breakdown_331: item.Mc_breakdown_331.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                Other_Time_331: item.otherTime_331.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                Mc_On_292: handleAMPM(item.Mc_on_292.slice(0, 5)),
                Mc_Off_292: handleAMPM(item.Mc_off_292.slice(0, 5)),
                Mc_Breakdown_292: item.Mc_breakdown_292.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                Other_Time_292: item.otherTime_292.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                Mc_On_293: handleAMPM(item.Mc_on_293.slice(0, 5)),
                Mc_Off_293: handleAMPM(item.Mc_off_293.slice(0, 5)),
                Mc_Breakdown_293: item.Mc_breakdown_293.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                Other_Time_293: item.otherTime_293.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                Runtime_133: item.Mc_runTime_133.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                Runtime_331: item.Mc_runTime_331.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                Runtime_292: item.Mc_runTime_292.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                Runtime_293: item.Mc_runTime_293.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                Operator_Day: item.noOfdayOperators,
                Operator_Night: item.noOfnightOperators,
                Edit_Status: item.editStatus,
                Created_By: item.CreatedBy,
                Modified_By: item.modifiedBy

            }));
            // setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'Mayur_Entry_' + currDate + '.xlsx');
    }
    const handleSearch = async () => {

        setEditData([])
        setblockpagen('flex')
        const response = await axios.put('/api/mayur/mayurprimarysearch', {
            searchitem: blConNo,
            fromDate: fromdate,
            toDate: todate,
            origin: origin,


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
        if (editMayurLotWiseData.length > 0) {
            //console.log(editPendingData)
            setEditData(editMayurLotWiseData)
            setblockpagen('none')
        }

    },[editMayurLotWiseData])
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
    const handleTodate = (e: React.ChangeEvent<HTMLInputElement>) => {

        const selected = e.target.value;
        if (!selected) {
            settoDate('')
            sethidetoDate('')
            return
        }
        //console.log(selected)
        const date = new Date(selected)
        date.setDate(date.getDate() + 1);
        //console.log(date)
        const nextday = date.toISOString().split('T')[0];
        //console.log(nextday)
        sethidetoDate(selected)
        settoDate(nextday)
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
    const handleApprove = async (item: MayurData) => {
        const response = await axios.put(`/api/mayur/approveeditMayur/${item.id}/${item.LotNo}/${item.origin}`)
        const data = await response.data
        if (data.message === "Edit Request of Mayur Entry is Approved Successfully") {

            if (approvesuccessdialog != null) {
                (approvesuccessdialog as any).showModal();
            }
        }
    }
    const handleRejection = async (item: MayurData) => {
        const response = await axios.delete(`/api/mayur/rejectededitMayur/${item.id}/${item.LotNo}/${item.origin}`)
        const data = await response.data
        console.log(data)
        if (data.message === "Mayur Entry rejected successfully") {
            //console.log('rejected enter')
            if (rejectsuccessdialog != null) {
                (rejectsuccessdialog as any).showModal();
            }
        }
    }
   

    const formatNumberWithSign = (number: number) => {
        if (number > 0) {
            return `+${number}`;
        } else {
            return `${number}`;
        }
    };
    return (
        <>

            <div className="ml-5 mt-5 ">
                <div className="flex flexbox-search">

                    <Input className="no-padding w-1/6 flexbox-search-width" placeholder=" Lot No." value={blConNo} onChange={(e) => setBlConNo(e.target.value)} />

                    <select className='flexbox-search-width flex h-8 w-1/7 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
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
                    </select>


                    <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-left ">From </label>
                    <Input className="w-1/7 flexbox-search-width-calender"
                        type="date"
                        value={fromdate}
                        onChange={(e) => setfromDate(e.target.value)}
                        placeholder="From Date"

                    />
                    <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-right">To </label>
                    <Input className="w-1/7 flexbox-search-width-calender"
                        type="date"
                        value={hidetodate}
                        onChange={handleTodate}
                        placeholder="To Date"

                    />

                   


                    <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>

                </div>
                {checkpending('Mayur') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}
                <Table className="mt-4">
                    <TableHeader className="bg-neutral-200 text-stone-950 ">


                        <TableHead className="text-center" >Id</TableHead>
                        <TableHead className="text-center" >Issue_Type</TableHead>
                        
                        <TableHead className="text-center" >Item_Lot_No</TableHead>
                        <TableHead className="text-center" >Origin</TableHead>
                        <TableHead className="text-center" >Issue_No</TableHead>
                        <TableHead className="text-center" >Mayur_Entry_Date</TableHead>

                        <TableHead className="text-center" >Incoming_Mixed_Lot_&_Origin</TableHead>
                        {/* <TableHead className="text-center" >Mixed Amount</TableHead> */}
                        <TableHead className="text-center">Opening Wholes_Peel</TableHead>
                    <TableHead className="text-center">Opening Wholes_Unpeel</TableHead>
                    <TableHead className="text-center">Receive Peeling</TableHead>
                    <TableHead className="text-center">Receive DPDS</TableHead>
                    <TableHead className="text-center">Receive Sorting</TableHead>
                    <TableHead className="text-center">Receive Village</TableHead>
                   
                    <TableHead className="text-center">Issue PW_W</TableHead>
                    <TableHead className="text-center">Issue W_Lot</TableHead>
                    <TableHead className="text-center">Issue WW</TableHead>
                    <TableHead className="text-center">Issue Hamsa</TableHead>
                    <TableHead className="text-center">Issue Rejection</TableHead>
                    <TableHead className="text-center">Issue Village</TableHead>
                    
                    <TableHead className="text-center">Issue LW</TableHead>
                    <TableHead className="text-center">Issue JB</TableHead>
                    <TableHead className="text-center">Issue Big_Taiho</TableHead>
                    {/* <TableHead className="text-center">Entry_Backlog</TableHead> */}
                    <TableHead className="text-center font-bold">Current_Backlog</TableHead>
                    <TableHead className="text-center">Mc_On_133</TableHead>
                    <TableHead className="text-center">Mc_Off_133</TableHead>
                    <TableHead className="text-center">Mc_Breakdown 133</TableHead>
                    <TableHead className="text-center">Other_Time 133</TableHead>
                    <TableHead className="text-center">Mc_On_331</TableHead>
                    <TableHead className="text-center">Mc_Off_331</TableHead>
                    <TableHead className="text-center">Mc_Breakdown 331</TableHead>
                    <TableHead className="text-center">Other_Time 331</TableHead>
                    <TableHead className="text-center">Mc_On_292</TableHead>
                    <TableHead className="text-center">Mc_Off_292</TableHead>
                    <TableHead className="text-center">Mc_Breakdown 292</TableHead>
                    <TableHead className="text-center">Other_Time 292</TableHead>
                    <TableHead className="text-center">Mc_On_293</TableHead>
                    <TableHead className="text-center">Mc_Off_293</TableHead>
                    <TableHead className="text-center">Mc_Breakdown 293</TableHead>
                    <TableHead className="text-center">Other_Time 293</TableHead>
                    <TableHead className="text-center">Runtime_133</TableHead>
                    <TableHead className="text-center">Runtime_331</TableHead>
                    <TableHead className="text-center">Runtime_292</TableHead>
                    <TableHead className="text-center">Runtime_293</TableHead>
               
                    <TableHead className="text-center">Operator_Day</TableHead>
                    <TableHead className="text-center">Operator_Night</TableHead>
                   
                        <TableHead className="text-center" >Edit Status </TableHead>
                        <TableHead className="text-center" >Created By </TableHead>
                        <TableHead className="text-center" >Action</TableHead>
                    </TableHeader>
                    <TableBody>


                        {EditData.length > 0 ? (EditData.map((item: MayurData, idx) => {

                            return (
                                <TableRow key={item.id}>
                                <TableCell className="text-center">{idx + 1}</TableCell>
                                <TableCell className="text-center font-bold ">{item.altid==1 ? 'Fresh Issue' : 'Re-Issue'}</TableCell>
                                        
                                        <TableCell className="text-center font-bold text-orange-500">{item.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                        <TableCell className="text-center font-semibold ">{item.altid}</TableCell>
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                  
                                        <TableCell className="text-center ">{item.mixingLot}</TableCell>
                                        {/* <TableCell className="text-center ">{item.rcv_transfer ? formatNumber(item.rcv_transfer):''}</TableCell> */}
                                        <TableCell className="text-center ">{formatNumber(item.rcv_wholespeel)}</TableCell>
                                        <TableCell className="text-center  ">{formatNumber(item.rcv_wholesunpeel)}</TableCell>
                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber((parseFloat(item.rcv_wholespeel) + parseFloat(item.rcv_wholesunpeel)).toString())}</TableCell>
                                      
                                        <TableCell  className="text-center font-semibold bg-yellow-100">{item.rcv_DPDS ? formatNumber(item.rcv_DPDS) :0}</TableCell>
                                        <TableCell className="text-center font-semibold bg-yellow-100">{item.rcv_sorting ?formatNumber(item.rcv_sorting):0}</TableCell>
                                        <TableCell className="text-center font-semibold bg-yellow-100">{item.rcv_village ?formatNumber(item.rcv_village):0}</TableCell>
                                      

                                        <TableCell className="text-center ">{formatNumber(item.issue_pw_w)}</TableCell>
                                        
                                        <TableCell className="text-center ">{formatNumber(item.issue_w_lot)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww)}</TableCell>
                                        <TableCell className="text-center bg-red-100 font-semibold ">{formatNumber((parseFloat(item.issue_pw_w) + parseFloat(item.issue_w_lot)+parseFloat(item.issue_ww)).toString())}</TableCell>
                                        <TableCell className="text-center bg-red-100 font-semibold">{formatNumber(item.issue_rejection)}</TableCell>
                                        <TableCell className="text-center bg-red-100 font-semibold">{formatNumber(item.issue_village)}</TableCell>
                                        
                                        <TableCell className="text-center bg-red-100 font-semibold">{formatNumber(item.issue_LW)}</TableCell>
                                        <TableCell className="text-center bg-red-100 font-semibold">{formatNumber(item.issue_JB)}</TableCell>
                                        <TableCell className="text-center bg-red-100 font-semibold">{formatNumber(item.issue_bigTaiho)}</TableCell>
                                       
                                        {/* <TableCell className="text-center font-bold text-blue-600">{formatNumber(item.entry_backlog)} kg</TableCell> */}
                                               
                                        <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(item.current_backlog)}kg</TableCell>
                                        
                                        
                            <TableCell className="text-center">{handleAMPM(item.Mc_on_133.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_133.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_133.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_133.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            
                            
                            <TableCell className="text-center">{handleAMPM(item.Mc_on_331.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_331.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_331.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_331.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            
                            
                            <TableCell className="text-center">{handleAMPM(item.Mc_on_292.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_292.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_292.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_292.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            
                            <TableCell className="text-center">{handleAMPM(item.Mc_on_293.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_293.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_293.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_293.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            
                            
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_133.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_331.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_292.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_293.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>

                            <TableCell className="text-center">{item.noOfdayOperators}</TableCell>
                            <TableCell className="text-center">{item.noOfnightOperators}</TableCell>
                                        <TableCell className="text-center">{item.editStatus}</TableCell>
                                        <TableCell className="text-center">{item.CreatedBy}</TableCell>

                                <TableCell className="text-center">
                                        <Popover>
                                            <PopoverTrigger>
                                                <button className="bg-cyan-500 p-2 text-white rounded">Action</button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                                <AlertDialog>
                                                    <AlertDialogTrigger className="flex">
                                                        <FcApprove size={25} /> <button className="bg-transparent pb-2 pl-1 text-left hover:text-green-500">Approve</button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Do you want to Approve the Edit Request?</AlertDialogTitle>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleApprove(item)}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                                <AlertDialog>
                                                    <AlertDialogTrigger className="flex mt-2">
                                                        <FcDisapprove size={25} /> <button className="bg-transparent pt-0.5 pl-1 text-left hover:text-red-500">Revert</button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Do you want to Decline the Edit Request?</AlertDialogTitle>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleRejection(item)}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ) })): (

                            Data.length > 0 ? (Data.map((item: MayurData, idx) => {
                             
                              
                      

                                return (
                                    <TableRow key={item.id} className={`${item.latest==1 ? '' : 'opacity-50 hover:bg-gray-200 bg-gray-200'}`}>
                                        <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                        <TableCell className="text-center font-bold ">{item.altid==1 ? 'Fresh Issue' : 'Re-Issue'}</TableCell>
                                        
                                        <TableCell className="text-center font-bold text-orange-500">{item.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                        <TableCell className="text-center font-semibold ">{item.altid}</TableCell>
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                  
                                        <TableCell className="text-center ">{item.mixingLot}</TableCell>
                                        {/* <TableCell className="text-center ">{item.rcv_transfer ? formatNumber(item.rcv_transfer):''}</TableCell> */}
                                        <TableCell className="text-center ">{formatNumber(item.rcv_wholespeel)}</TableCell>
                                        <TableCell className="text-center  ">{formatNumber(item.rcv_wholesunpeel)}</TableCell>
                                        <TableCell className="text-center bg-yellow-100 font-semibold">{formatNumber((parseFloat(item.rcv_wholespeel) + parseFloat(item.rcv_wholesunpeel)).toString())}</TableCell>
                                      
                                        <TableCell  className="text-center bg-yellow-100 font-semibold">{item.rcv_DPDS ? formatNumber(item.rcv_DPDS) :0}</TableCell>
                                        <TableCell className="text-center bg-yellow-100  font-semibold">{item.rcv_sorting ?formatNumber(item.rcv_sorting):0}</TableCell>
                                        <TableCell className="text-center bg-yellow-100  font-semibold">{item.rcv_village ?formatNumber(item.rcv_village):0}</TableCell>
                                      

                                        <TableCell className="text-center  ">{formatNumber(item.issue_pw_w)}</TableCell>
                                        
                                        <TableCell className="text-center  ">{formatNumber(item.issue_w_lot)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww)}</TableCell>
                                        <TableCell className="text-center font-semibold bg-red-100">{formatNumber((parseFloat(item.issue_ww) + parseFloat(item.issue_w_lot)+ parseFloat(item.issue_pw_w)).toString())}</TableCell>

                                        <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_rejection)}</TableCell>
                                        <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_village)}</TableCell>
                                       
                                        <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_LW)}</TableCell>
                                        <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_JB)}</TableCell>
                                        <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_bigTaiho)}</TableCell>
                                       
                                        {/* <TableCell className="text-center font-semibold text-blue-600">{formatNumber(item.entry_backlog)} kg</TableCell> */}
                                               
                                        <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(item.current_backlog)} kg</TableCell>
                                        
                                        
                                        <TableCell className="text-center">{handleAMPM(item.Mc_on_133.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_133.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_133.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_133.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            
                            
                            <TableCell className="text-center">{handleAMPM(item.Mc_on_331.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_331.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_331.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_331.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            
                            
                            <TableCell className="text-center">{handleAMPM(item.Mc_on_292.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_292.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_292.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_292.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            
                            <TableCell className="text-center">{handleAMPM(item.Mc_on_293.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_293.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_293.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_293.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            
                            
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_133.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_331.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_292.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_293.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>

                            <TableCell className="text-center">{item.noOfdayOperators}</TableCell>
                            <TableCell className="text-center">{item.noOfnightOperators}</TableCell>
                                        <TableCell className="text-center">{item.editStatus}</TableCell>
                                        <TableCell className="text-center">{item.CreatedBy}</TableCell>

                                        <TableCell className="text-center">
                                            <Popover>
                                                <PopoverTrigger>
                                                    <button className={`p-2 text-white rounded ${item.editStatus === 'Pending' || item.latest === 0? 'bg-cyan-200' : 'bg-cyan-500'}`} disabled={item.editStatus === 'Pending' || item.latest === 0 ? true : false}>Action</button>
                                                </PopoverTrigger>
                                                <PopoverContent className="flex flex-col text-sm w-30 font-medium">
                                                    <Dialog>
                                                        <DialogTrigger className="flex"><CiEdit size={20} />
                                                            <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Modify</button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-7xl">
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className='text-1xl pb-1 text-center mt-1'>Mayur Entry Modification</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <RCNMayurEditForm borma={[item]} />
                                                        </DialogContent>
                                                        
                                                    </Dialog>
                                                    {Number(item.current_backlog) > 0 && <Dialog>
                                                        <DialogTrigger className="flex"><CiBoxes size={20} />
                                                            <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Re-Issue</button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-7xl">
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className='text-1xl pb-1 text-center mt-1'>Mayur Entry Reissue</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <RCNMayurReCreateForm borma={[item]} />
                                                        </DialogContent>
                                                        
                                                    </Dialog>}
                                                    {Number(item.current_backlog) > 0 && <Dialog>
                                                        <DialogTrigger className="flex"><CiCrop size={20} />
                                                            <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Mix</button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-4xl">
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    {/* <p className='text-1xl pb-1 text-center mt-1'>Mayur Entry Mixation</p> */}
                                                                    <p className='text-1xl pb-1 text-center mt-3'>Lot No : {item.LotNo} ({item.origin})</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <RCNMayurReMix borma={item} />
                                                        </DialogContent>
                                                        
                                                    </Dialog>}
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
                                <TableCell><p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">No Result </p></TableCell>
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

                </Table>
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
                <dialog id="rcneditapproveScsDialog" className="dashboard-modal">
                <button id="rcneditScscloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">Modification Request has Been Approved</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="rcneditapproveRejectDialog" className="dashboard-modal">
                <button id="rcneditRejectcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">Modification Request has Been Reverted</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
            </div>


        </>
    )




}

export default MayurTable;