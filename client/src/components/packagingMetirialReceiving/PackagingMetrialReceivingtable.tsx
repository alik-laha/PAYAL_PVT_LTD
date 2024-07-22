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
import { pagelimit, pendingCheckRole } from "../common/exportData"
import { PackageMaterialReceivingData, SumofpackageMetrialReceving, ExcelrecevingPackageMaterialData, pendingCheckRoles, PermissionRole } from '@/type/type'
import axios from 'axios'
import PackageMaterialReceivingModify from "./PackageMetirialModifyReceving"
import { useContext } from 'react';
import Context from '../context/context';
import { LuDownload } from "react-icons/lu";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const PackageMetrialRecivingTable = () => {

    const { setRecevingPacakanMaterialOverView } = useContext(Context);

    const [Data, setData] = useState([])
    const [EditData, setEditData] = useState([])
    // const [EditPendingData, setEditPendingData] = useState()
    const [EditSumData, setEditSumData] = useState<SumofpackageMetrialReceving>()
    const [fromdate, setfromDate] = useState('')
    const [searchdata, setSearchData] = useState('')
    const [hidetodate, sethidetoDate] = useState('')
    const [todate, settoDate] = useState('')
    const [page, setPage] = useState(1)
    const limit = pagelimit
    const currDate = new Date().toLocaleDateString();
    const successdialog = document.getElementById('recevingeditapprove') as HTMLInputElement;
    const closeDialogButton = document.getElementById('recevingeditapproveclose') as HTMLInputElement;
    const errordialog = document.getElementById('recevingeditreject') as HTMLInputElement;
    const errorcloseDialogButton = document.getElementById('recevingeditrejectclose') as HTMLInputElement;

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


    const handleTodate = (e: React.ChangeEvent<HTMLInputElement>) => {

        const selected = e.target.value;
        if (!selected) {
            settoDate('')
            sethidetoDate('')
            return
        }
        const date = new Date(selected)
        date.setDate(date.getDate() + 1);
        const nextday = date.toISOString().split('T')[0];
        sethidetoDate(selected)
        settoDate(nextday)
    }
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
        axios.get(`/api/quality/accepteditrecevingpackagematerial/${item}`)
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
        axios.get(`/api/quality/rejecteditrecevingpackagematerial/${item}`)
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
        axios.post('/api/quality/getreceivematerial', { fromdate, todate, searchdata }, { params: { page: page, limit: limit } }).then((res) => {
            setData(res.data.PackageMaterials)

            if (res.data.PackageMaterials.length === 0) {
                setPage((prev) => prev - 1)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    const GetPendingEdit = async () => {
        // console.log("alik")
        const Data = await axios.get('/api/quality/geteditrecevingpackagematerial');
        console.log(Data)
        setEditData(Data.data)

    }
    const getSumOfAllEdit = async () => {
        const Data = await axios.get('/api/quality/getsumofEditRecevingPackageMaterial');
        setEditSumData(Data.data)
        setRecevingPacakanMaterialOverView(Data.data)
    }

    useEffect(() => {
        searchData()
        // GetPendingEdit()

    }, [page])

    useEffect(() => {
        getSumOfAllEdit()
    }, [])
    const exportToExcel = async () => {
        const response = await axios.post('/api/quality/getreceivematerial', {
            searchData,
            fromdate,
            todate
        })
        const data1 = response.data.PackageMaterials
        console.log(data1)

        let ws
        let transformed: ExcelrecevingPackageMaterialData[] = [];
        if (EditData.length > 0) {

            transformed = EditData.map((item: PackageMaterialReceivingData) => ({
                Sl_No: item.id,
                Entry_Date: handletimezone(item.recevingDate),
                SKU: item.sku,
                Vendor_Name: item.vendorName,
                Quantity: item.quantity,
                Unit: item.unit,
                Quality_Status: item.qualityStatus ? "Q/C Done" : "Pending",
                Edit_Status: item.editStatus,
                Created_By: item.createdBy,
                Approved_Or_Rejected_By: item.approvedBy
            }));
            ws = XLSX.utils.json_to_sheet(transformed);
        }
        else {
            transformed = data1.map((item: PackageMaterialReceivingData) => ({
                Sl_No: item.id,
                Entry_Date: handletimezone(item.recevingDate),
                SKU: item.sku,
                Vendor_Name: item.vendorName,
                Quantity: item.quantity,
                Unit: item.unit,
                Quality_Status: item.qualityStatus ? "Q/C Done" : "Pending",
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
        saveAs(blob, 'Receiving_Packaging_Material_' + currDate + '.xlsx');
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



    return (
        <>
            <Button className="bg-orange-400 mb-2 mt-5 ml-4 responsive-button-adjust no-margin-left" onClick={GetPendingEdit}>Pending Edit ({EditSumData?.sumOfAllRecenvingPackageMaterial})</Button>
            <div className="ml-5 mt-5 ">
                <div className="flex flexbox-search">




                    <label className="font-semibold mt-1  mr-5 flexbox-search-width-label-left ">From </label>
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
                    <Input className=" w-1/5 flexbox-search-width ml-5 pl-3 no-margin" placeholder="SKU/Vendor" value={searchdata} onChange={(e) => setSearchData(e.target.value)} />


                    <span className="w-1/8 ml-6"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>

                </div>
                {checkpending('RCNPrimary') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}



                <Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">

                        <TableHead className="text-center" >Sl No</TableHead>
                        <TableHead className="text-center" >Receiving_Date</TableHead>
                        <TableHead className="text-center" >ItemCode_(SKU)</TableHead>
                        <TableHead className="text-center" >Vendor_Name</TableHead>
                        <TableHead className="text-center" >Quantity</TableHead>
                        <TableHead className="text-center" >Unit</TableHead>
                        <TableHead className="text-center" >Quality Status</TableHead>
                        <TableHead className="text-center" >Edit Status</TableHead>
                        <TableHead className="text-center" >Entried By</TableHead>
                        <TableHead className="text-center" >Approved By</TableHead>
                        <TableHead className="text-center" >Action</TableHead>

                    </TableHeader>
                    <TableBody>
                        {EditData.length > 0 ? (
                            EditData.map((item: PackageMaterialReceivingData, idx: number) => {

                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center">{idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-600">{handletimezone(item.recevingDate)}</TableCell>
                                        <TableCell className="text-center">{item.sku}</TableCell>
                                        <TableCell className="text-center">{item.vendorName}</TableCell>
                                        <TableCell className="text-center">{item.quantity}</TableCell>

                                        <TableCell className="text-center">{item.unit}</TableCell>
                                        <TableCell className="text-center ">
                                            {item.qualityStatus ? (
                                                <button className="bg-green-500 p-1 text-white rounded fix-button-width-rcnprimary">QC Done</button>
                                            ) : (
                                                <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">QC Pending</button>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">{item.editStatus}</TableCell>
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
                            Data.length > 0 ? (Data.map((item: PackageMaterialReceivingData, idx: number) => {


                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                        <TableCell className="text-center font-semibold text-cyan-600">{handletimezone(item.recevingDate)}</TableCell>
                                        <TableCell className="text-center">{item.sku}</TableCell>
                                        <TableCell className="text-center">{item.vendorName}</TableCell>
                                        <TableCell className="text-center">{item.quantity}</TableCell>

                                        <TableCell className="text-center">{item.unit}</TableCell>
                                        <TableCell className="text-center ">
                                            {item.qualityStatus ? (
                                                <button className="bg-green-500 p-1 text-white rounded fix-button-width-rcnprimary">QC Done</button>
                                            ) : (
                                                <button className="bg-red-500 p-1 text-white rounded fix-button-width-rcnprimary">QC Pending</button>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">{item.editStatus}</TableCell>
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
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className='text-1xl pb-1 text-center mt-5'>Packaging Receiving Modification</p>
                                                                </DialogTitle>
                                                                <DialogDescription>
                                                                    <p className='text-1xl text-center'>To Be Filled Up By Receving Supervisor</p>
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <PackageMaterialReceivingModify data={item} />
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
export default PackageMetrialRecivingTable;