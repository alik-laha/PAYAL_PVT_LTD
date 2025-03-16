import { useContext, useEffect, useState } from "react";
import { Origin, pagelimit, pageNo, pendingCheckRole } from "../common/exportData";
import Context from "../context/context";
import axios from "axios";
import {  LWData, pendingCheckRoles, PermissionRole } from "@/type/type";
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
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import LWEDitForm from "./LWEdit";




const LWTable = () => {
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
    const [hidetodate, sethidetoDate] = useState<string>('');
    const currDate = new Date().toLocaleDateString();
    const [origin, setOrigin] = useState<string>("")
    const [blockpagen, setblockpagen] = useState('flex')
    const [EditData, setEditData] = useState<LWData[]>([])
    const [blConNo, setBlConNo] = useState<string>("")
    const { editLWLotWiseData } = useContext(Context);
    const [Data, setData] = useState<LWData[]>([])
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
        const response = await axios.put('/api/lw/lwprimarysearch', {
            searchitem: blConNo,
            fromDate: fromdate,
            toDate: todate,
            origin: origin,
        })
        const data1 = await response.data

        let ws
        let transformed: any[] = [];
        if (EditData.length > 0) {
            transformed = EditData.map((item: LWData, idx: number) => ({
            Sl_No: idx + 1, 
            Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
            Item_Lot_No: item.LotNo,
            Origin: item.origin,
            Issue_No: item.altid,
            LW_Entry_Date: handletimezone(item.date),
                Mixing_Lot: item.mixingLot,
                
                Opening_Mayur: formatNumber(item.rcv_mayur),
                Borma_Mayur: formatNumber(item.issue_add_7),
                Mayur_Borma_Loss_Kg: formatNumber(item.issue_add_2),
                Mayur_Borma_Loss_Percentage: formatNumber(item.issue_add_3),
                Opening_Hamsa: formatNumber(item.rcv_hamsa),
                Borma_Hamsa: formatNumber(item.issue_add_8),
                Hamsa_Borma_Loss_Kg: formatNumber(item.issue_add_5),
                Hamsa_Borma_Loss_Percentage: formatNumber(item.issue_add_6),
                Opening_Wholes: item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0,
                Receive_Total:formatNumber((parseFloat(item.issue_add_7)+parseFloat(item.issue_add_8)
                +item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0).toString()),  
                issue_kw: formatNumber(item.issue_kw),
                issue_kw_1: formatNumber(item.issue_kw_1),
                issue_kw_2: formatNumber(item.issue_kw_2),
                issue_kn: formatNumber(item.issue_kn),
                issue_dw: formatNumber(item.issue_dw),
                issue_dw_1: formatNumber(item.issue_dw_1),
                issue_dw_2: formatNumber(item.issue_dw_2),
                issue_ow: formatNumber(item.issue_ow),
                issue_ow_1: formatNumber(item.issue_ow_1),
                issue_ow_2: formatNumber(item.issue_ow_2),
                issue_jw: formatNumber(item.issue_jw),
                issue_pw: formatNumber(item.issue_pw),
                issue_row: formatNumber(item.issue_row),
                issue_rej_1: formatNumber(item.issue_rej_1),
                issue_lw3_180: formatNumber(item.issue_lw3_180),
                issue_lw3_210: formatNumber(item.issue_lw3_210),
                issue_lw3_240: formatNumber(item.issue_lw3_240),
                issue_lw3_280: formatNumber(item.issue_lw3_280),
                issue_lw3_360: formatNumber(item.issue_lw3_360),
                issue_lw2: formatNumber(item.issue_lw2),
                issue_lw4: formatNumber(item.issue_lw4),
                issue_lw5: formatNumber(item.issue_lw5),
                issue_lw6: formatNumber(item.issue_lw6),
                issue_lw7: formatNumber(item.issue_lw7),
                issue_rej_3: formatNumber(item.issue_rej_3),
                issue_rej_4: formatNumber(item.issue_rej_4),
                issue_jb2: formatNumber(item.issue_jb2),
                issue_sjb: formatNumber(item.issue_sjb),
                issue_k_240: formatNumber(item.issue_k_240),
                issue_k_280: formatNumber(item.issue_k_280),
                issue_k_360: formatNumber(item.issue_k_360),
                issue_pkw: formatNumber(item.issue_pkw),
                issue_bw: formatNumber(item.issue_bw),
                issue_rw: formatNumber(item.issue_rw),
                issue_rrw: formatNumber(item.issue_rrw),
                issue_fw: formatNumber(item.issue_fw),
                issue_lw: formatNumber(item.issue_lw),
                Issue_Packing:formatNumber((
                    parseFloat(item.issue_kw) + parseFloat(item.issue_kw_1) + parseFloat(item.issue_kw_2) + 
                    parseFloat(item.issue_kn) + parseFloat(item.issue_dw) + parseFloat(item.issue_dw_1) + 
                    parseFloat(item.issue_dw_2) + parseFloat(item.issue_ow) + parseFloat(item.issue_ow_1) + 
                    parseFloat(item.issue_ow_2) + parseFloat(item.issue_jw) + parseFloat(item.issue_pw) + 
                    parseFloat(item.issue_row) + parseFloat(item.issue_rej_1) + parseFloat(item.issue_lw3_180) + 
                    parseFloat(item.issue_lw3_210) + parseFloat(item.issue_lw3_240) + parseFloat(item.issue_lw3_280) + 
                    parseFloat(item.issue_lw3_360) + parseFloat(item.issue_lw2) + parseFloat(item.issue_lw4) + 
                    parseFloat(item.issue_lw5) + parseFloat(item.issue_lw6) + parseFloat(item.issue_lw7) + 
                    parseFloat(item.issue_rej_3) + parseFloat(item.issue_rej_4) + parseFloat(item.issue_jb2) + 
                    parseFloat(item.issue_sjb) + parseFloat(item.issue_k_240) + parseFloat(item.issue_k_280) + 
                    parseFloat(item.issue_k_360) + parseFloat(item.issue_pkw) + parseFloat(item.issue_bw) + 
                    parseFloat(item.issue_rw) + parseFloat(item.issue_rrw) + parseFloat(item.issue_fw) + 
                    parseFloat(item.issue_lw) ).toString()),
                issue_village: formatNumber(item.issue_village),    
                issue_bigTaiho: formatNumber(item.issue_bigTaiho),
                issue_hamsa: formatNumber(item.issue_hamsa),
                issue_rejection:formatNumber(item.issue_rejection),
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
            transformed = data1.rcnEntries.map((item: LWData, idx: number) => ({
                Sl_No: idx + 1, 
                Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
                Item_Lot_No: item.LotNo,
                Origin: item.origin,
                Issue_No: item.altid,
                LW_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                    
                    Opening_Mayur: formatNumber(item.rcv_mayur),
                    Borma_Mayur: formatNumber(item.issue_add_7),
                    Mayur_Borma_Loss_Kg: formatNumber(item.issue_add_2),
                    Mayur_Borma_Loss_Percentage: formatNumber(item.issue_add_3),
                    Opening_Hamsa: formatNumber(item.rcv_hamsa),
                    Borma_Hamsa: formatNumber(item.issue_add_8),
                    Hamsa_Borma_Loss_Kg: formatNumber(item.issue_add_5),
                    Hamsa_Borma_Loss_Percentage: formatNumber(item.issue_add_6),
                    Opening_Wholes: item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0,
                    Receive_Total:formatNumber((parseFloat(item.issue_add_7)+parseFloat(item.issue_add_8)
                    +item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0).toString()),  
                    issue_kw: formatNumber(item.issue_kw),
                    issue_kw_1: formatNumber(item.issue_kw_1),
                    issue_kw_2: formatNumber(item.issue_kw_2),
                    issue_kn: formatNumber(item.issue_kn),
                    issue_dw: formatNumber(item.issue_dw),
                    issue_dw_1: formatNumber(item.issue_dw_1),
                    issue_dw_2: formatNumber(item.issue_dw_2),
                    issue_ow: formatNumber(item.issue_ow),
                    issue_ow_1: formatNumber(item.issue_ow_1),
                    issue_ow_2: formatNumber(item.issue_ow_2),
                    issue_jw: formatNumber(item.issue_jw),
                    issue_pw: formatNumber(item.issue_pw),
                    issue_row: formatNumber(item.issue_row),
                    issue_rej_1: formatNumber(item.issue_rej_1),
                    issue_lw3_180: formatNumber(item.issue_lw3_180),
                    issue_lw3_210: formatNumber(item.issue_lw3_210),
                    issue_lw3_240: formatNumber(item.issue_lw3_240),
                    issue_lw3_280: formatNumber(item.issue_lw3_280),
                    issue_lw3_360: formatNumber(item.issue_lw3_360),
                    issue_lw2: formatNumber(item.issue_lw2),
                    issue_lw4: formatNumber(item.issue_lw4),
                    issue_lw5: formatNumber(item.issue_lw5),
                    issue_lw6: formatNumber(item.issue_lw6),
                    issue_lw7: formatNumber(item.issue_lw7),
                    issue_rej_3: formatNumber(item.issue_rej_3),
                    issue_rej_4: formatNumber(item.issue_rej_4),
                    issue_jb2: formatNumber(item.issue_jb2),
                    issue_sjb: formatNumber(item.issue_sjb),
                    issue_k_240: formatNumber(item.issue_k_240),
                    issue_k_280: formatNumber(item.issue_k_280),
                    issue_k_360: formatNumber(item.issue_k_360),
                    issue_pkw: formatNumber(item.issue_pkw),
                    issue_bw: formatNumber(item.issue_bw),
                    issue_rw: formatNumber(item.issue_rw),
                    issue_rrw: formatNumber(item.issue_rrw),
                    issue_fw: formatNumber(item.issue_fw),
                    issue_lw: formatNumber(item.issue_lw),
                    Issue_Packing:formatNumber((
                        parseFloat(item.issue_kw) + parseFloat(item.issue_kw_1) + parseFloat(item.issue_kw_2) + 
                        parseFloat(item.issue_kn) + parseFloat(item.issue_dw) + parseFloat(item.issue_dw_1) + 
                        parseFloat(item.issue_dw_2) + parseFloat(item.issue_ow) + parseFloat(item.issue_ow_1) + 
                        parseFloat(item.issue_ow_2) + parseFloat(item.issue_jw) + parseFloat(item.issue_pw) + 
                        parseFloat(item.issue_row) + parseFloat(item.issue_rej_1) + parseFloat(item.issue_lw3_180) + 
                        parseFloat(item.issue_lw3_210) + parseFloat(item.issue_lw3_240) + parseFloat(item.issue_lw3_280) + 
                        parseFloat(item.issue_lw3_360) + parseFloat(item.issue_lw2) + parseFloat(item.issue_lw4) + 
                        parseFloat(item.issue_lw5) + parseFloat(item.issue_lw6) + parseFloat(item.issue_lw7) + 
                        parseFloat(item.issue_rej_3) + parseFloat(item.issue_rej_4) + parseFloat(item.issue_jb2) + 
                        parseFloat(item.issue_sjb) + parseFloat(item.issue_k_240) + parseFloat(item.issue_k_280) + 
                        parseFloat(item.issue_k_360) + parseFloat(item.issue_pkw) + parseFloat(item.issue_bw) + 
                        parseFloat(item.issue_rw) + parseFloat(item.issue_rrw) + parseFloat(item.issue_fw) + 
                        parseFloat(item.issue_lw) ).toString()),
                    issue_village: formatNumber(item.issue_village),    
                    issue_bigTaiho: formatNumber(item.issue_bigTaiho),
                    issue_hamsa: formatNumber(item.issue_hamsa),
                    issue_rejection:formatNumber(item.issue_rejection),
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
        saveAs(blob, 'LW_Entry_' + currDate + '.xlsx');
    }
    const handleSearch = async () => {

        setEditData([])
        setblockpagen('flex')
        const response = await axios.put('/api/lw/lwprimarysearch', {
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
        if (editLWLotWiseData.length > 0) {
            //console.log(editPendingData)
            setEditData(editLWLotWiseData)
            setblockpagen('none')
        }

    },[editLWLotWiseData])
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
 
    const handleApprove = async (item: LWData) => {
        const response = await axios.put(`/api/lw/approveeditLW/${item.id}/${item.LotNo}/${item.origin}`)
        const data = await response.data
        if (data.message === "Edit Request of LW Entry is Approved Successfully") {

            if (approvesuccessdialog != null) {
                (approvesuccessdialog as any).showModal();
            }
        }
    }
    const handleRejection = async (item: LWData) => {
        const response = await axios.delete(`/api/lw/rejectededitLW/${item.id}/${item.LotNo}/${item.origin}`)
        const data = await response.data
        console.log(data)
        if (data.message === "LW Entry rejected successfully") {
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
            {checkpending('LW') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}
            <Table className="mt-4">
                <TableHeader className="bg-neutral-200 text-stone-950 ">


                    <TableHead className="text-center" >Id</TableHead>
                    <TableHead className="text-center" >Issue_Type</TableHead>
                    
                    <TableHead className="text-center" >Item_Lot_No</TableHead>
                    <TableHead className="text-center" >Origin</TableHead>
                    <TableHead className="text-center" >Issue_No</TableHead>
                    <TableHead className="text-center" >LW_Entry_Date</TableHead>

                    <TableHead className="text-center" >Incoming_Mixed_Lot_&_Origin</TableHead>
                    {/* <TableHead className="text-center" >Mixed Amount</TableHead> */}
                    <TableHead className="text-center">Receive Mayur</TableHead>
                    <TableHead className="text-center">Mayur Borma_Loss(Kg)</TableHead>
                    <TableHead className="text-center">Mayur Borma_Loss(%)</TableHead>
                   
                    <TableHead className="text-center">Receive Hamsa</TableHead>
                    <TableHead className="text-center">Hamsa Borma_Loss(Kg)</TableHead>
                    <TableHead className="text-center">Hamsa Borma_Loss(%)</TableHead>
                    <TableHead className="text-center">Receive Mayur(Borma)</TableHead>
                    <TableHead className="text-center">Receive Hamsa(Borma)</TableHead>

                    <TableHead className="text-center">Receive Wholes</TableHead>
                    <TableHead className="text-center">LW_Total_Opening (Borma)</TableHead>
                    <TableHead className="text-center">Issue KW</TableHead>
                            <TableHead className="text-center">Issue KW1</TableHead>
                            <TableHead className="text-center">Issue KW2</TableHead>
                            <TableHead className="text-center">Issue KN</TableHead>
                            <TableHead className="text-center">Issue DW</TableHead>
                            <TableHead className="text-center">Issue DW1</TableHead>
                            <TableHead className="text-center">Issue DW2</TableHead>
                            <TableHead className="text-center">Issue OW</TableHead>
                            <TableHead className="text-center">Issue OW1</TableHead>
                            <TableHead className="text-center">Issue OW2</TableHead>
                            <TableHead className="text-center">Issue JW</TableHead>
                            <TableHead className="text-center">Issue PW</TableHead>
                            <TableHead className="text-center">Issue ROW</TableHead>
                            <TableHead className="text-center">Issue REJ 1</TableHead>
                            <TableHead className="text-center">Issue LW3_180</TableHead>
                            <TableHead className="text-center">Issue LW3_210</TableHead>
                            <TableHead className="text-center">Issue LW3_240</TableHead>
                            <TableHead className="text-center">Issue LW3_280</TableHead>
                            <TableHead className="text-center">Issue LW3_360</TableHead>
                            <TableHead className="text-center">Issue LW2</TableHead>
                            <TableHead className="text-center">Issue LW4</TableHead>
                            <TableHead className="text-center">Issue LW5</TableHead>
                            <TableHead className="text-center">Issue LW6</TableHead>
                            <TableHead className="text-center">Issue LW7</TableHead>
                            <TableHead className="text-center">Issue REJ_3</TableHead>
                            <TableHead className="text-center">Issue REJ_4</TableHead>
                            <TableHead className="text-center">Issue JB2</TableHead>
                            <TableHead className="text-center">Issue SJB</TableHead>
                            <TableHead className="text-center">Issue K_240</TableHead>
                            <TableHead className="text-center">Issue K_280</TableHead>
                            <TableHead className="text-center">Issue K_360</TableHead>
                            <TableHead className="text-center">Issue PKW</TableHead>
                            <TableHead className="text-center">Issue BW</TableHead>
                            <TableHead className="text-center">Issue RW</TableHead>
                            <TableHead className="text-center">Issue RRW</TableHead>
                            <TableHead className="text-center">Issue FW</TableHead>
                            <TableHead className="text-center">Issue LW</TableHead>      
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
                     <TableHead className="text-center">Issue Packing</TableHead>
                     <TableHead className="text-center">Issue Village</TableHead>
                            <TableHead className="text-center">Issue Hamsa</TableHead>
                            <TableHead className="text-center">Issue BigTaiho</TableHead>
                            <TableHead className="text-center">Issue Rejection</TableHead>
                            <TableHead className="text-center">LW_Total_Issue (Kg)</TableHead>
                    {/* <TableHead className="text-center">Entry_Backlog</TableHead> */}
                    <TableHead className="text-center font-bold">Current_Backlog</TableHead>  
                    <TableHead className="text-center">No of Labour</TableHead>
                    <TableHead className="text-center">No of Supervisor</TableHead>
                    {/* <TableHead className="text-center">Operator_Night</TableHead>
                */}
                    <TableHead className="text-center" >Edit Status </TableHead>
                    <TableHead className="text-center" >Created By </TableHead>
                    <TableHead className="text-center" >Action</TableHead>
                </TableHeader>
                <TableBody>


                    {EditData.length > 0 ? (EditData.map((item: LWData, idx) => {

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
                                  
                                    <TableCell className="text-center font-semibold">{formatNumber(item.rcv_mayur)}</TableCell>
                                    <TableCell className="text-center font-semibold  text-red-500">{formatNumber(item.issue_add_2)} Kg</TableCell>
                                    <TableCell className="text-center font-bold text-red-500 ">{formatNumber(item.issue_add_3)} %</TableCell>
                                   

                                    <TableCell className="text-center font-semibold">{formatNumber(item.rcv_hamsa)}</TableCell>
                                    <TableCell className="text-center font-semibold  text-red-500">{formatNumber(item.issue_add_5)} Kg</TableCell>
                                    <TableCell className="text-center font-bold text-red-500 ">{formatNumber(item.issue_add_6)} %</TableCell>
                                    <TableCell className="text-center text-center bg-yellow-100 font-semibold">
                                    {formatNumber(item.issue_add_7)}
                                    </TableCell>
                                    <TableCell className="text-center text-center bg-yellow-100 font-semibold">
                                    {formatNumber(item.issue_add_8)}
                                    </TableCell>     
                                    <TableCell className="text-center font-bold bg-yellow-100 ">{item.rcv_wholes ? formatNumber(item.rcv_wholes) :0}</TableCell>

                                    <TableCell className="text-center font-bold bg-green-500 text-white">{formatNumber((parseFloat(item.issue_add_7) +parseFloat(item.issue_add_8)
                                    +(item.rcv_wholes ? parseFloat(item.rcv_wholes) :0)).toString())
                                } Kg</TableCell>

                                    
                                    
<TableCell className="text-center  ">{formatNumber(item.issue_kw)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_kw_1)}</TableCell>
<TableCell className="text-center  ">{formatNumber(item.issue_kw_2)}</TableCell>
<TableCell className="text-center  ">{formatNumber(item.issue_kn)}</TableCell>
<TableCell className="text-center  ">{formatNumber(item.issue_dw)}</TableCell>
<TableCell className="text-center  ">{formatNumber(item.issue_dw_1)}</TableCell>
<TableCell className="text-center  ">{formatNumber(item.issue_dw_2)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_ow)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_ow_1)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_ow_2)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_jw)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_pw)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_row)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_rej_1)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_lw3_180)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_lw3_210)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_lw3_240)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_lw3_280)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_lw3_360)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_lw2)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_lw4)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_lw5)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_lw6)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_lw7)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_rej_3)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_rej_4)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_jb2)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_sjb)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_k_240)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_k_280)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_k_360)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_pkw)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_bw)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_rw)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_rrw)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_fw)}</TableCell>
<TableCell className="text-center ">{formatNumber(item.issue_lw)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber((
                                    parseFloat(item.issue_kw) + parseFloat(item.issue_kw_1) + parseFloat(item.issue_kw_2) + 
                                    parseFloat(item.issue_kn) + parseFloat(item.issue_dw) + parseFloat(item.issue_dw_1) + 
                                    parseFloat(item.issue_dw_2) + parseFloat(item.issue_ow) + parseFloat(item.issue_ow_1) + 
                                    parseFloat(item.issue_ow_2) + parseFloat(item.issue_jw) + parseFloat(item.issue_pw) + 
                                    parseFloat(item.issue_row) + parseFloat(item.issue_rej_1) + parseFloat(item.issue_lw3_180) + 
                                    parseFloat(item.issue_lw3_210) + parseFloat(item.issue_lw3_240) + parseFloat(item.issue_lw3_280) + 
                                    parseFloat(item.issue_lw3_360) + parseFloat(item.issue_lw2) + parseFloat(item.issue_lw4) + 
                                    parseFloat(item.issue_lw5) + parseFloat(item.issue_lw6) + parseFloat(item.issue_lw7) + 
                                    parseFloat(item.issue_rej_3) + parseFloat(item.issue_rej_4) + parseFloat(item.issue_jb2) + 
                                    parseFloat(item.issue_sjb) + parseFloat(item.issue_k_240) + parseFloat(item.issue_k_280) + 
                                    parseFloat(item.issue_k_360) + parseFloat(item.issue_pkw) + parseFloat(item.issue_bw) + 
                                    parseFloat(item.issue_rw) + parseFloat(item.issue_rrw) + parseFloat(item.issue_fw) + 
                                    parseFloat(item.issue_lw)).toString())}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_village)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_hamsa)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_bigTaiho)}</TableCell>
                                    
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_rejection)}</TableCell>
                                    <TableCell className="text-center font-bold bg-yellow-500 text-white">{formatNumber((
                                        parseFloat(item.issue_kw) + parseFloat(item.issue_kw_1) + parseFloat(item.issue_kw_2) +
                                        parseFloat(item.issue_kn) + parseFloat(item.issue_dw) + parseFloat(item.issue_dw_1) +
                                        parseFloat(item.issue_dw_2) + parseFloat(item.issue_ow) + parseFloat(item.issue_ow_1) +
                                        parseFloat(item.issue_ow_2) + parseFloat(item.issue_jw) + parseFloat(item.issue_pw) +
                                        parseFloat(item.issue_row) + parseFloat(item.issue_rej_1) + parseFloat(item.issue_lw3_180) +
                                        parseFloat(item.issue_lw3_210) + parseFloat(item.issue_lw3_240) + parseFloat(item.issue_lw3_280) +
                                        parseFloat(item.issue_lw3_360) + parseFloat(item.issue_lw2) + parseFloat(item.issue_lw4) +
                                        parseFloat(item.issue_lw5) + parseFloat(item.issue_lw6) + parseFloat(item.issue_lw7) +
                                        parseFloat(item.issue_rej_3) + parseFloat(item.issue_rej_4) + parseFloat(item.issue_jb2) +
                                        parseFloat(item.issue_sjb) + parseFloat(item.issue_k_240) + parseFloat(item.issue_k_280) +
                                        parseFloat(item.issue_k_360) + parseFloat(item.issue_pkw) + parseFloat(item.issue_bw) +
                                        parseFloat(item.issue_rw) + parseFloat(item.issue_rrw) + parseFloat(item.issue_fw) +
                                        parseFloat(item.issue_village) + parseFloat(item.issue_hamsa) + parseFloat(item.issue_bigTaiho) +parseFloat(item.issue_rejection) +
                                        parseFloat(item.issue_lw)).toString())} Kg</TableCell>
                                    {/* <TableCell className="text-center font-semibold text-blue-600">{formatNumber(item.entry_backlog)} kg</TableCell> */}
                                               
                                    <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(item.current_backlog)}kg</TableCell>
                            
                        <TableCell className="text-center">{item.noOfdayOperators}</TableCell>
                        <TableCell className="text-center">{item.noOfnightOperators}</TableCell>
                        {/* <TableCell className="text-center">{item.noOfnightOperators}</TableCell> */}
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
                        Data.length > 0 ? (Data.map((item: LWData, idx) => {
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

                                    <TableCell className="text-center font-semibold">{formatNumber(item.rcv_mayur)}</TableCell>
                                    <TableCell className="text-center font-semibold  text-red-500">{formatNumber(item.issue_add_2)} Kg</TableCell>
                                    <TableCell className="text-center font-semibold text-red-500 ">{formatNumber(item.issue_add_3)} %</TableCell>


                                    <TableCell className="text-center font-semibold">{formatNumber(item.rcv_hamsa)}</TableCell>
                                    <TableCell className="text-center font-semibold  text-red-500">{formatNumber(item.issue_add_5)} Kg</TableCell>
                                    <TableCell className="text-center font-semibold text-red-500 ">{formatNumber(item.issue_add_6)} %</TableCell>
                                    <TableCell className="text-center text-center bg-yellow-100 font-semibold">
                                        {formatNumber(item.issue_add_7)}
                                    </TableCell>
                                    <TableCell className="text-center text-center bg-yellow-100 font-semibold">
                                        {formatNumber(item.issue_add_8)}
                                    </TableCell>
                                    <TableCell className="text-center font-semibold bg-yellow-100 ">{item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0}</TableCell>

                                    <TableCell className="text-center font-semibold bg-green-500 text-white">{formatNumber((parseFloat(item.issue_add_7) + parseFloat(item.issue_add_8)
                                        + (item.rcv_wholes ? parseFloat(item.rcv_wholes) : 0)).toString())
                                    } Kg</TableCell>



                                    <TableCell className="text-center  ">{formatNumber(item.issue_kw)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_kw_1)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_kw_2)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_kn)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_dw)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_dw_1)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_dw_2)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_ow)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_ow_1)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_ow_2)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_jw)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_pw)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_row)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_rej_1)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_lw3_180)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_lw3_210)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_lw3_240)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_lw3_280)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_lw3_360)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_lw2)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_lw4)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_lw5)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_lw6)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_lw7)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_rej_3)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_rej_4)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_jb2)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_sjb)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_k_240)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_k_280)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_k_360)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_pkw)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_bw)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_rw)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_rrw)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_fw)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_lw)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber((
                                        parseFloat(item.issue_kw) + parseFloat(item.issue_kw_1) + parseFloat(item.issue_kw_2) +
                                        parseFloat(item.issue_kn) + parseFloat(item.issue_dw) + parseFloat(item.issue_dw_1) +
                                        parseFloat(item.issue_dw_2) + parseFloat(item.issue_ow) + parseFloat(item.issue_ow_1) +
                                        parseFloat(item.issue_ow_2) + parseFloat(item.issue_jw) + parseFloat(item.issue_pw) +
                                        parseFloat(item.issue_row) + parseFloat(item.issue_rej_1) + parseFloat(item.issue_lw3_180) +
                                        parseFloat(item.issue_lw3_210) + parseFloat(item.issue_lw3_240) + parseFloat(item.issue_lw3_280) +
                                        parseFloat(item.issue_lw3_360) + parseFloat(item.issue_lw2) + parseFloat(item.issue_lw4) +
                                        parseFloat(item.issue_lw5) + parseFloat(item.issue_lw6) + parseFloat(item.issue_lw7) +
                                        parseFloat(item.issue_rej_3) + parseFloat(item.issue_rej_4) + parseFloat(item.issue_jb2) +
                                        parseFloat(item.issue_sjb) + parseFloat(item.issue_k_240) + parseFloat(item.issue_k_280) +
                                        parseFloat(item.issue_k_360) + parseFloat(item.issue_pkw) + parseFloat(item.issue_bw) +
                                        parseFloat(item.issue_rw) + parseFloat(item.issue_rrw) + parseFloat(item.issue_fw) +
                                        parseFloat(item.issue_lw)).toString())}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_village)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_hamsa)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_bigTaiho)}</TableCell>

                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_rejection)}</TableCell>
                                    <TableCell className="text-center font-bold bg-yellow-500 text-white">{formatNumber((
                                        parseFloat(item.issue_kw) + parseFloat(item.issue_kw_1) + parseFloat(item.issue_kw_2) +
                                        parseFloat(item.issue_kn) + parseFloat(item.issue_dw) + parseFloat(item.issue_dw_1) +
                                        parseFloat(item.issue_dw_2) + parseFloat(item.issue_ow) + parseFloat(item.issue_ow_1) +
                                        parseFloat(item.issue_ow_2) + parseFloat(item.issue_jw) + parseFloat(item.issue_pw) +
                                        parseFloat(item.issue_row) + parseFloat(item.issue_rej_1) + parseFloat(item.issue_lw3_180) +
                                        parseFloat(item.issue_lw3_210) + parseFloat(item.issue_lw3_240) + parseFloat(item.issue_lw3_280) +
                                        parseFloat(item.issue_lw3_360) + parseFloat(item.issue_lw2) + parseFloat(item.issue_lw4) +
                                        parseFloat(item.issue_lw5) + parseFloat(item.issue_lw6) + parseFloat(item.issue_lw7) +
                                        parseFloat(item.issue_rej_3) + parseFloat(item.issue_rej_4) + parseFloat(item.issue_jb2) +
                                        parseFloat(item.issue_sjb) + parseFloat(item.issue_k_240) + parseFloat(item.issue_k_280) +
                                        parseFloat(item.issue_k_360) + parseFloat(item.issue_pkw) + parseFloat(item.issue_bw) +
                                        parseFloat(item.issue_rw) + parseFloat(item.issue_rrw) + parseFloat(item.issue_fw) +
                                        parseFloat(item.issue_village) + parseFloat(item.issue_hamsa) + parseFloat(item.issue_bigTaiho) +parseFloat(item.issue_rejection) +
                                        parseFloat(item.issue_lw)).toString())} Kg</TableCell>
                                    {/* <TableCell className="text-center font-semibold text-blue-600">{formatNumber(item.entry_backlog)} kg</TableCell> */}

                                    <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(item.current_backlog)}kg</TableCell>

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
                                                                <p className='text-1xl pb-1 text-center mt-1'>LW Entry Modification</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <LWEDitForm borma={[item]} />
                                                    </DialogContent>
                                                    
                                                </Dialog>
                                                {Number(item.current_backlog) > 0 && <Dialog>
                                                    <DialogTrigger className="flex"><CiBoxes size={20} />
                                                        <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Re-Issue</button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-7xl">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <p className='text-1xl pb-1 text-center mt-1'>Sorting Entry Re-issue</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        {/* <RCNSortingReCreateForm borma={[item]} /> */}
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
                                                        {/* <RCNSortingReMix borma={item} /> */}
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

export default LWTable;