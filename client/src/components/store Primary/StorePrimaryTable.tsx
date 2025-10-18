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
import { pagelimit, pendingCheckRole, SelectGatePassType } from "../common/exportData"
import {  pendingCheckRoles, PermissionRole, sumofStorePrimary, storeprimaryData, ExcelStorePrimaryData } from '@/type/type'
import axios from 'axios'
//import PackageMaterialReceivingModify from "./PackageMetirialModifyReceving"
import { useContext } from 'react';
import Context from '../context/context';
import { LuDownload } from "react-icons/lu";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import StorePrimaryModify from "./StorePrimaryModify"
import { MdPendingActions } from "react-icons/md"

const StorePrimaryTable = () => {

    const { setStorePrimaryOverView } = useContext(Context);

    const [Data, setData] = useState([])
    const [EditData, setEditData] = useState([])
    // const [EditPendingData, setEditPendingData] = useState()
    const [EditSumData, setEditSumData] = useState<sumofStorePrimary>()
    const [fromdate, setfromDate] = useState('')
    const [searchdata, setSearchData] = useState('')
    //const [hidetodate, sethidetoDate] = useState('')
    const [todate, settoDate] = useState('')
    const [page, setPage] = useState(1)
    const limit = pagelimit
    const [gatepassSearch, setgatepassSearch] = useState('')
    const currDate = new Date().toLocaleDateString();
    const successdialog = document.getElementById('recevingeditapprove') as HTMLInputElement;
    const closeDialogButton = document.getElementById('recevingeditapproveclose') as HTMLInputElement;
    const errordialog = document.getElementById('recevingeditreject') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('recevingeditrejectclose') as HTMLInputElement;
    const [selectType, setselectType] = useState<string>("")
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
        axios.get(`/api/storePrimary/acceptEditStorePrimary/${item}`)
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
        axios.get(`/api/storePrimary/rejectEditStorePrimary/${item}`)
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
        axios.post('/api/storePrimary/getStorePrimary', { fromdate, todate, searchdata,gatepassSearch,selectType }, { params: { page: page, limit: limit } }).then((res) => {
            setData(res.data.PackageMaterials)

            if (res.data.PackageMaterials.length === 0 && page>1) {
                setPage((prev) => prev - 1)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    const GetPendingEdit = async () => {
        // console.log("alik")
        const Data = await axios.get('/api/storePrimary/getEditStorePrimary');
        console.log(Data)
        setEditData(Data.data)

    }
    const getSumOfAllEdit = async () => {
        const Data = await axios.get('/api/storePrimary/getsumofStore');
        setEditSumData(Data.data)
        setStorePrimaryOverView(Data.data)
    }

    useEffect(() => {
        searchData()
        //GetPendingEdit()

    }, [page])

    useEffect(() => {
        getSumOfAllEdit()
    }, [])
    const exportToExcel = async () => {
        const response = await axios.post('/api/storePrimary/getStorePrimary', {
            fromdate, todate, searchdata,gatepassSearch 
        })
        const data1 = response.data.PackageMaterials
        console.log(data1)

        let ws
        let transformed: ExcelStorePrimaryData[] = [];
        if (EditData.length > 0) {

            transformed = EditData.map((item: storeprimaryData,idx:number) => ({
                Sl_No: idx+1,
                GatePass_No:item.gatePassNo,
                Gate_Pass_Type:item.gateType,
                Entry_Date: handletimezone(item.recevingDate),
                Vehicle_No:item.truckNo,
                Gross_Wt:item.grossWt,
                Net_Wt:item.netWeight,
                Invoice:item.invoice,
                Invoice_Date: handletimezone(item.invoicedate),
                Type_Of_Material:item.type,
                SKU: item.sku,
                Vendor_Name: item.vendorName,
                Physical_Quantity: formatNumber(item.quantity),
                Invoice_Quantity:item.invoicequantity,
                Unit: item.unit,
                Line_Weight:item.totalWt!=='0.00' ?formatNumber(item.totalWt) :'',
                Bill_Amount:item.totalBill!=='0.00' ?formatNumber(item.totalBill) :'',
                Remarks:item.remarks,
                Quality_Status: item.qualityStatus ? "QC Done" : "QC Pending",
                Edit_Status: item.editStatus,
                Created_By: item.createdBy,
                Approved_Or_Rejected_By: item.approvedBy
            }));
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else {
            transformed = data1.map((item: storeprimaryData,idx:number) => ({
                Sl_No: idx+1,
                GatePass_No:item.gatePassNo,
                Gate_Pass_Type:item.gateType,
                Entry_Date: handletimezone(item.recevingDate),
                Vehicle_No:item.truckNo,
                Gross_Wt:item.grossWt,
                Net_Wt:item.netWeight,
                Invoice:item.invoice,
                Invoice_Date: handletimezone(item.invoicedate),
                Type_Of_Material:item.type,
                SKU: item.sku,
                Vendor_Name: item.vendorName,
                Physical_Quantity: formatNumber(item.quantity),
                Invoice_Quantity:item.invoicequantity,
                Unit: item.unit,
                Line_Weight:item.totalWt!=='0.00' ?formatNumber(item.totalWt) :'',
                Bill_Amount:item.totalBill!=='0.00' ?formatNumber(item.totalBill) :'',
                Remarks:item.remarks,
                Quality_Status: item.qualityStatus ? "QC Done" : "QC Pending",
                Edit_Status: item.editStatus,
                Created_By: item.createdBy,
                Approved_Or_Rejected_By: item.approvedBy

            }));
            // setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'Store_Item_Material_' + currDate + '.xlsx');
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



            {checkpending('RCNPrimary') && (
                <div className="relative inline-block ml-4 top-1 responsive-button-adjust">
                    <Button
                        className="w-40 bg-gradient-to-r from-orange-400 to-red-200 hover:from-red-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md "
                        /* FIX 1: Use ?? 0 for the disabled prop */
                        disabled={(EditSumData?.storePrimary ?? 0) === 0}
                        onClick={GetPendingEdit}
                    >
                        <div className="flex items-center gap-2">
                            <MdPendingActions size={18} />
                            Pending Actions
                        </div>
                    </Button>

                    {/* FIX 2: Use ?? 0 for the badge display condition and value */}
                    {(EditSumData?.storePrimary ?? 0) > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center transform scale-90 origin-center animate-pulse shadow-lg ring-2 ring-white dark:ring-gray-800">
                            {EditSumData?.storePrimary ?? 0}
                        </span>
                    )}
                </div>
            )}

            <div className="mx-5 mt-5 ">
                <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                    {/* The grid is set to hold 1, 2, 3, or 4 columns, which is typically enough
        for 6-7 filter fields plus buttons, ensuring good flow on all screen sizes.
        xl:grid-cols-6 can be used if you have a wide monitor and want everything on one line.
      */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-end">

                        {/* GatePass / Document No */}
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                GatePass No.
                            </label>
                            <Input
                                className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150"
                                placeholder="Search GatePass No."
                                value={gatepassSearch}
                                onChange={(e) => setgatepassSearch(e.target.value)}
                            />
                        </div>

                        {/* SKU / Vendor */}
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                SKU / Vendor
                            </label>
                            <Input
                                className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150"
                                placeholder="Search SKU/Vendor"
                                value={searchdata}
                                onChange={(e) => setSearchData(e.target.value)}
                            />
                        </div>

                        {/* Type Of Gatepass (Select) */}
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                Type
                            </label>
                            <select
                                className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 pr-8 appearance-none"
                                onChange={(e) => setselectType(e.target.value)}
                                value={selectType}
                            >
                                <option value="">In/Out (All)</option>
                                {SelectGatePassType.map((data, index) => (
                                    <option key={index} value={data}>
                                        {data}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* From Date */}
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                From Date
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
                                To Date
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
                        <div className="col-span-full xl:col-span-1 flex flex-wrap lg:justify-end gap-3 pt-2">

                            <Button
                                className="flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-medium rounded-lg h-10 px-5 transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto"
                                onClick={handleSearch}
                            >
                                <FaSearch size={14} />
                                Search
                            </Button>

                            {checkpending('RCNPrimary') && (
                                <Button
                                    className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg h-10 px-5 transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-full sm:w-auto"
                                    onClick={exportToExcel}
                                >
                                    <LuDownload size={18} />
                                    Export
                                </Button>
                            )}
                        </div>

                    </div>
                </div>
        



                <Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">

                        <TableHead className="text-center" >Sl_No</TableHead>
                        <TableHead className="text-center" >GatePass_No.</TableHead>
                        <TableHead className="text-center" >Type</TableHead>
                        <TableHead className="text-center" >Receiving_Date</TableHead>
                        <TableHead className="text-center" >Entry_Vehicle_No</TableHead>
                          <TableHead className="text-center" >Initial_Wt(Kg)</TableHead>
                           <TableHead className="text-center" >Net_Wt(Kg)</TableHead>
                           <TableHead className="text-center" >Item_Invoice_No</TableHead>
                           <TableHead className="text-center" >Invoice_Date</TableHead>
                           <TableHead className="text-center" >Type_Of_Material</TableHead>
                           <TableHead className="text-center" >Store_Material_Item_Code(SKU)</TableHead>
                        <TableHead className="text-center" >Vendor_Name(Store_Item)</TableHead>
                        
                       
                        <TableHead className="text-center" >Invoice_Qty</TableHead>
                        <TableHead className="text-center" >Physical_Qty</TableHead>
                        <TableHead className="text-center" >Unit</TableHead>
                        <TableHead className="text-center" >Store_Item_Wt(Kg)</TableHead>
                        <TableHead className="text-center" > Bill_Amount</TableHead>
                     

                        <TableHead className="text-center" >Edit_Status</TableHead>
                        <TableHead className="text-center" >Store_Item_Remarks(Any)</TableHead>
                        <TableHead className="text-center" >Entried_By</TableHead>
                        <TableHead className="text-center" >Actioned_By</TableHead>
                        <TableHead className="text-center" >Action</TableHead>

                    </TableHeader>
                    <TableBody>
                        {EditData.length > 0 ? (
                            EditData.map((item: storeprimaryData, idx: number) => {

                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center">{idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold">{item.gatePassNo}</TableCell>
                                        <TableCell className="text-center text-red-500 font-semibold">{item.gateType}</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-600">{handletimezone(item.recevingDate)}</TableCell>
                                        <TableCell className="text-center ">{item.truckNo}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.grossWt)} </TableCell>
                                        <TableCell className="text-center ">{item.netWeight}  </TableCell>
                                        <TableCell className="text-center ">{item.invoice}</TableCell>
                                        <TableCell className="text-center ">{handletimezone(item.invoicedate)}</TableCell>
                                        <TableCell className="text-center ">{item.type}</TableCell>
                                        <TableCell className="text-center">{item.sku}</TableCell>
                                        <TableCell className="text-center">{item.vendorName}</TableCell>
                                        <TableCell className="text-center">{item.invoicequantity}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.quantity)}</TableCell>
                                        <TableCell className="text-center font-semibold">{item.unit}</TableCell>
                                        <TableCell className="text-center">{item.totalWt!=='0.00' ?formatNumber(item.totalWt):0} Kg</TableCell> 
                                        <TableCell className="text-center">{item.totalBill!=='0.00' ?formatNumber(item.totalBill):0} &#8377;</TableCell> 
                                        <TableCell className="text-center">{item.editStatus}</TableCell>
                                        <TableCell className="text-center">{item.remarks}</TableCell>
                                        <TableCell className="text-center">{item.createdBy}</TableCell>
                                        <TableCell className="text-center">{item.approvedBy}</TableCell>
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
                                                                <AlertDialogAction onClick={() => handleApprove(item.id)}>Continue</AlertDialogAction>
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
                                                                <AlertDialogAction onClick={() => handleRejection(item.id)}>Continue</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        ) : (
                            Data.length > 0 ? (Data.map((item: storeprimaryData, idx: number) => {


                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold">{item.gatePassNo}</TableCell>
                                        <TableCell className="text-center text-red-500 font-semibold">{item.gateType}</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-600">{handletimezone(item.recevingDate)}</TableCell>
                                        <TableCell className="text-center ">{item.truckNo}</TableCell>
                                        <TableCell className="text-center ">{formatNumber(item.grossWt)} </TableCell>
                                        <TableCell className="text-center ">{item.netWeight}  </TableCell>
                                        <TableCell className="text-center ">{item.invoice}</TableCell>
                                        <TableCell className="text-center ">{handletimezone(item.invoicedate)}</TableCell>
                                        <TableCell className="text-left ">{item.type}</TableCell>
                                        <TableCell className="text-left">{item.sku}</TableCell>
                                        <TableCell className="text-left">{item.vendorName}</TableCell>
                                        <TableCell className="text-center">{item.invoicequantity}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.quantity)}</TableCell>
                                        <TableCell className="text-center font-semibold">{item.unit}</TableCell>
                                        <TableCell className="text-center">{item.totalWt!=='0.00' ?formatNumber(item.totalWt) :0} Kg</TableCell> 
                                        <TableCell className="text-center">{item.totalBill!=='0.00' ?formatNumber(item.totalBill) :0} &#8377;</TableCell>   
                                        <TableCell className="text-center">{item.editStatus}</TableCell>
                                        <TableCell className="text-center">{item.remarks}</TableCell>
                                        <TableCell className="text-center">{item.createdBy}</TableCell>
                                        <TableCell className="text-center">{item.approvedBy}</TableCell>
                                        <TableCell className="text-center">
                                            <Popover>
                                                <PopoverTrigger>
                                                    <button className={`p-2 text-white rounded ${item.editStatus === 'Pending' ? 'bg-cyan-200' : 'bg-cyan-500'}`} disabled={item.editStatus === 'Pending' ? true : false}>Action</button>
                                                </PopoverTrigger>
                                                <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                                    <Dialog>
                                                        <DialogTrigger className="flex"><CiEdit size={20} />
                                                            <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500">Modify</button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-3xl">
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className='text-lg text-gray-600 text-center pt-4 tracking-wider drop-shadow-xl font-bold'>Store Item Modification</p>
                                                                </DialogTitle>
                                                                <DialogDescription>
                                                                    <p className='text-1xl text-center'>To Be Filled Up By Store Receving Supervisor</p>
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <StorePrimaryModify data={item} />
                                                            
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
                                <TableCell><p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">No Result </p></TableCell>
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
                <Pagination className="pt-5 ">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => setPage((prev) => {
                                if (prev === 1) {
                                    return prev
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
export default StorePrimaryTable;