import { useContext, useEffect, useState } from "react";
import { Origin, pagelimit, pageNo, pendingCheckRole } from "../common/exportData";
import Context from "../context/context";
import axios from "axios";
import {  pendingCheckRoles, PermissionRole, SortingData } from "@/type/type";
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
import RCNSortingReMix from "./SortingMix";
import RCNSortingReCreateForm from "./SortingReissueForm";
import SortingEditForm from "./SortingEdit";



const SortingTable = () => {
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
    //const [hidetodate, sethidetoDate] = useState<string>('');
    const currDate = new Date().toLocaleDateString();
    const [origin, setOrigin] = useState<string>("")
    const [blockpagen, setblockpagen] = useState('flex')
    const [EditData, setEditData] = useState<SortingData[]>([])
    const [blConNo, setBlConNo] = useState<string>("")
    const { editSortingLotWiseData } = useContext(Context);
    const [Data, setData] = useState<SortingData[]>([])
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
            const response = await axios.put('/api/sorting/sortingprimarysearch', {
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
                transformed = EditData.map((item: SortingData, idx: number) => ({
                    Sl_No: idx + 1,
                    Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Sorting_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                    Opening_JJH: formatNumber(item.rcv_jjh),
                    Opening_SJH: formatNumber(item.rcv_sjh),
                    Opening_SJH1: formatNumber(item.rcv_sjh1),
                    Opening_JK_K: formatNumber(item.rcv_jk_k),
                    Opening_JH1: formatNumber(item.rcv_jh1),
                    Opening_SP1: formatNumber(item.rcv_sp1),
                    Borma_JJH: formatNumber(item.issue_add_4),
                    Borma_SJH: formatNumber(item.issue_add_5),
                    Borma_SJH1: formatNumber(item.issue_add_6),
                    Borma_JK_K: formatNumber(item.issue_add_8),
                    Borma_JH1: formatNumber(item.issue_add_7),
                    Borma_SP1: formatNumber(item.issue_add_9),
                    Receive_Peeling: Number(formatNumber(item.rcv_jjh)) + Number(formatNumber(item.rcv_sjh)) + Number(formatNumber(item.rcv_sjh1))
                        + Number(formatNumber(item.rcv_jk_k)) + Number(formatNumber(item.rcv_jh1)) + Number(formatNumber(item.rcv_sp1)),
                    Borma_Peeling: Number(formatNumber(item.issue_add_4)) + Number(formatNumber(item.issue_add_5)) + Number(formatNumber(item.issue_add_6)) +
                        Number(formatNumber(item.issue_add_7)) + Number(formatNumber(item.issue_add_8)) + Number(formatNumber(item.issue_add_9)),
                    Borma_Loss_Kg: formatNumber(item.issue_add_2),
                    Borma_Loss_Percentage: formatNumber(item.issue_add_3),
                    Receive_BigTaiho: item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) : 0,
                    Receive_Total: formatNumber((parseFloat(item.issue_add_4) + parseFloat(item.issue_add_5) + parseFloat(item.issue_add_6)
                        + parseFloat(item.issue_add_7) + parseFloat(item.issue_add_8) + parseFloat(item.issue_add_9) + item.rcv_bigTaiho ? parseFloat(item.rcv_bigTaiho) : 0).toString()),
                    issue_SJH: formatNumber(item.issue_sjh),
                    issue_JJH: formatNumber(item.issue_jjh),
                    issue_JJH1: formatNumber(item.issue_jjh1),
                    issue_jk: formatNumber(item.issue_jk),
                    issue_jk1: formatNumber(item.issue_jk1),
                    issue_k: formatNumber(item.issue_k),
                    issue_k1: formatNumber(item.issue_k1),
                    issue_lwp: formatNumber(item.issue_lwp),
                    issue_lwp1: formatNumber(item.issue_lwp1),
                    issue_s: formatNumber(item.issue_s),
                    issue_ss: formatNumber(item.issue_ss),
                    issue_yk: formatNumber(item.issue_yk),
                    issue_sp2: formatNumber(item.issue_sp2),
                    issue_kp: formatNumber(item.issue_kp),

                    issue_in_k: formatNumber(item.issue_in_k),
                    issue_in_jh: formatNumber(item.issue_in_jh),
                    issue_V_sjh: formatNumber(item.issue_V_sjh),
                    issue_V_k: formatNumber(item.issue_V_k),
                    issue_V_k1: formatNumber(item.issue_V_k1),
                    issue_V_lwp: formatNumber(item.issue_V_lwp),
                    issue_V_lwp1: formatNumber(item.issue_V_lwp1),
                    issue_V_jk: formatNumber(item.issue_V_jk),
                    issue_V_jk1: formatNumber(item.issue_V_jk1),
                    issue_V_ss: formatNumber(item.issue_V_ss),
                    issue_V_sp: formatNumber(item.issue_V_sp),
                    issue_V_sp2: formatNumber(item.issue_V_sp2),
                    issue_V_jh1: formatNumber(item.issue_V_jh1),
                    issue_V_yk: formatNumber(item.issue_V_yk),
                    issue_V_m_jk1: formatNumber(item.issue_V_m_jk1),
                    issue_ext_grade_1: formatNumber(item.issue_ext_grade_1),
                    issue_ext_grade_2: formatNumber(item.issue_ext_grade_2),
                    issue_ext_grade_3: formatNumber(item.issue_ext_grade_3),
                    issue_ext_grade_4: formatNumber(item.issue_ext_grade_4),
                    issue_ext_grade_5: formatNumber(item.issue_ext_grade_5),
                    issue_ext_grade_6: formatNumber(item.issue_ext_grade_6),
                    issue_ext_grade_7: formatNumber(item.issue_ext_grade_7),
                    issue_ext_grade_8: formatNumber(item.issue_ext_grade_8),
                    issue_ext_grade_9: formatNumber(item.issue_ext_grade_9),
                    issue_ext_grade_10: formatNumber(item.issue_ext_grade_10),

                    Issue_Packing: formatNumber((
                        parseFloat(item.issue_jjh) + parseFloat(item.issue_jjh1) +
                        parseFloat(item.issue_sjh) + parseFloat(item.issue_jk) + parseFloat(item.issue_jk1) +
                        parseFloat(item.issue_k) + parseFloat(item.issue_k1) + parseFloat(item.issue_lwp) +
                        parseFloat(item.issue_lwp1) + parseFloat(item.issue_s) + parseFloat(item.issue_ss) +
                        parseFloat(item.issue_k) + parseFloat(item.issue_yk) + parseFloat(item.issue_sp2) +
                        parseFloat(item.issue_kp) + parseFloat(item.issue_in_k) +
                        parseFloat(item.issue_in_jh) +
                        parseFloat(item.issue_V_sjh) +
                        parseFloat(item.issue_V_k) +
                        parseFloat(item.issue_V_k1) +
                        parseFloat(item.issue_V_lwp) +
                        parseFloat(item.issue_V_lwp1) +
                        parseFloat(item.issue_V_jk) +
                        parseFloat(item.issue_V_jk1) +
                        parseFloat(item.issue_V_ss) +
                        parseFloat(item.issue_V_sp) +
                        parseFloat(item.issue_V_sp2) +
                        parseFloat(item.issue_V_jh1) +
                        parseFloat(item.issue_V_yk) +
                        parseFloat(item.issue_V_m_jk1) +
                        parseFloat(item.issue_ext_grade_1) +
                        parseFloat(item.issue_ext_grade_2) +
                        parseFloat(item.issue_ext_grade_3) +
                        parseFloat(item.issue_ext_grade_4) +
                        parseFloat(item.issue_ext_grade_5) +
                        parseFloat(item.issue_ext_grade_6) +
                        parseFloat(item.issue_ext_grade_7) +
                        parseFloat(item.issue_ext_grade_8) +
                        parseFloat(item.issue_ext_grade_9) +
                        parseFloat(item.issue_ext_grade_10)
                    ).toString()),
                    issue_village: formatNumber(item.issue_village),
                    issue_mayur: formatNumber(item.issue_mayur),
                    issue_bigTaiho: formatNumber(item.issue_bigTaiho),
                    issue_dpds: formatNumber(item.issue_dpds),
                    issue_rejection: formatNumber(item.issue_rejection),
                    Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),

                    Labour: item.noOfdayOperators,


                    Edit_Status: item.editStatus,
                    Created_By: item.CreatedBy,
                    Modified_By: item.modifiedBy

                }));
                //setTransformedData(transformed);
                ws = XLSX.utils.json_to_sheet(transformed);
            }
            else {
                transformed = data1.rcnEntries.map((item: SortingData, idx: number) => ({
                    Sl_No: idx + 1,
                    Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Sorting_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                    Opening_JJH: formatNumber(item.rcv_jjh),
                    Opening_SJH: formatNumber(item.rcv_sjh),
                    Opening_SJH1: formatNumber(item.rcv_sjh1),
                    Opening_JK_K: formatNumber(item.rcv_jk_k),
                    Opening_JH1: formatNumber(item.rcv_jh1),
                    Opening_SP1: formatNumber(item.rcv_sp1),
                    Borma_JJH: formatNumber(item.issue_add_4),
                    Borma_SJH: formatNumber(item.issue_add_5),
                    Borma_SJH1: formatNumber(item.issue_add_6),
                    Borma_JK_K: formatNumber(item.issue_add_8),
                    Borma_JH1: formatNumber(item.issue_add_7),
                    Borma_SP1: formatNumber(item.issue_add_9),
                    Receive_Peeling: Number(formatNumber(item.rcv_jjh)) + Number(formatNumber(item.rcv_sjh)) + Number(formatNumber(item.rcv_sjh1))
                        + Number(formatNumber(item.rcv_jk_k)) + Number(formatNumber(item.rcv_jh1)) + Number(formatNumber(item.rcv_sp1)),
                    Borma_Peeling: Number(formatNumber(item.issue_add_4)) + Number(formatNumber(item.issue_add_5)) + Number(formatNumber(item.issue_add_6)) +
                        Number(formatNumber(item.issue_add_7)) + Number(formatNumber(item.issue_add_8)) + Number(formatNumber(item.issue_add_9)),
                    Borma_Loss_Kg: formatNumber(item.issue_add_2),
                    Borma_Loss_Percentage: formatNumber(item.issue_add_3),
                    Receive_BigTaiho: item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) : 0,
                    Receive_Total: formatNumber((parseFloat(item.issue_add_4) + parseFloat(item.issue_add_5) + parseFloat(item.issue_add_6)
                        + parseFloat(item.issue_add_7) + parseFloat(item.issue_add_8) + parseFloat(item.issue_add_9) + item.rcv_bigTaiho ? parseFloat(item.rcv_bigTaiho) : 0).toString()),
                    issue_SJH: formatNumber(item.issue_sjh),
                    issue_JJH: formatNumber(item.issue_jjh),
                    issue_JJH1: formatNumber(item.issue_jjh1),
                    issue_jk: formatNumber(item.issue_jk),
                    issue_jk1: formatNumber(item.issue_jk1),
                    issue_k: formatNumber(item.issue_k),
                    issue_k1: formatNumber(item.issue_k1),
                    issue_lwp: formatNumber(item.issue_lwp),
                    issue_lwp1: formatNumber(item.issue_lwp1),
                    issue_s: formatNumber(item.issue_s),
                    issue_ss: formatNumber(item.issue_ss),
                    issue_yk: formatNumber(item.issue_yk),
                    issue_sp2: formatNumber(item.issue_sp2),
                    issue_kp: formatNumber(item.issue_kp),

                    issue_in_k: formatNumber(item.issue_in_k),
                    issue_in_jh: formatNumber(item.issue_in_jh),
                    issue_V_sjh: formatNumber(item.issue_V_sjh),
                    issue_V_k: formatNumber(item.issue_V_k),
                    issue_V_k1: formatNumber(item.issue_V_k1),
                    issue_V_lwp: formatNumber(item.issue_V_lwp),
                    issue_V_lwp1: formatNumber(item.issue_V_lwp1),
                    issue_V_jk: formatNumber(item.issue_V_jk),
                    issue_V_jk1: formatNumber(item.issue_V_jk1),
                    issue_V_ss: formatNumber(item.issue_V_ss),
                    issue_V_sp: formatNumber(item.issue_V_sp),
                    issue_V_sp2: formatNumber(item.issue_V_sp2),
                    issue_V_jh1: formatNumber(item.issue_V_jh1),
                    issue_V_yk: formatNumber(item.issue_V_yk),
                    issue_V_m_jk1: formatNumber(item.issue_V_m_jk1),
                    issue_ext_grade_1: formatNumber(item.issue_ext_grade_1),
                    issue_ext_grade_2: formatNumber(item.issue_ext_grade_2),
                    issue_ext_grade_3: formatNumber(item.issue_ext_grade_3),
                    issue_ext_grade_4: formatNumber(item.issue_ext_grade_4),
                    issue_ext_grade_5: formatNumber(item.issue_ext_grade_5),
                    issue_ext_grade_6: formatNumber(item.issue_ext_grade_6),
                    issue_ext_grade_7: formatNumber(item.issue_ext_grade_7),
                    issue_ext_grade_8: formatNumber(item.issue_ext_grade_8),
                    issue_ext_grade_9: formatNumber(item.issue_ext_grade_9),
                    issue_ext_grade_10: formatNumber(item.issue_ext_grade_10),

                    Issue_Packing: formatNumber((
                        parseFloat(item.issue_jjh) + parseFloat(item.issue_jjh1) +
                        parseFloat(item.issue_sjh) + parseFloat(item.issue_jk) + parseFloat(item.issue_jk1) +
                        parseFloat(item.issue_k) + parseFloat(item.issue_k1) + parseFloat(item.issue_lwp) +
                        parseFloat(item.issue_lwp1) + parseFloat(item.issue_s) + parseFloat(item.issue_ss) +
                        parseFloat(item.issue_k) + parseFloat(item.issue_yk) + parseFloat(item.issue_sp2) +
                        parseFloat(item.issue_kp) + parseFloat(item.issue_in_k) +
                        parseFloat(item.issue_in_jh) +
                        parseFloat(item.issue_V_sjh) +
                        parseFloat(item.issue_V_k) +
                        parseFloat(item.issue_V_k1) +
                        parseFloat(item.issue_V_lwp) +
                        parseFloat(item.issue_V_lwp1) +
                        parseFloat(item.issue_V_jk) +
                        parseFloat(item.issue_V_jk1) +
                        parseFloat(item.issue_V_ss) +
                        parseFloat(item.issue_V_sp) +
                        parseFloat(item.issue_V_sp2) +
                        parseFloat(item.issue_V_jh1) +
                        parseFloat(item.issue_V_yk) +
                        parseFloat(item.issue_V_m_jk1) +
                        parseFloat(item.issue_ext_grade_1) +
                        parseFloat(item.issue_ext_grade_2) +
                        parseFloat(item.issue_ext_grade_3) +
                        parseFloat(item.issue_ext_grade_4) +
                        parseFloat(item.issue_ext_grade_5) +
                        parseFloat(item.issue_ext_grade_6) +
                        parseFloat(item.issue_ext_grade_7) +
                        parseFloat(item.issue_ext_grade_8) +
                        parseFloat(item.issue_ext_grade_9) +
                        parseFloat(item.issue_ext_grade_10)
                    ).toString()),

                    issue_village: formatNumber(item.issue_village),
                    issue_mayur: formatNumber(item.issue_mayur),
                    issue_bigTaiho: formatNumber(item.issue_bigTaiho),
                    issue_dpds: formatNumber(item.issue_dpds),
                    issue_rejection: formatNumber(item.issue_rejection),
                    Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),

                    Labour: item.noOfdayOperators,

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
            saveAs(blob, 'Sorting_Entry_' + currDate + '.xlsx');
        }
        else if (searchType === 'R-LOT') {
            const response = await axios.put('/api/sorting/sortingprimarysearch', {
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
                transformed = EditData.map((item: SortingData, idx: number) => ({
                    Sl_No: idx + 1,
                    Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Sorting_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                    Opening_JJH: formatNumber(item.rcv_jjh),
                    Opening_SJH: formatNumber(item.rcv_sjh),
                    Opening_SJH1: formatNumber(item.rcv_sjh1),
                    Opening_JK_K: formatNumber(item.rcv_jk_k),
                    Opening_JH1: formatNumber(item.rcv_jh1),
                    Opening_SP1: formatNumber(item.rcv_sp1),
                    Borma_JJH: formatNumber(item.issue_add_4),
                    Borma_SJH: formatNumber(item.issue_add_5),
                    Borma_SJH1: formatNumber(item.issue_add_6),
                    Borma_JK_K: formatNumber(item.issue_add_8),
                    Borma_JH1: formatNumber(item.issue_add_7),
                    Borma_SP1: formatNumber(item.issue_add_9),
                    Receive_Peeling: Number(formatNumber(item.rcv_jjh)) + Number(formatNumber(item.rcv_sjh)) + Number(formatNumber(item.rcv_sjh1))
                        + Number(formatNumber(item.rcv_jk_k)) + Number(formatNumber(item.rcv_jh1)) + Number(formatNumber(item.rcv_sp1)),
                    Borma_Peeling: Number(formatNumber(item.issue_add_4)) + Number(formatNumber(item.issue_add_5)) + Number(formatNumber(item.issue_add_6)) +
                        Number(formatNumber(item.issue_add_7)) + Number(formatNumber(item.issue_add_8)) + Number(formatNumber(item.issue_add_9)),
                    Borma_Loss_Kg: formatNumber(item.issue_add_2),
                    Borma_Loss_Percentage: formatNumber(item.issue_add_3),
                    Receive_BigTaiho: item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) : 0,
                    Receive_Total: formatNumber((parseFloat(item.issue_add_4) + parseFloat(item.issue_add_5) + parseFloat(item.issue_add_6)
                        + parseFloat(item.issue_add_7) + parseFloat(item.issue_add_8) + parseFloat(item.issue_add_9) + item.rcv_bigTaiho ? parseFloat(item.rcv_bigTaiho) : 0).toString()),
                    issue_SJH: formatNumber(item.issue_sjh),
                    issue_JJH: formatNumber(item.issue_jjh),
                    issue_JJH1: formatNumber(item.issue_jjh1),
                    issue_jk: formatNumber(item.issue_jk),
                    issue_jk1: formatNumber(item.issue_jk1),
                    issue_k: formatNumber(item.issue_k),
                    issue_k1: formatNumber(item.issue_k1),
                    issue_lwp: formatNumber(item.issue_lwp),
                    issue_lwp1: formatNumber(item.issue_lwp1),
                    issue_s: formatNumber(item.issue_s),
                    issue_ss: formatNumber(item.issue_ss),
                    issue_yk: formatNumber(item.issue_yk),
                    issue_sp2: formatNumber(item.issue_sp2),
                    issue_kp: formatNumber(item.issue_kp),

                    issue_in_k: formatNumber(item.issue_in_k),
                    issue_in_jh: formatNumber(item.issue_in_jh),
                    issue_V_sjh: formatNumber(item.issue_V_sjh),
                    issue_V_k: formatNumber(item.issue_V_k),
                    issue_V_k1: formatNumber(item.issue_V_k1),
                    issue_V_lwp: formatNumber(item.issue_V_lwp),
                    issue_V_lwp1: formatNumber(item.issue_V_lwp1),
                    issue_V_jk: formatNumber(item.issue_V_jk),
                    issue_V_jk1: formatNumber(item.issue_V_jk1),
                    issue_V_ss: formatNumber(item.issue_V_ss),
                    issue_V_sp: formatNumber(item.issue_V_sp),
                    issue_V_sp2: formatNumber(item.issue_V_sp2),
                    issue_V_jh1: formatNumber(item.issue_V_jh1),
                    issue_V_yk: formatNumber(item.issue_V_yk),
                    issue_V_m_jk1: formatNumber(item.issue_V_m_jk1),
                    issue_ext_grade_1: formatNumber(item.issue_ext_grade_1),
                    issue_ext_grade_2: formatNumber(item.issue_ext_grade_2),
                    issue_ext_grade_3: formatNumber(item.issue_ext_grade_3),
                    issue_ext_grade_4: formatNumber(item.issue_ext_grade_4),
                    issue_ext_grade_5: formatNumber(item.issue_ext_grade_5),
                    issue_ext_grade_6: formatNumber(item.issue_ext_grade_6),
                    issue_ext_grade_7: formatNumber(item.issue_ext_grade_7),
                    issue_ext_grade_8: formatNumber(item.issue_ext_grade_8),
                    issue_ext_grade_9: formatNumber(item.issue_ext_grade_9),
                    issue_ext_grade_10: formatNumber(item.issue_ext_grade_10),

                    Issue_Packing: formatNumber((
                        parseFloat(item.issue_jjh) + parseFloat(item.issue_jjh1) +
                        parseFloat(item.issue_sjh) + parseFloat(item.issue_jk) + parseFloat(item.issue_jk1) +
                        parseFloat(item.issue_k) + parseFloat(item.issue_k1) + parseFloat(item.issue_lwp) +
                        parseFloat(item.issue_lwp1) + parseFloat(item.issue_s) + parseFloat(item.issue_ss) +
                        parseFloat(item.issue_k) + parseFloat(item.issue_yk) + parseFloat(item.issue_sp2) +
                        parseFloat(item.issue_kp) + parseFloat(item.issue_in_k) +
                        parseFloat(item.issue_in_jh) +
                        parseFloat(item.issue_V_sjh) +
                        parseFloat(item.issue_V_k) +
                        parseFloat(item.issue_V_k1) +
                        parseFloat(item.issue_V_lwp) +
                        parseFloat(item.issue_V_lwp1) +
                        parseFloat(item.issue_V_jk) +
                        parseFloat(item.issue_V_jk1) +
                        parseFloat(item.issue_V_ss) +
                        parseFloat(item.issue_V_sp) +
                        parseFloat(item.issue_V_sp2) +
                        parseFloat(item.issue_V_jh1) +
                        parseFloat(item.issue_V_yk) +
                        parseFloat(item.issue_V_m_jk1) +
                        parseFloat(item.issue_ext_grade_1) +
                        parseFloat(item.issue_ext_grade_2) +
                        parseFloat(item.issue_ext_grade_3) +
                        parseFloat(item.issue_ext_grade_4) +
                        parseFloat(item.issue_ext_grade_5) +
                        parseFloat(item.issue_ext_grade_6) +
                        parseFloat(item.issue_ext_grade_7) +
                        parseFloat(item.issue_ext_grade_8) +
                        parseFloat(item.issue_ext_grade_9) +
                        parseFloat(item.issue_ext_grade_10)
                    ).toString()),
                    issue_village: formatNumber(item.issue_village),
                    issue_mayur: formatNumber(item.issue_mayur),
                    issue_bigTaiho: formatNumber(item.issue_bigTaiho),
                    issue_dpds: formatNumber(item.issue_dpds),
                    issue_rejection: formatNumber(item.issue_rejection),
                    Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),

                    Labour: item.noOfdayOperators,


                    Edit_Status: item.editStatus,
                    Created_By: item.CreatedBy,
                    Modified_By: item.modifiedBy

                }));
                //setTransformedData(transformed);
                ws = XLSX.utils.json_to_sheet(transformed);
            }
            else {
                transformed = data1.rcnEntries.map((item: SortingData, idx: number) => ({
                    Sl_No: idx + 1,
                    Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Sorting_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                    Opening_JJH: formatNumber(item.rcv_jjh),
                    Opening_SJH: formatNumber(item.rcv_sjh),
                    Opening_SJH1: formatNumber(item.rcv_sjh1),
                    Opening_JK_K: formatNumber(item.rcv_jk_k),
                    Opening_JH1: formatNumber(item.rcv_jh1),
                    Opening_SP1: formatNumber(item.rcv_sp1),
                    Borma_JJH: formatNumber(item.issue_add_4),
                    Borma_SJH: formatNumber(item.issue_add_5),
                    Borma_SJH1: formatNumber(item.issue_add_6),
                    Borma_JK_K: formatNumber(item.issue_add_8),
                    Borma_JH1: formatNumber(item.issue_add_7),
                    Borma_SP1: formatNumber(item.issue_add_9),
                    Receive_Peeling: Number(formatNumber(item.rcv_jjh)) + Number(formatNumber(item.rcv_sjh)) + Number(formatNumber(item.rcv_sjh1))
                        + Number(formatNumber(item.rcv_jk_k)) + Number(formatNumber(item.rcv_jh1)) + Number(formatNumber(item.rcv_sp1)),
                    Borma_Peeling: Number(formatNumber(item.issue_add_4)) + Number(formatNumber(item.issue_add_5)) + Number(formatNumber(item.issue_add_6)) +
                        Number(formatNumber(item.issue_add_7)) + Number(formatNumber(item.issue_add_8)) + Number(formatNumber(item.issue_add_9)),
                    Borma_Loss_Kg: formatNumber(item.issue_add_2),
                    Borma_Loss_Percentage: formatNumber(item.issue_add_3),
                    Receive_BigTaiho: item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) : 0,
                    Receive_Total: formatNumber((parseFloat(item.issue_add_4) + parseFloat(item.issue_add_5) + parseFloat(item.issue_add_6)
                        + parseFloat(item.issue_add_7) + parseFloat(item.issue_add_8) + parseFloat(item.issue_add_9) + item.rcv_bigTaiho ? parseFloat(item.rcv_bigTaiho) : 0).toString()),
                    issue_SJH: formatNumber(item.issue_sjh),
                    issue_JJH: formatNumber(item.issue_jjh),
                    issue_JJH1: formatNumber(item.issue_jjh1),
                    issue_jk: formatNumber(item.issue_jk),
                    issue_jk1: formatNumber(item.issue_jk1),
                    issue_k: formatNumber(item.issue_k),
                    issue_k1: formatNumber(item.issue_k1),
                    issue_lwp: formatNumber(item.issue_lwp),
                    issue_lwp1: formatNumber(item.issue_lwp1),
                    issue_s: formatNumber(item.issue_s),
                    issue_ss: formatNumber(item.issue_ss),
                    issue_yk: formatNumber(item.issue_yk),
                    issue_sp2: formatNumber(item.issue_sp2),
                    issue_kp: formatNumber(item.issue_kp),

                    issue_in_k: formatNumber(item.issue_in_k),
                    issue_in_jh: formatNumber(item.issue_in_jh),
                    issue_V_sjh: formatNumber(item.issue_V_sjh),
                    issue_V_k: formatNumber(item.issue_V_k),
                    issue_V_k1: formatNumber(item.issue_V_k1),
                    issue_V_lwp: formatNumber(item.issue_V_lwp),
                    issue_V_lwp1: formatNumber(item.issue_V_lwp1),
                    issue_V_jk: formatNumber(item.issue_V_jk),
                    issue_V_jk1: formatNumber(item.issue_V_jk1),
                    issue_V_ss: formatNumber(item.issue_V_ss),
                    issue_V_sp: formatNumber(item.issue_V_sp),
                    issue_V_sp2: formatNumber(item.issue_V_sp2),
                    issue_V_jh1: formatNumber(item.issue_V_jh1),
                    issue_V_yk: formatNumber(item.issue_V_yk),
                    issue_V_m_jk1: formatNumber(item.issue_V_m_jk1),
                    issue_ext_grade_1: formatNumber(item.issue_ext_grade_1),
                    issue_ext_grade_2: formatNumber(item.issue_ext_grade_2),
                    issue_ext_grade_3: formatNumber(item.issue_ext_grade_3),
                    issue_ext_grade_4: formatNumber(item.issue_ext_grade_4),
                    issue_ext_grade_5: formatNumber(item.issue_ext_grade_5),
                    issue_ext_grade_6: formatNumber(item.issue_ext_grade_6),
                    issue_ext_grade_7: formatNumber(item.issue_ext_grade_7),
                    issue_ext_grade_8: formatNumber(item.issue_ext_grade_8),
                    issue_ext_grade_9: formatNumber(item.issue_ext_grade_9),
                    issue_ext_grade_10: formatNumber(item.issue_ext_grade_10),

                    Issue_Packing: formatNumber((
                        parseFloat(item.issue_jjh) + parseFloat(item.issue_jjh1) +
                        parseFloat(item.issue_sjh) + parseFloat(item.issue_jk) + parseFloat(item.issue_jk1) +
                        parseFloat(item.issue_k) + parseFloat(item.issue_k1) + parseFloat(item.issue_lwp) +
                        parseFloat(item.issue_lwp1) + parseFloat(item.issue_s) + parseFloat(item.issue_ss) +
                        parseFloat(item.issue_k) + parseFloat(item.issue_yk) + parseFloat(item.issue_sp2) +
                        parseFloat(item.issue_kp) + parseFloat(item.issue_in_k) +
                        parseFloat(item.issue_in_jh) +
                        parseFloat(item.issue_V_sjh) +
                        parseFloat(item.issue_V_k) +
                        parseFloat(item.issue_V_k1) +
                        parseFloat(item.issue_V_lwp) +
                        parseFloat(item.issue_V_lwp1) +
                        parseFloat(item.issue_V_jk) +
                        parseFloat(item.issue_V_jk1) +
                        parseFloat(item.issue_V_ss) +
                        parseFloat(item.issue_V_sp) +
                        parseFloat(item.issue_V_sp2) +
                        parseFloat(item.issue_V_jh1) +
                        parseFloat(item.issue_V_yk) +
                        parseFloat(item.issue_V_m_jk1) +
                        parseFloat(item.issue_ext_grade_1) +
                        parseFloat(item.issue_ext_grade_2) +
                        parseFloat(item.issue_ext_grade_3) +
                        parseFloat(item.issue_ext_grade_4) +
                        parseFloat(item.issue_ext_grade_5) +
                        parseFloat(item.issue_ext_grade_6) +
                        parseFloat(item.issue_ext_grade_7) +
                        parseFloat(item.issue_ext_grade_8) +
                        parseFloat(item.issue_ext_grade_9) +
                        parseFloat(item.issue_ext_grade_10)
                    ).toString()),

                    issue_village: formatNumber(item.issue_village),
                    issue_mayur: formatNumber(item.issue_mayur),
                    issue_bigTaiho: formatNumber(item.issue_bigTaiho),
                    issue_dpds: formatNumber(item.issue_dpds),
                    issue_rejection: formatNumber(item.issue_rejection),
                    Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),

                    Labour: item.noOfdayOperators,

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
            saveAs(blob, 'Sorting_Entry_' + currDate + '.xlsx');
        }
        else {
            const response = await axios.put('/api/sorting/sortingprimarysearch', {
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
                transformed = EditData.map((item: SortingData, idx: number) => ({
                    Sl_No: idx + 1,
                    Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Sorting_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                    Opening_JJH: formatNumber(item.rcv_jjh),
                    Opening_SJH: formatNumber(item.rcv_sjh),
                    Opening_SJH1: formatNumber(item.rcv_sjh1),
                    Opening_JK_K: formatNumber(item.rcv_jk_k),
                    Opening_JH1: formatNumber(item.rcv_jh1),
                    Opening_SP1: formatNumber(item.rcv_sp1),
                    Borma_JJH: formatNumber(item.issue_add_4),
                    Borma_SJH: formatNumber(item.issue_add_5),
                    Borma_SJH1: formatNumber(item.issue_add_6),
                    Borma_JK_K: formatNumber(item.issue_add_8),
                    Borma_JH1: formatNumber(item.issue_add_7),
                    Borma_SP1: formatNumber(item.issue_add_9),
                    Receive_Peeling: Number(formatNumber(item.rcv_jjh)) + Number(formatNumber(item.rcv_sjh)) + Number(formatNumber(item.rcv_sjh1))
                        + Number(formatNumber(item.rcv_jk_k)) + Number(formatNumber(item.rcv_jh1)) + Number(formatNumber(item.rcv_sp1)),
                    Borma_Peeling: Number(formatNumber(item.issue_add_4)) + Number(formatNumber(item.issue_add_5)) + Number(formatNumber(item.issue_add_6)) +
                        Number(formatNumber(item.issue_add_7)) + Number(formatNumber(item.issue_add_8)) + Number(formatNumber(item.issue_add_9)),
                    Borma_Loss_Kg: formatNumber(item.issue_add_2),
                    Borma_Loss_Percentage: formatNumber(item.issue_add_3),
                    Receive_BigTaiho: item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) : 0,
                    Receive_Total: formatNumber((parseFloat(item.issue_add_4) + parseFloat(item.issue_add_5) + parseFloat(item.issue_add_6)
                        + parseFloat(item.issue_add_7) + parseFloat(item.issue_add_8) + parseFloat(item.issue_add_9) + item.rcv_bigTaiho ? parseFloat(item.rcv_bigTaiho) : 0).toString()),
                    issue_SJH: formatNumber(item.issue_sjh),
                    issue_JJH: formatNumber(item.issue_jjh),
                    issue_JJH1: formatNumber(item.issue_jjh1),
                    issue_jk: formatNumber(item.issue_jk),
                    issue_jk1: formatNumber(item.issue_jk1),
                    issue_k: formatNumber(item.issue_k),
                    issue_k1: formatNumber(item.issue_k1),
                    issue_lwp: formatNumber(item.issue_lwp),
                    issue_lwp1: formatNumber(item.issue_lwp1),
                    issue_s: formatNumber(item.issue_s),
                    issue_ss: formatNumber(item.issue_ss),
                    issue_yk: formatNumber(item.issue_yk),
                    issue_sp2: formatNumber(item.issue_sp2),
                    issue_kp: formatNumber(item.issue_kp),

                    issue_in_k: formatNumber(item.issue_in_k),
                    issue_in_jh: formatNumber(item.issue_in_jh),
                    issue_V_sjh: formatNumber(item.issue_V_sjh),
                    issue_V_k: formatNumber(item.issue_V_k),
                    issue_V_k1: formatNumber(item.issue_V_k1),
                    issue_V_lwp: formatNumber(item.issue_V_lwp),
                    issue_V_lwp1: formatNumber(item.issue_V_lwp1),
                    issue_V_jk: formatNumber(item.issue_V_jk),
                    issue_V_jk1: formatNumber(item.issue_V_jk1),
                    issue_V_ss: formatNumber(item.issue_V_ss),
                    issue_V_sp: formatNumber(item.issue_V_sp),
                    issue_V_sp2: formatNumber(item.issue_V_sp2),
                    issue_V_jh1: formatNumber(item.issue_V_jh1),
                    issue_V_yk: formatNumber(item.issue_V_yk),
                    issue_V_m_jk1: formatNumber(item.issue_V_m_jk1),
                    issue_ext_grade_1: formatNumber(item.issue_ext_grade_1),
                    issue_ext_grade_2: formatNumber(item.issue_ext_grade_2),
                    issue_ext_grade_3: formatNumber(item.issue_ext_grade_3),
                    issue_ext_grade_4: formatNumber(item.issue_ext_grade_4),
                    issue_ext_grade_5: formatNumber(item.issue_ext_grade_5),
                    issue_ext_grade_6: formatNumber(item.issue_ext_grade_6),
                    issue_ext_grade_7: formatNumber(item.issue_ext_grade_7),
                    issue_ext_grade_8: formatNumber(item.issue_ext_grade_8),
                    issue_ext_grade_9: formatNumber(item.issue_ext_grade_9),
                    issue_ext_grade_10: formatNumber(item.issue_ext_grade_10),

                    Issue_Packing: formatNumber((
                        parseFloat(item.issue_jjh) + parseFloat(item.issue_jjh1) +
                        parseFloat(item.issue_sjh) + parseFloat(item.issue_jk) + parseFloat(item.issue_jk1) +
                        parseFloat(item.issue_k) + parseFloat(item.issue_k1) + parseFloat(item.issue_lwp) +
                        parseFloat(item.issue_lwp1) + parseFloat(item.issue_s) + parseFloat(item.issue_ss) +
                        parseFloat(item.issue_k) + parseFloat(item.issue_yk) + parseFloat(item.issue_sp2) +
                        parseFloat(item.issue_kp) + parseFloat(item.issue_in_k) +
                        parseFloat(item.issue_in_jh) +
                        parseFloat(item.issue_V_sjh) +
                        parseFloat(item.issue_V_k) +
                        parseFloat(item.issue_V_k1) +
                        parseFloat(item.issue_V_lwp) +
                        parseFloat(item.issue_V_lwp1) +
                        parseFloat(item.issue_V_jk) +
                        parseFloat(item.issue_V_jk1) +
                        parseFloat(item.issue_V_ss) +
                        parseFloat(item.issue_V_sp) +
                        parseFloat(item.issue_V_sp2) +
                        parseFloat(item.issue_V_jh1) +
                        parseFloat(item.issue_V_yk) +
                        parseFloat(item.issue_V_m_jk1) +
                        parseFloat(item.issue_ext_grade_1) +
                        parseFloat(item.issue_ext_grade_2) +
                        parseFloat(item.issue_ext_grade_3) +
                        parseFloat(item.issue_ext_grade_4) +
                        parseFloat(item.issue_ext_grade_5) +
                        parseFloat(item.issue_ext_grade_6) +
                        parseFloat(item.issue_ext_grade_7) +
                        parseFloat(item.issue_ext_grade_8) +
                        parseFloat(item.issue_ext_grade_9) +
                        parseFloat(item.issue_ext_grade_10)
                    ).toString()),
                    issue_village: formatNumber(item.issue_village),
                    issue_mayur: formatNumber(item.issue_mayur),
                    issue_bigTaiho: formatNumber(item.issue_bigTaiho),
                    issue_dpds: formatNumber(item.issue_dpds),
                    issue_rejection: formatNumber(item.issue_rejection),
                    Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),

                    Labour: item.noOfdayOperators,


                    Edit_Status: item.editStatus,
                    Created_By: item.CreatedBy,
                    Modified_By: item.modifiedBy

                }));
                //setTransformedData(transformed);
                ws = XLSX.utils.json_to_sheet(transformed);
            }
            else {
                transformed = data1.rcnEntries.map((item: SortingData, idx: number) => ({
                    Sl_No: idx + 1,
                    Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                    Item_Lot_No: item.LotNo,
                    Origin: item.origin,
                    Issue_No: item.altid,
                    Sorting_Entry_Date: handletimezone(item.date),
                    Mixing_Lot: item.mixingLot,
                    Opening_JJH: formatNumber(item.rcv_jjh),
                    Opening_SJH: formatNumber(item.rcv_sjh),
                    Opening_SJH1: formatNumber(item.rcv_sjh1),
                    Opening_JK_K: formatNumber(item.rcv_jk_k),
                    Opening_JH1: formatNumber(item.rcv_jh1),
                    Opening_SP1: formatNumber(item.rcv_sp1),
                    Borma_JJH: formatNumber(item.issue_add_4),
                    Borma_SJH: formatNumber(item.issue_add_5),
                    Borma_SJH1: formatNumber(item.issue_add_6),
                    Borma_JK_K: formatNumber(item.issue_add_8),
                    Borma_JH1: formatNumber(item.issue_add_7),
                    Borma_SP1: formatNumber(item.issue_add_9),
                    Receive_Peeling: Number(formatNumber(item.rcv_jjh)) + Number(formatNumber(item.rcv_sjh)) + Number(formatNumber(item.rcv_sjh1))
                        + Number(formatNumber(item.rcv_jk_k)) + Number(formatNumber(item.rcv_jh1)) + Number(formatNumber(item.rcv_sp1)),
                    Borma_Peeling: Number(formatNumber(item.issue_add_4)) + Number(formatNumber(item.issue_add_5)) + Number(formatNumber(item.issue_add_6)) +
                        Number(formatNumber(item.issue_add_7)) + Number(formatNumber(item.issue_add_8)) + Number(formatNumber(item.issue_add_9)),
                    Borma_Loss_Kg: formatNumber(item.issue_add_2),
                    Borma_Loss_Percentage: formatNumber(item.issue_add_3),
                    Receive_BigTaiho: item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) : 0,
                    Receive_Total: formatNumber((parseFloat(item.issue_add_4) + parseFloat(item.issue_add_5) + parseFloat(item.issue_add_6)
                        + parseFloat(item.issue_add_7) + parseFloat(item.issue_add_8) + parseFloat(item.issue_add_9) + item.rcv_bigTaiho ? parseFloat(item.rcv_bigTaiho) : 0).toString()),
                    issue_SJH: formatNumber(item.issue_sjh),
                    issue_JJH: formatNumber(item.issue_jjh),
                    issue_JJH1: formatNumber(item.issue_jjh1),
                    issue_jk: formatNumber(item.issue_jk),
                    issue_jk1: formatNumber(item.issue_jk1),
                    issue_k: formatNumber(item.issue_k),
                    issue_k1: formatNumber(item.issue_k1),
                    issue_lwp: formatNumber(item.issue_lwp),
                    issue_lwp1: formatNumber(item.issue_lwp1),
                    issue_s: formatNumber(item.issue_s),
                    issue_ss: formatNumber(item.issue_ss),
                    issue_yk: formatNumber(item.issue_yk),
                    issue_sp2: formatNumber(item.issue_sp2),
                    issue_kp: formatNumber(item.issue_kp),

                    issue_in_k: formatNumber(item.issue_in_k),
                    issue_in_jh: formatNumber(item.issue_in_jh),
                    issue_V_sjh: formatNumber(item.issue_V_sjh),
                    issue_V_k: formatNumber(item.issue_V_k),
                    issue_V_k1: formatNumber(item.issue_V_k1),
                    issue_V_lwp: formatNumber(item.issue_V_lwp),
                    issue_V_lwp1: formatNumber(item.issue_V_lwp1),
                    issue_V_jk: formatNumber(item.issue_V_jk),
                    issue_V_jk1: formatNumber(item.issue_V_jk1),
                    issue_V_ss: formatNumber(item.issue_V_ss),
                    issue_V_sp: formatNumber(item.issue_V_sp),
                    issue_V_sp2: formatNumber(item.issue_V_sp2),
                    issue_V_jh1: formatNumber(item.issue_V_jh1),
                    issue_V_yk: formatNumber(item.issue_V_yk),
                    issue_V_m_jk1: formatNumber(item.issue_V_m_jk1),
                    issue_ext_grade_1: formatNumber(item.issue_ext_grade_1),
                    issue_ext_grade_2: formatNumber(item.issue_ext_grade_2),
                    issue_ext_grade_3: formatNumber(item.issue_ext_grade_3),
                    issue_ext_grade_4: formatNumber(item.issue_ext_grade_4),
                    issue_ext_grade_5: formatNumber(item.issue_ext_grade_5),
                    issue_ext_grade_6: formatNumber(item.issue_ext_grade_6),
                    issue_ext_grade_7: formatNumber(item.issue_ext_grade_7),
                    issue_ext_grade_8: formatNumber(item.issue_ext_grade_8),
                    issue_ext_grade_9: formatNumber(item.issue_ext_grade_9),
                    issue_ext_grade_10: formatNumber(item.issue_ext_grade_10),

                    Issue_Packing: formatNumber((
                        parseFloat(item.issue_jjh) + parseFloat(item.issue_jjh1) +
                        parseFloat(item.issue_sjh) + parseFloat(item.issue_jk) + parseFloat(item.issue_jk1) +
                        parseFloat(item.issue_k) + parseFloat(item.issue_k1) + parseFloat(item.issue_lwp) +
                        parseFloat(item.issue_lwp1) + parseFloat(item.issue_s) + parseFloat(item.issue_ss) +
                        parseFloat(item.issue_k) + parseFloat(item.issue_yk) + parseFloat(item.issue_sp2) +
                        parseFloat(item.issue_kp) + parseFloat(item.issue_in_k) +
                        parseFloat(item.issue_in_jh) +
                        parseFloat(item.issue_V_sjh) +
                        parseFloat(item.issue_V_k) +
                        parseFloat(item.issue_V_k1) +
                        parseFloat(item.issue_V_lwp) +
                        parseFloat(item.issue_V_lwp1) +
                        parseFloat(item.issue_V_jk) +
                        parseFloat(item.issue_V_jk1) +
                        parseFloat(item.issue_V_ss) +
                        parseFloat(item.issue_V_sp) +
                        parseFloat(item.issue_V_sp2) +
                        parseFloat(item.issue_V_jh1) +
                        parseFloat(item.issue_V_yk) +
                        parseFloat(item.issue_V_m_jk1) +
                        parseFloat(item.issue_ext_grade_1) +
                        parseFloat(item.issue_ext_grade_2) +
                        parseFloat(item.issue_ext_grade_3) +
                        parseFloat(item.issue_ext_grade_4) +
                        parseFloat(item.issue_ext_grade_5) +
                        parseFloat(item.issue_ext_grade_6) +
                        parseFloat(item.issue_ext_grade_7) +
                        parseFloat(item.issue_ext_grade_8) +
                        parseFloat(item.issue_ext_grade_9) +
                        parseFloat(item.issue_ext_grade_10)
                    ).toString()),

                    issue_village: formatNumber(item.issue_village),
                    issue_mayur: formatNumber(item.issue_mayur),
                    issue_bigTaiho: formatNumber(item.issue_bigTaiho),
                    issue_dpds: formatNumber(item.issue_dpds),
                    issue_rejection: formatNumber(item.issue_rejection),
                    Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),

                    Labour: item.noOfdayOperators,

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
            saveAs(blob, 'Sorting_Entry_' + currDate + '.xlsx');
        }

    }
    const handleSearch = async () => {

        setEditData([])
        setblockpagen('flex')
        if (searchType === 'LOT') {
        const response = await axios.put('/api/sorting/sortingprimarysearch', {
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
        const response = await axios.put('/api/sorting/sortingprimarysearch', {
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
         const response = await axios.put('/api/sorting/sortingprimarysearch', {
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
        if (editSortingLotWiseData.length > 0) {
            //console.log(editPendingData)
            setEditData(editSortingLotWiseData)
            setblockpagen('none')
        }

    },[editSortingLotWiseData])
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
 
    const handleApprove = async (item: SortingData) => {
        const response = await axios.put(`/api/sorting/approveeditSorting/${item.id}/${item.LotNo}/${item.origin}`)
        const data = await response.data
        if (data.message === "Edit Request of Sorting Entry is Approved Successfully") {

            if (approvesuccessdialog != null) {
                (approvesuccessdialog as any).showModal();
            }
        }
    }
    const handleRejection = async (item: SortingData) => {
        const response = await axios.delete(`/api/sorting/rejectededitSorting/${item.id}/${item.LotNo}/${item.origin}`)
        const data = await response.data
        console.log(data)
        if (data.message === "Sorting Entry rejected successfully") {
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
            {checkpending('Sorting') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}
            <Table className="mt-4">
                <TableHeader className="bg-neutral-200 text-stone-950 ">


                    <TableHead className="text-center" >Id</TableHead>
                    <TableHead className="text-center" >Issue_Type</TableHead>
                    
                    <TableHead className="text-center" >Item_Lot_No</TableHead>
                    <TableHead className="text-center" >Origin</TableHead>
                    <TableHead className="text-center" >Issue_No</TableHead>
                    <TableHead className="text-center" >Sorting_Entry_Date</TableHead>
                    <TableHead className="text-center font-bold">Current_Backlog</TableHead>  
                    <TableHead className="text-center" >Incoming_Mixed_Lot_&_Origin</TableHead>
                    <TableHead className="text-center" >Action</TableHead>
                    {/* <TableHead className="text-center" >Mixed Amount</TableHead> */}
                    <TableHead className="text-center">Opening JJH</TableHead>
                    <TableHead className="text-center">Opening SJH</TableHead>
                    
                    <TableHead className="text-center">Opening SJH1</TableHead>
                    <TableHead className="text-center">Opening JH1</TableHead>
                    <TableHead className="text-center">Opening JK_K</TableHead>
                    <TableHead className="text-center">Opening SP1</TableHead>
                    <TableHead className="text-center">Opening Peeling</TableHead>
                    <TableHead className="text-center">Borma_Loss(Kg)</TableHead>
                    <TableHead className="text-center">Borma_Loss(%)</TableHead>
                    
                    <TableHead className="text-center"> JJH (Borma)</TableHead>
                <TableHead className="text-center"> SJH (Borma)</TableHead>
                <TableHead className="text-center"> SJH1 (Borma)</TableHead>
                <TableHead className="text-center"> JH1 (Borma)</TableHead>
                <TableHead className="text-center"> JK_K (Borma)</TableHead>
                <TableHead className="text-center"> SP1 (Borma)</TableHead>
                <TableHead className="text-center">Receive Peeling(Borma)</TableHead>
                    <TableHead className="text-center">Receive BigTaiho</TableHead>
                    <TableHead className="text-center">Sorting_Total_Opening (Borma)</TableHead>
                    <TableHead className="text-center">Issue JJH</TableHead>
                    <TableHead className="text-center">Issue JJH1</TableHead>
                    <TableHead className="text-center">Issue SJH</TableHead>
                    <TableHead className="text-center">Issue JK</TableHead>
                    <TableHead className="text-center">Issue JK1</TableHead>
                    <TableHead className="text-center">Issue K</TableHead>
                    <TableHead className="text-center">Issue K1</TableHead>
                    <TableHead className="text-center">Issue LWP</TableHead>
                    <TableHead className="text-center">Issue LWP1</TableHead>
                    <TableHead className="text-center">Issue S</TableHead>
                    <TableHead className="text-center">Issue SS</TableHead>
                    <TableHead className="text-center">Issue YK</TableHead>
                    <TableHead className="text-center">Issue SP2</TableHead>
                    <TableHead className="text-center">Issue KP</TableHead>
                            <TableHead className="text-center">Issue IN_K</TableHead>
                                        <TableHead className="text-center">Issue IN_JH</TableHead>
                      <TableHead className="text-center">Lot_Village Seperator</TableHead>
                      <TableHead className="text-center">Issue V_SJH</TableHead>
                      <TableHead className="text-center">Issue V_K</TableHead>
                      <TableHead className="text-center">Issue V_K1</TableHead>
                      <TableHead className="text-center">Issue V_LWP</TableHead>
                      <TableHead className="text-center">Issue V_LWP1</TableHead>
                      <TableHead className="text-center">Issue V_JK</TableHead>
                      <TableHead className="text-center">Issue V_JK1</TableHead>
                      <TableHead className="text-center">Issue V_SS</TableHead>
                      <TableHead className="text-center">Issue V_SP</TableHead>
                      <TableHead className="text-center">Issue V_SP2</TableHead>
                      <TableHead className="text-center">Issue V_JH1</TableHead>
                      <TableHead className="text-center">Issue V_YK</TableHead>
                      <TableHead className="text-center">Issue V_M_JK1</TableHead>       
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
                    <TableHead className="text-center">Issue Mayur</TableHead>
                    <TableHead className="text-center">Issue BigTaiho</TableHead>
                    <TableHead className="text-center">Issue DPDS</TableHead>
                    <TableHead className="text-center">Issue Rejection</TableHead>
                    <TableHead className="text-center font-bold">Sorting_Total_Issue</TableHead>
                    {/* <TableHead className="text-center">Entry_Backlog</TableHead> */}
                    
                    <TableHead className="text-center">No of Labour</TableHead>
                    {/* <TableHead className="text-center">Operator_Night</TableHead>
                */}
                    <TableHead className="text-center" >Edit Status </TableHead>
                    <TableHead className="text-center" >Created By </TableHead>
                    
                </TableHeader>
                <TableBody>


                    {EditData.length > 0 ? (EditData.map((item: SortingData, idx) => {

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
                                    <TableCell className="text-center ">{formatNumber(item.rcv_jjh)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.rcv_sjh)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.rcv_sjh1)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.rcv_jh1)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.rcv_jk_k)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.rcv_sp1)}</TableCell>
                                    <TableCell className="text-center font-semibold ">{formatNumber((parseFloat(item.rcv_jjh) +
                                     parseFloat(item.rcv_sjh)+parseFloat(item.rcv_sjh1)+parseFloat(item.rcv_jh1)+parseFloat(item.rcv_jk_k)+
                                     parseFloat(item.rcv_sp1)).toString())}</TableCell>
                                     <TableCell className="text-center font-semibold  text-red-500">{formatNumber(item.issue_add_2)} Kg</TableCell>
                                    <TableCell className="text-center font-bold text-red-500 ">{formatNumber(item.issue_add_3)} %</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_add_4)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_add_5)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_add_6)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_add_7)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_add_8)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_add_9)}</TableCell>
                                    <TableCell className="text-center text-center bg-yellow-100 font-semibold">
                                    {formatNumber((parseFloat(item.issue_add_4) +parseFloat(item.issue_add_5)+parseFloat(item.issue_add_6)
                                +parseFloat(item.issue_add_7) +parseFloat(item.issue_add_8)+parseFloat(item.issue_add_9)).toString())}
                                    </TableCell>
                                    <TableCell className="text-center font-bold bg-yellow-100 ">{item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) :0}</TableCell>
                                    <TableCell className="text-center font-bold bg-green-500 text-white">{formatNumber((parseFloat(item.issue_add_4) +parseFloat(item.issue_add_5)+parseFloat(item.issue_add_6)
                                +parseFloat(item.issue_add_7) +parseFloat(item.issue_add_8)+parseFloat(item.issue_add_9)+(item.rcv_bigTaiho ? parseFloat(item.rcv_bigTaiho) :0)).toString())
                                } Kg</TableCell>

                                    
                                    
                                    <TableCell className="text-center  ">{formatNumber(item.issue_jjh)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_jjh1)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_sjh)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_jk)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_jk1)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_k)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_k1)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_lwp)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_lwp1)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_s)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_ss)}</TableCell>
                                   
                                    <TableCell className="text-center ">{formatNumber(item.issue_yk)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_sp2)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_kp)}</TableCell>
                                    <TableCell className="text-center">{formatNumber(item.issue_in_k)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_in_jh)}</TableCell>

 <TableCell className="text-center font-semibold bg-neutral-500 text-white">Lot---Vil</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_sjh)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_k)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_k1)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_lwp)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_lwp1)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_jk)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_jk1)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_ss)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_sp)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_sp2)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_jh1)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_yk)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_m_jk1)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber((
                                     parseFloat(item.issue_jjh)+parseFloat(item.issue_jjh1)+
                                     parseFloat(item.issue_sjh) +parseFloat(item.issue_jk)+parseFloat(item.issue_jk1)+
                                      +parseFloat(item.issue_k1)+parseFloat(item.issue_lwp)+
                                     parseFloat(item.issue_lwp1) +parseFloat(item.issue_s)+parseFloat(item.issue_ss)+
                                     parseFloat(item.issue_k) +parseFloat(item.issue_yk)+parseFloat(item.issue_sp2)+
                                     parseFloat(item.issue_kp) +parseFloat(item.issue_in_k) +
                                     parseFloat(item.issue_in_jh) +
                                     parseFloat(item.issue_V_sjh) +
                                     parseFloat(item.issue_V_k) +
                                     parseFloat(item.issue_V_k1) +
                                     parseFloat(item.issue_V_lwp) +
                                     parseFloat(item.issue_V_lwp1) +
                                     parseFloat(item.issue_V_jk) +
                                     parseFloat(item.issue_V_jk1) +
                                     parseFloat(item.issue_V_ss) +
                                     parseFloat(item.issue_V_sp) +
                                     parseFloat(item.issue_V_sp2) +
                                     parseFloat(item.issue_V_jh1) +
                                     parseFloat(item.issue_V_yk) +
                                     parseFloat(item.issue_V_m_jk1) +
                                     parseFloat(item.issue_ext_grade_1) +
                                     parseFloat(item.issue_ext_grade_2) +
                                     parseFloat(item.issue_ext_grade_3) +
                                     parseFloat(item.issue_ext_grade_4) +
                                     parseFloat(item.issue_ext_grade_5) +
                                     parseFloat(item.issue_ext_grade_6) +
                                     parseFloat(item.issue_ext_grade_7) +
                                     parseFloat(item.issue_ext_grade_8) +
                                     parseFloat(item.issue_ext_grade_9) +
                                     parseFloat(item.issue_ext_grade_10)
                                     ).toString())}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_village)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_mayur)}</TableCell>
                                    
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_bigTaiho)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_dpds)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_rejection)}</TableCell>
                     
                                    {/* <TableCell className="text-center font-semibold text-blue-600">{formatNumber(item.entry_backlog)} kg</TableCell> */}
                                    <TableCell className="text-center font-bold bg-yellow-500 text-white">{formatNumber((
                                     parseFloat(item.issue_jjh)+parseFloat(item.issue_jjh1)+
                                     parseFloat(item.issue_sjh) +parseFloat(item.issue_jk)+parseFloat(item.issue_jk1)+
                                      +parseFloat(item.issue_k1)+parseFloat(item.issue_lwp)+
                                     parseFloat(item.issue_lwp1) +parseFloat(item.issue_s)+parseFloat(item.issue_ss)+
                                     parseFloat(item.issue_k) +parseFloat(item.issue_yk)+parseFloat(item.issue_sp2)+
                                     parseFloat(item.issue_village) +parseFloat(item.issue_mayur)+parseFloat(item.issue_bigTaiho)+
                                     parseFloat(item.issue_bigTaiho) +parseFloat(item.issue_rejection)+
                                     parseFloat(item.issue_kp) +parseFloat(item.issue_in_k) +
                                     parseFloat(item.issue_in_jh) +
                                     parseFloat(item.issue_V_sjh) +
                                     parseFloat(item.issue_V_k) +
                                     parseFloat(item.issue_V_k1) +
                                     parseFloat(item.issue_V_lwp) +
                                     parseFloat(item.issue_V_lwp1) +
                                     parseFloat(item.issue_V_jk) +
                                     parseFloat(item.issue_V_jk1) +
                                     parseFloat(item.issue_V_ss) +
                                     parseFloat(item.issue_V_sp) +
                                     parseFloat(item.issue_V_sp2) +
                                     parseFloat(item.issue_V_jh1) +
                                     parseFloat(item.issue_V_yk) +
                                     parseFloat(item.issue_V_m_jk1) +
                                     parseFloat(item.issue_ext_grade_1) +
                                     parseFloat(item.issue_ext_grade_2) +
                                     parseFloat(item.issue_ext_grade_3) +
                                     parseFloat(item.issue_ext_grade_4) +
                                     parseFloat(item.issue_ext_grade_5) +
                                     parseFloat(item.issue_ext_grade_6) +
                                     parseFloat(item.issue_ext_grade_7) +
                                     parseFloat(item.issue_ext_grade_8) +
                                     parseFloat(item.issue_ext_grade_9) +
                                     parseFloat(item.issue_ext_grade_10)
                                     ).toString())} Kg</TableCell>     
                                  
                            
                        <TableCell className="text-center">{item.noOfdayOperators}</TableCell>
                        {/* <TableCell className="text-center">{item.noOfnightOperators}</TableCell> */}
                                    <TableCell className="text-center">{item.editStatus}</TableCell>
                                    <TableCell className="text-center">{item.CreatedBy}</TableCell>

                           
                            </TableRow>
                        ) })): (
                        Data.length > 0 ? (Data.map((item: SortingData, idx) => {
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
                                                                <p className='text-1xl pb-1 text-center mt-1'>Sorting Entry Modification</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <SortingEditForm borma={[item]} />
                                                    </DialogContent>
                                                    
                                                </Dialog>
                                                {Number(item.current_backlog) > 0 && <Dialog>
                                                    <DialogTrigger className="flex"><CiBoxes size={20} />
                                                        <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Re-Issue</button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-screen">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <p className='text-1xl pb-1 text-center mt-1'>Sorting Entry Re-issue</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <RCNSortingReCreateForm borma={[item]} />
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
                                                        <RCNSortingReMix borma={item} />
                                                    </DialogContent>
                                                    
                                                </Dialog>}
                                            </PopoverContent>
                                            
                                        </Popover>
                                    </TableCell>
                                    {/* <TableCell className="text-center ">{item.rcv_transfer ? formatNumber(item.rcv_transfer):''}</TableCell> */}
                                    <TableCell className="text-center ">{formatNumber(item.rcv_jjh)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.rcv_sjh)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.rcv_sjh1)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.rcv_jh1)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.rcv_jk_k)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.rcv_sp1)}</TableCell>
                                    <TableCell className="text-center font-semibold ">{formatNumber((parseFloat(item.rcv_jjh) +
                                     parseFloat(item.rcv_sjh)+parseFloat(item.rcv_sjh1)+parseFloat(item.rcv_jh1)+parseFloat(item.rcv_jk_k)+
                                     parseFloat(item.rcv_sp1)).toString())}</TableCell>
                                     <TableCell className="text-center font-semibold  text-red-500">{formatNumber(item.issue_add_2)} Kg</TableCell>
                                    <TableCell className="text-center font-bold text-red-500 ">{formatNumber(item.issue_add_3)} %</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_add_4)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_add_5)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_add_6)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_add_7)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_add_8)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_add_9)}</TableCell>
                                    <TableCell className="text-center text-center bg-yellow-100 font-semibold">
                                    {formatNumber((parseFloat(item.issue_add_4) +parseFloat(item.issue_add_5)+parseFloat(item.issue_add_6)
                                +parseFloat(item.issue_add_7) +parseFloat(item.issue_add_8)+parseFloat(item.issue_add_9)).toString())}
                                    </TableCell>
                                    <TableCell className="text-center font-bold bg-yellow-100 ">{item.rcv_bigTaiho ? formatNumber(item.rcv_bigTaiho) :0}</TableCell>
                                    <TableCell className="text-center font-bold bg-green-500 text-white">{formatNumber((parseFloat(item.issue_add_4) +parseFloat(item.issue_add_5)+parseFloat(item.issue_add_6)
                                +parseFloat(item.issue_add_7) +parseFloat(item.issue_add_8)+parseFloat(item.issue_add_9)+(item.rcv_bigTaiho ? parseFloat(item.rcv_bigTaiho) :0)).toString())
                                } Kg</TableCell>

                                    
                                    
                                    <TableCell className="text-center  ">{formatNumber(item.issue_jjh)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_jjh1)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_sjh)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_jk)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_jk1)}</TableCell>
                                    <TableCell className="text-center  ">{formatNumber(item.issue_k)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_k1)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_lwp)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_lwp1)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_s)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_ss)}</TableCell>
                                   
                                    <TableCell className="text-center ">{formatNumber(item.issue_yk)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_sp2)}</TableCell>
                                    <TableCell className="text-center ">{formatNumber(item.issue_kp)}</TableCell>
                                    <TableCell className="text-center">{formatNumber(item.issue_in_k)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_in_jh)}</TableCell>

 <TableCell className="text-center font-semibold bg-neutral-500 text-white">Lot---Vil</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_sjh)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_k)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_k1)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_lwp)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_lwp1)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_jk)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_jk1)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_ss)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_sp)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_sp2)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_jh1)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_yk)}</TableCell>
