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


const WholesTable = (props:any) => {
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
   // const [hidetodate, sethidetoDate] = useState<string>('');
    const currDate = new Date().toLocaleDateString();
    const [origin, setOrigin] = useState<string>("")
    const [blockpagen, setblockpagen] = useState('flex')
    const [EditData, setEditData] = useState<WholesData[]>([])
    const [blConNo, setBlConNo] = useState<string>("")
    const { editWholesLotWiseData } = useContext(Context);
    const [Data, setData] = useState<WholesData[]>([])
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
    //           if (searchType === 'LOT') {
    //              const response = await axios.put('/api/wholes/wholesprimarysearch', {
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
    //         transformed = EditData.map((item: WholesData, idx: number) => ({
    //             Sl_No: idx + 1,
    //             Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
    //             Item_Lot_No: item.LotNo,
    //             Origin: item.origin,
    //             Issue_No: item.altid,
    //             Wholes_Entry_Date: handletimezone(item.date),
    //             Mixing_Lot: item.mixingLot,
    //             Receive_pw_210: item.rcv_pw_210,
    //             Receive_w_210: item.rcv_w_210,
    //             Receive_ww_210: item.rcv_ww_210,
    //             Receive_pw_240: item.rcv_pw_240,
    //             Receive_w_240: item.rcv_w_240,
    //             Receive_ww_240: item.rcv_ww_240,
    //             Receive_pw_280: item.rcv_pw_280,
    //             Receive_w_280: item.rcv_w_280,
    //             Receive_ww_280: item.rcv_ww_280,
    //             Receive_pw_320: item.rcv_pw_320,
    //             Receive_w_320: item.rcv_w_320,
    //             Receive_ww_320: item.rcv_ww_320,
    //             Receive_pw_360: item.rcv_pw_360,
    //             Receive_w_360: item.rcv_w_360,
    //             Receive_ww_360: item.rcv_ww_360,
    //             Receive_pw_400: item.rcv_pw_400,
    //             Receive_w_400: item.rcv_w_400,
    //             Receive_ww_400: item.rcv_ww_400,
    //             Receive_jb_mayur: item.rcv_jb_mayur,
    //             Receive_jb_hamsa: item.rcv_jb_hamsa,
    //             Receive_Total: formatNumber((parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
    //                 + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
    //                 + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
    //                 + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
    //                 + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
    //                 + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
    //                 + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa) + parseFloat((item.issue_add_2))).toString()),
    //             Receive_Total_Borma: formatNumber((parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
    //                 + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
    //                 + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
    //                 + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
    //                 + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
    //                 + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
    //                 + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa)).toString()),
    //             Borma_Loss_Kg: formatNumber(item.issue_add_2),
    //             Borma_Loss_Percentage: formatNumber((((Number(item.issue_add_2))/(parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
    //             + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
    //             + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
    //             + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
    //             + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
    //             + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
    //             + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa)))*100).toString()),
    //             Issue_pw_150: formatNumber(item.issue_pw_150),
    //             Issue_w_150: formatNumber(item.issue_w_150),
    //             Issue_ww_150: formatNumber(item.issue_ww_150),
    //             Issue_s_150: formatNumber(item.issue_s_150),
    //             Issue_aw_150: formatNumber(item.issue_aw_150),
    //             Issue_lw_150: formatNumber(item.issue_lw_150),
    //             Issue_pw_180: formatNumber(item.issue_pw_180),
    //             Issue_w_180: formatNumber(item.issue_w_180),
    //             Issue_ww_180: formatNumber(item.issue_ww_180),
    //             Issue_s_180: formatNumber(item.issue_s_180),
    //             Issue_aw_180: formatNumber(item.issue_aw_180),
    //             Issue_lw_180: formatNumber(item.issue_lw_180),
    //             Issue_pw_210: formatNumber(item.issue_pw_210),
    //             Issue_w_210: formatNumber(item.issue_w_210),
    //             Issue_ww_210: formatNumber(item.issue_ww_210),
    //             Issue_s_210: formatNumber(item.issue_s_210),
    //             Issue_aw_210: formatNumber(item.issue_aw_210),
    //             Issue_lw_210: formatNumber(item.issue_lw_210),
    //             Issue_pw_240: formatNumber(item.issue_pw_240),
    //             Issue_w_240: formatNumber(item.issue_w_240),
    //             Issue_ww_240: formatNumber(item.issue_ww_240),
    //             Issue_ww_240_A: formatNumber(item.issue_ww_240_A),
    //             Issue_aw_240: formatNumber(item.issue_aw_240),
    //             Issue_lw_240: formatNumber(item.issue_lw_240),
    //             Issue_pw_280: formatNumber(item.issue_pw_280),
    //             Issue_w_280: formatNumber(item.issue_w_280),
    //             Issue_ww_280: formatNumber(item.issue_ww_280),
    //             Issue_ww_280_A: formatNumber(item.issue_ww_280_A),
    //             Issue_aw_280: formatNumber(item.issue_aw_280),
    //             Issue_lw_280: formatNumber(item.issue_lw_280),
    //             Wholes_double: formatNumber(item.wholes_double),
    //             Issue_pw_320: formatNumber(item.issue_pw_320),
    //             Issue_w_320: formatNumber(item.issue_w_320),
    //             Issue_ww_320: formatNumber(item.issue_ww_320),
    //             Issue_ww_320_A: formatNumber(item.issue_ww_320_A),
    //             Issue_aw_320: formatNumber(item.issue_aw_320),
    //             Issue_lw_320: formatNumber(item.issue_lw_320),
    //             Issue_pw_360: formatNumber(item.issue_pw_360),
    //             Issue_w_360: formatNumber(item.issue_w_360),
    //             Issue_ww_360: formatNumber(item.issue_ww_360),
    //             Issue_ww_360_A: formatNumber(item.issue_ww_360_A),
    //             Issue_aw_360: formatNumber(item.issue_aw_360),
    //             Issue_lw_360: formatNumber(item.issue_lw_360),
    //             Issue_pw_400: formatNumber(item.issue_pw_400),
    //             Issue_w_400: formatNumber(item.issue_w_400),
    //             Issue_ww_400: formatNumber(item.issue_ww_400),
    //             Issue_ww_400_A: formatNumber(item.issue_ww_400_A),
    //             Issue_aw_400: formatNumber(item.issue_aw_400),
    //             Issue_lw_400: formatNumber(item.issue_lw_400),
    //             Issue_jjb: formatNumber(item.issue_jjb),
    //             Issue_jjb1: formatNumber(item.issue_jjb1),
    //             Issue_payal_240: formatNumber(item.issue_payal_240),
    //             Issue_payal_400: formatNumber(item.issue_payal_400),
    //             Issue_e_320_lot: formatNumber(item.issue_e_320_lot),
    //             Issue_e_400_lot: formatNumber(item.issue_e_400_lot),
    //             Issue_in_w_240: formatNumber(item.issue_in_w_240),
    //             Issue_in_w_320: formatNumber(item.issue_in_w_320),
    //             Issue_in_w_400: formatNumber(item.issue_in_w_400),

    //             Issue_a_150: formatNumber(item.issue_a_150),
    //             Issue_c_150: formatNumber(item.issue_c_150),
    //             Issue_e_150: formatNumber(item.issue_e_150),
    //             Issue_sw_150: formatNumber(item.issue_sw_150),
    //             Issue_ssw_150: formatNumber(item.issue_ssw_150),
    //             Issue_k_150: formatNumber(item.issue_k_150),

    //             Issue_a_180: formatNumber(item.issue_a_180),
    //             Issue_c_180: formatNumber(item.issue_c_180),
    //             Issue_e_180: formatNumber(item.issue_e_180),
    //             Issue_sw_180: formatNumber(item.issue_sw_180),
    //             Issue_ssw_180: formatNumber(item.issue_ssw_180),
    //             Issue_k_180: formatNumber(item.issue_k_180),

    //             Issue_a_210: formatNumber(item.issue_a_210),
    //             Issue_c_210: formatNumber(item.issue_c_210),
    //             Issue_e_210: formatNumber(item.issue_e_210),
    //             Issue_sw_210: formatNumber(item.issue_sw_210),
    //             Issue_ssw_210: formatNumber(item.issue_ssw_210),
    //             Issue_k_210: formatNumber(item.issue_k_210),

    //             Issue_a_240: formatNumber(item.issue_a_240),
    //             Issue_c_240: formatNumber(item.issue_c_240),
    //             Issue_e_240: formatNumber(item.issue_e_240),
    //             Issue_sw_240: formatNumber(item.issue_sw_240),
    //             Issue_ssw_240: formatNumber(item.issue_ssw_240),
    //             Issue_k_240: formatNumber(item.issue_k_240),

    //             Issue_a_280: formatNumber(item.issue_a_280),
    //             Issue_c_280: formatNumber(item.issue_c_280),
    //             Issue_e_280: formatNumber(item.issue_e_280),
    //             Issue_sw_280: formatNumber(item.issue_sw_280),
    //             Issue_ssw_280: formatNumber(item.issue_ssw_280),
    //             Issue_k_280: formatNumber(item.issue_k_280),

    //             Issue_a_320: formatNumber(item.issue_a_320),
    //             Issue_c_320: formatNumber(item.issue_c_320),
    //             Issue_e_320: formatNumber(item.issue_e_320),
    //             Issue_sw_320: formatNumber(item.issue_sw_320),
    //             Issue_ssw_320: formatNumber(item.issue_ssw_320),
    //             Issue_k_320: formatNumber(item.issue_k_320),

    //             Issue_a_360: formatNumber(item.issue_a_360),
    //             Issue_c_360: formatNumber(item.issue_c_360),
    //             Issue_e_360: formatNumber(item.issue_e_360),
    //             Issue_sw_360: formatNumber(item.issue_sw_360),
    //             Issue_ssw_360: formatNumber(item.issue_ssw_360),
    //             Issue_k_360: formatNumber(item.issue_k_360),

    //             Issue_a_400: formatNumber(item.issue_a_400),
    //             Issue_c_400: formatNumber(item.issue_c_400),
    //             Issue_e_400: formatNumber(item.issue_e_400),
    //             Issue_sw_400: formatNumber(item.issue_sw_400),
    //             Issue_ssw_400: formatNumber(item.issue_ssw_400),
    //             Issue_k_400: formatNumber(item.issue_k_400),
    //             Issue_rejection: formatNumber(item.issue_rejection),
    //             Issue_village: formatNumber(item.issue_village),
    //             Issue_bigTaiho: formatNumber(item.issue_bigTaiho),
    //             Issue_lw: formatNumber(item.issue_lw),
    //             Issue_Packing: formatNumber((parseFloat(item.issue_pw_150) + parseFloat(item.issue_w_150) + parseFloat(item.issue_ww_150)
    //                 + parseFloat(item.issue_s_150) + parseFloat(item.issue_aw_150) + parseFloat(item.issue_lw_150)
    //                 + parseFloat(item.issue_pw_180) + parseFloat(item.issue_w_180) + parseFloat(item.issue_ww_180)
    //                 + parseFloat(item.issue_s_180) + parseFloat(item.issue_aw_180) + parseFloat(item.issue_lw_180)
    //                 + parseFloat(item.issue_pw_210) + parseFloat(item.issue_w_210) + parseFloat(item.issue_ww_210)
    //                 + parseFloat(item.issue_s_210) + parseFloat(item.issue_aw_210) + parseFloat(item.issue_lw_210)
    //                 + parseFloat(item.issue_pw_240) + parseFloat(item.issue_w_240) + parseFloat(item.issue_ww_240)
    //                 + parseFloat(item.issue_ww_240_A) + parseFloat(item.issue_aw_240) + parseFloat(item.issue_lw_240)
    //                 + parseFloat(item.issue_pw_280) + parseFloat(item.issue_w_280) + parseFloat(item.issue_ww_280)
    //                 + parseFloat(item.issue_ww_280_A) + parseFloat(item.issue_aw_280) + parseFloat(item.issue_lw_280)
    //                 + parseFloat(item.wholes_double) + parseFloat(item.issue_pw_320) + parseFloat(item.issue_w_320)
    //                 + parseFloat(item.issue_ww_320) + parseFloat(item.issue_ww_320_A) + parseFloat(item.issue_aw_320)
    //                 + parseFloat(item.issue_lw_320) + parseFloat(item.issue_pw_360) + parseFloat(item.issue_w_360)
    //                 + parseFloat(item.issue_ww_360) + parseFloat(item.issue_ww_360_A) + parseFloat(item.issue_aw_360)
    //                 + parseFloat(item.issue_lw_360) + parseFloat(item.issue_pw_400) + parseFloat(item.issue_w_400)
    //                 + parseFloat(item.issue_ww_400) + parseFloat(item.issue_ww_400_A) + parseFloat(item.issue_aw_400) + parseFloat(item.issue_lw_400)
    //                 +parseFloat(item.issue_payal_240) +
    //                 parseFloat(item.issue_payal_400) +
    //                 parseFloat(item.issue_e_320_lot) +
    //                 parseFloat(item.issue_e_400_lot) +
    //                 parseFloat(item.issue_in_w_240) +
    //                 parseFloat(item.issue_in_w_320) +
    //                 parseFloat(item.issue_in_w_400) +
                    
    //                 parseFloat(item.issue_a_150) +
    //                 parseFloat(item.issue_c_150) +
    //                 parseFloat(item.issue_e_150) +
    //                 parseFloat(item.issue_sw_150) +
    //                 parseFloat(item.issue_ssw_150) +
    //                 parseFloat(item.issue_k_150) +
                    
    //                 parseFloat(item.issue_a_180) +
    //                 parseFloat(item.issue_c_180) +
    //                 parseFloat(item.issue_e_180) +
    //                 parseFloat(item.issue_sw_180) +
    //                 parseFloat(item.issue_ssw_180) +
    //                 parseFloat(item.issue_k_180) +
                    
    //                 parseFloat(item.issue_a_210) +
    //                 parseFloat(item.issue_c_210) +
    //                 parseFloat(item.issue_e_210) +
    //                 parseFloat(item.issue_sw_210) +
    //                 parseFloat(item.issue_ssw_210) +
    //                 parseFloat(item.issue_k_210) +
                    
    //                 parseFloat(item.issue_a_240) +
    //                 parseFloat(item.issue_c_240) +
    //                 parseFloat(item.issue_e_240) +
    //                 parseFloat(item.issue_sw_240) +
    //                 parseFloat(item.issue_ssw_240) +
    //                 parseFloat(item.issue_k_240) +
                    
    //                 parseFloat(item.issue_a_280) +
    //                 parseFloat(item.issue_c_280) +
    //                 parseFloat(item.issue_e_280) +
    //                 parseFloat(item.issue_sw_280) +
    //                 parseFloat(item.issue_ssw_280) +
    //                 parseFloat(item.issue_k_280) +
                    
    //                 parseFloat(item.issue_a_320) +
    //                 parseFloat(item.issue_c_320) +
    //                 parseFloat(item.issue_e_320) +
    //                 parseFloat(item.issue_sw_320) +
    //                 parseFloat(item.issue_ssw_320) +
    //                 parseFloat(item.issue_k_320) +
                    
    //                 parseFloat(item.issue_a_360) +
    //                 parseFloat(item.issue_c_360) +
    //                 parseFloat(item.issue_e_360) +
    //                 parseFloat(item.issue_sw_360) +
    //                 parseFloat(item.issue_ssw_360) +
    //                 parseFloat(item.issue_k_360) +
                    
    //                 parseFloat(item.issue_a_400) +
    //                 parseFloat(item.issue_c_400) +
    //                 parseFloat(item.issue_e_400) +
    //                 parseFloat(item.issue_sw_400) +
    //                 parseFloat(item.issue_ssw_400) +
    //                 parseFloat(item.issue_k_400)+ parseFloat(item.issue_jjb)+ parseFloat(item.issue_jjb1)).toString()),
    //             Issue_Village: formatNumber(item.issue_village),
    //             Issue_BigTaiho: formatNumber(item.issue_bigTaiho),
    //             Issue_LW: formatNumber(item.issue_lw),
    //             Issue_Rejection: formatNumber(item.issue_rejection),

    //             Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),

    //             Operator_Day: item.noOfdayOperators,
    //             Operator_Night: item.noOfnightOperators,
    //             Edit_Status: item.editStatus,
    //             Created_By: item.CreatedBy,
    //             Modified_By: item.modifiedBy

    //         }));
    //         //setTransformedData(transformed);
    //         ws = XLSX.utils.json_to_sheet(transformed);
    //     }
    //     else {
    //         transformed = data1.rcnEntries.map((item: WholesData, idx: number) => ({
    //             Sl_No: idx + 1,
    //             Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
    //             Item_Lot_No: item.LotNo,
    //             Origin: item.origin,
    //             Issue_No: item.altid,
    //             Wholes_Entry_Date: handletimezone(item.date),
    //             Mixing_Lot: item.mixingLot,
    //             Receive_pw_210: item.rcv_pw_210,
    //             Receive_w_210: item.rcv_w_210,
    //             Receive_ww_210: item.rcv_ww_210,
    //             Receive_pw_240: item.rcv_pw_240,
    //             Receive_w_240: item.rcv_w_240,
    //             Receive_ww_240: item.rcv_ww_240,
    //             Receive_pw_280: item.rcv_pw_280,
    //             Receive_w_280: item.rcv_w_280,
    //             Receive_ww_280: item.rcv_ww_280,
    //             Receive_pw_320: item.rcv_pw_320,
    //             Receive_w_320: item.rcv_w_320,
    //             Receive_ww_320: item.rcv_ww_320,
    //             Receive_pw_360: item.rcv_pw_360,
    //             Receive_w_360: item.rcv_w_360,
    //             Receive_ww_360: item.rcv_ww_360,
    //             Receive_pw_400: item.rcv_pw_400,
    //             Receive_w_400: item.rcv_w_400,
    //             Receive_ww_400: item.rcv_ww_400,
    //             Receive_jb_mayur: item.rcv_jb_mayur,
    //             Receive_jb_hamsa: item.rcv_jb_hamsa,
    //             Receive_Total: formatNumber((parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
    //                 + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
    //                 + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
    //                 + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
    //                 + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
    //                 + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
    //                 + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa) + parseFloat((item.issue_add_2))).toString()),
    //             Receive_Total_Borma: formatNumber((parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
    //                 + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
    //                 + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
    //                 + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
    //                 + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
    //                 + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
    //                 + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa)).toString()),
    //             Borma_Loss_Kg: formatNumber(item.issue_add_2),
    //             Borma_Loss_Percentage: formatNumber((((Number(item.issue_add_2))/(parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
    //             + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
    //             + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
    //             + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
    //             + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
    //             + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
    //             + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa)))*100).toString()),
    //             Issue_pw_150: formatNumber(item.issue_pw_150),
    //             Issue_w_150: formatNumber(item.issue_w_150),
    //             Issue_ww_150: formatNumber(item.issue_ww_150),
    //             Issue_s_150: formatNumber(item.issue_s_150),
    //             Issue_aw_150: formatNumber(item.issue_aw_150),
    //             Issue_lw_150: formatNumber(item.issue_lw_150),
    //             Issue_pw_180: formatNumber(item.issue_pw_180),
    //             Issue_w_180: formatNumber(item.issue_w_180),
    //             Issue_ww_180: formatNumber(item.issue_ww_180),
    //             Issue_s_180: formatNumber(item.issue_s_180),
    //             Issue_aw_180: formatNumber(item.issue_aw_180),
    //             Issue_lw_180: formatNumber(item.issue_lw_180),
    //             Issue_pw_210: formatNumber(item.issue_pw_210),
    //             Issue_w_210: formatNumber(item.issue_w_210),
    //             Issue_ww_210: formatNumber(item.issue_ww_210),
    //             Issue_s_210: formatNumber(item.issue_s_210),
    //             Issue_aw_210: formatNumber(item.issue_aw_210),
    //             Issue_lw_210: formatNumber(item.issue_lw_210),
    //             Issue_pw_240: formatNumber(item.issue_pw_240),
    //             Issue_w_240: formatNumber(item.issue_w_240),
    //             Issue_ww_240: formatNumber(item.issue_ww_240),
    //             Issue_ww_240_A: formatNumber(item.issue_ww_240_A),
    //             Issue_aw_240: formatNumber(item.issue_aw_240),
    //             Issue_lw_240: formatNumber(item.issue_lw_240),
    //             Issue_pw_280: formatNumber(item.issue_pw_280),
    //             Issue_w_280: formatNumber(item.issue_w_280),
    //             Issue_ww_280: formatNumber(item.issue_ww_280),
    //             Issue_ww_280_A: formatNumber(item.issue_ww_280_A),
    //             Issue_aw_280: formatNumber(item.issue_aw_280),
    //             Issue_lw_280: formatNumber(item.issue_lw_280),
    //             Wholes_double: formatNumber(item.wholes_double),
    //             Issue_pw_320: formatNumber(item.issue_pw_320),
    //             Issue_w_320: formatNumber(item.issue_w_320),
    //             Issue_ww_320: formatNumber(item.issue_ww_320),
    //             Issue_ww_320_A: formatNumber(item.issue_ww_320_A),
    //             Issue_aw_320: formatNumber(item.issue_aw_320),
    //             Issue_lw_320: formatNumber(item.issue_lw_320),
    //             Issue_pw_360: formatNumber(item.issue_pw_360),
    //             Issue_w_360: formatNumber(item.issue_w_360),
    //             Issue_ww_360: formatNumber(item.issue_ww_360),
    //             Issue_ww_360_A: formatNumber(item.issue_ww_360_A),
    //             Issue_aw_360: formatNumber(item.issue_aw_360),
    //             Issue_lw_360: formatNumber(item.issue_lw_360),
    //             Issue_pw_400: formatNumber(item.issue_pw_400),
    //             Issue_w_400: formatNumber(item.issue_w_400),
    //             Issue_ww_400: formatNumber(item.issue_ww_400),
    //             Issue_ww_400_A: formatNumber(item.issue_ww_400_A),
    //             Issue_aw_400: formatNumber(item.issue_aw_400),
    //             Issue_lw_400: formatNumber(item.issue_lw_400),
    //             Issue_jjb: formatNumber(item.issue_jjb),
    //             Issue_jjb1: formatNumber(item.issue_jjb1),
    //             Issue_payal_240: formatNumber(item.issue_payal_240),
    //             Issue_payal_400: formatNumber(item.issue_payal_400),
    //             Issue_e_320_lot: formatNumber(item.issue_e_320_lot),
    //             Issue_e_400_lot: formatNumber(item.issue_e_400_lot),
    //             Issue_in_w_240: formatNumber(item.issue_in_w_240),
    //             Issue_in_w_320: formatNumber(item.issue_in_w_320),
    //             Issue_in_w_400: formatNumber(item.issue_in_w_400),

    //             Issue_a_150: formatNumber(item.issue_a_150),
    //             Issue_c_150: formatNumber(item.issue_c_150),
    //             Issue_e_150: formatNumber(item.issue_e_150),
    //             Issue_sw_150: formatNumber(item.issue_sw_150),
    //             Issue_ssw_150: formatNumber(item.issue_ssw_150),
    //             Issue_k_150: formatNumber(item.issue_k_150),

    //             Issue_a_180: formatNumber(item.issue_a_180),
    //             Issue_c_180: formatNumber(item.issue_c_180),
    //             Issue_e_180: formatNumber(item.issue_e_180),
    //             Issue_sw_180: formatNumber(item.issue_sw_180),
    //             Issue_ssw_180: formatNumber(item.issue_ssw_180),
    //             Issue_k_180: formatNumber(item.issue_k_180),

    //             Issue_a_210: formatNumber(item.issue_a_210),
    //             Issue_c_210: formatNumber(item.issue_c_210),
    //             Issue_e_210: formatNumber(item.issue_e_210),
    //             Issue_sw_210: formatNumber(item.issue_sw_210),
    //             Issue_ssw_210: formatNumber(item.issue_ssw_210),
    //             Issue_k_210: formatNumber(item.issue_k_210),

    //             Issue_a_240: formatNumber(item.issue_a_240),
    //             Issue_c_240: formatNumber(item.issue_c_240),
    //             Issue_e_240: formatNumber(item.issue_e_240),
    //             Issue_sw_240: formatNumber(item.issue_sw_240),
    //             Issue_ssw_240: formatNumber(item.issue_ssw_240),
    //             Issue_k_240: formatNumber(item.issue_k_240),

    //             Issue_a_280: formatNumber(item.issue_a_280),
    //             Issue_c_280: formatNumber(item.issue_c_280),
    //             Issue_e_280: formatNumber(item.issue_e_280),
    //             Issue_sw_280: formatNumber(item.issue_sw_280),
    //             Issue_ssw_280: formatNumber(item.issue_ssw_280),
    //             Issue_k_280: formatNumber(item.issue_k_280),

    //             Issue_a_320: formatNumber(item.issue_a_320),
    //             Issue_c_320: formatNumber(item.issue_c_320),
    //             Issue_e_320: formatNumber(item.issue_e_320),
    //             Issue_sw_320: formatNumber(item.issue_sw_320),
    //             Issue_ssw_320: formatNumber(item.issue_ssw_320),
    //             Issue_k_320: formatNumber(item.issue_k_320),

    //             Issue_a_360: formatNumber(item.issue_a_360),
    //             Issue_c_360: formatNumber(item.issue_c_360),
    //             Issue_e_360: formatNumber(item.issue_e_360),
    //             Issue_sw_360: formatNumber(item.issue_sw_360),
    //             Issue_ssw_360: formatNumber(item.issue_ssw_360),
    //             Issue_k_360: formatNumber(item.issue_k_360),

    //             Issue_a_400: formatNumber(item.issue_a_400),
    //             Issue_c_400: formatNumber(item.issue_c_400),
    //             Issue_e_400: formatNumber(item.issue_e_400),
    //             Issue_sw_400: formatNumber(item.issue_sw_400),
    //             Issue_ssw_400: formatNumber(item.issue_ssw_400),
    //             Issue_k_400: formatNumber(item.issue_k_400),
    //             Issue_rejection: formatNumber(item.issue_rejection),
    //             Issue_village: formatNumber(item.issue_village),
    //             Issue_bigTaiho: formatNumber(item.issue_bigTaiho),
    //             Issue_lw: formatNumber(item.issue_lw),
    //             Issue_Packing: formatNumber((parseFloat(item.issue_pw_150) + parseFloat(item.issue_w_150) + parseFloat(item.issue_ww_150)
    //                 + parseFloat(item.issue_s_150) + parseFloat(item.issue_aw_150) + parseFloat(item.issue_lw_150)
    //                 + parseFloat(item.issue_pw_180) + parseFloat(item.issue_w_180) + parseFloat(item.issue_ww_180)
    //                 + parseFloat(item.issue_s_180) + parseFloat(item.issue_aw_180) + parseFloat(item.issue_lw_180)
    //                 + parseFloat(item.issue_pw_210) + parseFloat(item.issue_w_210) + parseFloat(item.issue_ww_210)
    //                 + parseFloat(item.issue_s_210) + parseFloat(item.issue_aw_210) + parseFloat(item.issue_lw_210)
    //                 + parseFloat(item.issue_pw_240) + parseFloat(item.issue_w_240) + parseFloat(item.issue_ww_240)
    //                 + parseFloat(item.issue_ww_240_A) + parseFloat(item.issue_aw_240) + parseFloat(item.issue_lw_240)
    //                 + parseFloat(item.issue_pw_280) + parseFloat(item.issue_w_280) + parseFloat(item.issue_ww_280)
    //                 + parseFloat(item.issue_ww_280_A) + parseFloat(item.issue_aw_280) + parseFloat(item.issue_lw_280)
    //                 + parseFloat(item.wholes_double) + parseFloat(item.issue_pw_320) + parseFloat(item.issue_w_320)
    //                 + parseFloat(item.issue_ww_320) + parseFloat(item.issue_ww_320_A) + parseFloat(item.issue_aw_320)
    //                 + parseFloat(item.issue_lw_320) + parseFloat(item.issue_pw_360) + parseFloat(item.issue_w_360)
    //                 + parseFloat(item.issue_ww_360) + parseFloat(item.issue_ww_360_A) + parseFloat(item.issue_aw_360)
    //                 + parseFloat(item.issue_lw_360) + parseFloat(item.issue_pw_400) + parseFloat(item.issue_w_400)
    //                 + parseFloat(item.issue_ww_400) + parseFloat(item.issue_ww_400_A) + parseFloat(item.issue_aw_400) + parseFloat(item.issue_lw_400)
    //                 +parseFloat(item.issue_payal_240) +
    //                 parseFloat(item.issue_payal_400) +
    //                 parseFloat(item.issue_e_320_lot) +
    //                 parseFloat(item.issue_e_400_lot) +
    //                 parseFloat(item.issue_in_w_240) +
    //                 parseFloat(item.issue_in_w_320) +
    //                 parseFloat(item.issue_in_w_400) +
                    
    //                 parseFloat(item.issue_a_150) +
    //                 parseFloat(item.issue_c_150) +
    //                 parseFloat(item.issue_e_150) +
    //                 parseFloat(item.issue_sw_150) +
    //                 parseFloat(item.issue_ssw_150) +
    //                 parseFloat(item.issue_k_150) +
                    
    //                 parseFloat(item.issue_a_180) +
    //                 parseFloat(item.issue_c_180) +
    //                 parseFloat(item.issue_e_180) +
    //                 parseFloat(item.issue_sw_180) +
    //                 parseFloat(item.issue_ssw_180) +
    //                 parseFloat(item.issue_k_180) +
                    
    //                 parseFloat(item.issue_a_210) +
    //                 parseFloat(item.issue_c_210) +
    //                 parseFloat(item.issue_e_210) +
    //                 parseFloat(item.issue_sw_210) +
    //                 parseFloat(item.issue_ssw_210) +
    //                 parseFloat(item.issue_k_210) +
                    
    //                 parseFloat(item.issue_a_240) +
    //                 parseFloat(item.issue_c_240) +
    //                 parseFloat(item.issue_e_240) +
    //                 parseFloat(item.issue_sw_240) +
    //                 parseFloat(item.issue_ssw_240) +
    //                 parseFloat(item.issue_k_240) +
                    
    //                 parseFloat(item.issue_a_280) +
    //                 parseFloat(item.issue_c_280) +
    //                 parseFloat(item.issue_e_280) +
    //                 parseFloat(item.issue_sw_280) +
    //                 parseFloat(item.issue_ssw_280) +
    //                 parseFloat(item.issue_k_280) +
                    
    //                 parseFloat(item.issue_a_320) +
    //                 parseFloat(item.issue_c_320) +
    //                 parseFloat(item.issue_e_320) +
    //                 parseFloat(item.issue_sw_320) +
    //                 parseFloat(item.issue_ssw_320) +
    //                 parseFloat(item.issue_k_320) +
                    
    //                 parseFloat(item.issue_a_360) +
    //                 parseFloat(item.issue_c_360) +
    //                 parseFloat(item.issue_e_360) +
    //                 parseFloat(item.issue_sw_360) +
    //                 parseFloat(item.issue_ssw_360) +
    //                 parseFloat(item.issue_k_360) +
                    
    //                 parseFloat(item.issue_a_400) +
    //                 parseFloat(item.issue_c_400) +
    //                 parseFloat(item.issue_e_400) +
    //                 parseFloat(item.issue_sw_400) +
    //                 parseFloat(item.issue_ssw_400) +
    //                 parseFloat(item.issue_k_400)+ parseFloat(item.issue_jjb)+ parseFloat(item.issue_jjb1)).toString()),
    //             Issue_Village: formatNumber(item.issue_village),
    //             Issue_BigTaiho: formatNumber(item.issue_bigTaiho),
    //             Issue_LW: formatNumber(item.issue_lw),
    //             Issue_Rejection: formatNumber(item.issue_rejection),

    //             Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),

    //             Operator_Day: item.noOfdayOperators,
    //             Operator_Night: item.noOfnightOperators,
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
    //     saveAs(blob, 'Wholes_Entry_' + currDate + '.xlsx');
    //           }
    //           else if (searchType === 'R-LOT') {
    //              const response = await axios.put('/api/wholes/wholesprimarysearch', {
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
    //         transformed = EditData.map((item: WholesData, idx: number) => ({
    //             Sl_No: idx + 1,
    //             Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
    //             Item_Lot_No: item.LotNo,
    //             Origin: item.origin,
    //             Issue_No: item.altid,
    //             Wholes_Entry_Date: handletimezone(item.date),
    //             Mixing_Lot: item.mixingLot,
    //             Receive_pw_210: item.rcv_pw_210,
    //             Receive_w_210: item.rcv_w_210,
    //             Receive_ww_210: item.rcv_ww_210,
    //             Receive_pw_240: item.rcv_pw_240,
    //             Receive_w_240: item.rcv_w_240,
    //             Receive_ww_240: item.rcv_ww_240,
    //             Receive_pw_280: item.rcv_pw_280,
    //             Receive_w_280: item.rcv_w_280,
    //             Receive_ww_280: item.rcv_ww_280,
    //             Receive_pw_320: item.rcv_pw_320,
    //             Receive_w_320: item.rcv_w_320,
    //             Receive_ww_320: item.rcv_ww_320,
    //             Receive_pw_360: item.rcv_pw_360,
    //             Receive_w_360: item.rcv_w_360,
    //             Receive_ww_360: item.rcv_ww_360,
    //             Receive_pw_400: item.rcv_pw_400,
    //             Receive_w_400: item.rcv_w_400,
    //             Receive_ww_400: item.rcv_ww_400,
    //             Receive_jb_mayur: item.rcv_jb_mayur,
    //             Receive_jb_hamsa: item.rcv_jb_hamsa,
    //             Receive_Total: formatNumber((parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
    //                 + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
    //                 + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
    //                 + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
    //                 + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
    //                 + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
    //                 + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa) + parseFloat((item.issue_add_2))).toString()),
    //             Receive_Total_Borma: formatNumber((parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
    //                 + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
    //                 + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
    //                 + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
    //                 + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
    //                 + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
    //                 + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa)).toString()),
    //             Borma_Loss_Kg: formatNumber(item.issue_add_2),
    //             Borma_Loss_Percentage: formatNumber((((Number(item.issue_add_2))/(parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
    //             + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
    //             + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
    //             + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
    //             + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
    //             + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
    //             + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa)))*100).toString()),
    //             Issue_pw_150: formatNumber(item.issue_pw_150),
    //             Issue_w_150: formatNumber(item.issue_w_150),
    //             Issue_ww_150: formatNumber(item.issue_ww_150),
    //             Issue_s_150: formatNumber(item.issue_s_150),
    //             Issue_aw_150: formatNumber(item.issue_aw_150),
    //             Issue_lw_150: formatNumber(item.issue_lw_150),
    //             Issue_pw_180: formatNumber(item.issue_pw_180),
    //             Issue_w_180: formatNumber(item.issue_w_180),
    //             Issue_ww_180: formatNumber(item.issue_ww_180),
    //             Issue_s_180: formatNumber(item.issue_s_180),
    //             Issue_aw_180: formatNumber(item.issue_aw_180),
    //             Issue_lw_180: formatNumber(item.issue_lw_180),
    //             Issue_pw_210: formatNumber(item.issue_pw_210),
    //             Issue_w_210: formatNumber(item.issue_w_210),
    //             Issue_ww_210: formatNumber(item.issue_ww_210),
    //             Issue_s_210: formatNumber(item.issue_s_210),
    //             Issue_aw_210: formatNumber(item.issue_aw_210),
    //             Issue_lw_210: formatNumber(item.issue_lw_210),
    //             Issue_pw_240: formatNumber(item.issue_pw_240),
    //             Issue_w_240: formatNumber(item.issue_w_240),
    //             Issue_ww_240: formatNumber(item.issue_ww_240),
    //             Issue_ww_240_A: formatNumber(item.issue_ww_240_A),
    //             Issue_aw_240: formatNumber(item.issue_aw_240),
    //             Issue_lw_240: formatNumber(item.issue_lw_240),
    //             Issue_pw_280: formatNumber(item.issue_pw_280),
    //             Issue_w_280: formatNumber(item.issue_w_280),
    //             Issue_ww_280: formatNumber(item.issue_ww_280),
    //             Issue_ww_280_A: formatNumber(item.issue_ww_280_A),
    //             Issue_aw_280: formatNumber(item.issue_aw_280),
    //             Issue_lw_280: formatNumber(item.issue_lw_280),
    //             Wholes_double: formatNumber(item.wholes_double),
    //             Issue_pw_320: formatNumber(item.issue_pw_320),
    //             Issue_w_320: formatNumber(item.issue_w_320),
    //             Issue_ww_320: formatNumber(item.issue_ww_320),
    //             Issue_ww_320_A: formatNumber(item.issue_ww_320_A),
    //             Issue_aw_320: formatNumber(item.issue_aw_320),
    //             Issue_lw_320: formatNumber(item.issue_lw_320),
    //             Issue_pw_360: formatNumber(item.issue_pw_360),
    //             Issue_w_360: formatNumber(item.issue_w_360),
    //             Issue_ww_360: formatNumber(item.issue_ww_360),
    //             Issue_ww_360_A: formatNumber(item.issue_ww_360_A),
    //             Issue_aw_360: formatNumber(item.issue_aw_360),
    //             Issue_lw_360: formatNumber(item.issue_lw_360),
    //             Issue_pw_400: formatNumber(item.issue_pw_400),
    //             Issue_w_400: formatNumber(item.issue_w_400),
    //             Issue_ww_400: formatNumber(item.issue_ww_400),
    //             Issue_ww_400_A: formatNumber(item.issue_ww_400_A),
    //             Issue_aw_400: formatNumber(item.issue_aw_400),
    //             Issue_lw_400: formatNumber(item.issue_lw_400),
    //             Issue_jjb: formatNumber(item.issue_jjb),
    //             Issue_jjb1: formatNumber(item.issue_jjb1),
    //             Issue_payal_240: formatNumber(item.issue_payal_240),
    //             Issue_payal_400: formatNumber(item.issue_payal_400),
    //             Issue_e_320_lot: formatNumber(item.issue_e_320_lot),
    //             Issue_e_400_lot: formatNumber(item.issue_e_400_lot),
    //             Issue_in_w_240: formatNumber(item.issue_in_w_240),
    //             Issue_in_w_320: formatNumber(item.issue_in_w_320),
    //             Issue_in_w_400: formatNumber(item.issue_in_w_400),

    //             Issue_a_150: formatNumber(item.issue_a_150),
    //             Issue_c_150: formatNumber(item.issue_c_150),
    //             Issue_e_150: formatNumber(item.issue_e_150),
    //             Issue_sw_150: formatNumber(item.issue_sw_150),
    //             Issue_ssw_150: formatNumber(item.issue_ssw_150),
    //             Issue_k_150: formatNumber(item.issue_k_150),

    //             Issue_a_180: formatNumber(item.issue_a_180),
    //             Issue_c_180: formatNumber(item.issue_c_180),
    //             Issue_e_180: formatNumber(item.issue_e_180),
    //             Issue_sw_180: formatNumber(item.issue_sw_180),
    //             Issue_ssw_180: formatNumber(item.issue_ssw_180),
    //             Issue_k_180: formatNumber(item.issue_k_180),

    //             Issue_a_210: formatNumber(item.issue_a_210),
    //             Issue_c_210: formatNumber(item.issue_c_210),
    //             Issue_e_210: formatNumber(item.issue_e_210),
    //             Issue_sw_210: formatNumber(item.issue_sw_210),
    //             Issue_ssw_210: formatNumber(item.issue_ssw_210),
    //             Issue_k_210: formatNumber(item.issue_k_210),

    //             Issue_a_240: formatNumber(item.issue_a_240),
    //             Issue_c_240: formatNumber(item.issue_c_240),
    //             Issue_e_240: formatNumber(item.issue_e_240),
    //             Issue_sw_240: formatNumber(item.issue_sw_240),
    //             Issue_ssw_240: formatNumber(item.issue_ssw_240),
    //             Issue_k_240: formatNumber(item.issue_k_240),

    //             Issue_a_280: formatNumber(item.issue_a_280),
    //             Issue_c_280: formatNumber(item.issue_c_280),
    //             Issue_e_280: formatNumber(item.issue_e_280),
    //             Issue_sw_280: formatNumber(item.issue_sw_280),
    //             Issue_ssw_280: formatNumber(item.issue_ssw_280),
    //             Issue_k_280: formatNumber(item.issue_k_280),

    //             Issue_a_320: formatNumber(item.issue_a_320),
    //             Issue_c_320: formatNumber(item.issue_c_320),
    //             Issue_e_320: formatNumber(item.issue_e_320),
    //             Issue_sw_320: formatNumber(item.issue_sw_320),
    //             Issue_ssw_320: formatNumber(item.issue_ssw_320),
    //             Issue_k_320: formatNumber(item.issue_k_320),

    //             Issue_a_360: formatNumber(item.issue_a_360),
    //             Issue_c_360: formatNumber(item.issue_c_360),
    //             Issue_e_360: formatNumber(item.issue_e_360),
    //             Issue_sw_360: formatNumber(item.issue_sw_360),
    //             Issue_ssw_360: formatNumber(item.issue_ssw_360),
    //             Issue_k_360: formatNumber(item.issue_k_360),

    //             Issue_a_400: formatNumber(item.issue_a_400),
    //             Issue_c_400: formatNumber(item.issue_c_400),
    //             Issue_e_400: formatNumber(item.issue_e_400),
    //             Issue_sw_400: formatNumber(item.issue_sw_400),
    //             Issue_ssw_400: formatNumber(item.issue_ssw_400),
    //             Issue_k_400: formatNumber(item.issue_k_400),
    //             Issue_rejection: formatNumber(item.issue_rejection),
    //             Issue_village: formatNumber(item.issue_village),
    //             Issue_bigTaiho: formatNumber(item.issue_bigTaiho),
    //             Issue_lw: formatNumber(item.issue_lw),
    //             Issue_Packing: formatNumber((parseFloat(item.issue_pw_150) + parseFloat(item.issue_w_150) + parseFloat(item.issue_ww_150)
    //                 + parseFloat(item.issue_s_150) + parseFloat(item.issue_aw_150) + parseFloat(item.issue_lw_150)
    //                 + parseFloat(item.issue_pw_180) + parseFloat(item.issue_w_180) + parseFloat(item.issue_ww_180)
    //                 + parseFloat(item.issue_s_180) + parseFloat(item.issue_aw_180) + parseFloat(item.issue_lw_180)
    //                 + parseFloat(item.issue_pw_210) + parseFloat(item.issue_w_210) + parseFloat(item.issue_ww_210)
    //                 + parseFloat(item.issue_s_210) + parseFloat(item.issue_aw_210) + parseFloat(item.issue_lw_210)
    //                 + parseFloat(item.issue_pw_240) + parseFloat(item.issue_w_240) + parseFloat(item.issue_ww_240)
    //                 + parseFloat(item.issue_ww_240_A) + parseFloat(item.issue_aw_240) + parseFloat(item.issue_lw_240)
    //                 + parseFloat(item.issue_pw_280) + parseFloat(item.issue_w_280) + parseFloat(item.issue_ww_280)
    //                 + parseFloat(item.issue_ww_280_A) + parseFloat(item.issue_aw_280) + parseFloat(item.issue_lw_280)
    //                 + parseFloat(item.wholes_double) + parseFloat(item.issue_pw_320) + parseFloat(item.issue_w_320)
    //                 + parseFloat(item.issue_ww_320) + parseFloat(item.issue_ww_320_A) + parseFloat(item.issue_aw_320)
    //                 + parseFloat(item.issue_lw_320) + parseFloat(item.issue_pw_360) + parseFloat(item.issue_w_360)
    //                 + parseFloat(item.issue_ww_360) + parseFloat(item.issue_ww_360_A) + parseFloat(item.issue_aw_360)
    //                 + parseFloat(item.issue_lw_360) + parseFloat(item.issue_pw_400) + parseFloat(item.issue_w_400)
    //                 + parseFloat(item.issue_ww_400) + parseFloat(item.issue_ww_400_A) + parseFloat(item.issue_aw_400) + parseFloat(item.issue_lw_400)
    //                 +parseFloat(item.issue_payal_240) +
    //                 parseFloat(item.issue_payal_400) +
    //                 parseFloat(item.issue_e_320_lot) +
    //                 parseFloat(item.issue_e_400_lot) +
    //                 parseFloat(item.issue_in_w_240) +
    //                 parseFloat(item.issue_in_w_320) +
    //                 parseFloat(item.issue_in_w_400) +
                    
    //                 parseFloat(item.issue_a_150) +
    //                 parseFloat(item.issue_c_150) +
    //                 parseFloat(item.issue_e_150) +
    //                 parseFloat(item.issue_sw_150) +
    //                 parseFloat(item.issue_ssw_150) +
    //                 parseFloat(item.issue_k_150) +
                    
    //                 parseFloat(item.issue_a_180) +
    //                 parseFloat(item.issue_c_180) +
    //                 parseFloat(item.issue_e_180) +
    //                 parseFloat(item.issue_sw_180) +
    //                 parseFloat(item.issue_ssw_180) +
    //                 parseFloat(item.issue_k_180) +
                    
    //                 parseFloat(item.issue_a_210) +
    //                 parseFloat(item.issue_c_210) +
    //                 parseFloat(item.issue_e_210) +
    //                 parseFloat(item.issue_sw_210) +
    //                 parseFloat(item.issue_ssw_210) +
    //                 parseFloat(item.issue_k_210) +
                    
    //                 parseFloat(item.issue_a_240) +
    //                 parseFloat(item.issue_c_240) +
    //                 parseFloat(item.issue_e_240) +
    //                 parseFloat(item.issue_sw_240) +
    //                 parseFloat(item.issue_ssw_240) +
    //                 parseFloat(item.issue_k_240) +
                    
    //                 parseFloat(item.issue_a_280) +
    //                 parseFloat(item.issue_c_280) +
    //                 parseFloat(item.issue_e_280) +
    //                 parseFloat(item.issue_sw_280) +
    //                 parseFloat(item.issue_ssw_280) +
    //                 parseFloat(item.issue_k_280) +
                    
    //                 parseFloat(item.issue_a_320) +
    //                 parseFloat(item.issue_c_320) +
    //                 parseFloat(item.issue_e_320) +
    //                 parseFloat(item.issue_sw_320) +
    //                 parseFloat(item.issue_ssw_320) +
    //                 parseFloat(item.issue_k_320) +
                    
    //                 parseFloat(item.issue_a_360) +
    //                 parseFloat(item.issue_c_360) +
    //                 parseFloat(item.issue_e_360) +
    //                 parseFloat(item.issue_sw_360) +
    //                 parseFloat(item.issue_ssw_360) +
    //                 parseFloat(item.issue_k_360) +
                    
    //                 parseFloat(item.issue_a_400) +
    //                 parseFloat(item.issue_c_400) +
    //                 parseFloat(item.issue_e_400) +
    //                 parseFloat(item.issue_sw_400) +
    //                 parseFloat(item.issue_ssw_400) +
    //                 parseFloat(item.issue_k_400)+ parseFloat(item.issue_jjb)+ parseFloat(item.issue_jjb1)).toString()),
    //             Issue_Village: formatNumber(item.issue_village),
    //             Issue_BigTaiho: formatNumber(item.issue_bigTaiho),
    //             Issue_LW: formatNumber(item.issue_lw),
    //             Issue_Rejection: formatNumber(item.issue_rejection),

    //             Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),

    //             Operator_Day: item.noOfdayOperators,
    //             Operator_Night: item.noOfnightOperators,
    //             Edit_Status: item.editStatus,
    //             Created_By: item.CreatedBy,
    //             Modified_By: item.modifiedBy

    //         }));
    //         //setTransformedData(transformed);
    //         ws = XLSX.utils.json_to_sheet(transformed);
    //     }
    //     else {
    //         transformed = data1.rcnEntries.map((item: WholesData, idx: number) => ({
    //             Sl_No: idx + 1,
    //             Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
    //             Item_Lot_No: item.LotNo,
    //             Origin: item.origin,
    //             Issue_No: item.altid,
    //             Wholes_Entry_Date: handletimezone(item.date),
    //             Mixing_Lot: item.mixingLot,
    //             Receive_pw_210: item.rcv_pw_210,
    //             Receive_w_210: item.rcv_w_210,
    //             Receive_ww_210: item.rcv_ww_210,
    //             Receive_pw_240: item.rcv_pw_240,
    //             Receive_w_240: item.rcv_w_240,
    //             Receive_ww_240: item.rcv_ww_240,
    //             Receive_pw_280: item.rcv_pw_280,
    //             Receive_w_280: item.rcv_w_280,
    //             Receive_ww_280: item.rcv_ww_280,
    //             Receive_pw_320: item.rcv_pw_320,
    //             Receive_w_320: item.rcv_w_320,
    //             Receive_ww_320: item.rcv_ww_320,
    //             Receive_pw_360: item.rcv_pw_360,
    //             Receive_w_360: item.rcv_w_360,
    //             Receive_ww_360: item.rcv_ww_360,
    //             Receive_pw_400: item.rcv_pw_400,
    //             Receive_w_400: item.rcv_w_400,
    //             Receive_ww_400: item.rcv_ww_400,
    //             Receive_jb_mayur: item.rcv_jb_mayur,
    //             Receive_jb_hamsa: item.rcv_jb_hamsa,
    //             Receive_Total: formatNumber((parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
    //                 + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
    //                 + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
    //                 + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
    //                 + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
    //                 + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
    //                 + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa) + parseFloat((item.issue_add_2))).toString()),
    //             Receive_Total_Borma: formatNumber((parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
    //                 + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
    //                 + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
    //                 + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
    //                 + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
    //                 + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
    //                 + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa)).toString()),
    //             Borma_Loss_Kg: formatNumber(item.issue_add_2),
    //             Borma_Loss_Percentage: formatNumber((((Number(item.issue_add_2))/(parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
    //             + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
    //             + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
    //             + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
    //             + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
    //             + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
    //             + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa)))*100).toString()),
    //             Issue_pw_150: formatNumber(item.issue_pw_150),
    //             Issue_w_150: formatNumber(item.issue_w_150),
    //             Issue_ww_150: formatNumber(item.issue_ww_150),
    //             Issue_s_150: formatNumber(item.issue_s_150),
    //             Issue_aw_150: formatNumber(item.issue_aw_150),
    //             Issue_lw_150: formatNumber(item.issue_lw_150),
    //             Issue_pw_180: formatNumber(item.issue_pw_180),
    //             Issue_w_180: formatNumber(item.issue_w_180),
    //             Issue_ww_180: formatNumber(item.issue_ww_180),
    //             Issue_s_180: formatNumber(item.issue_s_180),
    //             Issue_aw_180: formatNumber(item.issue_aw_180),
    //             Issue_lw_180: formatNumber(item.issue_lw_180),
    //             Issue_pw_210: formatNumber(item.issue_pw_210),
    //             Issue_w_210: formatNumber(item.issue_w_210),
    //             Issue_ww_210: formatNumber(item.issue_ww_210),
    //             Issue_s_210: formatNumber(item.issue_s_210),
    //             Issue_aw_210: formatNumber(item.issue_aw_210),
    //             Issue_lw_210: formatNumber(item.issue_lw_210),
    //             Issue_pw_240: formatNumber(item.issue_pw_240),
    //             Issue_w_240: formatNumber(item.issue_w_240),
    //             Issue_ww_240: formatNumber(item.issue_ww_240),
    //             Issue_ww_240_A: formatNumber(item.issue_ww_240_A),
    //             Issue_aw_240: formatNumber(item.issue_aw_240),
    //             Issue_lw_240: formatNumber(item.issue_lw_240),
    //             Issue_pw_280: formatNumber(item.issue_pw_280),
    //             Issue_w_280: formatNumber(item.issue_w_280),
    //             Issue_ww_280: formatNumber(item.issue_ww_280),
    //             Issue_ww_280_A: formatNumber(item.issue_ww_280_A),
    //             Issue_aw_280: formatNumber(item.issue_aw_280),
    //             Issue_lw_280: formatNumber(item.issue_lw_280),
    //             Wholes_double: formatNumber(item.wholes_double),
    //             Issue_pw_320: formatNumber(item.issue_pw_320),
    //             Issue_w_320: formatNumber(item.issue_w_320),
    //             Issue_ww_320: formatNumber(item.issue_ww_320),
    //             Issue_ww_320_A: formatNumber(item.issue_ww_320_A),
    //             Issue_aw_320: formatNumber(item.issue_aw_320),
    //             Issue_lw_320: formatNumber(item.issue_lw_320),
    //             Issue_pw_360: formatNumber(item.issue_pw_360),
    //             Issue_w_360: formatNumber(item.issue_w_360),
    //             Issue_ww_360: formatNumber(item.issue_ww_360),
    //             Issue_ww_360_A: formatNumber(item.issue_ww_360_A),
    //             Issue_aw_360: formatNumber(item.issue_aw_360),
    //             Issue_lw_360: formatNumber(item.issue_lw_360),
    //             Issue_pw_400: formatNumber(item.issue_pw_400),
    //             Issue_w_400: formatNumber(item.issue_w_400),
    //             Issue_ww_400: formatNumber(item.issue_ww_400),
    //             Issue_ww_400_A: formatNumber(item.issue_ww_400_A),
    //             Issue_aw_400: formatNumber(item.issue_aw_400),
    //             Issue_lw_400: formatNumber(item.issue_lw_400),
    //             Issue_jjb: formatNumber(item.issue_jjb),
    //             Issue_jjb1: formatNumber(item.issue_jjb1),
    //             Issue_payal_240: formatNumber(item.issue_payal_240),
    //             Issue_payal_400: formatNumber(item.issue_payal_400),
    //             Issue_e_320_lot: formatNumber(item.issue_e_320_lot),
    //             Issue_e_400_lot: formatNumber(item.issue_e_400_lot),
    //             Issue_in_w_240: formatNumber(item.issue_in_w_240),
    //             Issue_in_w_320: formatNumber(item.issue_in_w_320),
    //             Issue_in_w_400: formatNumber(item.issue_in_w_400),

    //             Issue_a_150: formatNumber(item.issue_a_150),
    //             Issue_c_150: formatNumber(item.issue_c_150),
    //             Issue_e_150: formatNumber(item.issue_e_150),
    //             Issue_sw_150: formatNumber(item.issue_sw_150),
    //             Issue_ssw_150: formatNumber(item.issue_ssw_150),
    //             Issue_k_150: formatNumber(item.issue_k_150),

    //             Issue_a_180: formatNumber(item.issue_a_180),
    //             Issue_c_180: formatNumber(item.issue_c_180),
    //             Issue_e_180: formatNumber(item.issue_e_180),
    //             Issue_sw_180: formatNumber(item.issue_sw_180),
    //             Issue_ssw_180: formatNumber(item.issue_ssw_180),
    //             Issue_k_180: formatNumber(item.issue_k_180),

    //             Issue_a_210: formatNumber(item.issue_a_210),
    //             Issue_c_210: formatNumber(item.issue_c_210),
    //             Issue_e_210: formatNumber(item.issue_e_210),
    //             Issue_sw_210: formatNumber(item.issue_sw_210),
    //             Issue_ssw_210: formatNumber(item.issue_ssw_210),
    //             Issue_k_210: formatNumber(item.issue_k_210),

    //             Issue_a_240: formatNumber(item.issue_a_240),
    //             Issue_c_240: formatNumber(item.issue_c_240),
    //             Issue_e_240: formatNumber(item.issue_e_240),
    //             Issue_sw_240: formatNumber(item.issue_sw_240),
    //             Issue_ssw_240: formatNumber(item.issue_ssw_240),
    //             Issue_k_240: formatNumber(item.issue_k_240),

    //             Issue_a_280: formatNumber(item.issue_a_280),
    //             Issue_c_280: formatNumber(item.issue_c_280),
    //             Issue_e_280: formatNumber(item.issue_e_280),
    //             Issue_sw_280: formatNumber(item.issue_sw_280),
    //             Issue_ssw_280: formatNumber(item.issue_ssw_280),
    //             Issue_k_280: formatNumber(item.issue_k_280),

    //             Issue_a_320: formatNumber(item.issue_a_320),
    //             Issue_c_320: formatNumber(item.issue_c_320),
    //             Issue_e_320: formatNumber(item.issue_e_320),
    //             Issue_sw_320: formatNumber(item.issue_sw_320),
    //             Issue_ssw_320: formatNumber(item.issue_ssw_320),
    //             Issue_k_320: formatNumber(item.issue_k_320),

    //             Issue_a_360: formatNumber(item.issue_a_360),
    //             Issue_c_360: formatNumber(item.issue_c_360),
    //             Issue_e_360: formatNumber(item.issue_e_360),
    //             Issue_sw_360: formatNumber(item.issue_sw_360),
    //             Issue_ssw_360: formatNumber(item.issue_ssw_360),
    //             Issue_k_360: formatNumber(item.issue_k_360),

    //             Issue_a_400: formatNumber(item.issue_a_400),
    //             Issue_c_400: formatNumber(item.issue_c_400),
    //             Issue_e_400: formatNumber(item.issue_e_400),
    //             Issue_sw_400: formatNumber(item.issue_sw_400),
    //             Issue_ssw_400: formatNumber(item.issue_ssw_400),
    //             Issue_k_400: formatNumber(item.issue_k_400),
    //             Issue_rejection: formatNumber(item.issue_rejection),
    //             Issue_village: formatNumber(item.issue_village),
    //             Issue_bigTaiho: formatNumber(item.issue_bigTaiho),
    //             Issue_lw: formatNumber(item.issue_lw),
    //             Issue_Packing: formatNumber((parseFloat(item.issue_pw_150) + parseFloat(item.issue_w_150) + parseFloat(item.issue_ww_150)
    //                 + parseFloat(item.issue_s_150) + parseFloat(item.issue_aw_150) + parseFloat(item.issue_lw_150)
    //                 + parseFloat(item.issue_pw_180) + parseFloat(item.issue_w_180) + parseFloat(item.issue_ww_180)
    //                 + parseFloat(item.issue_s_180) + parseFloat(item.issue_aw_180) + parseFloat(item.issue_lw_180)
    //                 + parseFloat(item.issue_pw_210) + parseFloat(item.issue_w_210) + parseFloat(item.issue_ww_210)
    //                 + parseFloat(item.issue_s_210) + parseFloat(item.issue_aw_210) + parseFloat(item.issue_lw_210)
    //                 + parseFloat(item.issue_pw_240) + parseFloat(item.issue_w_240) + parseFloat(item.issue_ww_240)
    //                 + parseFloat(item.issue_ww_240_A) + parseFloat(item.issue_aw_240) + parseFloat(item.issue_lw_240)
    //                 + parseFloat(item.issue_pw_280) + parseFloat(item.issue_w_280) + parseFloat(item.issue_ww_280)
    //                 + parseFloat(item.issue_ww_280_A) + parseFloat(item.issue_aw_280) + parseFloat(item.issue_lw_280)
    //                 + parseFloat(item.wholes_double) + parseFloat(item.issue_pw_320) + parseFloat(item.issue_w_320)
    //                 + parseFloat(item.issue_ww_320) + parseFloat(item.issue_ww_320_A) + parseFloat(item.issue_aw_320)
    //                 + parseFloat(item.issue_lw_320) + parseFloat(item.issue_pw_360) + parseFloat(item.issue_w_360)
    //                 + parseFloat(item.issue_ww_360) + parseFloat(item.issue_ww_360_A) + parseFloat(item.issue_aw_360)
    //                 + parseFloat(item.issue_lw_360) + parseFloat(item.issue_pw_400) + parseFloat(item.issue_w_400)
    //                 + parseFloat(item.issue_ww_400) + parseFloat(item.issue_ww_400_A) + parseFloat(item.issue_aw_400) + parseFloat(item.issue_lw_400)
    //                 +parseFloat(item.issue_payal_240) +
    //                 parseFloat(item.issue_payal_400) +
    //                 parseFloat(item.issue_e_320_lot) +
    //                 parseFloat(item.issue_e_400_lot) +
    //                 parseFloat(item.issue_in_w_240) +
    //                 parseFloat(item.issue_in_w_320) +
    //                 parseFloat(item.issue_in_w_400) +
                    
    //                 parseFloat(item.issue_a_150) +
    //                 parseFloat(item.issue_c_150) +
    //                 parseFloat(item.issue_e_150) +
    //                 parseFloat(item.issue_sw_150) +
    //                 parseFloat(item.issue_ssw_150) +
    //                 parseFloat(item.issue_k_150) +
                    
    //                 parseFloat(item.issue_a_180) +
    //                 parseFloat(item.issue_c_180) +
    //                 parseFloat(item.issue_e_180) +
    //                 parseFloat(item.issue_sw_180) +
    //                 parseFloat(item.issue_ssw_180) +
    //                 parseFloat(item.issue_k_180) +
                    
    //                 parseFloat(item.issue_a_210) +
    //                 parseFloat(item.issue_c_210) +
    //                 parseFloat(item.issue_e_210) +
    //                 parseFloat(item.issue_sw_210) +
    //                 parseFloat(item.issue_ssw_210) +
    //                 parseFloat(item.issue_k_210) +
                    
    //                 parseFloat(item.issue_a_240) +
    //                 parseFloat(item.issue_c_240) +
    //                 parseFloat(item.issue_e_240) +
    //                 parseFloat(item.issue_sw_240) +
    //                 parseFloat(item.issue_ssw_240) +
    //                 parseFloat(item.issue_k_240) +
                    
    //                 parseFloat(item.issue_a_280) +
    //                 parseFloat(item.issue_c_280) +
    //                 parseFloat(item.issue_e_280) +
    //                 parseFloat(item.issue_sw_280) +
    //                 parseFloat(item.issue_ssw_280) +
    //                 parseFloat(item.issue_k_280) +
                    
    //                 parseFloat(item.issue_a_320) +
    //                 parseFloat(item.issue_c_320) +
    //                 parseFloat(item.issue_e_320) +
    //                 parseFloat(item.issue_sw_320) +
    //                 parseFloat(item.issue_ssw_320) +
    //                 parseFloat(item.issue_k_320) +
                    
    //                 parseFloat(item.issue_a_360) +
    //                 parseFloat(item.issue_c_360) +
    //                 parseFloat(item.issue_e_360) +
    //                 parseFloat(item.issue_sw_360) +
    //                 parseFloat(item.issue_ssw_360) +
    //                 parseFloat(item.issue_k_360) +
                    
    //                 parseFloat(item.issue_a_400) +
    //                 parseFloat(item.issue_c_400) +
    //                 parseFloat(item.issue_e_400) +
    //                 parseFloat(item.issue_sw_400) +
    //                 parseFloat(item.issue_ssw_400) +
    //                 parseFloat(item.issue_k_400)+ parseFloat(item.issue_jjb)+ parseFloat(item.issue_jjb1)).toString()),
    //             Issue_Village: formatNumber(item.issue_village),
    //             Issue_BigTaiho: formatNumber(item.issue_bigTaiho),
    //             Issue_LW: formatNumber(item.issue_lw),
    //             Issue_Rejection: formatNumber(item.issue_rejection),

    //             Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),

    //             Operator_Day: item.noOfdayOperators,
    //             Operator_Night: item.noOfnightOperators,
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
    //     saveAs(blob, 'Wholes_Entry_' + currDate + '.xlsx');
    //           }
    //           else{
    //             const response = await axios.put('/api/wholes/wholesprimarysearch', {
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
    //         transformed = EditData.map((item: WholesData, idx: number) => ({
    //             Sl_No: idx + 1,
    //             Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
    //             Item_Lot_No: item.LotNo,
    //             Origin: item.origin,
    //             Issue_No: item.altid,
    //             Wholes_Entry_Date: handletimezone(item.date),
    //             Mixing_Lot: item.mixingLot,
    //             Receive_pw_210: item.rcv_pw_210,
    //             Receive_w_210: item.rcv_w_210,
    //             Receive_ww_210: item.rcv_ww_210,
    //             Receive_pw_240: item.rcv_pw_240,
    //             Receive_w_240: item.rcv_w_240,
    //             Receive_ww_240: item.rcv_ww_240,
    //             Receive_pw_280: item.rcv_pw_280,
    //             Receive_w_280: item.rcv_w_280,
    //             Receive_ww_280: item.rcv_ww_280,
    //             Receive_pw_320: item.rcv_pw_320,
    //             Receive_w_320: item.rcv_w_320,
    //             Receive_ww_320: item.rcv_ww_320,
    //             Receive_pw_360: item.rcv_pw_360,
    //             Receive_w_360: item.rcv_w_360,
    //             Receive_ww_360: item.rcv_ww_360,
    //             Receive_pw_400: item.rcv_pw_400,
    //             Receive_w_400: item.rcv_w_400,
    //             Receive_ww_400: item.rcv_ww_400,
    //             Receive_jb_mayur: item.rcv_jb_mayur,
    //             Receive_jb_hamsa: item.rcv_jb_hamsa,
    //             Receive_Total: formatNumber((parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
    //                 + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
    //                 + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
    //                 + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
    //                 + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
    //                 + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
    //                 + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa) + parseFloat((item.issue_add_2))).toString()),
    //             Receive_Total_Borma: formatNumber((parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
    //                 + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
    //                 + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
    //                 + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
    //                 + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
    //                 + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
    //                 + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa)).toString()),
    //             Borma_Loss_Kg: formatNumber(item.issue_add_2),
    //             Borma_Loss_Percentage: formatNumber((((Number(item.issue_add_2))/(parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
    //             + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
    //             + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
    //             + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
    //             + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
    //             + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
    //             + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa)))*100).toString()),
    //             Issue_pw_150: formatNumber(item.issue_pw_150),
    //             Issue_w_150: formatNumber(item.issue_w_150),
    //             Issue_ww_150: formatNumber(item.issue_ww_150),
    //             Issue_s_150: formatNumber(item.issue_s_150),
    //             Issue_aw_150: formatNumber(item.issue_aw_150),
    //             Issue_lw_150: formatNumber(item.issue_lw_150),
    //             Issue_pw_180: formatNumber(item.issue_pw_180),
    //             Issue_w_180: formatNumber(item.issue_w_180),
    //             Issue_ww_180: formatNumber(item.issue_ww_180),
    //             Issue_s_180: formatNumber(item.issue_s_180),
    //             Issue_aw_180: formatNumber(item.issue_aw_180),
    //             Issue_lw_180: formatNumber(item.issue_lw_180),
    //             Issue_pw_210: formatNumber(item.issue_pw_210),
    //             Issue_w_210: formatNumber(item.issue_w_210),
    //             Issue_ww_210: formatNumber(item.issue_ww_210),
    //             Issue_s_210: formatNumber(item.issue_s_210),
    //             Issue_aw_210: formatNumber(item.issue_aw_210),
    //             Issue_lw_210: formatNumber(item.issue_lw_210),
    //             Issue_pw_240: formatNumber(item.issue_pw_240),
    //             Issue_w_240: formatNumber(item.issue_w_240),
    //             Issue_ww_240: formatNumber(item.issue_ww_240),
    //             Issue_ww_240_A: formatNumber(item.issue_ww_240_A),
    //             Issue_aw_240: formatNumber(item.issue_aw_240),
    //             Issue_lw_240: formatNumber(item.issue_lw_240),
    //             Issue_pw_280: formatNumber(item.issue_pw_280),
    //             Issue_w_280: formatNumber(item.issue_w_280),
    //             Issue_ww_280: formatNumber(item.issue_ww_280),
    //             Issue_ww_280_A: formatNumber(item.issue_ww_280_A),
    //             Issue_aw_280: formatNumber(item.issue_aw_280),
    //             Issue_lw_280: formatNumber(item.issue_lw_280),
    //             Wholes_double: formatNumber(item.wholes_double),
    //             Issue_pw_320: formatNumber(item.issue_pw_320),
    //             Issue_w_320: formatNumber(item.issue_w_320),
    //             Issue_ww_320: formatNumber(item.issue_ww_320),
    //             Issue_ww_320_A: formatNumber(item.issue_ww_320_A),
    //             Issue_aw_320: formatNumber(item.issue_aw_320),
    //             Issue_lw_320: formatNumber(item.issue_lw_320),
    //             Issue_pw_360: formatNumber(item.issue_pw_360),
    //             Issue_w_360: formatNumber(item.issue_w_360),
    //             Issue_ww_360: formatNumber(item.issue_ww_360),
    //             Issue_ww_360_A: formatNumber(item.issue_ww_360_A),
    //             Issue_aw_360: formatNumber(item.issue_aw_360),
    //             Issue_lw_360: formatNumber(item.issue_lw_360),
    //             Issue_pw_400: formatNumber(item.issue_pw_400),
    //             Issue_w_400: formatNumber(item.issue_w_400),
    //             Issue_ww_400: formatNumber(item.issue_ww_400),
    //             Issue_ww_400_A: formatNumber(item.issue_ww_400_A),
    //             Issue_aw_400: formatNumber(item.issue_aw_400),
    //             Issue_lw_400: formatNumber(item.issue_lw_400),
    //             Issue_jjb: formatNumber(item.issue_jjb),
    //             Issue_jjb1: formatNumber(item.issue_jjb1),
    //             Issue_payal_240: formatNumber(item.issue_payal_240),
    //             Issue_payal_400: formatNumber(item.issue_payal_400),
    //             Issue_e_320_lot: formatNumber(item.issue_e_320_lot),
    //             Issue_e_400_lot: formatNumber(item.issue_e_400_lot),
    //             Issue_in_w_240: formatNumber(item.issue_in_w_240),
    //             Issue_in_w_320: formatNumber(item.issue_in_w_320),
    //             Issue_in_w_400: formatNumber(item.issue_in_w_400),

    //             Issue_a_150: formatNumber(item.issue_a_150),
    //             Issue_c_150: formatNumber(item.issue_c_150),
    //             Issue_e_150: formatNumber(item.issue_e_150),
    //             Issue_sw_150: formatNumber(item.issue_sw_150),
    //             Issue_ssw_150: formatNumber(item.issue_ssw_150),
    //             Issue_k_150: formatNumber(item.issue_k_150),

    //             Issue_a_180: formatNumber(item.issue_a_180),
    //             Issue_c_180: formatNumber(item.issue_c_180),
    //             Issue_e_180: formatNumber(item.issue_e_180),
    //             Issue_sw_180: formatNumber(item.issue_sw_180),
    //             Issue_ssw_180: formatNumber(item.issue_ssw_180),
    //             Issue_k_180: formatNumber(item.issue_k_180),

    //             Issue_a_210: formatNumber(item.issue_a_210),
    //             Issue_c_210: formatNumber(item.issue_c_210),
    //             Issue_e_210: formatNumber(item.issue_e_210),
    //             Issue_sw_210: formatNumber(item.issue_sw_210),
    //             Issue_ssw_210: formatNumber(item.issue_ssw_210),
    //             Issue_k_210: formatNumber(item.issue_k_210),

    //             Issue_a_240: formatNumber(item.issue_a_240),
    //             Issue_c_240: formatNumber(item.issue_c_240),
    //             Issue_e_240: formatNumber(item.issue_e_240),
    //             Issue_sw_240: formatNumber(item.issue_sw_240),
    //             Issue_ssw_240: formatNumber(item.issue_ssw_240),
    //             Issue_k_240: formatNumber(item.issue_k_240),

    //             Issue_a_280: formatNumber(item.issue_a_280),
    //             Issue_c_280: formatNumber(item.issue_c_280),
    //             Issue_e_280: formatNumber(item.issue_e_280),
    //             Issue_sw_280: formatNumber(item.issue_sw_280),
    //             Issue_ssw_280: formatNumber(item.issue_ssw_280),
    //             Issue_k_280: formatNumber(item.issue_k_280),

    //             Issue_a_320: formatNumber(item.issue_a_320),
    //             Issue_c_320: formatNumber(item.issue_c_320),
    //             Issue_e_320: formatNumber(item.issue_e_320),
    //             Issue_sw_320: formatNumber(item.issue_sw_320),
    //             Issue_ssw_320: formatNumber(item.issue_ssw_320),
    //             Issue_k_320: formatNumber(item.issue_k_320),

    //             Issue_a_360: formatNumber(item.issue_a_360),
    //             Issue_c_360: formatNumber(item.issue_c_360),
    //             Issue_e_360: formatNumber(item.issue_e_360),
    //             Issue_sw_360: formatNumber(item.issue_sw_360),
    //             Issue_ssw_360: formatNumber(item.issue_ssw_360),
    //             Issue_k_360: formatNumber(item.issue_k_360),

    //             Issue_a_400: formatNumber(item.issue_a_400),
    //             Issue_c_400: formatNumber(item.issue_c_400),
    //             Issue_e_400: formatNumber(item.issue_e_400),
    //             Issue_sw_400: formatNumber(item.issue_sw_400),
    //             Issue_ssw_400: formatNumber(item.issue_ssw_400),
    //             Issue_k_400: formatNumber(item.issue_k_400),
    //             Issue_rejection: formatNumber(item.issue_rejection),
    //             Issue_village: formatNumber(item.issue_village),
    //             Issue_bigTaiho: formatNumber(item.issue_bigTaiho),
    //             Issue_lw: formatNumber(item.issue_lw),
    //             Issue_Packing: formatNumber((parseFloat(item.issue_pw_150) + parseFloat(item.issue_w_150) + parseFloat(item.issue_ww_150)
    //                 + parseFloat(item.issue_s_150) + parseFloat(item.issue_aw_150) + parseFloat(item.issue_lw_150)
    //                 + parseFloat(item.issue_pw_180) + parseFloat(item.issue_w_180) + parseFloat(item.issue_ww_180)
    //                 + parseFloat(item.issue_s_180) + parseFloat(item.issue_aw_180) + parseFloat(item.issue_lw_180)
    //                 + parseFloat(item.issue_pw_210) + parseFloat(item.issue_w_210) + parseFloat(item.issue_ww_210)
    //                 + parseFloat(item.issue_s_210) + parseFloat(item.issue_aw_210) + parseFloat(item.issue_lw_210)
    //                 + parseFloat(item.issue_pw_240) + parseFloat(item.issue_w_240) + parseFloat(item.issue_ww_240)
    //                 + parseFloat(item.issue_ww_240_A) + parseFloat(item.issue_aw_240) + parseFloat(item.issue_lw_240)
    //                 + parseFloat(item.issue_pw_280) + parseFloat(item.issue_w_280) + parseFloat(item.issue_ww_280)
    //                 + parseFloat(item.issue_ww_280_A) + parseFloat(item.issue_aw_280) + parseFloat(item.issue_lw_280)
    //                 + parseFloat(item.wholes_double) + parseFloat(item.issue_pw_320) + parseFloat(item.issue_w_320)
    //                 + parseFloat(item.issue_ww_320) + parseFloat(item.issue_ww_320_A) + parseFloat(item.issue_aw_320)
    //                 + parseFloat(item.issue_lw_320) + parseFloat(item.issue_pw_360) + parseFloat(item.issue_w_360)
    //                 + parseFloat(item.issue_ww_360) + parseFloat(item.issue_ww_360_A) + parseFloat(item.issue_aw_360)
    //                 + parseFloat(item.issue_lw_360) + parseFloat(item.issue_pw_400) + parseFloat(item.issue_w_400)
    //                 + parseFloat(item.issue_ww_400) + parseFloat(item.issue_ww_400_A) + parseFloat(item.issue_aw_400) + parseFloat(item.issue_lw_400)
    //                 +parseFloat(item.issue_payal_240) +
    //                 parseFloat(item.issue_payal_400) +
    //                 parseFloat(item.issue_e_320_lot) +
    //                 parseFloat(item.issue_e_400_lot) +
    //                 parseFloat(item.issue_in_w_240) +
    //                 parseFloat(item.issue_in_w_320) +
    //                 parseFloat(item.issue_in_w_400) +
                    
    //                 parseFloat(item.issue_a_150) +
    //                 parseFloat(item.issue_c_150) +
    //                 parseFloat(item.issue_e_150) +
    //                 parseFloat(item.issue_sw_150) +
    //                 parseFloat(item.issue_ssw_150) +
    //                 parseFloat(item.issue_k_150) +
                    
    //                 parseFloat(item.issue_a_180) +
    //                 parseFloat(item.issue_c_180) +
    //                 parseFloat(item.issue_e_180) +
    //                 parseFloat(item.issue_sw_180) +
    //                 parseFloat(item.issue_ssw_180) +
    //                 parseFloat(item.issue_k_180) +
                    
    //                 parseFloat(item.issue_a_210) +
    //                 parseFloat(item.issue_c_210) +
    //                 parseFloat(item.issue_e_210) +
    //                 parseFloat(item.issue_sw_210) +
    //                 parseFloat(item.issue_ssw_210) +
    //                 parseFloat(item.issue_k_210) +
                    
    //                 parseFloat(item.issue_a_240) +
    //                 parseFloat(item.issue_c_240) +
    //                 parseFloat(item.issue_e_240) +
    //                 parseFloat(item.issue_sw_240) +
    //                 parseFloat(item.issue_ssw_240) +
    //                 parseFloat(item.issue_k_240) +
                    
    //                 parseFloat(item.issue_a_280) +
    //                 parseFloat(item.issue_c_280) +
    //                 parseFloat(item.issue_e_280) +
    //                 parseFloat(item.issue_sw_280) +
    //                 parseFloat(item.issue_ssw_280) +
    //                 parseFloat(item.issue_k_280) +
                    
    //                 parseFloat(item.issue_a_320) +
    //                 parseFloat(item.issue_c_320) +
    //                 parseFloat(item.issue_e_320) +
    //                 parseFloat(item.issue_sw_320) +
    //                 parseFloat(item.issue_ssw_320) +
    //                 parseFloat(item.issue_k_320) +
                    
    //                 parseFloat(item.issue_a_360) +
    //                 parseFloat(item.issue_c_360) +
    //                 parseFloat(item.issue_e_360) +
    //                 parseFloat(item.issue_sw_360) +
    //                 parseFloat(item.issue_ssw_360) +
    //                 parseFloat(item.issue_k_360) +
                    
    //                 parseFloat(item.issue_a_400) +
    //                 parseFloat(item.issue_c_400) +
    //                 parseFloat(item.issue_e_400) +
    //                 parseFloat(item.issue_sw_400) +
    //                 parseFloat(item.issue_ssw_400) +
    //                 parseFloat(item.issue_k_400)+ parseFloat(item.issue_jjb)+ parseFloat(item.issue_jjb1)).toString()),
    //             Issue_Village: formatNumber(item.issue_village),
    //             Issue_BigTaiho: formatNumber(item.issue_bigTaiho),
    //             Issue_LW: formatNumber(item.issue_lw),
    //             Issue_Rejection: formatNumber(item.issue_rejection),

    //             Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),

    //             Operator_Day: item.noOfdayOperators,
    //             Operator_Night: item.noOfnightOperators,
    //             Edit_Status: item.editStatus,
    //             Created_By: item.CreatedBy,
    //             Modified_By: item.modifiedBy

    //         }));
    //         //setTransformedData(transformed);
    //         ws = XLSX.utils.json_to_sheet(transformed);
    //     }
    //     else {
    //         transformed = data1.rcnEntries.map((item: WholesData, idx: number) => ({
    //             Sl_No: idx + 1,
    //             Issue_Type: item.altid == 1 ? 'Fresh Issue' : 'Re-Issue',
    //             Item_Lot_No: item.LotNo,
    //             Origin: item.origin,
    //             Issue_No: item.altid,
    //             Wholes_Entry_Date: handletimezone(item.date),
    //             Mixing_Lot: item.mixingLot,
    //             Receive_pw_210: item.rcv_pw_210,
    //             Receive_w_210: item.rcv_w_210,
    //             Receive_ww_210: item.rcv_ww_210,
    //             Receive_pw_240: item.rcv_pw_240,
    //             Receive_w_240: item.rcv_w_240,
    //             Receive_ww_240: item.rcv_ww_240,
    //             Receive_pw_280: item.rcv_pw_280,
    //             Receive_w_280: item.rcv_w_280,
    //             Receive_ww_280: item.rcv_ww_280,
    //             Receive_pw_320: item.rcv_pw_320,
    //             Receive_w_320: item.rcv_w_320,
    //             Receive_ww_320: item.rcv_ww_320,
    //             Receive_pw_360: item.rcv_pw_360,
    //             Receive_w_360: item.rcv_w_360,
    //             Receive_ww_360: item.rcv_ww_360,
    //             Receive_pw_400: item.rcv_pw_400,
    //             Receive_w_400: item.rcv_w_400,
    //             Receive_ww_400: item.rcv_ww_400,
    //             Receive_jb_mayur: item.rcv_jb_mayur,
    //             Receive_jb_hamsa: item.rcv_jb_hamsa,
    //             Receive_Total: formatNumber((parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
    //                 + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
    //                 + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
    //                 + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
    //                 + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
    //                 + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
    //                 + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa) + parseFloat((item.issue_add_2))).toString()),
    //             Receive_Total_Borma: formatNumber((parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
    //                 + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
    //                 + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
    //                 + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
    //                 + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
    //                 + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
    //                 + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa)).toString()),
    //             Borma_Loss_Kg: formatNumber(item.issue_add_2),
    //             Borma_Loss_Percentage: formatNumber((((Number(item.issue_add_2))/(parseFloat(item.rcv_pw_210) + parseFloat(item.rcv_w_210) + parseFloat(item.rcv_ww_210)
    //             + parseFloat(item.rcv_pw_240) + parseFloat(item.rcv_w_240) + parseFloat(item.rcv_ww_240)
    //             + parseFloat(item.rcv_pw_280) + parseFloat(item.rcv_w_280) + parseFloat(item.rcv_ww_280)
    //             + parseFloat(item.rcv_pw_320) + parseFloat(item.rcv_w_320) + parseFloat(item.rcv_ww_320)
    //             + parseFloat(item.rcv_pw_360) + parseFloat(item.rcv_w_360) + parseFloat(item.rcv_ww_360)
    //             + parseFloat(item.rcv_pw_400) + parseFloat(item.rcv_w_400) + parseFloat(item.rcv_ww_400)
    //             + parseFloat(item.rcv_jb_mayur) + parseFloat(item.rcv_jb_hamsa)))*100).toString()),
    //             Issue_pw_150: formatNumber(item.issue_pw_150),
    //             Issue_w_150: formatNumber(item.issue_w_150),
    //             Issue_ww_150: formatNumber(item.issue_ww_150),
    //             Issue_s_150: formatNumber(item.issue_s_150),
    //             Issue_aw_150: formatNumber(item.issue_aw_150),
    //             Issue_lw_150: formatNumber(item.issue_lw_150),
    //             Issue_pw_180: formatNumber(item.issue_pw_180),
    //             Issue_w_180: formatNumber(item.issue_w_180),
    //             Issue_ww_180: formatNumber(item.issue_ww_180),
    //             Issue_s_180: formatNumber(item.issue_s_180),
    //             Issue_aw_180: formatNumber(item.issue_aw_180),
    //             Issue_lw_180: formatNumber(item.issue_lw_180),
    //             Issue_pw_210: formatNumber(item.issue_pw_210),
    //             Issue_w_210: formatNumber(item.issue_w_210),
    //             Issue_ww_210: formatNumber(item.issue_ww_210),
    //             Issue_s_210: formatNumber(item.issue_s_210),
    //             Issue_aw_210: formatNumber(item.issue_aw_210),
    //             Issue_lw_210: formatNumber(item.issue_lw_210),
    //             Issue_pw_240: formatNumber(item.issue_pw_240),
    //             Issue_w_240: formatNumber(item.issue_w_240),
    //             Issue_ww_240: formatNumber(item.issue_ww_240),
    //             Issue_ww_240_A: formatNumber(item.issue_ww_240_A),
    //             Issue_aw_240: formatNumber(item.issue_aw_240),
    //             Issue_lw_240: formatNumber(item.issue_lw_240),
    //             Issue_pw_280: formatNumber(item.issue_pw_280),
    //             Issue_w_280: formatNumber(item.issue_w_280),
    //             Issue_ww_280: formatNumber(item.issue_ww_280),
    //             Issue_ww_280_A: formatNumber(item.issue_ww_280_A),
    //             Issue_aw_280: formatNumber(item.issue_aw_280),
    //             Issue_lw_280: formatNumber(item.issue_lw_280),
    //             Wholes_double: formatNumber(item.wholes_double),
    //             Issue_pw_320: formatNumber(item.issue_pw_320),
    //             Issue_w_320: formatNumber(item.issue_w_320),
    //             Issue_ww_320: formatNumber(item.issue_ww_320),
    //             Issue_ww_320_A: formatNumber(item.issue_ww_320_A),
    //             Issue_aw_320: formatNumber(item.issue_aw_320),
    //             Issue_lw_320: formatNumber(item.issue_lw_320),
    //             Issue_pw_360: formatNumber(item.issue_pw_360),
    //             Issue_w_360: formatNumber(item.issue_w_360),
    //             Issue_ww_360: formatNumber(item.issue_ww_360),
    //             Issue_ww_360_A: formatNumber(item.issue_ww_360_A),
    //             Issue_aw_360: formatNumber(item.issue_aw_360),
    //             Issue_lw_360: formatNumber(item.issue_lw_360),
    //             Issue_pw_400: formatNumber(item.issue_pw_400),
    //             Issue_w_400: formatNumber(item.issue_w_400),
    //             Issue_ww_400: formatNumber(item.issue_ww_400),
    //             Issue_ww_400_A: formatNumber(item.issue_ww_400_A),
    //             Issue_aw_400: formatNumber(item.issue_aw_400),
    //             Issue_lw_400: formatNumber(item.issue_lw_400),
    //             Issue_jjb: formatNumber(item.issue_jjb),
    //             Issue_jjb1: formatNumber(item.issue_jjb1),
    //             Issue_payal_240: formatNumber(item.issue_payal_240),
    //             Issue_payal_400: formatNumber(item.issue_payal_400),
    //             Issue_e_320_lot: formatNumber(item.issue_e_320_lot),
    //             Issue_e_400_lot: formatNumber(item.issue_e_400_lot),
    //             Issue_in_w_240: formatNumber(item.issue_in_w_240),
    //             Issue_in_w_320: formatNumber(item.issue_in_w_320),
    //             Issue_in_w_400: formatNumber(item.issue_in_w_400),

    //             Issue_a_150: formatNumber(item.issue_a_150),
    //             Issue_c_150: formatNumber(item.issue_c_150),
    //             Issue_e_150: formatNumber(item.issue_e_150),
    //             Issue_sw_150: formatNumber(item.issue_sw_150),
    //             Issue_ssw_150: formatNumber(item.issue_ssw_150),
    //             Issue_k_150: formatNumber(item.issue_k_150),

    //             Issue_a_180: formatNumber(item.issue_a_180),
    //             Issue_c_180: formatNumber(item.issue_c_180),
    //             Issue_e_180: formatNumber(item.issue_e_180),
    //             Issue_sw_180: formatNumber(item.issue_sw_180),
    //             Issue_ssw_180: formatNumber(item.issue_ssw_180),
    //             Issue_k_180: formatNumber(item.issue_k_180),

    //             Issue_a_210: formatNumber(item.issue_a_210),
    //             Issue_c_210: formatNumber(item.issue_c_210),
    //             Issue_e_210: formatNumber(item.issue_e_210),
    //             Issue_sw_210: formatNumber(item.issue_sw_210),
    //             Issue_ssw_210: formatNumber(item.issue_ssw_210),
    //             Issue_k_210: formatNumber(item.issue_k_210),

    //             Issue_a_240: formatNumber(item.issue_a_240),
    //             Issue_c_240: formatNumber(item.issue_c_240),
    //             Issue_e_240: formatNumber(item.issue_e_240),
    //             Issue_sw_240: formatNumber(item.issue_sw_240),
    //             Issue_ssw_240: formatNumber(item.issue_ssw_240),
    //             Issue_k_240: formatNumber(item.issue_k_240),

    //             Issue_a_280: formatNumber(item.issue_a_280),
    //             Issue_c_280: formatNumber(item.issue_c_280),
    //             Issue_e_280: formatNumber(item.issue_e_280),
    //             Issue_sw_280: formatNumber(item.issue_sw_280),
    //             Issue_ssw_280: formatNumber(item.issue_ssw_280),
    //             Issue_k_280: formatNumber(item.issue_k_280),

    //             Issue_a_320: formatNumber(item.issue_a_320),
    //             Issue_c_320: formatNumber(item.issue_c_320),
    //             Issue_e_320: formatNumber(item.issue_e_320),
    //             Issue_sw_320: formatNumber(item.issue_sw_320),
    //             Issue_ssw_320: formatNumber(item.issue_ssw_320),
    //             Issue_k_320: formatNumber(item.issue_k_320),

    //             Issue_a_360: formatNumber(item.issue_a_360),
    //             Issue_c_360: formatNumber(item.issue_c_360),
    //             Issue_e_360: formatNumber(item.issue_e_360),
    //             Issue_sw_360: formatNumber(item.issue_sw_360),
    //             Issue_ssw_360: formatNumber(item.issue_ssw_360),
    //             Issue_k_360: formatNumber(item.issue_k_360),

    //             Issue_a_400: formatNumber(item.issue_a_400),
    //             Issue_c_400: formatNumber(item.issue_c_400),
    //             Issue_e_400: formatNumber(item.issue_e_400),
    //             Issue_sw_400: formatNumber(item.issue_sw_400),
    //             Issue_ssw_400: formatNumber(item.issue_ssw_400),
    //             Issue_k_400: formatNumber(item.issue_k_400),
    //             Issue_rejection: formatNumber(item.issue_rejection),
    //             Issue_village: formatNumber(item.issue_village),
    //             Issue_bigTaiho: formatNumber(item.issue_bigTaiho),
    //             Issue_lw: formatNumber(item.issue_lw),
    //             Issue_Packing: formatNumber((parseFloat(item.issue_pw_150) + parseFloat(item.issue_w_150) + parseFloat(item.issue_ww_150)
    //                 + parseFloat(item.issue_s_150) + parseFloat(item.issue_aw_150) + parseFloat(item.issue_lw_150)
    //                 + parseFloat(item.issue_pw_180) + parseFloat(item.issue_w_180) + parseFloat(item.issue_ww_180)
    //                 + parseFloat(item.issue_s_180) + parseFloat(item.issue_aw_180) + parseFloat(item.issue_lw_180)
    //                 + parseFloat(item.issue_pw_210) + parseFloat(item.issue_w_210) + parseFloat(item.issue_ww_210)
    //                 + parseFloat(item.issue_s_210) + parseFloat(item.issue_aw_210) + parseFloat(item.issue_lw_210)
    //                 + parseFloat(item.issue_pw_240) + parseFloat(item.issue_w_240) + parseFloat(item.issue_ww_240)
    //                 + parseFloat(item.issue_ww_240_A) + parseFloat(item.issue_aw_240) + parseFloat(item.issue_lw_240)
    //                 + parseFloat(item.issue_pw_280) + parseFloat(item.issue_w_280) + parseFloat(item.issue_ww_280)
    //                 + parseFloat(item.issue_ww_280_A) + parseFloat(item.issue_aw_280) + parseFloat(item.issue_lw_280)
    //                 + parseFloat(item.wholes_double) + parseFloat(item.issue_pw_320) + parseFloat(item.issue_w_320)
    //                 + parseFloat(item.issue_ww_320) + parseFloat(item.issue_ww_320_A) + parseFloat(item.issue_aw_320)
    //                 + parseFloat(item.issue_lw_320) + parseFloat(item.issue_pw_360) + parseFloat(item.issue_w_360)
    //                 + parseFloat(item.issue_ww_360) + parseFloat(item.issue_ww_360_A) + parseFloat(item.issue_aw_360)
    //                 + parseFloat(item.issue_lw_360) + parseFloat(item.issue_pw_400) + parseFloat(item.issue_w_400)
    //                 + parseFloat(item.issue_ww_400) + parseFloat(item.issue_ww_400_A) + parseFloat(item.issue_aw_400) + parseFloat(item.issue_lw_400)
    //                 +parseFloat(item.issue_payal_240) +
    //                 parseFloat(item.issue_payal_400) +
    //                 parseFloat(item.issue_e_320_lot) +
    //                 parseFloat(item.issue_e_400_lot) +
    //                 parseFloat(item.issue_in_w_240) +
    //                 parseFloat(item.issue_in_w_320) +
    //                 parseFloat(item.issue_in_w_400) +
                    
    //                 parseFloat(item.issue_a_150) +
    //                 parseFloat(item.issue_c_150) +
    //                 parseFloat(item.issue_e_150) +
    //                 parseFloat(item.issue_sw_150) +
    //                 parseFloat(item.issue_ssw_150) +
    //                 parseFloat(item.issue_k_150) +
                    
    //                 parseFloat(item.issue_a_180) +
    //                 parseFloat(item.issue_c_180) +
    //                 parseFloat(item.issue_e_180) +
    //                 parseFloat(item.issue_sw_180) +
    //                 parseFloat(item.issue_ssw_180) +
    //                 parseFloat(item.issue_k_180) +
                    
    //                 parseFloat(item.issue_a_210) +
    //                 parseFloat(item.issue_c_210) +
    //                 parseFloat(item.issue_e_210) +
    //                 parseFloat(item.issue_sw_210) +
    //                 parseFloat(item.issue_ssw_210) +
    //                 parseFloat(item.issue_k_210) +
                    
    //                 parseFloat(item.issue_a_240) +
    //                 parseFloat(item.issue_c_240) +
    //                 parseFloat(item.issue_e_240) +
    //                 parseFloat(item.issue_sw_240) +
    //                 parseFloat(item.issue_ssw_240) +
    //                 parseFloat(item.issue_k_240) +
                    
    //                 parseFloat(item.issue_a_280) +
    //                 parseFloat(item.issue_c_280) +
    //                 parseFloat(item.issue_e_280) +
    //                 parseFloat(item.issue_sw_280) +
    //                 parseFloat(item.issue_ssw_280) +
    //                 parseFloat(item.issue_k_280) +
                    
    //                 parseFloat(item.issue_a_320) +
    //                 parseFloat(item.issue_c_320) +
    //                 parseFloat(item.issue_e_320) +
    //                 parseFloat(item.issue_sw_320) +
    //                 parseFloat(item.issue_ssw_320) +
    //                 parseFloat(item.issue_k_320) +
                    
    //                 parseFloat(item.issue_a_360) +
    //                 parseFloat(item.issue_c_360) +
    //                 parseFloat(item.issue_e_360) +
    //                 parseFloat(item.issue_sw_360) +
    //                 parseFloat(item.issue_ssw_360) +
    //                 parseFloat(item.issue_k_360) +
                    
    //                 parseFloat(item.issue_a_400) +
    //                 parseFloat(item.issue_c_400) +
    //                 parseFloat(item.issue_e_400) +
    //                 parseFloat(item.issue_sw_400) +
    //                 parseFloat(item.issue_ssw_400) +
    //                 parseFloat(item.issue_k_400)+ parseFloat(item.issue_jjb)+ parseFloat(item.issue_jjb1)).toString()),
    //             Issue_Village: formatNumber(item.issue_village),
    //             Issue_BigTaiho: formatNumber(item.issue_bigTaiho),
    //             Issue_LW: formatNumber(item.issue_lw),
    //             Issue_Rejection: formatNumber(item.issue_rejection),

    //             Current_Backlog: Number(item.current_backlog) < 0 ? formatNumberWithSign(Number(item.current_backlog)) : formatNumberWithSign(Number(item.current_backlog)),

    //             Operator_Day: item.noOfdayOperators,
    //             Operator_Night: item.noOfnightOperators,
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
    //     saveAs(blob, 'Wholes_Entry_' + currDate + '.xlsx');
    //           }
       
    // }

    const exportToExcel = async () => {
        try {
            const typeMap: any = {
                LOT: "LOT",
                "R-LOT": "RLOT",
                VLOT: "VLOT"
            };

            const response = await axios.put('/api/wholes/wholesprimarysearch', {
                searchitem: blConNo,
                fromDate: fromdate,
                toDate: todate,
                origin: origin,
                type: typeMap[searchType] || "VLOT"
            });

            const data1 = response.data;

            const sourceData =
                EditData.length > 0 ? EditData : data1.rcnEntries || [];

            const num = (val: any) => Number(val) || 0;

            // 🔹 Receive Total
            const getReceiveTotal = (item: WholesData) =>
                num(item.rcv_pw_210) + num(item.rcv_w_210) + num(item.rcv_ww_210) +
                num(item.rcv_pw_240) + num(item.rcv_w_240) + num(item.rcv_ww_240) +
                num(item.rcv_pw_280) + num(item.rcv_w_280) + num(item.rcv_ww_280) +
                num(item.rcv_pw_320) + num(item.rcv_w_320) + num(item.rcv_ww_320) +
                num(item.rcv_pw_360) + num(item.rcv_w_360) + num(item.rcv_ww_360) +
                num(item.rcv_pw_400) + num(item.rcv_w_400) + num(item.rcv_ww_400) +
                num(item.rcv_jb_mayur) + num(item.rcv_jb_hamsa);

            // 🔹 Issue Total (auto)
            

           const transformed = sourceData.map((item: WholesData, idx: number) => {
  const receiveTotal = getReceiveTotal(item);
  const loss = num(item.issue_add_2);

  // 🔹 Dynamic issue fields (ALL issue_* keys)
  const issueFields: any = {};
  Object.keys(item).forEach((key) => {
    if (key.startsWith("issue_")) {
      issueFields[
        key.replace("issue_", "Issue_")
      ] = num((item as any)[key]);
    }
  });

  // 🔹 Dynamic receive fields
  const receiveFields: any = {};
  Object.keys(item).forEach((key) => {
    if (key.startsWith("rcv_")) {
      receiveFields[
        key.replace("rcv_", "Receive_")
      ] = num((item as any)[key]);
    }
  });

  return {
    Sl_No: idx + 1,
    Issue_Type: item.altid == 1 ? "Fresh Issue" : "Re-Issue",
    Item_Lot_No: item.LotNo,
    Origin: item.origin,
    Issue_No: item.altid,
    Wholes_Entry_Date: handletimezone(item.date),
    Mixing_Lot: item.mixingLot,

    // 🔹 ALL RECEIVE FIELDS
    ...receiveFields,

    // 🔹 TOTALS
    Receive_Total: receiveTotal + loss,
    Receive_Total_Borma: receiveTotal,

    // 🔹 LOSS
    Borma_Loss_Kg: loss,
    Borma_Loss_Percentage: receiveTotal
      ? (loss / receiveTotal) * 100
      : 0,

    // 🔹 ALL ISSUE FIELDS (AUTO — includes a,c,e,wholes_double etc)
    ...issueFields,

    // 🔹 EXCLUDED (still shown separately)
    Issue_Village: num(item.issue_village),
    Issue_BigTaiho: num(item.issue_bigTaiho),
    Issue_LW: num(item.issue_lw),
    Issue_Rejection: num(item.issue_rejection),

    // 🔹 PACKING (EXCLUDING 4 fields)
    Issue_Packing: Object.keys(item)
      .filter(
        (k) =>
          k.startsWith("issue_") &&
          ![
            "issue_village",
            "issue_bigTaiho",
            "issue_lw",
            "issue_rejection"
          ].includes(k)
      )
      .reduce((sum, key) => sum + num((item as any)[key]), 0),

    // 🔹 FINAL
    Current_Backlog: num(item.current_backlog),
    Operator_Day: num(item.noOfdayOperators),
    Operator_Night: num(item.noOfnightOperators),
    Edit_Status: item.editStatus,
    Created_By: item.CreatedBy,
    Modified_By: item.modifiedBy
  };
});

            const ws = XLSX.utils.json_to_sheet(transformed);
            const wb = XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

            const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const blob = new Blob([wbout], { type: "application/octet-stream" });

            saveAs(blob, `Wholes_Entry_${currDate}.xlsx`);
        } catch (err) {
            console.error("Export failed:", err);
        }
    };
    const handleSearch = async () => {

        setEditData([])
        setblockpagen('flex')
              if (searchType === 'LOT') {
                 const response = await axios.put('/api/wholes/wholesprimarysearch', {
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
                 const response = await axios.put('/api/wholes/wholesprimarysearch', {
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
                  const response = await axios.put('/api/wholes/wholesprimarysearch', {
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
               
                                           {checkpending('Wholes') && (
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


                        <TableHead className={thClass} >Id</TableHead>
                         <TableHead className={thClass} >Action</TableHead>
                        <TableHead className={thClass} >Wholes⠀Issue⠀Type</TableHead>

                        <TableHead className={thClass} >Item⠀Lot⠀No</TableHead>
                        <TableHead className={thClass} >Origin</TableHead>
                        <TableHead className={thClass}>Issue⠀No</TableHead>
                        <TableHead className={thClass} >Edit⠀Status </TableHead>
                        <TableHead className={thClass} >Wholes⠀Entry⠀Date</TableHead>
<TableHead className={thClass}>Current_Backlog</TableHead>
                        <TableHead className={thClass} >Incoming⠀Mixed⠀Lot⠀&⠀Origin</TableHead>
                       
                        {/* <TableHead className="text-center" >Mixed Amount</TableHead> */}
                        <TableHead className={thClass}>Opening⠀Wholes</TableHead>
                        <TableHead className={thClass}>Borma⠀Loss(Kg)</TableHead>
                        <TableHead className={thClass}>Borma⠀Loss(%)</TableHead>
                        <TableHead className={thClass}>Receive PW_210 (Borma)</TableHead>
                        <TableHead className={thClass}>Receive W_210 (Borma)</TableHead>
                        <TableHead className={thClass}>Receive WW_210 (Borma)</TableHead>
                        <TableHead className={thClass}>Receive PW_240 (Borma)</TableHead>
                        <TableHead className={thClass}>Receive W_240 (Borma)</TableHead>
                        <TableHead className={thClass}>Receive WW_240 (Borma)</TableHead>
                        <TableHead className={thClass}>Receive PW_280 (Borma)</TableHead>
                        <TableHead className={thClass}>Receive W_280 (Borma)</TableHead>
                        <TableHead className={thClass}>Receive WW_280 (Borma)</TableHead>
                        <TableHead className={thClass}>Receive PW_320 (Borma)</TableHead>
                        <TableHead className={thClass}>Receive W_320 (Borma)</TableHead>
                        <TableHead className={thClass}>Receive WW_320 (Borma)</TableHead>
                        <TableHead className={thClass}>Receive PW_360 (Borma)</TableHead>
                        <TableHead className={thClass}>Receive W_360 (Borma)</TableHead>
                        <TableHead className={thClass}>Receive WW_360 (Borma)</TableHead>
                        <TableHead className={thClass}>Receive PW_400 (Borma)</TableHead>
                        <TableHead className={thClass}>Receive W_400 (Borma)</TableHead>
                        <TableHead className={thClass}>Receive WW_400 (Borma)</TableHead>

                        <TableHead className={thClass}>Receive Hamsa⠀JB (Borma)</TableHead>
                        <TableHead className={thClass}>Receive Hamsa (Borma)</TableHead>
                        <TableHead className={thClass}>Receive Mayur (Borma)</TableHead>



                        <TableHead className={thClass}>Wholes Total⠀Opening (Borma)</TableHead>
                        <TableHead className={thClass}>PW_150</TableHead>
                        <TableHead className={thClass}>W_150</TableHead>
                        <TableHead className={thClass}>WW_150</TableHead>
                        <TableHead className={thClass}>S_150</TableHead>
                        <TableHead className={thClass}>AW_150</TableHead>
                        <TableHead className={thClass}>LW_150</TableHead>
                        <TableHead className={thClass}>PW_180</TableHead>
                        <TableHead className={thClass}>W_180</TableHead>
                        <TableHead className={thClass}>WW_180</TableHead>
                        <TableHead className={thClass}>S_180</TableHead>
                        <TableHead className={thClass}>AW_180</TableHead>
                        <TableHead className={thClass}>LW_180</TableHead>
                        <TableHead className={thClass}>PW_210</TableHead>
                        <TableHead className={thClass}>W_210</TableHead>
                        <TableHead className={thClass}>WW_210</TableHead>
                        <TableHead className={thClass}>S_210</TableHead>
                        <TableHead className={thClass}>AW_210</TableHead>
                        <TableHead className={thClass}>LW_210</TableHead>
                        <TableHead className={thClass}>PW_240</TableHead>
                        <TableHead className={thClass}>W_240</TableHead>
                        <TableHead className={thClass}>WW_240</TableHead>
                        <TableHead className={thClass}>WW_240_A</TableHead>
                        <TableHead className={thClass}>AW_240</TableHead>
                        <TableHead className={thClass}>LW_240</TableHead>
                        <TableHead className={thClass}>PW_280</TableHead>
                        <TableHead className={thClass}>W_280</TableHead>
                        <TableHead className={thClass}>WW_280</TableHead>
                        <TableHead className={thClass}>WW_280_A</TableHead>
                        <TableHead className={thClass}>AW_280</TableHead>
                        <TableHead className={thClass}>LW_280</TableHead>
                       <TableHead className={thClass}>Wholes⠀Double</TableHead>
<TableHead className={thClass}>PW_320</TableHead>
<TableHead className={thClass}>W_320</TableHead>
<TableHead className={thClass}>WW_320</TableHead>
<TableHead className={thClass}>WW_320_A</TableHead>
<TableHead className={thClass}>AW_320</TableHead>
<TableHead className={thClass}>LW_320</TableHead>

<TableHead className={thClass}>PW_360</TableHead>
<TableHead className={thClass}>W_360</TableHead>
<TableHead className={thClass}>WW_360</TableHead>
<TableHead className={thClass}>WW_360_A</TableHead>
<TableHead className={thClass}>AW_360</TableHead>
<TableHead className={thClass}>LW_360</TableHead>

<TableHead className={thClass}>PW_400</TableHead>
<TableHead className={thClass}>W_400</TableHead>
<TableHead className={thClass}>WW_400</TableHead>
<TableHead className={thClass}>WW_400_A</TableHead>
<TableHead className={thClass}>AW_400</TableHead>
<TableHead className={thClass}>LW_400</TableHead>

<TableHead className={thClass}>JJB</TableHead>
<TableHead className={thClass}>JJB1</TableHead>
<TableHead className={thClass}>PAYAL_240</TableHead>
<TableHead className={thClass}>PAYAL_400</TableHead>
<TableHead className={thClass}>E_320_LOT</TableHead>
<TableHead className={thClass}>E_400_LOT</TableHead>
<TableHead className={thClass}>IN_W_240</TableHead>
<TableHead className={thClass}>IN_W_320</TableHead>
<TableHead className={thClass}>IN_W_400</TableHead>
                    <TableHead className={thClass}>Lot⠀Village Seperator</TableHead>

<TableHead className={thClass}>A_150</TableHead>
<TableHead className={thClass}>C_150</TableHead>
<TableHead className={thClass}>E_150</TableHead>
<TableHead className={thClass}>SW_150</TableHead>
<TableHead className={thClass}>SSW_150</TableHead>
<TableHead className={thClass}>K_150</TableHead>

<TableHead className={thClass}>A_180</TableHead>
<TableHead className={thClass}>C_180</TableHead>
<TableHead className={thClass}>E_180</TableHead>
<TableHead className={thClass}>SW_180</TableHead>
<TableHead className={thClass}>SSW_180</TableHead>
<TableHead className={thClass}>K_180</TableHead>

<TableHead className={thClass}>A_210</TableHead>
<TableHead className={thClass}>C_210</TableHead>
<TableHead className={thClass}>E_210</TableHead>
<TableHead className={thClass}>SW_210</TableHead>
<TableHead className={thClass}>SSW_210</TableHead>
<TableHead className={thClass}>K_210</TableHead>

<TableHead className={thClass}>A_240</TableHead>
<TableHead className={thClass}>C_240</TableHead>
<TableHead className={thClass}>E_240</TableHead>
<TableHead className={thClass}>SW_240</TableHead>
<TableHead className={thClass}>SSW_240</TableHead>
<TableHead className={thClass}>K_240</TableHead>

<TableHead className={thClass}>A_280</TableHead>
<TableHead className={thClass}>C_280</TableHead>
<TableHead className={thClass}>E_280</TableHead>
<TableHead className={thClass}>SW_280</TableHead>
<TableHead className={thClass}>SSW_280</TableHead>
<TableHead className={thClass}>K_280</TableHead>

<TableHead className={thClass}>A_320</TableHead>
<TableHead className={thClass}>C_320</TableHead>
<TableHead className={thClass}>E_320</TableHead>
<TableHead className={thClass}>SW_320</TableHead>
<TableHead className={thClass}>SSW_320</TableHead>
<TableHead className={thClass}>K_320</TableHead>

<TableHead className={thClass}>A_360</TableHead>
<TableHead className={thClass}>C_360</TableHead>
<TableHead className={thClass}>E_360</TableHead>
<TableHead className={thClass}>SW_360</TableHead>
<TableHead className={thClass}>SSW_360</TableHead>
<TableHead className={thClass}>K_360</TableHead>

<TableHead className={thClass}>A_400</TableHead>
<TableHead className={thClass}>C_400</TableHead>
<TableHead className={thClass}>E_400</TableHead>
<TableHead className={thClass}>SW_400</TableHead>
<TableHead className={thClass}>SSW_400</TableHead>
<TableHead className={thClass}>K_400</TableHead>


                        {/* <TableHead className="text-center">Issue Add 4</TableHead>
                    <TableHead className="text-center">Issue Add 5</TableHead>
                    <TableHead className="text-center">Issue Add 6</TableHead>
                    <TableHead className="text-center">Issue Add 7</TableHead>
                    <TableHead className="text-center">Issue Add 8</TableHead>
                    <TableHead className="text-center">Issue Add 9</TableHead>
                    <TableHead className="text-center">Issue Add 10</TableHead> */}
                        <TableHead className={thClass}>Issue Packing</TableHead>
                        <TableHead className={thClass}>Issue Rejection</TableHead>
                        <TableHead className={thClass}>Issue Village</TableHead>
                        <TableHead className={thClass}>Issue LW</TableHead>
                        <TableHead className={thClass}>Issue BigTaiho</TableHead>
                        
                        {/* <TableHead className="text-center">Entry_Backlog</TableHead> */}
                        



                        <TableHead className={thClass}>Operator_Day</TableHead>
                        <TableHead className={thClass}>Operator_Night</TableHead>

                        
                        <TableHead className={thClass} >Created By </TableHead>
                        
                    </TableHeader>
                    <TableBody>


                        {EditData.length > 0 && props.props==='edit' ? (EditData.map((item: WholesData, idx) => {

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
                                        <TableCell className="text-center font-bold text-red-500 ">{formatNumber(((Number(item.issue_add_2)/(parseFloat(item.current_backlog)+parseFloat(item.issue_pw_150) +
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
                                                    parseFloat(item.issue_rejection)+parseFloat(item.issue_village)+parseFloat(item.issue_lw)+parseFloat(item.issue_bigTaiho)))*100).toString())} %</TableCell>
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





                                    <TableCell className="text-center">{item.noOfdayOperators}</TableCell>
                                    <TableCell className="text-center">{item.noOfnightOperators}</TableCell>
                                    
                                    <TableCell className="text-center">{item.CreatedBy}</TableCell>

                                    
                                </TableRow>
                            )
                        })) : (
                            Data.length > 0 ? (Data.map((item: WholesData, idx) => {
                                return (
                                    <TableRow key={item.id} className={`${item.latest == 1 ? '' : 'opacity-50 hover:bg-gray-200 bg-gray-200'}`}>
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
                                                                    <p className='text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold'>Wholes Entry Modification</p>
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
                                                                    <p className='text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold'>Wholes Entry Reissue</p>
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
                                                                    <p className='text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold'>Lot No : {item.LotNo} ({item.origin})</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <RCNWholesReMix borma={item} />
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
                                        <TableCell className="text-center font-bold text-red-500 ">{formatNumber(((Number(item.issue_add_2)/(parseFloat(item.current_backlog)+parseFloat(item.issue_pw_150) +
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
                                                    parseFloat(item.issue_rejection)+parseFloat(item.issue_village)+parseFloat(item.issue_lw)+parseFloat(item.issue_bigTaiho)))*100).toString())} %</TableCell>
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

export default WholesTable;