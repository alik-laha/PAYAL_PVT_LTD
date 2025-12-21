import { useContext, useEffect, useState } from "react";
import { Origin, pagelimit, pageNo, pendingCheckRole } from "../common/exportData";
import Context from "../context/context";
import axios from "axios";
import {  pendingCheckRoles, PermissionRole, HamsaData } from "@/type/type";
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
import RCNHamsaReMix from "./HamsaMix";
import HamsaReCreateForm from "./HamsaRecreateForm";
import HamsaEditForm from "./HamsaEditForm";




const HamsaTable = (props:any) => {
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
   // const [hidetodate, sethidetoDate] = useState<string>('');
    const currDate = new Date().toLocaleDateString();
    const [origin, setOrigin] = useState<string>("")
    const [blockpagen, setblockpagen] = useState('flex')
    const [EditData, setEditData] = useState<HamsaData[]>([])
    const [blConNo, setBlConNo] = useState<string>("")
    const { editHamsaLotWiseData } = useContext(Context);
    const [Data, setData] = useState<HamsaData[]>([])

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
            const response = await axios.put('/api/hamsa/hamsaprimarysearch', {
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
                transformed = EditData.map((item: HamsaData, idx: number) => ({
                    Sl_No: idx + 1,
                    Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Hamsa_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                    Receive_PW_W: Number(item.rcv_pw_w) ||0,
                    Receive_W_LOT: Number(item.rcv_w_lot) ||0,
                    Receive_WW: Number(item.rcv_ww) ||0,
                    Receive_Village: item.rcv_village ? Number(item.rcv_village) : 0 ,
                    Receive_LW: item.rcv_lw ? Number(item.rcv_lw) : 0,
                    Receive_Total: Number((parseFloat(item.rcv_pw_w) +
                        parseFloat(item.rcv_w_lot) + parseFloat(item.rcv_ww) +
                        (item.rcv_village ? parseFloat(item.rcv_village) : 0) +
                        (item.rcv_lw ? parseFloat(item.rcv_lw) : 0)).toFixed(2))||0,
                    issue_pw_210: Number(item.issue_pw_210)||0,
                    issue_w_210: Number(item.issue_w_210)||0,
                    issue_ww_210: Number(item.issue_ww_210)||0,
                    issue_pw_240: Number(item.issue_pw_240)||0,
                    issue_w_240: Number(item.issue_w_240)||0,
                    issue_ww_240: Number(item.issue_ww_240)||0,
                    issue_pw_280: Number(item.issue_pw_280)||0,
                    issue_w_280: Number(item.issue_w_280)||0,
                    issue_ww_280: Number(item.issue_ww_280)||0,
                    issue_pw_320: Number(item.issue_pw_320)||0,
                    issue_w_320: Number(item.issue_w_320)||0,
                    issue_ww_320: Number(item.issue_ww_320)||0,
                    issue_pw_360: Number(item.issue_add_1)||0,
                    issue_w_360: Number(item.issue_add_2)||0,
                    issue_ww_360: Number(item.issue_add_3)||0,
                    issue_pw_400: Number(item.issue_pw_400)||0,
                    issue_w_400: Number(item.issue_w_400)||0,
                    issue_ww_400: Number(item.issue_ww_400)||0,
                    Issue_Wholes: Number(formatNumber((parseFloat(item.issue_pw_210) +
                        parseFloat(item.issue_w_210) + parseFloat(item.issue_ww_210) +
                        parseFloat(item.issue_pw_240) + parseFloat(item.issue_w_240) + parseFloat(item.issue_ww_240) +
                        parseFloat(item.issue_pw_280) + parseFloat(item.issue_w_280) + parseFloat(item.issue_ww_280) +
                        parseFloat(item.issue_pw_320) + parseFloat(item.issue_w_320) + parseFloat(item.issue_ww_320) +
                        parseFloat(item.issue_add_1) + parseFloat(item.issue_add_2) + parseFloat(item.issue_add_3) +
                        parseFloat(item.issue_pw_400) + parseFloat(item.issue_w_400) + parseFloat(item.issue_ww_400)).toString()))||0,
                    Issue_JB: Number(item.issue_jb)||0,
                    Issue_BigTaiho: Number(item.issue_bigTaiho)||0,
                    Issue_LW: Number(item.issue_lw)||0,

                    Current_Backlog: Number(item.current_backlog) ||0,
                    Mc_On_Hamsa_1: handleAMPM(item.Mc_on_1.slice(0, 5)),
                    Mc_Off_Hamsa_1: handleAMPM(item.Mc_off_1.slice(0, 5)),
                    Mc_Breakdown_Hamsa_1: item.Mc_breakdown_1.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_1: item.otherTime_1.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_2: handleAMPM(item.Mc_on_2.slice(0, 5)),
                    Mc_Off_Hamsa_2: handleAMPM(item.Mc_off_2.slice(0, 5)),
                    Mc_Breakdown_Hamsa_2: item.Mc_breakdown_2.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_2: item.otherTime_2.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_3: handleAMPM(item.Mc_on_3.slice(0, 5)),
                    Mc_Off_Hamsa_3: handleAMPM(item.Mc_off_3.slice(0, 5)),
                    Mc_Breakdown_Hamsa_3: item.Mc_breakdown_3.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_3: item.otherTime_3.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_4: handleAMPM(item.Mc_on_4.slice(0, 5)),
                    Mc_Off_Hamsa_4: handleAMPM(item.Mc_off_4.slice(0, 5)),
                    Mc_Breakdown_Hamsa_4: item.Mc_breakdown_4.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_4: item.otherTime_4.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_5: handleAMPM(item.Mc_on_5.slice(0, 5)),
                    Mc_Off_Hamsa_5: handleAMPM(item.Mc_off_5.slice(0, 5)),
                    Mc_Breakdown_Hamsa_5: item.Mc_breakdown_5.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_5: item.otherTime_5.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Spectrum: handleAMPM(item.Mc_on_6.slice(0, 5)),
                    Mc_Off_Spectrum: handleAMPM(item.Mc_off_6.slice(0, 5)),
                    Mc_Breakdown_Spectrum: item.Mc_breakdown_6.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Spectrum: item.otherTime_6.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Runtime_Hamsa_1: item.Mc_runTime_1.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_2: item.Mc_runTime_2.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_3: item.Mc_runTime_3.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_4: item.Mc_runTime_4.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_5: item.Mc_runTime_5.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Spectrum: item.Mc_runTime_6.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
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
                transformed = data1.rcnEntries.map((item: HamsaData, idx: number) => ({
                    Sl_No: idx + 1,
                    Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Hamsa_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                    Receive_PW_W: Number(item.rcv_pw_w) ||0,
                    Receive_W_LOT: Number(item.rcv_w_lot) ||0,
                    Receive_WW: Number(item.rcv_ww) ||0,
                    Receive_Village: item.rcv_village ? Number(item.rcv_village) : 0 ,
                    Receive_LW: item.rcv_lw ? Number(item.rcv_lw) : 0,
                    Receive_Total: Number((parseFloat(item.rcv_pw_w) +
                        parseFloat(item.rcv_w_lot) + parseFloat(item.rcv_ww) +
                        (item.rcv_village ? parseFloat(item.rcv_village) : 0) +
                        (item.rcv_lw ? parseFloat(item.rcv_lw) : 0)).toFixed(2))||0,
                    issue_pw_210: Number(item.issue_pw_210)||0,
                    issue_w_210: Number(item.issue_w_210)||0,
                    issue_ww_210: Number(item.issue_ww_210)||0,
                    issue_pw_240: Number(item.issue_pw_240)||0,
                    issue_w_240: Number(item.issue_w_240)||0,
                    issue_ww_240: Number(item.issue_ww_240)||0,
                    issue_pw_280: Number(item.issue_pw_280)||0,
                    issue_w_280: Number(item.issue_w_280)||0,
                    issue_ww_280: Number(item.issue_ww_280)||0,
                    issue_pw_320: Number(item.issue_pw_320)||0,
                    issue_w_320: Number(item.issue_w_320)||0,
                    issue_ww_320: Number(item.issue_ww_320)||0,
                    issue_pw_360: Number(item.issue_add_1)||0,
                    issue_w_360: Number(item.issue_add_2)||0,
                    issue_ww_360: Number(item.issue_add_3)||0,
                    issue_pw_400: Number(item.issue_pw_400)||0,
                    issue_w_400: Number(item.issue_w_400)||0,
                    issue_ww_400: Number(item.issue_ww_400)||0,
                    Issue_Wholes: Number(formatNumber((parseFloat(item.issue_pw_210) +
                        parseFloat(item.issue_w_210) + parseFloat(item.issue_ww_210) +
                        parseFloat(item.issue_pw_240) + parseFloat(item.issue_w_240) + parseFloat(item.issue_ww_240) +
                        parseFloat(item.issue_pw_280) + parseFloat(item.issue_w_280) + parseFloat(item.issue_ww_280) +
                        parseFloat(item.issue_pw_320) + parseFloat(item.issue_w_320) + parseFloat(item.issue_ww_320) +
                        parseFloat(item.issue_add_1) + parseFloat(item.issue_add_2) + parseFloat(item.issue_add_3) +
                        parseFloat(item.issue_pw_400) + parseFloat(item.issue_w_400) + parseFloat(item.issue_ww_400)).toString()))||0,
                    Issue_JB: Number(item.issue_jb)||0,
                    Issue_BigTaiho: Number(item.issue_bigTaiho)||0,
                    Issue_LW: Number(item.issue_lw)||0,

                    Current_Backlog: Number(item.current_backlog) ||0,
                    Mc_On_Hamsa_1: handleAMPM(item.Mc_on_1.slice(0, 5)),
                    Mc_Off_Hamsa_1: handleAMPM(item.Mc_off_1.slice(0, 5)),
                    Mc_Breakdown_Hamsa_1: item.Mc_breakdown_1.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_1: item.otherTime_1.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_2: handleAMPM(item.Mc_on_2.slice(0, 5)),
                    Mc_Off_Hamsa_2: handleAMPM(item.Mc_off_2.slice(0, 5)),
                    Mc_Breakdown_Hamsa_2: item.Mc_breakdown_2.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_2: item.otherTime_2.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_3: handleAMPM(item.Mc_on_3.slice(0, 5)),
                    Mc_Off_Hamsa_3: handleAMPM(item.Mc_off_3.slice(0, 5)),
                    Mc_Breakdown_Hamsa_3: item.Mc_breakdown_3.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_3: item.otherTime_3.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_4: handleAMPM(item.Mc_on_4.slice(0, 5)),
                    Mc_Off_Hamsa_4: handleAMPM(item.Mc_off_4.slice(0, 5)),
                    Mc_Breakdown_Hamsa_4: item.Mc_breakdown_4.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_4: item.otherTime_4.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_5: handleAMPM(item.Mc_on_5.slice(0, 5)),
                    Mc_Off_Hamsa_5: handleAMPM(item.Mc_off_5.slice(0, 5)),
                    Mc_Breakdown_Hamsa_5: item.Mc_breakdown_5.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_5: item.otherTime_5.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Spectrum: handleAMPM(item.Mc_on_6.slice(0, 5)),
                    Mc_Off_Spectrum: handleAMPM(item.Mc_off_6.slice(0, 5)),
                    Mc_Breakdown_Spectrum: item.Mc_breakdown_6.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Spectrum: item.otherTime_6.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Runtime_Hamsa_1: item.Mc_runTime_1.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_2: item.Mc_runTime_2.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_3: item.Mc_runTime_3.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_4: item.Mc_runTime_4.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_5: item.Mc_runTime_5.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Spectrum: item.Mc_runTime_6.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
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
            saveAs(blob, 'Hamsa_Entry_' + currDate + '.xlsx');

        }
        else if (searchType === 'R-LOT') {
            const response = await axios.put('/api/hamsa/hamsaprimarysearch', {
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
                transformed = EditData.map((item: HamsaData, idx: number) => ({
                    Sl_No: idx + 1,
                    Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Hamsa_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                    Receive_PW_W: Number(item.rcv_pw_w) ||0,
                    Receive_W_LOT: Number(item.rcv_w_lot) ||0,
                    Receive_WW: Number(item.rcv_ww) ||0,
                    Receive_Village: item.rcv_village ? Number(item.rcv_village) : 0 ,
                    Receive_LW: item.rcv_lw ? Number(item.rcv_lw) : 0,
                    Receive_Total: Number((parseFloat(item.rcv_pw_w) +
                        parseFloat(item.rcv_w_lot) + parseFloat(item.rcv_ww) +
                        (item.rcv_village ? parseFloat(item.rcv_village) : 0) +
                        (item.rcv_lw ? parseFloat(item.rcv_lw) : 0)).toFixed(2))||0,
                    issue_pw_210: Number(item.issue_pw_210)||0,
                    issue_w_210: Number(item.issue_w_210)||0,
                    issue_ww_210: Number(item.issue_ww_210)||0,
                    issue_pw_240: Number(item.issue_pw_240)||0,
                    issue_w_240: Number(item.issue_w_240)||0,
                    issue_ww_240: Number(item.issue_ww_240)||0,
                    issue_pw_280: Number(item.issue_pw_280)||0,
                    issue_w_280: Number(item.issue_w_280)||0,
                    issue_ww_280: Number(item.issue_ww_280)||0,
                    issue_pw_320: Number(item.issue_pw_320)||0,
                    issue_w_320: Number(item.issue_w_320)||0,
                    issue_ww_320: Number(item.issue_ww_320)||0,
                    issue_pw_360: Number(item.issue_add_1)||0,
                    issue_w_360: Number(item.issue_add_2)||0,
                    issue_ww_360: Number(item.issue_add_3)||0,
                    issue_pw_400: Number(item.issue_pw_400)||0,
                    issue_w_400: Number(item.issue_w_400)||0,
                    issue_ww_400: Number(item.issue_ww_400)||0,
                    Issue_Wholes: Number(formatNumber((parseFloat(item.issue_pw_210) +
                        parseFloat(item.issue_w_210) + parseFloat(item.issue_ww_210) +
                        parseFloat(item.issue_pw_240) + parseFloat(item.issue_w_240) + parseFloat(item.issue_ww_240) +
                        parseFloat(item.issue_pw_280) + parseFloat(item.issue_w_280) + parseFloat(item.issue_ww_280) +
                        parseFloat(item.issue_pw_320) + parseFloat(item.issue_w_320) + parseFloat(item.issue_ww_320) +
                        parseFloat(item.issue_add_1) + parseFloat(item.issue_add_2) + parseFloat(item.issue_add_3) +
                        parseFloat(item.issue_pw_400) + parseFloat(item.issue_w_400) + parseFloat(item.issue_ww_400)).toString()))||0,
                    Issue_JB: Number(item.issue_jb)||0,
                    Issue_BigTaiho: Number(item.issue_bigTaiho)||0,
                    Issue_LW: Number(item.issue_lw)||0,

                    Current_Backlog: Number(item.current_backlog) ||0,
                    Mc_On_Hamsa_1: handleAMPM(item.Mc_on_1.slice(0, 5)),
                    Mc_Off_Hamsa_1: handleAMPM(item.Mc_off_1.slice(0, 5)),
                    Mc_Breakdown_Hamsa_1: item.Mc_breakdown_1.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_1: item.otherTime_1.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_2: handleAMPM(item.Mc_on_2.slice(0, 5)),
                    Mc_Off_Hamsa_2: handleAMPM(item.Mc_off_2.slice(0, 5)),
                    Mc_Breakdown_Hamsa_2: item.Mc_breakdown_2.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_2: item.otherTime_2.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_3: handleAMPM(item.Mc_on_3.slice(0, 5)),
                    Mc_Off_Hamsa_3: handleAMPM(item.Mc_off_3.slice(0, 5)),
                    Mc_Breakdown_Hamsa_3: item.Mc_breakdown_3.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_3: item.otherTime_3.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_4: handleAMPM(item.Mc_on_4.slice(0, 5)),
                    Mc_Off_Hamsa_4: handleAMPM(item.Mc_off_4.slice(0, 5)),
                    Mc_Breakdown_Hamsa_4: item.Mc_breakdown_4.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_4: item.otherTime_4.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_5: handleAMPM(item.Mc_on_5.slice(0, 5)),
                    Mc_Off_Hamsa_5: handleAMPM(item.Mc_off_5.slice(0, 5)),
                    Mc_Breakdown_Hamsa_5: item.Mc_breakdown_5.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_5: item.otherTime_5.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Spectrum: handleAMPM(item.Mc_on_6.slice(0, 5)),
                    Mc_Off_Spectrum: handleAMPM(item.Mc_off_6.slice(0, 5)),
                    Mc_Breakdown_Spectrum: item.Mc_breakdown_6.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Spectrum: item.otherTime_6.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Runtime_Hamsa_1: item.Mc_runTime_1.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_2: item.Mc_runTime_2.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_3: item.Mc_runTime_3.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_4: item.Mc_runTime_4.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_5: item.Mc_runTime_5.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Spectrum: item.Mc_runTime_6.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
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
                transformed = data1.rcnEntries.map((item: HamsaData, idx: number) => ({
                    Sl_No: idx + 1,
                    Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Hamsa_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                    Receive_PW_W: Number(item.rcv_pw_w) ||0,
                    Receive_W_LOT: Number(item.rcv_w_lot) ||0,
                    Receive_WW: Number(item.rcv_ww) ||0,
                    Receive_Village: item.rcv_village ? Number(item.rcv_village) : 0 ,
                    Receive_LW: item.rcv_lw ? Number(item.rcv_lw) : 0,
                    Receive_Total: Number((parseFloat(item.rcv_pw_w) +
                        parseFloat(item.rcv_w_lot) + parseFloat(item.rcv_ww) +
                        (item.rcv_village ? parseFloat(item.rcv_village) : 0) +
                        (item.rcv_lw ? parseFloat(item.rcv_lw) : 0)).toFixed(2))||0,
                    issue_pw_210: Number(item.issue_pw_210)||0,
                    issue_w_210: Number(item.issue_w_210)||0,
                    issue_ww_210: Number(item.issue_ww_210)||0,
                    issue_pw_240: Number(item.issue_pw_240)||0,
                    issue_w_240: Number(item.issue_w_240)||0,
                    issue_ww_240: Number(item.issue_ww_240)||0,
                    issue_pw_280: Number(item.issue_pw_280)||0,
                    issue_w_280: Number(item.issue_w_280)||0,
                    issue_ww_280: Number(item.issue_ww_280)||0,
                    issue_pw_320: Number(item.issue_pw_320)||0,
                    issue_w_320: Number(item.issue_w_320)||0,
                    issue_ww_320: Number(item.issue_ww_320)||0,
                    issue_pw_360: Number(item.issue_add_1)||0,
                    issue_w_360: Number(item.issue_add_2)||0,
                    issue_ww_360: Number(item.issue_add_3)||0,
                    issue_pw_400: Number(item.issue_pw_400)||0,
                    issue_w_400: Number(item.issue_w_400)||0,
                    issue_ww_400: Number(item.issue_ww_400)||0,
                    Issue_Wholes: Number(formatNumber((parseFloat(item.issue_pw_210) +
                        parseFloat(item.issue_w_210) + parseFloat(item.issue_ww_210) +
                        parseFloat(item.issue_pw_240) + parseFloat(item.issue_w_240) + parseFloat(item.issue_ww_240) +
                        parseFloat(item.issue_pw_280) + parseFloat(item.issue_w_280) + parseFloat(item.issue_ww_280) +
                        parseFloat(item.issue_pw_320) + parseFloat(item.issue_w_320) + parseFloat(item.issue_ww_320) +
                        parseFloat(item.issue_add_1) + parseFloat(item.issue_add_2) + parseFloat(item.issue_add_3) +
                        parseFloat(item.issue_pw_400) + parseFloat(item.issue_w_400) + parseFloat(item.issue_ww_400)).toString()))||0,
                    Issue_JB: Number(item.issue_jb)||0,
                    Issue_BigTaiho: Number(item.issue_bigTaiho)||0,
                    Issue_LW: Number(item.issue_lw)||0,

                    Current_Backlog: Number(item.current_backlog) ||0,
                    Mc_On_Hamsa_1: handleAMPM(item.Mc_on_1.slice(0, 5)),
                    Mc_Off_Hamsa_1: handleAMPM(item.Mc_off_1.slice(0, 5)),
                    Mc_Breakdown_Hamsa_1: item.Mc_breakdown_1.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_1: item.otherTime_1.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_2: handleAMPM(item.Mc_on_2.slice(0, 5)),
                    Mc_Off_Hamsa_2: handleAMPM(item.Mc_off_2.slice(0, 5)),
                    Mc_Breakdown_Hamsa_2: item.Mc_breakdown_2.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_2: item.otherTime_2.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_3: handleAMPM(item.Mc_on_3.slice(0, 5)),
                    Mc_Off_Hamsa_3: handleAMPM(item.Mc_off_3.slice(0, 5)),
                    Mc_Breakdown_Hamsa_3: item.Mc_breakdown_3.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_3: item.otherTime_3.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_4: handleAMPM(item.Mc_on_4.slice(0, 5)),
                    Mc_Off_Hamsa_4: handleAMPM(item.Mc_off_4.slice(0, 5)),
                    Mc_Breakdown_Hamsa_4: item.Mc_breakdown_4.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_4: item.otherTime_4.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_5: handleAMPM(item.Mc_on_5.slice(0, 5)),
                    Mc_Off_Hamsa_5: handleAMPM(item.Mc_off_5.slice(0, 5)),
                    Mc_Breakdown_Hamsa_5: item.Mc_breakdown_5.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_5: item.otherTime_5.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Spectrum: handleAMPM(item.Mc_on_6.slice(0, 5)),
                    Mc_Off_Spectrum: handleAMPM(item.Mc_off_6.slice(0, 5)),
                    Mc_Breakdown_Spectrum: item.Mc_breakdown_6.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Spectrum: item.otherTime_6.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Runtime_Hamsa_1: item.Mc_runTime_1.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_2: item.Mc_runTime_2.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_3: item.Mc_runTime_3.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_4: item.Mc_runTime_4.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_5: item.Mc_runTime_5.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Spectrum: item.Mc_runTime_6.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
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
            saveAs(blob, 'Hamsa_Entry_' + currDate + '.xlsx');

        }
        else {
            const response = await axios.put('/api/hamsa/hamsaprimarysearch', {
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
                transformed = EditData.map((item: HamsaData, idx: number) => ({
                    Sl_No: idx + 1,
                   Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Hamsa_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                    Receive_PW_W: Number(item.rcv_pw_w) ||0,
                    Receive_W_LOT: Number(item.rcv_w_lot) ||0,
                    Receive_WW: Number(item.rcv_ww) ||0,
                    Receive_Village: item.rcv_village ? Number(item.rcv_village) : 0 ,
                    Receive_LW: item.rcv_lw ? Number(item.rcv_lw) : 0,
                    Receive_Total: Number((parseFloat(item.rcv_pw_w) +
                        parseFloat(item.rcv_w_lot) + parseFloat(item.rcv_ww) +
                        (item.rcv_village ? parseFloat(item.rcv_village) : 0) +
                        (item.rcv_lw ? parseFloat(item.rcv_lw) : 0)).toFixed(2))||0,
                    issue_pw_210: Number(item.issue_pw_210)||0,
                    issue_w_210: Number(item.issue_w_210)||0,
                    issue_ww_210: Number(item.issue_ww_210)||0,
                    issue_pw_240: Number(item.issue_pw_240)||0,
                    issue_w_240: Number(item.issue_w_240)||0,
                    issue_ww_240: Number(item.issue_ww_240)||0,
                    issue_pw_280: Number(item.issue_pw_280)||0,
                    issue_w_280: Number(item.issue_w_280)||0,
                    issue_ww_280: Number(item.issue_ww_280)||0,
                    issue_pw_320: Number(item.issue_pw_320)||0,
                    issue_w_320: Number(item.issue_w_320)||0,
                    issue_ww_320: Number(item.issue_ww_320)||0,
                    issue_pw_360: Number(item.issue_add_1)||0,
                    issue_w_360: Number(item.issue_add_2)||0,
                    issue_ww_360: Number(item.issue_add_3)||0,
                    issue_pw_400: Number(item.issue_pw_400)||0,
                    issue_w_400: Number(item.issue_w_400)||0,
                    issue_ww_400: Number(item.issue_ww_400)||0,
                    Issue_Wholes: Number(formatNumber((parseFloat(item.issue_pw_210) +
                        parseFloat(item.issue_w_210) + parseFloat(item.issue_ww_210) +
                        parseFloat(item.issue_pw_240) + parseFloat(item.issue_w_240) + parseFloat(item.issue_ww_240) +
                        parseFloat(item.issue_pw_280) + parseFloat(item.issue_w_280) + parseFloat(item.issue_ww_280) +
                        parseFloat(item.issue_pw_320) + parseFloat(item.issue_w_320) + parseFloat(item.issue_ww_320) +
                        parseFloat(item.issue_add_1) + parseFloat(item.issue_add_2) + parseFloat(item.issue_add_3) +
                        parseFloat(item.issue_pw_400) + parseFloat(item.issue_w_400) + parseFloat(item.issue_ww_400)).toString()))||0,
                    Issue_JB: Number(item.issue_jb)||0,
                    Issue_BigTaiho: Number(item.issue_bigTaiho)||0,
                    Issue_LW: Number(item.issue_lw)||0,

                    Current_Backlog: Number(item.current_backlog) ||0,
                    Mc_On_Hamsa_1: handleAMPM(item.Mc_on_1.slice(0, 5)),
                    Mc_Off_Hamsa_1: handleAMPM(item.Mc_off_1.slice(0, 5)),
                    Mc_Breakdown_Hamsa_1: item.Mc_breakdown_1.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_1: item.otherTime_1.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_2: handleAMPM(item.Mc_on_2.slice(0, 5)),
                    Mc_Off_Hamsa_2: handleAMPM(item.Mc_off_2.slice(0, 5)),
                    Mc_Breakdown_Hamsa_2: item.Mc_breakdown_2.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_2: item.otherTime_2.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_3: handleAMPM(item.Mc_on_3.slice(0, 5)),
                    Mc_Off_Hamsa_3: handleAMPM(item.Mc_off_3.slice(0, 5)),
                    Mc_Breakdown_Hamsa_3: item.Mc_breakdown_3.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_3: item.otherTime_3.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_4: handleAMPM(item.Mc_on_4.slice(0, 5)),
                    Mc_Off_Hamsa_4: handleAMPM(item.Mc_off_4.slice(0, 5)),
                    Mc_Breakdown_Hamsa_4: item.Mc_breakdown_4.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_4: item.otherTime_4.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_5: handleAMPM(item.Mc_on_5.slice(0, 5)),
                    Mc_Off_Hamsa_5: handleAMPM(item.Mc_off_5.slice(0, 5)),
                    Mc_Breakdown_Hamsa_5: item.Mc_breakdown_5.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_5: item.otherTime_5.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Spectrum: handleAMPM(item.Mc_on_6.slice(0, 5)),
                    Mc_Off_Spectrum: handleAMPM(item.Mc_off_6.slice(0, 5)),
                    Mc_Breakdown_Spectrum: item.Mc_breakdown_6.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Spectrum: item.otherTime_6.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Runtime_Hamsa_1: item.Mc_runTime_1.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_2: item.Mc_runTime_2.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_3: item.Mc_runTime_3.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_4: item.Mc_runTime_4.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_5: item.Mc_runTime_5.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Spectrum: item.Mc_runTime_6.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
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
                transformed = data1.rcnEntries.map((item: HamsaData, idx: number) => ({
                    Sl_No: idx + 1,
                   Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Hamsa_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                    Receive_PW_W: Number(item.rcv_pw_w) ||0,
                    Receive_W_LOT: Number(item.rcv_w_lot) ||0,
                    Receive_WW: Number(item.rcv_ww) ||0,
                    Receive_Village: item.rcv_village ? Number(item.rcv_village) : 0 ,
                    Receive_LW: item.rcv_lw ? Number(item.rcv_lw) : 0,
                    Receive_Total: Number((parseFloat(item.rcv_pw_w) +
                        parseFloat(item.rcv_w_lot) + parseFloat(item.rcv_ww) +
                        (item.rcv_village ? parseFloat(item.rcv_village) : 0) +
                        (item.rcv_lw ? parseFloat(item.rcv_lw) : 0)).toFixed(2))||0,
                    issue_pw_210: Number(item.issue_pw_210)||0,
                    issue_w_210: Number(item.issue_w_210)||0,
                    issue_ww_210: Number(item.issue_ww_210)||0,
                    issue_pw_240: Number(item.issue_pw_240)||0,
                    issue_w_240: Number(item.issue_w_240)||0,
                    issue_ww_240: Number(item.issue_ww_240)||0,
                    issue_pw_280: Number(item.issue_pw_280)||0,
                    issue_w_280: Number(item.issue_w_280)||0,
                    issue_ww_280: Number(item.issue_ww_280)||0,
                    issue_pw_320: Number(item.issue_pw_320)||0,
                    issue_w_320: Number(item.issue_w_320)||0,
                    issue_ww_320: Number(item.issue_ww_320)||0,
                    issue_pw_360: Number(item.issue_add_1)||0,
                    issue_w_360: Number(item.issue_add_2)||0,
                    issue_ww_360: Number(item.issue_add_3)||0,
                    issue_pw_400: Number(item.issue_pw_400)||0,
                    issue_w_400: Number(item.issue_w_400)||0,
                    issue_ww_400: Number(item.issue_ww_400)||0,
                    Issue_Wholes: Number(formatNumber((parseFloat(item.issue_pw_210) +
                        parseFloat(item.issue_w_210) + parseFloat(item.issue_ww_210) +
                        parseFloat(item.issue_pw_240) + parseFloat(item.issue_w_240) + parseFloat(item.issue_ww_240) +
                        parseFloat(item.issue_pw_280) + parseFloat(item.issue_w_280) + parseFloat(item.issue_ww_280) +
                        parseFloat(item.issue_pw_320) + parseFloat(item.issue_w_320) + parseFloat(item.issue_ww_320) +
                        parseFloat(item.issue_add_1) + parseFloat(item.issue_add_2) + parseFloat(item.issue_add_3) +
                        parseFloat(item.issue_pw_400) + parseFloat(item.issue_w_400) + parseFloat(item.issue_ww_400)).toString()))||0,
                    Issue_JB: Number(item.issue_jb)||0,
                    Issue_BigTaiho: Number(item.issue_bigTaiho)||0,
                    Issue_LW: Number(item.issue_lw)||0,

                    Current_Backlog: Number(item.current_backlog) ||0,
                    Mc_On_Hamsa_1: handleAMPM(item.Mc_on_1.slice(0, 5)),
                    Mc_Off_Hamsa_1: handleAMPM(item.Mc_off_1.slice(0, 5)),
                    Mc_Breakdown_Hamsa_1: item.Mc_breakdown_1.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_1: item.otherTime_1.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_2: handleAMPM(item.Mc_on_2.slice(0, 5)),
                    Mc_Off_Hamsa_2: handleAMPM(item.Mc_off_2.slice(0, 5)),
                    Mc_Breakdown_Hamsa_2: item.Mc_breakdown_2.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_2: item.otherTime_2.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_3: handleAMPM(item.Mc_on_3.slice(0, 5)),
                    Mc_Off_Hamsa_3: handleAMPM(item.Mc_off_3.slice(0, 5)),
                    Mc_Breakdown_Hamsa_3: item.Mc_breakdown_3.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_3: item.otherTime_3.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_4: handleAMPM(item.Mc_on_4.slice(0, 5)),
                    Mc_Off_Hamsa_4: handleAMPM(item.Mc_off_4.slice(0, 5)),
                    Mc_Breakdown_Hamsa_4: item.Mc_breakdown_4.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_4: item.otherTime_4.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Hamsa_5: handleAMPM(item.Mc_on_5.slice(0, 5)),
                    Mc_Off_Hamsa_5: handleAMPM(item.Mc_off_5.slice(0, 5)),
                    Mc_Breakdown_Hamsa_5: item.Mc_breakdown_5.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Hamsa_5: item.otherTime_5.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Mc_On_Spectrum: handleAMPM(item.Mc_on_6.slice(0, 5)),
                    Mc_Off_Spectrum: handleAMPM(item.Mc_off_6.slice(0, 5)),
                    Mc_Breakdown_Spectrum: item.Mc_breakdown_6.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Other_Time_Spectrum: item.otherTime_6.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1') + ' hr',
                    Runtime_Hamsa_1: item.Mc_runTime_1.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_2: item.Mc_runTime_2.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_3: item.Mc_runTime_3.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_4: item.Mc_runTime_4.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Hamsa_5: item.Mc_runTime_5.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
                    Runtime_Spectrum: item.Mc_runTime_6.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '') + ' hr',
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
            saveAs(blob, 'Hamsa_Entry_' + currDate + '.xlsx');
        }
    }
    const handleSearch = async () => {

        setEditData([])
        setblockpagen('flex')
        if (searchType === 'LOT') {
            const response = await axios.put('/api/hamsa/hamsaprimarysearch', {
                searchitem: blConNo,
                fromDate: fromdate,
                toDate: todate,
                origin: origin,
                type: 'LOT'


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
            const response = await axios.put('/api/hamsa/hamsaprimarysearch', {
                searchitem: blConNo,
                fromDate: fromdate,
                toDate: todate,
                origin: origin,
                type: 'RLOT'


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
        else {
            const response = await axios.put('/api/hamsa/hamsaprimarysearch', {
                searchitem: blConNo,
                fromDate: fromdate,
                toDate: todate,
                origin: origin,
                type: 'VLOT'


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
        if (editHamsaLotWiseData.length > 0) {
            //console.log(editPendingData)
            setEditData(editHamsaLotWiseData)
            if(props.props==='edit'){setblockpagen('none')}
        }

    },[editHamsaLotWiseData, props.props])
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
 
    const handleApprove = async (item: HamsaData) => {
        const response = await axios.put(`/api/hamsa/approveeditHamsa/${item.id}/${item.LotNo}/${item.origin}`)
        const data = await response.data
        if (data.message === "Edit Request of Hamsa Entry is Approved Successfully") {

            if (approvesuccessdialog != null) {
                (approvesuccessdialog as any).showModal();
            }
        }
    }
    const handleRejection = async (item: HamsaData) => {
        const response = await axios.delete(`/api/hamsa/rejectededitHamsa/${item.id}/${item.LotNo}/${item.origin}`)
        const data = await response.data
        console.log(data)
        if (data.message === "Hamsa Entry rejected successfully") {
            //console.log('rejected enter')
            if (rejectsuccessdialog != null) {
                (rejectsuccessdialog as any).showModal();
            }
        }
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
    return (
        <>

        <div className="ml-5 mt-5 ">
          {props.props === 'non-edit' &&  <div className="w-full">
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
                </div>}
            {props.props === 'non-edit' && <div className="flex flexbox-search">

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

            </div>}
            {checkpending('Hamsa') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}
            <Table className="mt-4">
                <TableHeader className="bg-neutral-200 text-stone-950 ">


                    <TableHead className="text-center" >Id</TableHead>
                    <TableHead className="text-center" >Issue_Type</TableHead>
                    
                    <TableHead className="text-center" >Item_Lot_No</TableHead>
                    <TableHead className="text-center" >Origin</TableHead>
                    <TableHead className="text-center" >Issue_No</TableHead>
                    <TableHead className="text-center" >Hamsa_Entry_Date</TableHead>
<TableHead className="text-center font-bold">Current_Backlog</TableHead>
                    <TableHead className="text-center" >Incoming_Mixed_Lot_&_Origin</TableHead>
                    <TableHead className="text-center" >Action</TableHead>
                    {/* <TableHead className="text-center" >Mixed Amount</TableHead> */}
                    <TableHead className="text-center">PW_W/ V_PW_W</TableHead>
                    <TableHead className="text-center">W_Lot/ V_W_Lot</TableHead>
                    <TableHead className="text-center">WW/ V_WW</TableHead>
                    <TableHead className="text-center">Receive Mayur</TableHead>
                    <TableHead className="text-center">Receive Village</TableHead>
                    <TableHead className="text-center">Receive LW</TableHead>
                    <TableHead className="text-center">Hamsa Total_Opening</TableHead>
                    <TableHead className="text-center">PW_210/ V_PW_210</TableHead>
                    <TableHead className="text-center">W_210/ V_W_210</TableHead>
                    <TableHead className="text-center">WW_210/ V_WW_210</TableHead>
                    <TableHead className="text-center">PW_240/ V_PW_240</TableHead>
                        <TableHead className="text-center">W_240/ V_W_240</TableHead>
                        <TableHead className="text-center">WW_240/ V_WW_240</TableHead>
                        <TableHead className="text-center">PW_280/ V_PW_280</TableHead>
                        <TableHead className="text-center">W_280/ V_W_280</TableHead>
                        <TableHead className="text-center">WW_280/ V_WW_280</TableHead>
                        <TableHead className="text-center">PW_320/ V_PW_320</TableHead>
                        <TableHead className="text-center">W_320/ V_W_320</TableHead>
                        <TableHead className="text-center">WW_320/ V_WW_320</TableHead>
                        <TableHead className="text-center">PW_360/ V_PW_360</TableHead>
                        <TableHead className="text-center">W_360/ V_W_360</TableHead>
                        <TableHead className="text-center">WW_360/ V_WW_360</TableHead>
                        <TableHead className="text-center">PW_400/ V_PW_400</TableHead>
                        <TableHead className="text-center">W_400/ V_W_400</TableHead>
                        <TableHead className="text-center">WW_400/ V_WW_400</TableHead>
                    <TableHead className="text-center">Issue JB</TableHead>
                    {/* <TableHead className="text-center">Issue Add 4</TableHead>
                    <TableHead className="text-center">Issue Add 5</TableHead>
                    <TableHead className="text-center">Issue Add 6</TableHead>
                    <TableHead className="text-center">Issue Add 7</TableHead>
                    <TableHead className="text-center">Issue Add 8</TableHead>
                    <TableHead className="text-center">Issue Add 9</TableHead>
                    <TableHead className="text-center">Issue Add 10</TableHead> */}
                     <TableHead className="text-center">Issue Wholes</TableHead>
                    
                    <TableHead className="text-center">Issue LW</TableHead>
                    <TableHead className="text-center">Issue BigTaiho</TableHead>
                    <TableHead className="text-center font-bold">Hamsa Total_Issue(Kg)</TableHead>
                    
                    {/* <TableHead className="text-center">Entry_Backlog</TableHead> */}
                    
                    <TableHead className="text-center">Mc On (Hamsa_1)</TableHead>
                    <TableHead className="text-center">Mc Off (Hamsa_1)</TableHead>
                    <TableHead className="text-center">Mc_Breakdown (Hamsa-1)</TableHead>
                    <TableHead className="text-center">Other_Time (Hamsa-1)</TableHead>
                    <TableHead className="text-center">Mc On (Hamsa_2)</TableHead>
                    <TableHead className="text-center">Mc Off (Hamsa_2)</TableHead>
                    <TableHead className="text-center">Mc_Breakdown (Hamsa-2)</TableHead>
                    <TableHead className="text-center">Other_Time (Hamsa-2)</TableHead>
                    <TableHead className="text-center">Mc On (Hamsa_3)</TableHead>
                    <TableHead className="text-center">Mc Off (Hamsa_3)</TableHead>
                    <TableHead className="text-center">Mc_Breakdown (Hamsa-3)</TableHead>
                    <TableHead className="text-center">Other_Time (Hamsa-3)</TableHead>
                    <TableHead className="text-center">Mc On (Hamsa_4)</TableHead>
                    <TableHead className="text-center">Mc Off (Hamsa_4)</TableHead>
                    <TableHead className="text-center">Mc_Breakdown (Hamsa-4)</TableHead>
                    <TableHead className="text-center">Other_Time (Hamsa-4)</TableHead>
                    <TableHead className="text-center">Mc On (Hamsa_5)</TableHead>
                    <TableHead className="text-center">Mc Off (Hamsa_5)</TableHead>
                    <TableHead className="text-center">Mc_Breakdown (Hamsa-5)</TableHead>
                    <TableHead className="text-center">Other_Time (Hamsa-5)</TableHead>
                    <TableHead className="text-center">Mc On (Spectrum)</TableHead>
                    <TableHead className="text-center">Mc Off (Spectrum)</TableHead>
                    <TableHead className="text-center">Mc_Breakdown (Spectrum)</TableHead>
                    <TableHead className="text-center">Other_Time (Spectrum)</TableHead>
                   
                   
                    <TableHead className="text-center">Runtime_Hamsa_1</TableHead>
                    <TableHead className="text-center">Runtime_Hamsa_2</TableHead>
                    <TableHead className="text-center">Runtime_Hamsa_3</TableHead>
                    <TableHead className="text-center">Runtime_Hamsa_4</TableHead>
                    <TableHead className="text-center">Runtime_Hamsa_5</TableHead>
                    <TableHead className="text-center">Runtime_Spectrum</TableHead>
                
           
                    <TableHead className="text-center">Operator_Day</TableHead>
                    <TableHead className="text-center">Operator_Night</TableHead>
               
                    <TableHead className="text-center" >Edit Status </TableHead>
                    <TableHead className="text-center" >Created By </TableHead>
                    
                </TableHeader>
                <TableBody>


                    {EditData.length > 0 && props.props==='edit'? (EditData.map((item: HamsaData, idx) => {

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
                                    <TableCell className="text-center ">{formatNumber(item.rcv_pw_w)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.rcv_w_lot)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.rcv_ww)}</TableCell>
                                    <TableCell className="text-center  font-semibold bg-yellow-100">{formatNumber((parseFloat(item.rcv_pw_w) +
                                     parseFloat(item.rcv_w_lot)+parseFloat(item.rcv_ww)).toString())}</TableCell>
                                    <TableCell className="text-center font-semibold bg-yellow-100 ">{item.rcv_village ? formatNumber(item.rcv_village) :0}</TableCell>
                                    <TableCell className="text-center font-semibold bg-yellow-100 ">{item.rcv_lw ? formatNumber(item.rcv_lw) :0}</TableCell>
                                    <TableCell className="text-center font-bold bg-green-500 text-white">{(parseFloat(item.rcv_pw_w) +
                                     parseFloat(item.rcv_w_lot)+parseFloat(item.rcv_ww)+                                  
                                        (item.rcv_village ? parseFloat(item.rcv_village) : 0) + 
                                        (item.rcv_lw ? parseFloat(item.rcv_lw) : 0)).toFixed(2)} Kg</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_pw_210)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_w_210)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_ww_210)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_pw_240)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_w_240)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_ww_240)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_pw_280)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_w_280)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_ww_280)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_pw_320)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_w_320)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_ww_320)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_add_1)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_add_2)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_add_3)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_pw_400)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_w_400)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_ww_400)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_jb)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber((parseFloat(item.issue_pw_210) +
                                     parseFloat(item.issue_w_210)+parseFloat(item.issue_ww_210)+
                                     parseFloat(item.issue_pw_240) +parseFloat(item.issue_w_240)+parseFloat(item.issue_ww_240)+
                                     parseFloat(item.issue_pw_280) +parseFloat(item.issue_w_280)+parseFloat(item.issue_ww_280)+
                                     parseFloat(item.issue_pw_320) +parseFloat(item.issue_w_320)+parseFloat(item.issue_ww_320)+
                                     parseFloat(item.issue_add_1) +parseFloat(item.issue_add_2)+parseFloat(item.issue_add_3)+
                                     parseFloat(item.issue_pw_400) +parseFloat(item.issue_w_400)+parseFloat(item.issue_ww_400)+parseFloat(item.issue_jb)).toString())}</TableCell>
                                  
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_lw)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_bigTaiho)}</TableCell>
                                    
                                    <TableCell className="text-center font-bold bg-yellow-500 text-white">{formatNumber((parseFloat(item.issue_pw_210) + parseFloat(item.issue_lw)+parseFloat(item.issue_bigTaiho)+
                                     parseFloat(item.issue_w_210)+parseFloat(item.issue_ww_210)+
                                     parseFloat(item.issue_pw_240) +parseFloat(item.issue_w_240)+parseFloat(item.issue_ww_240)+
                                     parseFloat(item.issue_pw_280) +parseFloat(item.issue_w_280)+parseFloat(item.issue_ww_280)+
                                     parseFloat(item.issue_pw_320) +parseFloat(item.issue_w_320)+parseFloat(item.issue_ww_320)+
                                     parseFloat(item.issue_add_1) +parseFloat(item.issue_add_2)+parseFloat(item.issue_add_3)+
                                     parseFloat(item.issue_pw_400) +parseFloat(item.issue_w_400)+parseFloat(item.issue_ww_400)+parseFloat(item.issue_jb)).toString())} Kg</TableCell>
                                    {/* <TableCell className="text-center font-semibold text-blue-600">{formatNumber(item.entry_backlog)} kg</TableCell> */}
                                               
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
                        


                            <TableCell className="text-center">{handleAMPM(item.Mc_on_4.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_4.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_4.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_4.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>

                            <TableCell className="text-center">{handleAMPM(item.Mc_on_5.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_5.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_5.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_5.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>

                            <TableCell className="text-center">{handleAMPM(item.Mc_on_6.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_6.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_6.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_6.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>



                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_1.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_2.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_3.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_4.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_5.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_6.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>


                        
                        <TableCell className="text-center">{item.noOfdayOperators}</TableCell>
                        <TableCell className="text-center">{item.noOfnightOperators}</TableCell>
                                    <TableCell className="text-center">{item.editStatus}</TableCell>
                                    <TableCell className="text-center">{item.CreatedBy}</TableCell>

                          
                            </TableRow>
                        ) })): (
                        Data.length > 0 ? (Data.map((item: HamsaData, idx) => {
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
                                                                <p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>Hamsa Entry Modification</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <HamsaEditForm borma={[item]} />
                                                    </DialogContent>
                                                    
                                                </Dialog>
                                                {Number(item.current_backlog) > 0 && <Dialog>
                                                    <DialogTrigger className="flex"><CiBoxes size={20} />
                                                        <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Re-Issue</button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-screen">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>Hamsa Entry Reissue</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <HamsaReCreateForm borma={[item]} />
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
                                                        <RCNHamsaReMix borma={item} />
                                                    </DialogContent>
                                                    
                                                </Dialog>}
                                            </PopoverContent>
                                            
                                        </Popover>
                                    </TableCell>
                                    {/* <TableCell className="text-center ">{item.rcv_transfer ? formatNumber(item.rcv_transfer):''}</TableCell> */}
                                    <TableCell className="text-center ">{formatNumber(item.rcv_pw_w)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.rcv_w_lot)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.rcv_ww)}</TableCell>
                                    <TableCell className="text-center  font-semibold bg-yellow-100">{formatNumber((parseFloat(item.rcv_pw_w) +
                                     parseFloat(item.rcv_w_lot)+parseFloat(item.rcv_ww)).toString())}</TableCell>
                                    <TableCell className="text-center font-semibold bg-yellow-100 ">{item.rcv_village ? formatNumber(item.rcv_village) :0}</TableCell>
                                    <TableCell className="text-center font-semibold bg-yellow-100 ">{item.rcv_lw ? formatNumber(item.rcv_lw) :0}</TableCell>
                                    <TableCell className="text-center font-bold bg-green-500 text-white">{(parseFloat(item.rcv_pw_w) +
                                     parseFloat(item.rcv_w_lot)+parseFloat(item.rcv_ww)+                                  
                                        (item.rcv_village ? parseFloat(item.rcv_village) : 0) + 
                                        (item.rcv_lw ? parseFloat(item.rcv_lw) : 0)).toFixed(2)} Kg</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_pw_210)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_w_210)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_ww_210)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_pw_240)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_w_240)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_ww_240)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_pw_280)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_w_280)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_ww_280)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_pw_320)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_w_320)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_ww_320)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_add_1)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_add_2)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_add_3)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_pw_400)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_w_400)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_ww_400)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_jb)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber((parseFloat(item.issue_pw_210) +
                                     parseFloat(item.issue_w_210)+parseFloat(item.issue_ww_210)+
                                     parseFloat(item.issue_pw_240) +parseFloat(item.issue_w_240)+parseFloat(item.issue_ww_240)+
                                     parseFloat(item.issue_pw_280) +parseFloat(item.issue_w_280)+parseFloat(item.issue_ww_280)+
                                     parseFloat(item.issue_pw_320) +parseFloat(item.issue_w_320)+parseFloat(item.issue_ww_320)+
                                     parseFloat(item.issue_add_1) +parseFloat(item.issue_add_2)+parseFloat(item.issue_add_3)+
                                     parseFloat(item.issue_pw_400) +parseFloat(item.issue_w_400)+parseFloat(item.issue_ww_400)+parseFloat(item.issue_jb)).toString())}</TableCell>
                                   
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_lw)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_bigTaiho)}</TableCell>
                                   
                                    <TableCell className="text-center font-bold bg-yellow-500 text-white">{formatNumber((parseFloat(item.issue_pw_210) + parseFloat(item.issue_lw)+parseFloat(item.issue_bigTaiho)+
                                     parseFloat(item.issue_w_210)+parseFloat(item.issue_ww_210)+
                                     parseFloat(item.issue_pw_240) +parseFloat(item.issue_w_240)+parseFloat(item.issue_ww_240)+
                                     parseFloat(item.issue_pw_280) +parseFloat(item.issue_w_280)+parseFloat(item.issue_ww_280)+
                                     parseFloat(item.issue_pw_320) +parseFloat(item.issue_w_320)+parseFloat(item.issue_ww_320)+
                                     parseFloat(item.issue_add_1) +parseFloat(item.issue_add_2)+parseFloat(item.issue_add_3)+
                                     parseFloat(item.issue_pw_400) +parseFloat(item.issue_w_400)+parseFloat(item.issue_ww_400)+parseFloat(item.issue_jb)).toString())} Kg</TableCell>
                                    {/* <TableCell className="text-center font-semibold text-blue-600">{formatNumber(item.entry_backlog)} kg</TableCell> */}
                                               
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
                        


                            <TableCell className="text-center">{handleAMPM(item.Mc_on_4.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_4.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_4.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_4.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>

                            <TableCell className="text-center">{handleAMPM(item.Mc_on_5.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_5.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_5.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_5.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>

                            <TableCell className="text-center">{handleAMPM(item.Mc_on_6.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off_6.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown_6.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime_6.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>



                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_1.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_2.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_3.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_4.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_5.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime_6.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
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

export default HamsaTable;