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
import { useState } from "react"
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
import { pagelimit } from "../common/exportData"


const PackageMetrialRecivingTable = () => {
    const [Data, setData] = useState([])
    const [EditData, setEditData] = useState([])
    const [fromdate, setfromDate] = useState('')
    const [searchdata, setSearchData] = useState('')
    const [hidetodate, sethidetoDate] = useState('')
    const [todate, settoDate] = useState('')
    const [page, setPage] = useState(1)
    const limit = pagelimit


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

    }
    const handleApprove = (item: EditPendingData) => {
        console.log(item)
    }
    const handleRejection = (item: EditPendingData) => {
        console.log(item)
    }


    return (
        <div className="ml-5 mt-5 ">

            <div className="flex flexbox-search">

                <Input className="no-padding w-1/5 flexbox-search-width" placeholder=" BL No. / Con No." value={searchdata} onChange={(e) => setSearchData(e.target.value)} />


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

                                    {Number(item.difference) < 0 ? (<TableCell className="text-center font-semibold text-red-600">{Number(item.difference)}</TableCell>)
                                        : (<TableCell className="text-center font-semibold text-green-600">{Number(item.difference)}</TableCell>)}

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
                                    {Number(item.difference) < 0 ? (<TableCell className="text-center font-semibold text-red-600">{Number(item.difference)}</TableCell>)
                                        : (<TableCell className="text-center font-semibold text-green-600">{Number(item.difference)}</TableCell>)}
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
                                                        {/* <RcnPrimaryModify data={item} /> */}
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
export default PackageMetrialRecivingTable;