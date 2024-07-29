import { useContext, useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import React from "react"
import axios from "axios"
import { pageNo, pagelimit } from "../common/exportData"
import { FaSearch } from "react-icons/fa"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { format, toZonedTime } from 'date-fns-tz'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,

//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import { FcApprove, FcDisapprove } from "react-icons/fc"
// import { MdOutlineDriveFolderUpload } from "react-icons/md";
// import { LiaEdit } from "react-icons/lia";
import QCreportForm from "./PackagingMetrialCreateQuality"
// import QCmodifyreportForm from './QCmodifyreportForm'
import tick from '../../assets/Static_Images/Flat_tick_icon.svg.png'
import cross from '../../assets/Static_Images/error_img.png'
import { pendingCheckRole } from '../common/exportData';
import { PermissionRole, pendingCheckRoles, PackagingMeterialQc } from "@/type/type";
// import { saveAs } from 'file-saver';
// import * as XLSX from 'xlsx';
import Context from "../context/context"
import { CiEdit } from "react-icons/ci"


const QCPackageMaterialTable = () => {
    const [fromdate, setfromDate] = React.useState<string>('');
    const [todate, settoDate] = React.useState<string>('');
    const [hidetodate, sethidetoDate] = React.useState<string>('');
    const [searchData, setSearchData] = useState<string>("")
    const [Data, setData] = useState<PackagingMeterialQc[]>([])
    const [page, setPage] = useState(pageNo)
    //const [EditData, setEditData] = useState<EditPendingData[]>([])
    const limit = pagelimit
    const [blockpagen, setblockpagen] = useState('flex')
    const [pendingData, setPendingData] = useState<PackagingMeterialQc[]>([])
    const [counteditpending, setcounteditpending] = useState<number>(2)
    const { pendingqccount } = useContext(Context);

    const approvesuccessdialog = document.getElementById('qcapproveScsDialog') as HTMLInputElement;
    const approvecloseDialogButton = document.getElementById('qcapproveScscloseDialog') as HTMLInputElement;

    const rejectsuccessdialog = document.getElementById('qcRejectDialog') as HTMLInputElement;
    const rejectcloseDialogButton = document.getElementById('qcrejectcloseDialog') as HTMLInputElement;
    const [successtext, setSuccessText] = React.useState<string>('');
    const [errortext, seterrorText] = React.useState<string>('');
    //const [transformedData, setTransformedData] = useState<QcRcnEntryExcelData[]>([]);
    const Role = localStorage.getItem('role') as keyof PermissionRole
    // const currDate = new Date().toLocaleDateString();

    // const exportToExcel = async () => {
    //     const response = await axios.put('/api/qcRcn/searchqcRcn', {
    //         blConNo: blConNo,
    //         origin: origin,
    //         fromDate: fromdate,
    //         toDate: todate
    //     })
    //     const data1 = await response.data

    //     let ws
    //     let transformed: QcRcnEntryExcelData[] = [];
    //     if (pendingData.length > 0) {

    //         transformed = pendingData.map((item: QcRcnEntryData, idx: number) => ({
    //             id: idx + 1,
    //             blNo: item.blNo,
    //             conNo: item.conNo,
    //             date: item.date,
    //             origin: item.origin,
    //             truckNo: item.rcnEntry.truckNo,
    //             BLWeight: item.rcnEntry.blWeight,
    //             NoOfBags: item.rcnEntry.noOfBags,
    //             QCStatus: item.rcnEntry.rcnStatus,
    //             sampling: item.sampling,
    //             moisture: item.moisture,
    //             nutCount: item.nutCount,
    //             fluteRate: item.fluteRate,
    //             goodKernel: item.goodKernel,
    //             spIm: item.spIm,
    //             reject: item.reject,
    //             shell: item.shell,
    //             outTurn: item.outTurn,
    //             Remarks: item.Remarks,
    //             qcapprovedBy: item.qcapprovedBy,
    //             reportStatus: item.reportStatus === 1 ? 'Done' : 'Pending',
    //             EntriedBy: item.createdBy,
    //             editStatus: item.editStatus,
    //             editapprovedorRejectedBy: item.editapprovedBy,

    //         }));
    //         //setTransformedData(transformed);
    //         ws = XLSX.utils.json_to_sheet(transformed);
    //     }
    //     else {
    //         transformed = data1.rcnEntries.map((item: QcRcnEntryData, idx: number) => ({
    //             id: idx + 1,
    //             blNo: item.blNo,
    //             conNo: item.conNo,
    //             date: item.date,
    //             origin: item.origin,
    //             truckNo: item.rcnEntry.truckNo,
    //             BLWeight: item.rcnEntry.blWeight,
    //             NoOfBags: item.rcnEntry.noOfBags,
    //             QCStatus: item.rcnEntry.rcnStatus,
    //             sampling: item.sampling,
    //             moisture: item.moisture,
    //             nutCount: item.nutCount,
    //             fluteRate: item.fluteRate,
    //             goodKernel: item.goodKernel,
    //             spIm: item.spIm,
    //             reject: item.reject,
    //             shell: item.shell,
    //             outTurn: item.outTurn,
    //             Remarks: item.Remarks,
    //             qcapprovedBy: item.qcapprovedBy,
    //             reportStatus: item.reportStatus === 1 ? 'Done' : 'Pending',
    //             EntriedBy: item.createdBy,
    //             editStatus: item.editStatus,
    //             editapprovedorRejectedBy: item.editapprovedBy,

    //         }));
    //         // setTransformedData(transformed);
    //         ws = XLSX.utils.json_to_sheet(transformed);
    //     }
    //     const wb = XLSX.utils.book_new();
    //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    //     const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    //     const blob = new Blob([wbout], { type: 'application/octet-stream' });
    //     saveAs(blob, 'QC_RCN_Entry_' + currDate + '.xlsx');
    // };

    if (approvecloseDialogButton) {
        approvecloseDialogButton.addEventListener('click', () => {
            if (approvesuccessdialog != null) {
                (approvesuccessdialog as any).close();
                window.location.reload()
            }

        });
    }

    if (rejectcloseDialogButton) {
        rejectcloseDialogButton.addEventListener('click', () => {
            if (rejectsuccessdialog != null) {
                (rejectsuccessdialog as any).close();
                window.location.reload()
            }


        });
    }


    const handleSearchPendingQC = async () => {

        //setblockpagen('flex')
        const response = await axios.post('/api/qcpackage/package_material_view', {
            qualityStatus: false
        })
        const data = await response.data
        if (data.rcnEntries.length === 0 && page > 1) {
            setPage((prev) => prev - 1)

        }
        setData(data.rcnEntries)
        setblockpagen('none')

    }

    const handleSearchPendingEdit = async () => {
        setData([])
        const response = await axios.get('/api/qcRcn/getTotalEditQC')
        const data = await response.data
        setPendingData(data.rcnEdit)
        setblockpagen('none')

    }


    const handleSearch = async () => {
        //console.log('search button pressed')
        setPendingData([])

        setblockpagen('flex')
        const response = await axios.post('/api/qcpackage/package_material_view', {
            searchData: searchData,
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
        setcounteditpending(data.CountPendingEdit)

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

    // const handleEditApprove = async (item: QcRcnEntryData) => {
    //     const response = await axios.put(`/api/qcRcn/approveEditQcReport/${item.id}`)
    //     const data = await response.data

    //     if (data.message === "Edit Request of QC Report is Approved Successfully") {
    //         setSuccessText(data.message)
    //         if (approvesuccessdialog != null) {
    //             (approvesuccessdialog as any).showModal();
    //         }
    //     }

    // }

    // const handleQCApprove = async (item: PackagingMeterialQc) => {
    //     const response = await axios.put(`/api/qcRcn/qcRcnApprove/${item.id}`)
    //     const data = await response.data

    //     if (data.message === "QC Approval of Rcn Entry is made Successfully") {
    //         setSuccessText(data.message)
    //         if (approvesuccessdialog != null) {
    //             (approvesuccessdialog as any).showModal();
    //         }



    //     }

    // }

    // const handleQCReject = async (item: PackagingMeterialQc) => {
    //     const response = await axios.put(`/api/qcRcn/qcRcnReject/${item.id}`)
    //     const        link.download = path.substring(26);sage === "QC Approval of Rcn Entry is Rejected Successfully") {
    //         seterrorText(data.message)
    //         if (rejectsuccessdialog != null) {
    //             (rejectsuccessdialog as any).showModal();
    //         }
    //     }

    // }
    const checkpending = (tab: string) => {
        //console.log(Role)
        if (pendingCheckRole[tab as keyof pendingCheckRoles].includes(Role)) {
            return true
        }
        else {
            return false;
        }

    }

    function handletimezone(date: string | Date) {
        const apidate = new Date(date);
        const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);
        const finaldate = format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
        return finaldate;
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
    const handleDownload = async (path: string) => {
        try {
            console.log(path);
            const response = await fetch(`/api/qcpackage/downloadData?path=${encodeURIComponent(path)}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = path.substring(26);
            document.body.appendChild(link); // Append link to the body
            link.click();
            document.body.removeChild(link); // Remove the link after clicking
        } catch (error) {
            console.error('Error downloading the file:', error);
        }
    };
    return (
        // disabled={pendingqccount === 0 ? true : false}
        <div className="ml-5 mt-5 ">
            <Button className="bg-lime-500 mb-5 mt-5 max-w-52 responsive-button-adjust" onClick={handleSearchPendingQC} >Pending QC ({pendingqccount})</Button>
            {checkpending('QCRCN') && <Button className="bg-orange-400 mb-5 ml-4 max-w-52 responsive-button-adjust responsive-no-margin" onClick={handleSearchPendingEdit} disabled={counteditpending === 0 ? true : false}>
                Pending Edit ({counteditpending})</Button>}

            <div className="flex flexbox-search">



                <Input className="no-padding w-1/5 flexbox-search-width" placeholder=" Sku. / VendorName." value={searchData} onChange={(e) => setSearchData(e.target.value)} />

                <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-left">From </label>
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
            {/* {checkpending('QCRCN') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>} */}

            <Table className="mt-4">
                <TableHeader className="bg-neutral-100 text-stone-950 ">

                    <TableHead className="text-center" >Id</TableHead>
                    <TableHead className="text-center" >Receving Date</TableHead>
                    <TableHead className="text-center" >Invoice Date </TableHead>

                    <TableHead className="text-center" >Invoice</TableHead>
                    <TableHead className="text-center" >Sku</TableHead>
                    <TableHead className="text-center" >Vendor Name</TableHead>
                    <TableHead className="text-center" >quantity</TableHead>
                    <TableHead className="text-center" >unit</TableHead>
                    <TableHead className="text-center" >QC Status</TableHead>
                    <TableHead className="text-center" >Created By</TableHead>

                    <TableHead className="text-center" >Testing Date</TableHead>
                    <TableHead className="text-center" >length</TableHead>
                    <TableHead className="text-center" >Width</TableHead>
                    <TableHead className="text-center" >Height</TableHead>
                    <TableHead className="text-center" >Gsm</TableHead>
                    <TableHead className="text-center" >Avg Weight</TableHead>
                    <TableHead className="text-center" >Leakage Test</TableHead>
                    <TableHead className="text-center" >Drop Test</TableHead>
                    <TableHead className="text-center" >Seal Condition</TableHead>
                    <TableHead className="text-center" >Labeling Condition</TableHead>
                    <TableHead className="text-center" >Coa</TableHead>
                    <TableHead className="text-center" >FoodGrade Cirtificate</TableHead>
                    <TableHead className="text-center" >Remarks</TableHead>
                    <TableHead className="text-center" >FoodGrade Report Download</TableHead>
                    <TableHead className="text-center" >Coa Report Download</TableHead>

                    <TableHead className="text-center" >Report By</TableHead>
                    <TableHead className="text-center" >Edit Status</TableHead>

                    <TableHead className="text-center" >Action</TableHead>

                </TableHeader>
                <TableBody>

                    {pendingData.length > 0 ?
                        (pendingData.map((item: PackagingMeterialQc, idx) => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                    <TableCell className="text-center font-semibold text-cyan-600">{handletimezone(item.packagingMaterialreceving.recevingDate)}</TableCell>
                                    <TableCell className="text-center">{handletimezone(item.packagingMaterialreceving.invoicedate)}</TableCell>

                                    <TableCell className="text-center">{item.packagingMaterialreceving.invoice}</TableCell>
                                    <TableCell className="text-center">{item.packagingMaterialreceving.sku}</TableCell>
                                    <TableCell className="text-center">{item.packagingMaterialreceving.vendorName}</TableCell>
                                    <TableCell className="text-center">{item.packagingMaterialreceving.quantity}</TableCell>
                                    <TableCell className="text-center">{item.packagingMaterialreceving.unit}</TableCell>
                                    <TableCell className="text-center">
                                        {item.packagingMaterialreceving.qualityStatus ? (
                                            <button className="bg-green-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.packagingMaterialreceving.qualityStatus}</button>
                                        ) : (
                                            <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.packagingMaterialreceving.qualityStatus}</button>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">{item.packagingMaterialreceving.createdBy}</TableCell>
                                    <TableCell className="text-center font-bold">{handletimezone(item.testingDate)}</TableCell>
                                    <TableCell className="text-center font-bold">{item.length}</TableCell>
                                    <TableCell className="text-center font-bold">{item.width}</TableCell>
                                    <TableCell className="text-center font-bold">{item.height}</TableCell>
                                    <TableCell className="text-center font-bold">{item.gsm}</TableCell>
                                    <TableCell className="text-center font-bold">{item.avgWeight}</TableCell>
                                    <TableCell className="text-center font-bold">{item.leakageTest}</TableCell>
                                    <TableCell className="text-center font-bold">{item.dropTest}</TableCell>
                                    <TableCell className="text-center font-bold text-red-500">{item.sealCondition}</TableCell>
                                    <TableCell className="text-center">{item.labelingCondition}</TableCell>
                                    <TableCell className="text-center">{item.coa}</TableCell>
                                    <TableCell className="text-center">{item.foodGradeCirtiicate}</TableCell>
                                    <TableCell className="text-center">{item.remarks}</TableCell>
                                    <TableCell className="text-center">{item.foodGradeCirtificateStatus}</TableCell>
                                    <TableCell className="text-center">{item.coaCirtificateStatus}</TableCell>
                                    <TableCell className="text-center">{item.qcBy}</TableCell>
                                    <TableCell className="text-center">{item.editStatus}</TableCell>
                                    <TableCell className="text-center">
                                        action

                                    </TableCell>
                                </TableRow>
                            );
                        })
                        ) : (

                            Data.length > 0 ? (Data.map((item: PackagingMeterialQc, idx) => {
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-600">{handletimezone(item.packagingMaterialreceving.recevingDate)}</TableCell>
                                        <TableCell className="text-center">{handletimezone(item.packagingMaterialreceving.invoicedate)}</TableCell>

                                        <TableCell className="text-center">{item.packagingMaterialreceving.invoice}</TableCell>
                                        <TableCell className="text-center">{item.packagingMaterialreceving.sku}</TableCell>
                                        <TableCell className="text-center">{item.packagingMaterialreceving.vendorName}</TableCell>
                                        <TableCell className="text-center">{item.packagingMaterialreceving.quantity}</TableCell>
                                        <TableCell className="text-center">{item.packagingMaterialreceving.unit}</TableCell>
                                        <TableCell className="text-center">
                                            {item.packagingMaterialreceving.qualityStatus ? (
                                                <button className="bg-green-500 p-1 text-white rounded fix-button-width-rcnprimary">Done</button>
                                            ) : (
                                                <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">Pending</button>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">{item.packagingMaterialreceving.createdBy}</TableCell>
                                        <TableCell className="text-center font-bold">{handletimezone(item.testingDate)}</TableCell>
                                        <TableCell className="text-center font-bold">{item.length}</TableCell>
                                        <TableCell className="text-center font-bold">{item.width}</TableCell>
                                        <TableCell className="text-center font-bold">{item.height}</TableCell>
                                        <TableCell className="text-center font-bold">{item.gsm}</TableCell>
                                        <TableCell className="text-center font-bold">{item.avgWeight}</TableCell>
                                        <TableCell className="text-center font-bold">{
                                            item.leakageTest === "Pass" ? (
                                                <button className="bg-green-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.leakageTest}</button>
                                            ) : (
                                                item.leakageTest === "Fail" ? (
                                                    <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.leakageTest}</button>
                                                ) : (null)
                                            )
                                        }</TableCell>
                                        <TableCell className="text-center font-bold">{item.dropTest === "Pass" ? (
                                            <button className="bg-green-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.dropTest}</button>
                                        ) : (
                                            item.dropTest === "Fail" ? (
                                                <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.dropTest}</button>
                                            ) : (null)
                                        )}</TableCell>
                                        <TableCell className="text-center font-bold text-red-500">{item.sealCondition === "OK" ? (
                                            <button className="bg-green-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.sealCondition}</button>
                                        ) : (
                                            item.sealCondition === "Not OK" ? (
                                                <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.sealCondition}</button>
                                            ) : (null)
                                        )}</TableCell>
                                        <TableCell className="text-center">{item.labelingCondition === "OK" ? (
                                            <button className="bg-green-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.labelingCondition}</button>
                                        ) : (
                                            item.labelingCondition === "Not OK" ? (
                                                <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.labelingCondition}</button>
                                            ) : (null)
                                        )}</TableCell>
                                        <TableCell className="text-center">{item.coa === "Yes" ? (
                                            <button className="bg-green-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.coa}</button>
                                        ) : (
                                            item.coa === "" ? (
                                                <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">NA</button>
                                            ) : (null)
                                        )}</TableCell>
                                        <TableCell className="text-center">{item.foodGradeCirtiicate === "Yes" ? (
                                            <button className="bg-green-500 p-1 text-white rounded fix-button-width-rcnprimary">{item.foodGradeCirtiicate}</button>
                                        ) : (
                                            item.foodGradeCirtiicate === "" ? (
                                                <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">NA</button>
                                            ) : (null)
                                        )}</TableCell>
                                        <TableCell className="text-center">{item.remarks}</TableCell>
                                        <TableCell className="text-center">
                                            {item.foodGradeCirtificateStatus === "Uploaded" ? <button className="bg-green-500 p-1 text-white rounded fix-button-width-rcnprimary" onClick={() => handleDownload(item.foodGradeCirtiFicateFile)}>{item.foodGradeCirtificateStatus}</button> : item.foodGradeCirtificateStatus === "NA" ? <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">NA</button> : null}
                                        </TableCell>
                                        <TableCell className="text-center">{item.coaCirtificateStatus === "Uploaded" ? <button className="bg-green-500 p-1 text-white rounded fix-button-width-rcnprimary" onClick={() => handleDownload(item.coaCertificateFile)}>{item.coaCirtificateStatus}</button> : item.coaCirtificateStatus === "NA" ? <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">NA</button> : null}</TableCell>
                                        <TableCell className="text-center">{item.qcBy}</TableCell>
                                        <TableCell className="text-center">{item.editStatus}</TableCell>
                                        <TableCell className="text-center">
                                            <Popover>
                                                <PopoverTrigger>
                                                    <button className={`p-2 text-white rounded ${(item.qualityStatus === true && !item.editStatus) ? 'bg-cyan-200' : 'bg-cyan-500'}`} disabled={(item.qualityStatus === true && !item.editStatus) ? true : false}>Action</button>
                                                </PopoverTrigger>
                                                <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                                    <div className={item.editStatus === "NA" ? "block" : "hidden"}>
                                                        <Dialog>
                                                            <DialogTrigger className="flex"><CiEdit size={20} />
                                                                <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" disabled={item.editStatus === "NA" ? false : true}>Modify</button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>
                                                                        <p className='text-1xl pb-1 text-center mt-5'>Packaging Metrial Create</p>
                                                                    </DialogTitle>
                                                                    <DialogDescription>
                                                                        <p className='text-1xl text-center'>To Be Filled Up By Quality Supervisor</p>
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                {/* <QCreportForm /> */}
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                    <div className={item.editStatus === "NA" ? "hidden" : "block"}>
                                                        <Dialog >
                                                            <DialogTrigger className="flex"><CiEdit size={20} />
                                                                <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500" disabled={item.editStatus === "NA" ? true : false}>Entry New</button>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>
                                                                        <p className='text-1xl pb-1 text-center mt-5'>Packaging Metrial Create</p>
                                                                    </DialogTitle>
                                                                    <DialogDescription>
                                                                        <p className='text-1xl text-center'>To Be Filled Up By Quality Supervisor</p>
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <QCreportForm id={item.id} />
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
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
                                <TableCell></TableCell>
                                <TableCell></TableCell>


                                <TableCell><p className="w-100 text-red-500 font-medium text-center pt-3 pb-10">No Result </p></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>

                                <TableCell></TableCell>
                                <TableCell></TableCell>
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
            <dialog id="qcapproveScsDialog" className="dashboard-modal">
                <button id="qcapproveScscloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">{successtext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="qcRejectDialog" className="dashboard-modal">
                <button id="qcrejectcloseDialog" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">{errortext}</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>
        </div>
    )

}

export default QCPackageMaterialTable
