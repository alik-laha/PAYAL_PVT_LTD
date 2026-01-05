import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format, toZonedTime } from 'date-fns-tz'
import { useEffect, useState } from "react";
import { OrderStatusAll, Origin, pagelimit, pageNo, pendingCheckRole, } from "../common/exportData";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
    AlertDialogDescription,

    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import { FcApproval, FcApprove, FcCancel, FcDeleteDatabase, FcDisapprove, FcEditImage } from "react-icons/fc";
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { CiEdit } from "react-icons/ci";
import OrderReMappingCreateForm from "./OrderReMappingCreateForm";
import { Progress } from "@/components/ui/progress";
import OrderModify from "./OrderModify";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { LuDownload } from "react-icons/lu";
import { pendingCheckRoles, PermissionRole } from "@/type/type";
import PackingCreateForm from "./orderPAckingForm";
import { SiTicktick } from "react-icons/si";
import { MdOutlinePendingActions } from "react-icons/md";
//import { pendingCheckRoles, PermissionRole } from "@/type/type";
//import { LuDownload } from "react-icons/lu";

const ProdTransacTable = () => {
    const Role = localStorage.getItem('role') as keyof PermissionRole
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [blConNo, setBlConNo] = useState<string>("")
    const [blockpagen, setblockpagen] = useState('flex')
    const [searchType, setsearchType] = useState(Role === 'PackingSupervisor' ? 'Packing' : 'Order')
    const [searchTableType, setsearchtableType] = useState(Role === 'PackingSupervisor' ? 'Packing' : 'Order')
    const [searchMapTableType, setsearchMaptableType] = useState('Overall')
    const [Data, setData] = useState<any[]>([])
    const [origin, setOrigin] = useState<string>("")
    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
   // const [hidetodate, sethidetoDate] = useState<string>('');
    const [sectionstatus, setSectionstatus] = useState<string>("")
    const [mapsectionstatus, setMapsectionstatus] = useState<string>("Overall")

    const dropdown = Role === 'PackingSupervisor' ? ['Packing'] : ['Order', 'Mapping', 'Packing'];
    const mapdropdown = ['Overall', 'LineWise']
     const successdialog = document.getElementById('machinescs') as HTMLInputElement;
      const errordialog = document.getElementById('machineerror') as HTMLInputElement;
      // const dialog = document.getElementById('myDialog');
      const closeDialogButton = document.getElementById('machinescsbtn') as HTMLInputElement;
      const errorcloseDialogButton = document.getElementById('machineerrorbtn') as HTMLInputElement;
      const [errortext, setErrorText] = useState<string>("")
      const currDate = new Date().toLocaleDateString();
      if (closeDialogButton) {
        closeDialogButton.addEventListener('click', () => {
          if (successdialog != null) {
            (successdialog as any).close();
            window.location.reload()
          }
    
    
        });
      }
      if (errorcloseDialogButton) {
        errorcloseDialogButton.addEventListener('click', () => {
          if (errordialog != null) {
            (errordialog as any).close();
    
          }
    
        });
      }

    //const currDate = new Date().toLocaleDateString();

    useEffect(() => {
        handleTransactionSearch()
        setPage((prev) => {
            if (prev <= 0) {
                return 1
            }
            return prev
        })
    }, [page])
    

    const handleTransactionSearch = async () => {
        setblockpagen('flex')
        if (searchType === 'Order') {
            const response = await axios.put('/api/packing/orderSearch', {
                origin: origin,
                blConNo: blConNo,
                fromDate: fromdate,
                toDate: todate,
                orderStatus: sectionstatus
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
            setsearchtableType('Order')
        }
        else if (searchType === 'Mapping'){
            if(mapsectionstatus==='LineWise'){
                const response = await axios.put('/api/packing/mappingSearch', {
                    origin: origin,
                    blConNo: blConNo,
                    fromDate: fromdate,
                    toDate: todate,
    
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
                setsearchtableType('Mapping')
                setsearchMaptableType('LineWise')
            }
            else{
                const response = await axios.put('/api/packing/mappingSearchAll', {
                    origin: origin,
                    blConNo: blConNo,
                    fromDate: fromdate,
                    toDate: todate,
    
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
                setsearchtableType('Mapping')
                setsearchMaptableType('Overall')
            }
            
        }
        else{
            const response = await axios.put('/api/packing/packingSearch', {
                origin: origin,
                blConNo: blConNo,
                fromDate: fromdate,
                toDate: todate,

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
            setsearchtableType('Packing')
        }
    }
    const handleTransactionSearchExcel = async () => {
        let ws
        let transformed: any[] = [];

        if (searchType === 'Order') {
            const response = await axios.put('/api/packing/orderSearch', {
                origin: origin,
                blConNo: blConNo,
                fromDate: fromdate,
                toDate: todate,
                orderStatus: sectionstatus

            })
            const data = await response.data
            transformed = data.rcnEntries.map((item: any, idx: number) => ({
                Sl_No: idx + 1,
                Origin: item.origin,
                GradeName: item.gradeName,
                Order_Receive_Date: handletimezone(item.orderDate),
                Order_Invoice_Date: handletimezone(item.orderInvDate),
                Vendor_Name: item.vendorName,
                Broker_Name: item.brokerName,
                Demand_Quantity: `${formatNumber(item.quantity)} Kg`,
                Map_Quantity: `${formatNumber(item.mapquantity)} Kg`,    
                Packed_Quantity: `${formatNumber(item.actualquantity)} Kg`,
                UnitRate: `${item.unitRate} ₹`,
                totalBill: `${item.totalBill} ₹`,
                Gst: item.gst===true? 'Yes':'No',
                CreatedBy: item.createdBy,
                ApprovedBy: item.approvedBy,
                Remarks: item.remarks
            }));
            ws = XLSX.utils.json_to_sheet(transformed);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([wbout], { type: 'application/octet-stream' });
            saveAs(blob, 'Order_Entry_' + currDate + '.xlsx');
        }
        else if (searchType === 'Mapping') {
            if(mapsectionstatus==='LineWise'){
                const response = await axios.put('/api/packing/mappingSearch', {
                    origin: origin,
                    blConNo: blConNo,
                    fromDate: fromdate,
                    toDate: todate,
    
                })
                const data = await response.data
                transformed = data.rcnEntries.map((item: any, idx: number) => ({
                    Sl_No: idx + 1,
                    altid: item.altid=== 1?'Fresh Pack':'Re-Packing',
                    OrderID: item.orderID,
                    Origin: item.origin,
                    FinalGradeName: item.finalgradeName,
                    OrderDate: handletimezone(item.orderDate),
                    MappingDate: handletimezone(item.mappingDate),
                    VendorName: item.vendorName,
                    Production_Section: item.productionSection,
                    LotNo: item.LotNo,
                    Production_Origin: item.productionOrigin,
                    Production_Grade: item.productionGrade,
                    Section_Quantity: `${formatNumber(item.sectionQuantity)} Kg`,
                    Percentage_Mix: item.prcntgMix,
                    Mapped_Quantity: `${formatNumber(item.mappedQuantity)} Kg`,
                    CreatedBy: item.createdBy,
                    ApprovedBy: item.approvedBy,
                    Remarks: item.remarks
                }));
                ws = XLSX.utils.json_to_sheet(transformed);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                const blob = new Blob([wbout], { type: 'application/octet-stream' });
                saveAs(blob, 'Mapping_LineWise_Order_Entry_' + currDate + '.xlsx');
            }
            else{
                const response = await axios.put('/api/packing/mappingSearchAll', {
                    origin: origin,
                    blConNo: blConNo,
                    fromDate: fromdate,
                    toDate: todate,
    
                })
                const data = await response.data
                transformed = data.rcnEntries.map((item: any, idx: number) => ({
                    Sl_No: idx + 1,
                    altid: item.altid=== 1?'Fresh Pack':'Re-Packing',
                    OrderID: item.orderID,
                    Origin: item.origin,
                    FinalGradeName: item.finalgradeName,
                    OrderDate: handletimezone(item.orderDate),
                    MappingDate: handletimezone(item.mappingDate),
                    VendorName: item.vendorName,
                    Mapped_Quantity: `${formatNumber(item.mappedQuantity)} Kg`,
                    CreatedBy: item.createdBy,
                    ApprovedBy: item.approvedBy,
                    Remarks: item.remarks
                }));
                ws = XLSX.utils.json_to_sheet(transformed);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                const blob = new Blob([wbout], { type: 'application/octet-stream' });
                saveAs(blob, 'Mapping_Overall_Order_Entry_' + currDate + '.xlsx');
            }
            
        }
        else{
            const response = await axios.put('/api/packing/packingSearch', {
                origin: origin,
                blConNo: blConNo,
                fromDate: fromdate,
                toDate: todate,

            })
            const data = await response.data
            transformed = data.rcnEntries.map((item: any, idx: number) => ({
                Sl_No: idx + 1,
                orderID: item.orderID,
                altid: item.altid=== 1?'Fresh Packing':'Re-Packing',
                origin: item.origin,
                qualityStatus: item.qualityStatus,
                packingStatus: item.packingStatus === 0 ? 'Pending' : 'Packed',
                dispatchStatus: item.dispatchStatus === 0 ? 'Pending' : 'Dispatched',
                orderDate: handletimezone(item.orderDate),
                FinalgradeName: item.gradeName,
                DemandQuantity: `${formatNumber(item.demandquantity)} Kg`,
                UnitRate: `${item.unitRate} ₹`,
                Gst: item.gst===true? 'Yes':'No',
                totalBill: `${item.totalBill} ₹`,
                vendorName: item.vendorName,
                fulfillQuantity: `${item.fulfillquantity ? formatNumber(item.fulfillquantity) : 0} Kg`,
                mfgDate: item.mfgDate ? handletimezone(item.mfgDate) : item.mfgDate,
                batchID: item.BatchID,
                packingQuantity: item.packingquantity,
                SystemPackingQuantity: item.convpackingquantity
            }));
            ws = XLSX.utils.json_to_sheet(transformed);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([wbout], { type: 'application/octet-stream' });
            saveAs(blob, 'Packing_Final_Entry_' + currDate + '.xlsx');
        }





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
    function formatNumber(num: string) {
        return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
    }
    function handletimezone(date: string | Date) {
        const apidate = new Date(date);
        const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);
        const finaldate = format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
        return finaldate;
    }
    const handleOrderreject = (id: number) => {
       
        axios.post('/api/packing/rejectPurchaseOrder', {id}).then((res) => {
            setErrorText(res.data.message);
            console.log(res.data)
            if (successdialog != null) {
                (successdialog as any).showModal();
            }

            //window.location.reload()
        }).catch((err) => {
            console.log(err)
            setErrorText(err.response.data.message)
            if (errordialog != null) {
                (errordialog as any).showModal();
            }
        })

    }
    const handleOrderClose = (id: number) => {
       
        axios.post('/api/packing/closePurchaseOrder', {id}).then((res) => {
            setErrorText(res.data.message);
            console.log(res.data)
            if (successdialog != null) {
                (successdialog as any).showModal();
            }

            //window.location.reload()
        }).catch((err) => {
            console.log(err)
            setErrorText(err.response.data.message)
            if (errordialog != null) {
                (errordialog as any).showModal();
            }
        })

    }
    const handleOrderCancel = (id: number) => {
       
        axios.post('/api/packing/cancelPurchaseOrder', {id}).then((res) => {
            setErrorText(res.data.message);
            console.log(res.data)
            if (successdialog != null) {
                (successdialog as any).showModal();
            }

            //window.location.reload()
        }).catch((err) => {
            console.log(err)
            setErrorText(err.response.data.message)
            if (errordialog != null) {
                (errordialog as any).showModal();
            }
        })

    }
    const handleOrderApprove = (item: any) => {
       
        axios.post('/api/packing/approvePurchaseOrder', {item}).then((res) => {
            setErrorText(res.data.message);
            console.log(res.data)
            if (successdialog != null) {
                (successdialog as any).showModal();
            }

            //window.location.reload()
        }).catch((err) => {
            console.log(err)
            setErrorText(err.response.data.message)
            if (errordialog != null) {
                (errordialog as any).showModal();
            }
        })

    }
    const handleDeleteMapping = (item: any) => {
       
        axios.post('/api/packing/deleteOrderMapping', {item}).then((res) => {
            setErrorText(res.data.message);
            console.log(res.data)
            if (successdialog != null) {
                (successdialog as any).showModal();
            }

            //window.location.reload()
        }).catch((err) => {
            console.log(err)
            setErrorText(err.response.data.message)
            if (errordialog != null) {
                (errordialog as any).showModal();
            }
        })

    }
    const handleUnpack = (item: any) => {
       
        axios.post('/api/packing/unPackOrder', {item}).then((res) => {
            setErrorText(res.data.message);
            console.log(res.data)
            if (successdialog != null) {
                (successdialog as any).showModal();
            }

            //window.location.reload()
        }).catch((err) => {
            console.log(err)
            setErrorText(err.response.data.message)
            if (errordialog != null) {
                (errordialog as any).showModal();
            }
        })

    }

    
                    const checkpending = (tab: string) => {
                        //console.log(Role)
                        if (pendingCheckRole[tab as keyof pendingCheckRoles].includes(Role)) {
                            return true
                        }
                        else {
                            return false;
                        }
                
                    }

    

    return (
        <>
            <div className="mx-2 mt-5 ">
                <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-7 gap-4 items-end">
                        {/* Type */}
                        <div className="flex flex-col gap-1">
                            {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                            Lot Type
                        </label> */}
                            <select
                                className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150  dark:text-gray-200 appearance-none bg-yellow-100"
                                onChange={(e) => setsearchType(e.target.value)} value={searchType}>
                                value={searchType}


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
                                placeholder="Order ID"
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
                        {/* Order Type */}
                        {searchType === 'Order' && <div className="flex flex-col gap-1">
                            {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                            Origin
                        </label> */}
                            <select
                                className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 appearance-none"
                                onChange={(e) => setSectionstatus(e.target.value)} value={sectionstatus}
                            >
                                <option value=''>Status (All)
                                </option>
                                {
                                    OrderStatusAll.map((item) => {
                                        return (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>}
                        {/* Mapping Type */}
                        {searchType === 'Mapping' && <div className="flex flex-col gap-1">
                            {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                            Origin
                        </label> */}
                            <select
                                className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 appearance-none"
                                onChange={(e) => setMapsectionstatus(e.target.value)} value={mapsectionstatus}
                            >

                                {
                                    mapdropdown.map((item) => {
                                        return (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>}
                            {/* Search & Export Buttons */}
                        <div className="flex flex-wrap justify-end md:justify-between gap-3 mt-2 md:mt-0">
                            <Button
                                className="flex w-36 items-center justify-center gap-2 bg-slate-500 hover:bg-slate-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                onClick={handleTransactionSearch}
                            >
                                <FaSearch size={14} />
                                Search
                            </Button>

                            {checkpending('ProdStockExcel') && (
                                <Button
                                    className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                    onClick={handleTransactionSearchExcel}
                                >
                                    <LuDownload size={16} />

                                </Button>
                            )}
                        </div>
                
                
                </div>
                   
                </div>
                      
               
                {searchTableType === 'Order' ?
                    (<Table className="mt-4">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                            <TableHead className="text-center">Sl⠀No</TableHead>
                            <TableHead className="text-center" >Action</TableHead>
                            <TableHead className="text-center">Generated⠀Sales⠀Order⠀ID</TableHead>
                            <TableHead className="text-center">Order⠀Origin</TableHead>
                            <TableHead className="text-center">Final⠀GradeName</TableHead>
                            <TableHead className="text-center">Approval⠀Status</TableHead>
                            <TableHead className="text-center">Order⠀Receive⠀Date</TableHead>
                            <TableHead className="text-center">Order⠀Entry⠀Date</TableHead>
                            <TableHead className="text-center">Sales⠀Vendor⠀Name</TableHead>
                            <TableHead className="text-center">Sales⠀Broker⠀Name</TableHead>
                            <TableHead className="text-center">Demand⠀Quantity</TableHead>
                            <TableHead className="text-center">Mapped⠀Quantity</TableHead>
                            <TableHead className="text-center">Mapping⠀Backlog</TableHead>
                            <TableHead className="text-center">Mapping⠀Progress⠀(%)</TableHead>
                            <TableHead className="text-center">Packed⠀Quantity</TableHead>
                            <TableHead className="text-center">Packing⠀Backlog</TableHead>
                            <TableHead className="text-center">Packing⠀Progress⠀(%)</TableHead>
                            <TableHead className="text-center">Price⠀UnitRate</TableHead>
                            <TableHead className="text-center">SO⠀Total⠀Amount</TableHead>
                            <TableHead className="text-center">GST</TableHead>
                            <TableHead className="text-center">SO⠀Created⠀By</TableHead>
                            <TableHead className="text-center">Approved/Rejected⠀By</TableHead>
                            <TableHead className="text-center">Order⠀Remarks</TableHead>
                            
                        </TableHeader>
                        <TableBody>
                            {Data.length > 0 ? (Data.map((item: any, idx) => {
                                return (
                                    <TableRow key={item.id} >
                                        <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                        {checkpending('StockUpdate') && <TableCell className="text-center">

                                            {item.ordStatus !== 1 && (item.ordStatus === 1 ?
                                                (<button className="bg-red-500  p-2 text-white rounded opacity-40 " disabled={true}>Closed</button>) :
                                                (<Popover>
                                                    <PopoverTrigger>
                                                        <button className={`p-2 w-20 border font-bold rounded-lg ${
                                                            item.ordApproveStatus === 'Rejected'
                                                         ? 'bg-red-50 text-red-500 border-red-300 ' : 'bg-blue-50 text-blue-500 border-blue-300 '}`} disabled={
                                                            item.ordApproveStatus === 'Rejected' ? true : false}>Action</button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                                        {/* Approve Order */}
                                                        {item.ordMappingStatus!==1 && item.ordApproveStatus === 'Pending' && <AlertDialog>
                                                            <AlertDialogTrigger className="flex">
                                                                <FcApprove size={25} /> <button className="bg-transparent  pl-1 text-left hover:text-green-500" >Approve</button>
                                                            </AlertDialogTrigger>

                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle> Do You want to Approve the Sales Order ?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This will Trigger Mapping of the Sales Order
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>

                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleOrderApprove(item)}>Continue</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>

                                                        </AlertDialog>}

                                                        {/* Reject Order */}
                                                        {item.ordMappingStatus!==1 && item.ordApproveStatus === 'Pending' && <AlertDialog >
                                                            <AlertDialogTrigger className="flex mt-2">
                                                                <FcDisapprove size={25} /> <button className="bg-transparent  pl-1 text-left hover:text-red-500" >Reject</button>
                                                            </AlertDialogTrigger>

                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle> Do You want to Reject the Sales Order ?</AlertDialogTitle>
                                                                    <AlertDialogDescription>

                                                                        This will Reject the Sales Order

                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>

                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleOrderreject(item.id)}>Continue</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>

                                                        </AlertDialog>}

                                                        {/* Modify Order */}
                                                        {item.ordApproveStatus === 'Approved' && item.ordStatus !== 1 &&
                                                            <Dialog>
                                                                <DialogTrigger>
                                                                <div className="flex"><FcEditImage size={25} />  <button className="bg-transparent pl-1 pb-2 rounded-md hover:text-green-500"> Modify Order </button></div></DialogTrigger>
                                                                <DialogContent className='max-w-4xl' style={{ display: 'block' }}>
                                                                    <DialogHeader>
                                                                        <DialogTitle><p className='text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold'>Order Modify</p></DialogTitle>

                                                                    </DialogHeader>

                                                                    <OrderModify mapping={[item]} />
                                                                </DialogContent>
                                                            </Dialog>}

                                                         {/* Re-Mapping Order */}
                                                         {item.ordMappingStatus===1 && item.ordStatus !== 1 &&
                                                            <Dialog>
                                                                <DialogTrigger>
                                                                <div className="flex"><FcApproval size={25} />  <button className="bg-transparent pl-1 rounded-md hover:text-green-500"> Re-Mapping </button></div></DialogTrigger>
                                                                <DialogContent className='max-w-screen' style={{ display: 'block' }}>
                                                                    <DialogHeader>
                                                                        <DialogTitle><p className='text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold'>Order Re-Mapping Entry</p></DialogTitle>

                                                                    </DialogHeader>

                                                                    <OrderReMappingCreateForm mapping={[item]} />
                                                                </DialogContent>
                                                            </Dialog>}


                                                        {/* Close Order */}

                                                        {item.ordStatus !== 1 && item.ordMappingStatus !== 0 && item.ordApproveStatus !== 'Pending' && Number(item.actualquantity) >0 && <AlertDialog >
                                                            <AlertDialogTrigger className="flex mt-2">
                                                            <FcDisapprove size={25} /> <button className="bg-transparent text-1xl pl-1 text-left hover:text-red-500" >Close Order</button>
                                                            </AlertDialogTrigger>

                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle> Do You want to Close the Sales Order ?</AlertDialogTitle>
                                                                    <AlertDialogDescription>

                                                                        This will Complete the Sales Order and stop making further Mapping

                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>

                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleOrderClose(item.id)}>Continue</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>

                                                        </AlertDialog>}

                                                        {/* Cancel Order */}

                                                        {item.ordStatus !== 1 && item.ordApproveStatus !== 'Pending' && <AlertDialog >
                                                            <AlertDialogTrigger className="flex mt-2">
                                                            <FcCancel size={25} />  <button className="pl-1 text-1xl bg-transparent rounded-md hover:text-red-500" >Cancel Order</button>
                                                            </AlertDialogTrigger>

                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle> Do You want to Cancel the Sales Order ?</AlertDialogTitle>
                                                                    <AlertDialogDescription>

                                                                        This will Cancel Sales Order and Delete All Mapping & Packing Entry Associated with it

                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>

                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleOrderCancel(item.id)}>Continue</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>

                                                        </AlertDialog>}


 
                                                    </PopoverContent>

                                                </Popover>))}
                                        </TableCell>}
                                        <TableCell className="text-center font-bold ">{item.orderID}</TableCell>
                                        <TableCell className="text-center text-cyan-500  font-bold">{item.origin}</TableCell>
                                        <TableCell className="text-center font-semibold text-yellow-700">{item.gradeName}</TableCell>
                                        <TableCell className="text-center">
                                            {item.ordApproveStatus === 'Pending' ? (
                                                <p className="flex flex-row justify-center">
                                          <MdOutlinePendingActions
                                            color="red"
                                            size={20}
                                          />
                                        </p>
                                            ) : (
                                                item.ordApproveStatus === 'Approved' ? (
                                                    <p className="flex flex-row justify-center">
                                          <SiTicktick color="green" size={18} />
                                        </p>
                                                ) : (
                                                    item.ordApproveStatus!=='Closed'? <p className="text-red-500 font-bold drop-shadow-lg tracking-wide uppercase">{ item.ordApproveStatus}</p>
                                                    :<button className="bg-green-500 rounded shadow-md  drop-shadow-lg p-1 text-white fix-button-width-rcnprimary">Closed</button>
                                                )
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">{handletimezone(item.orderDate)}</TableCell> {/* Order Receiving Date (Can be mapped to "orderDate") */}
                                        <TableCell className="text-center">{handletimezone(item.orderInvDate)}</TableCell>
                                        <TableCell className="text-center">{item.vendorName}</TableCell>
                                        <TableCell className="text-center">{item.brokerName}</TableCell>
                                        <TableCell className="text-center font-bold bg-blue-500 text-white">{formatNumber(item.quantity)} Kg </TableCell> {/* Demand Quantity */}  
                                        <TableCell className="text-center font-semibold  ">{formatNumber(item.mapquantity) !==0 ? `${formatNumber(item.mapquantity)} Kg`:'--'} </TableCell> {/* Prepared Quantity */}
                                        <TableCell className="text-center  font-semibold ">{formatNumber(item.mapquantity) !==0 ? `${(formatNumber((parseFloat(item.quantity) - parseFloat(item.mapquantity)).toString()))} Kg`:'--'} </TableCell> {/* Prepared Quantity */}
                                        <TableCell className="text-center ">{item.ordApproveStatus !== 'Rejected'  ?( item.ordMappingStatus === 0 ? (
                                        <div className="flex flex-row items-center justify-center w-100 ">
                                            <Progress value={((Number(item.mapquantity)/Number(item.quantity))*100)} max={100} color="green" className=" w-3/4 " />
                                            <div className="w-3/4 text-center font-bold text-white bg-red-500 ml-5">{formatNumber(((Number(item.mapquantity)/Number(item.quantity))*100).toString())} %</div>
                                        </div>
                                        ) : (
                                            
                                            
                                        <div className="flex flex-row items-center justify-center w-100 ">
                                                            <Progress value={((Number(item.mapquantity)/Number(item.quantity))*100)} max={100} color="green" className=" w-3/4 " />
                                                            <div className="w-3/4 text-center font-bold text-white  bg-green-500 ml-5">{formatNumber(((Number(item.mapquantity)/Number(item.quantity))*100).toString())} %</div>
                                        </div>
                                            
                                            
                                            // <button className="bg-green-500 rounded shadow-md  drop-shadow-lg p-1 text-white fix-button-width-rcnprimary ">{formatNumber(((Number(item.mapquantity)/Number(item.quantity))*100).toString())} %</button>
                                        )):'--'}</TableCell>
                                      

                                        <TableCell className="text-center font-semibold ">{formatNumber(item.actualquantity)!==0 ?`${formatNumber(item.actualquantity)} Kg`:'--'} </TableCell> {/* Prepared Quantity */}

                                        <TableCell className="text-center font-semibold ">{formatNumber(item.actualquantity)!==0 ?
                                        `${(formatNumber((parseFloat(item.quantity) - parseFloat(item.actualquantity)).toString()))} Kg`:'--'} </TableCell> {/* Prepared Quantity */}
                                       <TableCell className="text-center ">{item.ordApproveStatus !== 'Rejected' ?(Number(item.actualquantity) === 0 ? (
                                             <div className="flex flex-row items-center justify-center ">
                                            <Progress value={((Number(item.actualquantity)/Number(item.quantity))*100)} max={100} color="red" className=" w-3/4" />
                                            <div className="w-3/4 text-center font-bold text-white  bg-red-500 ml-5">{formatNumber(((Number(item.actualquantity)/Number(item.quantity))*100).toString())} %</div>
                                        </div>  
                                        ) : (
                                            <div className="flex flex-row items-center justify-center ">
                                            <Progress value={((Number(item.actualquantity)/Number(item.quantity))*100)} max={100} color="green" className=" w-3/4" />
                                            <div className="w-3/4 text-center font-bold text-white  bg-green-500 ml-5">{formatNumber(((Number(item.actualquantity)/Number(item.quantity))*100).toString())} %</div>
                                        </div>                                        )):'--'}</TableCell> {/* Order completion Status */}


                                      <TableCell className="text-center">{formatNumber(item.unitRate)} &#8377;</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.totalBill)} &#8377;</TableCell>
                                        <TableCell className="text-center">
                                            <input type="checkbox" checked={item.gst} />
                                        </TableCell> {/* GST */}
                                        {/* <TableCell className="text-center">{item.editStatus}</TableCell> */}
                                        <TableCell className="text-center">{item.createdBy}</TableCell> {/* Created By */}
                                        <TableCell className="text-center">{item.approvedBy}</TableCell> {/* Actioned By */}
                                        <TableCell className="text-center">{item.remarks ? item.remarks:'--'}</TableCell>
                                        

                                    </TableRow>
                                );
                            })) : (<TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>

                                <TableCell><p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">No Result </p></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>

                            </TableRow>)}

                        </TableBody>

                    </Table>) : (searchTableType === 'Mapping' ? ( searchMapTableType==='LineWise'?(
                        <Table className="mt-4">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                            <TableHead className="text-center">Sl_No</TableHead>
                            <TableHead className="text-center">Mapping_Type</TableHead>
                            <TableHead className="text-center">Generated_Purchase_Order_ID</TableHead>
                            
                            <TableHead className="text-center">Order_Origin</TableHead>
                            <TableHead className="text-center">Final_GradeName</TableHead>
                            <TableHead className="text-center">Mapping_Issue_No</TableHead>
                            {/* <TableHead className="text-center">Order_Quantity</TableHead> */}
                            <TableHead className="text-center">Order_Entry_Date</TableHead>
                            <TableHead className="text-center">Order_Mapping_Date</TableHead>
                            <TableHead className="text-center">Purchase_Vendor_Name</TableHead>
                           
                            <TableHead className="text-center">Production_Section</TableHead>
                            <TableHead className="text-center">Production_LotNo</TableHead>
                            <TableHead className="text-center">Lot_Origin</TableHead>
                            <TableHead className="text-center">Lot_Grade</TableHead>
                            <TableHead className="text-center">Available_Quantity</TableHead>
                            <TableHead className="text-center">Actual_Available</TableHead>
                            <TableHead className="text-center">Percentage_Mapping</TableHead>
                            <TableHead className="text-center">Mapped_Quantity</TableHead>
                           
                            {/* <TableHead className="text-center">Edit Status</TableHead> */}
                            <TableHead className="text-center">Created_By</TableHead>
                            {/* <TableHead className="text-center">Edited_By</TableHead> */}
                            <TableHead className="text-center">Mapping_Remarks</TableHead>
                            {/* <TableHead className="text-center" >Action</TableHead> */}
                        </TableHeader>
                        <TableBody>
                            {Data.length > 0 ? (Data.map((item: any, idx) => {
                                return (
                                    <TableRow key={item.id} >
                                        <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                             <TableCell className="text-center font-bold ">{item.altid==1 ? 'Fresh' : 'Re-Mapping'}</TableCell>
                                        <TableCell className="text-center text-red-500 font-bold ">{item.orderID}</TableCell>
                                        <TableCell className="text-center text-cyan-500 font-semibold">{item.origin}</TableCell>
                                        <TableCell className="text-center">{item.finalgradeName}</TableCell>
                                        <TableCell className="text-center">{item.altid}</TableCell>
                                        {/* <TableCell className="text-center font-semibold ">{formatNumber(item.demandQuantity)} Kg</TableCell> */}
 
                                        <TableCell className="text-center">{handletimezone(item.orderDate)}</TableCell> {/* Order Receiving Date (Can be mapped to "orderDate") */}
                                        <TableCell className="text-center">{handletimezone(item.mappingDate)}</TableCell> {/* Order Mapping Date (Can be mapped to "orderDate") */}
 
                                      
                                        <TableCell className="text-center">{item.vendorName}</TableCell>
                                    
                                        <TableCell className="text-center bg-green-100">{item.productionSection}</TableCell>
                                        <TableCell className="text-center font-semibold bg-yellow-100">{item.LotNo}</TableCell>
                                        <TableCell className="text-center bg-yellow-100">{item.productionOrigin}</TableCell>
                                        <TableCell className="text-center bg-yellow-100">{item.productionGrade}</TableCell>
                                      
 
                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(item.sectionQuantity)} Kg </TableCell> {/* Demand Quantity */}
                                        <TableCell className="text-center bg-yellow-100 text-red-500 font-semibold ">{formatNumber(item.sectionQuantityActual)} Kg </TableCell> {/* Demand Quantity */}
 
                                        <TableCell className="text-center bg-yellow-100">{formatNumber(item.prcntgMix)} %</TableCell> {/* Prepared Quantity */}
 
                                        <TableCell className="text-center font-semibold bg-green-100">{formatNumber(item.mappedQuantity)} Kg</TableCell> {/* Prepared Quantity */}
                                   
                                        {/* <TableCell className="text-center">{item.editStatus}</TableCell> */}
                                        <TableCell className="text-center">{item.createdBy}</TableCell> {/* Created By */}
                                        {/* <TableCell className="text-center">{item.approvedBy}</TableCell> Actioned By */}
                                        <TableCell className="text-center">{item.remarks}</TableCell>
                                       
 
                                    </TableRow>
                                );
                            })) : (<TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
 
                                <TableCell><p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">No Result </p></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
 
                            </TableRow>)}
 
                        </TableBody>
 
                    </Table>
                    ):(<Table className="mt-4">
                        <TableHeader className="bg-neutral-100 text-stone-950 ">
                            <TableHead className="text-center">Sl_No</TableHead>
                            <TableHead className="text-center">Mapping_Type</TableHead>
                            <TableHead className="text-center">Generated_Purchase_Order_ID</TableHead>
                            
                            <TableHead className="text-center">Order_Origin</TableHead>
                            <TableHead className="text-center">Final_GradeName</TableHead>
                            <TableHead className="text-center">Mapping_Issue_No</TableHead>
                           
                            <TableHead className="text-center">Order_Entry_Date</TableHead>
                            <TableHead className="text-center">Order_Mapping_Date</TableHead>
                            <TableHead className="text-center">Purchase_Vendor_Name</TableHead>
                           
                            {/* <TableHead className="text-center">Production_Section</TableHead>
                            <TableHead className="text-center">Production_LotNo</TableHead>
                            <TableHead className="text-center">Lot_Origin</TableHead>
                            <TableHead className="text-center">Lot_Grade</TableHead>
                            <TableHead className="text-center">Available_Quantity</TableHead>
                            <TableHead className="text-center">Actual Available_Quantity</TableHead>
                            <TableHead className="text-center">Percentage_Mapping</TableHead> */}
                             <TableHead className="text-center">Demand_Quantity</TableHead>
                            <TableHead className="text-center">Mapped_Quantity</TableHead>
                           
                            {/* <TableHead className="text-center">Edit Status</TableHead> */}
                            <TableHead className="text-center">Created_By</TableHead>
                            {/* <TableHead className="text-center">Edited_By</TableHead> */}
                            <TableHead className="text-center">Mapping_Remarks</TableHead>
                            <TableHead className="text-center" >Action</TableHead>
                        </TableHeader>
                        <TableBody>
                            {Data.length > 0 ? (Data.map((item: any, idx) => {
                                return (
                                    <TableRow key={item.id} >
                                        <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                             <TableCell className="text-center font-bold ">{item.altid==1 ? 'Fresh' : 'Re-Mapping'}</TableCell>
                                        <TableCell className="text-center text-red-500 font-bold ">{item.orderID}</TableCell>
                                        <TableCell className="text-center text-cyan-500 font-semibold">{item.origin}</TableCell>
                                        <TableCell className="text-center">{item.finalgradeName}</TableCell>
                                        <TableCell className="text-center">{item.altid}</TableCell>
                                     
 
                                        <TableCell className="text-center">{handletimezone(item.orderDate)}</TableCell> {/* Order Receiving Date (Can be mapped to "orderDate") */}
                                        <TableCell className="text-center">{handletimezone(item.mappingDate)}</TableCell> {/* Order Mapping Date (Can be mapped to "orderDate") */}
 
                                      
                                        <TableCell className="text-center">{item.vendorName}</TableCell>
                                    
                                        {/* <TableCell className="text-center bg-green-100">{item.productionSection}</TableCell>
                                        <TableCell className="text-center font-semibold bg-yellow-100">{item.LotNo}</TableCell>
                                        <TableCell className="text-center bg-yellow-100">{item.productionOrigin}</TableCell>
                                        <TableCell className="text-center bg-yellow-100">{item.productionGrade}</TableCell> */}
                                      
{/*  
                                        <TableCell className="text-center font-semibold bg-yellow-100">{formatNumber(item.sectionQuantity)} Kg </TableCell> Demand Quantity
                                        <TableCell className="text-center bg-yellow-100 text-red-500 font-semibold ">{formatNumber(item.sectionQuantityActual)} Kg </TableCell> Demand Quantity */}
 
                                        {/* <TableCell className="text-center bg-yellow-100">{formatNumber(item.prcntgMix)} %</TableCell> Prepared Quantity */}
                                        <TableCell className="text-center font-extrabold ">{formatNumber(item.demandQuantity)} Kg</TableCell>
                                        <TableCell className="text-center font-extrabold ">{formatNumber(item.mappedQuantity)} Kg</TableCell> {/* Prepared Quantity */}
                                   
                                        {/* <TableCell className="text-center">{item.editStatus}</TableCell> */}
                                        <TableCell className="text-center">{item.createdBy}</TableCell> {/* Created By */}
                                        {/* <TableCell className="text-center">{item.approvedBy}</TableCell> Actioned By */}
                                        <TableCell className="text-center">{item.remarks}</TableCell>
                                        {checkpending('StockUpdate') && <TableCell className="text-center">

                                            <Popover>
                                                <PopoverTrigger>
                                                    <button className="bg-cyan-500 p-2 text-white rounded">Action</button>
                                                </PopoverTrigger>
                                                <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                                    <AlertDialog>
                                                        <AlertDialogTrigger className="flex">
                                                            <FcDeleteDatabase size={25} /> <button className="bg-transparent pb-2 pl-1 text-left hover:text-green-500">Delete</button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Do you want to Delete the Mapping ?</AlertDialogTitle>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDeleteMapping(item)}>Continue</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                   
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>}
 
                                    </TableRow>
                                );
                            })) : (<TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
 
                                <TableCell><p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">No Result </p></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
 
                            </TableRow>)}
 
                        </TableBody>
 
                    </Table>)
                       ):( <Table className="mt-4">
                       <TableHeader className="bg-neutral-100 text-stone-950 ">
                           <TableHead className="text-center">Sl⠀No</TableHead>
                          <TableHead className="text-center" >Action</TableHead>
                           <TableHead className="text-center">Generated⠀Sales⠀Order⠀ID</TableHead>
                           <TableHead className="text-center">Issue⠀No (Packing)</TableHead>
                           <TableHead className="text-center">Order⠀Origin</TableHead>
                           <TableHead className="text-center">QC⠀Status</TableHead>
                           <TableHead className="text-center">Packing⠀Status</TableHead>
                           <TableHead className="text-center">Dispatch⠀Status</TableHead>
                           <TableHead className="text-center">Order⠀Entry⠀Date</TableHead>
                         
                           <TableHead className="text-center">Final⠀GradeName</TableHead>
                           <TableHead className="text-center">Opening⠀Demand</TableHead>
                          
                           <TableHead className="text-center">Unit⠀Rate</TableHead>
                           <TableHead className="text-center">GST</TableHead>
                           <TableHead className="text-center">Total⠀Bill⠀Price</TableHead>
                          
                           <TableHead className="text-center">Sales⠀Vendor⠀Name</TableHead>
                           <TableHead className="text-center">Fulfilled⠀Quantity</TableHead>
                           <TableHead className="text-center">Manufacturing⠀Date</TableHead>
                           <TableHead className="text-center">Packing⠀Batch⠀No</TableHead>
                           <TableHead className="text-center">System⠀Count (Pouch/Bucket)</TableHead>
                           <TableHead className="text-center">Actual⠀Count (Pouch/Bucket)</TableHead>
                           <TableHead className="text-center">Packing⠀Remarks</TableHead>
                    
                           
                       </TableHeader>
                       <TableBody>
                           {Data.length > 0 ? (Data.map((item: any, idx) => {
                               return (
                                   <TableRow key={item.id} >
                                       <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                        <TableCell className="text-center">

                                       <Popover>
                                            <PopoverTrigger>
                                                <button className={`p-2 bg-blue-50 w-20 border  font-bold rounded-lg ${item.dispatchStatus === 1 ? 'bg-red-50 text-red-500 border-red-300' : 'border-blue-300 bg-blue-50 text-blue-500'}`} 
                                                disabled={item.dispatchStatus === 1  ? true : false}>Action</button>
                                            </PopoverTrigger>
                                            {item.packingStatus!==1 && <PopoverContent className="flex flex-col text-sm w-30 font-medium">
                                                <Dialog>
                                                    <DialogTrigger className="flex"><CiEdit size={20} />
                                                        <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" >Pack</button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-3xl">
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>Order Packing</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <PackingCreateForm data={item} />
                                                    </DialogContent>
                                                </Dialog>
                                                    </PopoverContent>}


                                                    {item.packingStatus===1 && item.dispatchStatus === 0 && <PopoverContent className="flex flex-col text-sm w-30 font-medium">
                                                <AlertDialog>
                                                <AlertDialogTrigger className="flex mt-2">
                                                    <FcCancel size={25} /> <button className="bg-transparent pt-0.5 pl-1 text-left hover:text-red-500"> Unpack</button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Do you want to Unpack the Entry?</AlertDialogTitle>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleUnpack(item)}>Continue</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                                    </PopoverContent>}
                                                                                                
                                                                                            </Popover>
                                       </TableCell>
                                       <TableCell className="text-center text-purple-500 font-bold ">{item.orderID}</TableCell>

                                       <TableCell className="text-center  font-semibold ">{item.altid}</TableCell>
                                       <TableCell className="text-center ">{item.origin}</TableCell>

                                       <TableCell className="text-center ">
                                           {item.qualityStatus === 'QC Approved' ? (
                                               <p className="flex flex-row justify-center">
                                                                       <SiTicktick color="green" size={18} />
                                                                     </p>
                                           ) : item.qualityStatus === 'Pending' ? (
                                              <p className="flex flex-row justify-center">
                                                                      <MdOutlinePendingActions color="red" size={20} />
                                                                    </p>
                                           ) : (
                                               <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.qualityStatus}</button>
                                           )}
                                       </TableCell>

                                       <TableCell className="text-center ">
                                           {item.packingStatus === 0 ?
                                               <p className="flex flex-row justify-center">
                                                                       <MdOutlinePendingActions color="red" size={20} />
                                                                     </p> :
                                              <p className="flex flex-row justify-center">
                                                                      <SiTicktick color="green" size={18} />
                                                                    </p>}
                                       </TableCell>
                                       <TableCell className="text-center ">
                                           {item.dispatchStatus === 0 ?
                                               <p className="flex flex-row justify-center">
                                                                       <MdOutlinePendingActions color="red" size={20} />
                                                                     </p> :
                                               <p className="flex flex-row justify-center">
                                                                       <SiTicktick color="green" size={18} />
                                                                     </p>}
                                       </TableCell>   
                                       <TableCell className="text-center">{handletimezone(item.orderDate)}</TableCell> {/* Order Receiving Date (Can be mapped to "orderDate") */}

                                       <TableCell className="text-center font-semibold">{item.gradeName}</TableCell>
                                       <TableCell className="text-center">{formatNumber(item.demandquantity)} Kg</TableCell>
                                      
                                       <TableCell className="text-center">{item.unitRate}  &#8377;</TableCell>
                                       <TableCell className="text-center">
                                            <input type="checkbox" checked={item.gst} />
                                        </TableCell> {/* GST */}
                                       <TableCell className="text-center ">{item.totalBill}  &#8377;</TableCell>

                                       <TableCell className="text-center ">{item.vendorName}</TableCell>
                                       <TableCell className="text-center ">{item.fulfillquantity ?formatNumber(item.fulfillquantity):0} Kg</TableCell>
                                       <TableCell className="text-center bg-gray-200 font-extrabold">{item.mfgDate ? handletimezone(item.mfgDate):item.mfgDate}</TableCell> {/* Order Receiving Date (Can be mapped to "orderDate") */}

                                       <TableCell className="text-center bg-gray-200 font-extrabold">{item.BatchID}</TableCell>
                                       <TableCell className="text-center bg-gray-200 font-extrabold">{item.packingquantity}</TableCell>
                                       <TableCell className="text-center bg-gray-200 font-extrabold">{item.convpackingquantity}</TableCell>
                                        <TableCell className="text-center bg-gray-200 font-bold">{item.remarks}</TableCell>
                                      
                                      
                                 
                                      

                                   </TableRow>
                               );
                           })) : (<TableRow>
                               <TableCell></TableCell>
                               <TableCell></TableCell>
                               <TableCell></TableCell>
                               <TableCell></TableCell>

                               <TableCell><p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">No Result </p></TableCell>
                               <TableCell></TableCell>
                               <TableCell></TableCell>
                               <TableCell></TableCell>
                               <TableCell></TableCell>

                           </TableRow>)}

                       </TableBody>

                   </Table>))}





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
                <dialog id="machinescs" className="dashboard-modal">
                          <button id="machinescsbtn" className="dashboard-modal-close-btn ">X </button>
                          <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                            <p id="modal-text" className="pl-3 mt-1 font-medium">{errortext}</p></span>
                
                          {/* <!-- Add more elements as needed --> */}
                        </dialog>
                
                        <dialog id="machineerror" className="dashboard-modal">
                          <button id="machineerrorbtn" className="dashboard-modal-close-btn ">X </button>
                          <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                            <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>
                
                          {/* <!-- Add more elements as needed --> */}
                        </dialog>
            </div>

        </>
    )
}

export default ProdTransacTable;
