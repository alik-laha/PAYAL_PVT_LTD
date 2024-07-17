import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { LuDownload } from "react-icons/lu";
import { format, toZonedTime } from 'date-fns-tz'
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react"
import { Input } from "../ui/input";
// import DatePicker from "../common/DatePicker";
import { PermissionRole, RcnPrimaryEntryData, pendingCheckRoles } from "@/type/type";
import { ExcelRcnPrimaryEntryData } from "@/type/type";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { pageNo, pagelimit, pendingCheckRole } from "../common/exportData"
import { FcApprove, FcDisapprove } from "react-icons/fc";


import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Origin } from "../common/exportData"
import { useState } from "react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import RcnPrimaryModify from './RcnPrimaryModify'
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
import axios from "axios";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useContext } from "react";
import Context from "../context/context";
import { EditPendingData } from "@/type/type";
import { CiEdit } from "react-icons/ci";

const RcnPrimaryEntryTable = () => {
    const [origin, setOrigin] = useState<string>("")
    const [fromdate, setfromDate] = React.useState<string>('');
    const [todate, settoDate] = React.useState<string>('');
    const [hidetodate, sethidetoDate] = React.useState<string>('');
    const [blConNo, setBlConNo] = useState<string>("")
    const [Data, setData] = useState<RcnPrimaryEntryData[]>([])
    const [page, setPage] = useState(pageNo)
    const [EditData, setEditData] = useState<EditPendingData[]>([])
    const limit = pagelimit
    const { editPendingData } = useContext(Context);
    const [blockpagen, setblockpagen] = useState('flex')
    const currDate = new Date().toLocaleDateString();
    const approvesuccessdialog = document.getElementById('rcneditapproveScsDialog') as HTMLInputElement;
    const approvecloseDialogButton = document.getElementById('rcneditScscloseDialog') as HTMLInputElement;

    const rejectsuccessdialog = document.getElementById('rcneditapproveRejectDialog') as HTMLInputElement;
    const rejectcloseDialogButton = document.getElementById('rcneditRejectcloseDialog') as HTMLInputElement;

    //const [transformedData, setTransformedData] = useState<ExcelRcnPrimaryEntryData[]>([]);

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

    const formatNumberWithSign = (number: number) => {
        if (number > 0) {
            return `+${number}`;
        } else {
            return `${number}`;
        }
    };

    useEffect(() => {
        if (editPendingData) {
            //console.log(editPendingData)
            setEditData(editPendingData)
            setblockpagen('none')
        }
    }, [editPendingData])

    const handleSearch = async () => {
        //console.log('search button pressed')
        setEditData([])
        setblockpagen('flex')
        const response = await axios.put('/api/rcnprimary/rcnprimarysearch', {
            blConNo: blConNo,
            origin: origin,
            fromDate: fromdate,
            toDate: todate
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
        handleSearch()
        setPage((prev) => {
            if (prev <= 0) {
                return prev + 1
            }
            return prev
        })
    }, [page])

    const exportToExcel = async () => {
        const response = await axios.put('/api/rcnprimary/rcnprimarysearch', {
            blConNo: blConNo,
            origin: origin,
            fromDate: fromdate,
            toDate: todate
        })
        const data1 = await response.data

        let ws
        let transformed: ExcelRcnPrimaryEntryData[] = [];
        if (EditData.length > 0) {

            transformed = EditData.map((item: EditPendingData, idx: number) => ({
                SL_No: idx + 1,
                Date: handletimezone(item.date),
                Origin: item.origin,
                Bl_No: item.blNo,
                Con_No: item.conNo,
                RCN_QC_Status: item.rcnStatus,
                No_Of_Bags: item.noOfBags,
                Truck_No: item.truckNo,
                Bl_Weight: item.blWeight,
                Net_Weight: item.netWeight,
                Difference: item.difference,
                Edit_Status: item.editStatus,
                Created_by: item.editedBy,
                // received by is updated as editedby in edit rcn table
                Approved_or_Reverted_By: item.approvedBy
                // approvedBy is not there in edit rcn table
            }));
            //setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else {
            transformed = data1.rcnEntries.map((item: RcnPrimaryEntryData, idx: number) => ({
                SL_No: idx + 1,
                Origin: item.origin,
                Bl_No: item.blNo,
                Con_No: item.conNo,
                RCN_QC_Status: item.rcnStatus,
                Date: handletimezone(item.date),
                No_Of_Bags: item.noOfBags,
                Truck_No: item.truckNo,
                Bl_Weight: item.blWeight,
                Net_Weight: item.netWeight,
                Difference: item.difference,
                Edit_Status: item.editStatus,
                Created_by: item.receivedBy,
                Approved_or_Rejected_By: item.approvedBy

            }));
            // setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'RCN_Primary_Entry_' + currDate + '.xlsx');
    };

    const handleRejection = async (item: RcnPrimaryEntryData) => {
        const response = await axios.delete(`/api/rcnprimary/rejectededitrcn/${item.id}`)
        const data = await response.data
        console.log(data)
        if (data.message === "Rcn Entry rejected successfully") {
            //console.log('rejected enter')
            if (rejectsuccessdialog != null) {
                (rejectsuccessdialog as any).showModal();
            }
        }
    }
    const handleApprove = async (item: RcnPrimaryEntryData) => {
        const response = await axios.put(`/api/rcnprimary/approveeditrcn/${item.id}`)
        const data = await response.data
        if (data.message === "Edit Request of Rcn Entry is Approved Successfully") {

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


    return (
        <div className="ml-5 mt-5 ">

            <div className="flex flexbox-search">

                <Input className="no-padding w-1/5 flexbox-search-width" placeholder=" BL No. / Con No." value={blConNo} onChange={(e) => setBlConNo(e.target.value)} />

                <select className='flexbox-search-width flex h-8 w-1/5 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
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
                <Input className="w-1/6 flexbox-search-width-calender"
                    type="date"
                    value={fromdate}
                    onChange={(e) => setfromDate(e.target.value)}
                    placeholder="From Date"

                />
                <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-right">To </label>
                <Input className="w-1/6 flexbox-search-width-calender"
                    type="date"
                    value={hidetodate}
                    onChange={handleTodate}
                    placeholder="To Date"

                />


                <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>

            </div>
            {checkpending('RCNPrimary') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}



            <Table className="mt-4">
                <TableHeader className="bg-neutral-100 text-stone-950 ">

                    <TableHead className="text-center" >Id</TableHead>
                    <TableHead className="text-center" >Origin</TableHead>
                    <TableHead className="text-center" >Date of Receiving </TableHead>
                    <TableHead className="text-center" >BL No.</TableHead>
                    <TableHead className="text-center" >Con No.</TableHead>
                    <TableHead className="text-center" >Truck No.</TableHead>

                    <TableHead className="text-center" >BL Weight</TableHead>
                    <TableHead className="text-center" >Net Weight</TableHead>
                    <TableHead className="text-center" >Difference</TableHead>
                    <TableHead className="text-center" >Bag Count</TableHead>
                    <TableHead className="text-center" >QC Status</TableHead>
                    <TableHead className="text-center" >Edit Status </TableHead>
                    <TableHead className="text-center" >Entried By </TableHead>
                    <TableHead className="text-center" >Action</TableHead>

                </TableHeader>
                <TableBody>
                    {EditData.length > 0 ? (
                        EditData.map((item: EditPendingData, idx) => {

                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">{idx + 1}</TableCell>
                                    <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                    <TableCell className="text-center">{handletimezone(item.date)}</TableCell>
                                    <TableCell className="text-center">{item.blNo}</TableCell>
                                    <TableCell className="text-center">{item.conNo}</TableCell>
                                    <TableCell className="text-center">{item.truckNo}</TableCell>

                                    <TableCell className="text-center">{item.blWeight}</TableCell>
                                    <TableCell className="text-center">{item.netWeight}</TableCell>

                                    {Number(item.difference) < 0 ? (<TableCell className="text-center font-semibold text-red-600">{formatNumberWithSign(Number(item.difference))}</TableCell>)
                                        : (<TableCell className="text-center font-semibold text-green-600">{formatNumberWithSign(Number(item.difference))}</TableCell>)}

                                    <TableCell className="text-center font-semibold">{item.noOfBags}</TableCell>
                                    <TableCell className="text-center ">
                                        {item.rcnStatus === 'QC Approved' ? (
                                            <button className="bg-green-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.rcnStatus}</button>
                                        ) : item.rcnStatus === 'QC Pending' ? (
                                            <button className="bg-yellow-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.rcnStatus}</button>
                                        ) : (
                                            <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.rcnStatus}</button>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">{item.editStatus == 'Created' ?
                                        'NA' : item.editStatus}</TableCell>
                                    <TableCell className="text-center">{item.editedBy}</TableCell>
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
                            );
                        })
                    ) : (
                        Data.length > 0 ? (Data.map((item: RcnPrimaryEntryData, idx) => {


                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                    <TableCell className="text-center font-semibold text-cyan-600">{item.origin}</TableCell>
                                    <TableCell className="text-center">{handletimezone(item.date)}</TableCell>
                                    <TableCell className="text-center">{item.blNo}</TableCell>
                                    <TableCell className="text-center">{item.conNo}</TableCell>
                                    <TableCell className="text-center">{item.truckNo}</TableCell>

                                    <TableCell className="text-center">{item.blWeight}</TableCell>
                                    <TableCell className="text-center">{item.netWeight}</TableCell>
                                    {Number(item.difference) < 0 ? (<TableCell className="text-center font-semibold text-red-600">{formatNumberWithSign(Number(item.difference))}</TableCell>)
                                        : (<TableCell className="text-center font-semibold text-green-600">{formatNumberWithSign(Number(item.difference))}</TableCell>)}
                                    <TableCell className="text-center font-semibold">{item.noOfBags}</TableCell>
                                    <TableCell className="text-center">
                                        {item.rcnStatus === 'QC Approved' ? (
                                            <button className="bg-green-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.rcnStatus}</button>
                                        ) : item.rcnStatus === 'QC Pending' ? (
                                            <button className="bg-yellow-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.rcnStatus}</button>
                                        ) : (
                                            <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.rcnStatus}</button>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">{item.editStatus == 'Created' ?
                                        'NA' : item.editStatus}</TableCell>
                                    <TableCell className="text-center">{item.receivedBy}</TableCell>
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
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <p className='text-1xl pb-1 text-center mt-5'>RCN Primary Entry Modification</p>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <RcnPrimaryModify data={item} />
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
    )

}
export default RcnPrimaryEntryTable;

