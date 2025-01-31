import { useContext, useEffect, useState } from "react";
import { Origin, pagelimit, pageNo, pendingCheckRole } from "../common/exportData";
import Context from "../context/context";
import axios from "axios";
import {  pendingCheckRoles, PermissionRole, BigTaihoData } from "@/type/type";
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
import RCNBigTaihoReMix from "./BigTaihoMix";
import RCNBigTaihoReCreateForm from "./BigTaihoRecreateForm";
import BigTaihoEditForm from "./BigTaihoEditForm";



const BigTaihoTable = () => {
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
    const [hidetodate, sethidetoDate] = useState<string>('');
    const currDate = new Date().toLocaleDateString();
    const [origin, setOrigin] = useState<string>("")
    const [blockpagen, setblockpagen] = useState('flex')
    const [EditData, setEditData] = useState<BigTaihoData[]>([])
    const [blConNo, setBlConNo] = useState<string>("")
    const { editBigTaihoLotWiseData } = useContext(Context);
    const [Data, setData] = useState<BigTaihoData[]>([])
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
        const response = await axios.put('/api/bigTaiho/bigTaihoprimarysearch', {
            searchitem: blConNo,
            fromDate: fromdate,
            toDate: todate,
            origin: origin,
        })
        const data1 = await response.data

        let ws
        let transformed: any[] = [];
        if (EditData.length > 0) {
            transformed = EditData.map((item: BigTaihoData, idx: number) => ({
            Sl_No: idx + 1, 
            Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
            Item_Lot_No: item.LotNo,
            Origin: item.origin,
            Issue_No: item.altid,
            DPDS_Entry_Date: handletimezone(item.date),
            Mixing_Lot: item.mixingLot,
          
            Receive_Peeling: formatNumber(item.rcv_peeling),
            Receive_Sorting: item.rcv_sorting ? formatNumber(item.rcv_sorting) : 0,
            Receive_Village: item.rcv_village ? formatNumber(item.rcv_village) : 0,
            Receive_DPDS: item.rcv_dpds ? formatNumber(item.rcv_dpds) : 0,
            Receive_Mayur: item.rcv_mayur ? formatNumber(item.rcv_mayur) : 0,
            Receive_Hamsa: item.rcv_hamsa ? formatNumber(item.rcv_hamsa) : 0,
            Receive_LW: item.rcv_lw ? formatNumber(item.rcv_lw) : 0,
            Receive_Wholes: item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0,

            
            Issue_ssp: formatNumber(item.issue_ssp),
            Issue_ssp_small: formatNumber(item.issue_ssp_small),
            Issue_swp_1: formatNumber(item.issue_swp_1),
            Issue_wsp: formatNumber(item.issue_wsp),
            Issue_bits: formatNumber(item.issue_bits),
            Issue_swp: formatNumber(item.issue_swp),
            Issue_bb: formatNumber(item.issue_bb),
            Issue_w_bb: formatNumber(item.issue_w_bb),
            Issue_bb_A: formatNumber(item.issue_bb_A),
            Issue_bb_1: formatNumber(item.issue_bb1),
            Issue_bb1_A: formatNumber(item.issue_bb1_A),
            Issue_bb_2: formatNumber(item.issue_bb_2),
            Issue_ssp1: formatNumber(item.issue_ssp_1),
            Issue_ssp1_small: formatNumber(item.issue_ssp_1_small),
            Issue_ssp2: formatNumber(item.issue_ssp_2),
            Issue_ssp2_small: formatNumber(item.issue_ssp_2_small),
            Issue_sdp: formatNumber(item.issue_sdp),



            


            Issue_Husk: formatNumber(item.issue_husk),
            Issue_Rejection: formatNumber(item.issue_rejection),
            Issue_Village: formatNumber(item.issue_village),
            Issue_Sorting: formatNumber(item.issue_sorting),
            Issue_DPDS: formatNumber(item.issue_dpds),
      
            Entry_Backlog: Number(item.entry_backlog) < 0 ? formatNumberWithSign(Number(item.entry_backlog)) : formatNumberWithSign(Number(item.entry_backlog)),
            Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),
           
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
            transformed = data1.rcnEntries.map((item: BigTaihoData, idx: number) => ({
             Sl_No: idx + 1, 
            Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
            Item_Lot_No: item.LotNo,
            Origin: item.origin,
            Issue_No: item.altid,
            DPDS_Entry_Date: handletimezone(item.date),
            Mixing_Lot: item.mixingLot,
          
            Receive_Peeling: formatNumber(item.rcv_peeling),
            Receive_Sorting: item.rcv_sorting ? formatNumber(item.rcv_sorting) : 0,
            Receive_Village: item.rcv_village ? formatNumber(item.rcv_village) : 0,
            Receive_DPDS: item.rcv_dpds ? formatNumber(item.rcv_dpds) : 0,
            Receive_Mayur: item.rcv_mayur ? formatNumber(item.rcv_mayur) : 0,
            Receive_Hamsa: item.rcv_hamsa ? formatNumber(item.rcv_hamsa) : 0,
            Receive_LW: item.rcv_lw ? formatNumber(item.rcv_lw) : 0,
            Receive_Wholes: item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0,

            
            Issue_ssp: formatNumber(item.issue_ssp),
            Issue_ssp_small: formatNumber(item.issue_ssp_small),
            Issue_swp_1: formatNumber(item.issue_swp_1),
            Issue_wsp: formatNumber(item.issue_wsp),
            Issue_bits: formatNumber(item.issue_bits),
            Issue_swp: formatNumber(item.issue_swp),
            Issue_bb: formatNumber(item.issue_bb),
            Issue_w_bb: formatNumber(item.issue_w_bb),
            Issue_bb_A: formatNumber(item.issue_bb_A),
            Issue_bb_1: formatNumber(item.issue_bb1),
            Issue_bb1_A: formatNumber(item.issue_bb1_A),
            Issue_bb_2: formatNumber(item.issue_bb_2),
            Issue_ssp1: formatNumber(item.issue_ssp_1),
            Issue_ssp1_small: formatNumber(item.issue_ssp_1_small),
            Issue_ssp2: formatNumber(item.issue_ssp_2),
            Issue_ssp2_small: formatNumber(item.issue_ssp_2_small),
            Issue_sdp: formatNumber(item.issue_sdp),
            


            Issue_Husk: formatNumber(item.issue_husk),
            Issue_Rejection: formatNumber(item.issue_rejection),
            Issue_Village: formatNumber(item.issue_village),
            Issue_Sorting: formatNumber(item.issue_sorting),
            Issue_DPDS: formatNumber(item.issue_dpds),
      
            Entry_Backlog: Number(item.entry_backlog) < 0 ? formatNumberWithSign(Number(item.entry_backlog)) : formatNumberWithSign(Number(item.entry_backlog)),
            Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),
           
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
        saveAs(blob, 'BigTaiho_Entry_' + currDate + '.xlsx');
    }
    const handleSearch = async () => {

        setEditData([])
        setblockpagen('flex')
        const response = await axios.put('/api/bigTaiho/bigTaihoprimarysearch', {
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
        if (editBigTaihoLotWiseData.length > 0) {
            //console.log(editPendingData)
            setEditData(editBigTaihoLotWiseData)
            setblockpagen('none')
        }

    },[editBigTaihoLotWiseData])
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
 
    const handleApprove = async (item: BigTaihoData) => {
        const response = await axios.put(`/api/bigTaiho/approveeditBigTaiho/${item.id}/${item.LotNo}/${item.origin}`)
        const data = await response.data
        if (data.message === "Edit Request of BigTaiho Entry is Approved Successfully") {

            if (approvesuccessdialog != null) {
                (approvesuccessdialog as any).showModal();
            }
        }
    }
    const handleRejection = async (item: BigTaihoData) => {
        const response = await axios.delete(`/api/bigTaiho/rejectededitBigTaiho/${item.id}/${item.LotNo}/${item.origin}`)
        const data = await response.data
        console.log(data)
        if (data.message === "BigTaiho Entry rejected successfully") {
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
            {checkpending('BigTaiho') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}
            <Table className="mt-4">
                <TableHeader className="bg-neutral-200 text-stone-950 ">


                    <TableHead className="text-center" >Id</TableHead>
                    <TableHead className="text-center" >Issue_Type</TableHead>
                    
                    <TableHead className="text-center" >Item_Lot_No</TableHead>
                    <TableHead className="text-center" >Origin</TableHead>
                    <TableHead className="text-center" >Issue_No</TableHead>
                    <TableHead className="text-center" >BigTaiho_Entry_Date</TableHead>

                    <TableHead className="text-center" >Incoming_Mixed_Lot_&_Origin</TableHead>
                    {/* <TableHead className="text-center" >Mixed Amount</TableHead> */}
                    <TableHead className="text-center">Rcv Peeling</TableHead>
                    <TableHead className="text-center">Rcv Village</TableHead>
                    <TableHead className="text-center">Rcv Sorting</TableHead>
                    <TableHead className="text-center">Rcv DPDS</TableHead>
                    <TableHead className="text-center">Rcv Mayur</TableHead>
                    <TableHead className="text-center">Rcv Hamsa</TableHead>
                    <TableHead className="text-center">Rcv LW</TableHead>
                    <TableHead className="text-center">Rcv Wholes</TableHead>
                    <TableHead className="text-center">Issue SSP</TableHead>
                    <TableHead className="text-center">Issue SSP(Small)</TableHead>
                    <TableHead className="text-center">Issue SWP_1</TableHead>
                    <TableHead className="text-center">Issue WSP</TableHead>
                    <TableHead className="text-center">Issue Bits</TableHead>
                    <TableHead className="text-center">Issue SWP</TableHead>
                    <TableHead className="text-center">Issue BB</TableHead>
                    <TableHead className="text-center">Issue W_BB</TableHead>
                    <TableHead className="text-center">Issue BB A</TableHead>
                    <TableHead className="text-center">Issue BB1</TableHead>
                    <TableHead className="text-center">Issue BB1(A)</TableHead>
                    <TableHead className="text-center">Issue BB 2</TableHead>
                    <TableHead className="text-center">Issue SSP_1</TableHead>
                    <TableHead className="text-center">Issue SSP_1(Small)</TableHead>
                    <TableHead className="text-center">Issue SSP 2</TableHead>
                    <TableHead className="text-center">Issue SSP 2 Small</TableHead>
                    <TableHead className="text-center">Issue SDP</TableHead>

                    <TableHead className="text-center">Issue Husk</TableHead>
                    <TableHead className="text-center">Issue Rejection</TableHead>
                    <TableHead className="text-center">Issue Village</TableHead>
                    <TableHead className="text-center">Issue Sorting</TableHead>
                    <TableHead className="text-center">Issue DPDS</TableHead>
                    <TableHead className="text-center">Entry_Backlog</TableHead>
                    <TableHead className="text-center font-bold">Current_Backlog</TableHead>

                    <TableHead className="text-center">Mc_On_Taiho</TableHead>
                    <TableHead className="text-center">Mc_Off_Taiho</TableHead>
                    <TableHead className="text-center">Mc_Breakdown Taiho</TableHead>
                    <TableHead className="text-center">Other_Time Taiho</TableHead>
                    <TableHead className="text-center">Mc_On_Spectrum</TableHead>
                    <TableHead className="text-center">Mc_Off_Spectrum</TableHead>
                    <TableHead className="text-center">Mc_Breakdown Spectrum</TableHead>
                    <TableHead className="text-center">Other_Time Spectrum</TableHead>
                    <TableHead className="text-center">Mc_On_Amrita</TableHead>
                    <TableHead className="text-center">Mc_Off_Amrita</TableHead>
                    <TableHead className="text-center">Mc_Breakdown Amrita</TableHead>
                    <TableHead className="text-center">Other_Time Amrita</TableHead>
                   
                   
                    <TableHead className="text-center">Runtime_Taiho</TableHead>
                    <TableHead className="text-center">Runtime_Spectrum</TableHead>
                    <TableHead className="text-center">Runtime_Amrita</TableHead>
                
           
                    <TableHead className="text-center">Operator_Day</TableHead>
                    <TableHead className="text-center">Operator_Night</TableHead>
               
                    <TableHead className="text-center" >Edit Status </TableHead>
                    <TableHead className="text-center" >Created By </TableHead>
                    <TableHead className="text-center" >Action</TableHead>
                </TableHeader>
                <TableBody>


                    {EditData.length > 0 ? (EditData.map((item: BigTaihoData, idx) => {

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
                                    <TableCell className="text-center ">{formatNumber(item.rcv_peeling)}</TableCell>
                                  
                                    <TableCell  className="text-center font-bold text-green-600">{item.rcv_sorting ? formatNumber(item.rcv_sorting) :0}</TableCell>
                                    <TableCell className="text-center font-bold text-green-600">{item.rcv_village ? formatNumber(item.rcv_village) :0}</TableCell>
                                    <TableCell className="text-center font-bold text-green-600">{item.rcv_dpds ? formatNumber(item.rcv_dpds) :0}</TableCell>
                                    <TableCell className="text-center font-bold text-green-600">{item.rcv_mayur ? formatNumber(item.rcv_mayur) :0}</TableCell>
                                    <TableCell className="text-center font-bold text-green-600">{item.rcv_hamsa ? formatNumber(item.rcv_hamsa) :0}</TableCell>
                                    <TableCell className="text-center font-bold text-green-600">{item.rcv_lw ? formatNumber(item.rcv_lw) :0}</TableCell>
                                    <TableCell className="text-center font-bold text-green-600">{item.rcv_wholes ? formatNumber(item.rcv_wholes) :0}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_ssp)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_ssp_small)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_swp_1)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_wsp)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_bits)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_swp)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_bb)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_w_bb)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_bb_A)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_bb1)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_bb1_A)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_bb_2)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_ssp_1)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_ssp_1_small)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_ssp_2)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_ssp_2_small)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_sdp)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_husk)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_rejection)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_village)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_sorting)}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{formatNumber(item.issue_dpds)}</TableCell>
                                    <TableCell className="text-center font-bold text-blue-600">{formatNumber(item.entry_backlog)} kg</TableCell>
                                               
                                    <TableCell className="text-center font-bold text-blue-600">{formatNumber(item.current_backlog)}kg</TableCell>
                                    <TableCell className="text-center">{handleAMPM(item.Mc_on_1.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_1.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_1.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_1.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            
                            
                            <TableCell className="text-center">{handleAMPM(item.Mc_on_2.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_2.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_2.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_2.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            
                            
                            <TableCell className="text-center">{handleAMPM(item.Mc_on_3.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_3.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_3.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_3.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                        
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_1.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_2.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_3.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                        
                        
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

                        Data.length > 0 ? (Data.map((item: BigTaihoData, idx) => {
                         
                          
                  

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
                                    <TableCell className="text-center bg-yellow-100 font-bold text-green-600">{formatNumber(item.rcv_peeling)}</TableCell>
                                  
                                    <TableCell  className="text-center bg-yellow-100 font-bold text-green-600">{item.rcv_sorting ? formatNumber(item.rcv_sorting) :0}</TableCell>
                                    <TableCell className="text-center font-bold bg-yellow-100 text-green-600">{item.rcv_village ? formatNumber(item.rcv_village) :0}</TableCell>
                                    <TableCell className="text-center font-bold bg-yellow-100 text-green-600">{item.rcv_dpds ? formatNumber(item.rcv_dpds) :0}</TableCell>
                                    <TableCell className="text-center font-bold bg-yellow-100 text-green-600">{item.rcv_mayur ? formatNumber(item.rcv_mayur) :0}</TableCell>
                                    <TableCell className="text-center font-bold bg-yellow-100 text-green-600">{item.rcv_hamsa ? formatNumber(item.rcv_hamsa) :0}</TableCell>
                                    <TableCell className="text-center font-bold bg-yellow-100 text-green-600">{item.rcv_lw ? formatNumber(item.rcv_lw) :0}</TableCell>
                                    <TableCell className="text-center font-bold bg-yellow-100 text-green-600">{item.rcv_wholes ? formatNumber(item.rcv_wholes) :0}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.issue_ssp)}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.issue_ssp_small)}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.issue_swp_1)}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.issue_wsp)}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.issue_bits)}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.issue_swp)}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.issue_bb)}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.issue_w_bb)}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.issue_bb_A)}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.issue_bb1)}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.issue_bb1_A)}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.issue_bb_2)}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.issue_ssp_1)}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.issue_ssp_1_small)}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.issue_ssp_2)}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.issue_ssp_2_small)}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.issue_sdp)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-green-100">{formatNumber(item.issue_husk)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_rejection)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(item.issue_village)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-purple-100">{formatNumber(item.issue_sorting)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_dpds)}</TableCell>
                                    <TableCell className="text-center font-semibold text-blue-600">{formatNumber(item.entry_backlog)} kg</TableCell>
                                               
                                    <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(item.current_backlog)}kg</TableCell>
                                    <TableCell className="text-center">{handleAMPM(item.Mc_on_1.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_1.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_1.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_1.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            
                            
                            <TableCell className="text-center">{handleAMPM(item.Mc_on_2.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_2.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_2.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_2.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            
                            
                            <TableCell className="text-center">{handleAMPM(item.Mc_on_3.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_3.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_3.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_3.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                        
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_1.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_2.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_3.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                        
                        
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
                                                                <p className='text-1xl pb-1 text-center mt-1'>BigTaiho Entry Modification</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <BigTaihoEditForm borma={[item]} />
                                                    </DialogContent>
                                                    
                                                </Dialog>
                                                {Number(item.current_backlog) > 0 && <Dialog>
                                                    <DialogTrigger className="flex"><CiBoxes size={20} />
                                                        <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Re-Issue</button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-7xl">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <p className='text-1xl pb-1 text-center mt-1'>BigTaiho Entry Reissue</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <RCNBigTaihoReCreateForm borma={[item]} />
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
                                                        <RCNBigTaihoReMix borma={item} />
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

export default BigTaihoTable;