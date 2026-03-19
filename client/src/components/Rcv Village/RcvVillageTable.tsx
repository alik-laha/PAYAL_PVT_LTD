import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"
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
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { format, toZonedTime } from 'date-fns-tz'
import { FaSearch } from "react-icons/fa";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { CiEdit } from "react-icons/ci";
import { pagelimit, pendingCheckRole } from "../common/exportData"
import {  pendingCheckRoles, PermissionRole, sumofRcvVillagePrimary, findskutypeData, RcvVillagePrimaryEntryData, RcvVillagePrimaryExcelEntryData, rcvVillageprimaryData } from '@/type/type'
import axios from 'axios'
//import PackageMaterialReceivingModify from "./PackageMetirialModifyReceving"
import { useContext } from 'react';
import Context from '../context/context';
import { LuDownload } from "react-icons/lu";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import RcvVillageModify from "./RcvVillageModify"
import { MdPendingActions } from "react-icons/md"
// import StorePrimaryModify from "./StorePrimaryModify"

const RcvVillageTable = () => {

    const { setRcvVillagePrimaryOverView } = useContext(Context);
    const [Data, setData] = useState([])
    const [EditData, setEditData] = useState([])
    // const [EditPendingData, setEditPendingData] = useState()
    const [EditSumData, setEditSumData] = useState<sumofRcvVillagePrimary>()
    const [fromdate, setfromDate] = useState('')  
   // const [hidetodate, sethidetoDate] = useState('')
    const [todate, settoDate] = useState('')
    const [page, setPage] = useState(1)
    const limit = pagelimit
    const currDate = new Date().toLocaleDateString();
    const successdialog = document.getElementById('recevingeditapprove') as HTMLInputElement;
    const closeDialogButton = document.getElementById('recevingeditapproveclose') as HTMLInputElement;
    const errordialog = document.getElementById('recevingeditreject') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('recevingeditrejectclose') as HTMLInputElement;
  
    const [sku, setsku] = useState<findskutypeData[]>([])
    const [grade, setGrade] = useState<findskutypeData[]>([])
    const [gradeor, setgradeor] = useState<string>("")
    const [blConNo, setBlConNo] = useState<string>("")
    const [origin, setOrigin] = useState<string>("")
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
                window.location.reload()
            }

        });
    }


    // const handleTodate = (e: React.ChangeEvent<HTMLInputElement>) => {

    //     const selected = e.target.value;
    //     if (!selected) {
    //         settoDate('')
    //         sethidetoDate('')
    //         return
    //     }
    //     const date = new Date(selected)
    //     date.setDate(date.getDate() + 1);
    //     const nextday = date.toISOString().split('T')[0];
    //     sethidetoDate(selected)
    //     settoDate(nextday)
    // }
    function handletimezone(date: string | Date) {
        const apidate = new Date(date);
        const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);
        const finaldate = format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
        return finaldate;
    }
    const handleSearch = () => {
        setEditData([])
        searchData()
    }
    const handleApprove = (item: number) => {
        console.log(item)
        axios.get(`/api/rcvVillage/acceptEditVillagePrimary/${item}`)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    (successdialog as any).showModal();
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleRejection = (item: number) => {
        axios.get(`/api/rcvVillage/rejectEditVillagePrimary/${item}`)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    (errordialog as any).showModal();
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const searchData = () => {
        axios.post('/api/rcvVillage/getVillagePrimary', {  searchitem: blConNo,
          
            fromDate: fromdate,
            toDate: todate,
            almondtype: origin,
            almondgrade: gradeor }, { params: { page: page, limit: limit } }).then((res) => {
            setData(res.data.rcnEntries)

            if (res.data.rcnEntries.length === 0 && page>1) {
                setPage((prev) => prev - 1)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Item Type', { section: 'Village' })
            .then(res => {
                //console.log(res.data)
                setsku(res.data)
                //console.log(sku)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Item Name', { section: 'Village' })
            .then(res => {
                //console.log(res.data)
                setGrade(res.data)
                //console.log(sku)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    const GetPendingEdit = async () => {
        // console.log("alik")
        const Data = await axios.get('/api/rcvVillage/getEditRcvVillagePrimary');
        console.log(Data)
        setEditData(Data.data)

    }
    const getSumOfAllEdit = async () => {
        const Data = await axios.get('/api/rcvVillage/getsumofRcvVillage');
        setEditSumData(Data.data)
        setRcvVillagePrimaryOverView(Data.data)
    }

    useEffect(() => {
        searchData()
        //GetPendingEdit()

    }, [page])

    useEffect(() => {
        getSumOfAllEdit()
    }, [])
    const exportToExcel = async () => {
        const response = await axios.post('/api/rcvVillage/getVillagePrimary', {  searchitem: blConNo,
         
            fromDate: fromdate,
            toDate: todate,
            almondtype: origin,
            almondgrade: gradeor })
        const data1 = response.data.rcnEntries
        console.log(data1)

        let ws
        let transformed: RcvVillagePrimaryExcelEntryData[] = [];
        if (EditData.length > 0) {

            transformed = EditData.map((item: rcvVillageprimaryData,idx:number) => ({
                id: idx + 1,
                gatePassNo:item.gatePassNo,
                gateType:item.gateType,
                ReceivingDate: handletimezone(item.recevingDate),
                Vehicle_No:item.truckNo,
                vendorName:item.vendorName,
                grossWt:Number(item.grossWt)||0,
                netWeight: Number(item.netWeight) || 0 ,
                type:item.type,
                grade:item.sku,
                invoice:item.invoice,
           
                totalWt:Number(item.totalWt)||0 ,
    
                Item_Or_Bag_Count:item.quantity,
                editStatus:item.editStatus,createdBy:item.createdBy,ApprovedBy:item.approvedBy
            }));
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else {
            transformed = data1.map((item: rcvVillageprimaryData,idx:number) => ({
                id: idx + 1,
                gatePassNo:item.gatePassNo,
                gateType:item.gateType,
                ReceivingDate: handletimezone(item.recevingDate),
                Vehicle_No:item.truckNo,
                vendorName:item.vendorName,
                grossWt:Number(item.grossWt)||0,
                netWeight:Number(item.netWeight)|| 0 ,
                type:item.type,
                grade:item.sku,
                invoice:item.invoice,
             
                totalWt:Number(item.totalWt)||0 ,
              
                Item_Or_Bag_Count:item.quantity,
                editStatus:item.editStatus,createdBy:item.createdBy,ApprovedBy:item.approvedBy

            }));
            // setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'Village_Out_Primary_Material_' + currDate + '.xlsx');
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



    return (
        <>

  {checkpending('Village') &&  ((EditSumData?.RcvVillagePrimary ?? 0) !== 0)  &&
            
            (

                <Drawer>
                    <DrawerTrigger asChild >
                        <div className="relative inline-block ml-4 top-1 responsive-button-adjust">
                    <Button
                        className="w-40 bg-gradient-to-r from-orange-400 to-red-200 hover:from-red-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md "
                        /* FIX 1: Use ?? 0 for the disabled prop */
                        disabled={(EditSumData?.RcvVillagePrimary ?? 0) === 0}
                        onClick={GetPendingEdit}
                    >
                        <div className="flex items-center gap-2">
                            <MdPendingActions size={18} />
                            Actions
                        </div>
                    </Button>

                    {/* FIX 2: Use ?? 0 for the badge display condition and value */}
                    {(EditSumData?.RcvVillagePrimary ?? 0) > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center transform scale-90 origin-center animate-pulse shadow-lg ring-2 ring-white dark:ring-gray-800">
                            {EditSumData?.RcvVillagePrimary ?? 0}
                        </span>
                    )}
                </div>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Pending Actions</DrawerTitle>
                            <DrawerDescription>Approve Or Reject Modify Request</DrawerDescription>
                        </DrawerHeader>
                        <div className='mx-5 flex flex-col'>
                            <div className="flex flex-row w-full  justify-end"><Button
                                className="w-12 mb-2 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                onClick={exportToExcel}
                            >
                                <LuDownload size={16} />

                            </Button></div>
                            <Table>
                                <TableHeader className="bg-neutral-100 text-stone-950 ">
                                    <TableHead className="text-center bg-gray-200 text-gray-700" >Sl⠀No</TableHead>
                                    <TableHead className="text-center bg-gray-200 text-gray-700" >Action</TableHead>
                                        <TableHead className="text-center bg-gray-200 text-gray-700" >GatePass⠀No</TableHead>
                        <TableHead className="text-center bg-gray-200 text-gray-700" >GatePass⠀Type</TableHead>
                        <TableHead className="text-center bg-gray-200 text-gray-700" >Receiving⠀Date</TableHead>
                        <TableHead className="text-center bg-gray-200 text-gray-700" >Edit⠀Status </TableHead>
                        <TableHead className="text-center bg-gray-200 text-gray-700" >Entry⠀Vehicle⠀No</TableHead>
                        <TableHead className="text-center bg-gray-200 text-gray-700" >Initial⠀Weight</TableHead>
                        <TableHead className="text-center bg-gray-200 text-gray-700" >Village⠀Item⠀Type</TableHead>
                        <TableHead className="text-center bg-gray-200 text-gray-700" >Village⠀Item⠀Name</TableHead> 
                        <TableHead className="text-center bg-gray-200 text-gray-700" >Item⠀Doc⠀No</TableHead>            
                        <TableHead className="text-center bg-gray-200 text-gray-700" >Net⠀Weight</TableHead>
                        <TableHead className="text-center bg-gray-200 text-gray-700" >Dispatch⠀Party⠀Name</TableHead>
                        <TableHead className="text-center bg-gray-200 text-gray-700" >Bag/Item⠀Count</TableHead>
                        <TableHead className="text-center bg-gray-200 text-gray-700" >Row⠀Weight(Kg)</TableHead>                     
                        
                        <TableHead className="text-center bg-gray-200 text-gray-700" >Dispatch⠀Village⠀Remarks</TableHead>
                        <TableHead className="text-center bg-gray-200 text-gray-700" >Created⠀By </TableHead>
                       
                        



                                </TableHeader>
                                <TableBody>
                                    {
                            EditData.map((item: RcvVillagePrimaryEntryData, idx: number) => {

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
                                                                    onClick={() => handleApprove(item.id)}>
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
                                                                    onClick={() => handleRejection(item.id)}>
                                                                    Continue
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>


                                        </TableCell>
                                       <TableCell className="text-center font-bold">{item.gatePassNo}</TableCell>
                                <TableCell className="text-center font-semibold text-cyan-600">{item.gateType}</TableCell>
                                <TableCell className="text-center">{handletimezone(item.recevingDate)}</TableCell>
                                <TableCell className="text-center" > <button
                                                                                className={`p-2 rounded w-20 border 
                                              ${item.editStatus === "Accepted"
                                                                                        ? "text-green-600 border-green-600 bg-green-50"
                                                                                        : item.editStatus === "N/A"
                                                                                            ? "text-gray-700 border-gray-400 bg-gray-100"
                                                                                            : "text-red-600 border-red-600 bg-red-50"
                                                                                    }`}
                                                                            >
                                                                                {item.editStatus}
                                                                            </button></TableCell>
                                <TableCell className="text-center">{item.truckNo}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.grossWt)}</TableCell>
                                <TableCell className="text-center">{item.type}</TableCell>
                                <TableCell className="text-center" >{item.sku}</TableCell> 
                                <TableCell className="text-center">{item.invoice}</TableCell>                            
                                <TableCell className="text-center">{item.netWeight ? item.netWeight : 0} </TableCell>
                                <TableCell className="text-center">{item.vendorName}</TableCell>
                                <TableCell className="text-center font-semibold">{formatNumber(item.quantity)}</TableCell>
                                <TableCell className="text-center" >{formatNumber(item.totalWt)}</TableCell> 
                          

                                <TableCell className="text-center">{item.remarks}</TableCell>
                                <TableCell className="text-center">{item.createdBy}</TableCell>
                              
                                          
                                        
                          
                                       
                                    </TableRow>
                                );
                            })}
                       
                                </TableBody>
                            </Table>





                        </div>
                        <DrawerFooter>

                            <DrawerClose asChild>
                                <Button className="w-28 md:w-40 bg-gradient-to-r from-red-600 to-rose-500 hover:from-lime-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mb-2 mt-5 ml-2 responsive-button-adjust no-margin-left drop-shadow-md"
                                >Close</Button>
                            </DrawerClose>
                        </DrawerFooter>

                    </DrawerContent>
                </Drawer>

            )
            
           
          }


            <div className="mx-2 mt-5 ">

                <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                    {/* The grid is set to hold 1, 2, 3, or 4 columns, which is typically enough
        for 6-7 filter fields plus buttons, ensuring good flow on all screen sizes.
        xl:grid-cols-6 can be used if you have a wide monitor and want everything on one line.
      */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-end">

                        {/* GatePass / Document No */}
                        <div className="flex flex-col gap-1">
                            {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                GatePass No.
                            </label> */}
                            <Input
                                className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150"
                                placeholder="GatePass No."
                                value={blConNo}
                                onChange={(e) => setBlConNo(e.target.value)}
                            />
                        </div>

                         {/* Type (Select) */}
                        <div className="flex flex-col gap-1">
                            {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                Type
                            </label> */}
                            <select
                                className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 pr-8 appearance-none"
                                onChange={(e) => setOrigin(e.target.value)}
                                value={origin}
                            >
                                <option value="">Type (All)</option>
                                {sku.map((data, index) => (
                                    <option key={index} value={data.sku}>
                                        {data.sku}
                                    </option>
                                ))}
                            </select>
                        </div>

                          <div className="flex flex-col gap-1">
                            {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                Type
                            </label> */}
                            <select
                                className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 pr-8 appearance-none"
                                onChange={(e) => setgradeor(e.target.value)}
                                value={gradeor}
                            >
                                <option value="">Item Name (All)</option>
                                {grade.map((data, index) => (
                                    <option key={index} value={data.sku}>
                                        {data.sku}
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

                        {/* Buttons: Search + Export */}
                        {/* Occupy the remaining space, pushed to the right on larger screens */}
                        <div className="flex flex-wrap justify-end sm:justify-between gap-3 mt-2 md:mt-0">
                                                <Button
                                                    className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                                    onClick={handleSearch}
                                                >
                                                    <FaSearch size={14} />
                                                    Search
                                                </Button>
                        
                                                {checkpending('Village') && <Button
                                                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                                    onClick={exportToExcel}
                                                >
                                                    <LuDownload size={16} />
                                                    
                                                </Button>}
                                            </div>

                    </div>
                </div>


                
     



                <Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">

                    <TableHead className="text-center" >Sl⠀No</TableHead>
                         <TableHead className="text-center" >Action</TableHead>
                                        <TableHead className="" >GatePass⠀No</TableHead>
                        <TableHead className="text-center" >GatePass⠀Type</TableHead>
                        <TableHead className="text-center" >Receiving⠀Date</TableHead>
                        <TableHead className="text-center" >Edit⠀Status </TableHead>
                        <TableHead className="text-center" >Entry⠀Vehicle⠀No</TableHead>
                        <TableHead className="text-center" >Initial⠀Weight</TableHead>
                        <TableHead className="text-center" >Village⠀Item⠀Type</TableHead>
                        <TableHead className="text-center" >Village⠀Item⠀Name</TableHead> 
                        <TableHead className="text-center" >Item⠀Doc⠀No</TableHead>            
                        <TableHead className="text-center " >Net⠀Weight</TableHead>
                        <TableHead className="text-center " >Dispatch⠀Party⠀Name</TableHead>
                        <TableHead className="text-center " >Bag/Item⠀Count</TableHead>
                        <TableHead className="text-center " >Row⠀Weight(Kg)</TableHead>                     
                        
                        <TableHead className="text-center " >Dispatch⠀Village⠀Remarks</TableHead>
                        <TableHead className="text-center " >Created⠀By </TableHead>
                        <TableHead className="text-center " >Approved⠀By </TableHead>


                    </TableHeader>
                    <TableBody>
                        {
                            Data.length > 0 ? (Data.map((item: RcvVillagePrimaryEntryData, idx: number) => {


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
                                                            <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500">Modify</button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-3xl">
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className='text-lg text-gray-600 text-center mt-3 tracking-wider drop-shadow-xl font-bold'>Village Item Modification</p>
                                                                </DialogTitle>
                                                                <DialogDescription>
                                                                    <p className='text-1xl text-center'>To Be Filled Up By Village Supervisor</p>
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <RcvVillageModify data={item} />
                                                            
                                                            
                                                        </DialogContent>
                                                    </Dialog>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                <TableCell className="text-center font-bold">{item.gatePassNo}</TableCell>
                                <TableCell className="text-center font-semibold text-cyan-600">{item.gateType}</TableCell>
                                <TableCell className="text-center">{handletimezone(item.recevingDate)}</TableCell>
                                        <TableCell className="text-center" > <button
                                            className={`p-2 rounded w-20 border 
                                                                              ${item.editStatus === "Accepted"
                                                    ? "text-green-600 border-green-600 bg-green-50"
                                                    : item.editStatus === "N/A"
                                                        ? "text-gray-700 border-gray-400 bg-gray-100"
                                                        : "text-red-600 border-red-600 bg-red-50"
                                                }`}
                                        >
                                            {item.editStatus}
                                        </button></TableCell>
                                <TableCell className="text-center">{item.truckNo}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.grossWt)}</TableCell>
                                <TableCell className="text-center">{item.type}</TableCell>
                                <TableCell className="text-center" >{item.sku}</TableCell> 
                                <TableCell className="text-center">{item.invoice}</TableCell>                            
                                <TableCell className="text-center">{item.netWeight ? item.netWeight : 0}</TableCell>
                                <TableCell className="text-center">{item.vendorName}</TableCell>
                                <TableCell className="text-center font-semibold">{formatNumber(item.quantity)}</TableCell>
                                <TableCell className="text-center" >{formatNumber(item.totalWt)}</TableCell> 
                            

                                        <TableCell className="text-center">{item.remarks}</TableCell>
                                        <TableCell className="text-center">{item.createdBy}</TableCell>
                                        <TableCell className="text-center">{item.approvedBy}</TableCell>
                                   
                                    </TableRow>
                                );
                            })) : (<TableRow>
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
                                
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
                <Pagination  className="pt-5 flex flex-row justify-end ">
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
                <dialog id="recevingeditapprove" className="dashboard-modal">
                    <button id="recevingeditapproveclose" className="dashboard-modal-close-btn ">X </button>
                    <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                        <p id="modal-text" className="pl-3 mt-1 font-medium">Modification Request has Been Approved</p></span>

                    {/* <!-- Add more elements as needed --> */}
                </dialog>

                <dialog id="recevingeditreject" className="dashboard-modal">
                    <button id="recevingeditrejectclose" className="dashboard-modal-close-btn ">X </button>
                    <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                        <p id="modal-text" className="pl-3 mt-1 text-base font-medium">Modification Request has Been Reverted</p></span>

                    {/* <!-- Add more elements as needed --> */}
                </dialog>
            </div >
        </>
    )
}
export default RcvVillageTable;