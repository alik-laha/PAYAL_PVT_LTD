import axios from "axios";
import { Origin, pagelimit, pageNo, pendingCheckRole } from "../common/exportData";
import { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import {  CashewOutEntryData, findskutypeData, pendingCheckRoles, PermissionRole } from "@/type/type";
import { format, toZonedTime } from 'date-fns-tz'
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
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
import Context from "../context/context";
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
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CiEdit } from "react-icons/ci";
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
import { FcApprove, FcDisapprove } from "react-icons/fc";
// import AlmondModify from "./AlmondModify";

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { ScrollArea } from "../ui/scroll-area";
import CashewOutModify from "./cashewOutModify";
// import AgarbatiModify from "./AgarbatiModify";


const CashewOutTable = () => {
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
    //const [hidetodate, sethidetoDate] = useState<string>('');
    const [blConNo, setBlConNo] = useState<string>("")
    const currDate = new Date().toLocaleDateString();
    const [origin, setOrigin] = useState<string>("")

    const [Data, setData] = useState<any[]>([])

    
    const [EditData, setEditData] = useState<CashewOutEntryData[]>([])
    const { editPendingCashewOutData } = useContext(Context);
    const [blockpagen, setblockpagen] = useState('flex')

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

    const handleSearch = async () => {
        
        setEditData([])
        setblockpagen('flex')
        const response = await axios.put('/api/cashewOut/CashewOutprimarysearch', {
            searchitem: blConNo,
            fromDate: fromdate,
            toDate: todate,
            origin: origin,
            grade: gradeN

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
        if (editPendingCashewOutData.length > 0) {
            //console.log(editPendingData)
            setEditData(editPendingCashewOutData)
            setblockpagen('none')
        }
    }, [editPendingCashewOutData])

    const [gradeN, setGradeN] = useState<string>()
    const [grade, setGrade] = useState<findskutypeData[]>([])
    const [gradeview, setGradeView] = useState("none")
    const [gradeData, setGradeData] = useState<any[]>([])

    useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Final Grade', { section: 'Packing' })
            .then(res => {
                //console.log(res.data)
                setGrade(res.data)
                console.log(grade)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleGradechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //setSku(e.target.value)
        setGradeN(e.target.value)

        if (e.target.value.length > 0 && gradeData.length > 0) {
            setGradeView("block")
        } else {
            setGradeView("none")
        }
        axios.post("/api/vendorSKU/skudatafind/Packing", { sku: e.target.value, type: 'Final Grade' })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    setGradeData(res.data.skuData)
                }
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setGradeData([])
                }
            })

    }
    const handleGradeidClick = (item: any) => {
        // setSku(item.sku)
        setGradeN(item.sku)
        setGradeView("none")
    }

    const handleRejection = async (item: CashewOutEntryData) => {
        const response = await axios.delete(`/api/cashewOut/rejectededitCashewOut/${item.id}`)
        const data = await response.data
        console.log(data)
        if (data.message === "Cashew Out Entry rejected successfully") {
            //console.log('rejected enter')
            if (rejectsuccessdialog != null) {
                (rejectsuccessdialog as any).showModal();
            }
        }
    }

    const exportToExcel = async () => {
        const response = await axios.put('/api/cashewOut/CashewOutprimarysearch', {
            searchitem: blConNo,
            fromDate: fromdate,
            toDate: todate,
            origin: origin,
            grade: gradeN
        })
        const data1 = await response.data

        let ws
        let transformed: any[] = [];
        if (EditData.length > 0) {

            transformed = EditData.map((item: any, idx: number) => ({
                id: idx + 1,
                GatePassNo: item.gatePassNo,
                Receiving_date: handletimezone(item.date),
                Vehicle_No: item.truckNo,
                Gross_Wt: formatNumber(item.grossWt),
                Invoice_No: item.invoice,
                BatchID:item.batchNo,
                PartyName:item.partyName,
                Origin:item.origin,
                Grade:item.gradeName,
                NetWeight:item.netWeight ? formatNumber(item.netWeight) : '',
                Pouch_Packet:formatNumber(item.noOfBags),
                Map_Wt:formatNumber(item.quantity),
                Actual_Pouch_Packet:formatNumber(item.noOfActualBags),
                Actual_Map_Wt:formatNumber(item.actualquantity),
                editStatus:item.editStatus,createdBy:item.createdBy,ApprovedBy:item.approvedBy
    
            }));
            //setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else {
            transformed = data1.rcnEntries.map((item: any, idx: number) => ({
                  id: idx + 1,
                GatePassNo: item.gatePassNo,
                Receiving_date: handletimezone(item.date),
                Vehicle_No: item.truckNo,
                Gross_Wt: formatNumber(item.grossWt),
                Invoice_No: item.invoice,
                BatchID:item.batchNo,
                PartyName:item.partyName,
                Origin:item.origin,
                Grade:item.gradeName,
                NetWeight:item.netWeight ? formatNumber(item.netWeight) : '',
                Pouch_Packet:formatNumber(item.noOfBags),
                Map_Wt:formatNumber(item.quantity),
                Actual_Pouch_Packet:formatNumber(item.noOfActualBags),
                Actual_Map_Wt:formatNumber(item.actualquantity),
                editStatus:item.editStatus,createdBy:item.createdBy,ApprovedBy:item.approvedBy
            }));
            // setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'Cashew_Out_Entry_' + currDate + '.xlsx');


    }
    const handleApprove = async (item: CashewOutEntryData) => {
        const response = await axios.put(`/api/cashewOut/approveeditCashewOut/${item.id}`)
        const data = await response.data
        if (data.message === "Edit Request of Cashew Out Entry is Approved Successfully") {

            if (approvesuccessdialog != null) {
                (approvesuccessdialog as any).showModal();
            }
        }
    }
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
    

    return (
        <>
            <div className="mx-2 mt-5 ">
                
                <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-end">

                        {/* GatePass No */}
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                GatePass No.
                            </label>
                            <Input
                                className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150"
                                placeholder="Enter GatePass No."
                                value={blConNo}
                                onChange={(e) => setBlConNo(e.target.value)}
                            />
                        </div>

                         {/* Final Grade (with dropdown) */}
                        <div className="flex flex-col gap-1 relative ">
                            <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                Final Grade
                            </label>
                            <Input
                                className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150 dark:text-gray-200"
                                value={gradeN}
                                placeholder="Search..."
                                onChange={(e) => handleGradechange(e)}
                                required
                            />
                            <ScrollArea
                                className="absolute z-20 w-full max-h-24 rounded-md border border-gray-200 dark:border-gray-700 dark:bg-gray-900 bg-white shadow-lg transition-all duration-200 overflow-scroll  
                                                dropdown-content"
                                style={{ display: gradeview }}
                            >
                                {gradeData.map((item: any) => (
                                    <div
                                        key={item.id}
                                        className="gap-y-10 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                                        onClick={() => handleGradeidClick(item)}
                                    >
                                        <p className="ml-2 font-medium text-left text-xs text-blue-900 py-1 hover:font-semibold">{item.sku}</p>
                                    </div>
                                ))}
                            </ScrollArea>
                        </div>

                        

                        {/* From Date */}
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                From
                            </label>
                            <Input
                                type="date"
                                className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150 dark:text-gray-200"
                                value={fromdate}
                                onChange={(e) => setfromDate(e.target.value)}
                            />
                        </div>

                        {/* To Date */}
                        <div className="flex flex-col gap-1">
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

                        {/* Type Dropdown */}
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                Type
                            </label>
                            <select
                                className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 pr-8 appearance-none"
                                onChange={(e) => setOrigin(e.target.value)}
                                value={origin}
                            >
                                <option value="">Type (All)</option>
                                {Origin.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                       

                        {/* Buttons */}
                        <div className="flex flex-wrap justify-end sm:justify-start gap-3 mt-2 md:mt-0 ">
                            <Button
                                className="flex w-40 items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                onClick={handleSearch}
                            >
                                <FaSearch size={14} />
                                Search
                            </Button>

                            {checkpending('RCNPrimary') && (
                                <Button
                                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                    onClick={exportToExcel}
                                >
                                    <LuDownload size={16} />
                                    
                                </Button>
                            )}
                        </div>

                    </div>
                </div>

                {/* {checkpending('RCNPrimary') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>} */}
                <Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">


                        <TableHead className="text-center" >Id</TableHead>
                        <TableHead className="text-center" >GatePass_No</TableHead>
                        <TableHead className="text-center" >Receiving_Date</TableHead>
                        <TableHead className="text-center" >Enrty_Vehicle_No</TableHead>
                        <TableHead className="text-center" >Initial_Weight(Kg)</TableHead>
                        <TableHead className="text-center" >Final_Cashew_Invoice_No</TableHead>
                        <TableHead className="text-center" >Item_Batch_No</TableHead>
                        <TableHead className="text-center" >Sales_PartyName</TableHead>
                        <TableHead className="text-center" >Sale_Origin</TableHead>
                        <TableHead className="text-center" >Final_Grade_Name</TableHead>
                        <TableHead className="text-center" >Net_Weight(Kg)</TableHead>
                        <TableHead className="text-center" >Count (Pouch/Bucket) </TableHead>
                        <TableHead className="text-center" >Mapping Weight(Kg)</TableHead>
                        <TableHead className="text-center" >Actual Count (Pouch/Bucket)</TableHead>
                        <TableHead className="text-center" >Actual_Weight(Kg)</TableHead>
                        <TableHead className="text-center" >Edit Status </TableHead>
                        <TableHead className="text-center" >Created By </TableHead>
                        <TableHead className="text-center" >Action</TableHead>
                    </TableHeader>

                    <TableBody>


                        {EditData.length > 0 ? (EditData.map((item: CashewOutEntryData, idx) => {

                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">{idx + 1}</TableCell>
                                    <TableCell className="text-center font-bold">{item.gatePassNo}</TableCell>

                                    <TableCell className="text-center">{handletimezone(item.date)}</TableCell>

                                    <TableCell className="text-center">{item.truckNo}</TableCell>
                                    <TableCell className="text-center">{formatNumber(item.grossWt)} </TableCell>
                                    <TableCell className="text-center">{item.invoice}</TableCell>
                                    <TableCell className="text-center" >{item.batchNo}</TableCell>
                                    <TableCell className="text-center">{item.partyName}</TableCell>
                                    <TableCell className="text-center">{item.origin}</TableCell>
                                    <TableCell className="text-center">{item.gradeName}</TableCell>
                                    <TableCell className="text-center" >{item.netWeight ?formatNumber(item.netWeight):''}</TableCell>
                                    <TableCell className="text-center" >{formatNumber(item.noOfBags)}</TableCell>
                                    <TableCell className="text-center" >{formatNumber(item.quantity)}</TableCell>
                                    <TableCell className="text-center" >{formatNumber(item.noOfActualBags)}</TableCell>
                                    <TableCell className="text-center" >{formatNumber(item.actualquantity)}</TableCell>

                          
                               
                                <TableCell className="text-center">{item.editStatus}</TableCell>
                                  <TableCell className="text-center">{item.createdBy}</TableCell>
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

                            Data.length > 0 ? (Data.map((item: CashewOutEntryData, idx) => {


                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                        <TableCell className="text-center font-bold text-red-500">{item.gatePassNo}</TableCell>

                                        <TableCell className="text-center font-semibold text-cyan-500">{handletimezone(item.date)}</TableCell>

                                        <TableCell className="text-center">{item.truckNo}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.grossWt)} </TableCell>
                                        <TableCell className="text-center">{item.invoice}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-500" >{item.batchNo}</TableCell>
                                        <TableCell className="text-center">{item.partyName}</TableCell>
                                        <TableCell className="text-center">{item.origin}</TableCell>
                                        <TableCell className="text-center">{item.gradeName}</TableCell>
                                        <TableCell className="text-center" >{item.netWeight ? formatNumber(item.netWeight) : ''}</TableCell>
                                        <TableCell className="text-center font-bold text-green-600"  >{formatNumber(item.noOfBags)}</TableCell>
                                        <TableCell className="text-center font-bold text-green-500" >{formatNumber(item.quantity)}</TableCell>
                                        <TableCell className="text-center font-bold text-red-500" >{formatNumber(item.noOfActualBags)}</TableCell>
                                        <TableCell className="text-center font-bold text-red-500" >{formatNumber(item.actualquantity)}</TableCell>
                                        <TableCell className="text-center">{item.editStatus}</TableCell>
                                         <TableCell className="text-center">{item.createdBy}</TableCell>
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
                                                        <DialogContent className="max-w-5xl">
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>Cashew Out Entry Modification</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <CashewOutModify data={item} />
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

export default CashewOutTable