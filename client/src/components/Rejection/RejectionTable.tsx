import { useContext, useEffect, useState } from "react";
import { Origin, pagelimit, pageNo, pendingCheckRole } from "../common/exportData";
import Context from "../context/context";
import axios from "axios";
import {  RejectionData, pendingCheckRoles, PermissionRole } from "@/type/type";
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
import {  CiBoxes, CiCrop, CiEdit } from "react-icons/ci";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import RejectionEDitForm from "./RejectionModify";
import RejectionReMix from "./RejectionMix";
import RejectionReCreateForm from "./RejectionReissue";




const RejectionTable = () => {
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
    const [hidetodate, sethidetoDate] = useState<string>('');
    const currDate = new Date().toLocaleDateString();
    const [origin, setOrigin] = useState<string>("")
    const [blockpagen, setblockpagen] = useState('flex')
    const [EditData, setEditData] = useState<RejectionData[]>([])
    const [blConNo, setBlConNo] = useState<string>("")
    const { editRejectionLotWiseData } = useContext(Context);
    const [Data, setData] = useState<RejectionData[]>([])
     const dropdown = ['LOT', 'V-LOT']
        const [searchType, setsearchType] = useState('LOT')
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

         if (searchType === 'LOT') {
        const response = await axios.put('/api/rejection/rejectionprimarysearch', {
            searchitem: blConNo,
            fromDate: fromdate,
            toDate: todate,
            origin: origin,
            type:'LOT'
        })
        const data1 = await response.data

        let ws
        let transformed: any[] = [];
        if (EditData.length > 0) {
            transformed = EditData.map((item: RejectionData, idx: number) => ({
            Sl_No: idx + 1, 
            Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
            Item_Lot_No: item.LotNo,
            Origin: item.origin,
            Issue_No: item.altid,
            Rejection_Entry_Date: handletimezone(item.date),
                Mixing_Lot: item.mixingLot,   
                Opening_Peeling: formatNumber(item.rcv_peeling),
                Borma_Peeling: formatNumber(item.issue_add_7),
                Peeling_Borma_Loss_Kg: formatNumber(item.issue_add_2),
                Peeling_Borma_Loss_Percentage: formatNumber(item.issue_add_3),
                Opening_Mayur: formatNumber(item.rcv_mayur),
                Borma_Mayur: formatNumber(item.issue_add_8),
                Mayur_Borma_Loss_Kg: formatNumber(item.issue_add_5),
                Mayur_Borma_Loss_Percentage: formatNumber(item.issue_add_6),
                Opening_Wholes: item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0,
                Opening_LW: item.rcv_wholes ? formatNumber(item.rcv_lw) : 0,
                Opening_DPDS: item.rcv_wholes ? formatNumber(item.rcv_dpds) : 0,
                Opening_Sorting: item.rcv_wholes ? formatNumber(item.rcv_sorting) : 0,
                Opening_BigTaiho: item.rcv_wholes ? formatNumber(item.rcv_bigTaiho) : 0,
                Opening_Village: item.rcv_wholes ? formatNumber(item.rcv_village) : 0,
                Receive_Total:formatNumber((parseFloat(item.issue_add_7)+parseFloat(item.issue_add_8)
                +item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0+item.rcv_lw ? formatNumber(item.rcv_lw) : 0
                +item.rcv_dpds ? formatNumber(item.rcv_dpds) : 0+item.rcv_sorting ? formatNumber(item.rcv_sorting) : 0
                +item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) : 0+item.rcv_village ? formatNumber(item.rcv_village) : 0).toString()),  
                issue_packing: formatNumber(item.issue_packing),
                issue_village: formatNumber(item.issue_village),
                issue_uncut_unscoop: formatNumber(item.issue_uncut_unscoop),
                issue_shell: formatNumber(item.issue_shell),
                issue_catelfeed: formatNumber(item.issue_catelfeed),         
                Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),          
                Labour: item.noOfdayOperators,
                Superisor: item.noOfnightOperators,
               
           
            Edit_Status: item.editStatus,
            Created_By: item.CreatedBy,
            Modified_By: item.modifiedBy 

            }));
            //setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else {
            transformed = data1.rcnEntries.map((item: RejectionData, idx: number) => ({
                Sl_No: idx + 1, 
                Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
                Item_Lot_No: item.LotNo,
                Origin: item.origin,
                Issue_No: item.altid,
                Rejection_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,   
                    Opening_Peeling: formatNumber(item.rcv_peeling),
                    Borma_Peeling: formatNumber(item.issue_add_7),
                    Peeling_Borma_Loss_Kg: formatNumber(item.issue_add_2),
                    Peeling_Borma_Loss_Percentage: formatNumber(item.issue_add_3),
                    Opening_Mayur: formatNumber(item.rcv_mayur),
                    Borma_Mayur: formatNumber(item.issue_add_8),
                    Mayur_Borma_Loss_Kg: formatNumber(item.issue_add_5),
                    Mayur_Borma_Loss_Percentage: formatNumber(item.issue_add_6),
                    Opening_Wholes: item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0,
                    Opening_LW: item.rcv_wholes ? formatNumber(item.rcv_lw) : 0,
                    Opening_DPDS: item.rcv_wholes ? formatNumber(item.rcv_dpds) : 0,
                    Opening_Sorting: item.rcv_wholes ? formatNumber(item.rcv_sorting) : 0,
                    Opening_BigTaiho: item.rcv_wholes ? formatNumber(item.rcv_bigTaiho) : 0,
                    Opening_Village: item.rcv_wholes ? formatNumber(item.rcv_village) : 0,
                    Receive_Total:formatNumber((parseFloat(item.issue_add_7)+parseFloat(item.issue_add_8)
                    +item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0+item.rcv_lw ? formatNumber(item.rcv_lw) : 0
                    +item.rcv_dpds ? formatNumber(item.rcv_dpds) : 0+item.rcv_sorting ? formatNumber(item.rcv_sorting) : 0
                    +item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) : 0+item.rcv_village ? formatNumber(item.rcv_village) : 0).toString()),  
                    issue_packing: formatNumber(item.issue_packing),
                    issue_village: formatNumber(item.issue_village),
                    issue_uncut_unscoop: formatNumber(item.issue_uncut_unscoop),
                    issue_shell: formatNumber(item.issue_shell),
                    issue_catelfeed: formatNumber(item.issue_catelfeed),         
                    Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),          
                    Labour: item.noOfdayOperators,
                    Superisor: item.noOfnightOperators,
                   
               
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
        saveAs(blob, 'Rejection_Entry_' + currDate + '.xlsx');
    }
    else{
        const response = await axios.put('/api/rejection/rejectionprimarysearch', {
            searchitem: blConNo,
            fromDate: fromdate,
            toDate: todate,
            origin: origin,
            type:'VLOT'
        })
        const data1 = await response.data

        let ws
        let transformed: any[] = [];
        if (EditData.length > 0) {
            transformed = EditData.map((item: RejectionData, idx: number) => ({
            Sl_No: idx + 1, 
            Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
            Item_Lot_No: item.LotNo,
            Origin: item.origin,
            Issue_No: item.altid,
            Rejection_Entry_Date: handletimezone(item.date),
                Mixing_Lot: item.mixingLot,   
                Opening_Peeling: formatNumber(item.rcv_peeling),
                Borma_Peeling: formatNumber(item.issue_add_7),
                Peeling_Borma_Loss_Kg: formatNumber(item.issue_add_2),
                Peeling_Borma_Loss_Percentage: formatNumber(item.issue_add_3),
                Opening_Mayur: formatNumber(item.rcv_mayur),
                Borma_Mayur: formatNumber(item.issue_add_8),
                Mayur_Borma_Loss_Kg: formatNumber(item.issue_add_5),
                Mayur_Borma_Loss_Percentage: formatNumber(item.issue_add_6),
                Opening_Wholes: item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0,
                Opening_LW: item.rcv_wholes ? formatNumber(item.rcv_lw) : 0,
                Opening_DPDS: item.rcv_wholes ? formatNumber(item.rcv_dpds) : 0,
                Opening_Sorting: item.rcv_wholes ? formatNumber(item.rcv_sorting) : 0,
                Opening_BigTaiho: item.rcv_wholes ? formatNumber(item.rcv_bigTaiho) : 0,
                Opening_Village: item.rcv_wholes ? formatNumber(item.rcv_village) : 0,
                Receive_Total:formatNumber((parseFloat(item.issue_add_7)+parseFloat(item.issue_add_8)
                +item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0+item.rcv_lw ? formatNumber(item.rcv_lw) : 0
                +item.rcv_dpds ? formatNumber(item.rcv_dpds) : 0+item.rcv_sorting ? formatNumber(item.rcv_sorting) : 0
                +item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) : 0+item.rcv_village ? formatNumber(item.rcv_village) : 0).toString()),  
                issue_packing: formatNumber(item.issue_packing),
                issue_village: formatNumber(item.issue_village),
                issue_uncut_unscoop: formatNumber(item.issue_uncut_unscoop),
                issue_shell: formatNumber(item.issue_shell),
                issue_catelfeed: formatNumber(item.issue_catelfeed),         
                Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),          
                Labour: item.noOfdayOperators,
                Superisor: item.noOfnightOperators,
               
           
            Edit_Status: item.editStatus,
            Created_By: item.CreatedBy,
            Modified_By: item.modifiedBy 

            }));
            //setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else {
            transformed = data1.rcnEntries.map((item: RejectionData, idx: number) => ({
                Sl_No: idx + 1, 
                Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
                Item_Lot_No: item.LotNo,
                Origin: item.origin,
                Issue_No: item.altid,
                Rejection_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,   
                    Opening_Peeling: formatNumber(item.rcv_peeling),
                    Borma_Peeling: formatNumber(item.issue_add_7),
                    Peeling_Borma_Loss_Kg: formatNumber(item.issue_add_2),
                    Peeling_Borma_Loss_Percentage: formatNumber(item.issue_add_3),
                    Opening_Mayur: formatNumber(item.rcv_mayur),
                    Borma_Mayur: formatNumber(item.issue_add_8),
                    Mayur_Borma_Loss_Kg: formatNumber(item.issue_add_5),
                    Mayur_Borma_Loss_Percentage: formatNumber(item.issue_add_6),
                    Opening_Wholes: item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0,
                    Opening_LW: item.rcv_wholes ? formatNumber(item.rcv_lw) : 0,
                    Opening_DPDS: item.rcv_wholes ? formatNumber(item.rcv_dpds) : 0,
                    Opening_Sorting: item.rcv_wholes ? formatNumber(item.rcv_sorting) : 0,
                    Opening_BigTaiho: item.rcv_wholes ? formatNumber(item.rcv_bigTaiho) : 0,
                    Opening_Village: item.rcv_wholes ? formatNumber(item.rcv_village) : 0,
                    Receive_Total:formatNumber((parseFloat(item.issue_add_7)+parseFloat(item.issue_add_8)
                    +item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0+item.rcv_lw ? formatNumber(item.rcv_lw) : 0
                    +item.rcv_dpds ? formatNumber(item.rcv_dpds) : 0+item.rcv_sorting ? formatNumber(item.rcv_sorting) : 0
                    +item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) : 0+item.rcv_village ? formatNumber(item.rcv_village) : 0).toString()),  
                    issue_packing: formatNumber(item.issue_packing),
                    issue_village: formatNumber(item.issue_village),
                    issue_uncut_unscoop: formatNumber(item.issue_uncut_unscoop),
                    issue_shell: formatNumber(item.issue_shell),
                    issue_catelfeed: formatNumber(item.issue_catelfeed),         
                    Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),          
                    Labour: item.noOfdayOperators,
                    Superisor: item.noOfnightOperators,
                   
               
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
        saveAs(blob, 'Rejection_Entry_' + currDate + '.xlsx');
    }
    }
    const handleSearch = async () => {

        setEditData([])
        setblockpagen('flex')
         if (searchType === 'LOT') {
        const response = await axios.put('/api/rejection/rejectionprimarysearch', {
            searchitem: blConNo,
            fromDate: fromdate,
            toDate: todate,
            origin: origin,
            type:'LOT'

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
    else{
const response = await axios.put('/api/rejection/rejectionprimarysearch', {
            searchitem: blConNo,
            fromDate: fromdate,
            toDate: todate,
            origin: origin,
            type:'VLOT'

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

    }
    useEffect(() => {
        if (editRejectionLotWiseData.length > 0) {
            //console.log(editPendingData)
            setEditData(editRejectionLotWiseData)
            setblockpagen('none')
        }

    },[editRejectionLotWiseData])
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
 
    const handleApprove = async (item: RejectionData) => {
        const response = await axios.put(`/api/rejection/approveeditRejection/${item.id}/${item.LotNo}/${item.origin}`)
        const data = await response.data
        if (data.message === "Edit Request of Rejection Entry is Approved Successfully") {

            if (approvesuccessdialog != null) {
                (approvesuccessdialog as any).showModal();
            }
        }
    }
    const handleRejection = async (item: RejectionData) => {
        const response = await axios.delete(`/api/rejection/rejectededitRejection/${item.id}/${item.LotNo}/${item.origin}`)
        const data = await response.data
        console.log(data)
        if (data.message === "Rejection Entry rejected successfully") {
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
            <div className="w-full">
                    <select className='mb-5 h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                        onChange={(e) => setsearchType(e.target.value)} value={searchType}>

                        {dropdown.map((data, index) => (
                            <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                                {data}
                            </option>
                        ))}
                    </select>
                </div>
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
            {checkpending('Rejection') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}
            <Table className="mt-4">
                <TableHeader className="bg-neutral-200 text-stone-950 ">


                    <TableHead className="text-center" >Id</TableHead>
                    <TableHead className="text-center" >Issue_Type</TableHead>
                    
                    <TableHead className="text-center" >Item_Lot_No</TableHead>
                    <TableHead className="text-center" >Origin</TableHead>
                    <TableHead className="text-center" >Issue_No</TableHead>
                    <TableHead className="text-center" >Rejection_Entry_Date</TableHead>
                    <TableHead className="text-center font-bold">Current_Backlog</TableHead> 
                    <TableHead className="text-center" >Incoming_Mixed_Lot_&_Origin</TableHead>
                      <TableHead className="text-center" >Action</TableHead>
                    {/* <TableHead className="text-center" >Mixed Amount</TableHead> */}
                    <TableHead className="text-center">Receive Peeling</TableHead>
                    <TableHead className="text-center">Peeling Borma_Loss(Kg)</TableHead>
                    <TableHead className="text-center">Peeling Borma_Loss(%)</TableHead>
                   
                    <TableHead className="text-center">Receive Mayur</TableHead>
                    <TableHead className="text-center">Mayur Borma_Loss(Kg)</TableHead>
                    <TableHead className="text-center">Mayur Borma_Loss(%)</TableHead>
                    <TableHead className="text-center">Receive Peeling(Borma)</TableHead>
                    <TableHead className="text-center">Receive Mayur(Borma)</TableHead>
                    <TableHead className="text-center">Receive Wholes</TableHead>
                    <TableHead className="text-center">Receive LW</TableHead>
                    <TableHead className="text-center">Receive DPDS</TableHead>
                    <TableHead className="text-center">Receive Sorting</TableHead>
                    <TableHead className="text-center">Receive BigTaiho</TableHead>
                    <TableHead className="text-center">Receive Village</TableHead>
                    <TableHead className="text-center">Rejection_Total_Opening (Borma)</TableHead>
                    <TableHead className="text-center">Issue Village</TableHead>
                    <TableHead className="text-center">Issue Packing</TableHead>
                            <TableHead className="text-center">Issue Uncut_Unscoop</TableHead>
                            <TableHead className="text-center">Issue Shell</TableHead>
                            <TableHead className="text-center">Issue Catelfeed</TableHead>
                               
                    {/* <TableHead className="text-center">Issue Add 1</TableHead>
                    <TableHead className="text-center">Issue Add 2</TableHead>
                    <TableHead className="text-center">Issue Add 3</TableHead>
                    <TableHead className="text-center">Issue Add 4</TableHead>
                    <TableHead className="text-center">Issue Add 5</TableHead>
                    <TableHead className="text-center">Issue Add 6</TableHead>
                    <TableHead className="text-center">Issue Add 7</TableHead>
                    <TableHead className="text-center">Issue Add 8</TableHead>
                    <TableHead className="text-center">Issue Add 9</TableHead>
                    <TableHead className="text-center">Issue Add 10</TableHead> */}
                     <TableHead className="text-center font-bold">Rejection Total_Issue(Kg)</TableHead>
                    {/* <TableHead className="text-center">Entry_Backlog</TableHead> */}
                    
                    <TableHead className="text-center">No of Labour</TableHead>
                    <TableHead className="text-center">No of Supervisor</TableHead>
               
                    <TableHead className="text-center" >Edit Status </TableHead>
                    <TableHead className="text-center" >Created By </TableHead>
                  
                </TableHeader>
                <TableBody>


                    {EditData.length > 0 ? (EditData.map((item: RejectionData, idx) => {

                        return (
                            <TableRow key={item.id}>
                                <TableCell className="text-center">{idx + 1}</TableCell>
                                <TableCell className="text-center font-bold ">{item.altid == 1 ? 'Fresh Issue' : 'Re-Issue'}</TableCell>
                               
                                <TableCell className="text-center font-bold text-orange-500">{item.LotNo}</TableCell>
                                <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                <TableCell className="text-center font-semibold ">{item.altid}</TableCell>
                                <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(item.current_backlog)}kg</TableCell>

                                <TableCell className="text-center font-semibold">{item.mixingLot}</TableCell>
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
                                {/* <TableCell className="text-center ">{item.rcv_transfer ? formatNumber(item.rcv_transfer):''}</TableCell> */}
                                <TableCell className="text-center ">{formatNumber(item.rcv_peeling)}</TableCell>
                                <TableCell className="text-center font-semibold  text-red-500">{formatNumber(item.issue_add_2)} Kg</TableCell>
                                <TableCell className="text-center font-semibold  text-red-500 ">{formatNumber(item.issue_add_3)} %</TableCell>
                                <TableCell className="text-center font-semibold">{formatNumber(item.rcv_mayur)}</TableCell>
                                <TableCell className="text-center font-semibold  text-red-500">{formatNumber(item.issue_add_5)} Kg</TableCell>
                                <TableCell className="text-center font-semibold  text-red-500 ">{formatNumber(item.issue_add_6)} %</TableCell>
                                <TableCell className="text-center text-center bg-yellow-100 font-semibold">
                                    {formatNumber(item.issue_add_7)}
                                </TableCell>
                                <TableCell className="text-center text-center bg-yellow-100 font-semibold">
                                    {formatNumber(item.issue_add_8)}
                                </TableCell>
                                <TableCell className="text-center font-semibold  bg-yellow-100 ">{item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0}</TableCell>
                                <TableCell className="text-center font-semibold  bg-yellow-100 ">{item.rcv_lw ? formatNumber(item.rcv_lw) : 0}</TableCell>
                                <TableCell className="text-center font-semibold  bg-yellow-100 ">{item.rcv_dpds ? formatNumber(item.rcv_dpds) : 0}</TableCell>
                                <TableCell className="text-center font-semibold  bg-yellow-100 ">{item.rcv_sorting ? formatNumber(item.rcv_sorting) : 0}</TableCell>
                                <TableCell className="text-center font-semibold  bg-yellow-100 ">{item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) : 0}</TableCell>
                                <TableCell className="text-center font-semibold  bg-yellow-100 ">{item.rcv_village ? formatNumber(item.rcv_village) : 0}</TableCell>
                                <TableCell className="text-center font-semibold  bg-green-500 text-white">{formatNumber((parseFloat(item.issue_add_7) + parseFloat(item.issue_add_8)
                                    + (item.rcv_wholes ? parseFloat(item.rcv_wholes) : 0) + (item.rcv_lw ? parseFloat(item.rcv_lw) : 0)
                                    + (item.rcv_dpds ? parseFloat(item.rcv_dpds) : 0) + (item.rcv_sorting ? parseFloat(item.rcv_sorting) : 0)
                                    + (item.rcv_bigTaiho ? parseFloat(item.rcv_bigTaiho) : 0) + (item.rcv_village ? parseFloat(item.rcv_village) : 0)).toString())
                                } Kg</TableCell>
                                <TableCell className="text-center  ">{formatNumber(item.issue_village)}</TableCell>
                                <TableCell className="text-center ">{formatNumber(item.issue_packing)}</TableCell>
                                <TableCell className="text-center  ">{formatNumber(item.issue_uncut_unscoop)}</TableCell>
                                <TableCell className="text-center  ">{formatNumber(item.issue_shell)}</TableCell>
                                <TableCell className="text-center  ">{formatNumber(item.issue_catelfeed)}</TableCell>
                                {/* <TableCell className="text-center font-semibold text-blue-600">{formatNumber(item.entry_backlog)} kg</TableCell> */}
                               
                                <TableCell className="text-center font-bold bg-yellow-500 text-white ">{formatNumber((parseFloat(item.issue_village) + parseFloat(item.issue_packing)+parseFloat(item.issue_uncut_unscoop)
                                +parseFloat(item.issue_shell) +parseFloat(item.issue_catelfeed)).toString())} Kg</TableCell>
                                <TableCell className="text-center">{item.noOfdayOperators}</TableCell>
                                <TableCell className="text-center">{item.noOfnightOperators}</TableCell>
                                <TableCell className="text-center">{item.editStatus}</TableCell>
                                <TableCell className="text-center">{item.CreatedBy}</TableCell>

                            
                            </TableRow>
                        ) })): (
                        Data.length > 0 ? (Data.map((item: RejectionData, idx) => {
                            return (
                                <TableRow key={item.id} className={`${item.latest==1 ? '' : 'opacity-50 hover:bg-gray-200 bg-gray-200'}`}>
                                    <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                    <TableCell className="text-center font-bold ">{item.altid == 1 ? 'Fresh Issue' : 'Re-Issue'}</TableCell>
                                <TableCell className="text-center font-bold text-orange-500">{item.LotNo}</TableCell>
                                <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                <TableCell className="text-center font-semibold ">{item.altid}</TableCell>
                                <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(item.current_backlog)}kg</TableCell>

                                <TableCell className="text-center ">{item.mixingLot}</TableCell>
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
                                                    <DialogContent className="max-w-screen">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <p className='text-1xl pb-1 text-center mt-1'>Rejection Entry Modification</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <RejectionEDitForm borma={[item]} />
                                                    </DialogContent>
                                                    
                                                </Dialog>
                                                {Number(item.current_backlog) > 0 && <Dialog>
                                                    <DialogTrigger className="flex"><CiBoxes size={20} />
                                                        <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Re-Issue</button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-7xl">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <p className='text-1xl pb-1 text-center mt-1'>Rejection Entry Re-issue</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <RejectionReCreateForm borma={[item]} />
                                                    </DialogContent>
                                                    
                                                </Dialog>}
                                                {Number(item.current_backlog) > 0 && <Dialog>
                                                    <DialogTrigger className="flex"><CiCrop size={20} />
                                                        <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Mix</button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-screen">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                {/* <p className='text-1xl pb-1 text-center mt-1'>Mayur Entry Mixation</p> */}
                                                                <p className='text-1xl pb-1 text-center mt-3'>Lot No : {item.LotNo} ({item.origin})</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <RejectionReMix borma={item} />
                                                    </DialogContent>
                                                    
                                                </Dialog>}
                                            </PopoverContent>
                                            
                                        </Popover>
                                    </TableCell>
                                {/* <TableCell className="text-center ">{item.rcv_transfer ? formatNumber(item.rcv_transfer):''}</TableCell> */}
                                <TableCell className="text-center font-semibold">{formatNumber(item.rcv_peeling)}</TableCell>
                                <TableCell className="text-center font-semibold  text-red-500">{formatNumber(item.issue_add_2)} Kg</TableCell>
                                <TableCell className="text-center font-semibold  text-red-500 ">{formatNumber(item.issue_add_3)} %</TableCell>
                                <TableCell className="text-center font-semibold">{formatNumber(item.rcv_mayur)}</TableCell>
                                <TableCell className="text-center font-semibold  text-red-500">{formatNumber(item.issue_add_5)} Kg</TableCell>
                                <TableCell className="text-center font-semibold  text-red-500 ">{formatNumber(item.issue_add_6)} %</TableCell>
                                <TableCell className="text-center text-center bg-yellow-100 font-semibold">
                                    {formatNumber(item.issue_add_7)}
                                </TableCell>
                                <TableCell className="text-center text-center bg-yellow-100 font-semibold">
                                    {formatNumber(item.issue_add_8)}
                                </TableCell>
                                <TableCell className="text-center font-semibold  bg-yellow-100 ">{item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0}</TableCell>
                                <TableCell className="text-center font-semibold  bg-yellow-100 ">{item.rcv_lw ? formatNumber(item.rcv_lw) : 0}</TableCell>
                                <TableCell className="text-center font-semibold  bg-yellow-100 ">{item.rcv_dpds ? formatNumber(item.rcv_dpds) : 0}</TableCell>
                                <TableCell className="text-center font-semibold  bg-yellow-100 ">{item.rcv_sorting ? formatNumber(item.rcv_sorting) : 0}</TableCell>
                                <TableCell className="text-center font-semibold  bg-yellow-100 ">{item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) : 0}</TableCell>
                                <TableCell className="text-center font-semibold  bg-yellow-100 ">{item.rcv_village ? formatNumber(item.rcv_village) : 0}</TableCell>
                                <TableCell className="text-center font-semibold  bg-green-500 text-white">{formatNumber((parseFloat(item.issue_add_7) + parseFloat(item.issue_add_8)
                                    + (item.rcv_wholes ? parseFloat(item.rcv_wholes) : 0) + (item.rcv_lw ? parseFloat(item.rcv_lw) : 0)
                                    + (item.rcv_dpds ? parseFloat(item.rcv_dpds) : 0) + (item.rcv_sorting ? parseFloat(item.rcv_sorting) : 0)
                                    + (item.rcv_bigTaiho ? parseFloat(item.rcv_bigTaiho) : 0) + (item.rcv_village ? parseFloat(item.rcv_village) : 0)).toString())
                                } Kg</TableCell>
                                <TableCell className="text-center  ">{formatNumber(item.issue_village)}</TableCell>
                                <TableCell className="text-center ">{formatNumber(item.issue_packing)}</TableCell>
                                <TableCell className="text-center  ">{formatNumber(item.issue_uncut_unscoop)}</TableCell>
                                <TableCell className="text-center  ">{formatNumber(item.issue_shell)}</TableCell>
                                <TableCell className="text-center  ">{formatNumber(item.issue_catelfeed)}</TableCell>
                                {/* <TableCell className="text-center font-semibold text-blue-600">{formatNumber(item.entry_backlog)} kg</TableCell> */}
                               
                                <TableCell className="text-center font-bold bg-yellow-500 text-white ">{formatNumber((parseFloat(item.issue_village) + parseFloat(item.issue_packing)+parseFloat(item.issue_uncut_unscoop)
                                +parseFloat(item.issue_shell) +parseFloat(item.issue_catelfeed)).toString())} Kg</TableCell>
                                <TableCell className="text-center">{item.noOfdayOperators}</TableCell>
                                <TableCell className="text-center">{item.noOfnightOperators}</TableCell>
                                <TableCell className="text-center">{item.editStatus}</TableCell>
                                <TableCell className="text-center">{item.CreatedBy}</TableCell>
                                    
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

export default RejectionTable;