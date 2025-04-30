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

const PeelingTable = () => {
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
    const [hidetodate, sethidetoDate] = useState<string>('');
    const currDate = new Date().toLocaleDateString();
    const [origin, setOrigin] = useState<string>("")
    const [blockpagen, setblockpagen] = useState('flex')
    const [EditData, setEditData] = useState<PeelingData[]>([])
    const [blConNo, setBlConNo] = useState<string>("")
    const { editPeelingLotWiseData } = useContext(Context);
    const [Data, setData] = useState<PeelingData[]>([])
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
        const response = await axios.put('/api/peeling/peelingprimarysearch', {
            searchitem: blConNo,
            fromDate: fromdate,
            toDate: todate,
            origin: origin,
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
                Total_Input:formatNumber(item.TotalInput),
                Pressure:formatNumber(item.pressure),
                Moisture:item.moisture ,
                Peeling_Time:item.peelingTime,
                Unpeel_Piece:formatNumber(item.UnpeelPiece),
                WholesPeel_Or_WholesJB: formatNumber(item.WholesPeel),
                WholesUnpeel_Or_LW:formatNumber(item.WholesUnpeel),
                DP: formatNumber(item.DP),
                DS: formatNumber(item.DS),
                DP1:formatNumber(item.DP1),
                JJH: formatNumber(item.JJH),
                SJH: formatNumber(item.SJH),
                SJH1:formatNumber(item.SJH1),
                JK_K:formatNumber(item.JK_K),
                SP1:formatNumber(item.SP1),
               JH1:formatNumber(item.JH1),
               Husk:formatNumber(item.Husk),
               Rejection: formatNumber(item.Rejection),
               Big_Taiho: formatNumber(item.Big_Taiho),
                Mc_on: handleAMPM(item.Mc_on.slice(0, 5)),
                Mc_off: handleAMPM(item.Mc_off.slice(0, 5)),
                Mc_breakdown: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),         
                otherTime: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),
                Mc_runTime: item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, ''),
                noOfOperators:item.noOfOperators,
                noOfOperators_Day:item.noOfdayOperators,
                noOfOperators_Night:item.noOfnightOperators,
                noOfOperators_Husk:item.noOfhuskOperators,
                NoOfTrolley: item.NoOfTrolley,
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
                Total_Input:formatNumber(item.TotalInput),
                Pressure:formatNumber(item.pressure),
                Moisture:item.moisture ,
                Peeling_Time:item.peelingTime,
                Unpeel_Piece:formatNumber(item.UnpeelPiece),
                WholesPeel_Or_WholesJB: formatNumber(item.WholesPeel),
                WholesUnpeel_Or_LW:formatNumber(item.WholesUnpeel),
                DP: formatNumber(item.DP),
                DS: formatNumber(item.DS),
                DP1:formatNumber(item.DP1),
                JJH: formatNumber(item.JJH),
                SJH: formatNumber(item.SJH),
                SJH1:formatNumber(item.SJH1),
                JK_K:formatNumber(item.JK_K),
                SP1:formatNumber(item.SP1),
               JH1:formatNumber(item.JH1),
               Husk:formatNumber(item.Husk),
               Rejection: formatNumber(item.Rejection),
               Big_Taiho: formatNumber(item.Big_Taiho),
                Mc_on: handleAMPM(item.Mc_on.slice(0, 5)),
                Mc_off: handleAMPM(item.Mc_off.slice(0, 5)),
                Mc_breakdown: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),         
                otherTime: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),
                Mc_runTime: item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, ''),
                noOfOperators:item.noOfOperators,
                noOfOperators_Day:item.noOfdayOperators,
                noOfOperators_Night:item.noOfnightOperators,
                noOfOperators_Husk:item.noOfhuskOperators,
                NoOfTrolley: item.NoOfTrolley,
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
    const handleSearch = async () => {

        setEditData([])
        setblockpagen('flex')
        const response = await axios.put('/api/peeling/peelingprimarysearch', {
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
        if (editPeelingLotWiseData.length > 0) {
            //console.log(editPendingData)
            setEditData(editPeelingLotWiseData)
            setblockpagen('none')
        }

    },[editPeelingLotWiseData])
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
                {checkpending('Humidifier') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}
                <Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">


                        <TableHead className="text-center" >Id</TableHead>
                        <TableHead className="text-center" >Item_Lot_No</TableHead>
                        <TableHead className="text-center" >Origin</TableHead>
                        <TableHead className="text-center" >Peeling_Date</TableHead>
                       
                       
                        <TableHead className="text-center" >Pressure</TableHead>
                        <TableHead className="text-center " >Moisture(Min-Max)</TableHead>
                        <TableHead className="text-center" >Peeling_Time</TableHead>
                        <TableHead className="text-center" >No_Of_Trolley</TableHead>
                        <TableHead className="text-center ">Total_Input(Kg)</TableHead>
                        <TableHead className="text-center" >Pieces Unpeel</TableHead>
                        <TableHead className="text-center" >Wholes Peel</TableHead>
                        <TableHead className="text-center" >Wholes UnPeel</TableHead>
                       
                        <TableHead className="text-center" >DP</TableHead>
                        <TableHead className="text-center" >DS</TableHead>
                        <TableHead className="text-center" >DP1</TableHead>
                        <TableHead className="text-center" >JJH</TableHead>
                        <TableHead className="text-center" >SJH</TableHead>
                        <TableHead className="text-center" >SJH1</TableHead>
                        <TableHead className="text-center" >JK/K</TableHead>
                        <TableHead className="text-center" >SP1</TableHead>
                        <TableHead className="text-center" >JH1</TableHead>
                        <TableHead className="text-center" >Husk</TableHead>
                        <TableHead className="text-center" >Rejection</TableHead>
                        <TableHead className="text-center" >Big_Taiho</TableHead>
                        <TableHead className="text-center font-bold" >Total_Issue(Kg)</TableHead>
                        <TableHead className="text-center font-bold" >Total_Backlog</TableHead>
                        <TableHead className="text-center" >Peeling_ON</TableHead>
                        <TableHead className="text-center" >Peeling_OFF</TableHead>
                        
                        <TableHead className="text-center" >Breakdown Duration</TableHead>
                        <TableHead className="text-center" >Other Duration</TableHead>
                        <TableHead className="text-center" >Run Duration</TableHead>
                        <TableHead className="text-center" >No Of Operator</TableHead>
                        <TableHead className="text-center" >Operator (Day)</TableHead>
                        <TableHead className="text-center" >Operator (Night)</TableHead>
                        <TableHead className="text-center" >Operator (Husk)</TableHead>
                        <TableHead className="text-center" >Edit Status </TableHead>
                        <TableHead className="text-center" >Created By </TableHead>
                        <TableHead className="text-center" >Action</TableHead>
                    </TableHeader>
                    <TableBody>


                        {EditData.length > 0 ? (EditData.map((item: PeelingData, idx) => {

                            return (
                                <TableRow key={item.id}>
                                <TableCell className="text-center">{idx + 1}</TableCell>
                                <TableCell className="text-center font-bold text-orange-500">{item.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-500">{item.origin}</TableCell>
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                      
                                       
                                        <TableCell className="text-center">{formatNumber(item.pressure)} </TableCell>
                                        <TableCell className="text-center ">{item.moisture} %</TableCell>
                                        <TableCell className="text-center  ">{item.peelingTime} </TableCell>
                                      
                                        <TableCell className="text-center">{item.NoOfTrolley} </TableCell>
                                        <TableCell className="text-center font-bold bg-green-500 text-white">{formatNumber(item.TotalInput)}</TableCell>
                                        <TableCell className="text-center bg-red-100">{formatNumber(item.UnpeelPiece)}</TableCell>
                                        <TableCell className="text-center bg-green-100">{formatNumber(item.WholesPeel)}</TableCell>
                                        <TableCell className="text-center bg-green-100">{formatNumber(item.WholesUnpeel)}</TableCell>
                                        
                                        <TableCell className="text-center bg-yellow-100">{formatNumber(item.DP)}</TableCell>
                                        <TableCell className="text-center bg-yellow-100">{formatNumber(item.DS)}</TableCell>
                                        <TableCell className="text-center bg-yellow-100">{formatNumber(item.DP1)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.JJH)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.SJH)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.SJH1)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.JK_K)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.SP1)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.JH1)}</TableCell>
                                        <TableCell className="text-center bg-yellow-100">{formatNumber(item.Husk)}</TableCell>
                                        <TableCell className="text-center bg-green-100">{formatNumber(item.Rejection)}</TableCell>
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

                            Data.length > 0 ? (Data.map((item: PeelingData, idx) => {
                             
                              
                      

                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                        <TableCell className="text-center font-bold text-orange-500">{item.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-500">{item.origin}</TableCell>
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                      
                                       
                                        <TableCell className="text-center">{formatNumber(item.pressure)} psi </TableCell>
                                        <TableCell className="text-center ">{item.moisture} %</TableCell>
                                        <TableCell className="text-center  ">{item.peelingTime} </TableCell>
                                      
                                        <TableCell className="text-center">{item.NoOfTrolley} </TableCell>
                                        <TableCell className="text-center font-bold bg-green-500 text-white">{formatNumber(item.TotalInput)} </TableCell>
                                        <TableCell className="text-center bg-red-100">{formatNumber(item.UnpeelPiece)}</TableCell>
                                        <TableCell className="text-center bg-green-100">{formatNumber(item.WholesPeel)}</TableCell>
                                        <TableCell className="text-center bg-green-100">{formatNumber(item.WholesUnpeel)}</TableCell>
                                        
                                        <TableCell className="text-center bg-yellow-100">{formatNumber(item.DP)}</TableCell>
                                        <TableCell className="text-center bg-yellow-100">{formatNumber(item.DS)}</TableCell>
                                        <TableCell className="text-center bg-yellow-100">{formatNumber(item.DP1)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.JJH)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.SJH)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.SJH1)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.JK_K)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.SP1)}</TableCell>
                                        <TableCell className="text-center bg-cyan-100">{formatNumber(item.JH1)}</TableCell>
                                        <TableCell className="text-center bg-yellow-100">{formatNumber(item.Husk)}</TableCell>
                                        <TableCell className="text-center bg-green-100">{formatNumber(item.Rejection)}</TableCell>
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
                                        <TableCell className="text-center">{item.editStatus}</TableCell>
                                        <TableCell className="text-center">{item.CreatedBy}</TableCell>

                                        <TableCell className="text-center">
                                            <Popover>
                                                <PopoverTrigger>
                                                    <button className={`p-2 text-white rounded ${item.editStatus === 'Pending' ? 'bg-cyan-200' : 'bg-cyan-500'}`} disabled={item.editStatus === 'Pending' ? true : false}>Action</button>
                                                </PopoverTrigger>
                                                <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                                    <Dialog>
                                                        <DialogTrigger className="flex"><CiEdit size={20} />
                                                            <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Modify</button>
                                                        </DialogTrigger>
                                                        <DialogContent  className="max-w-3xl">
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className='text-1xl pb-1 text-center mt-1'>Peeling Entry Modification</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <PeelingModify data={item} />
                                                        </DialogContent>
                                                    </Dialog>
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

export default PeelingTable;