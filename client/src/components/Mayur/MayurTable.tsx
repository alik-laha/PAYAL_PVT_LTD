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
//import RCNMayurReCreateEditForm from "./MayurReissueEdit";
//import PeelingModify from "./PeelingModify";
//import HumidifierModify from "./HumidifierModify";

const MayurTable = (props:any) => {
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
   // const [hidetodate, sethidetoDate] = useState<string>('');
    const currDate = new Date().toLocaleDateString();
    const [origin, setOrigin] = useState<string>("")
    const [blockpagen, setblockpagen] = useState('flex')
    const [EditData, setEditData] = useState<MayurData[]>([])
    const [blConNo, setBlConNo] = useState<string>("")
    const { editMayurLotWiseData } = useContext(Context);
    const [Data, setData] = useState<MayurData[]>([])

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
    const exportToExcel = async () => {

        if (searchType === 'LOT') {
            const response = await axios.put('/api/mayur/mayurprimarysearch', {
                searchitem: blConNo,
                fromDate: fromdate,
                toDate: todate,
                origin: origin,
                type: 'LOT'
            })
            const data1 = await response.data

            let ws
            let transformed: any[] = [];
            if (EditData.length > 0) {
                transformed = EditData.map((item: MayurData, idx: number) => ({
                    Sl_No: idx + 1,
                    Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Mayur_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                    Opening_Wholes_Peel_Or_WholesJB: Number(item.rcv_wholespeel)||0,
                    Opening_Wholes_Unpeel_Or_LW: Number(item.rcv_wholesunpeel)||0,
                    Receive_Peeling: Number(formatNumber(item.rcv_wholespeel)) + Number(formatNumber(item.rcv_wholesunpeel)),
                    Receive_DPDS: item.rcv_DPDS ? Number(item.rcv_DPDS) : 0,
                    Receive_Sorting: item.rcv_sorting ? Number(item.rcv_sorting) : 0,
                    Receive_Village: item.rcv_village ? Number(item.rcv_village) : 0,
                    Receive_Total: Number((parseFloat(item.rcv_wholespeel) + parseFloat(item.rcv_wholesunpeel) +
                        (item.rcv_DPDS ? parseFloat(item.rcv_DPDS) : 0) +
                        (item.rcv_sorting ? parseFloat(item.rcv_sorting) : 0) +
                        (item.rcv_village ? parseFloat(item.rcv_village) : 0)).toFixed(2))||0,
                    Issue_PW_W_Or_V_PW_W: Number(item.issue_pw_w)||0,
                    Issue_W_Lot_Or_V_W_Lot: Number(item.issue_w_lot)||0,
                    Issue_WW_Or_V_WW: Number(item.issue_ww)||0,
                    Issue_Rejection: Number(item.issue_rejection)||0,
                    Issue_Village: Number(item.issue_village)||0,
                    Issue_Big_Taiho: Number(item.issue_bigTaiho)||0,
                    Issue_LW: Number(item.issue_LW)||0,
                    Issue_JB: Number(item.issue_JB)||0,
                    Current_Backlog: Number(item.current_backlog) ||0,
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
                    Operator_Day: Number(item.noOfdayOperators)||0,
                    Operator_Night: Number(item.noOfnightOperators)||0,
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
                    Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Mayur_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                    Opening_Wholes_Peel_Or_WholesJB: Number(item.rcv_wholespeel)||0,
                    Opening_Wholes_Unpeel_Or_LW: Number(item.rcv_wholesunpeel)||0,
                    Receive_Peeling: Number(formatNumber(item.rcv_wholespeel)) + Number(formatNumber(item.rcv_wholesunpeel)),
                    Receive_DPDS: item.rcv_DPDS ? Number(item.rcv_DPDS) : 0,
                    Receive_Sorting: item.rcv_sorting ? Number(item.rcv_sorting) : 0,
                    Receive_Village: item.rcv_village ? Number(item.rcv_village) : 0,
                    Receive_Total: Number((parseFloat(item.rcv_wholespeel) + parseFloat(item.rcv_wholesunpeel) +
                        (item.rcv_DPDS ? parseFloat(item.rcv_DPDS) : 0) +
                        (item.rcv_sorting ? parseFloat(item.rcv_sorting) : 0) +
                        (item.rcv_village ? parseFloat(item.rcv_village) : 0)).toFixed(2))||0,
                    Issue_PW_W_Or_V_PW_W: Number(item.issue_pw_w)||0,
                    Issue_W_Lot_Or_V_W_Lot: Number(item.issue_w_lot)||0,
                    Issue_WW_Or_V_WW: Number(item.issue_ww)||0,
                    Issue_Rejection: Number(item.issue_rejection)||0,
                    Issue_Village: Number(item.issue_village)||0,
                    Issue_Big_Taiho: Number(item.issue_bigTaiho)||0,
                    Issue_LW: Number(item.issue_LW)||0,
                    Issue_JB: Number(item.issue_JB)||0,
                    Current_Backlog: Number(item.current_backlog) ||0,
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
                    Operator_Day: Number(item.noOfdayOperators)||0,
                    Operator_Night: Number(item.noOfnightOperators)||0,
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
        else if (searchType === 'R-LOT') {
          const response = await axios.put('/api/mayur/mayurprimarysearch', {
                searchitem: blConNo,
                fromDate: fromdate,
                toDate: todate,
                origin: origin,
                type: 'RLOT'
            })
            const data1 = await response.data

            let ws
            let transformed: any[] = [];
            if (EditData.length > 0) {
                transformed = EditData.map((item: MayurData, idx: number) => ({
                    Sl_No: idx + 1,
                    Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Mayur_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                    Opening_Wholes_Peel_Or_WholesJB: Number(item.rcv_wholespeel)||0,
                    Opening_Wholes_Unpeel_Or_LW: Number(item.rcv_wholesunpeel)||0,
                    Receive_Peeling: Number(formatNumber(item.rcv_wholespeel)) + Number(formatNumber(item.rcv_wholesunpeel)),
                    Receive_DPDS: item.rcv_DPDS ? Number(item.rcv_DPDS) : 0,
                    Receive_Sorting: item.rcv_sorting ? Number(item.rcv_sorting) : 0,
                    Receive_Village: item.rcv_village ? Number(item.rcv_village) : 0,
                    Receive_Total: Number((parseFloat(item.rcv_wholespeel) + parseFloat(item.rcv_wholesunpeel) +
                        (item.rcv_DPDS ? parseFloat(item.rcv_DPDS) : 0) +
                        (item.rcv_sorting ? parseFloat(item.rcv_sorting) : 0) +
                        (item.rcv_village ? parseFloat(item.rcv_village) : 0)).toFixed(2))||0,
                    Issue_PW_W_Or_V_PW_W: Number(item.issue_pw_w)||0,
                    Issue_W_Lot_Or_V_W_Lot: Number(item.issue_w_lot)||0,
                    Issue_WW_Or_V_WW: Number(item.issue_ww)||0,
                    Issue_Rejection: Number(item.issue_rejection)||0,
                    Issue_Village: Number(item.issue_village)||0,
                    Issue_Big_Taiho: Number(item.issue_bigTaiho)||0,
                    Issue_LW: Number(item.issue_LW)||0,
                    Issue_JB: Number(item.issue_JB)||0,
                    Current_Backlog: Number(item.current_backlog) ||0,
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
                    Operator_Day: Number(item.noOfdayOperators)||0,
                    Operator_Night: Number(item.noOfnightOperators)||0,
                    Edit_Status: item.editStatus,
                    Created_By: item.CreatedBy,
                    Modified_By: item.modifiedBy

                }));
                //setTransformedData(transformed);
                ws = XLSX.utils.json_to_sheet(transformed);
        }
        else{
            transformed = data1.rcnEntries.map((item: MayurData, idx: number) => ({
                Sl_No: idx + 1,
                    Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Mayur_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                    Opening_Wholes_Peel_Or_WholesJB: Number(item.rcv_wholespeel)||0,
                    Opening_Wholes_Unpeel_Or_LW: Number(item.rcv_wholesunpeel)||0,
                    Receive_Peeling: Number(formatNumber(item.rcv_wholespeel)) + Number(formatNumber(item.rcv_wholesunpeel)),
                    Receive_DPDS: item.rcv_DPDS ? Number(item.rcv_DPDS) : 0,
                    Receive_Sorting: item.rcv_sorting ? Number(item.rcv_sorting) : 0,
                    Receive_Village: item.rcv_village ? Number(item.rcv_village) : 0,
                    Receive_Total: Number((parseFloat(item.rcv_wholespeel) + parseFloat(item.rcv_wholesunpeel) +
                        (item.rcv_DPDS ? parseFloat(item.rcv_DPDS) : 0) +
                        (item.rcv_sorting ? parseFloat(item.rcv_sorting) : 0) +
                        (item.rcv_village ? parseFloat(item.rcv_village) : 0)).toFixed(2))||0,
                    Issue_PW_W_Or_V_PW_W: Number(item.issue_pw_w)||0,
                    Issue_W_Lot_Or_V_W_Lot: Number(item.issue_w_lot)||0,
                    Issue_WW_Or_V_WW: Number(item.issue_ww)||0,
                    Issue_Rejection: Number(item.issue_rejection)||0,
                    Issue_Village: Number(item.issue_village)||0,
                    Issue_Big_Taiho: Number(item.issue_bigTaiho)||0,
                    Issue_LW: Number(item.issue_LW)||0,
                    Issue_JB: Number(item.issue_JB)||0,
                    Current_Backlog: Number(item.current_backlog) ||0,
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
                    Operator_Day: Number(item.noOfdayOperators)||0,
                    Operator_Night: Number(item.noOfnightOperators)||0,
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
        saveAs(blob, 'Peeling_Entry_' + currDate + '.xlsx');
         }
        else {
            const response = await axios.put('/api/mayur/mayurprimarysearch', {
                searchitem: blConNo,
                fromDate: fromdate,
                toDate: todate,
                origin: origin,
                type: 'VLOT'
            })
            const data1 = await response.data

            let ws
            let transformed: any[] = [];
            if (EditData.length > 0) {
                transformed = EditData.map((item: MayurData, idx: number) => ({
                    Sl_No: idx + 1,
                    Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Mayur_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                     Opening_Wholes_Peel_Or_WholesJB: Number(item.rcv_wholespeel)||0,
                    Opening_Wholes_Unpeel_Or_LW: Number(item.rcv_wholesunpeel)||0,
                    Receive_Peeling: Number(formatNumber(item.rcv_wholespeel)) + Number(formatNumber(item.rcv_wholesunpeel)),
                    Receive_DPDS: item.rcv_DPDS ? Number(item.rcv_DPDS) : 0,
                    Receive_Sorting: item.rcv_sorting ? Number(item.rcv_sorting) : 0,
                    Receive_Village: item.rcv_village ? Number(item.rcv_village) : 0,
                    Receive_Total: Number((parseFloat(item.rcv_wholespeel) + parseFloat(item.rcv_wholesunpeel) +
                        (item.rcv_DPDS ? parseFloat(item.rcv_DPDS) : 0) +
                        (item.rcv_sorting ? parseFloat(item.rcv_sorting) : 0) +
                        (item.rcv_village ? parseFloat(item.rcv_village) : 0)).toFixed(2))||0,
                    Issue_PW_W_Or_V_PW_W: Number(item.issue_pw_w)||0,
                    Issue_W_Lot_Or_V_W_Lot: Number(item.issue_w_lot)||0,
                    Issue_WW_Or_V_WW: Number(item.issue_ww)||0,
                    Issue_Rejection: Number(item.issue_rejection)||0,
                    Issue_Village: Number(item.issue_village)||0,
                    Issue_Big_Taiho: Number(item.issue_bigTaiho)||0,
                    Issue_LW: Number(item.issue_LW)||0,
                    Issue_JB: Number(item.issue_JB)||0,
                    Current_Backlog: Number(item.current_backlog) ||0,
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
                    Operator_Day: Number(item.noOfdayOperators)||0,
                    Operator_Night: Number(item.noOfnightOperators)||0,
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
                    Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Mayur_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                     Opening_Wholes_Peel_Or_WholesJB: Number(item.rcv_wholespeel)||0,
                    Opening_Wholes_Unpeel_Or_LW: Number(item.rcv_wholesunpeel)||0,
                    Receive_Peeling: Number(formatNumber(item.rcv_wholespeel)) + Number(formatNumber(item.rcv_wholesunpeel)),
                    Receive_DPDS: item.rcv_DPDS ? Number(item.rcv_DPDS) : 0,
                    Receive_Sorting: item.rcv_sorting ? Number(item.rcv_sorting) : 0,
                    Receive_Village: item.rcv_village ? Number(item.rcv_village) : 0,
                    Receive_Total: Number((parseFloat(item.rcv_wholespeel) + parseFloat(item.rcv_wholesunpeel) +
                        (item.rcv_DPDS ? parseFloat(item.rcv_DPDS) : 0) +
                        (item.rcv_sorting ? parseFloat(item.rcv_sorting) : 0) +
                        (item.rcv_village ? parseFloat(item.rcv_village) : 0)).toFixed(2))||0,
                    Issue_PW_W_Or_V_PW_W: Number(item.issue_pw_w)||0,
                    Issue_W_Lot_Or_V_W_Lot: Number(item.issue_w_lot)||0,
                    Issue_WW_Or_V_WW: Number(item.issue_ww)||0,
                    Issue_Rejection: Number(item.issue_rejection)||0,
                    Issue_Village: Number(item.issue_village)||0,
                    Issue_Big_Taiho: Number(item.issue_bigTaiho)||0,
                    Issue_LW: Number(item.issue_LW)||0,
                    Issue_JB: Number(item.issue_JB)||0,
                    Current_Backlog: Number(item.current_backlog) ||0,
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
                    Operator_Day: Number(item.noOfdayOperators)||0,
                    Operator_Night: Number(item.noOfnightOperators)||0,
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

    }
    const handleSearch = async () => {

        setEditData([])
        setblockpagen('flex')
         if (searchType === 'LOT') {
             const response = await axios.put('/api/mayur/mayurprimarysearch', {
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
            const response = await axios.put('/api/mayur/mayurprimarysearch', {
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
            const response = await axios.put('/api/mayur/mayurprimarysearch', {
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
        if (editMayurLotWiseData.length > 0) {
            //console.log(editPendingData)
            setEditData(editMayurLotWiseData)
            if(props.props==='edit'){setblockpagen('none')}
        }

    },[editMayurLotWiseData, props.props])
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

                        {checkpending('Mayur') && (
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


                        <TableHead className="text-center" >Id</TableHead>
                        <TableHead className="text-center" >Action</TableHead>
                        <TableHead className="text-center" >Mayur_Issue_Type</TableHead>
                        
                        <TableHead className="text-center" >Item_Lot_No</TableHead>
                        <TableHead className="text-center" >Origin</TableHead>
                        <TableHead className="text-center" >Issue_No</TableHead>
                        <TableHead className="text-center" >Mayur_Entry_Date</TableHead>
 <TableHead className="text-center font-bold">Current_Backlog</TableHead>
                        <TableHead className="text-center" >Incoming_Mixed_Lot_&_Origin</TableHead>
                         
                        {/* <TableHead className="text-center" >Mixed Amount</TableHead> */}
                        <TableHead className="text-center">Wholes_Peel/ Wholes_&_JB</TableHead>
                    <TableHead className="text-center">Wholes_Unpeel/ LW</TableHead>
                    <TableHead className="text-center">Receive Peeling</TableHead>
                    <TableHead className="text-center">Receive DPDS</TableHead>
                    <TableHead className="text-center">Receive Sorting</TableHead>
                    <TableHead className="text-center">Receive Village</TableHead>
                    <TableHead className="text-center">Mayur Total_Opening</TableHead>
                    <TableHead className="text-center">PW_W / V_PW_W</TableHead>
                    <TableHead className="text-center">W_Lot / V_W_Lot</TableHead>
                    <TableHead className="text-center">WW / V_WW</TableHead>
                    <TableHead className="text-center">Issue Hamsa</TableHead>
                    <TableHead className="text-center">Issue Rejection</TableHead>
                    <TableHead className="text-center">Issue Village</TableHead>
                    
                    <TableHead className="text-center">Issue LW</TableHead>
                    <TableHead className="text-center">Issue JB</TableHead>
                    <TableHead className="text-center">Issue Big_Taiho</TableHead>
                    <TableHead className="text-center font-bold">Mayur Total_Issue(Kg)</TableHead>
                    {/* <TableHead className="text-center">Entry_Backlog</TableHead> */}
                   
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
                       
                    </TableHeader>
                    <TableBody>


                        {EditData.length > 0 && props.props==='edit'? (EditData.map((item: MayurData, idx) => {

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
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                                                          <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(item.current_backlog)}kg</TableCell>

                                        <TableCell className="text-center ">{item.mixingLot}</TableCell>
                                      
                                        {/* <TableCell className="text-center ">{item.rcv_transfer ? formatNumber(item.rcv_transfer):''}</TableCell> */}
                                        <TableCell className="text-center ">{formatNumber(item.rcv_wholespeel)}</TableCell>
                                        <TableCell className="text-center  ">{formatNumber(item.rcv_wholesunpeel)}</TableCell>
                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber((parseFloat(item.rcv_wholespeel) + parseFloat(item.rcv_wholesunpeel)).toString())}</TableCell>
                                      
                                        <TableCell  className="text-center font-semibold bg-yellow-100">{item.rcv_DPDS ? formatNumber(item.rcv_DPDS) :0}</TableCell>
                                        <TableCell className="text-center font-semibold bg-yellow-100">{item.rcv_sorting ?formatNumber(item.rcv_sorting):0}</TableCell>
                                        <TableCell className="text-center font-semibold bg-yellow-100">{item.rcv_village ?formatNumber(item.rcv_village):0}</TableCell>
                                        <TableCell className="text-center font-bold bg-green-500 text-white ">{(parseFloat(item.rcv_wholespeel) + parseFloat(item.rcv_wholesunpeel)+
                (item.rcv_DPDS ? parseFloat(item.rcv_DPDS) : 0) + 
                (item.rcv_sorting ? parseFloat(item.rcv_sorting) : 0) + 
                (item.rcv_village ? parseFloat(item.rcv_village) : 0) ).toFixed(2)} Kg</TableCell>
                                        
                                        

                                        <TableCell className="text-center ">{formatNumber(item.issue_pw_w)}</TableCell>
                                        
                                        <TableCell className="text-center ">{formatNumber(item.issue_w_lot)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww)}</TableCell>
                                        <TableCell className="text-center bg-red-100 font-semibold ">{formatNumber((parseFloat(item.issue_pw_w) + parseFloat(item.issue_w_lot)+parseFloat(item.issue_ww)).toString())}</TableCell>
                                        <TableCell className="text-center bg-red-100 font-semibold">{formatNumber(item.issue_rejection)}</TableCell>
                                        <TableCell className="text-center bg-red-100 font-semibold">{formatNumber(item.issue_village)}</TableCell>
                                        
                                        <TableCell className="text-center bg-red-100 font-semibold">{formatNumber(item.issue_LW)}</TableCell>
                                        <TableCell className="text-center bg-red-100 font-semibold">{formatNumber(item.issue_JB)}</TableCell>
                                        <TableCell className="text-center bg-red-100 font-semibold">{formatNumber(item.issue_bigTaiho)}</TableCell>
                                        <TableCell className="text-center font-bold bg-red-500 text-white ">{formatNumber((parseFloat(item.issue_pw_w) + parseFloat(item.issue_w_lot)+parseFloat(item.issue_ww)+parseFloat(item.issue_rejection) +parseFloat(item.issue_JB) +parseFloat(item.issue_bigTaiho) 
                                        + parseFloat(item.issue_village)+parseFloat(item.issue_LW)).toString())} Kg</TableCell>

                                        {/* <TableCell className="text-center font-bold text-blue-600">{formatNumber(item.entry_backlog)} kg</TableCell> */}
                                               
                                        
                                        
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

                                
                                </TableRow>
                            ) })): (

                            Data.length > 0 ? (Data.map((item: MayurData, idx) => {
                             
                              
                      

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
                                                                    <p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>Mayur Entry Modification</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            {/* {item.altid==1 ?  <RCNMayurEditForm borma={[item]} /> : <RCNMayurReCreateEditForm borma={[item]} />} */}
                                                            <RCNMayurEditForm borma={[item]} />
                                                        </DialogContent>
                                                        
                                                    </Dialog>
                                                    {Number(item.current_backlog) > 0 && <Dialog>
                                                        <DialogTrigger className="flex"><CiBoxes size={20} />
                                                            <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Re-Issue</button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-screen max-h-screen overflow-y-scroll">
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>Mayur Entry Reissue</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <RCNMayurReCreateForm borma={[item]} />
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
                                                                    <p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>Lot No : {item.LotNo} ({item.origin})</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <RCNMayurReMix borma={item} />
                                                        </DialogContent>
                                                        
                                                    </Dialog>}
                                                </PopoverContent>
                                                
                                            </Popover>
                                        </TableCell>
                                        <TableCell className="text-center font-bold ">{item.altid==1 ? 'Fresh Issue' : 'Re-Issue'}</TableCell>
                                        
                                        <TableCell className="text-center font-bold text-orange-500">{item.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                        <TableCell className="text-center font-semibold ">{item.altid}</TableCell>
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                                                          <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(item.current_backlog)} kg</TableCell>

                                        <TableCell className="text-center ">{item.mixingLot}</TableCell>
                                       
                                        {/* <TableCell className="text-center ">{item.rcv_transfer ? formatNumber(item.rcv_transfer):''}</TableCell> */}
                                        <TableCell className="text-center ">{formatNumber(item.rcv_wholespeel)}</TableCell>
                                        <TableCell className="text-center  ">{formatNumber(item.rcv_wholesunpeel)}</TableCell>
                                        <TableCell className="text-center bg-yellow-100 font-semibold">{formatNumber((parseFloat(item.rcv_wholespeel) + parseFloat(item.rcv_wholesunpeel)).toString())}</TableCell>
                                      
                                        <TableCell  className="text-center bg-yellow-100 font-semibold">{item.rcv_DPDS ? formatNumber(item.rcv_DPDS) :0}</TableCell>
                                        <TableCell className="text-center bg-yellow-100  font-semibold">{item.rcv_sorting ?formatNumber(item.rcv_sorting):0}</TableCell>
                                        <TableCell className="text-center bg-yellow-100  font-semibold">{item.rcv_village ?formatNumber(item.rcv_village):0}</TableCell>
                                      
                                        <TableCell className="text-center font-bold bg-green-500 text-white ">{formatNumber((parseFloat(item.rcv_wholespeel) + parseFloat(item.rcv_wholesunpeel)+
                (item.rcv_DPDS ? parseFloat(item.rcv_DPDS) : 0) + 
                (item.rcv_sorting ? parseFloat(item.rcv_sorting) : 0) + 
                (item.rcv_village ? parseFloat(item.rcv_village) : 0) ).toString())} Kg</TableCell>
                                        <TableCell className="text-center  ">{formatNumber(item.issue_pw_w)}</TableCell>
                                        
                                        <TableCell className="text-center  ">{formatNumber(item.issue_w_lot)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww)}</TableCell>
                                        <TableCell className="text-center font-semibold bg-red-100">{formatNumber((parseFloat(item.issue_ww) + parseFloat(item.issue_w_lot)+ parseFloat(item.issue_pw_w)).toString())}</TableCell>

                                        <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_rejection)}</TableCell>
                                        <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_village)}</TableCell>
                                       
                                        <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_LW)}</TableCell>
                                        <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_JB)}</TableCell>
                                        <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_bigTaiho)}</TableCell>
                                        <TableCell className="text-center font-bold bg-yellow-500 text-white ">{formatNumber((parseFloat(item.issue_pw_w) + parseFloat(item.issue_w_lot)+parseFloat(item.issue_ww)+parseFloat(item.issue_rejection) +parseFloat(item.issue_JB) +parseFloat(item.issue_bigTaiho) 
                                        + parseFloat(item.issue_village)+parseFloat(item.issue_LW)).toString())} Kg</TableCell>
                                        {/* <TableCell className="text-center font-semibold text-blue-600">{formatNumber(item.entry_backlog)} kg</TableCell> */}
                                               
                                        
                                        
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

export default MayurTable;