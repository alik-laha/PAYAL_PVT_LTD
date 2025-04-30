import { useContext, useEffect, useState } from "react";
import { Origin, pagelimit, pageNo, pendingCheckRole } from "../common/exportData";
import Context from "../context/context";
import axios from "axios";
import { pendingCheckRoles, PermissionRole, WholesData } from "@/type/type";
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
import RCNWholesReMix from "./WholesMix";
// import RCNWholesReCreateForm from "./WholesRecreateForm";
import WholesEditForm from "./WholesModify";
import RCNWholesReCreateForm from "./WholesRecreateForm";


const WholesTable = () => {
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
    const [hidetodate, sethidetoDate] = useState<string>('');
    const currDate = new Date().toLocaleDateString();
    const [origin, setOrigin] = useState<string>("")
    const [blockpagen, setblockpagen] = useState('flex')
    const [EditData, setEditData] = useState<WholesData[]>([])
    const [blConNo, setBlConNo] = useState<string>("")
    const { editWholesLotWiseData } = useContext(Context);
    const [Data, setData] = useState<WholesData[]>([])
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
        const response = await axios.put('/api/wholes/wholesprimarysearch', {
            searchitem: blConNo,
            fromDate: fromdate,
            toDate: todate,
            origin: origin,
        })
        const data1 = await response.data

        let ws
        let transformed: any[] = [];
        if (EditData.length > 0) {
            transformed = EditData.map((item: WholesData, idx: number) => ({
                Sl_No: idx + 1,
                Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                Item_Lot_No: item.LotNo,
                Origin: item.origin,
                Issue_No: item.altid,
                Wholes_Entry_Date: handletimezone(item.date),
                Mixing_Lot: item.mixingLot,
                Receive_pw_210: item.rcv_pw_210,
                Receive_w_210: item.rcv_w_210,
                Receive_ww_210: item.rcv_ww_210,
                Receive_pw_240: item.rcv_pw_240,
                Receive_w_240: item.rcv_w_240,
                Receive_ww_240: item.rcv_ww_240,
                Receive_pw_280: item.rcv_pw_280,
                Receive_w_280: item.rcv_w_280,
                Receive_ww_280: item.rcv_ww_280,
                Receive_pw_320: item.rcv_pw_320,
                Receive_w_320: item.rcv_w_320,
                Receive_ww_320: item.rcv_ww_320,
                Receive_pw_360: item.rcv_pw_360,
                Receive_w_360: item.rcv_w_360,
                Receive_ww_360: item.rcv_ww_360,
                Receive_pw_400: item.rcv_pw_400,
                Receive_w_400: item.rcv_w_400,
                Receive_ww_400: item.rcv_ww_400,
                Receive_jb_mayur: item.rcv_jb_mayur,
                Receive_jb_hamsa: item.rcv_jb_hamsa,
                Receive_Total: formatNumber((parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
                    + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
                    + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
                    + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
                    + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
                    + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
                    + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa) + parseFloat((item.issue_add_2))).toString()),
                Receive_Total_Borma: formatNumber((parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
                    + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
                    + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
                    + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
                    + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
                    + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
                    + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa)).toString()),
                Borma_Loss_Kg: formatNumber(item.issue_add_2),
                Borma_Loss_Percentage: formatNumber(item.issue_add_3),
                Issue_pw_150: formatNumber(item.issue_pw_150),
                Issue_w_150: formatNumber(item.issue_w_150),
                Issue_ww_150: formatNumber(item.issue_ww_150),
                Issue_s_150: formatNumber(item.issue_s_150),
                Issue_aw_150: formatNumber(item.issue_aw_150),
                Issue_lw_150: formatNumber(item.issue_lw_150),
                Issue_pw_180: formatNumber(item.issue_pw_180),
                Issue_w_180: formatNumber(item.issue_w_180),
                Issue_ww_180: formatNumber(item.issue_ww_180),
                Issue_s_180: formatNumber(item.issue_s_180),
                Issue_aw_180: formatNumber(item.issue_aw_180),
                Issue_lw_180: formatNumber(item.issue_lw_180),
                Issue_pw_210: formatNumber(item.issue_pw_210),
                Issue_w_210: formatNumber(item.issue_w_210),
                Issue_ww_210: formatNumber(item.issue_ww_210),
                Issue_s_210: formatNumber(item.issue_s_210),
                Issue_aw_210: formatNumber(item.issue_aw_210),
                Issue_lw_210: formatNumber(item.issue_lw_210),
                Issue_pw_240: formatNumber(item.issue_pw_240),
                Issue_w_240: formatNumber(item.issue_w_240),
                Issue_ww_240: formatNumber(item.issue_ww_240),
                Issue_ww_240_A: formatNumber(item.issue_ww_240_A),
                Issue_aw_240: formatNumber(item.issue_aw_240),
                Issue_lw_240: formatNumber(item.issue_lw_240),
                Issue_pw_280: formatNumber(item.issue_pw_280),
                Issue_w_280: formatNumber(item.issue_w_280),
                Issue_ww_280: formatNumber(item.issue_ww_280),
                Issue_ww_280_A: formatNumber(item.issue_ww_280_A),
                Issue_aw_280: formatNumber(item.issue_aw_280),
                Issue_lw_280: formatNumber(item.issue_lw_280),
                Wholes_double: formatNumber(item.wholes_double),
                Issue_pw_320: formatNumber(item.issue_pw_320),
                Issue_w_320: formatNumber(item.issue_w_320),
                Issue_ww_320: formatNumber(item.issue_ww_320),
                Issue_ww_320_A: formatNumber(item.issue_ww_320_A),
                Issue_aw_320: formatNumber(item.issue_aw_320),
                Issue_lw_320: formatNumber(item.issue_lw_320),
                Issue_pw_360: formatNumber(item.issue_pw_360),
                Issue_w_360: formatNumber(item.issue_w_360),
                Issue_ww_360: formatNumber(item.issue_ww_360),
                Issue_ww_360_A: formatNumber(item.issue_ww_360_A),
                Issue_aw_360: formatNumber(item.issue_aw_360),
                Issue_lw_360: formatNumber(item.issue_lw_360),
                Issue_pw_400: formatNumber(item.issue_pw_400),
                Issue_w_400: formatNumber(item.issue_w_400),
                Issue_ww_400: formatNumber(item.issue_ww_400),
                Issue_ww_400_A: formatNumber(item.issue_ww_400_A),
                Issue_aw_400: formatNumber(item.issue_aw_400),
                Issue_lw_400: formatNumber(item.issue_lw_400),
                Issue_jjb: formatNumber(item.issue_jjb),
                Issue_jjb1: formatNumber(item.issue_jjb1),
                Issue_payal_240: formatNumber(item.issue_payal_240),
                Issue_payal_400: formatNumber(item.issue_payal_400),
                Issue_e_320_lot: formatNumber(item.issue_e_320_lot),
                Issue_e_400_lot: formatNumber(item.issue_e_400_lot),
                Issue_in_w_240: formatNumber(item.issue_in_w_240),
                Issue_in_w_320: formatNumber(item.issue_in_w_320),
                Issue_in_w_400: formatNumber(item.issue_in_w_400),

                Issue_a_150: formatNumber(item.issue_a_150),
                Issue_c_150: formatNumber(item.issue_c_150),
                Issue_e_150: formatNumber(item.issue_e_150),
                Issue_sw_150: formatNumber(item.issue_sw_150),
                Issue_ssw_150: formatNumber(item.issue_ssw_150),
                Issue_k_150: formatNumber(item.issue_k_150),

                Issue_a_180: formatNumber(item.issue_a_180),
                Issue_c_180: formatNumber(item.issue_c_180),
                Issue_e_180: formatNumber(item.issue_e_180),
                Issue_sw_180: formatNumber(item.issue_sw_180),
                Issue_ssw_180: formatNumber(item.issue_ssw_180),
                Issue_k_180: formatNumber(item.issue_k_180),

                Issue_a_210: formatNumber(item.issue_a_210),
                Issue_c_210: formatNumber(item.issue_c_210),
                Issue_e_210: formatNumber(item.issue_e_210),
                Issue_sw_210: formatNumber(item.issue_sw_210),
                Issue_ssw_210: formatNumber(item.issue_ssw_210),
                Issue_k_210: formatNumber(item.issue_k_210),

                Issue_a_240: formatNumber(item.issue_a_240),
                Issue_c_240: formatNumber(item.issue_c_240),
                Issue_e_240: formatNumber(item.issue_e_240),
                Issue_sw_240: formatNumber(item.issue_sw_240),
                Issue_ssw_240: formatNumber(item.issue_ssw_240),
                Issue_k_240: formatNumber(item.issue_k_240),

                Issue_a_280: formatNumber(item.issue_a_280),
                Issue_c_280: formatNumber(item.issue_c_280),
                Issue_e_280: formatNumber(item.issue_e_280),
                Issue_sw_280: formatNumber(item.issue_sw_280),
                Issue_ssw_280: formatNumber(item.issue_ssw_280),
                Issue_k_280: formatNumber(item.issue_k_280),

                Issue_a_320: formatNumber(item.issue_a_320),
                Issue_c_320: formatNumber(item.issue_c_320),
                Issue_e_320: formatNumber(item.issue_e_320),
                Issue_sw_320: formatNumber(item.issue_sw_320),
                Issue_ssw_320: formatNumber(item.issue_ssw_320),
                Issue_k_320: formatNumber(item.issue_k_320),

                Issue_a_360: formatNumber(item.issue_a_360),
                Issue_c_360: formatNumber(item.issue_c_360),
                Issue_e_360: formatNumber(item.issue_e_360),
                Issue_sw_360: formatNumber(item.issue_sw_360),
                Issue_ssw_360: formatNumber(item.issue_ssw_360),
                Issue_k_360: formatNumber(item.issue_k_360),

                Issue_a_400: formatNumber(item.issue_a_400),
                Issue_c_400: formatNumber(item.issue_c_400),
                Issue_e_400: formatNumber(item.issue_e_400),
                Issue_sw_400: formatNumber(item.issue_sw_400),
                Issue_ssw_400: formatNumber(item.issue_ssw_400),
                Issue_k_400: formatNumber(item.issue_k_400),
                Issue_rejection: formatNumber(item.issue_rejection),
                Issue_village: formatNumber(item.issue_village),
                Issue_bigTaiho: formatNumber(item.issue_bigTaiho),
                Issue_lw: formatNumber(item.issue_lw),
                Issue_Packing: formatNumber((parseFloat(item.issue_pw_150) + parseFloat(item.issue_w_150) + parseFloat(item.issue_ww_150)
                    + parseFloat(item.issue_s_150) + parseFloat(item.issue_aw_150) + parseFloat(item.issue_lw_150)
                    + parseFloat(item.issue_pw_180) + parseFloat(item.issue_w_180) + parseFloat(item.issue_ww_180)
                    + parseFloat(item.issue_s_180) + parseFloat(item.issue_aw_180) + parseFloat(item.issue_lw_180)
                    + parseFloat(item.issue_pw_210) + parseFloat(item.issue_w_210) + parseFloat(item.issue_ww_210)
                    + parseFloat(item.issue_s_210) + parseFloat(item.issue_aw_210) + parseFloat(item.issue_lw_210)
                    + parseFloat(item.issue_pw_240) + parseFloat(item.issue_w_240) + parseFloat(item.issue_ww_240)
                    + parseFloat(item.issue_ww_240_A) + parseFloat(item.issue_aw_240) + parseFloat(item.issue_lw_240)
                    + parseFloat(item.issue_pw_280) + parseFloat(item.issue_w_280) + parseFloat(item.issue_ww_280)
                    + parseFloat(item.issue_ww_280_A) + parseFloat(item.issue_aw_280) + parseFloat(item.issue_lw_280)
                    + parseFloat(item.wholes_double) + parseFloat(item.issue_pw_320) + parseFloat(item.issue_w_320)
                    + parseFloat(item.issue_ww_320) + parseFloat(item.issue_ww_320_A) + parseFloat(item.issue_aw_320)
                    + parseFloat(item.issue_lw_320) + parseFloat(item.issue_pw_360) + parseFloat(item.issue_w_360)
                    + parseFloat(item.issue_ww_360) + parseFloat(item.issue_ww_360_A) + parseFloat(item.issue_aw_360)
                    + parseFloat(item.issue_lw_360) + parseFloat(item.issue_pw_400) + parseFloat(item.issue_w_400)
                    + parseFloat(item.issue_ww_400) + parseFloat(item.issue_ww_400_A) + parseFloat(item.issue_aw_400) + parseFloat(item.issue_lw_400)
                    +parseFloat(item.issue_payal_240) +
                    parseFloat(item.issue_payal_400) +
                    parseFloat(item.issue_e_320_lot) +
                    parseFloat(item.issue_e_400_lot) +
                    parseFloat(item.issue_in_w_240) +
                    parseFloat(item.issue_in_w_320) +
                    parseFloat(item.issue_in_w_400) +
                    
                    parseFloat(item.issue_a_150) +
                    parseFloat(item.issue_c_150) +
                    parseFloat(item.issue_e_150) +
                    parseFloat(item.issue_sw_150) +
                    parseFloat(item.issue_ssw_150) +
                    parseFloat(item.issue_k_150) +
                    
                    parseFloat(item.issue_a_180) +
                    parseFloat(item.issue_c_180) +
                    parseFloat(item.issue_e_180) +
                    parseFloat(item.issue_sw_180) +
                    parseFloat(item.issue_ssw_180) +
                    parseFloat(item.issue_k_180) +
                    
                    parseFloat(item.issue_a_210) +
                    parseFloat(item.issue_c_210) +
                    parseFloat(item.issue_e_210) +
                    parseFloat(item.issue_sw_210) +
                    parseFloat(item.issue_ssw_210) +
                    parseFloat(item.issue_k_210) +
                    
                    parseFloat(item.issue_a_240) +
                    parseFloat(item.issue_c_240) +
                    parseFloat(item.issue_e_240) +
                    parseFloat(item.issue_sw_240) +
                    parseFloat(item.issue_ssw_240) +
                    parseFloat(item.issue_k_240) +
                    
                    parseFloat(item.issue_a_280) +
                    parseFloat(item.issue_c_280) +
                    parseFloat(item.issue_e_280) +
                    parseFloat(item.issue_sw_280) +
                    parseFloat(item.issue_ssw_280) +
                    parseFloat(item.issue_k_280) +
                    
                    parseFloat(item.issue_a_320) +
                    parseFloat(item.issue_c_320) +
                    parseFloat(item.issue_e_320) +
                    parseFloat(item.issue_sw_320) +
                    parseFloat(item.issue_ssw_320) +
                    parseFloat(item.issue_k_320) +
                    
                    parseFloat(item.issue_a_360) +
                    parseFloat(item.issue_c_360) +
                    parseFloat(item.issue_e_360) +
                    parseFloat(item.issue_sw_360) +
                    parseFloat(item.issue_ssw_360) +
                    parseFloat(item.issue_k_360) +
                    
                    parseFloat(item.issue_a_400) +
                    parseFloat(item.issue_c_400) +
                    parseFloat(item.issue_e_400) +
                    parseFloat(item.issue_sw_400) +
                    parseFloat(item.issue_ssw_400) +
                    parseFloat(item.issue_k_400)+ parseFloat(item.issue_jjb)+ parseFloat(item.issue_jjb1)).toString()),
                Issue_Village: formatNumber(item.issue_village),
                Issue_BigTaiho: formatNumber(item.issue_bigTaiho),
                Issue_LW: formatNumber(item.issue_lw),
                Issue_Rejection: formatNumber(item.issue_rejection),

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
            transformed = data1.rcnEntries.map((item: WholesData, idx: number) => ({
                Sl_No: idx + 1,
                Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
                Item_Lot_No: item.LotNo,
                Origin: item.origin,
                Issue_No: item.altid,
                Wholes_Entry_Date: handletimezone(item.date),
                Mixing_Lot: item.mixingLot,
                Receive_pw_210: item.rcv_pw_210,
                Receive_w_210: item.rcv_w_210,
                Receive_ww_210: item.rcv_ww_210,
                Receive_pw_240: item.rcv_pw_240,
                Receive_w_240: item.rcv_w_240,
                Receive_ww_240: item.rcv_ww_240,
                Receive_pw_280: item.rcv_pw_280,
                Receive_w_280: item.rcv_w_280,
                Receive_ww_280: item.rcv_ww_280,
                Receive_pw_320: item.rcv_pw_320,
                Receive_w_320: item.rcv_w_320,
                Receive_ww_320: item.rcv_ww_320,
                Receive_pw_360: item.rcv_pw_360,
                Receive_w_360: item.rcv_w_360,
                Receive_ww_360: item.rcv_ww_360,
                Receive_pw_400: item.rcv_pw_400,
                Receive_w_400: item.rcv_w_400,
                Receive_ww_400: item.rcv_ww_400,
                Receive_jb_mayur: item.rcv_jb_mayur,
                Receive_jb_hamsa: item.rcv_jb_hamsa,
                Receive_Total: formatNumber((parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
                    + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
                    + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
                    + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
                    + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
                    + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
                    + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa) + parseFloat((item.issue_add_2))).toString()),
                Receive_Total_Borma: formatNumber((parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
                    + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
                    + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
                    + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
                    + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
                    + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
                    + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa)).toString()),
                Borma_Loss_Kg: formatNumber(item.issue_add_2),
                Borma_Loss_Percentage: formatNumber(item.issue_add_3),
                Issue_pw_150: formatNumber(item.issue_pw_150),
                Issue_w_150: formatNumber(item.issue_w_150),
                Issue_ww_150: formatNumber(item.issue_ww_150),
                Issue_s_150: formatNumber(item.issue_s_150),
                Issue_aw_150: formatNumber(item.issue_aw_150),
                Issue_lw_150: formatNumber(item.issue_lw_150),
                Issue_pw_180: formatNumber(item.issue_pw_180),
                Issue_w_180: formatNumber(item.issue_w_180),
                Issue_ww_180: formatNumber(item.issue_ww_180),
                Issue_s_180: formatNumber(item.issue_s_180),
                Issue_aw_180: formatNumber(item.issue_aw_180),
                Issue_lw_180: formatNumber(item.issue_lw_180),
                Issue_pw_210: formatNumber(item.issue_pw_210),
                Issue_w_210: formatNumber(item.issue_w_210),
                Issue_ww_210: formatNumber(item.issue_ww_210),
                Issue_s_210: formatNumber(item.issue_s_210),
                Issue_aw_210: formatNumber(item.issue_aw_210),
                Issue_lw_210: formatNumber(item.issue_lw_210),
                Issue_pw_240: formatNumber(item.issue_pw_240),
                Issue_w_240: formatNumber(item.issue_w_240),
                Issue_ww_240: formatNumber(item.issue_ww_240),
                Issue_ww_240_A: formatNumber(item.issue_ww_240_A),
                Issue_aw_240: formatNumber(item.issue_aw_240),
                Issue_lw_240: formatNumber(item.issue_lw_240),
                Issue_pw_280: formatNumber(item.issue_pw_280),
                Issue_w_280: formatNumber(item.issue_w_280),
                Issue_ww_280: formatNumber(item.issue_ww_280),
                Issue_ww_280_A: formatNumber(item.issue_ww_280_A),
                Issue_aw_280: formatNumber(item.issue_aw_280),
                Issue_lw_280: formatNumber(item.issue_lw_280),
                Wholes_double: formatNumber(item.wholes_double),
                Issue_pw_320: formatNumber(item.issue_pw_320),
                Issue_w_320: formatNumber(item.issue_w_320),
                Issue_ww_320: formatNumber(item.issue_ww_320),
                Issue_ww_320_A: formatNumber(item.issue_ww_320_A),
                Issue_aw_320: formatNumber(item.issue_aw_320),
                Issue_lw_320: formatNumber(item.issue_lw_320),
                Issue_pw_360: formatNumber(item.issue_pw_360),
                Issue_w_360: formatNumber(item.issue_w_360),
                Issue_ww_360: formatNumber(item.issue_ww_360),
                Issue_ww_360_A: formatNumber(item.issue_ww_360_A),
                Issue_aw_360: formatNumber(item.issue_aw_360),
                Issue_lw_360: formatNumber(item.issue_lw_360),
                Issue_pw_400: formatNumber(item.issue_pw_400),
                Issue_w_400: formatNumber(item.issue_w_400),
                Issue_ww_400: formatNumber(item.issue_ww_400),
                Issue_ww_400_A: formatNumber(item.issue_ww_400_A),
                Issue_aw_400: formatNumber(item.issue_aw_400),
                Issue_lw_400: formatNumber(item.issue_lw_400),
                Issue_jjb: formatNumber(item.issue_jjb),
                Issue_jjb1: formatNumber(item.issue_jjb1),
                Issue_payal_240: formatNumber(item.issue_payal_240),
                Issue_payal_400: formatNumber(item.issue_payal_400),
                Issue_e_320_lot: formatNumber(item.issue_e_320_lot),
                Issue_e_400_lot: formatNumber(item.issue_e_400_lot),
                Issue_in_w_240: formatNumber(item.issue_in_w_240),
                Issue_in_w_320: formatNumber(item.issue_in_w_320),
                Issue_in_w_400: formatNumber(item.issue_in_w_400),

                Issue_a_150: formatNumber(item.issue_a_150),
                Issue_c_150: formatNumber(item.issue_c_150),
                Issue_e_150: formatNumber(item.issue_e_150),
                Issue_sw_150: formatNumber(item.issue_sw_150),
                Issue_ssw_150: formatNumber(item.issue_ssw_150),
                Issue_k_150: formatNumber(item.issue_k_150),

                Issue_a_180: formatNumber(item.issue_a_180),
                Issue_c_180: formatNumber(item.issue_c_180),
                Issue_e_180: formatNumber(item.issue_e_180),
                Issue_sw_180: formatNumber(item.issue_sw_180),
                Issue_ssw_180: formatNumber(item.issue_ssw_180),
                Issue_k_180: formatNumber(item.issue_k_180),

                Issue_a_210: formatNumber(item.issue_a_210),
                Issue_c_210: formatNumber(item.issue_c_210),
                Issue_e_210: formatNumber(item.issue_e_210),
                Issue_sw_210: formatNumber(item.issue_sw_210),
                Issue_ssw_210: formatNumber(item.issue_ssw_210),
                Issue_k_210: formatNumber(item.issue_k_210),

                Issue_a_240: formatNumber(item.issue_a_240),
                Issue_c_240: formatNumber(item.issue_c_240),
                Issue_e_240: formatNumber(item.issue_e_240),
                Issue_sw_240: formatNumber(item.issue_sw_240),
                Issue_ssw_240: formatNumber(item.issue_ssw_240),
                Issue_k_240: formatNumber(item.issue_k_240),

                Issue_a_280: formatNumber(item.issue_a_280),
                Issue_c_280: formatNumber(item.issue_c_280),
                Issue_e_280: formatNumber(item.issue_e_280),
                Issue_sw_280: formatNumber(item.issue_sw_280),
                Issue_ssw_280: formatNumber(item.issue_ssw_280),
                Issue_k_280: formatNumber(item.issue_k_280),

                Issue_a_320: formatNumber(item.issue_a_320),
                Issue_c_320: formatNumber(item.issue_c_320),
                Issue_e_320: formatNumber(item.issue_e_320),
                Issue_sw_320: formatNumber(item.issue_sw_320),
                Issue_ssw_320: formatNumber(item.issue_ssw_320),
                Issue_k_320: formatNumber(item.issue_k_320),

                Issue_a_360: formatNumber(item.issue_a_360),
                Issue_c_360: formatNumber(item.issue_c_360),
                Issue_e_360: formatNumber(item.issue_e_360),
                Issue_sw_360: formatNumber(item.issue_sw_360),
                Issue_ssw_360: formatNumber(item.issue_ssw_360),
                Issue_k_360: formatNumber(item.issue_k_360),

                Issue_a_400: formatNumber(item.issue_a_400),
                Issue_c_400: formatNumber(item.issue_c_400),
                Issue_e_400: formatNumber(item.issue_e_400),
                Issue_sw_400: formatNumber(item.issue_sw_400),
                Issue_ssw_400: formatNumber(item.issue_ssw_400),
                Issue_k_400: formatNumber(item.issue_k_400),
                Issue_rejection: formatNumber(item.issue_rejection),
                Issue_village: formatNumber(item.issue_village),
                Issue_bigTaiho: formatNumber(item.issue_bigTaiho),
                Issue_lw: formatNumber(item.issue_lw),
                Issue_Packing: formatNumber((parseFloat(item.issue_pw_150) + parseFloat(item.issue_w_150) + parseFloat(item.issue_ww_150)
                    + parseFloat(item.issue_s_150) + parseFloat(item.issue_aw_150) + parseFloat(item.issue_lw_150)
                    + parseFloat(item.issue_pw_180) + parseFloat(item.issue_w_180) + parseFloat(item.issue_ww_180)
                    + parseFloat(item.issue_s_180) + parseFloat(item.issue_aw_180) + parseFloat(item.issue_lw_180)
                    + parseFloat(item.issue_pw_210) + parseFloat(item.issue_w_210) + parseFloat(item.issue_ww_210)
                    + parseFloat(item.issue_s_210) + parseFloat(item.issue_aw_210) + parseFloat(item.issue_lw_210)
                    + parseFloat(item.issue_pw_240) + parseFloat(item.issue_w_240) + parseFloat(item.issue_ww_240)
                    + parseFloat(item.issue_ww_240_A) + parseFloat(item.issue_aw_240) + parseFloat(item.issue_lw_240)
                    + parseFloat(item.issue_pw_280) + parseFloat(item.issue_w_280) + parseFloat(item.issue_ww_280)
                    + parseFloat(item.issue_ww_280_A) + parseFloat(item.issue_aw_280) + parseFloat(item.issue_lw_280)
                    + parseFloat(item.wholes_double) + parseFloat(item.issue_pw_320) + parseFloat(item.issue_w_320)
                    + parseFloat(item.issue_ww_320) + parseFloat(item.issue_ww_320_A) + parseFloat(item.issue_aw_320)
                    + parseFloat(item.issue_lw_320) + parseFloat(item.issue_pw_360) + parseFloat(item.issue_w_360)
                    + parseFloat(item.issue_ww_360) + parseFloat(item.issue_ww_360_A) + parseFloat(item.issue_aw_360)
                    + parseFloat(item.issue_lw_360) + parseFloat(item.issue_pw_400) + parseFloat(item.issue_w_400)
                    + parseFloat(item.issue_ww_400) + parseFloat(item.issue_ww_400_A) + parseFloat(item.issue_aw_400) + parseFloat(item.issue_lw_400)
                    +parseFloat(item.issue_payal_240) +
                    parseFloat(item.issue_payal_400) +
                    parseFloat(item.issue_e_320_lot) +
                    parseFloat(item.issue_e_400_lot) +
                    parseFloat(item.issue_in_w_240) +
                    parseFloat(item.issue_in_w_320) +
                    parseFloat(item.issue_in_w_400) +
                    
                    parseFloat(item.issue_a_150) +
                    parseFloat(item.issue_c_150) +
                    parseFloat(item.issue_e_150) +
                    parseFloat(item.issue_sw_150) +
                    parseFloat(item.issue_ssw_150) +
                    parseFloat(item.issue_k_150) +
                    
                    parseFloat(item.issue_a_180) +
                    parseFloat(item.issue_c_180) +
                    parseFloat(item.issue_e_180) +
                    parseFloat(item.issue_sw_180) +
                    parseFloat(item.issue_ssw_180) +
                    parseFloat(item.issue_k_180) +
                    
                    parseFloat(item.issue_a_210) +
                    parseFloat(item.issue_c_210) +
                    parseFloat(item.issue_e_210) +
                    parseFloat(item.issue_sw_210) +
                    parseFloat(item.issue_ssw_210) +
                    parseFloat(item.issue_k_210) +
                    
                    parseFloat(item.issue_a_240) +
                    parseFloat(item.issue_c_240) +
                    parseFloat(item.issue_e_240) +
                    parseFloat(item.issue_sw_240) +
                    parseFloat(item.issue_ssw_240) +
                    parseFloat(item.issue_k_240) +
                    
                    parseFloat(item.issue_a_280) +
                    parseFloat(item.issue_c_280) +
                    parseFloat(item.issue_e_280) +
                    parseFloat(item.issue_sw_280) +
                    parseFloat(item.issue_ssw_280) +
                    parseFloat(item.issue_k_280) +
                    
                    parseFloat(item.issue_a_320) +
                    parseFloat(item.issue_c_320) +
                    parseFloat(item.issue_e_320) +
                    parseFloat(item.issue_sw_320) +
                    parseFloat(item.issue_ssw_320) +
                    parseFloat(item.issue_k_320) +
                    
                    parseFloat(item.issue_a_360) +
                    parseFloat(item.issue_c_360) +
                    parseFloat(item.issue_e_360) +
                    parseFloat(item.issue_sw_360) +
                    parseFloat(item.issue_ssw_360) +
                    parseFloat(item.issue_k_360) +
                    
                    parseFloat(item.issue_a_400) +
                    parseFloat(item.issue_c_400) +
                    parseFloat(item.issue_e_400) +
                    parseFloat(item.issue_sw_400) +
                    parseFloat(item.issue_ssw_400) +
                    parseFloat(item.issue_k_400)+ parseFloat(item.issue_jjb)+ parseFloat(item.issue_jjb1)).toString()),
                Issue_Village: formatNumber(item.issue_village),
                Issue_BigTaiho: formatNumber(item.issue_bigTaiho),
                Issue_LW: formatNumber(item.issue_lw),
                Issue_Rejection: formatNumber(item.issue_rejection),

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
        saveAs(blob, 'Wholes_Entry_' + currDate + '.xlsx');
    }
    const handleSearch = async () => {

        setEditData([])
        setblockpagen('flex')
        const response = await axios.put('/api/wholes/wholesprimarysearch', {
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
        if (editWholesLotWiseData.length > 0) {
            //console.log(editPendingData)
            setEditData(editWholesLotWiseData)
            setblockpagen('none')
        }

    }, [editWholesLotWiseData])
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

    const handleApprove = async (item: WholesData) => {
        const response = await axios.put(`/api/wholes/approveeditWholes/${item.id}/${item.LotNo}/${item.origin}`)
        const data = await response.data
        if (data.message === "Edit Request of Wholes Entry is Approved Successfully") {

            if (approvesuccessdialog != null) {
                (approvesuccessdialog as any).showModal();
            }
        }
    }
    const handleRejection = async (item: WholesData) => {
        const response = await axios.delete(`/api/wholes/rejectededitWholes/${item.id}/${item.LotNo}/${item.origin}`)
        const data = await response.data
        console.log(data)
        if (data.message === "Wholes Entry rejected successfully") {
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
                {checkpending('Wholes') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}
                <Table className="mt-4">
                    <TableHeader className="bg-neutral-200 text-stone-950 ">


                        <TableHead className="text-center" >Id</TableHead>
                        <TableHead className="text-center" >Issue_Type</TableHead>

                        <TableHead className="text-center" >Item_Lot_No</TableHead>
                        <TableHead className="text-center" >Origin</TableHead>
                        <TableHead className="text-center" >Issue_No</TableHead>
                        <TableHead className="text-center" >Wholes_Entry_Date</TableHead>

                        <TableHead className="text-center" >Incoming_Mixed_Lot_&_Origin</TableHead>
                        {/* <TableHead className="text-center" >Mixed Amount</TableHead> */}
                        <TableHead className="text-center">Opening_Wholes</TableHead>
                        <TableHead className="text-center">Borma_Loss(Kg)</TableHead>
                        <TableHead className="text-center">Borma_Loss(%)</TableHead>
                        <TableHead className="text-center">Receive PW_210 (Borma)</TableHead>
                        <TableHead className="text-center">Receive W_210 (Borma)</TableHead>
                        <TableHead className="text-center">Receive WW_210 (Borma)</TableHead>
                        <TableHead className="text-center">Receive PW_240 (Borma)</TableHead>
                        <TableHead className="text-center">Receive W_240 (Borma)</TableHead>
                        <TableHead className="text-center">Receive WW_240 (Borma)</TableHead>
                        <TableHead className="text-center">Receive PW_280 (Borma)</TableHead>
                        <TableHead className="text-center">Receive W_280 (Borma)</TableHead>
                        <TableHead className="text-center">Receive WW_280 (Borma)</TableHead>
                        <TableHead className="text-center">Receive PW_320 (Borma)</TableHead>
                        <TableHead className="text-center">Receive W_320 (Borma)</TableHead>
                        <TableHead className="text-center">Receive WW_320 (Borma)</TableHead>
                        <TableHead className="text-center">Receive PW_360 (Borma)</TableHead>
                        <TableHead className="text-center">Receive W_360 (Borma)</TableHead>
                        <TableHead className="text-center">Receive WW_360 (Borma)</TableHead>
                        <TableHead className="text-center">Receive PW_400 (Borma)</TableHead>
                        <TableHead className="text-center">Receive W_400 (Borma)</TableHead>
                        <TableHead className="text-center">Receive WW_400 (Borma)</TableHead>

                        <TableHead className="text-center">Receive Hamsa_JB (Borma)</TableHead>
                        <TableHead className="text-center">Receive Hamsa (Borma)</TableHead>
                        <TableHead className="text-center">Receive Mayur (Borma)</TableHead>



                        <TableHead className="text-center">Wholes Total_Opening (Borma)</TableHead>
                        <TableHead className="text-center">PW_150</TableHead>
                        <TableHead className="text-center">W_150</TableHead>
                        <TableHead className="text-center">WW_150</TableHead>
                        <TableHead className="text-center">S_150</TableHead>
                        <TableHead className="text-center">AW_150</TableHead>
                        <TableHead className="text-center">LW_150</TableHead>
                        <TableHead className="text-center">PW_180</TableHead>
                        <TableHead className="text-center">W_180</TableHead>
                        <TableHead className="text-center">WW_180</TableHead>
                        <TableHead className="text-center">S_180</TableHead>
                        <TableHead className="text-center">AW_180</TableHead>
                        <TableHead className="text-center">LW_180</TableHead>
                        <TableHead className="text-center">PW_210</TableHead>
                        <TableHead className="text-center">W_210</TableHead>
                        <TableHead className="text-center">WW_210</TableHead>
                        <TableHead className="text-center">S_210</TableHead>
                        <TableHead className="text-center">AW_210</TableHead>
                        <TableHead className="text-center">LW_210</TableHead>
                        <TableHead className="text-center">PW_240</TableHead>
                        <TableHead className="text-center">W_240</TableHead>
                        <TableHead className="text-center">WW_240</TableHead>
                        <TableHead className="text-center">WW_240_A</TableHead>
                        <TableHead className="text-center">AW_240</TableHead>
                        <TableHead className="text-center">LW_240</TableHead>
                        <TableHead className="text-center">PW_280</TableHead>
                        <TableHead className="text-center">W_280</TableHead>
                        <TableHead className="text-center">WW_280</TableHead>
                        <TableHead className="text-center">WW_280_A</TableHead>
                        <TableHead className="text-center">AW_280</TableHead>
                        <TableHead className="text-center">LW_280</TableHead>
                        <TableHead className="text-center">Wholes_Double</TableHead>
                        <TableHead className="text-center">PW_320</TableHead>
                        <TableHead className="text-center">W_320</TableHead>
                        <TableHead className="text-center">WW_320</TableHead>
                        <TableHead className="text-center">WW_320_A</TableHead>
                        <TableHead className="text-center">AW_320</TableHead>
                        <TableHead className="text-center">LW_320</TableHead>
                        <TableHead className="text-center">PW_360</TableHead>
                        <TableHead className="text-center">W_360</TableHead>
                        <TableHead className="text-center">WW_360</TableHead>
                        <TableHead className="text-center">WW_360_A</TableHead>
                        <TableHead className="text-center">AW_360</TableHead>
                        <TableHead className="text-center">LW_360</TableHead>
                        <TableHead className="text-center">PW_400</TableHead>
                        <TableHead className="text-center">W_400</TableHead>
                        <TableHead className="text-center">WW_400</TableHead>
                        <TableHead className="text-center">WW_400_A</TableHead>
                        <TableHead className="text-center">AW_400</TableHead>
                        <TableHead className="text-center">LW_400</TableHead>
                        <TableHead className="text-center">JJB</TableHead>
                        <TableHead className="text-center">JJB1</TableHead>
                        <TableHead className="text-center">PAYAL_240</TableHead>
                        <TableHead className="text-center">PAYAL_400</TableHead>
                        <TableHead className="text-center">E_320_LOT</TableHead>
                        <TableHead className="text-center">E_400_LOT</TableHead>
                        <TableHead className="text-center">IN_W_240</TableHead>
                        <TableHead className="text-center">IN_W_320</TableHead>
                        <TableHead className="text-center">IN_W_400</TableHead>
                        <TableHead className="text-center">Lot_Village Seperator</TableHead>
                        <TableHead className="text-center">A_150</TableHead>
                        <TableHead className="text-center">C_150</TableHead>
                        <TableHead className="text-center">E_150</TableHead>
                        <TableHead className="text-center">SW_150</TableHead>
                        <TableHead className="text-center">SSW_150</TableHead>
                        <TableHead className="text-center">K_150</TableHead>

                        <TableHead className="text-center">A_180</TableHead>
                        <TableHead className="text-center">C_180</TableHead>
                        <TableHead className="text-center">E_180</TableHead>
                        <TableHead className="text-center">SW_180</TableHead>
                        <TableHead className="text-center">SSW_180</TableHead>
                        <TableHead className="text-center">K_180</TableHead>

                        <TableHead className="text-center">A_210</TableHead>
                        <TableHead className="text-center">C_210</TableHead>
                        <TableHead className="text-center">E_210</TableHead>
                        <TableHead className="text-center">SW_210</TableHead>
                        <TableHead className="text-center">SSW_210</TableHead>
                        <TableHead className="text-center">K_210</TableHead>

                        <TableHead className="text-center">A_240</TableHead>
                        <TableHead className="text-center">C_240</TableHead>
                        <TableHead className="text-center">E_240</TableHead>
                        <TableHead className="text-center">SW_240</TableHead>
                        <TableHead className="text-center">SSW_240</TableHead>
                        <TableHead className="text-center">K_240</TableHead>

                        <TableHead className="text-center">A_280</TableHead>
                        <TableHead className="text-center">C_280</TableHead>
                        <TableHead className="text-center">E_280</TableHead>
                        <TableHead className="text-center">SW_280</TableHead>
                        <TableHead className="text-center">SSW_280</TableHead>
                        <TableHead className="text-center">K_280</TableHead>

                        <TableHead className="text-center">A_320</TableHead>
                        <TableHead className="text-center">C_320</TableHead>
                        <TableHead className="text-center">E_320</TableHead>
                        <TableHead className="text-center">SW_320</TableHead>
                        <TableHead className="text-center">SSW_320</TableHead>
                        <TableHead className="text-center">K_320</TableHead>

                        <TableHead className="text-center">A_360</TableHead>
                        <TableHead className="text-center">C_360</TableHead>
                        <TableHead className="text-center">E_360</TableHead>
                        <TableHead className="text-center">SW_360</TableHead>
                        <TableHead className="text-center">SSW_360</TableHead>
                        <TableHead className="text-center">K_360</TableHead>

                        <TableHead className="text-center">A_400</TableHead>
                        <TableHead className="text-center">C_400</TableHead>
                        <TableHead className="text-center">E_400</TableHead>
                        <TableHead className="text-center">SW_400</TableHead>
                        <TableHead className="text-center">SSW_400</TableHead>
                        <TableHead className="text-center">K_400</TableHead>


                        {/* <TableHead className="text-center">Issue Add 4</TableHead>
                    <TableHead className="text-center">Issue Add 5</TableHead>
                    <TableHead className="text-center">Issue Add 6</TableHead>
                    <TableHead className="text-center">Issue Add 7</TableHead>
                    <TableHead className="text-center">Issue Add 8</TableHead>
                    <TableHead className="text-center">Issue Add 9</TableHead>
                    <TableHead className="text-center">Issue Add 10</TableHead> */}
                        <TableHead className="text-center">Issue Packing</TableHead>
                        <TableHead className="text-center">Issue Rejection</TableHead>
                        <TableHead className="text-center">Issue Village</TableHead>
                        <TableHead className="text-center">Issue LW</TableHead>
                        <TableHead className="text-center">Issue BigTaiho</TableHead>
                        
                        {/* <TableHead className="text-center">Entry_Backlog</TableHead> */}
                        <TableHead className="text-center font-bold">Current_Backlog</TableHead>



                        <TableHead className="text-center">Operator_Day</TableHead>
                        <TableHead className="text-center">Operator_Night</TableHead>

                        <TableHead className="text-center" >Edit Status </TableHead>
                        <TableHead className="text-center" >Created By </TableHead>
                        <TableHead className="text-center" >Action</TableHead>
                    </TableHeader>
                    <TableBody>


                        {EditData.length > 0 ? (EditData.map((item: WholesData, idx) => {

                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">{idx + 1}</TableCell>
                                    <TableCell className="text-center font-bold ">{item.altid == 1 ? 'Fresh Issue' : 'Re-Issue'}</TableCell>

                                    <TableCell className="text-center font-bold text-orange-500">{item.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                        <TableCell className="text-center font-semibold ">{item.altid}</TableCell>
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>

                                        <TableCell className="text-center ">{item.mixingLot}</TableCell>
                                        {/* <TableCell className="text-center ">{item.rcv_transfer ? formatNumber(item.rcv_transfer):''}</TableCell> */}

                                        <TableCell className="text-center font-bold">{formatNumber(
                                                (parseFloat(item.current_backlog)+parseFloat(item.issue_pw_150) +
                                                    parseFloat(item.issue_w_150) +
                                                    parseFloat(item.issue_ww_150) +
                                                    parseFloat(item.issue_s_150) +
                                                    parseFloat(item.issue_aw_150) +
                                                    parseFloat(item.issue_lw_150) +
                                                    parseFloat(item.issue_pw_180) +
                                                    parseFloat(item.issue_w_180) +
                                                    parseFloat(item.issue_ww_180) +
                                                    parseFloat(item.issue_s_180) +
                                                    parseFloat(item.issue_aw_180) +
                                                    parseFloat(item.issue_lw_180) +
                                                    parseFloat(item.issue_pw_210) +
                                                    parseFloat(item.issue_w_210) +
                                                    parseFloat(item.issue_ww_210) +
                                                    parseFloat(item.issue_s_210) +
                                                    parseFloat(item.issue_aw_210) +
                                                    parseFloat(item.issue_lw_210) +
                                                    parseFloat(item.issue_pw_240) +
                                                    parseFloat(item.issue_w_240) +
                                                    parseFloat(item.issue_ww_240) +
                                                    parseFloat(item.issue_ww_240_A) +
                                                    parseFloat(item.issue_aw_240) +
                                                    parseFloat(item.issue_lw_240) +
                                                    parseFloat(item.issue_pw_280) +
                                                    parseFloat(item.issue_w_280) +
                                                    parseFloat(item.issue_ww_280) +
                                                    parseFloat(item.issue_ww_280_A) +
                                                    parseFloat(item.issue_aw_280) +
                                                    parseFloat(item.issue_lw_280) +
                                                    parseFloat(item.wholes_double) +
                                                    parseFloat(item.issue_pw_320) +
                                                    parseFloat(item.issue_w_320) +
                                                    parseFloat(item.issue_ww_320) +
                                                    parseFloat(item.issue_ww_320_A) +
                                                    parseFloat(item.issue_aw_320) +
                                                    parseFloat(item.issue_lw_320) +
                                                    parseFloat(item.issue_pw_360) +
                                                    parseFloat(item.issue_w_360) +
                                                    parseFloat(item.issue_ww_360) +
                                                    parseFloat(item.issue_ww_360_A) +
                                                    parseFloat(item.issue_aw_360) +
                                                    parseFloat(item.issue_lw_360) +
                                                    parseFloat(item.issue_pw_400) +
                                                    parseFloat(item.issue_w_400) +
                                                    parseFloat(item.issue_ww_400) +
                                                    parseFloat(item.issue_ww_400_A) +
                                                    parseFloat(item.issue_aw_400) +
                                                    parseFloat(item.issue_lw_400) +
                                                parseFloat(item.issue_payal_240) +
                                                parseFloat(item.issue_payal_400) +
                                                parseFloat(item.issue_e_320_lot) +
                                                parseFloat(item.issue_e_400_lot) +
                                                parseFloat(item.issue_in_w_240) +
                                                parseFloat(item.issue_in_w_320) +
                                                parseFloat(item.issue_in_w_400) +

                                                parseFloat(item.issue_a_150) +
                                                parseFloat(item.issue_c_150) +
                                                parseFloat(item.issue_e_150) +
                                                parseFloat(item.issue_sw_150) +
                                                parseFloat(item.issue_ssw_150) +
                                                parseFloat(item.issue_k_150) +

                                                parseFloat(item.issue_a_180) +
                                                parseFloat(item.issue_c_180) +
                                                parseFloat(item.issue_e_180) +
                                                parseFloat(item.issue_sw_180) +
                                                parseFloat(item.issue_ssw_180) +
                                                parseFloat(item.issue_k_180) +

                                                parseFloat(item.issue_a_210) +
                                                parseFloat(item.issue_c_210) +
                                                parseFloat(item.issue_e_210) +
                                                parseFloat(item.issue_sw_210) +
                                                parseFloat(item.issue_ssw_210) +
                                                parseFloat(item.issue_k_210) +

                                                parseFloat(item.issue_a_240) +
                                                parseFloat(item.issue_c_240) +
                                                parseFloat(item.issue_e_240) +
                                                parseFloat(item.issue_sw_240) +
                                                parseFloat(item.issue_ssw_240) +
                                                parseFloat(item.issue_k_240) +

                                                parseFloat(item.issue_a_280) +
                                                parseFloat(item.issue_c_280) +
                                                parseFloat(item.issue_e_280) +
                                                parseFloat(item.issue_sw_280) +
                                                parseFloat(item.issue_ssw_280) +
                                                parseFloat(item.issue_k_280) +

                                                parseFloat(item.issue_a_320) +
                                                parseFloat(item.issue_c_320) +
                                                parseFloat(item.issue_e_320) +
                                                parseFloat(item.issue_sw_320) +
                                                parseFloat(item.issue_ssw_320) +
                                                parseFloat(item.issue_k_320) +

                                                parseFloat(item.issue_a_360) +
                                                parseFloat(item.issue_c_360) +
                                                parseFloat(item.issue_e_360) +
                                                parseFloat(item.issue_sw_360) +
                                                parseFloat(item.issue_ssw_360) +
                                                parseFloat(item.issue_k_360) +

                                                parseFloat(item.issue_a_400) +
                                                parseFloat(item.issue_c_400) +
                                                parseFloat(item.issue_e_400) +
                                                parseFloat(item.issue_sw_400) +
                                                parseFloat(item.issue_ssw_400) +
                                                parseFloat(item.issue_k_400) +
                                                    parseFloat(item.issue_jjb) +parseFloat(item.issue_add_2)+
                                                    parseFloat(item.issue_jjb1)+parseFloat(item.issue_rejection)+parseFloat(item.issue_village)+parseFloat(item.issue_lw)+parseFloat(item.issue_bigTaiho))
                                                    .toString()
                                            )} Kg</TableCell>
                                        <TableCell className="text-center font-bold text-red-500 ">{formatNumber(item.issue_add_3)} %</TableCell>
                                        <TableCell className="text-center font-semibold  text-red-500">{formatNumber(item.issue_add_2)} Kg</TableCell>

                                        <TableCell className="text-center ">{formatNumber(item.rcv_pw_210)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_w_210)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_ww_210)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_pw_240)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_w_240)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_ww_240)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_pw_280)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_w_280)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_ww_280)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_pw_320)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_w_320)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_ww_320)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_pw_360)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_w_360)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_ww_360)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_pw_400)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_w_400)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_ww_400)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_jb_hamsa)}</TableCell>
                                        <TableCell className="text-center font-semibold bg-yellow-100">
                                            {formatNumber(
                                                (parseFloat(item.rcv_pw_210) +
                                                    parseFloat(item.rcv_w_210) +
                                                    parseFloat(item.rcv_ww_210) +
                                                    parseFloat(item.rcv_pw_240) +
                                                    parseFloat(item.rcv_w_240) +
                                                    parseFloat(item.rcv_ww_240) +
                                                    parseFloat(item.rcv_pw_280) +
                                                    parseFloat(item.rcv_w_280) +
                                                    parseFloat(item.rcv_ww_280) +
                                                    parseFloat(item.rcv_pw_320) +
                                                    parseFloat(item.rcv_w_320) +
                                                    parseFloat(item.rcv_ww_320) +
                                                    parseFloat(item.rcv_pw_360) +
                                                    parseFloat(item.rcv_w_360) +
                                                    parseFloat(item.rcv_ww_360) +
                                                    parseFloat(item.rcv_pw_400) +
                                                    parseFloat(item.rcv_w_400) +
                                                    parseFloat(item.rcv_ww_400) +
                                                    parseFloat(item.rcv_jb_hamsa))
                                                    .toString()
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(item.rcv_jb_mayur)}</TableCell>

                                        <TableCell className="text-center font-bold bg-green-500 text-white">
                                        {formatNumber(
                                                (parseFloat(item.current_backlog)+parseFloat(item.issue_pw_150) +
                                                    parseFloat(item.issue_w_150) +
                                                    parseFloat(item.issue_ww_150) +
                                                    parseFloat(item.issue_s_150) +
                                                    parseFloat(item.issue_aw_150) +
                                                    parseFloat(item.issue_lw_150) +
                                                    parseFloat(item.issue_pw_180) +
                                                    parseFloat(item.issue_w_180) +
                                                    parseFloat(item.issue_ww_180) +
                                                    parseFloat(item.issue_s_180) +
                                                    parseFloat(item.issue_aw_180) +
                                                    parseFloat(item.issue_lw_180) +
                                                    parseFloat(item.issue_pw_210) +
                                                    parseFloat(item.issue_w_210) +
                                                    parseFloat(item.issue_ww_210) +
                                                    parseFloat(item.issue_s_210) +
                                                    parseFloat(item.issue_aw_210) +
                                                    parseFloat(item.issue_lw_210) +
                                                    parseFloat(item.issue_pw_240) +
                                                    parseFloat(item.issue_w_240) +
                                                    parseFloat(item.issue_ww_240) +
                                                    parseFloat(item.issue_ww_240_A) +
                                                    parseFloat(item.issue_aw_240) +
                                                    parseFloat(item.issue_lw_240) +
                                                    parseFloat(item.issue_pw_280) +
                                                    parseFloat(item.issue_w_280) +
                                                    parseFloat(item.issue_ww_280) +
                                                    parseFloat(item.issue_ww_280_A) +
                                                    parseFloat(item.issue_aw_280) +
                                                    parseFloat(item.issue_lw_280) +
                                                    parseFloat(item.wholes_double) +
                                                    parseFloat(item.issue_pw_320) +
                                                    parseFloat(item.issue_w_320) +
                                                    parseFloat(item.issue_ww_320) +
                                                    parseFloat(item.issue_ww_320_A) +
                                                    parseFloat(item.issue_aw_320) +
                                                    parseFloat(item.issue_lw_320) +
                                                    parseFloat(item.issue_pw_360) +
                                                    parseFloat(item.issue_w_360) +
                                                    parseFloat(item.issue_ww_360) +
                                                    parseFloat(item.issue_ww_360_A) +
                                                    parseFloat(item.issue_aw_360) +
                                                    parseFloat(item.issue_lw_360) +
                                                    parseFloat(item.issue_pw_400) +
                                                    parseFloat(item.issue_w_400) +
                                                    parseFloat(item.issue_ww_400) +
                                                    parseFloat(item.issue_ww_400_A) +
                                                    parseFloat(item.issue_aw_400) +
                                                    parseFloat(item.issue_lw_400) +
                                                    parseFloat(item.issue_jjb) +parseFloat(item.issue_payal_240) +
                                                    parseFloat(item.issue_payal_400) +
                                                    parseFloat(item.issue_e_320_lot) +
                                                    parseFloat(item.issue_e_400_lot) +
                                                    parseFloat(item.issue_in_w_240) +
                                                    parseFloat(item.issue_in_w_320) +
                                                    parseFloat(item.issue_in_w_400) +
                                                    
                                                    parseFloat(item.issue_a_150) +
                                                    parseFloat(item.issue_c_150) +
                                                    parseFloat(item.issue_e_150) +
                                                    parseFloat(item.issue_sw_150) +
                                                    parseFloat(item.issue_ssw_150) +
                                                    parseFloat(item.issue_k_150) +
                                                    
                                                    parseFloat(item.issue_a_180) +
                                                    parseFloat(item.issue_c_180) +
                                                    parseFloat(item.issue_e_180) +
                                                    parseFloat(item.issue_sw_180) +
                                                    parseFloat(item.issue_ssw_180) +
                                                    parseFloat(item.issue_k_180) +
                                                    
                                                    parseFloat(item.issue_a_210) +
                                                    parseFloat(item.issue_c_210) +
                                                    parseFloat(item.issue_e_210) +
                                                    parseFloat(item.issue_sw_210) +
                                                    parseFloat(item.issue_ssw_210) +
                                                    parseFloat(item.issue_k_210) +
                                                    
                                                    parseFloat(item.issue_a_240) +
                                                    parseFloat(item.issue_c_240) +
                                                    parseFloat(item.issue_e_240) +
                                                    parseFloat(item.issue_sw_240) +
                                                    parseFloat(item.issue_ssw_240) +
                                                    parseFloat(item.issue_k_240) +
                                                    
                                                    parseFloat(item.issue_a_280) +
                                                    parseFloat(item.issue_c_280) +
                                                    parseFloat(item.issue_e_280) +
                                                    parseFloat(item.issue_sw_280) +
                                                    parseFloat(item.issue_ssw_280) +
                                                    parseFloat(item.issue_k_280) +
                                                    
                                                    parseFloat(item.issue_a_320) +
                                                    parseFloat(item.issue_c_320) +
                                                    parseFloat(item.issue_e_320) +
                                                    parseFloat(item.issue_sw_320) +
                                                    parseFloat(item.issue_ssw_320) +
                                                    parseFloat(item.issue_k_320) +
                                                    
                                                    parseFloat(item.issue_a_360) +
                                                    parseFloat(item.issue_c_360) +
                                                    parseFloat(item.issue_e_360) +
                                                    parseFloat(item.issue_sw_360) +
                                                    parseFloat(item.issue_ssw_360) +
                                                    parseFloat(item.issue_k_360) +
                                                    
                                                    parseFloat(item.issue_a_400) +
                                                    parseFloat(item.issue_c_400) +
                                                    parseFloat(item.issue_e_400) +
                                                    parseFloat(item.issue_sw_400) +
                                                    parseFloat(item.issue_ssw_400) +
                                                    parseFloat(item.issue_k_400)+
                                                    parseFloat(item.issue_jjb1)+parseFloat(item.issue_rejection)+parseFloat(item.issue_village)+parseFloat(item.issue_lw)+parseFloat(item.issue_bigTaiho))
                                                    .toString()
                                            )}
                                        </TableCell>


                                        <TableCell className="text-center ">{formatNumber(item.issue_pw_150)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_w_150)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_150)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_s_150)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_aw_150)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_lw_150)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_pw_180)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_w_180)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_180)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_s_180)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_aw_180)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_lw_180)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_pw_210)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_w_210)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_210)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_s_210)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_aw_210)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_lw_210)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_pw_240)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_w_240)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_240)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_240_A)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_aw_240)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_lw_240)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_pw_280)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_w_280)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_280)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_280_A)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_aw_280)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_lw_280)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.wholes_double)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_pw_320)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_w_320)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_320)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_320_A)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_aw_320)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_lw_320)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_pw_360)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_w_360)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_360)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_360_A)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_aw_360)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_lw_360)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_pw_400)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_w_400)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_400)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_400_A)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_aw_400)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_lw_400)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_jjb)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_jjb1)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_payal_240)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_payal_400)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_320_lot)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_400_lot)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_in_w_240)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_in_w_320)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_in_w_400)}</TableCell>

                                        <TableCell className="text-center font-semibold bg-neutral-500 text-white">Lot---Vil</TableCell>

                                        <TableCell className="text-center">{formatNumber(item.issue_a_150)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_c_150)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_150)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_sw_150)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_ssw_150)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_k_150)}</TableCell>

                                        <TableCell className="text-center">{formatNumber(item.issue_a_180)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_c_180)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_180)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_sw_180)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_ssw_180)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_k_180)}</TableCell>

                                        <TableCell className="text-center">{formatNumber(item.issue_a_210)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_c_210)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_210)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_sw_210)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_ssw_210)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_k_210)}</TableCell>

                                        <TableCell className="text-center">{formatNumber(item.issue_a_240)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_c_240)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_240)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_sw_240)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_ssw_240)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_k_240)}</TableCell>

                                        <TableCell className="text-center">{formatNumber(item.issue_a_280)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_c_280)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_280)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_sw_280)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_ssw_280)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_k_280)}</TableCell>

                                        <TableCell className="text-center">{formatNumber(item.issue_a_320)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_c_320)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_320)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_sw_320)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_ssw_320)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_k_320)}</TableCell>

                                        <TableCell className="text-center">{formatNumber(item.issue_a_360)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_c_360)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_360)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_sw_360)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_ssw_360)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_k_360)}</TableCell>

                                        <TableCell className="text-center">{formatNumber(item.issue_a_400)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_c_400)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_400)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_sw_400)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_ssw_400)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_k_400)}</TableCell>

                                    <TableCell className="text-center font-semibold bg-red-100">
                                        {formatNumber(
                                            (parseFloat(item.issue_pw_150) +
                                                parseFloat(item.issue_w_150) +
                                                parseFloat(item.issue_ww_150) +
                                                parseFloat(item.issue_s_150) +
                                                parseFloat(item.issue_aw_150) +
                                                parseFloat(item.issue_lw_150) +
                                                parseFloat(item.issue_pw_180) +
                                                parseFloat(item.issue_w_180) +
                                                parseFloat(item.issue_ww_180) +
                                                parseFloat(item.issue_s_180) +
                                                parseFloat(item.issue_aw_180) +
                                                parseFloat(item.issue_lw_180) +
                                                parseFloat(item.issue_pw_210) +
                                                parseFloat(item.issue_w_210) +
                                                parseFloat(item.issue_ww_210) +
                                                parseFloat(item.issue_s_210) +
                                                parseFloat(item.issue_aw_210) +
                                                parseFloat(item.issue_lw_210) +
                                                parseFloat(item.issue_pw_240) +
                                                parseFloat(item.issue_w_240) +
                                                parseFloat(item.issue_ww_240) +
                                                parseFloat(item.issue_ww_240_A) +
                                                parseFloat(item.issue_aw_240) +
                                                parseFloat(item.issue_lw_240) +
                                                parseFloat(item.issue_pw_280) +
                                                parseFloat(item.issue_w_280) +
                                                parseFloat(item.issue_ww_280) +
                                                parseFloat(item.issue_ww_280_A) +
                                                parseFloat(item.issue_aw_280) +
                                                parseFloat(item.issue_lw_280) +
                                                parseFloat(item.wholes_double) +
                                                parseFloat(item.issue_pw_320) +
                                                parseFloat(item.issue_w_320) +
                                                parseFloat(item.issue_ww_320) +
                                                parseFloat(item.issue_ww_320_A) +
                                                parseFloat(item.issue_aw_320) +
                                                parseFloat(item.issue_lw_320) +
                                                parseFloat(item.issue_pw_360) +
                                                parseFloat(item.issue_w_360) +
                                                parseFloat(item.issue_ww_360) +
                                                parseFloat(item.issue_ww_360_A) +
                                                parseFloat(item.issue_aw_360) +
                                                parseFloat(item.issue_lw_360) +
                                                parseFloat(item.issue_pw_400) +
                                                parseFloat(item.issue_w_400) +
                                                parseFloat(item.issue_ww_400) +
                                                parseFloat(item.issue_ww_400_A) +
                                                parseFloat(item.issue_aw_400) +
                                                parseFloat(item.issue_lw_400) +
                                                parseFloat(item.issue_jjb) +
                                                parseFloat(item.issue_jjb1)+parseFloat(item.issue_payal_240) +
                                                parseFloat(item.issue_payal_400) +
                                                parseFloat(item.issue_e_320_lot) +
                                                parseFloat(item.issue_e_400_lot) +
                                                parseFloat(item.issue_in_w_240) +
                                                parseFloat(item.issue_in_w_320) +
                                                parseFloat(item.issue_in_w_400) +
                                                
                                                parseFloat(item.issue_a_150) +
                                                parseFloat(item.issue_c_150) +
                                                parseFloat(item.issue_e_150) +
                                                parseFloat(item.issue_sw_150) +
                                                parseFloat(item.issue_ssw_150) +
                                                parseFloat(item.issue_k_150) +
                                                
                                                parseFloat(item.issue_a_180) +
                                                parseFloat(item.issue_c_180) +
                                                parseFloat(item.issue_e_180) +
                                                parseFloat(item.issue_sw_180) +
                                                parseFloat(item.issue_ssw_180) +
                                                parseFloat(item.issue_k_180) +
                                                
                                                parseFloat(item.issue_a_210) +
                                                parseFloat(item.issue_c_210) +
                                                parseFloat(item.issue_e_210) +
                                                parseFloat(item.issue_sw_210) +
                                                parseFloat(item.issue_ssw_210) +
                                                parseFloat(item.issue_k_210) +
                                                
                                                parseFloat(item.issue_a_240) +
                                                parseFloat(item.issue_c_240) +
                                                parseFloat(item.issue_e_240) +
                                                parseFloat(item.issue_sw_240) +
                                                parseFloat(item.issue_ssw_240) +
                                                parseFloat(item.issue_k_240) +
                                                
                                                parseFloat(item.issue_a_280) +
                                                parseFloat(item.issue_c_280) +
                                                parseFloat(item.issue_e_280) +
                                                parseFloat(item.issue_sw_280) +
                                                parseFloat(item.issue_ssw_280) +
                                                parseFloat(item.issue_k_280) +
                                                
                                                parseFloat(item.issue_a_320) +
                                                parseFloat(item.issue_c_320) +
                                                parseFloat(item.issue_e_320) +
                                                parseFloat(item.issue_sw_320) +
                                                parseFloat(item.issue_ssw_320) +
                                                parseFloat(item.issue_k_320) +
                                                
                                                parseFloat(item.issue_a_360) +
                                                parseFloat(item.issue_c_360) +
                                                parseFloat(item.issue_e_360) +
                                                parseFloat(item.issue_sw_360) +
                                                parseFloat(item.issue_ssw_360) +
                                                parseFloat(item.issue_k_360) +
                                                
                                                parseFloat(item.issue_a_400) +
                                                parseFloat(item.issue_c_400) +
                                                parseFloat(item.issue_e_400) +
                                                parseFloat(item.issue_sw_400) +
                                                parseFloat(item.issue_ssw_400) +
                                                parseFloat(item.issue_k_400))
                                                .toString()
                                        )}</TableCell>

                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_rejection)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_village)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_lw)}</TableCell>
                                    <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_bigTaiho)}</TableCell>


                                    {/* <TableCell className="text-center font-semibold text-blue-600">{formatNumber(item.entry_backlog)} kg</TableCell> */}

                                    <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(item.current_backlog)}kg</TableCell>




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
                            )
                        })) : (
                            Data.length > 0 ? (Data.map((item: WholesData, idx) => {
                                return (
                                    <TableRow key={item.id} className={`${item.latest == 1 ? '' : 'opacity-50 hover:bg-gray-200 bg-gray-200'}`}>
                                        <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                        <TableCell className="text-center font-bold ">{item.altid == 1 ? 'Fresh Issue' : 'Re-Issue'}</TableCell>

                                        <TableCell className="text-center font-bold text-orange-500">{item.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                        <TableCell className="text-center font-semibold ">{item.altid}</TableCell>
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>

                                        <TableCell className="text-center ">{item.mixingLot}</TableCell>
                                        {/* <TableCell className="text-center ">{item.rcv_transfer ? formatNumber(item.rcv_transfer):''}</TableCell> */}

                                        <TableCell className="text-center font-bold">{formatNumber(
                                                (parseFloat(item.current_backlog)+parseFloat(item.issue_pw_150) +
                                                    parseFloat(item.issue_w_150) +
                                                    parseFloat(item.issue_ww_150) +
                                                    parseFloat(item.issue_s_150) +
                                                    parseFloat(item.issue_aw_150) +
                                                    parseFloat(item.issue_lw_150) +
                                                    parseFloat(item.issue_pw_180) +
                                                    parseFloat(item.issue_w_180) +
                                                    parseFloat(item.issue_ww_180) +
                                                    parseFloat(item.issue_s_180) +
                                                    parseFloat(item.issue_aw_180) +
                                                    parseFloat(item.issue_lw_180) +
                                                    parseFloat(item.issue_pw_210) +
                                                    parseFloat(item.issue_w_210) +
                                                    parseFloat(item.issue_ww_210) +
                                                    parseFloat(item.issue_s_210) +
                                                    parseFloat(item.issue_aw_210) +
                                                    parseFloat(item.issue_lw_210) +
                                                    parseFloat(item.issue_pw_240) +
                                                    parseFloat(item.issue_w_240) +
                                                    parseFloat(item.issue_ww_240) +
                                                    parseFloat(item.issue_ww_240_A) +
                                                    parseFloat(item.issue_aw_240) +
                                                    parseFloat(item.issue_lw_240) +
                                                    parseFloat(item.issue_pw_280) +
                                                    parseFloat(item.issue_w_280) +
                                                    parseFloat(item.issue_ww_280) +
                                                    parseFloat(item.issue_ww_280_A) +
                                                    parseFloat(item.issue_aw_280) +
                                                    parseFloat(item.issue_lw_280) +
                                                    parseFloat(item.wholes_double) +
                                                    parseFloat(item.issue_pw_320) +
                                                    parseFloat(item.issue_w_320) +
                                                    parseFloat(item.issue_ww_320) +
                                                    parseFloat(item.issue_ww_320_A) +
                                                    parseFloat(item.issue_aw_320) +
                                                    parseFloat(item.issue_lw_320) +
                                                    parseFloat(item.issue_pw_360) +
                                                    parseFloat(item.issue_w_360) +
                                                    parseFloat(item.issue_ww_360) +
                                                    parseFloat(item.issue_ww_360_A) +
                                                    parseFloat(item.issue_aw_360) +
                                                    parseFloat(item.issue_lw_360) +
                                                    parseFloat(item.issue_pw_400) +
                                                    parseFloat(item.issue_w_400) +
                                                    parseFloat(item.issue_ww_400) +
                                                    parseFloat(item.issue_ww_400_A) +
                                                    parseFloat(item.issue_aw_400) +
                                                    parseFloat(item.issue_lw_400) +
                                                    parseFloat(item.issue_jjb) +parseFloat(item.issue_add_2)+
                                                    parseFloat(item.issue_jjb1)+parseFloat(item.issue_payal_240) +
                                                    parseFloat(item.issue_payal_400) +
                                                    parseFloat(item.issue_e_320_lot) +
                                                    parseFloat(item.issue_e_400_lot) +
                                                    parseFloat(item.issue_in_w_240) +
                                                    parseFloat(item.issue_in_w_320) +
                                                    parseFloat(item.issue_in_w_400) +
                                                    
                                                    parseFloat(item.issue_a_150) +
                                                    parseFloat(item.issue_c_150) +
                                                    parseFloat(item.issue_e_150) +
                                                    parseFloat(item.issue_sw_150) +
                                                    parseFloat(item.issue_ssw_150) +
                                                    parseFloat(item.issue_k_150) +
                                                    
                                                    parseFloat(item.issue_a_180) +
                                                    parseFloat(item.issue_c_180) +
                                                    parseFloat(item.issue_e_180) +
                                                    parseFloat(item.issue_sw_180) +
                                                    parseFloat(item.issue_ssw_180) +
                                                    parseFloat(item.issue_k_180) +
                                                    
                                                    parseFloat(item.issue_a_210) +
                                                    parseFloat(item.issue_c_210) +
                                                    parseFloat(item.issue_e_210) +
                                                    parseFloat(item.issue_sw_210) +
                                                    parseFloat(item.issue_ssw_210) +
                                                    parseFloat(item.issue_k_210) +
                                                    
                                                    parseFloat(item.issue_a_240) +
                                                    parseFloat(item.issue_c_240) +
                                                    parseFloat(item.issue_e_240) +
                                                    parseFloat(item.issue_sw_240) +
                                                    parseFloat(item.issue_ssw_240) +
                                                    parseFloat(item.issue_k_240) +
                                                    
                                                    parseFloat(item.issue_a_280) +
                                                    parseFloat(item.issue_c_280) +
                                                    parseFloat(item.issue_e_280) +
                                                    parseFloat(item.issue_sw_280) +
                                                    parseFloat(item.issue_ssw_280) +
                                                    parseFloat(item.issue_k_280) +
                                                    
                                                    parseFloat(item.issue_a_320) +
                                                    parseFloat(item.issue_c_320) +
                                                    parseFloat(item.issue_e_320) +
                                                    parseFloat(item.issue_sw_320) +
                                                    parseFloat(item.issue_ssw_320) +
                                                    parseFloat(item.issue_k_320) +
                                                    
                                                    parseFloat(item.issue_a_360) +
                                                    parseFloat(item.issue_c_360) +
                                                    parseFloat(item.issue_e_360) +
                                                    parseFloat(item.issue_sw_360) +
                                                    parseFloat(item.issue_ssw_360) +
                                                    parseFloat(item.issue_k_360) +
                                                    
                                                    parseFloat(item.issue_a_400) +
                                                    parseFloat(item.issue_c_400) +
                                                    parseFloat(item.issue_e_400) +
                                                    parseFloat(item.issue_sw_400) +
                                                    parseFloat(item.issue_ssw_400) +
                                                    parseFloat(item.issue_k_400)+
                                                    parseFloat(item.issue_rejection)+parseFloat(item.issue_village)+parseFloat(item.issue_lw)+parseFloat(item.issue_bigTaiho))
                                                    .toString()
                                            )} Kg</TableCell>
                                        <TableCell className="text-center font-bold text-red-500 ">{formatNumber(item.issue_add_3)} %</TableCell>
                                        <TableCell className="text-center font-semibold  text-red-500">{formatNumber(item.issue_add_2)} Kg</TableCell>

                                        <TableCell className="text-center ">{formatNumber(item.rcv_pw_210)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_w_210)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_ww_210)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_pw_240)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_w_240)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_ww_240)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_pw_280)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_w_280)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_ww_280)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_pw_320)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_w_320)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_ww_320)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_pw_360)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_w_360)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_ww_360)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_pw_400)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_w_400)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_ww_400)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.rcv_jb_hamsa)}</TableCell>
                                        <TableCell className="text-center font-semibold bg-yellow-100">
                                            {formatNumber(
                                                (parseFloat(item.rcv_pw_210) +
                                                    parseFloat(item.rcv_w_210) +
                                                    parseFloat(item.rcv_ww_210) +
                                                    parseFloat(item.rcv_pw_240) +
                                                    parseFloat(item.rcv_w_240) +
                                                    parseFloat(item.rcv_ww_240) +
                                                    parseFloat(item.rcv_pw_280) +
                                                    parseFloat(item.rcv_w_280) +
                                                    parseFloat(item.rcv_ww_280) +
                                                    parseFloat(item.rcv_pw_320) +
                                                    parseFloat(item.rcv_w_320) +
                                                    parseFloat(item.rcv_ww_320) +
                                                    parseFloat(item.rcv_pw_360) +
                                                    parseFloat(item.rcv_w_360) +
                                                    parseFloat(item.rcv_ww_360) +
                                                    parseFloat(item.rcv_pw_400) +
                                                    parseFloat(item.rcv_w_400) +
                                                    parseFloat(item.rcv_ww_400) +
                                                    parseFloat(item.rcv_jb_hamsa))
                                                    .toString()
                                            )}
                                            {/* {formatNumber(String(parseFloat(item.issue_add_1)-parseFloat(item.rcv_jb_mayur)))} */}
                                        </TableCell>
                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(item.rcv_jb_mayur)}</TableCell>

                                        <TableCell className="text-center font-bold bg-green-500 text-white">
                                        {formatNumber(
                                                (parseFloat(item.current_backlog)+parseFloat(item.issue_pw_150) +
                                                    parseFloat(item.issue_w_150) +
                                                    parseFloat(item.issue_ww_150) +
                                                    parseFloat(item.issue_s_150) +
                                                    parseFloat(item.issue_aw_150) +
                                                    parseFloat(item.issue_lw_150) +
                                                    parseFloat(item.issue_pw_180) +
                                                    parseFloat(item.issue_w_180) +
                                                    parseFloat(item.issue_ww_180) +
                                                    parseFloat(item.issue_s_180) +
                                                    parseFloat(item.issue_aw_180) +
                                                    parseFloat(item.issue_lw_180) +
                                                    parseFloat(item.issue_pw_210) +
                                                    parseFloat(item.issue_w_210) +
                                                    parseFloat(item.issue_ww_210) +
                                                    parseFloat(item.issue_s_210) +
                                                    parseFloat(item.issue_aw_210) +
                                                    parseFloat(item.issue_lw_210) +
                                                    parseFloat(item.issue_pw_240) +
                                                    parseFloat(item.issue_w_240) +
                                                    parseFloat(item.issue_ww_240) +
                                                    parseFloat(item.issue_ww_240_A) +
                                                    parseFloat(item.issue_aw_240) +
                                                    parseFloat(item.issue_lw_240) +
                                                    parseFloat(item.issue_pw_280) +
                                                    parseFloat(item.issue_w_280) +
                                                    parseFloat(item.issue_ww_280) +
                                                    parseFloat(item.issue_ww_280_A) +
                                                    parseFloat(item.issue_aw_280) +
                                                    parseFloat(item.issue_lw_280) +
                                                    parseFloat(item.wholes_double) +
                                                    parseFloat(item.issue_pw_320) +
                                                    parseFloat(item.issue_w_320) +
                                                    parseFloat(item.issue_ww_320) +
                                                    parseFloat(item.issue_ww_320_A) +
                                                    parseFloat(item.issue_aw_320) +
                                                    parseFloat(item.issue_lw_320) +
                                                    parseFloat(item.issue_pw_360) +
                                                    parseFloat(item.issue_w_360) +
                                                    parseFloat(item.issue_ww_360) +
                                                    parseFloat(item.issue_ww_360_A) +
                                                    parseFloat(item.issue_aw_360) +
                                                    parseFloat(item.issue_lw_360) +
                                                    parseFloat(item.issue_pw_400) +
                                                    parseFloat(item.issue_w_400) +
                                                    parseFloat(item.issue_ww_400) +
                                                    parseFloat(item.issue_ww_400_A) +
                                                    parseFloat(item.issue_aw_400) +
                                                    parseFloat(item.issue_lw_400) +
                                                    parseFloat(item.issue_jjb) +parseFloat(item.issue_payal_240) +
                                                    parseFloat(item.issue_payal_400) +
                                                    parseFloat(item.issue_e_320_lot) +
                                                    parseFloat(item.issue_e_400_lot) +
                                                    parseFloat(item.issue_in_w_240) +
                                                    parseFloat(item.issue_in_w_320) +
                                                    parseFloat(item.issue_in_w_400) +
                                                    
                                                    parseFloat(item.issue_a_150) +
                                                    parseFloat(item.issue_c_150) +
                                                    parseFloat(item.issue_e_150) +
                                                    parseFloat(item.issue_sw_150) +
                                                    parseFloat(item.issue_ssw_150) +
                                                    parseFloat(item.issue_k_150) +
                                                    
                                                    parseFloat(item.issue_a_180) +
                                                    parseFloat(item.issue_c_180) +
                                                    parseFloat(item.issue_e_180) +
                                                    parseFloat(item.issue_sw_180) +
                                                    parseFloat(item.issue_ssw_180) +
                                                    parseFloat(item.issue_k_180) +
                                                    
                                                    parseFloat(item.issue_a_210) +
                                                    parseFloat(item.issue_c_210) +
                                                    parseFloat(item.issue_e_210) +
                                                    parseFloat(item.issue_sw_210) +
                                                    parseFloat(item.issue_ssw_210) +
                                                    parseFloat(item.issue_k_210) +
                                                    
                                                    parseFloat(item.issue_a_240) +
                                                    parseFloat(item.issue_c_240) +
                                                    parseFloat(item.issue_e_240) +
                                                    parseFloat(item.issue_sw_240) +
                                                    parseFloat(item.issue_ssw_240) +
                                                    parseFloat(item.issue_k_240) +
                                                    
                                                    parseFloat(item.issue_a_280) +
                                                    parseFloat(item.issue_c_280) +
                                                    parseFloat(item.issue_e_280) +
                                                    parseFloat(item.issue_sw_280) +
                                                    parseFloat(item.issue_ssw_280) +
                                                    parseFloat(item.issue_k_280) +
                                                    
                                                    parseFloat(item.issue_a_320) +
                                                    parseFloat(item.issue_c_320) +
                                                    parseFloat(item.issue_e_320) +
                                                    parseFloat(item.issue_sw_320) +
                                                    parseFloat(item.issue_ssw_320) +
                                                    parseFloat(item.issue_k_320) +
                                                    
                                                    parseFloat(item.issue_a_360) +
                                                    parseFloat(item.issue_c_360) +
                                                    parseFloat(item.issue_e_360) +
                                                    parseFloat(item.issue_sw_360) +
                                                    parseFloat(item.issue_ssw_360) +
                                                    parseFloat(item.issue_k_360) +
                                                    
                                                    parseFloat(item.issue_a_400) +
                                                    parseFloat(item.issue_c_400) +
                                                    parseFloat(item.issue_e_400) +
                                                    parseFloat(item.issue_sw_400) +
                                                    parseFloat(item.issue_ssw_400) +
                                                    parseFloat(item.issue_k_400)+
                                                    parseFloat(item.issue_jjb1)+parseFloat(item.issue_rejection)+parseFloat(item.issue_village)+parseFloat(item.issue_lw)+parseFloat(item.issue_bigTaiho))
                                                    .toString()
                                            )}
                                            
                                        </TableCell>


                                        <TableCell className="text-center ">{formatNumber(item.issue_pw_150)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_w_150)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_150)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_s_150)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_aw_150)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_lw_150)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_pw_180)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_w_180)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_180)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_s_180)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_aw_180)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_lw_180)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_pw_210)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_w_210)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_210)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_s_210)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_aw_210)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_lw_210)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_pw_240)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_w_240)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_240)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_240_A)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_aw_240)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_lw_240)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_pw_280)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_w_280)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_280)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_280_A)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_aw_280)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_lw_280)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.wholes_double)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_pw_320)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_w_320)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_320)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_320_A)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_aw_320)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_lw_320)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_pw_360)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_w_360)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_360)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_360_A)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_aw_360)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_lw_360)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_pw_400)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_w_400)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_400)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_ww_400_A)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_aw_400)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_lw_400)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_jjb)}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.issue_jjb1)}</TableCell>

                                        <TableCell className="text-center">{formatNumber(item.issue_payal_240)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_payal_400)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_320_lot)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_400_lot)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_in_w_240)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_in_w_320)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_in_w_400)}</TableCell>

                                        <TableCell className="text-center font-semibold bg-neutral-500 text-white">Lot---Vil</TableCell>

                                        <TableCell className="text-center">{formatNumber(item.issue_a_150)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_c_150)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_150)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_sw_150)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_ssw_150)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_k_150)}</TableCell>

                                        <TableCell className="text-center">{formatNumber(item.issue_a_180)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_c_180)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_180)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_sw_180)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_ssw_180)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_k_180)}</TableCell>

                                        <TableCell className="text-center">{formatNumber(item.issue_a_210)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_c_210)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_210)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_sw_210)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_ssw_210)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_k_210)}</TableCell>

                                        <TableCell className="text-center">{formatNumber(item.issue_a_240)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_c_240)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_240)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_sw_240)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_ssw_240)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_k_240)}</TableCell>

                                        <TableCell className="text-center">{formatNumber(item.issue_a_280)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_c_280)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_280)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_sw_280)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_ssw_280)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_k_280)}</TableCell>

                                        <TableCell className="text-center">{formatNumber(item.issue_a_320)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_c_320)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_320)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_sw_320)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_ssw_320)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_k_320)}</TableCell>

                                        <TableCell className="text-center">{formatNumber(item.issue_a_360)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_c_360)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_360)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_sw_360)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_ssw_360)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_k_360)}</TableCell>

                                        <TableCell className="text-center">{formatNumber(item.issue_a_400)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_c_400)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_e_400)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_sw_400)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_ssw_400)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.issue_k_400)}</TableCell>

                                        <TableCell className="text-center font-semibold bg-red-100">
                                            {formatNumber(
                                                (parseFloat(item.issue_pw_150) +
                                                    parseFloat(item.issue_w_150) +
                                                    parseFloat(item.issue_ww_150) +
                                                    parseFloat(item.issue_s_150) +
                                                    parseFloat(item.issue_aw_150) +
                                                    parseFloat(item.issue_lw_150) +
                                                    parseFloat(item.issue_pw_180) +
                                                    parseFloat(item.issue_w_180) +
                                                    parseFloat(item.issue_ww_180) +
                                                    parseFloat(item.issue_s_180) +
                                                    parseFloat(item.issue_aw_180) +
                                                    parseFloat(item.issue_lw_180) +
                                                    parseFloat(item.issue_pw_210) +
                                                    parseFloat(item.issue_w_210) +
                                                    parseFloat(item.issue_ww_210) +
                                                    parseFloat(item.issue_s_210) +
                                                    parseFloat(item.issue_aw_210) +
                                                    parseFloat(item.issue_lw_210) +
                                                    parseFloat(item.issue_pw_240) +
                                                    parseFloat(item.issue_w_240) +
                                                    parseFloat(item.issue_ww_240) +
                                                    parseFloat(item.issue_ww_240_A) +
                                                    parseFloat(item.issue_aw_240) +
                                                    parseFloat(item.issue_lw_240) +
                                                    parseFloat(item.issue_pw_280) +
                                                    parseFloat(item.issue_w_280) +
                                                    parseFloat(item.issue_ww_280) +
                                                    parseFloat(item.issue_ww_280_A) +
                                                    parseFloat(item.issue_aw_280) +
                                                    parseFloat(item.issue_lw_280) +
                                                    parseFloat(item.wholes_double) +
                                                    parseFloat(item.issue_pw_320) +
                                                    parseFloat(item.issue_w_320) +
                                                    parseFloat(item.issue_ww_320) +
                                                    parseFloat(item.issue_ww_320_A) +
                                                    parseFloat(item.issue_aw_320) +
                                                    parseFloat(item.issue_lw_320) +
                                                    parseFloat(item.issue_pw_360) +
                                                    parseFloat(item.issue_w_360) +
                                                    parseFloat(item.issue_ww_360) +
                                                    parseFloat(item.issue_ww_360_A) +
                                                    parseFloat(item.issue_aw_360) +
                                                    parseFloat(item.issue_lw_360) +
                                                    parseFloat(item.issue_pw_400) +
                                                    parseFloat(item.issue_w_400) +
                                                    parseFloat(item.issue_ww_400) +
                                                    parseFloat(item.issue_ww_400_A) +
                                                    parseFloat(item.issue_aw_400) +
                                                    parseFloat(item.issue_lw_400) +
                                                    parseFloat(item.issue_jjb) +
                                                    parseFloat(item.issue_jjb1)+parseFloat(item.issue_payal_240) +
                                                    parseFloat(item.issue_payal_400) +
                                                    parseFloat(item.issue_e_320_lot) +
                                                    parseFloat(item.issue_e_400_lot) +
                                                    parseFloat(item.issue_in_w_240) +
                                                    parseFloat(item.issue_in_w_320) +
                                                    parseFloat(item.issue_in_w_400) +
                                                    
                                                    parseFloat(item.issue_a_150) +
                                                    parseFloat(item.issue_c_150) +
                                                    parseFloat(item.issue_e_150) +
                                                    parseFloat(item.issue_sw_150) +
                                                    parseFloat(item.issue_ssw_150) +
                                                    parseFloat(item.issue_k_150) +
                                                    
                                                    parseFloat(item.issue_a_180) +
                                                    parseFloat(item.issue_c_180) +
                                                    parseFloat(item.issue_e_180) +
                                                    parseFloat(item.issue_sw_180) +
                                                    parseFloat(item.issue_ssw_180) +
                                                    parseFloat(item.issue_k_180) +
                                                    
                                                    parseFloat(item.issue_a_210) +
                                                    parseFloat(item.issue_c_210) +
                                                    parseFloat(item.issue_e_210) +
                                                    parseFloat(item.issue_sw_210) +
                                                    parseFloat(item.issue_ssw_210) +
                                                    parseFloat(item.issue_k_210) +
                                                    
                                                    parseFloat(item.issue_a_240) +
                                                    parseFloat(item.issue_c_240) +
                                                    parseFloat(item.issue_e_240) +
                                                    parseFloat(item.issue_sw_240) +
                                                    parseFloat(item.issue_ssw_240) +
                                                    parseFloat(item.issue_k_240) +
                                                    
                                                    parseFloat(item.issue_a_280) +
                                                    parseFloat(item.issue_c_280) +
                                                    parseFloat(item.issue_e_280) +
                                                    parseFloat(item.issue_sw_280) +
                                                    parseFloat(item.issue_ssw_280) +
                                                    parseFloat(item.issue_k_280) +
                                                    
                                                    parseFloat(item.issue_a_320) +
                                                    parseFloat(item.issue_c_320) +
                                                    parseFloat(item.issue_e_320) +
                                                    parseFloat(item.issue_sw_320) +
                                                    parseFloat(item.issue_ssw_320) +
                                                    parseFloat(item.issue_k_320) +
                                                    
                                                    parseFloat(item.issue_a_360) +
                                                    parseFloat(item.issue_c_360) +
                                                    parseFloat(item.issue_e_360) +
                                                    parseFloat(item.issue_sw_360) +
                                                    parseFloat(item.issue_ssw_360) +
                                                    parseFloat(item.issue_k_360) +
                                                    
                                                    parseFloat(item.issue_a_400) +
                                                    parseFloat(item.issue_c_400) +
                                                    parseFloat(item.issue_e_400) +
                                                    parseFloat(item.issue_sw_400) +
                                                    parseFloat(item.issue_ssw_400) +
                                                    parseFloat(item.issue_k_400))
                                                    .toString()
                                            )}</TableCell>

                                        <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_rejection)}</TableCell>
                                        <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_village)}</TableCell>
                                        <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_lw)}</TableCell>
                                        <TableCell className="text-center font-semibold bg-red-100">{formatNumber(item.issue_bigTaiho)}</TableCell>


                                        {/* <TableCell className="text-center font-semibold text-blue-600">{formatNumber(item.entry_backlog)} kg</TableCell> */}

                                        <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(item.current_backlog)}kg</TableCell>




                                        <TableCell className="text-center">{item.noOfdayOperators}</TableCell>
                                        <TableCell className="text-center">{item.noOfnightOperators}</TableCell>
                                        <TableCell className="text-center">{item.editStatus}</TableCell>
                                        <TableCell className="text-center">{item.CreatedBy}</TableCell>
                                        <TableCell className="text-center">
                                            <Popover>
                                                <PopoverTrigger>
                                                    <button className={`p-2 text-white rounded ${item.editStatus === 'Pending' || item.latest === 0 ? 'bg-cyan-200' : 'bg-cyan-500'}`} disabled={item.editStatus === 'Pending' || item.latest === 0 ? true : false}>Action</button>
                                                </PopoverTrigger>
                                                <PopoverContent className="flex flex-col text-sm w-30 font-medium">
                                                    <Dialog>
                                                        <DialogTrigger className="flex"><CiEdit size={20} />
                                                            <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Modify</button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-screen">
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className='text-1xl pb-1 text-center mt-1'>Wholes Entry Modification</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <WholesEditForm borma={[item]} />
                                                        </DialogContent>

                                                    </Dialog>
                                                    {Number(item.current_backlog) > 0 && <Dialog>
                                                        <DialogTrigger className="flex"><CiBoxes size={20} />
                                                            <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Re-Issue</button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-screen">
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className='text-1xl pb-1 text-center mt-1'>Wholes Entry Reissue</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <RCNWholesReCreateForm borma={[item]} />
                                                        </DialogContent>

                                                    </Dialog>}
                                                    {Number(item.current_backlog) > 0 && <Dialog>
                                                        <DialogTrigger className="flex"><CiCrop size={20} />
                                                            <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Mix</button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-screen ">
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    {/* <p className='text-1xl pb-1 text-center mt-1'>Mayur Entry Mixation</p> */}
                                                                    <p className='text-1xl pb-1 text-center mt-3'>Lot No : {item.LotNo} ({item.origin})</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <RCNWholesReMix borma={item} />
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

export default WholesTable;