<TableCell className="text-center">{formatNumber(item.issue_V_m_jk1)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber((
                                     parseFloat(item.issue_jjh)+parseFloat(item.issue_jjh1)+
                                     parseFloat(item.issue_sjh) +parseFloat(item.issue_jk)+parseFloat(item.issue_jk1)+
                                      +parseFloat(item.issue_k1)+parseFloat(item.issue_lwp)+
                                     parseFloat(item.issue_lwp1) +parseFloat(item.issue_s)+parseFloat(item.issue_ss)+
                                     parseFloat(item.issue_k) +parseFloat(item.issue_yk)+parseFloat(item.issue_sp2)+
                                     parseFloat(item.issue_kp)+parseFloat(item.issue_in_k) +
                                     parseFloat(item.issue_in_jh) +
                                     parseFloat(item.issue_V_sjh) +
                                     parseFloat(item.issue_V_k) +
                                     parseFloat(item.issue_V_k1) +
                                     parseFloat(item.issue_V_lwp) +
                                     parseFloat(item.issue_V_lwp1) +
                                     parseFloat(item.issue_V_jk) +
                                     parseFloat(item.issue_V_jk1) +
                                     parseFloat(item.issue_V_ss) +
                                     parseFloat(item.issue_V_sp) +
                                     parseFloat(item.issue_V_sp2) +
                                     parseFloat(item.issue_V_jh1) +
                                     parseFloat(item.issue_V_yk) +
                                     parseFloat(item.issue_V_m_jk1) +
                                     parseFloat(item.issue_ext_grade_1) +
                                     parseFloat(item.issue_ext_grade_2) +
                                     parseFloat(item.issue_ext_grade_3) +
                                     parseFloat(item.issue_ext_grade_4) +
                                     parseFloat(item.issue_ext_grade_5) +
                                     parseFloat(item.issue_ext_grade_6) +
                                     parseFloat(item.issue_ext_grade_7) +
                                     parseFloat(item.issue_ext_grade_8) +
                                     parseFloat(item.issue_ext_grade_9) +
                                     parseFloat(item.issue_ext_grade_10)
                                      ).toString())}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_village)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_mayur)}</TableCell>
                                    
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_bigTaiho)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_dpds)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_rejection)}</TableCell>
                     
                                    {/* <TableCell className="text-center font-semibold text-blue-600">{formatNumber(item.entry_backlog)} kg</TableCell> */}
                                    <TableCell className="text-center font-bold bg-yellow-500 text-white">{formatNumber((
                                     parseFloat(item.issue_jjh)+parseFloat(item.issue_jjh1)+
                                     parseFloat(item.issue_sjh) +parseFloat(item.issue_jk)+parseFloat(item.issue_jk1)+
                                      +parseFloat(item.issue_k1)+parseFloat(item.issue_lwp)+
                                     parseFloat(item.issue_lwp1) +parseFloat(item.issue_s)+parseFloat(item.issue_ss)+
                                     parseFloat(item.issue_k) +parseFloat(item.issue_yk)+parseFloat(item.issue_sp2)+
                                     parseFloat(item.issue_village) +parseFloat(item.issue_mayur)+parseFloat(item.issue_bigTaiho)+
                                     parseFloat(item.issue_bigTaiho) +parseFloat(item.issue_rejection)+
                                     parseFloat(item.issue_kp) +parseFloat(item.issue_in_k) +
                                     parseFloat(item.issue_in_jh) +
                                     parseFloat(item.issue_V_sjh) +
                                     parseFloat(item.issue_V_k) +
                                     parseFloat(item.issue_V_k1) +
                                     parseFloat(item.issue_V_lwp) +
                                     parseFloat(item.issue_V_lwp1) +
                                     parseFloat(item.issue_V_jk) +
                                     parseFloat(item.issue_V_jk1) +
                                     parseFloat(item.issue_V_ss) +
                                     parseFloat(item.issue_V_sp) +
                                     parseFloat(item.issue_V_sp2) +
                                     parseFloat(item.issue_V_jh1) +
                                     parseFloat(item.issue_V_yk) +
                                     parseFloat(item.issue_V_m_jk1) +
                                     parseFloat(item.issue_ext_grade_1) +
                                     parseFloat(item.issue_ext_grade_2) +
                                     parseFloat(item.issue_ext_grade_3) +
                                     parseFloat(item.issue_ext_grade_4) +
                                     parseFloat(item.issue_ext_grade_5) +
                                     parseFloat(item.issue_ext_grade_6) +
                                     parseFloat(item.issue_ext_grade_7) +
                                     parseFloat(item.issue_ext_grade_8) +
                                     parseFloat(item.issue_ext_grade_9) +
                                     parseFloat(item.issue_ext_grade_10)
                                     ).toString())} Kg</TableCell>      
                            
                        <TableCell className="text-center">{item.noOfdayOperators}</TableCell>
                        {/* <TableCell className="text-center">{item.noOfnightOperators}</TableCell> */}
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

export default SortingTable;