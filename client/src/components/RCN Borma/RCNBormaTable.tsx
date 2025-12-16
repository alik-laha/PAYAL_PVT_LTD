import { useContext, useEffect, useState } from "react";
import { Origin, pagelimit, pageNo, pendingCheckRole } from "../common/exportData";
import Context from "../context/context";
import axios from "axios";
import { BormaData, BormaExcelData, pendingCheckRoles, PermissionRole } from "@/type/type";
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
import BormaModify from "./RCNBormaModify";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const BormaTable = (props:any) => {
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
//    const [hidetodate, sethidetoDate] = useState<string>('');
    const currDate = new Date().toLocaleDateString();
    const [origin, setOrigin] = useState<string>("")
    const [blockpagen, setblockpagen] = useState('flex')
    const [EditData, setEditData] = useState<BormaData[]>([])
    const [blConNo, setBlConNo] = useState<string>("")
    const { editBormaLotWiseData } = useContext(Context);
    const [Data, setData] = useState<BormaData[]>([])
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
        const response = await axios.put('/api/borma/bormaprimarysearch', {
            searchitem: blConNo,
            fromDate: fromdate,
            toDate: todate,
            origin: origin,
        })
        const data1 = await response.data

        let ws
        let transformed: BormaExcelData[] = [];
        if (EditData.length > 0) {

            transformed = EditData.map((item: BormaData, idx: number) => ({
                SL_No: idx + 1,
                LotNo: item.LotNo,
                date: handletimezone(item.date),
                origin: item.origin,
                InputWholes: Number(item.InputWholes) ||0,
                InputPieces: Number(item.InputPieces) ||0,
                TotalInput: Number(item.TotalInput) ||0,
                Mc_on: handleAMPM(item.Mc_on.slice(0, 5)),
                Mc_off: handleAMPM(item.Mc_off.slice(0, 5)),
                Mc_breakdown: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),         
                otherTime: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),
                Mc_runTime: item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, ''),
                noOfOperators:  Number(item.noOfOperators) || 0,
                NoOfTrolley: item.NoOfTrolley,
                InputMoisture: formatNumber(item.InputMoisture),   
                OutputMoisture: formatNumber(item.OutputMoisture),   
                OutputWholes:Number(item.OutputWholes) ||0,   
                OutputPieces: Number(item.OutputPieces) ||0,   
                TotalOutput: Number(item.TotalOutput) ||0,   
                BormaLoss: Number(item.BormaLoss),    
                Temp:item.Temp,
                CreatedBy: item.CreatedBy,
                editStatus: item.editStatus,
                modifiedBy: item.modifiedBy
            }));
            //setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else {
            transformed = data1.rcnEntries.map((item: BormaData, idx: number) => ({
                SL_No: idx + 1,
                LotNo: item.LotNo,
                date: handletimezone(item.date),
                origin: item.origin,
                InputWholes: Number(item.InputWholes) ||0,
                InputPieces: Number(item.InputPieces) ||0,
                TotalInput: Number(item.TotalInput) ||0,
                Mc_on: handleAMPM(item.Mc_on.slice(0, 5)),
                Mc_off: handleAMPM(item.Mc_off.slice(0, 5)),
                Mc_breakdown: item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),         
                otherTime: item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1'),
                Mc_runTime: item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, ''),
                noOfOperators:  Number(item.noOfOperators) || 0,
                NoOfTrolley: item.NoOfTrolley,
                InputMoisture: formatNumber(item.InputMoisture),   
                OutputMoisture: formatNumber(item.OutputMoisture),   
                OutputWholes:Number(item.OutputWholes) ||0,   
                OutputPieces: Number(item.OutputPieces) ||0,   
                TotalOutput: Number(item.TotalOutput) ||0,   
                BormaLoss: formatNumber(item.BormaLoss),       
                Temp:item.Temp,
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
        saveAs(blob, 'Borma_Entry_' + currDate + '.xlsx');
    }
    const handleSearch = async () => {

        setEditData([])
        setblockpagen('flex')
        const response = await axios.put('/api/borma/bormaprimarysearch', {
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
        if (editBormaLotWiseData.length > 0) {
            //console.log(editPendingData)
            setEditData(editBormaLotWiseData)
              if(props.props==='edit'){
                setblockpagen('none')
            }
        }

    },[editBormaLotWiseData, props.props])
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
    const handleApprove = async (item: BormaData) => {
        const response = await axios.put(`/api/borma/approveeditBorma/${item.id}`)
        const data = await response.data
        if (data.message === "Edit Request of Borma Entry is Approved Successfully") {

            if (approvesuccessdialog != null) {
                (approvesuccessdialog as any).showModal();
            }
        }
    }
    const handleRejection = async (item: BormaData) => {
        const response = await axios.delete(`/api/borma/rejectededitBorma/${item.id}`)
        const data = await response.data
        console.log(data)
        if (data.message === "Borma Entry rejected successfully") {
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-5 gap-4 items-end">

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
                {props.props==='edit' && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}
                <Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">


                        <TableHead className="text-center" >Id</TableHead>
                       <TableHead className="text-center" >Action</TableHead>
                        <TableHead className="text-center" >Item⠀Lot_No</TableHead>
                        <TableHead className="text-center" >Origin</TableHead>
                        <TableHead className="text-center" >Borma⠀Date</TableHead>
                        <TableHead className="text-center" >Temperature</TableHead>
                        <TableHead className="text-center" >Moisture⠀(Input)</TableHead> 
                        <TableHead className="text-center" >Moisture⠀(Output)</TableHead>
                       
                        <TableHead className="text-center " >Total⠀Input⠀(Kg)</TableHead>
                    
                      
                        <TableHead className="text-center" >Input⠀Wholes⠀(Kg)</TableHead>
                        <TableHead className="text-center" >Input⠀Pieces⠀(Kg)</TableHead>
                       <TableHead className="text-center " >Total⠀Output⠀(Kg)</TableHead>
                        <TableHead className="text-center" >Output⠀Wholes⠀(Kg)</TableHead>
                        <TableHead className="text-center" >Output⠀Pieces⠀(Kg)</TableHead>
                        
                        <TableHead className="text-center" >Borma⠀Loss</TableHead>
                        <TableHead className="text-center" >No⠀Of⠀Trolley</TableHead>
                        <TableHead className="text-center" >Borma⠀MC⠀ON</TableHead>
                        <TableHead className="text-center" >Borma⠀MC⠀OFF</TableHead>
                        
                        <TableHead className="text-center" >Breakdown</TableHead>
                        <TableHead className="text-center" >Other</TableHead>
                        <TableHead className="text-center" >MC⠀Run⠀Duration</TableHead>
                        <TableHead className="text-center" >No⠀Of⠀Operator</TableHead>
                        <TableHead className="text-center" >Edit⠀Status </TableHead>
                        <TableHead className="text-center" >Created⠀By </TableHead>
                   
                    </TableHeader>
                    <TableBody>


                        {EditData.length > 0 && props.props==='edit' ? (EditData.map((item: BormaData, idx) => {

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
                                <TableCell className="text-center font-bold text-orange-500">{item.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-500">{item.origin}</TableCell>
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>

                                        <TableCell className="text-center">{formatNumber(item.Temp)} C</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.InputMoisture)} %</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.OutputMoisture)} %</TableCell>
                                        <TableCell className="text-center bg-green-100 font-semibold">{formatNumber(item.TotalInput)} Kg</TableCell>

                                        <TableCell className="text-center bg-yellow-100">{formatNumber(item.InputWholes)} Kg</TableCell>
                                        <TableCell className="text-center bg-yellow-100">{formatNumber(item.InputPieces)} Kg</TableCell>
                                        <TableCell className="text-center bg-green-100 font-semibold">{formatNumber(item.TotalOutput)} Kg</TableCell>
                                       
                                        <TableCell className="text-center bg-red-100">{formatNumber(item.OutputWholes)} Kg</TableCell>
                                        <TableCell className="text-center bg-red-100">{formatNumber(item.OutputPieces)} Kg</TableCell>
                                        

                                        <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(item.BormaLoss)} %</TableCell>
                                        <TableCell className="text-center">{item.NoOfTrolley} </TableCell>
                                        <TableCell className="text-center">{handleAMPM(item.Mc_on.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center">{item.noOfOperators}</TableCell>

                                        <TableCell className="text-center">{item.editStatus}</TableCell>
                                        <TableCell className="text-center">{item.CreatedBy}</TableCell>
                             
                                </TableRow>
                            ) })): (

                            Data.length > 0 ? (Data.map((item: BormaData, idx) => {


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
                                                        <DialogContent className="max-w-5xl ">
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>Borma Entry Modification</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <BormaModify data={item} />
                                                        </DialogContent>
                                                    </Dialog>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                        <TableCell className="text-center font-bold text-orange-500">{item.LotNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-500">{item.origin}</TableCell>
                                        <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>

                                        
                                       
                                        
                                        <TableCell className="text-center">{formatNumber(item.Temp)} C</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.InputMoisture)} %</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.OutputMoisture)} %</TableCell>
                                        <TableCell className="text-center text-green-600 font-semibold">{formatNumber(item.TotalInput)} Kg</TableCell>

                                        <TableCell className="text-center ">{formatNumber(item.InputWholes)} Kg</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.InputPieces)} Kg</TableCell>
                                        
                                        <TableCell className="text-center text-red-600 font-semibold">{formatNumber(item.TotalOutput)} Kg</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.OutputWholes)} Kg</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.OutputPieces)} Kg</TableCell>
                                       

                                        <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(item.BormaLoss)} %</TableCell>
                                        <TableCell className="text-center">{item.NoOfTrolley} </TableCell>
                                        <TableCell className="text-center">{handleAMPM(item.Mc_on.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{handleAMPM(item.Mc_off.slice(0, 5))}</TableCell>
                            <TableCell className="text-center">{item.Mc_breakdown.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center">{item.otherTime.slice(0, 5).replace(/00:00/g, '0').replace(/:00/g, '').replace(/00:/g, '0:').replace(/^0(\d)$/, '$1')} hr</TableCell>
                            <TableCell className="text-center text-red-500 font-semibold">{item.Mc_runTime.slice(0, 5).replace(/00:00:00/g, '0').replace(/:00/g, '').replace(/^0/, '')} hr</TableCell>
                            <TableCell className="text-center">{item.noOfOperators}</TableCell>

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

export default BormaTable;