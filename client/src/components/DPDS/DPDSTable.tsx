import { useContext, useEffect, useState } from "react";
import { Origin, pagelimit, pageNo, pendingCheckRole } from "../common/exportData";
import Context from "../context/context";
import axios from "axios";
import {  pendingCheckRoles, PermissionRole, DPDSData } from "@/type/type";
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
import RCNDPDSReMix from "./RCNDPDSMIx";
import RCNDPDSReCreateForm from "./DPDSRecreate";
import DPDSEditForm from "./DPDSEditForm";


const DPDSTable = (props:any) => {
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
  //  const [hidetodate, sethidetoDate] = useState<string>('');
    const currDate = new Date().toLocaleDateString();
    const [origin, setOrigin] = useState<string>("")
    const [blockpagen, setblockpagen] = useState('flex')
    const [EditData, setEditData] = useState<DPDSData[]>([])
    const [blConNo, setBlConNo] = useState<string>("")
    const { editDPDSLotWiseData } = useContext(Context);
    const [Data, setData] = useState<DPDSData[]>([])
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
//     const exportToExcel = async () => { 

//         if (searchType === 'LOT') {
// const response = await axios.put('/api/dpds/dpdsprimarysearch', {
//             searchitem: blConNo,
//             fromDate: fromdate,
//             toDate: todate,
//             origin: origin,
//             type:'LOT'
//         })
//         const data1 = await response.data

//         let ws
//         let transformed: any[] = [];
//         if (EditData.length > 0) {
//             transformed = EditData.map((item: DPDSData, idx: number) => ({
//             Sl_No: idx + 1, 
//             Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
//             Item_Lot_No: item.LotNo,
//             Origin: item.origin,
//             Issue_No: item.altid,
//             DPDS_Entry_Date: handletimezone(item.date),
//             Mixing_Lot: item.mixingLot,
//             Opening_DP: Number(item.rcv_dp)||0,
//             Opening_DS: formatNumber(item.rcv_ds),
//             Opening_DP1: formatNumber(item.rcv_dp1),
//             Borma_DP: formatNumber(item.issue_add_4),
//             Borma_DS: formatNumber(item.issue_add_5),
//             Borma_DP1: formatNumber(item.issue_add_6),
//             Receive_Peeling: Number(formatNumber(item.rcv_dp)) + Number(formatNumber(item.rcv_ds))+ Number(formatNumber(item.rcv_dp1)),
//             Borma_Peeling: Number(formatNumber(item.issue_add_4)) + Number(formatNumber(item.issue_add_5))+ Number(formatNumber(item.issue_add_6)),
//             Borma_Loss_Kg: formatNumber(item.issue_add_2),
//             Borma_Loss_Percentage: formatNumber(item.issue_add_3),
//             Receive_Sorting: item.rcv_Sorting ? formatNumber(item.rcv_Sorting) : 0,
//             Receive_BigTaiho: item.rcv_transfer ? formatNumber(item.rcv_transfer) : 0,
//             Receive_Total:formatNumber((parseFloat(item.issue_add_4) +parseFloat(item.issue_add_5)+parseFloat(item.issue_add_6)
//             +(item.rcv_Sorting ? parseFloat(item.rcv_Sorting) :0)+(item.rcv_transfer ? parseFloat(item.rcv_transfer) :0)).toString()) ,
//             Issue_M_DS: formatNumber(item.issue_m_ds),
//             Issue_M_DP: formatNumber(item.issue_m_dp),
//             Issue_K_DP: formatNumber(item.issue_k_dp),
//             Issue_DS1: formatNumber(item.issue_ds_1),
//             Issue_DS2: formatNumber(item.issue_ds_2),
//             Issue_SP2: formatNumber(item.issue_sp_2),
//             Issue_YJH: formatNumber(item.issue_yjh),
//             Issue_YK: formatNumber(item.issue_yk),
//             Issue_KP: formatNumber(item.issue_kp),
//             Issue_WP: formatNumber(item.issue_wp),
//             Issue_RS: formatNumber(item.issue_rs),
           
//             Issue_DP2: formatNumber(item.issue_dp_2),
//             Issue_DP3: formatNumber(item.issue_dp_3),
//             Issue_DP4: formatNumber(item.issue_dp_4),
//             Issue_3L: formatNumber(item.issue_dp_3l),
           
//             Issue_SS: formatNumber(item.issue_ss),
//             Issue_OS: formatNumber(item.issue_os),
//             Issue_OS1: formatNumber(item.issue_os1),

//                 Issue_V_DS: formatNumber(item.issue_V_ds),
//                 Issue_V_M_DS: formatNumber(item.issue_V_m_ds),
//                 Issue_V_DP: formatNumber(item.issue_V_dp),
//                 Issue_V_M_DP: formatNumber(item.issue_V_m_dp),
//                 Issue_V_LP: formatNumber(item.issue_V_lp),
//                 Issue_V_LP_2: formatNumber(item.issue_V_lp_2),
//                 Issue_V_K_DP: formatNumber(item.issue_V_k_dp),
//                 Issue_V_SS: formatNumber(item.issue_V_ss),
//                 Issue_V_YJH: formatNumber(item.issue_V_yjh),
//                 Issue_V_YK: formatNumber(item.issue_V_yk),
//                 Issue_V_SP_2: formatNumber(item.issue_V_sp_2),
//                 Issue_V_KP: formatNumber(item.issue_V_kp),
//                 Issue_V_DP_2: formatNumber(item.issue_V_dp_2),
//                 Issue_V_DP_3: formatNumber(item.issue_V_dp_3),
//                 Issue_V_DP_4: formatNumber(item.issue_V_dp_4),
//                 Issue_V_OS: formatNumber(item.issue_V_os),
//                 Issue_V_OS_1: formatNumber(item.issue_V_os_1),
//                 Issue_V_WP: formatNumber(item.issue_V_wp),
//                 Issue_V_RS: formatNumber(item.issue_V_rs),


//             Issue_Packing:formatNumber((parseFloat(item.issue_m_ds) +
//             parseFloat(item.issue_m_dp)+parseFloat(item.issue_k_dp)+
//             parseFloat(item.issue_ds_1) +parseFloat(item.issue_ds_2)+parseFloat(item.issue_sp_2)+
//             parseFloat(item.issue_yjh) +parseFloat(item.issue_yk)+parseFloat(item.issue_kp)+
//             parseFloat(item.issue_wp) +parseFloat(item.issue_rs)+parseFloat(item.issue_dp_2)+
//             parseFloat(item.issue_dp_3) +parseFloat(item.issue_dp_4)+parseFloat(item.issue_dp_3l)+
//             parseFloat(item.issue_ss) +parseFloat(item.issue_os)+parseFloat(item.issue_os1)+
//             parseFloat(item.issue_V_ds) +
//             parseFloat(item.issue_V_m_ds) +
//             parseFloat(item.issue_V_dp) +
//             parseFloat(item.issue_V_m_dp) +
//             parseFloat(item.issue_V_lp) +
//             parseFloat(item.issue_V_lp_2) +
//             parseFloat(item.issue_V_k_dp) +
//             parseFloat(item.issue_V_ss) +
//             parseFloat(item.issue_V_yjh) +
//             parseFloat(item.issue_V_yk) +
//             parseFloat(item.issue_V_sp_2) +
//             parseFloat(item.issue_V_kp) +
//             parseFloat(item.issue_V_dp_2) +
//             parseFloat(item.issue_V_dp_3) +
//             parseFloat(item.issue_V_dp_4) +
//             parseFloat(item.issue_V_os) +
//             parseFloat(item.issue_V_os_1) +
//             parseFloat(item.issue_V_wp) +
//             parseFloat(item.issue_V_rs) ).toString()),


//             Issue_Rejection: formatNumber(item.issue_rejection),
//             Issue_Village: formatNumber(item.issue_village),
//             Issue_Big_Taiho: formatNumber(item.issue_bigTaiho),
//             Issue_Mayur: formatNumber(item.issue_mayur),
      
//             Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),
           
//             No_Labour: item.noOfdayOperators,
//             No_Supervisor: item.noOfnightOperators,
//             Edit_Status: item.editStatus,
//             Created_By: item.CreatedBy,
//             Modified_By: item.modifiedBy 

//             }));
//             //setTransformedData(transformed);
//             ws = XLSX.utils.json_to_sheet(transformed);
//         }
//         else {
//             transformed = data1.rcnEntries.map((item: DPDSData, idx: number) => ({
//                 Sl_No: idx + 1, 
//             Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
//             Item_Lot_No: item.LotNo,
//             Origin: item.origin,
//             Issue_No: item.altid,
//             DPDS_Entry_Date: handletimezone(item.date),
//             Mixing_Lot: item.mixingLot,
//             Opening_DP: formatNumber(item.rcv_dp),
//             Opening_DS: formatNumber(item.rcv_ds),
//             Opening_DP1: formatNumber(item.rcv_dp1),
//             Borma_DP: formatNumber(item.issue_add_4),
//             Borma_DS: formatNumber(item.issue_add_5),
//             Borma_DP1: formatNumber(item.issue_add_6),
//             Receive_Peeling: Number(formatNumber(item.rcv_dp)) + Number(formatNumber(item.rcv_ds))+ Number(formatNumber(item.rcv_dp1)),
//             Borma_Peeling: Number(formatNumber(item.issue_add_4)) + Number(formatNumber(item.issue_add_5))+ Number(formatNumber(item.issue_add_6)),
//             Borma_Loss_Kg: formatNumber(item.issue_add_2),
//             Borma_Loss_Percentage: formatNumber(item.issue_add_3),
//             Receive_Sorting: item.rcv_Sorting ? formatNumber(item.rcv_Sorting) : 0,
//             Receive_BigTaiho: item.rcv_transfer ? formatNumber(item.rcv_transfer) : 0,
//             Receive_Total:formatNumber((parseFloat(item.issue_add_4) +parseFloat(item.issue_add_5)+parseFloat(item.issue_add_6)
//             +(item.rcv_Sorting ? parseFloat(item.rcv_Sorting) :0)+(item.rcv_transfer ? parseFloat(item.rcv_transfer) :0)).toString()) ,
//             Issue_M_DS: formatNumber(item.issue_m_ds),
//             Issue_M_DP: formatNumber(item.issue_m_dp),
//             Issue_K_DP: formatNumber(item.issue_k_dp),
//             Issue_DS1: formatNumber(item.issue_ds_1),
//             Issue_DS2: formatNumber(item.issue_ds_2),
//             Issue_SP2: formatNumber(item.issue_sp_2),
//             Issue_YJH: formatNumber(item.issue_yjh),
//             Issue_YK: formatNumber(item.issue_yk),
//             Issue_KP: formatNumber(item.issue_kp),
//             Issue_WP: formatNumber(item.issue_wp),
//             Issue_RS: formatNumber(item.issue_rs),
           
//             Issue_DP2: formatNumber(item.issue_dp_2),
//             Issue_DP3: formatNumber(item.issue_dp_3),
//             Issue_DP4: formatNumber(item.issue_dp_4),
//             Issue_3L: formatNumber(item.issue_dp_3l),
           
//             Issue_SS: formatNumber(item.issue_ss),
//             Issue_OS: formatNumber(item.issue_os),
//             Issue_OS1: formatNumber(item.issue_os1),

//                 Issue_V_DS: formatNumber(item.issue_V_ds),
//                 Issue_V_M_DS: formatNumber(item.issue_V_m_ds),
//                 Issue_V_DP: formatNumber(item.issue_V_dp),
//                 Issue_V_M_DP: formatNumber(item.issue_V_m_dp),
//                 Issue_V_LP: formatNumber(item.issue_V_lp),
//                 Issue_V_LP_2: formatNumber(item.issue_V_lp_2),
//                 Issue_V_K_DP: formatNumber(item.issue_V_k_dp),
//                 Issue_V_SS: formatNumber(item.issue_V_ss),
//                 Issue_V_YJH: formatNumber(item.issue_V_yjh),
//                 Issue_V_YK: formatNumber(item.issue_V_yk),
//                 Issue_V_SP_2: formatNumber(item.issue_V_sp_2),
//                 Issue_V_KP: formatNumber(item.issue_V_kp),
//                 Issue_V_DP_2: formatNumber(item.issue_V_dp_2),
//                 Issue_V_DP_3: formatNumber(item.issue_V_dp_3),
//                 Issue_V_DP_4: formatNumber(item.issue_V_dp_4),
//                 Issue_V_OS: formatNumber(item.issue_V_os),
//                 Issue_V_OS_1: formatNumber(item.issue_V_os_1),
//                 Issue_V_WP: formatNumber(item.issue_V_wp),
//                 Issue_V_RS: formatNumber(item.issue_V_rs),

//                 Issue_Packing:formatNumber((parseFloat(item.issue_m_ds) +
//                 parseFloat(item.issue_m_dp)+parseFloat(item.issue_k_dp)+
//                 parseFloat(item.issue_ds_1) +parseFloat(item.issue_ds_2)+parseFloat(item.issue_sp_2)+
//                 parseFloat(item.issue_yjh) +parseFloat(item.issue_yk)+parseFloat(item.issue_kp)+
//                 parseFloat(item.issue_wp) +parseFloat(item.issue_rs)+parseFloat(item.issue_dp_2)+
//                 parseFloat(item.issue_dp_3) +parseFloat(item.issue_dp_4)+parseFloat(item.issue_dp_3l)+
//                 parseFloat(item.issue_ss) +parseFloat(item.issue_os)+parseFloat(item.issue_os1)+
//                 parseFloat(item.issue_V_ds) +
//                 parseFloat(item.issue_V_m_ds) +
//                 parseFloat(item.issue_V_dp) +
//                 parseFloat(item.issue_V_m_dp) +
//                 parseFloat(item.issue_V_lp) +
//                 parseFloat(item.issue_V_lp_2) +
//                 parseFloat(item.issue_V_k_dp) +
//                 parseFloat(item.issue_V_ss) +
//                 parseFloat(item.issue_V_yjh) +
//                 parseFloat(item.issue_V_yk) +
//                 parseFloat(item.issue_V_sp_2) +
//                 parseFloat(item.issue_V_kp) +
//                 parseFloat(item.issue_V_dp_2) +
//                 parseFloat(item.issue_V_dp_3) +
//                 parseFloat(item.issue_V_dp_4) +
//                 parseFloat(item.issue_V_os) +
//                 parseFloat(item.issue_V_os_1) +
//                 parseFloat(item.issue_V_wp) +
//                 parseFloat(item.issue_V_rs) ).toString()),
//             Issue_Rejection: formatNumber(item.issue_rejection),
//             Issue_Village: formatNumber(item.issue_village),
//             Issue_Big_Taiho: formatNumber(item.issue_bigTaiho),
//             Issue_Mayur: formatNumber(item.issue_mayur),
      
//             Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),
           
//             No_Labour: item.noOfdayOperators,
//             No_Supervisor: item.noOfnightOperators,
//             Edit_Status: item.editStatus,
//             Created_By: item.CreatedBy,
//             Modified_By: item.modifiedBy 

//             }));
//             // setTransformedData(transformed);
//             ws = XLSX.utils.json_to_sheet(transformed);
//         }
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
//         const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
//         const blob = new Blob([wbout], { type: 'application/octet-stream' });
//         saveAs(blob, 'DPDS_Entry_' + currDate + '.xlsx');
//         }
//         else  if (searchType === 'R-LOT') {
//             const response = await axios.put('/api/dpds/dpdsprimarysearch', {
//             searchitem: blConNo,
//             fromDate: fromdate,
//             toDate: todate,
//             origin: origin,
//             type:'RLOT'
//         })
//         const data1 = await response.data

//         let ws
//         let transformed: any[] = [];
//         if (EditData.length > 0) {
//             transformed = EditData.map((item: DPDSData, idx: number) => ({
//             Sl_No: idx + 1, 
//             Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
//             Item_Lot_No: item.LotNo,
//             Origin: item.origin,
//             Issue_No: item.altid,
//             DPDS_Entry_Date: handletimezone(item.date),
//             Mixing_Lot: item.mixingLot,
//             Opening_DP: formatNumber(item.rcv_dp),
//             Opening_DS: formatNumber(item.rcv_ds),
//             Opening_DP1: formatNumber(item.rcv_dp1),
//             Borma_DP: formatNumber(item.issue_add_4),
//             Borma_DS: formatNumber(item.issue_add_5),
//             Borma_DP1: formatNumber(item.issue_add_6),
//             Receive_Peeling: Number(formatNumber(item.rcv_dp)) + Number(formatNumber(item.rcv_ds))+ Number(formatNumber(item.rcv_dp1)),
//             Borma_Peeling: Number(formatNumber(item.issue_add_4)) + Number(formatNumber(item.issue_add_5))+ Number(formatNumber(item.issue_add_6)),
//             Borma_Loss_Kg: formatNumber(item.issue_add_2),
//             Borma_Loss_Percentage: formatNumber(item.issue_add_3),
//             Receive_Sorting: item.rcv_Sorting ? formatNumber(item.rcv_Sorting) : 0,
//             Receive_BigTaiho: item.rcv_transfer ? formatNumber(item.rcv_transfer) : 0,
//             Receive_Total:formatNumber((parseFloat(item.issue_add_4) +parseFloat(item.issue_add_5)+parseFloat(item.issue_add_6)
//             +(item.rcv_Sorting ? parseFloat(item.rcv_Sorting) :0)+(item.rcv_transfer ? parseFloat(item.rcv_transfer) :0)).toString()) ,
//             Issue_M_DS: formatNumber(item.issue_m_ds),
//             Issue_M_DP: formatNumber(item.issue_m_dp),
//             Issue_K_DP: formatNumber(item.issue_k_dp),
//             Issue_DS1: formatNumber(item.issue_ds_1),
//             Issue_DS2: formatNumber(item.issue_ds_2),
//             Issue_SP2: formatNumber(item.issue_sp_2),
//             Issue_YJH: formatNumber(item.issue_yjh),
//             Issue_YK: formatNumber(item.issue_yk),
//             Issue_KP: formatNumber(item.issue_kp),
//             Issue_WP: formatNumber(item.issue_wp),
//             Issue_RS: formatNumber(item.issue_rs),
           
//             Issue_DP2: formatNumber(item.issue_dp_2),
//             Issue_DP3: formatNumber(item.issue_dp_3),
//             Issue_DP4: formatNumber(item.issue_dp_4),
//             Issue_3L: formatNumber(item.issue_dp_3l),
           
//             Issue_SS: formatNumber(item.issue_ss),
//             Issue_OS: formatNumber(item.issue_os),
//             Issue_OS1: formatNumber(item.issue_os1),

//                 Issue_V_DS: formatNumber(item.issue_V_ds),
//                 Issue_V_M_DS: formatNumber(item.issue_V_m_ds),
//                 Issue_V_DP: formatNumber(item.issue_V_dp),
//                 Issue_V_M_DP: formatNumber(item.issue_V_m_dp),
//                 Issue_V_LP: formatNumber(item.issue_V_lp),
//                 Issue_V_LP_2: formatNumber(item.issue_V_lp_2),
//                 Issue_V_K_DP: formatNumber(item.issue_V_k_dp),
//                 Issue_V_SS: formatNumber(item.issue_V_ss),
//                 Issue_V_YJH: formatNumber(item.issue_V_yjh),
//                 Issue_V_YK: formatNumber(item.issue_V_yk),
//                 Issue_V_SP_2: formatNumber(item.issue_V_sp_2),
//                 Issue_V_KP: formatNumber(item.issue_V_kp),
//                 Issue_V_DP_2: formatNumber(item.issue_V_dp_2),
//                 Issue_V_DP_3: formatNumber(item.issue_V_dp_3),
//                 Issue_V_DP_4: formatNumber(item.issue_V_dp_4),
//                 Issue_V_OS: formatNumber(item.issue_V_os),
//                 Issue_V_OS_1: formatNumber(item.issue_V_os_1),
//                 Issue_V_WP: formatNumber(item.issue_V_wp),
//                 Issue_V_RS: formatNumber(item.issue_V_rs),


//             Issue_Packing:formatNumber((parseFloat(item.issue_m_ds) +
//             parseFloat(item.issue_m_dp)+parseFloat(item.issue_k_dp)+
//             parseFloat(item.issue_ds_1) +parseFloat(item.issue_ds_2)+parseFloat(item.issue_sp_2)+
//             parseFloat(item.issue_yjh) +parseFloat(item.issue_yk)+parseFloat(item.issue_kp)+
//             parseFloat(item.issue_wp) +parseFloat(item.issue_rs)+parseFloat(item.issue_dp_2)+
//             parseFloat(item.issue_dp_3) +parseFloat(item.issue_dp_4)+parseFloat(item.issue_dp_3l)+
//             parseFloat(item.issue_ss) +parseFloat(item.issue_os)+parseFloat(item.issue_os1)+
//             parseFloat(item.issue_V_ds) +
//             parseFloat(item.issue_V_m_ds) +
//             parseFloat(item.issue_V_dp) +
//             parseFloat(item.issue_V_m_dp) +
//             parseFloat(item.issue_V_lp) +
//             parseFloat(item.issue_V_lp_2) +
//             parseFloat(item.issue_V_k_dp) +
//             parseFloat(item.issue_V_ss) +
//             parseFloat(item.issue_V_yjh) +
//             parseFloat(item.issue_V_yk) +
//             parseFloat(item.issue_V_sp_2) +
//             parseFloat(item.issue_V_kp) +
//             parseFloat(item.issue_V_dp_2) +
//             parseFloat(item.issue_V_dp_3) +
//             parseFloat(item.issue_V_dp_4) +
//             parseFloat(item.issue_V_os) +
//             parseFloat(item.issue_V_os_1) +
//             parseFloat(item.issue_V_wp) +
//             parseFloat(item.issue_V_rs) ).toString()),


//             Issue_Rejection: formatNumber(item.issue_rejection),
//             Issue_Village: formatNumber(item.issue_village),
//             Issue_Big_Taiho: formatNumber(item.issue_bigTaiho),
//             Issue_Mayur: formatNumber(item.issue_mayur),
      
//             Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),
           
//             No_Labour: item.noOfdayOperators,
//             No_Supervisor: item.noOfnightOperators,
//             Edit_Status: item.editStatus,
//             Created_By: item.CreatedBy,
//             Modified_By: item.modifiedBy 

//             }));
//             //setTransformedData(transformed);
//             ws = XLSX.utils.json_to_sheet(transformed);
//         }
//         else {
//             transformed = data1.rcnEntries.map((item: DPDSData, idx: number) => ({
//                 Sl_No: idx + 1, 
//             Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
//             Item_Lot_No: item.LotNo,
//             Origin: item.origin,
//             Issue_No: item.altid,
//             DPDS_Entry_Date: handletimezone(item.date),
//             Mixing_Lot: item.mixingLot,
//             Opening_DP: formatNumber(item.rcv_dp),
//             Opening_DS: formatNumber(item.rcv_ds),
//             Opening_DP1: formatNumber(item.rcv_dp1),
//             Borma_DP: formatNumber(item.issue_add_4),
//             Borma_DS: formatNumber(item.issue_add_5),
//             Borma_DP1: formatNumber(item.issue_add_6),
//             Receive_Peeling: Number(formatNumber(item.rcv_dp)) + Number(formatNumber(item.rcv_ds))+ Number(formatNumber(item.rcv_dp1)),
//             Borma_Peeling: Number(formatNumber(item.issue_add_4)) + Number(formatNumber(item.issue_add_5))+ Number(formatNumber(item.issue_add_6)),
//             Borma_Loss_Kg: formatNumber(item.issue_add_2),
//             Borma_Loss_Percentage: formatNumber(item.issue_add_3),
//             Receive_Sorting: item.rcv_Sorting ? formatNumber(item.rcv_Sorting) : 0,
//             Receive_BigTaiho: item.rcv_transfer ? formatNumber(item.rcv_transfer) : 0,
//             Receive_Total:formatNumber((parseFloat(item.issue_add_4) +parseFloat(item.issue_add_5)+parseFloat(item.issue_add_6)
//             +(item.rcv_Sorting ? parseFloat(item.rcv_Sorting) :0)+(item.rcv_transfer ? parseFloat(item.rcv_transfer) :0)).toString()) ,
//             Issue_M_DS: formatNumber(item.issue_m_ds),
//             Issue_M_DP: formatNumber(item.issue_m_dp),
//             Issue_K_DP: formatNumber(item.issue_k_dp),
//             Issue_DS1: formatNumber(item.issue_ds_1),
//             Issue_DS2: formatNumber(item.issue_ds_2),
//             Issue_SP2: formatNumber(item.issue_sp_2),
//             Issue_YJH: formatNumber(item.issue_yjh),
//             Issue_YK: formatNumber(item.issue_yk),
//             Issue_KP: formatNumber(item.issue_kp),
//             Issue_WP: formatNumber(item.issue_wp),
//             Issue_RS: formatNumber(item.issue_rs),
           
//             Issue_DP2: formatNumber(item.issue_dp_2),
//             Issue_DP3: formatNumber(item.issue_dp_3),
//             Issue_DP4: formatNumber(item.issue_dp_4),
//             Issue_3L: formatNumber(item.issue_dp_3l),
           
//             Issue_SS: formatNumber(item.issue_ss),
//             Issue_OS: formatNumber(item.issue_os),
//             Issue_OS1: formatNumber(item.issue_os1),

//                 Issue_V_DS: formatNumber(item.issue_V_ds),
//                 Issue_V_M_DS: formatNumber(item.issue_V_m_ds),
//                 Issue_V_DP: formatNumber(item.issue_V_dp),
//                 Issue_V_M_DP: formatNumber(item.issue_V_m_dp),
//                 Issue_V_LP: formatNumber(item.issue_V_lp),
//                 Issue_V_LP_2: formatNumber(item.issue_V_lp_2),
//                 Issue_V_K_DP: formatNumber(item.issue_V_k_dp),
//                 Issue_V_SS: formatNumber(item.issue_V_ss),
//                 Issue_V_YJH: formatNumber(item.issue_V_yjh),
//                 Issue_V_YK: formatNumber(item.issue_V_yk),
//                 Issue_V_SP_2: formatNumber(item.issue_V_sp_2),
//                 Issue_V_KP: formatNumber(item.issue_V_kp),
//                 Issue_V_DP_2: formatNumber(item.issue_V_dp_2),
//                 Issue_V_DP_3: formatNumber(item.issue_V_dp_3),
//                 Issue_V_DP_4: formatNumber(item.issue_V_dp_4),
//                 Issue_V_OS: formatNumber(item.issue_V_os),
//                 Issue_V_OS_1: formatNumber(item.issue_V_os_1),
//                 Issue_V_WP: formatNumber(item.issue_V_wp),
//                 Issue_V_RS: formatNumber(item.issue_V_rs),

//                 Issue_Packing:formatNumber((parseFloat(item.issue_m_ds) +
//                 parseFloat(item.issue_m_dp)+parseFloat(item.issue_k_dp)+
//                 parseFloat(item.issue_ds_1) +parseFloat(item.issue_ds_2)+parseFloat(item.issue_sp_2)+
//                 parseFloat(item.issue_yjh) +parseFloat(item.issue_yk)+parseFloat(item.issue_kp)+
//                 parseFloat(item.issue_wp) +parseFloat(item.issue_rs)+parseFloat(item.issue_dp_2)+
//                 parseFloat(item.issue_dp_3) +parseFloat(item.issue_dp_4)+parseFloat(item.issue_dp_3l)+
//                 parseFloat(item.issue_ss) +parseFloat(item.issue_os)+parseFloat(item.issue_os1)+
//                 parseFloat(item.issue_V_ds) +
//                 parseFloat(item.issue_V_m_ds) +
//                 parseFloat(item.issue_V_dp) +
//                 parseFloat(item.issue_V_m_dp) +
//                 parseFloat(item.issue_V_lp) +
//                 parseFloat(item.issue_V_lp_2) +
//                 parseFloat(item.issue_V_k_dp) +
//                 parseFloat(item.issue_V_ss) +
//                 parseFloat(item.issue_V_yjh) +
//                 parseFloat(item.issue_V_yk) +
//                 parseFloat(item.issue_V_sp_2) +
//                 parseFloat(item.issue_V_kp) +
//                 parseFloat(item.issue_V_dp_2) +
//                 parseFloat(item.issue_V_dp_3) +
//                 parseFloat(item.issue_V_dp_4) +
//                 parseFloat(item.issue_V_os) +
//                 parseFloat(item.issue_V_os_1) +
//                 parseFloat(item.issue_V_wp) +
//                 parseFloat(item.issue_V_rs) ).toString()),
//             Issue_Rejection: formatNumber(item.issue_rejection),
//             Issue_Village: formatNumber(item.issue_village),
//             Issue_Big_Taiho: formatNumber(item.issue_bigTaiho),
//             Issue_Mayur: formatNumber(item.issue_mayur),
      
//             Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),
           
//             No_Labour: item.noOfdayOperators,
//             No_Supervisor: item.noOfnightOperators,
//             Edit_Status: item.editStatus,
//             Created_By: item.CreatedBy,
//             Modified_By: item.modifiedBy 

//             }));
//             // setTransformedData(transformed);
//             ws = XLSX.utils.json_to_sheet(transformed);
//         }
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
//         const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
//         const blob = new Blob([wbout], { type: 'application/octet-stream' });
//         saveAs(blob, 'DPDS_Entry_' + currDate + '.xlsx');
//         }
//         else{

        
//         const response = await axios.put('/api/dpds/dpdsprimarysearch', {
//             searchitem: blConNo,
//             fromDate: fromdate,
//             toDate: todate,
//             origin: origin,
//             type:'VLOT'
//         })
//         const data1 = await response.data

//         let ws
//         let transformed: any[] = [];
//         if (EditData.length > 0) {
//             transformed = EditData.map((item: DPDSData, idx: number) => ({
//             Sl_No: idx + 1, 
//             Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
//             Item_Lot_No: item.LotNo,
//             Origin: item.origin,
//             Issue_No: item.altid,
//             DPDS_Entry_Date: handletimezone(item.date),
//             Mixing_Lot: item.mixingLot,
//             Opening_DP: formatNumber(item.rcv_dp),
//             Opening_DS: formatNumber(item.rcv_ds),
//             Opening_DP1: formatNumber(item.rcv_dp1),
//             Borma_DP: formatNumber(item.issue_add_4),
//             Borma_DS: formatNumber(item.issue_add_5),
//             Borma_DP1: formatNumber(item.issue_add_6),
//             Receive_Peeling: Number(formatNumber(item.rcv_dp)) + Number(formatNumber(item.rcv_ds))+ Number(formatNumber(item.rcv_dp1)),
//             Borma_Peeling: Number(formatNumber(item.issue_add_4)) + Number(formatNumber(item.issue_add_5))+ Number(formatNumber(item.issue_add_6)),
//             Borma_Loss_Kg: formatNumber(item.issue_add_2),
//             Borma_Loss_Percentage: formatNumber(item.issue_add_3),
//             Receive_Sorting: item.rcv_Sorting ? formatNumber(item.rcv_Sorting) : 0,
//             Receive_BigTaiho: item.rcv_transfer ? formatNumber(item.rcv_transfer) : 0,
//             Receive_Total:formatNumber((parseFloat(item.issue_add_4) +parseFloat(item.issue_add_5)+parseFloat(item.issue_add_6)
//             +(item.rcv_Sorting ? parseFloat(item.rcv_Sorting) :0)+(item.rcv_transfer ? parseFloat(item.rcv_transfer) :0)).toString()) ,
//             Issue_M_DS: formatNumber(item.issue_m_ds),
//             Issue_M_DP: formatNumber(item.issue_m_dp),
//             Issue_K_DP: formatNumber(item.issue_k_dp),
//             Issue_DS1: formatNumber(item.issue_ds_1),
//             Issue_DS2: formatNumber(item.issue_ds_2),
//             Issue_SP2: formatNumber(item.issue_sp_2),
//             Issue_YJH: formatNumber(item.issue_yjh),
//             Issue_YK: formatNumber(item.issue_yk),
//             Issue_KP: formatNumber(item.issue_kp),
//             Issue_WP: formatNumber(item.issue_wp),
//             Issue_RS: formatNumber(item.issue_rs),
           
//             Issue_DP2: formatNumber(item.issue_dp_2),
//             Issue_DP3: formatNumber(item.issue_dp_3),
//             Issue_DP4: formatNumber(item.issue_dp_4),
//             Issue_3L: formatNumber(item.issue_dp_3l),
           
//             Issue_SS: formatNumber(item.issue_ss),
//             Issue_OS: formatNumber(item.issue_os),
//             Issue_OS1: formatNumber(item.issue_os1),

//                 Issue_V_DS: formatNumber(item.issue_V_ds),
//                 Issue_V_M_DS: formatNumber(item.issue_V_m_ds),
//                 Issue_V_DP: formatNumber(item.issue_V_dp),
//                 Issue_V_M_DP: formatNumber(item.issue_V_m_dp),
//                 Issue_V_LP: formatNumber(item.issue_V_lp),
//                 Issue_V_LP_2: formatNumber(item.issue_V_lp_2),
//                 Issue_V_K_DP: formatNumber(item.issue_V_k_dp),
//                 Issue_V_SS: formatNumber(item.issue_V_ss),
//                 Issue_V_YJH: formatNumber(item.issue_V_yjh),
//                 Issue_V_YK: formatNumber(item.issue_V_yk),
//                 Issue_V_SP_2: formatNumber(item.issue_V_sp_2),
//                 Issue_V_KP: formatNumber(item.issue_V_kp),
//                 Issue_V_DP_2: formatNumber(item.issue_V_dp_2),
//                 Issue_V_DP_3: formatNumber(item.issue_V_dp_3),
//                 Issue_V_DP_4: formatNumber(item.issue_V_dp_4),
//                 Issue_V_OS: formatNumber(item.issue_V_os),
//                 Issue_V_OS_1: formatNumber(item.issue_V_os_1),
//                 Issue_V_WP: formatNumber(item.issue_V_wp),
//                 Issue_V_RS: formatNumber(item.issue_V_rs),


//             Issue_Packing:formatNumber((parseFloat(item.issue_m_ds) +
//             parseFloat(item.issue_m_dp)+parseFloat(item.issue_k_dp)+
//             parseFloat(item.issue_ds_1) +parseFloat(item.issue_ds_2)+parseFloat(item.issue_sp_2)+
//             parseFloat(item.issue_yjh) +parseFloat(item.issue_yk)+parseFloat(item.issue_kp)+
//             parseFloat(item.issue_wp) +parseFloat(item.issue_rs)+parseFloat(item.issue_dp_2)+
//             parseFloat(item.issue_dp_3) +parseFloat(item.issue_dp_4)+parseFloat(item.issue_dp_3l)+
//             parseFloat(item.issue_ss) +parseFloat(item.issue_os)+parseFloat(item.issue_os1)+
//             parseFloat(item.issue_V_ds) +
//             parseFloat(item.issue_V_m_ds) +
//             parseFloat(item.issue_V_dp) +
//             parseFloat(item.issue_V_m_dp) +
//             parseFloat(item.issue_V_lp) +
//             parseFloat(item.issue_V_lp_2) +
//             parseFloat(item.issue_V_k_dp) +
//             parseFloat(item.issue_V_ss) +
//             parseFloat(item.issue_V_yjh) +
//             parseFloat(item.issue_V_yk) +
//             parseFloat(item.issue_V_sp_2) +
//             parseFloat(item.issue_V_kp) +
//             parseFloat(item.issue_V_dp_2) +
//             parseFloat(item.issue_V_dp_3) +
//             parseFloat(item.issue_V_dp_4) +
//             parseFloat(item.issue_V_os) +
//             parseFloat(item.issue_V_os_1) +
//             parseFloat(item.issue_V_wp) +
//             parseFloat(item.issue_V_rs) ).toString()),


//             Issue_Rejection: formatNumber(item.issue_rejection),
//             Issue_Village: formatNumber(item.issue_village),
//             Issue_Big_Taiho: formatNumber(item.issue_bigTaiho),
//             Issue_Mayur: formatNumber(item.issue_mayur),
      
//             Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),
           
//             No_Labour: item.noOfdayOperators,
//             No_Supervisor: item.noOfnightOperators,
//             Edit_Status: item.editStatus,
//             Created_By: item.CreatedBy,
//             Modified_By: item.modifiedBy 

//             }));
//             //setTransformedData(transformed);
//             ws = XLSX.utils.json_to_sheet(transformed);
//         }
//         else {
//             transformed = data1.rcnEntries.map((item: DPDSData, idx: number) => ({
//                 Sl_No: idx + 1, 
//             Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
//             Item_Lot_No: item.LotNo,
//             Origin: item.origin,
//             Issue_No: item.altid,
//             DPDS_Entry_Date: handletimezone(item.date),
//             Mixing_Lot: item.mixingLot,
//             Opening_DP: formatNumber(item.rcv_dp),
//             Opening_DS: formatNumber(item.rcv_ds),
//             Opening_DP1: formatNumber(item.rcv_dp1),
//             Borma_DP: formatNumber(item.issue_add_4),
//             Borma_DS: formatNumber(item.issue_add_5),
//             Borma_DP1: formatNumber(item.issue_add_6),
//             Receive_Peeling: Number(formatNumber(item.rcv_dp)) + Number(formatNumber(item.rcv_ds))+ Number(formatNumber(item.rcv_dp1)),
//             Borma_Peeling: Number(formatNumber(item.issue_add_4)) + Number(formatNumber(item.issue_add_5))+ Number(formatNumber(item.issue_add_6)),
//             Borma_Loss_Kg: formatNumber(item.issue_add_2),
//             Borma_Loss_Percentage: formatNumber(item.issue_add_3),
//             Receive_Sorting: item.rcv_Sorting ? formatNumber(item.rcv_Sorting) : 0,
//             Receive_BigTaiho: item.rcv_transfer ? formatNumber(item.rcv_transfer) : 0,
//             Receive_Total:formatNumber((parseFloat(item.issue_add_4) +parseFloat(item.issue_add_5)+parseFloat(item.issue_add_6)
//             +(item.rcv_Sorting ? parseFloat(item.rcv_Sorting) :0)+(item.rcv_transfer ? parseFloat(item.rcv_transfer) :0)).toString()) ,
//             Issue_M_DS: formatNumber(item.issue_m_ds),
//             Issue_M_DP: formatNumber(item.issue_m_dp),
//             Issue_K_DP: formatNumber(item.issue_k_dp),
//             Issue_DS1: formatNumber(item.issue_ds_1),
//             Issue_DS2: formatNumber(item.issue_ds_2),
//             Issue_SP2: formatNumber(item.issue_sp_2),
//             Issue_YJH: formatNumber(item.issue_yjh),
//             Issue_YK: formatNumber(item.issue_yk),
//             Issue_KP: formatNumber(item.issue_kp),
//             Issue_WP: formatNumber(item.issue_wp),
//             Issue_RS: formatNumber(item.issue_rs),
           
//             Issue_DP2: formatNumber(item.issue_dp_2),
//             Issue_DP3: formatNumber(item.issue_dp_3),
//             Issue_DP4: formatNumber(item.issue_dp_4),
//             Issue_3L: formatNumber(item.issue_dp_3l),
           
//             Issue_SS: formatNumber(item.issue_ss),
//             Issue_OS: formatNumber(item.issue_os),
//             Issue_OS1: formatNumber(item.issue_os1),

//                 Issue_V_DS: formatNumber(item.issue_V_ds),
//                 Issue_V_M_DS: formatNumber(item.issue_V_m_ds),
//                 Issue_V_DP: formatNumber(item.issue_V_dp),
//                 Issue_V_M_DP: formatNumber(item.issue_V_m_dp),
//                 Issue_V_LP: formatNumber(item.issue_V_lp),
//                 Issue_V_LP_2: formatNumber(item.issue_V_lp_2),
//                 Issue_V_K_DP: formatNumber(item.issue_V_k_dp),
//                 Issue_V_SS: formatNumber(item.issue_V_ss),
//                 Issue_V_YJH: formatNumber(item.issue_V_yjh),
//                 Issue_V_YK: formatNumber(item.issue_V_yk),
//                 Issue_V_SP_2: formatNumber(item.issue_V_sp_2),
//                 Issue_V_KP: formatNumber(item.issue_V_kp),
//                 Issue_V_DP_2: formatNumber(item.issue_V_dp_2),
//                 Issue_V_DP_3: formatNumber(item.issue_V_dp_3),
//                 Issue_V_DP_4: formatNumber(item.issue_V_dp_4),
//                 Issue_V_OS: formatNumber(item.issue_V_os),
//                 Issue_V_OS_1: formatNumber(item.issue_V_os_1),
//                 Issue_V_WP: formatNumber(item.issue_V_wp),
//                 Issue_V_RS: formatNumber(item.issue_V_rs),

//                 Issue_Packing:formatNumber((parseFloat(item.issue_m_ds) +
//                 parseFloat(item.issue_m_dp)+parseFloat(item.issue_k_dp)+
//                 parseFloat(item.issue_ds_1) +parseFloat(item.issue_ds_2)+parseFloat(item.issue_sp_2)+
//                 parseFloat(item.issue_yjh) +parseFloat(item.issue_yk)+parseFloat(item.issue_kp)+
//                 parseFloat(item.issue_wp) +parseFloat(item.issue_rs)+parseFloat(item.issue_dp_2)+
//                 parseFloat(item.issue_dp_3) +parseFloat(item.issue_dp_4)+parseFloat(item.issue_dp_3l)+
//                 parseFloat(item.issue_ss) +parseFloat(item.issue_os)+parseFloat(item.issue_os1)+
//                 parseFloat(item.issue_V_ds) +
//                 parseFloat(item.issue_V_m_ds) +
//                 parseFloat(item.issue_V_dp) +
//                 parseFloat(item.issue_V_m_dp) +
//                 parseFloat(item.issue_V_lp) +
//                 parseFloat(item.issue_V_lp_2) +
//                 parseFloat(item.issue_V_k_dp) +
//                 parseFloat(item.issue_V_ss) +
//                 parseFloat(item.issue_V_yjh) +
//                 parseFloat(item.issue_V_yk) +
//                 parseFloat(item.issue_V_sp_2) +
//                 parseFloat(item.issue_V_kp) +
//                 parseFloat(item.issue_V_dp_2) +
//                 parseFloat(item.issue_V_dp_3) +
//                 parseFloat(item.issue_V_dp_4) +
//                 parseFloat(item.issue_V_os) +
//                 parseFloat(item.issue_V_os_1) +
//                 parseFloat(item.issue_V_wp) +
//                 parseFloat(item.issue_V_rs) ).toString()),
//             Issue_Rejection: formatNumber(item.issue_rejection),
//             Issue_Village: formatNumber(item.issue_village),
//             Issue_Big_Taiho: formatNumber(item.issue_bigTaiho),
//             Issue_Mayur: formatNumber(item.issue_mayur),
      
//             Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),
           
//             No_Labour: item.noOfdayOperators,
//             No_Supervisor: item.noOfnightOperators,
//             Edit_Status: item.editStatus,
//             Created_By: item.CreatedBy,
//             Modified_By: item.modifiedBy 

//             }));
//             // setTransformedData(transformed);
//             ws = XLSX.utils.json_to_sheet(transformed);
//         }
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
//         const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
//         const blob = new Blob([wbout], { type: 'application/octet-stream' });
//         saveAs(blob, 'DPDS_Entry_' + currDate + '.xlsx');
//     }
//     }

    const exportToExcel = async () => {

        const toNum = (val: any) => Number(val) || 0;

        const response = await axios.put('/api/dpds/dpdsprimarysearch', {
            searchitem: blConNo,
            fromDate: fromdate,
            toDate: todate,
            origin: origin,
            type:
                searchType === "LOT"
                    ? "LOT"
                    : searchType === "R-LOT"
                        ? "RLOT"
                        : "VLOT",
        });

        const data1 = response.data;

        const sourceData =
            EditData.length > 0 ? EditData : data1.rcnEntries;

        const transformed = sourceData.map((item: DPDSData, idx: number) => ({

            Sl_No: idx + 1,
            Issue_Type: item.altid == 1 ? "Fresh Issue" : "Re-Issue",
            Item_Lot_No: item.LotNo,
            Origin: item.origin,
            Issue_No: item.altid,
            DPDS_Entry_Date: handletimezone(item.date),
            Mixing_Lot: item.mixingLot,

            // Opening
            Opening_DP: toNum(item.rcv_dp),
            Opening_DS: toNum(item.rcv_ds),
            Opening_DP1: toNum(item.rcv_dp1),

            // Borma
            Borma_DP: toNum(item.issue_add_4),
            Borma_DS: toNum(item.issue_add_5),
            Borma_DP1: toNum(item.issue_add_6),

            // Peeling
            Receive_Peeling:
                toNum(item.rcv_dp) +
                toNum(item.rcv_ds) +
                toNum(item.rcv_dp1),

            Borma_Peeling:
                toNum(item.issue_add_4) +
                toNum(item.issue_add_5) +
                toNum(item.issue_add_6),

            Borma_Loss_Kg: toNum(item.issue_add_2),
            Borma_Loss_Percentage: toNum(item.issue_add_3),

            // Receive
            Receive_Sorting: toNum(item.rcv_Sorting),
            Receive_BigTaiho: toNum(item.rcv_transfer),

            Receive_Total:
                toNum(item.issue_add_4) +
                toNum(item.issue_add_5) +
                toNum(item.issue_add_6) +
                toNum(item.rcv_Sorting) +
                toNum(item.rcv_transfer),

            // Issue normal
            Issue_M_DS: toNum(item.issue_m_ds),
            Issue_M_DP: toNum(item.issue_m_dp),
            Issue_K_DP: toNum(item.issue_k_dp),
            Issue_DS1: toNum(item.issue_ds_1),
            Issue_DS2: toNum(item.issue_ds_2),
            Issue_SP2: toNum(item.issue_sp_2),
            Issue_YJH: toNum(item.issue_yjh),
            Issue_YK: toNum(item.issue_yk),
            Issue_KP: toNum(item.issue_kp),
            Issue_WP: toNum(item.issue_wp),
            Issue_RS: toNum(item.issue_rs),
            Issue_DP2: toNum(item.issue_dp_2),
            Issue_DP3: toNum(item.issue_dp_3),
            Issue_DP4: toNum(item.issue_dp_4),
            Issue_3L: toNum(item.issue_dp_3l),
            Issue_SS: toNum(item.issue_ss),
            Issue_OS: toNum(item.issue_os),
            Issue_OS1: toNum(item.issue_os1),

            // Issue V
            Issue_V_DS: toNum(item.issue_V_ds),
            Issue_V_M_DS: toNum(item.issue_V_m_ds),
            Issue_V_DP: toNum(item.issue_V_dp),
            Issue_V_M_DP: toNum(item.issue_V_m_dp),
            Issue_V_LP: toNum(item.issue_V_lp),
            Issue_V_LP_2: toNum(item.issue_V_lp_2),
            Issue_V_K_DP: toNum(item.issue_V_k_dp),
            Issue_V_SS: toNum(item.issue_V_ss),
            Issue_V_YJH: toNum(item.issue_V_yjh),
            Issue_V_YK: toNum(item.issue_V_yk),
            Issue_V_SP_2: toNum(item.issue_V_sp_2),
            Issue_V_KP: toNum(item.issue_V_kp),
            Issue_V_DP_2: toNum(item.issue_V_dp_2),
            Issue_V_DP_3: toNum(item.issue_V_dp_3),
            Issue_V_DP_4: toNum(item.issue_V_dp_4),
            Issue_V_OS: toNum(item.issue_V_os),
            Issue_V_OS_1: toNum(item.issue_V_os_1),
            Issue_V_WP: toNum(item.issue_V_wp),
            Issue_V_RS: toNum(item.issue_V_rs),

            // Total Packing
            Issue_Packing:
                toNum(item.issue_m_ds) +
                toNum(item.issue_m_dp) +
                toNum(item.issue_k_dp) +
                toNum(item.issue_ds_1) +
                toNum(item.issue_ds_2) +
                toNum(item.issue_sp_2) +
                toNum(item.issue_yjh) +
                toNum(item.issue_yk) +
                toNum(item.issue_kp) +
                toNum(item.issue_wp) +
                toNum(item.issue_rs) +
                toNum(item.issue_dp_2) +
                toNum(item.issue_dp_3) +
                toNum(item.issue_dp_4) +
                toNum(item.issue_dp_3l) +
                toNum(item.issue_ss) +
                toNum(item.issue_os) +
                toNum(item.issue_os1) +
                toNum(item.issue_V_ds) +
                toNum(item.issue_V_m_ds) +
                toNum(item.issue_V_dp) +
                toNum(item.issue_V_m_dp) +
                toNum(item.issue_V_lp) +
                toNum(item.issue_V_lp_2) +
                toNum(item.issue_V_k_dp) +
                toNum(item.issue_V_ss) +
                toNum(item.issue_V_yjh) +
                toNum(item.issue_V_yk) +
                toNum(item.issue_V_sp_2) +
                toNum(item.issue_V_kp) +
                toNum(item.issue_V_dp_2) +
                toNum(item.issue_V_dp_3) +
                toNum(item.issue_V_dp_4) +
                toNum(item.issue_V_os) +
                toNum(item.issue_V_os_1) +
                toNum(item.issue_V_wp) +
                toNum(item.issue_V_rs),

            Issue_Rejection: toNum(item.issue_rejection),
            Issue_Village: toNum(item.issue_village),
            Issue_Big_Taiho: toNum(item.issue_bigTaiho),
            Issue_Mayur: toNum(item.issue_mayur),

            Current_Backlog: toNum(item.current_backlog),

            No_Labour: item.noOfdayOperators,
            No_Supervisor: item.noOfnightOperators,
            Edit_Status: item.editStatus,
            Created_By: item.CreatedBy,
            Modified_By: item.modifiedBy,
        }));

        const ws = XLSX.utils.json_to_sheet(transformed);
        const wb = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(wb, ws, "DPDS");

        const wbout = XLSX.write(wb, {
            bookType: "xlsx",
            type: "array",
        });

        const blob = new Blob([wbout], {
            type: "application/octet-stream",
        });

        saveAs(blob, `DPDS_Entry_${currDate}.xlsx`);
    };
    const handleSearch = async () => {

        setEditData([])
        setblockpagen('flex')
        if (searchType === 'LOT') {
            const response = await axios.put('/api/dpds/dpdsprimarysearch', {
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
            const response = await axios.put('/api/dpds/dpdsprimarysearch', {
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
   const response = await axios.put('/api/dpds/dpdsprimarysearch', {
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
        if (editDPDSLotWiseData.length > 0) {
            //console.log(editPendingData)
            setEditData(editDPDSLotWiseData)
            setblockpagen('none')
        }

    },[editDPDSLotWiseData])
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
 
    const handleApprove = async (item: DPDSData) => {
        const response = await axios.put(`/api/dpds/approveeditDPDS/${item.id}/${item.LotNo}/${item.origin}`)
        const data = await response.data
        if (data.message === "Edit Request of DPDS Entry is Approved Successfully") {

            if (approvesuccessdialog != null) {
                (approvesuccessdialog as any).showModal();
            }
        }
    }
    const handleRejection = async (item: DPDSData) => {
        const response = await axios.delete(`/api/dpds/rejectededitDPDS/${item.id}/${item.LotNo}/${item.origin}`)
        const data = await response.data
        console.log(data)
        if (data.message === "DPDS Entry rejected successfully") {
            //console.log('rejected enter')
            if (rejectsuccessdialog != null) {
                (rejectsuccessdialog as any).showModal();
            }
        }
    }

    const thClass = `text-center ${props.props === 'edit' ? 'bg-gray-100 text-gray-700' : ''}`;

    // const formatNumberWithSign = (number: number) => {
    //     if (number > 0) {
    //         return `+${number}`;
    //     } else {
    //         return `${number}`;
    //     }
    // };
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

                            {checkpending('DPDS') && (
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


                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Id</TableHead>

                     <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Action</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >DPDS⠀Issue⠀Type</TableHead>
                    
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Item⠀Lot⠀No</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Origin</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Issue⠀No</TableHead>
                    <TableHead className={thClass}>Edit Status</TableHead>
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >DPDS⠀Entry⠀Date</TableHead>
<TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Current⠀Backlog</TableHead>

                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Incoming⠀Mixed⠀Lot⠀&⠀Origin</TableHead>
                   
                    {/* <TableHead className="text-center" >Mixed Amount</TableHead> */}
                    <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}> DP Opening</TableHead>
                <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}> DS Opening</TableHead>
                <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}> DP1 Opening</TableHead>
                
                
                <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Peeling Opening</TableHead>
                
                <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}> Borma⠀Loss(Kg)</TableHead>
                <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}> Borma⠀Loss(%)</TableHead>
               <TableHead className={thClass}>DP (Borma)</TableHead>
<TableHead className={thClass}>DS (Borma)</TableHead>
<TableHead className={thClass}>DP1 (Borma)</TableHead>
<TableHead className={thClass}>Receive⠀Peeling (Borma)</TableHead>
<TableHead className={thClass}>Receive⠀Sorting (Borma)</TableHead>
<TableHead className={thClass}>Receive⠀BigTaiho (Borma)</TableHead>
<TableHead className={thClass}>DPDS⠀Total⠀Opening (Borma)</TableHead>

<TableHead className={thClass}>Issue M⠀DS</TableHead>
<TableHead className={thClass}>Issue M⠀DP</TableHead>
<TableHead className={thClass}>Issue K⠀DP</TableHead>
<TableHead className={thClass}>Issue DS⠀1</TableHead>
<TableHead className={thClass}>Issue DS⠀2</TableHead>
<TableHead className={thClass}>Issue SP⠀2</TableHead>
<TableHead className={thClass}>Issue YJH</TableHead>
<TableHead className={thClass}>Issue YK</TableHead>
<TableHead className={thClass}>Issue KP</TableHead>
<TableHead className={thClass}>Issue WP</TableHead>
<TableHead className={thClass}>Issue RS</TableHead>

<TableHead className={thClass}>Issue DP⠀2</TableHead>
<TableHead className={thClass}>Issue DP⠀3</TableHead>
<TableHead className={thClass}>Issue DP⠀4</TableHead>
<TableHead className={thClass}>Issue DP⠀3L</TableHead>
<TableHead className={thClass}>Issue SS</TableHead>
<TableHead className={thClass}>Issue OS</TableHead>
<TableHead className={thClass}>Issue OS1</TableHead>

<TableHead className={thClass}>Lot⠀Village Seperator</TableHead>

<TableHead className={thClass}>Issue V⠀DS</TableHead>
<TableHead className={thClass}>Issue V⠀M⠀DS</TableHead>
<TableHead className={thClass}>Issue V⠀DP</TableHead>
<TableHead className={thClass}>Issue V⠀M⠀DP</TableHead>
<TableHead className={thClass}>Issue V⠀K⠀DP</TableHead>
<TableHead className={thClass}>Issue V⠀LP</TableHead>
<TableHead className={thClass}>Issue V⠀LP2</TableHead>

<TableHead className={thClass}>Issue V⠀SS</TableHead>
<TableHead className={thClass}>Issue V⠀YJH</TableHead>
<TableHead className={thClass}>Issue V⠀YK</TableHead>
<TableHead className={thClass}>Issue V⠀SP2</TableHead>
<TableHead className={thClass}>Issue V⠀KP</TableHead>
<TableHead className={thClass}>Issue V⠀DP2</TableHead>
<TableHead className={thClass}>Issue V⠀DP3</TableHead>
<TableHead className={thClass}>Issue V⠀DP4</TableHead>
<TableHead className={thClass}>Issue V⠀OS</TableHead>
<TableHead className={thClass}>Issue V⠀OS1</TableHead>
<TableHead className={thClass}>Issue V⠀WP</TableHead>
<TableHead className={thClass}>Issue V⠀RS</TableHead>

<TableHead className={thClass}>Issue Packing</TableHead>
<TableHead className={thClass}>Issue Rejection</TableHead>
<TableHead className={thClass}>Issue Village</TableHead>
<TableHead className={thClass}>Issue Big⠀Taiho</TableHead>
<TableHead className={thClass}>Issue Mayur</TableHead>

<TableHead className={`${thClass} font-bold`}>
  DPDS Total⠀Issue(Kg)
</TableHead>

<TableHead className={thClass}>Labour</TableHead>
<TableHead className={thClass}>Supervisor</TableHead>

<TableHead className={thClass}>Created By</TableHead>
                    
                </TableHeader>
                <TableBody>


                    {EditData.length > 0 && props.props==='edit'? (EditData.map((item: DPDSData, idx) => {

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
                            <TableCell className="text-center font-bold ">{item.altid==1 ? 'Fresh Issue' : 'Re-Issue'}</TableCell>
                                    
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
                             <TableCell className="text-center ">{item.mixingLot}</TableCell>
                         
                            
                                   
                                    {/* <TableCell className="text-center ">{item.rcv_transfer ? formatNumber(item.rcv_transfer):''}</TableCell> */}
                                    <TableCell className="text-center ">{formatNumber(item.rcv_dp)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.rcv_ds)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.rcv_dp1)}</TableCell>
                                   
                                    
                                    <TableCell className="text-center font-semibold">
                                    {formatNumber((parseFloat(item.rcv_dp) +parseFloat(item.rcv_ds)+parseFloat(item.rcv_dp1)).toString())} 
                                    </TableCell>
                                   
                                    <TableCell className="text-center font-semibold  text-red-500">{formatNumber(item.issue_add_2)} Kg</TableCell>
                                    <TableCell className="text-center font-bold text-red-500 ">{formatNumber(item.issue_add_3)} %</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_add_4)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_add_5)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_add_6)}</TableCell>
                                    <TableCell className=" text-center bg-yellow-100 font-semibold">
                                    {formatNumber((parseFloat(item.issue_add_4) +parseFloat(item.issue_add_5)+parseFloat(item.issue_add_6)).toString())}
                                    </TableCell>
                                    
                                    <TableCell  className="text-center bg-yellow-100 font-semibold">{item.rcv_Sorting ? formatNumber(item.rcv_Sorting) :0}</TableCell>
                                    <TableCell  className="text-center bg-yellow-100 font-semibold ">{item.rcv_transfer ? formatNumber(item.rcv_transfer) :0}</TableCell>
                                    <TableCell className="text-center font-bold bg-green-500 text-white">
                                    {formatNumber((parseFloat(item.issue_add_4) +parseFloat(item.issue_add_5)+parseFloat(item.issue_add_6)
                                +(item.rcv_Sorting ? parseFloat(item.rcv_Sorting) :0)+(item.rcv_transfer ? parseFloat(item.rcv_transfer) :0)).toString())}
                                    </TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_m_ds)}</TableCell>       
                                    <TableCell className="text-center ">{formatNumber(item.issue_m_dp)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_k_dp)}</TableCell>
                                    <TableCell className="text-center">{formatNumber(item.issue_ds_1)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_ds_2)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_sp_2)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_yjh)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_yk)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_kp)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_wp)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_rs)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_dp_2)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_dp_3)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_dp_4)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_dp_3l)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_ss)}</TableCell>
                                    <TableCell className="text-center">{formatNumber(item.issue_os)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_os1)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-neutral-500 text-white">Lot---Vil</TableCell>
                                    <TableCell className="text-center">{formatNumber(item.issue_V_ds)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_m_ds)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_dp)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_m_dp)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_lp)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_lp_2)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_k_dp)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_ss)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_yjh)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_yk)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_sp_2)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_kp)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_dp_2)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_dp_3)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_dp_4)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_os)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_os_1)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_wp)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_rs)}</TableCell>

                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber((parseFloat(item.issue_m_ds) +
                                     parseFloat(item.issue_m_dp)+parseFloat(item.issue_k_dp)+
                                     parseFloat(item.issue_ds_1) +parseFloat(item.issue_ds_2)+parseFloat(item.issue_sp_2)+
                                     parseFloat(item.issue_yjh) +parseFloat(item.issue_yk)+parseFloat(item.issue_kp)+
                                     parseFloat(item.issue_wp) +parseFloat(item.issue_rs)+parseFloat(item.issue_dp_2)+
                                     parseFloat(item.issue_dp_3) +parseFloat(item.issue_dp_4)+parseFloat(item.issue_dp_3l)+
                                     parseFloat(item.issue_ss) +parseFloat(item.issue_os)+parseFloat(item.issue_os1)+
                                     parseFloat(item.issue_V_ds) +
                                     parseFloat(item.issue_V_m_ds) +
                                     parseFloat(item.issue_V_dp) +
                                     parseFloat(item.issue_V_m_dp) +
                                     parseFloat(item.issue_V_lp) +
                                     parseFloat(item.issue_V_lp_2) +
                                     parseFloat(item.issue_V_k_dp) +
                                     parseFloat(item.issue_V_ss) +
                                     parseFloat(item.issue_V_yjh) +
                                     parseFloat(item.issue_V_yk) +
                                     parseFloat(item.issue_V_sp_2) +
                                     parseFloat(item.issue_V_kp) +
                                     parseFloat(item.issue_V_dp_2) +
                                     parseFloat(item.issue_V_dp_3) +
                                     parseFloat(item.issue_V_dp_4) +
                                     parseFloat(item.issue_V_os) +
                                     parseFloat(item.issue_V_os_1) +
                                     parseFloat(item.issue_V_wp) +
                                     parseFloat(item.issue_V_rs)).toString())}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_rejection)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100 ">{formatNumber(item.issue_village)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100 ">{formatNumber(item.issue_bigTaiho)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100 ">{formatNumber(item.issue_mayur)}</TableCell>
                                    {/* <TableCell className="text-center font-semibold  text-blue-600">{formatNumber(item.entry_backlog)} kg</TableCell> */}
                                    <TableCell className="text-center font-bold bg-yellow-500 text-white">{formatNumber((parseFloat(item.issue_m_ds) +
                                     parseFloat(item.issue_m_dp)+parseFloat(item.issue_k_dp)+
                                     parseFloat(item.issue_ds_1) +parseFloat(item.issue_ds_2)+parseFloat(item.issue_sp_2)+
                                     parseFloat(item.issue_yjh) +parseFloat(item.issue_yk)+parseFloat(item.issue_kp)+
                                     parseFloat(item.issue_wp) +parseFloat(item.issue_rs)+parseFloat(item.issue_dp_2)+
                                     parseFloat(item.issue_dp_3) +parseFloat(item.issue_dp_4)+parseFloat(item.issue_dp_3l)+
                                     parseFloat(item.issue_rejection) +parseFloat(item.issue_village)+parseFloat(item.issue_bigTaiho)+parseFloat(item.issue_mayur)+
                                     parseFloat(item.issue_ss) +parseFloat(item.issue_os)+parseFloat(item.issue_os1)+
                                     parseFloat(item.issue_V_ds) +
                                     parseFloat(item.issue_V_m_ds) +
                                     parseFloat(item.issue_V_dp) +
                                     parseFloat(item.issue_V_m_dp) +
                                     parseFloat(item.issue_V_lp) +
                                     parseFloat(item.issue_V_lp_2) +
                                     parseFloat(item.issue_V_k_dp) +
                                     parseFloat(item.issue_V_ss) +
                                     parseFloat(item.issue_V_yjh) +
                                     parseFloat(item.issue_V_yk) +
                                     parseFloat(item.issue_V_sp_2) +
                                     parseFloat(item.issue_V_kp) +
                                     parseFloat(item.issue_V_dp_2) +
                                     parseFloat(item.issue_V_dp_3) +
                                     parseFloat(item.issue_V_dp_4) +
                                     parseFloat(item.issue_V_os) +
                                     parseFloat(item.issue_V_os_1) +
                                     parseFloat(item.issue_V_wp) +
                                     parseFloat(item.issue_V_rs)).toString())} Kg</TableCell>
                        <TableCell className="text-center">{item.noOfdayOperators}</TableCell>
                        <TableCell className="text-center">{item.noOfnightOperators}</TableCell>
                              
                                    <TableCell className="text-center">{item.CreatedBy}</TableCell>

                            
                            </TableRow>
                        ) })): (

                        Data.length > 0 ? (Data.map((item: DPDSData, idx) => {
                         
                          
                  

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
                                                                <p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>DPDS Entry Modification</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <DPDSEditForm borma={[item]} />
                                                    </DialogContent>
                                                    
                                                </Dialog>
                                                {Number(item.current_backlog) > 0 &&   <Dialog>
                                                    <DialogTrigger className="flex"><CiBoxes size={20} />
                                                        <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Re-Issue</button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-screen max-h-screen overflow-y-scroll">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>DPDS Entry Reissue</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <RCNDPDSReCreateForm borma={[item]} />
                                                    </DialogContent>
                                                    
                                                </Dialog>}
                                                {Number(item.current_backlog) > 0 &&  <Dialog>
                                                    <DialogTrigger className="flex"><CiCrop size={20} />
                                                        <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Mix</button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-screen">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                {/* <p className='text-1xl pb-1 text-center mt-1'>Mayur Entry Mixation</p> */}
                                                                <p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>Lot No : {item.LotNo} ({item.origin})</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <RCNDPDSReMix borma={item} />
                                                    </DialogContent>
                                                    
                                                </Dialog>}
                                            </PopoverContent>
                                            
                                        </Popover>
                                    </TableCell>
                                    <TableCell className="text-center font-bold ">{item.altid==1 ? 'Fresh Issue' : 'Re-Issue'}</TableCell>
                                    
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
                                    <TableCell className="text-center ">{formatNumber(item.rcv_dp)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.rcv_ds)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.rcv_dp1)}</TableCell>
                                   
                                    
                                    <TableCell className="text-center text-center  font-semibold">
                                    {formatNumber((parseFloat(item.rcv_dp) +parseFloat(item.rcv_ds)+parseFloat(item.rcv_dp1)).toString())} 
                                    </TableCell>
                                    
                                    <TableCell className="text-center font-semibold  text-red-500">{formatNumber(item.issue_add_2)} Kg</TableCell>
                                    <TableCell className="text-center font-bold text-red-500 ">{formatNumber(item.issue_add_3)} %</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_add_4)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_add_5)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_add_6)}</TableCell>
                                    <TableCell className="text-center text-center bg-yellow-100 font-semibold">
                                    {formatNumber((parseFloat(item.issue_add_4) +parseFloat(item.issue_add_5)+parseFloat(item.issue_add_6)).toString())}
                                    </TableCell>
                                    
                                    <TableCell  className="text-center bg-yellow-100 font-semibold">{item.rcv_Sorting ? formatNumber(item.rcv_Sorting) :0}</TableCell>
                                    <TableCell  className="text-center bg-yellow-100 font-semibold ">{item.rcv_transfer ? formatNumber(item.rcv_transfer) :0}</TableCell>
                                    <TableCell className="text-center font-bold bg-green-500 text-white">
                                    {formatNumber((parseFloat(item.issue_add_4) +parseFloat(item.issue_add_5)+parseFloat(item.issue_add_6)
                                +(item.rcv_Sorting ? parseFloat(item.rcv_Sorting) :0)+(item.rcv_transfer ? parseFloat(item.rcv_transfer) :0)).toString())}
                                    </TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_m_ds)}</TableCell>       
                                    <TableCell className="text-center ">{formatNumber(item.issue_m_dp)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_k_dp)}</TableCell>
                                    <TableCell className="text-center">{formatNumber(item.issue_ds_1)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_ds_2)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_sp_2)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_yjh)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_yk)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_kp)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_wp)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_rs)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_dp_2)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_dp_3)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_dp_4)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_dp_3l)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_ss)}</TableCell>
                                    <TableCell className="text-center">{formatNumber(item.issue_os)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_os1)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-neutral-500 text-white">Lot---Vil</TableCell>
                                    <TableCell className="text-center">{formatNumber(item.issue_V_ds)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_m_ds)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_dp)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_m_dp)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_lp)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_lp_2)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_k_dp)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_ss)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_yjh)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_yk)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_sp_2)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_kp)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_dp_2)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_dp_3)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_dp_4)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_os)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_os_1)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_wp)}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.issue_V_rs)}</TableCell>

                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber((parseFloat(item.issue_m_ds) +
                                     parseFloat(item.issue_m_dp)+parseFloat(item.issue_k_dp)+
                                     parseFloat(item.issue_ds_1) +parseFloat(item.issue_ds_2)+parseFloat(item.issue_sp_2)+
                                     parseFloat(item.issue_yjh) +parseFloat(item.issue_yk)+parseFloat(item.issue_kp)+
                                     parseFloat(item.issue_wp) +parseFloat(item.issue_rs)+parseFloat(item.issue_dp_2)+
                                     parseFloat(item.issue_dp_3) +parseFloat(item.issue_dp_4)+parseFloat(item.issue_dp_3l)+
                                     parseFloat(item.issue_ss) +parseFloat(item.issue_os)+parseFloat(item.issue_os1)+
                                     parseFloat(item.issue_V_ds) +
                                     parseFloat(item.issue_V_m_ds) +
                                     parseFloat(item.issue_V_dp) +
                                     parseFloat(item.issue_V_m_dp) +
                                     parseFloat(item.issue_V_lp) +
                                     parseFloat(item.issue_V_lp_2) +
                                     parseFloat(item.issue_V_k_dp) +
                                     parseFloat(item.issue_V_ss) +
                                     parseFloat(item.issue_V_yjh) +
                                     parseFloat(item.issue_V_yk) +
                                     parseFloat(item.issue_V_sp_2) +
                                     parseFloat(item.issue_V_kp) +
                                     parseFloat(item.issue_V_dp_2) +
                                     parseFloat(item.issue_V_dp_3) +
                                     parseFloat(item.issue_V_dp_4) +
                                     parseFloat(item.issue_V_os) +
                                     parseFloat(item.issue_V_os_1) +
                                     parseFloat(item.issue_V_wp) +
                                     parseFloat(item.issue_V_rs)).toString())}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_rejection)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100 ">{formatNumber(item.issue_village)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100 ">{formatNumber(item.issue_bigTaiho)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100 ">{formatNumber(item.issue_mayur)}</TableCell>
                                    {/* <TableCell className="text-center font-semibold  text-blue-600">{formatNumber(item.entry_backlog)} kg</TableCell> */}
                                    <TableCell className="text-center font-bold bg-yellow-500 text-white">{formatNumber((parseFloat(item.issue_m_ds) +
                                     parseFloat(item.issue_m_dp)+parseFloat(item.issue_k_dp)+
                                     parseFloat(item.issue_ds_1) +parseFloat(item.issue_ds_2)+parseFloat(item.issue_sp_2)+
                                     parseFloat(item.issue_yjh) +parseFloat(item.issue_yk)+parseFloat(item.issue_kp)+
                                     parseFloat(item.issue_wp) +parseFloat(item.issue_rs)+parseFloat(item.issue_dp_2)+
                                     parseFloat(item.issue_dp_3) +parseFloat(item.issue_dp_4)+parseFloat(item.issue_dp_3l)+
                                     parseFloat(item.issue_rejection) +parseFloat(item.issue_village)+parseFloat(item.issue_bigTaiho)+parseFloat(item.issue_mayur)+
                                     parseFloat(item.issue_ss) +parseFloat(item.issue_os)+parseFloat(item.issue_os1)+
                                     parseFloat(item.issue_V_ds) +
                                     parseFloat(item.issue_V_m_ds) +
                                     parseFloat(item.issue_V_dp) +
                                     parseFloat(item.issue_V_m_dp) +
                                     parseFloat(item.issue_V_lp) +
                                     parseFloat(item.issue_V_lp_2) +
                                     parseFloat(item.issue_V_k_dp) +
                                     parseFloat(item.issue_V_ss) +
                                     parseFloat(item.issue_V_yjh) +
                                     parseFloat(item.issue_V_yk) +
                                     parseFloat(item.issue_V_sp_2) +
                                     parseFloat(item.issue_V_kp) +
                                     parseFloat(item.issue_V_dp_2) +
                                     parseFloat(item.issue_V_dp_3) +
                                     parseFloat(item.issue_V_dp_4) +
                                     parseFloat(item.issue_V_os) +
                                     parseFloat(item.issue_V_os_1) +
                                     parseFloat(item.issue_V_wp) +
                                     parseFloat(item.issue_V_rs)).toString())} Kg</TableCell>
                                         
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


    </>
    )




}

export default DPDSTable;