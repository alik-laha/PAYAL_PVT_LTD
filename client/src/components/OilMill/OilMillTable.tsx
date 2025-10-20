import axios from "axios";
import { pagelimit, pageNo, pendingCheckRole } from "../common/exportData";
import { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import {  OilMillPrimaryExcelEntryData, findskutypeData, OilMillPrimaryEntryData, pendingCheckRoles, PermissionRole } from "@/type/type";
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
import OilMillModify from "./OilMillModify";
// import AgarbatiModify from "./AgarbatiModify";


const OilMillTable = () => {
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
   

    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
    //const [hidetodate, sethidetoDate] = useState<string>('');
    const [blConNo, setBlConNo] = useState<string>("")
    const currDate = new Date().toLocaleDateString();
    const [origin, setOrigin] = useState<string>("")

    const [Data, setData] = useState<any[]>([])
    const [sku, setsku] = useState<findskutypeData[]>([])
  

    const [EditData, setEditData] = useState<OilMillPrimaryEntryData[]>([])
    const { editPendingOilMillData } = useContext(Context);
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
        const response = await axios.put('/api/oilMill/oilMillprimarysearch', {
            searchitem: blConNo,
          
            fromDate: fromdate,
            toDate: todate,
            almondtype: origin,
            

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
        if (editPendingOilMillData.length > 0) {
            //console.log(editPendingData)
            setEditData(editPendingOilMillData)
            setblockpagen('none')
        }
    }, [editPendingOilMillData])

    useEffect(() => {
        axios.put('/api/vendorSKU/getItembySection/Item Type', { section: 'OilMill' })
            .then(res => {
                //console.log(res.data)
                setsku(res.data)
                //console.log(sku)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    const handleRejection = async (item: OilMillPrimaryEntryData) => {
        const response = await axios.delete(`/api/oilMill/rejectededitOilMill/${item.id}`)
        const data = await response.data
        console.log(data)
        if (data.message === "OilMill Entry rejected successfully") {
            //console.log('rejected enter')
            if (rejectsuccessdialog != null) {
                (rejectsuccessdialog as any).showModal();
            }
        }
    }

    const exportToExcel = async () => {
        const response = await axios.put('/api/oilMill/oilMillprimarysearch', {
            searchitem: blConNo,
          
            fromDate: fromdate,
            toDate: todate,
            almondtype: origin,
            
          
        })
        const data1 = await response.data

        let ws
        let transformed: OilMillPrimaryExcelEntryData[] = [];
        if (EditData.length > 0) {

            transformed = EditData.map((item: OilMillPrimaryEntryData, idx: number) => ({
               
                
                id: idx + 1,
                gatePassNo:item.gatePassNo,
                gateType:item.gateType,
                ReceivingDate: handletimezone(item.recevingDate),
                Vehicle_No:item.truckNo,
                vendorName:item.vendorName,
                grossWt:formatNumber(item.grossWt),
                netWeight:item.netWeight ? item.netWeight : 0 ,
                type:item.type,
               
                invoice:item.invoice,
                invoicedate:handletimezone(item.invoicedate),
                totalWt:item.totalWt ? formatNumber(item.totalWt):0 ,
                totalBill:item.totalBill ? formatNumber(item.totalBill):0 ,
                Item_Count:item.quantity,
                editStatus:item.editStatus,createdBy:item.createdBy,ActionedBy:item.approvedBy
    
            }));
            //setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else {
            transformed = data1.rcnEntries.map((item: OilMillPrimaryEntryData, idx: number) => ({
                id: idx + 1,
                gatePassNo:item.gatePassNo,
                gateType:item.gateType,
                ReceivingDate: handletimezone(item.recevingDate),
                Vehicle_No:item.truckNo,
                vendorName:item.vendorName,
                grossWt:formatNumber(item.grossWt),
                netWeight:item.netWeight ? item.netWeight : 0 ,
                type:item.type,
                
                invoice:item.invoice,
                invoicedate:handletimezone(item.invoicedate),
                totalWt:item.totalWt ? formatNumber(item.totalWt):0 ,
                totalBill:item.totalBill ? formatNumber(item.totalBill):0 ,
                Item_Count:item.quantity,
                editStatus:item.editStatus,createdBy:item.createdBy,ActionedBy:item.approvedBy

            }));
            // setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'OilMill_Primary_Entry_' + currDate + '.xlsx');


    }
    const handleApprove = async (item: OilMillPrimaryEntryData) => {
        const response = await axios.put(`/api/oilMill/approveeditOilMill/${item.id}`)
        const data = await response.data
        if (data.message === "Edit Request of OilMill Entry is Approved Successfully") {

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 items-end">

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

                        {/* Type (All) */}
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
                                {sku.map((data, index) => (
                                    <option key={index} value={data.sku}>
                                        {data.sku}
                                    </option>
                                ))}
                            </select>
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
                         {/* Search & Export Buttons */}
            <div className="flex flex-wrap justify-end md:justify-start gap-3 mt-2 md:mt-0">
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

                
                <Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">


                        <TableHead className="text-center" >Id</TableHead>
                        <TableHead className="text-center" >GatePass_No</TableHead>

                        <TableHead className="text-center" >GatePass_Type</TableHead>
                        <TableHead className="text-center" >Receiving_Date</TableHead>
                        <TableHead className="text-center" >Entry_Vehicle_No</TableHead>

                        <TableHead className="text-center" >Initial_Weight(Kg)</TableHead>
                        <TableHead className="text-center" >OilMill_Type</TableHead>
                     
                        <TableHead className="text-center" >Oilmill_Item_Invoice_No.</TableHead>
                        <TableHead className="text-center" >Invoice_Date</TableHead>

                        <TableHead className="text-center" >Net_Weight(Kg)</TableHead>

                        <TableHead className="text-center" >Oilmill_Item_Vendor_Name</TableHead>
                        <TableHead className="text-center" >Bag/Item_Count</TableHead>
                        <TableHead className="text-center" >Row_Weight</TableHead> 
                        <TableHead className="text-center" >Bill_Amount(Rs)</TableHead>
                        <TableHead className="text-center" >Edit_Status </TableHead>

                        <TableHead className="text-center" >Action</TableHead>
                    </TableHeader>

                    <TableBody>


                        {EditData.length > 0 ? (EditData.map((item: OilMillPrimaryEntryData, idx) => {

                            return (
                                <TableRow key={item.id}>
                                <TableCell className="text-center">{idx + 1}</TableCell>
                                <TableCell className="text-center font-bold">{item.gatePassNo}</TableCell>
                                <TableCell className="text-center font-semibold text-cyan-600">{item.gateType}</TableCell>
                                <TableCell className="text-center">{handletimezone(item.recevingDate)}</TableCell>

                                <TableCell className="text-center">{item.truckNo}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.grossWt)} </TableCell>
                                <TableCell className="text-center">{item.type}</TableCell>
                            
                                <TableCell className="text-center">{item.invoice}</TableCell>
                                <TableCell className="text-center">{handletimezone(item.invoicedate)}</TableCell>
                                <TableCell className="text-center">{item.netWeight ? item.netWeight : 0} </TableCell>

                                <TableCell className="text-center">{item.vendorName}</TableCell>
                                <TableCell className="text-center font-semibold">{item.quantity}</TableCell>

                                <TableCell className="text-center" >{item.totalWt ?formatNumber(item.totalWt):0}</TableCell> 
                                <TableCell className="text-center font-semibold">{item.totalBill ? formatNumber(item.totalBill):0 } &#8377;</TableCell>
                                <TableCell className="text-center">{item.editStatus}</TableCell>
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

                            Data.length > 0 ? (Data.map((item: OilMillPrimaryEntryData, idx) => {


                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                        <TableCell className="text-center font-bold">{item.gatePassNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-600">{item.gateType}</TableCell>
                                        <TableCell className="text-center">{handletimezone(item.recevingDate)}</TableCell>

                                        <TableCell className="text-center">{item.truckNo}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.grossWt)}</TableCell>
                                        <TableCell className="text-center">{item.type}</TableCell>
                                   
                                        <TableCell className="text-center">{item.invoice}</TableCell>
                                        <TableCell className="text-center">{handletimezone(item.invoicedate)}</TableCell>
                                        <TableCell className="text-center">{item.netWeight ? item.netWeight : 0} </TableCell>

                                        <TableCell className="text-center">{item.vendorName}</TableCell>
                                        <TableCell className="text-center font-semibold">{item.quantity}</TableCell>

                                      <TableCell className="text-center" >{item.totalWt ?formatNumber(item.totalWt):0}</TableCell> 
                                        <TableCell className="text-center font-semibold">{item.totalBill ? formatNumber(item.totalBill):0} &#8377;</TableCell>
                                        <TableCell className="text-center">{item.editStatus}</TableCell>

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
                                                        <DialogContent className="max-w-3xl">
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className='text-lg text-gray-600 text-center my-3 tracking-wider drop-shadow-xl font-bold'>OilMill Entry Modification</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <OilMillModify data={item} />
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

export default OilMillTable