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




const RejectionTable = (props:any) => {
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
   // const [hidetodate, sethidetoDate] = useState<string>('');
    const currDate = new Date().toLocaleDateString();
    const [origin, setOrigin] = useState<string>("")
    const [blockpagen, setblockpagen] = useState('flex')
    const [EditData, setEditData] = useState<RejectionData[]>([])
    const [blConNo, setBlConNo] = useState<string>("")
    const { editRejectionLotWiseData } = useContext(Context);
    const [Data, setData] = useState<RejectionData[]>([])
     const dropdown = ['LOT', 'V-LOT','R-LOT']
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
    // const exportToExcel = async () => { 

    //      if (searchType === 'LOT') {
    //     const response = await axios.put('/api/rejection/rejectionprimarysearch', {
    //         searchitem: blConNo,
    //         fromDate: fromdate,
    //         toDate: todate,
    //         origin: origin,
    //         type:'LOT'
    //     })
    //     const data1 = await response.data

    //     let ws
    //     let transformed: any[] = [];
    //     if (EditData.length > 0) {
    //         transformed = EditData.map((item: RejectionData, idx: number) => ({
    //         Sl_No: idx + 1, 
    //         Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
    //         Item_Lot_No: item.LotNo,
    //         Origin: item.origin,
    //         Issue_No: item.altid,
    //         Rejection_Entry_Date: handletimezone(item.date),
    //             Mixing_Lot: item.mixingLot,   
    //             Opening_Peeling: formatNumber(item.rcv_peeling),
    //             Borma_Peeling: formatNumber(item.issue_add_7),
    //             Peeling_Borma_Loss_Kg: formatNumber(item.issue_add_2),
    //             Peeling_Borma_Loss_Percentage: formatNumber(item.issue_add_3),
    //             Opening_Mayur: formatNumber(item.rcv_mayur),
    //             Borma_Mayur: formatNumber(item.issue_add_8),
    //             Mayur_Borma_Loss_Kg: formatNumber(item.issue_add_5),
    //             Mayur_Borma_Loss_Percentage: formatNumber(item.issue_add_6),
    //             Opening_Wholes: item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0,
    //             Opening_LW: item.rcv_wholes ? formatNumber(item.rcv_lw) : 0,
    //             Opening_DPDS: item.rcv_wholes ? formatNumber(item.rcv_dpds) : 0,
    //             Opening_Sorting: item.rcv_wholes ? formatNumber(item.rcv_sorting) : 0,
    //             Opening_BigTaiho: item.rcv_wholes ? formatNumber(item.rcv_bigTaiho) : 0,
    //             Opening_Village: item.rcv_wholes ? formatNumber(item.rcv_village) : 0,
    //             Receive_Total:formatNumber((parseFloat(item.issue_add_7)+parseFloat(item.issue_add_8)
    //             +item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0+item.rcv_lw ? formatNumber(item.rcv_lw) : 0
    //             +item.rcv_dpds ? formatNumber(item.rcv_dpds) : 0+item.rcv_sorting ? formatNumber(item.rcv_sorting) : 0
    //             +item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) : 0+item.rcv_village ? formatNumber(item.rcv_village) : 0).toString()),  
    //             issue_packing: formatNumber(item.issue_packing),
    //             issue_village: formatNumber(item.issue_village),
    //             issue_uncut_unscoop: formatNumber(item.issue_uncut_unscoop),
    //             issue_shell: formatNumber(item.issue_shell),
    //             issue_catelfeed: formatNumber(item.issue_catelfeed),         
    //             Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),          
    //             Labour: item.noOfdayOperators,
    //             Superisor: item.noOfnightOperators,
               
           
    //         Edit_Status: item.editStatus,
    //         Created_By: item.CreatedBy,
    //         Modified_By: item.modifiedBy 

    //         }));
    //         //setTransformedData(transformed);
    //         ws = XLSX.utils.json_to_sheet(transformed);
    //     }
    //     else {
    //         transformed = data1.rcnEntries.map((item: RejectionData, idx: number) => ({
    //             Sl_No: idx + 1, 
    //             Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
    //             Item_Lot_No: item.LotNo,
    //             Origin: item.origin,
    //             Issue_No: item.altid,
    //             Rejection_Entry_Date: handletimezone(item.date),
    //                 Mixing_Lot: item.mixingLot,   
    //                 Opening_Peeling: formatNumber(item.rcv_peeling),
    //                 Borma_Peeling: formatNumber(item.issue_add_7),
    //                 Peeling_Borma_Loss_Kg: formatNumber(item.issue_add_2),
    //                 Peeling_Borma_Loss_Percentage: formatNumber(item.issue_add_3),
    //                 Opening_Mayur: formatNumber(item.rcv_mayur),
    //                 Borma_Mayur: formatNumber(item.issue_add_8),
    //                 Mayur_Borma_Loss_Kg: formatNumber(item.issue_add_5),
    //                 Mayur_Borma_Loss_Percentage: formatNumber(item.issue_add_6),
    //                 Opening_Wholes: item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0,
    //                 Opening_LW: item.rcv_wholes ? formatNumber(item.rcv_lw) : 0,
    //                 Opening_DPDS: item.rcv_wholes ? formatNumber(item.rcv_dpds) : 0,
    //                 Opening_Sorting: item.rcv_wholes ? formatNumber(item.rcv_sorting) : 0,
    //                 Opening_BigTaiho: item.rcv_wholes ? formatNumber(item.rcv_bigTaiho) : 0,
    //                 Opening_Village: item.rcv_wholes ? formatNumber(item.rcv_village) : 0,
    //                 Receive_Total:formatNumber((parseFloat(item.issue_add_7)+parseFloat(item.issue_add_8)
    //                 +item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0+item.rcv_lw ? formatNumber(item.rcv_lw) : 0
    //                 +item.rcv_dpds ? formatNumber(item.rcv_dpds) : 0+item.rcv_sorting ? formatNumber(item.rcv_sorting) : 0
    //                 +item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) : 0+item.rcv_village ? formatNumber(item.rcv_village) : 0).toString()),  
    //                 issue_packing: formatNumber(item.issue_packing),
    //                 issue_village: formatNumber(item.issue_village),
    //                 issue_uncut_unscoop: formatNumber(item.issue_uncut_unscoop),
    //                 issue_shell: formatNumber(item.issue_shell),
    //                 issue_catelfeed: formatNumber(item.issue_catelfeed),         
    //                 Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),          
    //                 Labour: item.noOfdayOperators,
    //                 Superisor: item.noOfnightOperators,
                   
               
    //             Edit_Status: item.editStatus,
    //             Created_By: item.CreatedBy,
    //             Modified_By: item.modifiedBy 

    //         }));
    //         // setTransformedData(transformed);
    //         ws = XLSX.utils.json_to_sheet(transformed);
    //     }
    //     const wb = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    //     const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    //     const blob = new Blob([wbout], { type: 'application/octet-stream' });
    //     saveAs(blob, 'Rejection_Entry_' + currDate + '.xlsx');
    // }
    //     else if (searchType === 'R-LOT') {
    //     const response = await axios.put('/api/rejection/rejectionprimarysearch', {
    //         searchitem: blConNo,
    //         fromDate: fromdate,
    //         toDate: todate,
    //         origin: origin,
    //         type:'RLOT'
    //     })
    //     const data1 = await response.data

    //     let ws
    //     let transformed: any[] = [];
    //     if (EditData.length > 0) {
    //         transformed = EditData.map((item: RejectionData, idx: number) => ({
    //         Sl_No: idx + 1, 
    //         Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
    //         Item_Lot_No: item.LotNo,
    //         Origin: item.origin,
    //         Issue_No: item.altid,
    //         Rejection_Entry_Date: handletimezone(item.date),
    //             Mixing_Lot: item.mixingLot,   
    //             Opening_Peeling: formatNumber(item.rcv_peeling),
    //             Borma_Peeling: formatNumber(item.issue_add_7),
    //             Peeling_Borma_Loss_Kg: formatNumber(item.issue_add_2),
    //             Peeling_Borma_Loss_Percentage: formatNumber(item.issue_add_3),
    //             Opening_Mayur: formatNumber(item.rcv_mayur),
    //             Borma_Mayur: formatNumber(item.issue_add_8),
    //             Mayur_Borma_Loss_Kg: formatNumber(item.issue_add_5),
    //             Mayur_Borma_Loss_Percentage: formatNumber(item.issue_add_6),
    //             Opening_Wholes: item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0,
    //             Opening_LW: item.rcv_wholes ? formatNumber(item.rcv_lw) : 0,
    //             Opening_DPDS: item.rcv_wholes ? formatNumber(item.rcv_dpds) : 0,
    //             Opening_Sorting: item.rcv_wholes ? formatNumber(item.rcv_sorting) : 0,
    //             Opening_BigTaiho: item.rcv_wholes ? formatNumber(item.rcv_bigTaiho) : 0,
    //             Opening_Village: item.rcv_wholes ? formatNumber(item.rcv_village) : 0,
    //             Receive_Total:formatNumber((parseFloat(item.issue_add_7)+parseFloat(item.issue_add_8)
    //             +item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0+item.rcv_lw ? formatNumber(item.rcv_lw) : 0
    //             +item.rcv_dpds ? formatNumber(item.rcv_dpds) : 0+item.rcv_sorting ? formatNumber(item.rcv_sorting) : 0
    //             +item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) : 0+item.rcv_village ? formatNumber(item.rcv_village) : 0).toString()),  
    //             issue_packing: formatNumber(item.issue_packing),
    //             issue_village: formatNumber(item.issue_village),
    //             issue_uncut_unscoop: formatNumber(item.issue_uncut_unscoop),
    //             issue_shell: formatNumber(item.issue_shell),
    //             issue_catelfeed: formatNumber(item.issue_catelfeed),         
    //             Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),          
    //             Labour: item.noOfdayOperators,
    //             Superisor: item.noOfnightOperators,
               
           
    //         Edit_Status: item.editStatus,
    //         Created_By: item.CreatedBy,
    //         Modified_By: item.modifiedBy 

    //         }));
    //         //setTransformedData(transformed);
    //         ws = XLSX.utils.json_to_sheet(transformed);
    //     }
    //     else {
    //         transformed = data1.rcnEntries.map((item: RejectionData, idx: number) => ({
    //             Sl_No: idx + 1, 
    //             Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
    //             Item_Lot_No: item.LotNo,
    //             Origin: item.origin,
    //             Issue_No: item.altid,
    //             Rejection_Entry_Date: handletimezone(item.date),
    //                 Mixing_Lot: item.mixingLot,   
    //                 Opening_Peeling: formatNumber(item.rcv_peeling),
    //                 Borma_Peeling: formatNumber(item.issue_add_7),
    //                 Peeling_Borma_Loss_Kg: formatNumber(item.issue_add_2),
    //                 Peeling_Borma_Loss_Percentage: formatNumber(item.issue_add_3),
    //                 Opening_Mayur: formatNumber(item.rcv_mayur),
    //                 Borma_Mayur: formatNumber(item.issue_add_8),
    //                 Mayur_Borma_Loss_Kg: formatNumber(item.issue_add_5),
    //                 Mayur_Borma_Loss_Percentage: formatNumber(item.issue_add_6),
    //                 Opening_Wholes: item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0,
    //                 Opening_LW: item.rcv_wholes ? formatNumber(item.rcv_lw) : 0,
    //                 Opening_DPDS: item.rcv_wholes ? formatNumber(item.rcv_dpds) : 0,
    //                 Opening_Sorting: item.rcv_wholes ? formatNumber(item.rcv_sorting) : 0,
    //                 Opening_BigTaiho: item.rcv_wholes ? formatNumber(item.rcv_bigTaiho) : 0,
    //                 Opening_Village: item.rcv_wholes ? formatNumber(item.rcv_village) : 0,
    //                 Receive_Total:formatNumber((parseFloat(item.issue_add_7)+parseFloat(item.issue_add_8)
    //                 +item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0+item.rcv_lw ? formatNumber(item.rcv_lw) : 0
    //                 +item.rcv_dpds ? formatNumber(item.rcv_dpds) : 0+item.rcv_sorting ? formatNumber(item.rcv_sorting) : 0
    //                 +item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) : 0+item.rcv_village ? formatNumber(item.rcv_village) : 0).toString()),  
    //                 issue_packing: formatNumber(item.issue_packing),
    //                 issue_village: formatNumber(item.issue_village),
    //                 issue_uncut_unscoop: formatNumber(item.issue_uncut_unscoop),
    //                 issue_shell: formatNumber(item.issue_shell),
    //                 issue_catelfeed: formatNumber(item.issue_catelfeed),         
    //                 Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),          
    //                 Labour: item.noOfdayOperators,
    //                 Superisor: item.noOfnightOperators,
                   
               
    //             Edit_Status: item.editStatus,
    //             Created_By: item.CreatedBy,
    //             Modified_By: item.modifiedBy 

    //         }));
    //         // setTransformedData(transformed);
    //         ws = XLSX.utils.json_to_sheet(transformed);
    //     }
    //     const wb = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    //     const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    //     const blob = new Blob([wbout], { type: 'application/octet-stream' });
    //     saveAs(blob, 'Rejection_Entry_' + currDate + '.xlsx');
    // }
    // else{
    //     const response = await axios.put('/api/rejection/rejectionprimarysearch', {
    //         searchitem: blConNo,
    //         fromDate: fromdate,
    //         toDate: todate,
    //         origin: origin,
    //         type:'VLOT'
    //     })
    //     const data1 = await response.data

    //     let ws
    //     let transformed: any[] = [];
    //     if (EditData.length > 0) {
    //         transformed = EditData.map((item: RejectionData, idx: number) => ({
    //         Sl_No: idx + 1, 
    //         Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
    //         Item_Lot_No: item.LotNo,
    //         Origin: item.origin,
    //         Issue_No: item.altid,
    //         Rejection_Entry_Date: handletimezone(item.date),
    //             Mixing_Lot: item.mixingLot,   
    //             Opening_Peeling: formatNumber(item.rcv_peeling),
    //             Borma_Peeling: formatNumber(item.issue_add_7),
    //             Peeling_Borma_Loss_Kg: formatNumber(item.issue_add_2),
    //             Peeling_Borma_Loss_Percentage: formatNumber(item.issue_add_3),
    //             Opening_Mayur: formatNumber(item.rcv_mayur),
    //             Borma_Mayur: formatNumber(item.issue_add_8),
    //             Mayur_Borma_Loss_Kg: formatNumber(item.issue_add_5),
    //             Mayur_Borma_Loss_Percentage: formatNumber(item.issue_add_6),
    //             Opening_Wholes: item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0,
    //             Opening_LW: item.rcv_wholes ? formatNumber(item.rcv_lw) : 0,
    //             Opening_DPDS: item.rcv_wholes ? formatNumber(item.rcv_dpds) : 0,
    //             Opening_Sorting: item.rcv_wholes ? formatNumber(item.rcv_sorting) : 0,
    //             Opening_BigTaiho: item.rcv_wholes ? formatNumber(item.rcv_bigTaiho) : 0,
    //             Opening_Village: item.rcv_wholes ? formatNumber(item.rcv_village) : 0,
    //             Receive_Total:formatNumber((parseFloat(item.issue_add_7)+parseFloat(item.issue_add_8)
    //             +item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0+item.rcv_lw ? formatNumber(item.rcv_lw) : 0
    //             +item.rcv_dpds ? formatNumber(item.rcv_dpds) : 0+item.rcv_sorting ? formatNumber(item.rcv_sorting) : 0
    //             +item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) : 0+item.rcv_village ? formatNumber(item.rcv_village) : 0).toString()),  
    //             issue_packing: formatNumber(item.issue_packing),
    //             issue_village: formatNumber(item.issue_village),
    //             issue_uncut_unscoop: formatNumber(item.issue_uncut_unscoop),
    //             issue_shell: formatNumber(item.issue_shell),
    //             issue_catelfeed: formatNumber(item.issue_catelfeed),         
    //             Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),          
    //             Labour: item.noOfdayOperators,
    //             Superisor: item.noOfnightOperators,
               
           
    //         Edit_Status: item.editStatus,
    //         Created_By: item.CreatedBy,
    //         Modified_By: item.modifiedBy 

    //         }));
    //         //setTransformedData(transformed);
    //         ws = XLSX.utils.json_to_sheet(transformed);
    //     }
    //     else {
    //         transformed = data1.rcnEntries.map((item: RejectionData, idx: number) => ({
    //             Sl_No: idx + 1, 
    //             Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
    //             Item_Lot_No: item.LotNo,
    //             Origin: item.origin,
    //             Issue_No: item.altid,
    //             Rejection_Entry_Date: handletimezone(item.date),
    //                 Mixing_Lot: item.mixingLot,   
    //                 Opening_Peeling: formatNumber(item.rcv_peeling),
    //                 Borma_Peeling: formatNumber(item.issue_add_7),
    //                 Peeling_Borma_Loss_Kg: formatNumber(item.issue_add_2),
    //                 Peeling_Borma_Loss_Percentage: formatNumber(item.issue_add_3),
    //                 Opening_Mayur: formatNumber(item.rcv_mayur),
    //                 Borma_Mayur: formatNumber(item.issue_add_8),
    //                 Mayur_Borma_Loss_Kg: formatNumber(item.issue_add_5),
    //                 Mayur_Borma_Loss_Percentage: formatNumber(item.issue_add_6),
    //                 Opening_Wholes: item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0,
    //                 Opening_LW: item.rcv_wholes ? formatNumber(item.rcv_lw) : 0,
    //                 Opening_DPDS: item.rcv_wholes ? formatNumber(item.rcv_dpds) : 0,
    //                 Opening_Sorting: item.rcv_wholes ? formatNumber(item.rcv_sorting) : 0,
    //                 Opening_BigTaiho: item.rcv_wholes ? formatNumber(item.rcv_bigTaiho) : 0,
    //                 Opening_Village: item.rcv_wholes ? formatNumber(item.rcv_village) : 0,
    //                 Receive_Total:formatNumber((parseFloat(item.issue_add_7)+parseFloat(item.issue_add_8)
    //                 +item.rcv_wholes ? formatNumber(item.rcv_wholes) : 0+item.rcv_lw ? formatNumber(item.rcv_lw) : 0
    //                 +item.rcv_dpds ? formatNumber(item.rcv_dpds) : 0+item.rcv_sorting ? formatNumber(item.rcv_sorting) : 0
    //                 +item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) : 0+item.rcv_village ? formatNumber(item.rcv_village) : 0).toString()),  
    //                 issue_packing: formatNumber(item.issue_packing),
    //                 issue_village: formatNumber(item.issue_village),
    //                 issue_uncut_unscoop: formatNumber(item.issue_uncut_unscoop),
    //                 issue_shell: formatNumber(item.issue_shell),
    //                 issue_catelfeed: formatNumber(item.issue_catelfeed),         
    //                 Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),          
    //                 Labour: item.noOfdayOperators,
    //                 Superisor: item.noOfnightOperators,
                   
               
    //             Edit_Status: item.editStatus,
    //             Created_By: item.CreatedBy,
    //             Modified_By: item.modifiedBy 

    //         }));
    //         // setTransformedData(transformed);
    //         ws = XLSX.utils.json_to_sheet(transformed);
    //     }
    //     const wb = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    //     const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    //     const blob = new Blob([wbout], { type: 'application/octet-stream' });
    //     saveAs(blob, 'Rejection_Entry_' + currDate + '.xlsx');
    // }
    // }
    const exportToExcel = async () => {
  try {
    const typeMap: any = {
      LOT: "LOT",
      "R-LOT": "RLOT",
      VLOT: "VLOT"
    };

    const response = await axios.put('/api/rejection/rejectionprimarysearch', {
      searchitem: blConNo,
      fromDate: fromdate,
      toDate: todate,
      origin: origin,
      type: typeMap[searchType] || "VLOT"
    });

    const data1 = response.data;

    const sourceData =
      EditData.length > 0 ? EditData : data1.rcnEntries || [];

    // 🔹 Safe number parser
    const num = (val: any) => Number(val) || 0;

    const transformed = sourceData.map((item: RejectionData, idx: number) => ({
      Sl_No: idx + 1,
      Issue_Type: item.altid == 1 ? "Fresh Issue" : "Re-Issue",
      Item_Lot_No: item.LotNo,
      Origin: item.origin,
      Issue_No: item.altid,
      Rejection_Entry_Date: handletimezone(item.date),
      Mixing_Lot: item.mixingLot,

      // 🔹 PEELING
      Opening_Peeling: num(item.rcv_peeling),
      Borma_Peeling: num(item.issue_add_7),
      Peeling_Borma_Loss_Kg: num(item.issue_add_2),
      Peeling_Borma_Loss_Percentage: num(item.issue_add_3),

      // 🔹 MAYUR
      Opening_Mayur: num(item.rcv_mayur),
      Borma_Mayur: num(item.issue_add_8),
      Mayur_Borma_Loss_Kg: num(item.issue_add_5),
      Mayur_Borma_Loss_Percentage: num(item.issue_add_6),

      // 🔹 OPENINGS
      Opening_Wholes: num(item.rcv_wholes),
      Opening_LW: num(item.rcv_lw),
      Opening_DPDS: num(item.rcv_dpds),
      Opening_Sorting: num(item.rcv_sorting),
      Opening_BigTaiho: num(item.rcv_bigTaiho),
      Opening_Village: num(item.rcv_village),

      // 🔥 CORRECT TOTAL (fixed logic)
      Receive_Total:
        num(item.issue_add_7) +
        num(item.issue_add_8) +
        num(item.rcv_wholes) +
        num(item.rcv_lw) +
        num(item.rcv_dpds) +
        num(item.rcv_sorting) +
        num(item.rcv_bigTaiho) +
        num(item.rcv_village),

      // 🔹 ISSUES
      issue_packing: num(item.issue_packing),
      issue_village: num(item.issue_village),
      issue_uncut_unscoop: num(item.issue_uncut_unscoop),
      issue_shell: num(item.issue_shell),
      issue_catelfeed: num(item.issue_catelfeed),

      // 🔹 EXTRA
      Current_Backlog: num(item.current_backlog),
      Labour: num(item.noOfdayOperators),
      Superisor: num(item.noOfnightOperators),

      Edit_Status: item.editStatus,
      Created_By: item.CreatedBy,
      Modified_By: item.modifiedBy
    }));

    // 🔹 Excel
    const ws = XLSX.utils.json_to_sheet(transformed);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const wbout = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array"
    });

    const blob = new Blob([wbout], {
      type: "application/octet-stream"
    });

    saveAs(blob, `Rejection_Entry_${currDate}.xlsx`);
  } catch (err) {
    console.error("Export failed:", err);
  }
};
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
        else if (searchType === 'R-LOT') {
        const response = await axios.put('/api/rejection/rejectionprimarysearch', {
            searchitem: blConNo,
            fromDate: fromdate,
            toDate: todate,
            origin: origin,
            type:'RLOT'

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

    // const formatNumberWithSign = (number: number) => {
    //     if (number > 0) {
    //         return `+${number}`;
    //     } else {
    //         return `${number}`;
    //     }
    // };

     const thClass = `text-center ${props.props === 'edit' ? 'bg-gray-100 text-gray-700' : ''}`;
   
    return (
        <>

        <div className="mx-2 mt-5 ">
             {props.props === 'non-edit' && <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-4 items-end">

                        {/* Type */}
                        <div className="flex flex-col gap-1">
                            {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                            Lot Type
                        </label> */}
                            <select
                                className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150  dark:text-gray-200 appearance-none bg-yellow-100"
                                onChange={(e) => setsearchType(e.target.value)}
                                value={searchType}
                            >

                                {dropdown.map((data, index) => (
                                    <option key={index} value={data} className="bg-white">
                                        {data}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Lot No. / Line Name */}
                        <div className="flex flex-col gap-1">
                            {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                            Lot No
                        </label> */}
                            <Input
                                className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150 dark:text-gray-200"
                                placeholder="Lot No."
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

                            {checkpending('Rejection') && (
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
          
           {props.props==='edit' && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}
            <Table className="mt-4">
                <TableHeader className="bg-neutral-200 text-stone-950 ">


                   <TableHead className={thClass}>SL⠀No</TableHead>
                   <TableHead className={thClass}>Action</TableHead>
<TableHead className={thClass}>Rejection⠀Issue⠀Type</TableHead>

<TableHead className={thClass}>Item⠀Lot⠀No</TableHead>
<TableHead className={thClass}>Origin</TableHead>
<TableHead className={thClass}>Issue⠀No</TableHead>
<TableHead className={thClass}>Edit Status</TableHead>
<TableHead className={thClass}>Rejection⠀Entry⠀Date</TableHead>

<TableHead className={thClass}>Current⠀Backlog</TableHead>

<TableHead className={thClass}>Incoming⠀Mixed⠀Lot⠀&⠀Origin</TableHead>


<TableHead className={thClass}>Receive Peeling</TableHead>
<TableHead className={thClass}>Peeling Borma⠀Loss(Kg)</TableHead>
<TableHead className={thClass}>Peeling Borma⠀Loss(%)</TableHead>

<TableHead className={thClass}>Receive Mayur</TableHead>
<TableHead className={thClass}>Mayur Borma⠀Loss(Kg)</TableHead>
<TableHead className={thClass}>Mayur Borma⠀Loss(%)</TableHead>

<TableHead className={thClass}>Receive Peeling(Borma)</TableHead>
<TableHead className={thClass}>Receive Mayur(Borma)</TableHead>

<TableHead className={thClass}>Receive Wholes</TableHead>
<TableHead className={thClass}>Receive LW</TableHead>
<TableHead className={thClass}>Receive DPDS</TableHead>
<TableHead className={thClass}>Receive Sorting</TableHead>
<TableHead className={thClass}>Receive BigTaiho</TableHead>
<TableHead className={thClass}>Receive Village</TableHead>

<TableHead className={thClass}>Rejection⠀Total⠀Opening (Borma)</TableHead>

<TableHead className={thClass}>Issue Village</TableHead>
<TableHead className={thClass}>Issue Packing</TableHead>
<TableHead className={thClass}>Issue Uncut⠀Unscoop</TableHead>
<TableHead className={thClass}>Issue Shell</TableHead>
<TableHead className={thClass}>Issue Catelfeed</TableHead>

<TableHead className={thClass}>Rejection Total⠀Issue(Kg)</TableHead>

<TableHead className={thClass}>No of Labour</TableHead>
<TableHead className={thClass}>No of Supervisor</TableHead>


<TableHead className={thClass}>Created By</TableHead>
                  
                </TableHeader>
                <TableBody>


                    {EditData.length > 0 && props.props==='edit' ? (EditData.map((item: RejectionData, idx) => {

                        return (
                            <TableRow key={item.id}>
                                <TableCell className="text-center">{idx + 1}</TableCell>
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
                                <TableCell className="text-center font-bold ">{item.altid == 1 ? 'Fresh Issue' : 'Re-Issue'}</TableCell>
                               
                                <TableCell className="text-center font-bold text-orange-500">{item.LotNo}</TableCell>
                                <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                <TableCell className="text-center font-semibold ">{item.altid}</TableCell>
                                <TableCell className="text-center"><button
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
                                <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(item.current_backlog)}kg</TableCell>

                                <TableCell className="text-center font-semibold">{item.mixingLot}</TableCell>
                               
                                {/* <TableCell className="text-center ">{item.rcv_transfer ? formatNumber(item.rcv_transfer):''}</TableCell> */}
                                <TableCell className="text-center ">{formatNumber(item.rcv_peeling)}</TableCell>
                                <TableCell className="text-center font-semibold  text-red-500">{formatNumber(item.issue_add_2)} Kg</TableCell>
                                <TableCell className="text-center font-semibold  text-red-500 ">{formatNumber(item.issue_add_3)} %</TableCell>
                                <TableCell className="text-center font-semibold">{formatNumber(item.rcv_mayur)}</TableCell>
                                <TableCell className="text-center font-semibold  text-red-500">{formatNumber(item.issue_add_5)} Kg</TableCell>
                                <TableCell className="text-center font-semibold  text-red-500 ">{formatNumber(item.issue_add_6)} %</TableCell>
                                <TableCell className="text-center  bg-yellow-100 font-semibold">
                                    {formatNumber((parseFloat(item.rcv_peeling)-parseFloat(item.issue_add_2)).toString())}
                                </TableCell>
                                <TableCell className="text-center  bg-yellow-100 font-semibold">
                                   {formatNumber(((parseFloat(item.rcv_mayur)||0)-(parseFloat(item.issue_add_5)||0)).toString())}
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
                             
                                <TableCell className="text-center">{item.CreatedBy}</TableCell>

                            
                            </TableRow>
                        ) })): (
                        Data.length > 0 ? (Data.map((item: RejectionData, idx) => {
                            return (
                                <TableRow key={item.id} className={`${item.latest==1 ? '' : 'opacity-50 hover:bg-gray-200 bg-gray-200'}`}>
                                    <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                       <TableCell className="text-center">
                                        <Popover>
                                            <PopoverTrigger>
                                                <button className={`p-2 ${item.editStatus === 'Pending' || item.latest === 0? 'text-red-500 bg-red-50 w-20 border border-red-300 font-semibold rounded-lg' : 'text-blue-500 bg-blue-50 w-20 border border-blue-300 font-bold rounded-lg'}`} disabled={item.editStatus === 'Pending' || item.latest === 0 ? true : false}>Action</button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col text-sm w-30 font-medium">
                                                <Dialog>
                                                    <DialogTrigger className="flex"><CiEdit size={20} />
                                                        <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Modify</button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-screen">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <p className='text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold'>Rejection Entry Modification</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <RejectionEDitForm borma={[item]} />
                                                    </DialogContent>
                                                    
                                                </Dialog>
                                                {Number(item.current_backlog) > 0 && <Dialog>
                                                    <DialogTrigger className="flex"><CiBoxes size={20} />
                                                        <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Re-Issue</button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-screen">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <p className='text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold'>Rejection Entry Re-issue</p>
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
                                                                <p className='text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold'>Lot No : {item.LotNo} ({item.origin})</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <RejectionReMix borma={item} />
                                                    </DialogContent>
                                                    
                                                </Dialog>}
                                            </PopoverContent>
                                            
                                        </Popover>
                                    </TableCell>
                                    <TableCell className="text-center font-bold ">{item.altid == 1 ? 'Fresh Issue' : 'Re-Issue'}</TableCell>
                                <TableCell className="text-center font-bold text-orange-500">{item.LotNo}</TableCell>
                                <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                <TableCell className="text-center font-semibold ">{item.altid}</TableCell>
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
                                <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(item.current_backlog)}kg</TableCell>

                                <TableCell className="text-center ">{item.mixingLot}</TableCell>
                             
                                {/* <TableCell className="text-center ">{item.rcv_transfer ? formatNumber(item.rcv_transfer):''}</TableCell> */}
                                <TableCell className="text-center font-semibold">{formatNumber(item.rcv_peeling)}</TableCell>
                                <TableCell className="text-center font-semibold  text-red-500">{formatNumber(item.issue_add_2)} Kg</TableCell>
                                <TableCell className="text-center font-semibold  text-red-500 ">{formatNumber(item.issue_add_3)} %</TableCell>
                                <TableCell className="text-center font-semibold">{formatNumber(item.rcv_mayur)}</TableCell>
                                <TableCell className="text-center font-semibold  text-red-500">{formatNumber(item.issue_add_5)} Kg</TableCell>
                                <TableCell className="text-center font-semibold  text-red-500 ">{formatNumber(item.issue_add_6)} %</TableCell>
                                <TableCell className="text-center  bg-yellow-100 font-semibold">
                                    {formatNumber(item.issue_add_7)}
                                </TableCell>
                                <TableCell className="text-center  bg-yellow-100 font-semibold">
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