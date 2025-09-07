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


const DPDSTable = () => {
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
const response = await axios.put('/api/dpds/dpdsprimarysearch', {
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
            transformed = EditData.map((item: DPDSData, idx: number) => ({
            Sl_No: idx + 1, 
            Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
            Item_Lot_No: item.LotNo,
            Origin: item.origin,
            Issue_No: item.altid,
            DPDS_Entry_Date: handletimezone(item.date),
            Mixing_Lot: item.mixingLot,
            Opening_DP: formatNumber(item.rcv_dp),
            Opening_DS: formatNumber(item.rcv_ds),
            Opening_DP1: formatNumber(item.rcv_dp1),
            Borma_DP: formatNumber(item.issue_add_4),
            Borma_DS: formatNumber(item.issue_add_5),
            Borma_DP1: formatNumber(item.issue_add_6),
            Receive_Peeling: Number(formatNumber(item.rcv_dp)) + Number(formatNumber(item.rcv_ds))+ Number(formatNumber(item.rcv_dp1)),
            Borma_Peeling: Number(formatNumber(item.issue_add_4)) + Number(formatNumber(item.issue_add_5))+ Number(formatNumber(item.issue_add_6)),
            Borma_Loss_Kg: formatNumber(item.issue_add_2),
            Borma_Loss_Percentage: formatNumber(item.issue_add_3),
            Receive_Sorting: item.rcv_Sorting ? formatNumber(item.rcv_Sorting) : 0,
            Receive_BigTaiho: item.rcv_transfer ? formatNumber(item.rcv_transfer) : 0,
            Receive_Total:formatNumber((parseFloat(item.issue_add_4) +parseFloat(item.issue_add_5)+parseFloat(item.issue_add_6)
            +(item.rcv_Sorting ? parseFloat(item.rcv_Sorting) :0)+(item.rcv_transfer ? parseFloat(item.rcv_transfer) :0)).toString()) ,
            Issue_M_DS: formatNumber(item.issue_m_ds),
            Issue_M_DP: formatNumber(item.issue_m_dp),
            Issue_K_DP: formatNumber(item.issue_k_dp),
            Issue_DS1: formatNumber(item.issue_ds_1),
            Issue_DS2: formatNumber(item.issue_ds_2),
            Issue_SP2: formatNumber(item.issue_sp_2),
            Issue_YJH: formatNumber(item.issue_yjh),
            Issue_YK: formatNumber(item.issue_yk),
            Issue_KP: formatNumber(item.issue_kp),
            Issue_WP: formatNumber(item.issue_wp),
            Issue_RS: formatNumber(item.issue_rs),
           
            Issue_DP2: formatNumber(item.issue_dp_2),
            Issue_DP3: formatNumber(item.issue_dp_3),
            Issue_DP4: formatNumber(item.issue_dp_4),
            Issue_3L: formatNumber(item.issue_dp_3l),
           
            Issue_SS: formatNumber(item.issue_ss),
            Issue_OS: formatNumber(item.issue_os),
            Issue_OS1: formatNumber(item.issue_os1),

                Issue_V_DS: formatNumber(item.issue_V_ds),
                Issue_V_M_DS: formatNumber(item.issue_V_m_ds),
                Issue_V_DP: formatNumber(item.issue_V_dp),
                Issue_V_M_DP: formatNumber(item.issue_V_m_dp),
                Issue_V_LP: formatNumber(item.issue_V_lp),
                Issue_V_LP_2: formatNumber(item.issue_V_lp_2),
                Issue_V_K_DP: formatNumber(item.issue_V_k_dp),
                Issue_V_SS: formatNumber(item.issue_V_ss),
                Issue_V_YJH: formatNumber(item.issue_V_yjh),
                Issue_V_YK: formatNumber(item.issue_V_yk),
                Issue_V_SP_2: formatNumber(item.issue_V_sp_2),
                Issue_V_KP: formatNumber(item.issue_V_kp),
                Issue_V_DP_2: formatNumber(item.issue_V_dp_2),
                Issue_V_DP_3: formatNumber(item.issue_V_dp_3),
                Issue_V_DP_4: formatNumber(item.issue_V_dp_4),
                Issue_V_OS: formatNumber(item.issue_V_os),
                Issue_V_OS_1: formatNumber(item.issue_V_os_1),
                Issue_V_WP: formatNumber(item.issue_V_wp),
                Issue_V_RS: formatNumber(item.issue_V_rs),


            Issue_Packing:formatNumber((parseFloat(item.issue_m_ds) +
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
            parseFloat(item.issue_V_rs) ).toString()),


            Issue_Rejection: formatNumber(item.issue_rejection),
            Issue_Village: formatNumber(item.issue_village),
            Issue_Big_Taiho: formatNumber(item.issue_bigTaiho),
            Issue_Mayur: formatNumber(item.issue_mayur),
      
            Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),
           
            No_Labour: item.noOfdayOperators,
            No_Supervisor: item.noOfnightOperators,
            Edit_Status: item.editStatus,
            Created_By: item.CreatedBy,
            Modified_By: item.modifiedBy 

            }));
            //setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else {
            transformed = data1.rcnEntries.map((item: DPDSData, idx: number) => ({
                Sl_No: idx + 1, 
            Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
            Item_Lot_No: item.LotNo,
            Origin: item.origin,
            Issue_No: item.altid,
            DPDS_Entry_Date: handletimezone(item.date),
            Mixing_Lot: item.mixingLot,
            Opening_DP: formatNumber(item.rcv_dp),
            Opening_DS: formatNumber(item.rcv_ds),
            Opening_DP1: formatNumber(item.rcv_dp1),
            Borma_DP: formatNumber(item.issue_add_4),
            Borma_DS: formatNumber(item.issue_add_5),
            Borma_DP1: formatNumber(item.issue_add_6),
            Receive_Peeling: Number(formatNumber(item.rcv_dp)) + Number(formatNumber(item.rcv_ds))+ Number(formatNumber(item.rcv_dp1)),
            Borma_Peeling: Number(formatNumber(item.issue_add_4)) + Number(formatNumber(item.issue_add_5))+ Number(formatNumber(item.issue_add_6)),
            Borma_Loss_Kg: formatNumber(item.issue_add_2),
            Borma_Loss_Percentage: formatNumber(item.issue_add_3),
            Receive_Sorting: item.rcv_Sorting ? formatNumber(item.rcv_Sorting) : 0,
            Receive_BigTaiho: item.rcv_transfer ? formatNumber(item.rcv_transfer) : 0,
            Receive_Total:formatNumber((parseFloat(item.issue_add_4) +parseFloat(item.issue_add_5)+parseFloat(item.issue_add_6)
            +(item.rcv_Sorting ? parseFloat(item.rcv_Sorting) :0)+(item.rcv_transfer ? parseFloat(item.rcv_transfer) :0)).toString()) ,
            Issue_M_DS: formatNumber(item.issue_m_ds),
            Issue_M_DP: formatNumber(item.issue_m_dp),
            Issue_K_DP: formatNumber(item.issue_k_dp),
            Issue_DS1: formatNumber(item.issue_ds_1),
            Issue_DS2: formatNumber(item.issue_ds_2),
            Issue_SP2: formatNumber(item.issue_sp_2),
            Issue_YJH: formatNumber(item.issue_yjh),
            Issue_YK: formatNumber(item.issue_yk),
            Issue_KP: formatNumber(item.issue_kp),
            Issue_WP: formatNumber(item.issue_wp),
            Issue_RS: formatNumber(item.issue_rs),
           
            Issue_DP2: formatNumber(item.issue_dp_2),
            Issue_DP3: formatNumber(item.issue_dp_3),
            Issue_DP4: formatNumber(item.issue_dp_4),
            Issue_3L: formatNumber(item.issue_dp_3l),
           
            Issue_SS: formatNumber(item.issue_ss),
            Issue_OS: formatNumber(item.issue_os),
            Issue_OS1: formatNumber(item.issue_os1),

                Issue_V_DS: formatNumber(item.issue_V_ds),
                Issue_V_M_DS: formatNumber(item.issue_V_m_ds),
                Issue_V_DP: formatNumber(item.issue_V_dp),
                Issue_V_M_DP: formatNumber(item.issue_V_m_dp),
                Issue_V_LP: formatNumber(item.issue_V_lp),
                Issue_V_LP_2: formatNumber(item.issue_V_lp_2),
                Issue_V_K_DP: formatNumber(item.issue_V_k_dp),
                Issue_V_SS: formatNumber(item.issue_V_ss),
                Issue_V_YJH: formatNumber(item.issue_V_yjh),
                Issue_V_YK: formatNumber(item.issue_V_yk),
                Issue_V_SP_2: formatNumber(item.issue_V_sp_2),
                Issue_V_KP: formatNumber(item.issue_V_kp),
                Issue_V_DP_2: formatNumber(item.issue_V_dp_2),
                Issue_V_DP_3: formatNumber(item.issue_V_dp_3),
                Issue_V_DP_4: formatNumber(item.issue_V_dp_4),
                Issue_V_OS: formatNumber(item.issue_V_os),
                Issue_V_OS_1: formatNumber(item.issue_V_os_1),
                Issue_V_WP: formatNumber(item.issue_V_wp),
                Issue_V_RS: formatNumber(item.issue_V_rs),

                Issue_Packing:formatNumber((parseFloat(item.issue_m_ds) +
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
                parseFloat(item.issue_V_rs) ).toString()),
            Issue_Rejection: formatNumber(item.issue_rejection),
            Issue_Village: formatNumber(item.issue_village),
            Issue_Big_Taiho: formatNumber(item.issue_bigTaiho),
            Issue_Mayur: formatNumber(item.issue_mayur),
      
            Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),
           
            No_Labour: item.noOfdayOperators,
            No_Supervisor: item.noOfnightOperators,
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
        saveAs(blob, 'DPDS_Entry_' + currDate + '.xlsx');
        }
        else{

        
        const response = await axios.put('/api/dpds/dpdsprimarysearch', {
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
            transformed = EditData.map((item: DPDSData, idx: number) => ({
            Sl_No: idx + 1, 
            Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
            Item_Lot_No: item.LotNo,
            Origin: item.origin,
            Issue_No: item.altid,
            DPDS_Entry_Date: handletimezone(item.date),
            Mixing_Lot: item.mixingLot,
            Opening_DP: formatNumber(item.rcv_dp),
            Opening_DS: formatNumber(item.rcv_ds),
            Opening_DP1: formatNumber(item.rcv_dp1),
            Borma_DP: formatNumber(item.issue_add_4),
            Borma_DS: formatNumber(item.issue_add_5),
            Borma_DP1: formatNumber(item.issue_add_6),
            Receive_Peeling: Number(formatNumber(item.rcv_dp)) + Number(formatNumber(item.rcv_ds))+ Number(formatNumber(item.rcv_dp1)),
            Borma_Peeling: Number(formatNumber(item.issue_add_4)) + Number(formatNumber(item.issue_add_5))+ Number(formatNumber(item.issue_add_6)),
            Borma_Loss_Kg: formatNumber(item.issue_add_2),
            Borma_Loss_Percentage: formatNumber(item.issue_add_3),
            Receive_Sorting: item.rcv_Sorting ? formatNumber(item.rcv_Sorting) : 0,
            Receive_BigTaiho: item.rcv_transfer ? formatNumber(item.rcv_transfer) : 0,
            Receive_Total:formatNumber((parseFloat(item.issue_add_4) +parseFloat(item.issue_add_5)+parseFloat(item.issue_add_6)
            +(item.rcv_Sorting ? parseFloat(item.rcv_Sorting) :0)+(item.rcv_transfer ? parseFloat(item.rcv_transfer) :0)).toString()) ,
            Issue_M_DS: formatNumber(item.issue_m_ds),
            Issue_M_DP: formatNumber(item.issue_m_dp),
            Issue_K_DP: formatNumber(item.issue_k_dp),
            Issue_DS1: formatNumber(item.issue_ds_1),
            Issue_DS2: formatNumber(item.issue_ds_2),
            Issue_SP2: formatNumber(item.issue_sp_2),
            Issue_YJH: formatNumber(item.issue_yjh),
            Issue_YK: formatNumber(item.issue_yk),
            Issue_KP: formatNumber(item.issue_kp),
            Issue_WP: formatNumber(item.issue_wp),
            Issue_RS: formatNumber(item.issue_rs),
           
            Issue_DP2: formatNumber(item.issue_dp_2),
            Issue_DP3: formatNumber(item.issue_dp_3),
            Issue_DP4: formatNumber(item.issue_dp_4),
            Issue_3L: formatNumber(item.issue_dp_3l),
           
            Issue_SS: formatNumber(item.issue_ss),
            Issue_OS: formatNumber(item.issue_os),
            Issue_OS1: formatNumber(item.issue_os1),

                Issue_V_DS: formatNumber(item.issue_V_ds),
                Issue_V_M_DS: formatNumber(item.issue_V_m_ds),
                Issue_V_DP: formatNumber(item.issue_V_dp),
                Issue_V_M_DP: formatNumber(item.issue_V_m_dp),
                Issue_V_LP: formatNumber(item.issue_V_lp),
                Issue_V_LP_2: formatNumber(item.issue_V_lp_2),
                Issue_V_K_DP: formatNumber(item.issue_V_k_dp),
                Issue_V_SS: formatNumber(item.issue_V_ss),
                Issue_V_YJH: formatNumber(item.issue_V_yjh),
                Issue_V_YK: formatNumber(item.issue_V_yk),
                Issue_V_SP_2: formatNumber(item.issue_V_sp_2),
                Issue_V_KP: formatNumber(item.issue_V_kp),
                Issue_V_DP_2: formatNumber(item.issue_V_dp_2),
                Issue_V_DP_3: formatNumber(item.issue_V_dp_3),
                Issue_V_DP_4: formatNumber(item.issue_V_dp_4),
                Issue_V_OS: formatNumber(item.issue_V_os),
                Issue_V_OS_1: formatNumber(item.issue_V_os_1),
                Issue_V_WP: formatNumber(item.issue_V_wp),
                Issue_V_RS: formatNumber(item.issue_V_rs),


            Issue_Packing:formatNumber((parseFloat(item.issue_m_ds) +
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
            parseFloat(item.issue_V_rs) ).toString()),


            Issue_Rejection: formatNumber(item.issue_rejection),
            Issue_Village: formatNumber(item.issue_village),
            Issue_Big_Taiho: formatNumber(item.issue_bigTaiho),
            Issue_Mayur: formatNumber(item.issue_mayur),
      
            Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),
           
            No_Labour: item.noOfdayOperators,
            No_Supervisor: item.noOfnightOperators,
            Edit_Status: item.editStatus,
            Created_By: item.CreatedBy,
            Modified_By: item.modifiedBy 

            }));
            //setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else {
            transformed = data1.rcnEntries.map((item: DPDSData, idx: number) => ({
                Sl_No: idx + 1, 
            Issue_Type: item.altid==1 ? 'Fresh Issue' : 'Re-Issue',
            Item_Lot_No: item.LotNo,
            Origin: item.origin,
            Issue_No: item.altid,
            DPDS_Entry_Date: handletimezone(item.date),
            Mixing_Lot: item.mixingLot,
            Opening_DP: formatNumber(item.rcv_dp),
            Opening_DS: formatNumber(item.rcv_ds),
            Opening_DP1: formatNumber(item.rcv_dp1),
            Borma_DP: formatNumber(item.issue_add_4),
            Borma_DS: formatNumber(item.issue_add_5),
            Borma_DP1: formatNumber(item.issue_add_6),
            Receive_Peeling: Number(formatNumber(item.rcv_dp)) + Number(formatNumber(item.rcv_ds))+ Number(formatNumber(item.rcv_dp1)),
            Borma_Peeling: Number(formatNumber(item.issue_add_4)) + Number(formatNumber(item.issue_add_5))+ Number(formatNumber(item.issue_add_6)),
            Borma_Loss_Kg: formatNumber(item.issue_add_2),
            Borma_Loss_Percentage: formatNumber(item.issue_add_3),
            Receive_Sorting: item.rcv_Sorting ? formatNumber(item.rcv_Sorting) : 0,
            Receive_BigTaiho: item.rcv_transfer ? formatNumber(item.rcv_transfer) : 0,
            Receive_Total:formatNumber((parseFloat(item.issue_add_4) +parseFloat(item.issue_add_5)+parseFloat(item.issue_add_6)
            +(item.rcv_Sorting ? parseFloat(item.rcv_Sorting) :0)+(item.rcv_transfer ? parseFloat(item.rcv_transfer) :0)).toString()) ,
            Issue_M_DS: formatNumber(item.issue_m_ds),
            Issue_M_DP: formatNumber(item.issue_m_dp),
            Issue_K_DP: formatNumber(item.issue_k_dp),
            Issue_DS1: formatNumber(item.issue_ds_1),
            Issue_DS2: formatNumber(item.issue_ds_2),
            Issue_SP2: formatNumber(item.issue_sp_2),
            Issue_YJH: formatNumber(item.issue_yjh),
            Issue_YK: formatNumber(item.issue_yk),
            Issue_KP: formatNumber(item.issue_kp),
            Issue_WP: formatNumber(item.issue_wp),
            Issue_RS: formatNumber(item.issue_rs),
           
            Issue_DP2: formatNumber(item.issue_dp_2),
            Issue_DP3: formatNumber(item.issue_dp_3),
            Issue_DP4: formatNumber(item.issue_dp_4),
            Issue_3L: formatNumber(item.issue_dp_3l),
           
            Issue_SS: formatNumber(item.issue_ss),
            Issue_OS: formatNumber(item.issue_os),
            Issue_OS1: formatNumber(item.issue_os1),

                Issue_V_DS: formatNumber(item.issue_V_ds),
                Issue_V_M_DS: formatNumber(item.issue_V_m_ds),
                Issue_V_DP: formatNumber(item.issue_V_dp),
                Issue_V_M_DP: formatNumber(item.issue_V_m_dp),
                Issue_V_LP: formatNumber(item.issue_V_lp),
                Issue_V_LP_2: formatNumber(item.issue_V_lp_2),
                Issue_V_K_DP: formatNumber(item.issue_V_k_dp),
                Issue_V_SS: formatNumber(item.issue_V_ss),
                Issue_V_YJH: formatNumber(item.issue_V_yjh),
                Issue_V_YK: formatNumber(item.issue_V_yk),
                Issue_V_SP_2: formatNumber(item.issue_V_sp_2),
                Issue_V_KP: formatNumber(item.issue_V_kp),
                Issue_V_DP_2: formatNumber(item.issue_V_dp_2),
                Issue_V_DP_3: formatNumber(item.issue_V_dp_3),
                Issue_V_DP_4: formatNumber(item.issue_V_dp_4),
                Issue_V_OS: formatNumber(item.issue_V_os),
                Issue_V_OS_1: formatNumber(item.issue_V_os_1),
                Issue_V_WP: formatNumber(item.issue_V_wp),
                Issue_V_RS: formatNumber(item.issue_V_rs),

                Issue_Packing:formatNumber((parseFloat(item.issue_m_ds) +
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
                parseFloat(item.issue_V_rs) ).toString()),
            Issue_Rejection: formatNumber(item.issue_rejection),
            Issue_Village: formatNumber(item.issue_village),
            Issue_Big_Taiho: formatNumber(item.issue_bigTaiho),
            Issue_Mayur: formatNumber(item.issue_mayur),
      
            Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),
           
            No_Labour: item.noOfdayOperators,
            No_Supervisor: item.noOfnightOperators,
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
        saveAs(blob, 'DPDS_Entry_' + currDate + '.xlsx');
    }
    }
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
                    // value={hidetodate}
                    // onChange={handleTodate}
                     value={todate}
                    onChange={(e) => settoDate(e.target.value)}
                    placeholder="To Date"

                />

               


                <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>

            </div>
            {checkpending('DPDS') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}
            <Table className="mt-4">
                <TableHeader className="bg-neutral-200 text-stone-950 ">


                    <TableHead className="text-center" >Id</TableHead>
                    <TableHead className="text-center" >Issue_Type</TableHead>
                    
                    <TableHead className="text-center" >Item_Lot_No</TableHead>
                    <TableHead className="text-center" >Origin</TableHead>
                    <TableHead className="text-center" >Issue_No</TableHead>
                    <TableHead className="text-center" >DPDS_Entry_Date</TableHead>
<TableHead className="text-center font-bold">Current_Backlog</TableHead>

                    <TableHead className="text-center" >Incoming_Mixed_Lot_&_Origin</TableHead>
                    <TableHead className="text-center" >Action</TableHead>
                    {/* <TableHead className="text-center" >Mixed Amount</TableHead> */}
                    <TableHead className="text-center"> DP Opening</TableHead>
                <TableHead className="text-center"> DS Opening</TableHead>
                <TableHead className="text-center"> DP1 Opening</TableHead>
                
                
                <TableHead className="text-center">Peeling Opening</TableHead>
                
                <TableHead className="text-center"> Borma_Loss(Kg)</TableHead>
                <TableHead className="text-center"> Borma_Loss(%)</TableHead>
                <TableHead className="text-center"> DP (Borma)</TableHead>
                <TableHead className="text-center"> DS (Borma)</TableHead>
                <TableHead className="text-center"> DP1 (Borma)</TableHead>
                <TableHead className="text-center">Receive_Peeling (Borma)</TableHead>
                <TableHead className="text-center">Receive_Sorting (Borma)</TableHead>
                <TableHead className="text-center">Receive_BigTaiho (Borma)</TableHead>
                <TableHead className="text-center">DPDS_Total_Opening (Borma)</TableHead>
                <TableHead className="text-center">Issue M_DS</TableHead>
                <TableHead className="text-center">Issue M_DP</TableHead>
                <TableHead className="text-center">Issue K_DP</TableHead>
                <TableHead className="text-center">Issue DS_1</TableHead>
                <TableHead className="text-center">Issue DS_2</TableHead>
                <TableHead className="text-center">Issue SP_2</TableHead>
                <TableHead className="text-center">Issue YJH</TableHead>
                <TableHead className="text-center">Issue YK</TableHead>
                <TableHead className="text-center">Issue KP</TableHead>
                <TableHead className="text-center">Issue WP</TableHead>
                <TableHead className="text-center">Issue RS</TableHead>
                <TableHead className="text-center">Issue DP_2</TableHead>
                <TableHead className="text-center">Issue DP_3</TableHead>
                <TableHead className="text-center">Issue DP_4</TableHead>
                <TableHead className="text-center">Issue DP_3L</TableHead>
                <TableHead className="text-center">Issue SS</TableHead>
                <TableHead className="text-center">Issue OS</TableHead>
                <TableHead className="text-center">Issue OS1</TableHead>
                <TableHead className="text-center">Lot_Village Seperator</TableHead>
                 <TableHead className="text-center">Issue V_DS</TableHead>
                        <TableHead className="text-center">Issue V_M_DS</TableHead>
                        <TableHead className="text-center">Issue V_DP</TableHead>
                        <TableHead className="text-center">Issue V_M_DP</TableHead>
                        <TableHead className="text-center">Issue V_K_DP</TableHead>
                        <TableHead className="text-center">Issue V_LP</TableHead>
                        <TableHead className="text-center">Issue V_LP2</TableHead>

                        <TableHead className="text-center">Issue V_SS</TableHead>
                        <TableHead className="text-center">Issue V_YJH</TableHead>
                        <TableHead className="text-center">Issue V_YK</TableHead>
                        <TableHead className="text-center">Issue V_SP2</TableHead>
                        <TableHead className="text-center">Issue V_KP</TableHead>
                        <TableHead className="text-center">Issue V_DP2</TableHead>
                        <TableHead className="text-center">Issue V_DP3</TableHead>
                        <TableHead className="text-center">Issue V_DP4</TableHead>
                        <TableHead className="text-center">Issue V_OS</TableHead>
                        <TableHead className="text-center">Issue V_OS1</TableHead>
                        <TableHead className="text-center">Issue V_WP</TableHead>
                        <TableHead className="text-center">Issue V_RS</TableHead>
                <TableHead className="text-center">Issue Packing</TableHead>
                <TableHead className="text-center">Issue Rejection</TableHead>
                <TableHead className="text-center">Issue Village</TableHead>
                <TableHead className="text-center">Issue Big_Taiho</TableHead>
                <TableHead className="text-center">Issue Mayur</TableHead>
                <TableHead className="text-center font-bold">DPDS Total_Issue(Kg)</TableHead>
                {/* <TableHead className="text-center">Entry_Backlog</TableHead> */}
                
             
           
                <TableHead className="text-center">Labour</TableHead>
                <TableHead className="text-center">Supervisor</TableHead>
               
                    <TableHead className="text-center" >Edit Status </TableHead>
                    <TableHead className="text-center" >Created By </TableHead>
                    
                </TableHeader>
                <TableBody>


                    {EditData.length > 0 ? (EditData.map((item: DPDSData, idx) => {

                        return (
                            <TableRow key={item.id}>
                                <TableCell className="text-center">{idx + 1}</TableCell>
                            <TableCell className="text-center font-bold ">{item.altid==1 ? 'Fresh Issue' : 'Re-Issue'}</TableCell>
                                    
                            <TableCell className="text-center font-bold text-orange-500">{item.LotNo}</TableCell>
                                    <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                    <TableCell className="text-center font-semibold ">{item.altid}</TableCell>
                                    <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(item.current_backlog)}kg</TableCell>
                             <TableCell className="text-center ">{item.mixingLot}</TableCell>
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
                                    <TableCell className="text-center ">{formatNumber(item.rcv_dp)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.rcv_ds)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.rcv_dp1)}</TableCell>
                                   
                                    
                                    <TableCell className="text-center text-center font-semibold">
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
                                    <TableCell className="text-center">{item.editStatus}</TableCell>
                                    <TableCell className="text-center">{item.CreatedBy}</TableCell>

                            
                            </TableRow>
                        ) })): (

                        Data.length > 0 ? (Data.map((item: DPDSData, idx) => {
                         
                          
                  

                            return (
                                <TableRow key={item.id} className={`${item.latest==1 ? '' : 'opacity-50 hover:bg-gray-200 bg-gray-200'}`}>
                                    
                                    
                                    <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                    <TableCell className="text-center font-bold ">{item.altid==1 ? 'Fresh Issue' : 'Re-Issue'}</TableCell>
                                    
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
                                                                <p className='text-1xl pb-1 text-center mt-1'>DPDS Entry Modification</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <DPDSEditForm borma={[item]} />
                                                    </DialogContent>
                                                    
                                                </Dialog>
                                                {Number(item.current_backlog) > 0 &&   <Dialog>
                                                    <DialogTrigger className="flex"><CiBoxes size={20} />
                                                        <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Re-Issue</button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-screen">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <p className='text-1xl pb-1 text-center mt-1'>DPDS Entry Reissue</p>
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
                                                                <p className='text-1xl pb-1 text-center mt-3'>Lot No : {item.LotNo} ({item.origin})</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <RCNDPDSReMix borma={item} />
                                                    </DialogContent>
                                                    
                                                </Dialog>}
                                            </PopoverContent>
                                            
                                        </Popover>
                                    </TableCell>
                                    
                                   
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

export default DPDSTable;