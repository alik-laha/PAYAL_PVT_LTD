import { useContext, useEffect, useState } from "react";
import { Origin, pagelimit, pageNo, pendingCheckRole } from "../common/exportData";
import Context from "../context/context";
import axios from "axios";
import { BormaData, BormaEntryData, pendingCheckRoles, PermissionRole } from "@/type/type";
import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";
import { LuDownload } from "react-icons/lu";
import { format, toZonedTime } from 'date-fns-tz'
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

    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogContent,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CiEdit } from "react-icons/ci";
import { FcApprove } from "react-icons/fc";
const BormaTable = () => {
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [fromdate, setfromDate] = useState<string>('');
    const [todate, settoDate] = useState<string>('');
    const [hidetodate, sethidetoDate] = useState<string>('');
    const currDate = new Date().toLocaleDateString();
    const [origin, setOrigin] = useState<string>("")
    const [blockpagen, setblockpagen] = useState('flex')
    const [EditData, setEditData] = useState<AlmondPrimaryEntryData[]>([])
    const [blConNo, setBlConNo] = useState<string>("")
    const { editBormaLotWiseData } = useContext(Context);
    const [Data, setData] = useState<any[]>([])
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
    const exportToExcel = async () => { }
    const handleSearch = async () => {

        setEditData([])
        setblockpagen('flex')
        const response = await axios.put('/api/borma/bormaprimarysearch', {
            searchitem: blConNo,
            fromDate: fromdate,
            toDate: todate,
            origin: origin,


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
        if (editBormaLotWiseData.length > 0) {
            //console.log(editPendingData)
            setEditData(editBormaLotWiseData)
            setblockpagen('none')
        }

    })
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
        <>

            <div className="ml-5 mt-5 ">
                <div className="flex flexbox-search">

                    <Input className="no-padding w-1/6 flexbox-search-width" placeholder=" Lot No." value={blConNo} onChange={(e) => setBlConNo(e.target.value)} />




                    <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-left ">From </label>
                    <Input className="w-1/7 flexbox-search-width-calender"
                        type="date"
                        value={fromdate}
                        onChange={(e) => setfromDate(e.target.value)}
                        placeholder="From Date"

                    />
                    <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-right">To </label>
                    <Input className="w-1/7 flexbox-search-width-calender"
                        type="date"
                        value={hidetodate}
                        onChange={handleTodate}
                        placeholder="To Date"

                    />

                    <select className='flexbox-search-width flex h-8 w-1/7 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                        onChange={(e) => setOrigin(e.target.value)} value={origin}>

                        {Origin.map((data, index) => (
                            <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                                {data}
                            </option>
                        ))}
                    </select>


                    <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>

                </div>
                {checkpending('RCNPrimary') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}
                <Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">


                        <TableHead className="text-center" >Id</TableHead>
                        <TableHead className="text-center" >Item_Lot_No</TableHead>
                        <TableHead className="text-center" >Borma_Date</TableHead>
                        <TableHead className="text-center" >Origin</TableHead>
                        <TableHead className="text-center" >Temperature</TableHead>
                        <TableHead className="text-center" >Moisture(Input)</TableHead>
                        <TableHead className="text-center" >Wholes(Input)</TableHead>
                        <TableHead className="text-center" >Pieces(Input)</TableHead>
                        <TableHead className="text-center" >Total(Input)</TableHead>
                        <TableHead className="text-center" >Output Moisture</TableHead>
                        <TableHead className="text-center" >Wholes(Output)</TableHead>
                        <TableHead className="text-center" >Output_Piece</TableHead>
                        <TableHead className="text-center" >Total_Output</TableHead>
                        <TableHead className="text-center" >Borma_Loss</TableHead>
                        <TableHead className="text-center" >No_Of_Trolley</TableHead>
                        <TableHead className="text-center" >MC_ON</TableHead>
                        <TableHead className="text-center" >MC_OFF</TableHead>
                        <TableHead className="text-center" >Run Duration</TableHead>
                        <TableHead className="text-center" >Breakdown Duration</TableHead>
                        <TableHead className="text-center" >Other Duration</TableHead>
                        <TableHead className="text-center" >Edit Status </TableHead>
                        <TableHead className="text-center" >Created By </TableHead>
                        <TableHead className="text-center" >Action</TableHead>
                    </TableHeader>
                    <TableBody>


                        {EditData.length > 0 ? (EditData.map((item: BormaData, idx) => {

                            return (
                                <TableRow key={item.id}>
                                <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                <TableCell className="text-center font-bold">{item.gatePassNo}</TableCell>
                                <TableCell className="text-center font-semibold text-cyan-600">{item.gateType}</TableCell>
                                {/* <TableCell className="text-center">{handletimezone(item.recevingDate)}</TableCell> */}

                                <TableCell className="text-center">{item.truckNo}</TableCell>
                                <TableCell className="text-center">{formatNumber(item.grossWt)} </TableCell>
                                <TableCell className="text-center">{item.type}</TableCell>
                              
                                <TableCell className="text-center">{item.invoice}</TableCell>
                                {/* <TableCell className="text-center">{handletimezone(item.invoicedate)}</TableCell> */}
                                <TableCell className="text-center">{item.netWeight ? item.netWeight : 0} </TableCell>

                                <TableCell className="text-center">{item.vendorName}</TableCell>
                                <TableCell className="text-center font-semibold">{item.noOfBags}</TableCell>

                               
                                <TableCell className="text-center font-semibold">{item.totalBill ? formatNumber(item.totalBill):0 }</TableCell>
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

                            Data.length > 0 ? (Data.map((item: BormaData, idx) => {


                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                        <TableCell className="text-center font-bold">{item.LotNo}</TableCell>
                                      
                                        <TableCell className="text-center">{handletimezone(item.date)}</TableCell>

                                        <TableCell className="text-center">{item.origin}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.Temp)} C</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.InputMoisture)} %</TableCell>
                                       
                                        <TableCell className="text-center">{formatNumber(item.InputWholes)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.InputPieces)}</TableCell>
                                        <TableCell className="text-center">{formatNumber(item.TotalInput)}</TableCell>
                                        <TableCell className="text-center">{item.netWeight ? item.netWeight : 0} </TableCell>

                                        <TableCell className="text-center">{item.vendorName}</TableCell>
                                        <TableCell className="text-center font-semibold">{item.noOfBags}</TableCell>

                                       
                                        <TableCell className="text-center font-semibold">{item.totalBill ? formatNumber(item.totalBill):0}</TableCell>
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
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    <p className='text-1xl pb-1 text-center mt-1'>Almond Entry Modification</p>
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            {/* <AlmondModify data={item} /> */}
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


        </>
    )




}

export default BormaTable;