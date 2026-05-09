import { useContext, useEffect, useState } from "react";
import { Origin, pagelimit, pageNo, pendingCheckRole } from "../common/exportData";
import Context from "../context/context";
import axios from "axios";
import {  pendingCheckRoles, PermissionRole, PeelingData } from "@/type/type";
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
import { CiEdit } from "react-icons/ci";
import { FcApprove, FcDisapprove } from "react-icons/fc";
// import BormaModify from "./RCNBormaModify";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import PeelingModify from "./PeelingModify";
//import HumidifierModify from "./HumidifierModify";

const PeelingTable = (props:any) => {
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
   // const [hidetodate, sethidetoDate] = useState<string>('');
    const currDate = new Date().toLocaleDateString();
    const [origin, setOrigin] = useState<string>("")
    const [blockpagen, setblockpagen] = useState('flex')
    const [EditData, setEditData] = useState<PeelingData[]>([])
    const [blConNo, setBlConNo] = useState<string>("")
    const { editPeelingLotWiseData } = useContext(Context);
    const [Data, setData] = useState<PeelingData[]>([])
     const dropdown = ['LOT', 'V-LOT','R-LOT']
            const [searchType, setsearchType] = useState('LOT')
             const [searchtableType, setsearchTableType] = useState('LOT')
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
              const response = await axios.put('/api/peeling/peelingprimarysearch', {
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
            transformed = EditData.map((item: PeelingData, idx: number) => ({
                 SL_No: idx + 1,
                LotNo: item.LotNo,
                date: handletimezone(item.date),
                origin: item.origin,
                Total_Input:Number(item.TotalInput) ||0,
                Pressure:formatNumber(item.pressure),
                Moisture:item.moisture ,
                Peeling_Time:item.peelingTime,
                  UnPeel_Prcnt:formatNumber(item.unpeelp),
               Broken_Prcnt:formatNumber(item.brokenp),
               Chura_Prcnt:formatNumber(item.churap),
                // Unpeel_Piece:Number(item.UnpeelPiece) ||0,
                WholesPeel_Or_WholesJB: Number(item.WholesPeel)||0,
                WholesUnpeel_Or_LW:Number(item.WholesUnpeel)||0,
            //     DP: Number(item.DP)||0,
            //     DS: Number(item.DS)||0,
            //     DP1:Number(item.DP1)||0,
            //     JJH: Number(item.JJH)||0,
            //     SJH: Number(item.SJH)||0,
            //     SJH1:Number(item.SJH1)||0,
            //     JK_K:Number(item.JK_K)||0,
            //     SP1:Number(item.SP1)||0,
            //    JH1:Number(item.JH1)||0,
               Husk:Number(item.Husk)||0,
            //    Rejection: Number(item.Rejection)||0,
               Big_Taiho: Number(item.Big_Taiho)||0,
                Mc_on: handleAMPM(item.Mc_on.slice(0, 5)),
                Mc_off: handleAMPM(item.Mc_off.slice(0, 5)),
                Mc_breakdown: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),         
                otherTime: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),
                Mc_runTime: item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, ''),
                noOfOperators: Number(item.noOfOperators) || 0,
                noOfOperators_Day:Number(item.noOfdayOperators) || 0,
                noOfOperators_Night:Number(item.noOfnightOperators) || 0,
                noOfOperators_Husk:Number(item.noOfhuskOperators) || 0,
                NoOfTrolley:Number(item.NoOfTrolley) || 0,
                Backlog:formatNumber(item.difference),
                CreatedBy: item.CreatedBy,
                editStatus: item.editStatus,
                modifiedBy: item.modifiedBy
            }));
            //setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else {
            transformed = data1.rcnEntries.map((item: PeelingData, idx: number) => ({
               SL_No: idx + 1,
                LotNo: item.LotNo,
                date: handletimezone(item.date),
                origin: item.origin,
                Total_Input:Number(item.TotalInput) ||0,
                Pressure:formatNumber(item.pressure),
                Moisture:item.moisture ,
                Peeling_Time:item.peelingTime,
                  UnPeel_Prcnt:formatNumber(item.unpeelp),
               Broken_Prcnt:formatNumber(item.brokenp),
               Chura_Prcnt:formatNumber(item.churap),
                // Unpeel_Piece:Number(item.UnpeelPiece) ||0,
                WholesPeel_Or_WholesJB: Number(item.WholesPeel)||0,
                WholesUnpeel_Or_LW:Number(item.WholesUnpeel)||0,
            //     DP: Number(item.DP)||0,
            //     DS: Number(item.DS)||0,
            //     DP1:Number(item.DP1)||0,
            //     JJH: Number(item.JJH)||0,
            //     SJH: Number(item.SJH)||0,
            //     SJH1:Number(item.SJH1)||0,
            //     JK_K:Number(item.JK_K)||0,
            //     SP1:Number(item.SP1)||0,
            //    JH1:Number(item.JH1)||0,
               Husk:Number(item.Husk)||0,
            //    Rejection: Number(item.Rejection)||0,
               Big_Taiho: Number(item.Big_Taiho)||0,
                Mc_on: handleAMPM(item.Mc_on.slice(0, 5)),
                Mc_off: handleAMPM(item.Mc_off.slice(0, 5)),
                Mc_breakdown: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),         
                otherTime: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),
                Mc_runTime: item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, ''),
                noOfOperators: Number(item.noOfOperators) || 0,
                noOfOperators_Day:Number(item.noOfdayOperators) || 0,
                noOfOperators_Night:Number(item.noOfnightOperators) || 0,
                noOfOperators_Husk:Number(item.noOfhuskOperators) || 0,
                NoOfTrolley:Number(item.NoOfTrolley) || 0,
                Backlog:formatNumber(item.difference),
                CreatedBy: item.CreatedBy,
                editStatus: item.editStatus,
                modifiedBy: item.modifiedBy

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
         else if (searchType === 'R-LOT') {
              const response = await axios.put('/api/peeling/peelingprimarysearch', {
            searchitem: blConNo,
            fromDate: fromdate,
            toDate: todate,
            origin: origin,
            type:'RLOT'
        })
        const data1 = await response.data

        let ws
        let transformed: any[] = [];
        if (EditData.length > 0) {
            transformed = EditData.map((item: PeelingData, idx: number) => ({
                SL_No: idx + 1,
                LotNo: item.LotNo,
                date: handletimezone(item.date),
                origin: item.origin,
                Total_Input:Number(item.TotalInput) ||0,
                Pressure:formatNumber(item.pressure),
                Moisture:item.moisture ,
                Peeling_Time:item.peelingTime,
                  UnPeel_Prcnt:formatNumber(item.unpeelp),
               Broken_Prcnt:formatNumber(item.brokenp),
               Chura_Prcnt:formatNumber(item.churap),
                // Unpeel_Piece:Number(item.UnpeelPiece) ||0,
                WholesPeel_Or_WholesJB: Number(item.WholesPeel)||0,
                WholesUnpeel_Or_LW:Number(item.WholesUnpeel)||0,
            //     DP: Number(item.DP)||0,
            //     DS: Number(item.DS)||0,
            //     DP1:Number(item.DP1)||0,
            //     JJH: Number(item.JJH)||0,
            //     SJH: Number(item.SJH)||0,
            //     SJH1:Number(item.SJH1)||0,
            //     JK_K:Number(item.JK_K)||0,
            //     SP1:Number(item.SP1)||0,
            //    JH1:Number(item.JH1)||0,
               Husk:Number(item.Husk)||0,
            //    Rejection: Number(item.Rejection)||0,
               Big_Taiho: Number(item.Big_Taiho)||0,
                Mc_on: handleAMPM(item.Mc_on.slice(0, 5)),
                Mc_off: handleAMPM(item.Mc_off.slice(0, 5)),
                Mc_breakdown: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),         
                otherTime: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),
                Mc_runTime: item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, ''),
                noOfOperators: Number(item.noOfOperators) || 0,
                noOfOperators_Day:Number(item.noOfdayOperators) || 0,
                noOfOperators_Night:Number(item.noOfnightOperators) || 0,
                noOfOperators_Husk:Number(item.noOfhuskOperators) || 0,
                NoOfTrolley:Number(item.NoOfTrolley) || 0,
                Backlog:formatNumber(item.difference),
                CreatedBy: item.CreatedBy,
                editStatus: item.editStatus,
                modifiedBy: item.modifiedBy
            }));
            //setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else{
            transformed = data1.rcnEntries.map((item: PeelingData, idx: number) => ({
                SL_No: idx + 1,
                LotNo: item.LotNo,
                date: handletimezone(item.date),
                origin: item.origin,
                Total_Input:Number(item.TotalInput) ||0,
                Pressure:formatNumber(item.pressure),
                Moisture:item.moisture ,
                Peeling_Time:item.peelingTime,
                  UnPeel_Prcnt:formatNumber(item.unpeelp),
               Broken_Prcnt:formatNumber(item.brokenp),
               Chura_Prcnt:formatNumber(item.churap),
                // Unpeel_Piece:Number(item.UnpeelPiece) ||0,
                WholesPeel_Or_WholesJB: Number(item.WholesPeel)||0,
                WholesUnpeel_Or_LW:Number(item.WholesUnpeel)||0,
            //     DP: Number(item.DP)||0,
            //     DS: Number(item.DS)||0,
            //     DP1:Number(item.DP1)||0,
            //     JJH: Number(item.JJH)||0,
            //     SJH: Number(item.SJH)||0,
            //     SJH1:Number(item.SJH1)||0,
            //     JK_K:Number(item.JK_K)||0,
            //     SP1:Number(item.SP1)||0,
            //    JH1:Number(item.JH1)||0,
               Husk:Number(item.Husk)||0,
            //    Rejection: Number(item.Rejection)||0,
               Big_Taiho: Number(item.Big_Taiho)||0,
                Mc_on: handleAMPM(item.Mc_on.slice(0, 5)),
                Mc_off: handleAMPM(item.Mc_off.slice(0, 5)),
                Mc_breakdown: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),         
                otherTime: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),
                Mc_runTime: item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, ''),
                noOfOperators: Number(item.noOfOperators) || 0,
                noOfOperators_Day:Number(item.noOfdayOperators) || 0,
                noOfOperators_Night:Number(item.noOfnightOperators) || 0,
                noOfOperators_Husk:Number(item.noOfhuskOperators) || 0,
                NoOfTrolley:Number(item.NoOfTrolley) || 0,
                Backlog:formatNumber(item.difference),
                CreatedBy: item.CreatedBy,
                editStatus: item.editStatus,
                modifiedBy: item.modifiedBy

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
         else{
  const response = await axios.put('/api/peeling/peelingprimarysearch', {
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
            transformed = EditData.map((item: PeelingData, idx: number) => ({
                SL_No: idx + 1,
                LotNo: item.LotNo,
                date: handletimezone(item.date),
                origin: item.origin,
                Total_Input:Number(item.TotalInput) ||0,
                Pressure:formatNumber(item.pressure),
                Moisture:item.moisture ,
                Peeling_Time:item.peelingTime,
                  UnPeel_Prcnt:formatNumber(item.unpeelp),
               Broken_Prcnt:formatNumber(item.brokenp),
               Chura_Prcnt:formatNumber(item.churap),
                // Unpeel_Piece:Number(item.UnpeelPiece) ||0,
                WholesPeel_Or_WholesJB: Number(item.WholesPeel)||0,
                WholesUnpeel_Or_LW:Number(item.WholesUnpeel)||0,
            //     DP: Number(item.DP)||0,
            //     DS: Number(item.DS)||0,
            //     DP1:Number(item.DP1)||0,
            //     JJH: Number(item.JJH)||0,
            //     SJH: Number(item.SJH)||0,
            //     SJH1:Number(item.SJH1)||0,
            //     JK_K:Number(item.JK_K)||0,
            //     SP1:Number(item.SP1)||0,
            //    JH1:Number(item.JH1)||0,
               Husk:Number(item.Husk)||0,
            //    Rejection: Number(item.Rejection)||0,
               Big_Taiho: Number(item.Big_Taiho)||0,
                Mc_on: handleAMPM(item.Mc_on.slice(0, 5)),
                Mc_off: handleAMPM(item.Mc_off.slice(0, 5)),
                Mc_breakdown: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),         
                otherTime: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),
                Mc_runTime: item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, ''),
                noOfOperators: Number(item.noOfOperators) || 0,
                noOfOperators_Day:Number(item.noOfdayOperators) || 0,
                noOfOperators_Night:Number(item.noOfnightOperators) || 0,
                noOfOperators_Husk:Number(item.noOfhuskOperators) || 0,
                NoOfTrolley:Number(item.NoOfTrolley) || 0,
                Backlog:formatNumber(item.difference),
                CreatedBy: item.CreatedBy,
                editStatus: item.editStatus,
                modifiedBy: item.modifiedBy
            }));
            //setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else {
            transformed = data1.rcnEntries.map((item: PeelingData, idx: number) => ({
                SL_No: idx + 1,
                LotNo: item.LotNo,
                date: handletimezone(item.date),
                origin: item.origin,
              Total_Input:Number(item.TotalInput) ||0,
                Pressure:formatNumber(item.pressure),
                Moisture:item.moisture ,
                Peeling_Time:item.peelingTime,
                  UnPeel_Prcnt:formatNumber(item.unpeelp),
               Broken_Prcnt:formatNumber(item.brokenp),
               Chura_Prcnt:formatNumber(item.churap),
                // Unpeel_Piece:Number(item.UnpeelPiece) ||0,
                WholesPeel_Or_WholesJB: Number(item.WholesPeel)||0,
                WholesUnpeel_Or_LW:Number(item.WholesUnpeel)||0,
            //     DP: Number(item.DP)||0,
            //     DS: Number(item.DS)||0,
            //     DP1:Number(item.DP1)||0,
            //     JJH: Number(item.JJH)||0,
            //     SJH: Number(item.SJH)||0,
            //     SJH1:Number(item.SJH1)||0,
            //     JK_K:Number(item.JK_K)||0,
            //     SP1:Number(item.SP1)||0,
            //    JH1:Number(item.JH1)||0,
               Husk:Number(item.Husk)||0,
            //    Rejection: Number(item.Rejection)||0,
               Big_Taiho: Number(item.Big_Taiho)||0,
                Mc_on: handleAMPM(item.Mc_on.slice(0, 5)),
                Mc_off: handleAMPM(item.Mc_off.slice(0, 5)),
                Mc_breakdown: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),         
                otherTime: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),
                Mc_runTime: item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, ''),
                noOfOperators: Number(item.noOfOperators) || 0,
                noOfOperators_Day:Number(item.noOfdayOperators) || 0,
                noOfOperators_Night:Number(item.noOfnightOperators) || 0,
                noOfOperators_Husk:Number(item.noOfhuskOperators) || 0,
                NoOfTrolley:Number(item.NoOfTrolley) || 0,
                Backlog:formatNumber(item.difference),
                CreatedBy: item.CreatedBy,
                editStatus: item.editStatus,
                modifiedBy: item.modifiedBy

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
      
    }
    const handleSearch = async () => {

        setEditData([])
        setblockpagen('flex')
        if (searchType === 'LOT') {
const response = await axios.put('/api/peeling/peelingprimarysearch', {
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
        setsearchTableType('LOT')
        }
        else if (searchType === 'R-LOT') {
            const response = await axios.put('/api/peeling/peelingprimarysearch', {
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
        setsearchTableType('R-LOT')
        }
        else{
            const response = await axios.put('/api/peeling/peelingprimarysearch', {
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
        setsearchTableType('V-LOT')
        }
        


    }
    useEffect(() => {
        if (editPeelingLotWiseData.length > 0) {
            //console.log(editPendingData)
            setEditData(editPeelingLotWiseData)
            if(props.props==='edit'){setblockpagen('none')}
        }

    },[editPeelingLotWiseData, props.props])
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
    const handleApprove = async (item: PeelingData) => {
        const response = await axios.put(`/api/peeling/approveeditPeeling/${item.id}/${item.LotNo}/${item.origin}`)
        const data = await response.data
        if (data.message === "Edit Request of Peeling Entry is Approved Successfully") {

            if (approvesuccessdialog != null) {
                (approvesuccessdialog as any).showModal();
            }
        }
    }
    const handleRejection = async (item: PeelingData) => {
        const response = await axios.delete(`/api/peeling/rejectededitPeeling/${item.id}`)
        const data = await response.data
        console.log(data)
        if (data.message === "Peeling Entry rejected successfully") {
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
                            placeholder="Enter Lot No."
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

                        {checkpending('Borma') && (
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
                {props.props==='edit' && 
                <span className="w-1/8 ">
                <Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}
                <Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">


                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>
                        Id</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >
                        Action</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Item⠀Lot⠀No</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >
                        Origin</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Peeling⠀Date</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Edit⠀Status </TableHead>
                       
                        {(searchtableType==='LOT' || props.props==='edit') && <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Pressure</TableHead>}
                        {(searchtableType==='LOT' || props.props==='edit')  && <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Moisture⠀(Min⠀:⠀Max)⠀%</TableHead>}
                        {(searchtableType==='LOT' || props.props==='edit') && <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Peeling⠀Time</TableHead>}
                        {(searchtableType==='LOT' || props.props==='edit')  && <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >No⠀Of⠀Trolley</TableHead>}
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Total⠀Input⠀(Kg)</TableHead>

                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Total⠀Unpeel (%)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Total⠀Broken (%)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Total⠀Chura (%)</TableHead>

                        {(searchtableType==='V-LOT' || props.props==='edit') && <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Pieces⠀Unpeel (Village)</TableHead> }
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Wholes⠀Peel⠀/ Wholes+JB⠀(Mayur)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Wholes⠀UnPeel⠀/ LW⠀(Mayur)</TableHead>
                       
                        {/* <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >DP (DP&DS)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >DS (DP&DS)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>DP1 (DP&DS)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >JJH (Sorting)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >SJH (Sorting)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >SJH1 (Sorting)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >JK/K (Sorting)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>SP1 (Sorting)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>JH1 (Sorting)</TableHead> */}
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Peeling⠀Husk</TableHead>
                        {/* <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Rejection</TableHead> */}
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Big⠀Taiho</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Total⠀Issue(Kg)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Total⠀Backlog</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Peeling⠀ON</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Peeling⠀OFF</TableHead>
                        
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Breakdown Duration</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Other Duration</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Run Duration</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >No Of Operator</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Operator (Day)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Operator (Night)</TableHead>
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`}>Operator (Husk)</TableHead>
                     
                        <TableHead className={`text-center ${props.props==='edit' ? 'bg-gray-100 text-gray-700':''}`} >Created⠀By </TableHead>
                   
                    </TableHeader>
                    <TableBody>


                        {EditData.length > 0 && props.props==='edit' ? (EditData.map((item: PeelingData, idx) => {

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
                                <TableCell className="text-center font-bold text-red-500">{item.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-500">{item.origin}</TableCell>
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
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
                                       
                                     {searchtableType==='LOT' &&  <TableCell className="text-center">{item.pressure ?formatNumber(item.pressure):''} </TableCell>}
                                      {searchtableType==='LOT' &&   <TableCell className="text-center ">{item.moisture ? `${item.moisture} %` : ''}</TableCell>}
                                     {searchtableType==='LOT' &&    <TableCell className="text-center  ">{item.peelingTime} </TableCell>}
                                      
                                       {searchtableType==='LOT' &&  <TableCell className="text-center">{item.NoOfTrolley} </TableCell>}
                                        <TableCell className="text-center font-bold bg-green-500 text-white">{formatNumber(item.TotalInput)}</TableCell>
                                        
                                        <TableCell className="text-center bg-red-100">{item.unpeelp ?formatNumber(item.unpeelp):''}</TableCell>
                                        <TableCell className="text-center bg-red-100">{item.brokenp ?formatNumber(item.brokenp):''}</TableCell>
                                        <TableCell className="text-center bg-red-100">{item.churap ?formatNumber(item.churap):''}</TableCell>

                                        {(searchtableType==='V-LOT' || props.props==='edit') && <TableCell className="text-center bg-green-100">{formatNumber(item.UnpeelPiece)}</TableCell>}
                                        <TableCell className="text-center bg-green-100">{formatNumber(item.WholesPeel)}</TableCell>
                                        <TableCell className="text-center bg-green-100">{formatNumber(item.WholesUnpeel)}</TableCell>
                                        
                                        {/* <TableCell className="text-center bg-yellow-100">{formatNumber(item.DP)}</TableCell>
                                        <TableCell className="text-center bg-yellow-100">{formatNumber(item.DS)}</TableCell>
                                        <TableCell className="text-center bg-yellow-100">{formatNumber(item.DP1)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.JJH)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.SJH)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.SJH1)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.JK_K)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.SP1)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.JH1)}</TableCell> */}
                                        <TableCell className="text-center bg-yellow-100">{formatNumber(item.Husk)}</TableCell>
                                        {/* <TableCell className="text-center bg-green-100">{formatNumber(item.Rejection)}</TableCell> */}
                                        <TableCell className="text-center bg-red-100">{formatNumber(item.Big_Taiho)}</TableCell>
                                        <TableCell className="text-center font-bold bg-yellow-500 text-white">{formatNumber((parseFloat(item.TotalInput)-parseFloat(item.difference)).toString())} Kg</TableCell>
                                        <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(item.difference)} Kg</TableCell>
                                       
                                        
                                        <TableCell className="text-center">{handleAMPM(item.Mc_on.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center">{item.noOfOperators}</TableCell>
                            <TableCell className="text-center">{item.noOfdayOperators}</TableCell>
                            <TableCell className="text-center">{item.noOfnightOperators}</TableCell>
                            <TableCell className="text-center">{item.noOfhuskOperators}</TableCell>
                                        
                                        <TableCell className="text-center">{item.CreatedBy}</TableCell>
                            
                                </TableRow>
                            ) })): (

                            Data.length > 0 ? (Data.map((item: PeelingData, idx) => {
                             
                              
                      

                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                        <TableCell className="text-center">
                                            <Popover>
                                                 <PopoverTrigger>
                                                    <button className={`p-2 bg-white rounded ${item.editStatus === 'Pending' ? 'text-red-500 h-8  w-20 border border-red-400 font-bold rounded-lg opacity-60 hover:bg-red-200' : 'text-blue-500 h-8  w-20 border border-blue-400 font-bold rounded-lg hover:bg-blue-200'}`} disabled={item.editStatus === 'Pending' ? true : false}>Action</button>
                                                </PopoverTrigger>
                                                <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                                    <Dialog>
                                                        <DialogTrigger className="flex"><CiEdit size={20} />
                                                            <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Modify</button>
                                                        </DialogTrigger>
                                                        <DialogContent  className="max-w-3xl">
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>Peeling Entry Modification</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <PeelingModify data={item} />
                                                        </DialogContent>
                                                    </Dialog>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                        <TableCell className="text-center font-bold text-red-500">{item.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-blue-500">{item.origin}</TableCell>
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
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
                                       
                                          {searchtableType==='LOT' &&  <TableCell className="text-center ">{item.pressure ? `${formatNumber(item.moisture)} psi` : ''}</TableCell>}
                                            {searchtableType==='LOT' &&  <TableCell className="text-center ">{item.moisture ? `${item.moisture} %` : ''}</TableCell>}
                                         {searchtableType==='LOT' &&  <TableCell className="text-center  ">{item.peelingTime} </TableCell>}
                                      
                                         {searchtableType==='LOT' &&  <TableCell className="text-center">{item.NoOfTrolley} </TableCell>}
                                        <TableCell className="text-center font-bold bg-green-500 text-white">{formatNumber(item.TotalInput)} </TableCell>

                                        <TableCell className="text-center font-semibold">{item.unpeelp ?`${formatNumber(item.unpeelp)} %`:''} </TableCell>
                                        <TableCell className="text-center font-semibold">{item.brokenp ?`${formatNumber(item.brokenp)} %`:''}</TableCell>
                                        <TableCell className="text-center font-semibold">{item.churap ?`${formatNumber(item.churap)} %`:''}</TableCell>

                                          {searchtableType==='V-LOT' &&  <TableCell className="text-center bg-red-100">{formatNumber(item.UnpeelPiece)}</TableCell> }
                                        <TableCell className="text-center bg-green-100">{formatNumber(item.WholesPeel)}</TableCell>
                                        <TableCell className="text-center bg-green-100">{formatNumber(item.WholesUnpeel)}</TableCell>
                                        
                                        {/* <TableCell className="text-center bg-yellow-100">{formatNumber(item.DP)}</TableCell>
                                        <TableCell className="text-center bg-yellow-100">{formatNumber(item.DS)}</TableCell>
                                        <TableCell className="text-center bg-yellow-100">{formatNumber(item.DP1)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.JJH)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.SJH)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.SJH1)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.JK_K)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.SP1)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.JH1)}</TableCell> */}
                                        <TableCell className="text-center bg-yellow-100">{formatNumber(item.Husk)}</TableCell>
                                        {/* <TableCell className="text-center bg-blue-200">{formatNumber(item.Rejection)}</TableCell> */}
                                        <TableCell className="text-center bg-red-100">{formatNumber(item.Big_Taiho)}</TableCell>
                                        <TableCell className="text-center font-bold bg-yellow-500 text-white">{formatNumber((parseFloat(item.TotalInput)-parseFloat(item.difference)).toString())} </TableCell>

                                        <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(item.difference)} </TableCell>

                                        <TableCell className="text-center">{handleAMPM(item.Mc_on.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center">{item.noOfOperators}</TableCell>
                            <TableCell className="text-center">{item.noOfdayOperators}</TableCell>
                            <TableCell className="text-center">{item.noOfnightOperators}</TableCell>
                            <TableCell className="text-center">{item.noOfhuskOperators}</TableCell>
                                       
                                        <TableCell className="text-center">{item.CreatedBy}</TableCell>

                                        
                                    </TableRow>
                                );
                            })) : (<TableRow>
                              
                                <TableCell colSpan={41}><p className="font-bold tracking-widest uppercase text-left text-red-500 py-4 text-lg">No Result Found</p></TableCell>
                             
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

export default PeelingTable;