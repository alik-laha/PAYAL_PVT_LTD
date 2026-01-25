import { useEffect, useState } from "react"
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

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"
import { format, toZonedTime } from 'date-fns-tz'
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
import { FaEye } from "react-icons/fa";
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
import { CiEdit } from "react-icons/ci"
// import PackagingMetirialQcEditForm from "./packageMeterialModify"
import { LuDownload } from "react-icons/lu"
import Carousel from "./ModalCarousel"
import { SiTicktick } from "react-icons/si"
import { MdOutlinePendingActions, MdPendingActions } from "react-icons/md"
import { IoMdCloseCircle } from "react-icons/io"
import PackagingMetirialQcEditForm from "./packageMeterialModify"


const QCPackageMaterialTable = () => {
    const [fromdate, setfromDate] = React.useState<string>('');
    const [todate, settoDate] = React.useState<string>('');
    // const [hidetodate, sethidetoDate] = React.useState<string>('');
    const [searchData, setSearchData] = useState<string>("")
    const [Data, setData] = useState<PackagingMeterialQc[]>([])
    const [page, setPage] = useState(pageNo)
    //const [EditData, setEditData] = useState<EditPendingData[]>([])
    const limit = pagelimit
    const [blockpagen, setblockpagen] = useState('flex')
    const [pendingData, setPendingData] = useState<PackagingMeterialQc[]>([])
    const [counteditpending, setcounteditpending] = useState<number>(2)
    const [sumOfallelement, setsumOfallelement] = useState<any>()
    const [images, setImages] = useState<string[]>([])

    const approvesuccessdialog = document.getElementById('qcapproveScsDialogpackage') as HTMLInputElement;
    const approvecloseDialogButton = document.getElementById('qcapproveScscloseDialogpackage') as HTMLInputElement;

    const rejectsuccessdialog = document.getElementById('qcRejectDialogpackage') as HTMLInputElement;
    const rejectcloseDialogButton = document.getElementById('qcrejectcloseDialogpackage') as HTMLInputElement;
    const imageView = document.getElementById('ImageView') as HTMLInputElement;
    const imageCross = document.getElementById('ImageCross') as HTMLInputElement;
    //const [transformedData, setTransformedData] = useState<QcRcnEntryExcelData[]>([]);
    const Role = localStorage.getItem('role') as keyof PermissionRole
    // const [isModalOpen, setModalOpen] = useState(false);
    // const currDate = new Date().toLocaleDateString();

    const exportToExcel = async () => {
        // const response = await axios.put('/api/qcRcn/searchqcRcn', {
        //     blConNo: blConNo,
        //     origin: origin,
        //     fromDate: fromdate,
        //     toDate: todate
        // })
        // const data1 = await response.data

        // let ws
        // let transformed: QcRcnEntryExcelData[] = [];
        // if (pendingData.length > 0) {

        //     transformed = pendingData.map((item: QcRcnEntryData, idx: number) => ({
        //         id: idx + 1,
        //         blNo: item.blNo,
        //         conNo: item.conNo,
        //         date: item.date,
        //         origin: item.origin,
        //         truckNo: item.rcnEntry.truckNo,
        //         BLWeight: item.rcnEntry.blWeight,
        //         NoOfBags: item.rcnEntry.noOfBags,
        //         QCStatus: item.rcnEntry.rcnStatus,
        //         sampling: item.sampling,
        //         moisture: item.moisture,
        //         nutCount: item.nutCount,
        //         fluteRate: item.fluteRate,
        //         goodKernel: item.goodKernel,
        //         spIm: item.spIm,
        //         reject: item.reject,
        //         shell: item.shell,
        //         outTurn: item.outTurn,
        //         Remarks: item.Remarks,
        //         qcapprovedBy: item.qcapprovedBy,
        //         reportStatus: item.reportStatus === 1 ? 'Done' : 'Pending',
        //         EntriedBy: item.createdBy,
        //         editStatus: item.editStatus,
        //         editapprovedorRejectedBy: item.editapprovedBy,

        //     }));
        //     //setTransformedData(transformed);
        //     ws = XLSX.utils.json_to_sheet(transformed);
        // }
        // else {
        //     transformed = data1.rcnEntries.map((item: QcRcnEntryData, idx: number) => ({
        //         id: idx + 1,
        //         blNo: item.blNo,
        //         conNo: item.conNo,
        //         date: item.date,
        //         origin: item.origin,
        //         truckNo: item.rcnEntry.truckNo,
        //         BLWeight: item.rcnEntry.blWeight,
        //         NoOfBags: item.rcnEntry.noOfBags,
        //         QCStatus: item.rcnEntry.rcnStatus,
        //         sampling: item.sampling,
        //         moisture: item.moisture,
        //         nutCount: item.nutCount,
        //         fluteRate: item.fluteRate,
        //         goodKernel: item.goodKernel,
        //         spIm: item.spIm,
        //         reject: item.reject,
        //         shell: item.shell,
        //         outTurn: item.outTurn,
        //         Remarks: item.Remarks,
        //         qcapprovedBy: item.qcapprovedBy,
        //         reportStatus: item.reportStatus === 1 ? 'Done' : 'Pending',
        //         EntriedBy: item.createdBy,
        //         editStatus: item.editStatus,
        //         editapprovedorRejectedBy: item.editapprovedBy,

        //     }));
        //     // setTransformedData(transformed);
        //     ws = XLSX.utils.json_to_sheet(transformed);
        // }
        // const wb = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        // const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        // const blob = new Blob([wbout], { type: 'application/octet-stream' });
        // saveAs(blob, 'QC_RCN_Entry_' + currDate + '.xlsx');
    };

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

    if (imageCross) {
        imageCross.addEventListener('click', () => {
            if (imageView != null) {
                (imageView as any).close();
            }
        });
    }


    const handleSearchPendingQC = async () => {
        setPendingData([])

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
        const response = await axios.get('/api/qcpackage/viewQcPackageMaterial')
        // const data = await response.data
        // setPendingData(data.rcnEdit)
        // setblockpagen('none')
        console.log(response)
        setblockpagen('none')
        setPendingData(response.data)
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

    const handleApprove = async (id: number) => {
        axios.get(`/api/qcpackage/approveQcPackageEdit/${id}`)
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    if (approvesuccessdialog != null) {
                        (approvesuccessdialog as any).showModal();
                    }
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleRejection = async (id: number) => {
        axios.get(`/api/qcpackage/rejectQcPackageEdit/${id}`)
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    if (rejectsuccessdialog != null) {
                        (rejectsuccessdialog as any).showModal();
                    }
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        axios.get("/api/qcpackage/sumOfallelement")
            .then((res) => {
                console.log(res)
                setsumOfallelement(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

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
    const viewImage = (images: string[]) => {
        setImages(images)
        if (imageView != null) {
            (imageView as any).showModal();
        }
        // setModalOpen(true)
    }

    function formatNumber(num: string) {
        return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
    }
    return (
        // disabled={pendingqccount === 0 ? true : false}
        <div>
            <div className="relative inline-block top-1 responsive-button-adjust">
                <Button className="ml-2 w-40 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md" onClick={handleSearchPendingQC} disabled={(sumOfallelement?.QualityNotEntered ?? 0) === 0} >
                    <div className="flex items-center gap-2">
                        <MdPendingActions size={18} />Pending QC

                    </div>
                </Button>
                {/* FIX 2: Use ?? 0 for the badge display condition and value */}
                {(sumOfallelement?.QualityNotEntered ?? 0) > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center transform scale-90 origin-center animate-pulse shadow-lg ring-2 ring-white dark:ring-gray-800">
                        {sumOfallelement?.QualityNotEntered ?? 0}
                    </span>
                )}

            </div>




            {checkpending('QCRCN') && ((sumOfallelement?.editCount ?? 0) !== 0) &&

                (

                    <Drawer>
                        <DrawerTrigger asChild >
                            <div className="relative inline-block ml-4 top-1 responsive-button-adjust">
                                <Button
                                    className="w-40 bg-gradient-to-r from-orange-400 to-red-200 hover:from-red-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 drop-shadow-md "
                                    /* FIX 1: Use ?? 0 for the disabled prop */
                                    disabled={(sumOfallelement?.editCount ?? 0) === 0}
                                    onClick={handleSearchPendingEdit}
                                >
                                    <div className="flex items-center gap-2">
                                        <MdPendingActions size={18} />
                                        Pending Actions
                                    </div>
                                </Button>

                                {/* FIX 2: Use ?? 0 for the badge display condition and value */}
                                {(sumOfallelement?.editCount ?? 0) > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center transform scale-90 origin-center animate-pulse shadow-lg ring-2 ring-white dark:ring-gray-800">
                                        {sumOfallelement?.editCount ?? 0}
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

                                        <TableHead className="text-center" >Sl⠀No</TableHead>
                                        <TableHead className="text-center" >Action</TableHead>
                                        <TableHead className="text-center" >GatePass⠀No</TableHead>
                                        <TableHead className="text-center" >Type</TableHead>
                                        <TableHead className="text-center" >Receiving⠀Date</TableHead>
                                        <TableHead className="text-center" >Edit⠀Status</TableHead>
                                        <TableHead className="text-center" >QC⠀Status</TableHead>
                                        <TableHead className="text-center" >Invoice⠀No⠀(Packaging⠀Material)</TableHead>
                                        <TableHead className="text-center" >Invoice⠀Date </TableHead>


                                        <TableHead className="text-center" >Item⠀Name(Packaging⠀Material⠀SKU)</TableHead>

                                        <TableHead className="text-center" >Quantity</TableHead>
                                        <TableHead className="text-center" >Unit</TableHead>
                                        <TableHead className="text-center" >Vendor⠀Name(QC⠀Packaging⠀Material)</TableHead>



                                        <TableHead className="text-center" >Testing⠀Date</TableHead>
                                        <TableHead className="text-center" >Leakage⠀Test</TableHead>
                                        <TableHead className="text-center" >Drop⠀Test</TableHead>
                                        <TableHead className="text-center" >Seal⠀Condition</TableHead>
                                        <TableHead className="text-center" >Label⠀Condition</TableHead>
                                        <TableHead className="text-center" >Length⠀(mm)</TableHead>
                                        <TableHead className="text-center" >Width⠀(mm)</TableHead>
                                        <TableHead className="text-center" >Height⠀(mm)</TableHead>
                                        <TableHead className="text-center" >Gsm⠀Value</TableHead>
                                        <TableHead className="text-center" >Avg⠀Weight(gm)</TableHead>
                                        <TableHead className="text-center" >Remarks⠀(Regarding⠀Quality⠀PM)</TableHead>


                                        <TableHead className="text-center" >Damage⠀Image</TableHead>


                                        {/* <TableHead className="text-center" >COA</TableHead> */}
                                        <TableHead className="text-center" >COA⠀Certificate</TableHead>
                                        {/* <TableHead className="text-center" >FoodGrade Certificate</TableHead> */}
                                        <TableHead className="text-center" >FoodGrade⠀Certificate</TableHead>


                                        <TableHead className="text-center" >Reported⠀By</TableHead>




                                    </TableHeader>
                                    <TableBody>
                                        {pendingData.length > 0 &&
                                            pendingData.map((item: PackagingMeterialQc, idx: number) => {

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
                                                        <TableCell className="text-center font-semibold ">{item.packagingMaterialreceving.gatePassNo}</TableCell>
                                                        <TableCell className="text-center font-semibold text-red-600">IN</TableCell>
                                                        <TableCell className="text-center font-semibold text-cyan-600">{handletimezone(item.packagingMaterialreceving.recevingDate)}</TableCell>
                                                        <TableCell className="text-center" > <button
                                                            className={`p-2 rounded w-20 border 
                                              ${item.editStatus === "Accepted"
                                                                    ? "text-green-600 border-green-600 bg-green-50"
                                                                    : item.editStatus === "NA"
                                                                        ? "text-gray-700 border-gray-400 bg-gray-100"
                                                                        : "text-red-600 border-red-600 bg-red-50"
                                                                }`}
                                                        >
                                                            {item.editStatus}
                                                        </button></TableCell>

                                                        <TableCell className="text-center">
                                                            {item.packagingMaterialreceving.qualityStatus ? (
                                                                <p className="flex flex-row justify-center">
                                                                    <SiTicktick color="green" size={18} />
                                                                </p>
                                                            ) : (
                                                                <p className="flex flex-row justify-center">
                                                                    <MdOutlinePendingActions color="red" size={23} />
                                                                </p>
                                                            )}
                                                        </TableCell>
                                                        <TableCell className="text-left">{item.packagingMaterialreceving.invoice}</TableCell>
                                                        <TableCell className="text-center">{handletimezone(item.packagingMaterialreceving.invoicedate)}</TableCell>


                                                        <TableCell className="text-left">{item.packagingMaterialreceving.sku}</TableCell>

                                                        <TableCell className="text-center">{formatNumber(item.packagingMaterialreceving.quantity)}</TableCell>

                                                        <TableCell className="text-center">{item.packagingMaterialreceving.unit}</TableCell>
                                                        <TableCell className="text-left">{item.packagingMaterialreceving.vendorName}</TableCell>




                                                        <TableCell className={`text-center font-semibold ${item.testingDate ? 'text-white bg-blue-500' : 'bg-blue-500 text-white '}`}>{item.testingDate ? handletimezone(item.testingDate) : 'NA'}</TableCell>
                                                        <TableCell className={`text-center font-semibold ${item.leakageTest ? ' ' : 'text-red-500 font-semibold'}`}>{
                                                            item.leakageTest === "Pass" ? (
                                                                <p className="flex flex-row justify-center">
                                                                    <SiTicktick color="green" size={18} />
                                                                </p>
                                                            ) : (
                                                                item.leakageTest === "Fail" ? (
                                                                    <p className="flex flex-row justify-center">
                                                                        <IoMdCloseCircle color="red" size={23} />
                                                                    </p>
                                                                ) : '--'
                                                            )
                                                        }</TableCell>
                                                        <TableCell className={`text-center font-semibold ${item.dropTest ? ' ' : 'text-red-500 font-semibold'}`}>{item.dropTest === "Pass" ? (
                                                            <p className="flex flex-row justify-center">
                                                                <SiTicktick color="green" size={18} />
                                                            </p>
                                                        ) : (
                                                            item.dropTest === "Fail" ? (
                                                                <p className="flex flex-row justify-center">
                                                                    <IoMdCloseCircle color="red" size={23} />
                                                                </p>
                                                            ) : '--'
                                                        )}</TableCell>
                                                        <TableCell className={`text-center font-semibold ${item.sealCondition ? ' ' : 'text-red-500 font-semibold'}`}>{item.sealCondition === "OK" ? (
                                                            <p className="flex flex-row justify-center">
                                                                <SiTicktick color="green" size={18} />
                                                            </p>
                                                        ) : (
                                                            item.sealCondition === "Not OK" ? (
                                                                <p className="flex flex-row justify-center">
                                                                    <IoMdCloseCircle color="red" size={23} />
                                                                </p>
                                                            ) : '--'
                                                        )}</TableCell>
                                                        <TableCell className={`text-center font-semibold ${item.labelingCondition ? ' ' : 'text-red-500 font-semibold'}`}>{item.labelingCondition === "OK" ? (
                                                            <p className="flex flex-row justify-center">
                                                                <SiTicktick color="green" size={18} />
                                                            </p>
                                                        ) : (
                                                            item.labelingCondition === "Not OK" ? (
                                                                <p className="flex flex-row justify-center">
                                                                    <IoMdCloseCircle color="red" size={23} />
                                                                </p>
                                                            ) : '--'
                                                        )}</TableCell>
                                                        <TableCell className={`text-center font-semibold ${item.testingDate ? ' bg-yellow-50' : 'text-red-500 '}`}>{item.length ? item.length : '--'}</TableCell>
                                                        <TableCell className={`text-center font-semibold ${item.testingDate ? ' bg-yellow-50' : 'text-red-500'}`}>{item.width ? item.width : '--'}</TableCell>
                                                        <TableCell className={`text-center font-semibold ${item.testingDate ? ' bg-yellow-50' : 'text-red-500'}`}>{item.height ? item.height : '--'}</TableCell>
                                                        <TableCell className={`text-center font-semibold ${item.testingDate ? ' bg-yellow-50' : 'text-red-500 '}`}>{item.gsm ? item.gsm : '--'}</TableCell>
                                                        <TableCell className={`text-center font-semibold ${item.testingDate ? ' bg-yellow-50' : 'text-red-500'}`}>{item.avgWeight ? item.avgWeight : '-'}</TableCell>
                                                        <TableCell className={`text-center ${item.testingDate ? ' ' : 'text-red-500 '}`}>{item.remarks ? item.remarks : '-'}</TableCell>

                                                        <TableCell className={`text-center ${item.testingDate ? ' ' : 'text-red-500 '}`}>
                                                            {
                                                                (item.damageFile && item.damageFile.length > 3) ? (
                                                                    <button onClick={() => viewImage(JSON.parse(item.damageFile))}><FaEye size={20} /></button>
                                                                ) : (
                                                                    '--'
                                                                )

                                                            }
                                                        </TableCell>



                                                        {/* <TableCell className="text-center ">
                                            { item.qualityStatus && (item.coa === "Yes" ? (
                                            <Input type="checkbox" className="h-4" checked/>
                                        ) : <Input type="checkbox" className="h-4" checked={false}/>)}
                                        
                                     
                                        </TableCell> */}
                                                        <TableCell className={`text-center font-semibold ${item.coaCirtificateStatus === 'Uploaded' ? ' ' : 'text-orange-500 font-semibold'}`}>
                                                            {item.coaCirtificateStatus === "Uploaded" ? <button className='bg-green-700 h-6 px-1 text-white rounded  w-6 text-sm '
                                                                style={{ background: 'white', color: 'orange' }}
                                                                onClick={() => handleDownload(item.coaCirtificateFile)}><LuDownload size={20} /></button> :
                                                                '--'}
                                                        </TableCell>


                                                        {/* <TableCell className="text-center ">{ item.qualityStatus && (item.foodGradeCirtiicate === "Yes" ? (
                                       <Input type="checkbox" className="h-4" checked/> ) : <Input type="checkbox" className="h-4" checked={false}/>)
                                        }
                                        </TableCell> */}

                                                        <TableCell className={`text-center font-semibold ${item.coaCirtificateStatus === 'Uploaded' ? ' ' : 'text-orange-500 font-semibold'}`}>
                                                            {item.foodGradeCirtificateStatus === "Uploaded" ? <button className='bg-green-700 h-6 px-1 text-white rounded  w-6 text-sm '
                                                                style={{ background: 'white', color: 'orange' }}
                                                                onClick={() => handleDownload(item.foodGradeCirtiFicateFile)}><LuDownload size={20} /></button>
                                                                : '--'}
                                                        </TableCell>

                                                        <TableCell className="text-center">{item.createdBy ? item.createdBy : <p className="flex flex-row justify-center">
                                                            <MdOutlinePendingActions color="red" size={23} />
                                                        </p>}</TableCell>


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




            <div className="mx-2 mt-5">
                <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700">

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-end">

                        {/* SKU / Vendor */}
                        <div className="flex flex-col gap-1">
                            {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                                SKU / Vendor
                            </label> */}
                            <Input
                                className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150"
                                placeholder="Search SKU/Vendor"
                                value={searchData}
                                onChange={(e) => setSearchData(e.target.value)}
                            />
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

                        <div className="flex flex-wrap justify-end sm:justify-between gap-3 mt-2 md:mt-0">
                            <Button
                                className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                onClick={handleSearch}
                            >
                                <FaSearch size={14} />
                                Search
                            </Button>

                            <Button
                                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                onClick={exportToExcel}
                            >
                                <LuDownload size={16} />

                            </Button>
                        </div>


                    </div>
                </div>
                <Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">

                        <TableHead className="text-center" >Sl⠀No</TableHead>
                        <TableHead className="text-center" >Action</TableHead>
                        <TableHead className="text-center" >GatePass⠀No</TableHead>
                        <TableHead className="text-center" >Type</TableHead>
                        <TableHead className="text-center" >Receiving⠀Date</TableHead>
                        <TableHead className="text-center" >Edit⠀Status</TableHead>
                        <TableHead className="text-center" >QC⠀Status</TableHead>
                        <TableHead className="text-center" >Invoice⠀No⠀(Packaging⠀Material)</TableHead>
                        <TableHead className="text-center" >Invoice⠀Date </TableHead>


                        <TableHead className="text-center" >Item⠀Name(Packaging⠀Material⠀SKU)</TableHead>

                        <TableHead className="text-center" >Quantity</TableHead>
                        <TableHead className="text-center" >Unit</TableHead>
                        <TableHead className="text-center" >Vendor⠀Name(QC⠀Packaging⠀Material)</TableHead>



                        <TableHead className="text-center" >Testing⠀Date</TableHead>
                        <TableHead className="text-center" >Leakage⠀Test</TableHead>
                        <TableHead className="text-center" >Drop⠀Test</TableHead>
                        <TableHead className="text-center" >Seal⠀Condition</TableHead>
                        <TableHead className="text-center" >Label⠀Condition</TableHead>
                        <TableHead className="text-center" >Length⠀(mm)</TableHead>
                        <TableHead className="text-center" >Width⠀(mm)</TableHead>
                        <TableHead className="text-center" >Height⠀(mm)</TableHead>
                        <TableHead className="text-center" >Gsm⠀Value</TableHead>
                        <TableHead className="text-center" >Avg⠀Weight(gm)</TableHead>
                        <TableHead className="text-center" >Remarks⠀(Regarding⠀Quality⠀PM)</TableHead>


                        <TableHead className="text-center" >Damage⠀Image</TableHead>


                        {/* <TableHead className="text-center" >COA</TableHead> */}
                        <TableHead className="text-center" >COA⠀Certificate</TableHead>
                        {/* <TableHead className="text-center" >FoodGrade Certificate</TableHead> */}
                        <TableHead className="text-center" >FoodGrade⠀Certificate</TableHead>


                        <TableHead className="text-center" >Reported⠀By</TableHead>




                    </TableHeader>
                    <TableBody>
                        {
                            Data.length > 0 ? (Data.map((item: PackagingMeterialQc, idx) => {
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                        <TableCell className="text-center">
                                            <Popover>
                                                <PopoverTrigger>
                                                    <button className={`p-2 bg-white rounded ${(item.qualityStatus && item.editStatus !== 'Pending') ?
                                                        'text-red-500 h-8 w-20 border border-red-400 font-bold rounded-lg  hover:bg-red-200' : 'text-blue-500 h-8 w-20 border border-blue-400 font-bold rounded-lg  hover:bg-blue-200'}`} disabled={(item.qualityStatus && item.editStatus === 'Pending') ? true : false}>
                                                        Action</button>
                                                </PopoverTrigger>
                                                <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                                    <div className={item.qualityStatus == true ? "block" : "hidden"}>
                                                        <Dialog>
                                                            <DialogTrigger className="flex"><CiEdit size={20} />
                                                                <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500">Modify</button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-w-3xl">
                                                                <DialogHeader>
                                                                    <DialogTitle>
                                                                        <p className='text-1xl pb-1 text-center mt-5'>Packaging Metrial Modify</p>
                                                                    </DialogTitle>
                                                                    <DialogDescription>
                                                                        <p className='text-1xl text-center'>To Be Filled Up By Quality Supervisor</p>
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <PackagingMetirialQcEditForm data={item} />
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                    <div className={item.qualityStatus == false ? "block" : "hidden"}>
                                                        <Dialog >
                                                            <DialogTrigger className="flex"><CiEdit size={20} />
                                                                <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500">Report Entry</button>
                                                            </DialogTrigger>
                                                            <DialogContent className="max-w-3xl">
                                                                <DialogHeader>
                                                                    <DialogTitle>
                                                                        <p className='text-lg text-gray-600 text-center pt-1 tracking-wider drop-shadow-xl font-bold'>Packaging Material Quality</p>
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

                                        <TableCell className="text-center font-semibold ">{item.packagingMaterialreceving.gatePassNo}</TableCell>
                                        <TableCell className="text-center font-semibold text-red-600">IN</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-600">{handletimezone(item.packagingMaterialreceving.recevingDate)}</TableCell>
                                        <TableCell className="text-center" > <button
                                            className={`p-2 rounded w-20 border 
                                              ${item.editStatus === "Accepted"
                                                    ? "text-green-600 border-green-600 bg-green-50"
                                                    : item.editStatus === "NA"
                                                        ? "text-gray-700 border-gray-400 bg-gray-100"
                                                        : "text-red-600 border-red-600 bg-red-50"
                                                }`}
                                        >
                                            {item.editStatus}
                                        </button></TableCell>

                                        <TableCell className="text-center">
                                            {item.packagingMaterialreceving.qualityStatus ? (
                                                <p className="flex flex-row justify-center">
                                                    <SiTicktick color="green" size={18} />
                                                </p>
                                            ) : (
                                                <p className="flex flex-row justify-center">
                                                    <MdOutlinePendingActions color="red" size={23} />
                                                </p>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-left">{item.packagingMaterialreceving.invoice}</TableCell>
                                        <TableCell className="text-center">{handletimezone(item.packagingMaterialreceving.invoicedate)}</TableCell>


                                        <TableCell className="text-left">{item.packagingMaterialreceving.sku}</TableCell>

                                        <TableCell className="text-center">{formatNumber(item.packagingMaterialreceving.quantity)}</TableCell>

                                        <TableCell className="text-center">{item.packagingMaterialreceving.unit}</TableCell>
                                        <TableCell className="text-left">{item.packagingMaterialreceving.vendorName}</TableCell>




                                        <TableCell className={`text-center font-semibold ${item.testingDate ? 'text-white bg-blue-500' : 'bg-blue-500 text-white '}`}>{item.testingDate ? handletimezone(item.testingDate) : 'NA'}</TableCell>
                                        <TableCell className={`text-center font-semibold ${item.leakageTest ? ' ' : 'text-red-500 font-semibold'}`}>{
                                            item.leakageTest === "Pass" ? (
                                                <p className="flex flex-row justify-center">
                                                    <SiTicktick color="green" size={18} />
                                                </p>
                                            ) : (
                                                item.leakageTest === "Fail" ? (
                                                    <p className="flex flex-row justify-center">
                                                        <IoMdCloseCircle color="red" size={23} />
                                                    </p>
                                                ) : '--'
                                            )
                                        }</TableCell>
                                        <TableCell className={`text-center font-semibold ${item.dropTest ? ' ' : 'text-red-500 font-semibold'}`}>{item.dropTest === "Pass" ? (
                                            <p className="flex flex-row justify-center">
                                                <SiTicktick color="green" size={18} />
                                            </p>
                                        ) : (
                                            item.dropTest === "Fail" ? (
                                                <p className="flex flex-row justify-center">
                                                    <IoMdCloseCircle color="red" size={23} />
                                                </p>
                                            ) : '--'
                                        )}</TableCell>
                                        <TableCell className={`text-center font-semibold ${item.sealCondition ? ' ' : 'text-red-500 font-semibold'}`}>{item.sealCondition === "OK" ? (
                                            <p className="flex flex-row justify-center">
                                                <SiTicktick color="green" size={18} />
                                            </p>
                                        ) : (
                                            item.sealCondition === "Not OK" ? (
                                                <p className="flex flex-row justify-center">
                                                    <IoMdCloseCircle color="red" size={23} />
                                                </p>
                                            ) : '--'
                                        )}</TableCell>
                                        <TableCell className={`text-center font-semibold ${item.labelingCondition ? ' ' : 'text-red-500 font-semibold'}`}>{item.labelingCondition === "OK" ? (
                                            <p className="flex flex-row justify-center">
                                                <SiTicktick color="green" size={18} />
                                            </p>
                                        ) : (
                                            item.labelingCondition === "Not OK" ? (
                                                <p className="flex flex-row justify-center">
                                                    <IoMdCloseCircle color="red" size={23} />
                                                </p>
                                            ) : '--'
                                        )}</TableCell>
                                        <TableCell className={`text-center font-semibold ${item.testingDate ? ' bg-yellow-50' : 'text-red-500 '}`}>{item.length ? item.length : '--'}</TableCell>
                                        <TableCell className={`text-center font-semibold ${item.testingDate ? ' bg-yellow-50' : 'text-red-500'}`}>{item.width ? item.width : '--'}</TableCell>
                                        <TableCell className={`text-center font-semibold ${item.testingDate ? ' bg-yellow-50' : 'text-red-500'}`}>{item.height ? item.height : '--'}</TableCell>
                                        <TableCell className={`text-center font-semibold ${item.testingDate ? ' bg-yellow-50' : 'text-red-500 '}`}>{item.gsm ? item.gsm : '--'}</TableCell>
                                        <TableCell className={`text-center font-semibold ${item.testingDate ? ' bg-yellow-50' : 'text-red-500'}`}>{item.avgWeight ? item.avgWeight : '-'}</TableCell>
                                        <TableCell className={`text-center ${item.testingDate ? ' ' : 'text-red-500 '}`}>{item.remarks ? item.remarks : '-'}</TableCell>

                                        <TableCell className={`text-center ${item.testingDate ? ' ' : 'text-red-500 '}`}>
                                            {
                                                (item.damageFile && item.damageFile.length > 3) ? (
                                                    <button onClick={() => viewImage(JSON.parse(item.damageFile))}><FaEye size={20} /></button>
                                                ) : (
                                                    '--'
                                                )

                                            }
                                        </TableCell>



                                        {/* <TableCell className="text-center ">
                                            { item.qualityStatus && (item.coa === "Yes" ? (
                                            <Input type="checkbox" className="h-4" checked/>
                                        ) : <Input type="checkbox" className="h-4" checked={false}/>)}
                                        
                                     
                                        </TableCell> */}
                                        <TableCell className={`text-center font-semibold ${item.coaCirtificateStatus === 'Uploaded' ? ' ' : 'text-orange-500 font-semibold'}`}>
                                            {item.coaCirtificateStatus === "Uploaded" ? <button className='bg-green-700 h-6 px-1 text-white rounded  w-6 text-sm '
                                                style={{ background: 'white', color: 'orange' }}
                                                onClick={() => handleDownload(item.coaCirtificateFile)}><LuDownload size={20} /></button> :
                                                '--'}
                                        </TableCell>


                                        {/* <TableCell className="text-center ">{ item.qualityStatus && (item.foodGradeCirtiicate === "Yes" ? (
                                       <Input type="checkbox" className="h-4" checked/> ) : <Input type="checkbox" className="h-4" checked={false}/>)
                                        }
                                        </TableCell> */}

                                        <TableCell className={`text-center font-semibold ${item.coaCirtificateStatus === 'Uploaded' ? ' ' : 'text-orange-500 font-semibold'}`}>
                                            {item.foodGradeCirtificateStatus === "Uploaded" ? <button className='bg-green-700 h-6 px-1 text-white rounded  w-6 text-sm '
                                                style={{ background: 'white', color: 'orange' }}
                                                onClick={() => handleDownload(item.foodGradeCirtiFicateFile)}><LuDownload size={20} /></button>
                                                : '--'}
                                        </TableCell>

                                        <TableCell className="text-center">{item.createdBy ? item.createdBy : <p className="flex flex-row justify-center">
                                            <MdOutlinePendingActions color="red" size={23} />
                                        </p>}</TableCell>



                                    </TableRow>
                                );
                            })) : (<TableRow>
                                <TableCell colSpan={28}><p className="w-100 text-red-500 font-medium text-center pt-3 pb-10">No Result </p></TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>

            </div>




            <Pagination style={{ display: blockpagen }} className="pt-5 flex flex-row justify-end ">
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
            <dialog id="qcapproveScsDialogpackage" className="dashboard-modal">
                <button id="qcapproveScscloseDialogpackage" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={tick} height={2} width={35} alt='tick_image' />
                    <p id="modal-text" className="pl-3 mt-1 font-medium">The Edit has been Approved</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="qcRejectDialogpackage" className="dashboard-modal">
                <button id="qcrejectcloseDialogpackage" className="dashboard-modal-close-btn ">X </button>
                <span className="flex"><img src={cross} height={25} width={25} alt='error_image' />
                    <p id="modal-text" className="pl-3 mt-1 text-base font-medium">The Edit Has Been Rejected</p></span>

                {/* <!-- Add more elements as needed --> */}
            </dialog>

            <dialog id="ImageView" className="dashboard-modal">
                <button id="ImageCross" className="dashboard-modal-close-btn ">X </button>
                <div className="flex flex-wrap">

                    <div className="gallery-main text-1xl">
                        <Carousel slides={images} />
                    </div>

                </div>
            </dialog>



        </div>
    )

}

export default QCPackageMaterialTable