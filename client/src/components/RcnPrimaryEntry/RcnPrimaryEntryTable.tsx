import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { LuDownload } from "react-icons/lu";
import {format,toZonedTime} from 'date-fns-tz'
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react"
import { Input } from "../ui/input";
// import DatePicker from "../common/DatePicker";
import { RcnPrimaryEntryData } from "@/type/type";


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

const RcnPrimaryEntryTable = () => {
    const [origin, setOrigin] = useState<string>("")
    const [fromdate, setfromDate] = React.useState<string>('');
    const [todate, settoDate] = React.useState<string>('');
    const [hidetodate, sethidetoDate] = React.useState<string>('');
    const [blConNo, setBlConNo] = useState<string>("")
    const [Data, setData] = useState<RcnPrimaryEntryData[]>([])
    const [page, setPage] = useState(1)
    const [EditData, setEditData] = useState<EditPendingData[]>([])
    const limit = 10
    const { editPendingData } = useContext(Context);
    const [blockpagen,setblockpagen] = useState('flex')

    useEffect(() => {
        if (editPendingData) {
            console.log(editPendingData)
            setEditData(editPendingData)
            setblockpagen('none')
        }
    }, [editPendingData])

    const handleSearch = async () => {
        console.log('search button pressed')
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
    }, [page])

    const handleRejection = async (item: RcnPrimaryEntryData) => {
        const response = await axios.delete(`/api/rcnprimary/rejectededitrcn/${item.id}`)
        const data = await response.data
        if (data.message === "Rcn Entry Rejected successfully") {
            handleSearch()
        }
    }
    const handleApprove = async (item: RcnPrimaryEntryData) => {
        const response = await axios.put(`/api/rcnprimary/approveeditrcn/${item.id}`)
        const data = await response.data
        if (data.message === "Rcn Entry Approved successfully") {
            handleSearch()
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

                <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-left">From </label>
                <Input className="w-1/6 flexbox-search-width-calender"
                    type="date"
                    value={fromdate}
                    onChange={(e) => setfromDate(e.target.value)}
                    placeholder="From Date"

                />
                {/* <DatePicker buttonName="From Date" value={fromdate} setValue={setfromDate} /> */}


                {/* <DatePicker buttonName="To Date" value={todate} setValue={settoDate} /> */}
                <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-right">To </label>
                <Input className="w-1/6 flexbox-search-width-calender"
                        type="date"
                        value={hidetodate}
                        onChange={handleTodate}
                        placeholder="To Date"
                       
                    />
            
                
                <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>
             
            </div>
            <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4"><LuDownload size={18}/></Button>  </span>

                   

            <Table className="mt-4">
                <TableHeader className="bg-neutral-100 text-stone-950 ">

                    <TableHead className="text-center" >Id</TableHead>
                    <TableHead className="text-center" >Origin</TableHead>
                    <TableHead className="text-center" >Date </TableHead>
                    <TableHead className="text-center" >BL No.</TableHead>
                    <TableHead className="text-center" >Con No.</TableHead>
                    <TableHead className="text-center" >Truck No.</TableHead>

                    <TableHead className="text-center" >BL Weight</TableHead>
                    <TableHead className="text-center" >Net Weight</TableHead>
                    <TableHead className="text-center" >Difference</TableHead>
                    <TableHead className="text-center" >Bag Count</TableHead>
                    <TableHead className="text-center" >QC </TableHead>
                    <TableHead className="text-center" >Status </TableHead>
                    <TableHead className="text-center" >Entried By </TableHead>
                    <TableHead className="text-center" >Action</TableHead>

                </TableHeader>
                <TableBody>
                    {EditData.length > 0 ? (
                        EditData.map((item: RcnPrimaryEntryData, idx) => {

                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                    <TableCell className="text-center">{item.origin}</TableCell>
                                    <TableCell className="text-center">{item.createdAt.slice(0, 10)}</TableCell>
                                    <TableCell className="text-center">{item.blNo}</TableCell>
                                    <TableCell className="text-center">{item.conNo}</TableCell>
                                    <TableCell className="text-center">{item.truckNo}</TableCell>

                                    <TableCell className="text-center">{item.blWeight}</TableCell>
                                    <TableCell className="text-center">{item.netWeight}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-600">{item.difference}</TableCell>
                                    <TableCell className="text-center font-semibold">{item.noOfBags}</TableCell>
                                    <TableCell className="text-center">
                                        {item.rcnStatus === 'QC pending' ? (
                                            <button className="bg-red-500 p-1 text-white rounded">{item.rcnStatus}</button>
                                        ) : (
                                            <button className="bg-green-500 p-1 text-white rounded">{item.rcnStatus}</button>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">{item.editStatus}</TableCell>
                                    <TableCell className="text-center">{item.receivedBy}</TableCell>
                                    <TableCell className="text-center">
                                        <Popover>
                                            <PopoverTrigger>
                                                <button className="bg-cyan-500 p-2 text-white rounded">Action</button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                              

                                                <AlertDialog>
                                                    <AlertDialogTrigger>
                                                        <button className="bg-transparent text-left pb-2">Approve</button>
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
                                                    <AlertDialogTrigger>
                                                        <button className="bg-transparent text-left">Reject</button>
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
                        Data.map((item: RcnPrimaryEntryData, idx) => {
                            const apidate = new Date(item.date);
                            const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);

                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                    <TableCell className="text-center">{item.origin}</TableCell>
                                    <TableCell className="text-center">{format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })}</TableCell>
                                    <TableCell className="text-center">{item.blNo}</TableCell>
                                    <TableCell className="text-center">{item.conNo}</TableCell>
                                    <TableCell className="text-center">{item.truckNo}</TableCell>

                                    <TableCell className="text-center">{item.blWeight}</TableCell>
                                    <TableCell className="text-center">{item.netWeight}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-600">{item.difference}</TableCell>
                                    <TableCell className="text-center font-semibold">{item.noOfBags}</TableCell>
                                    <TableCell className="text-center">
                                        {item.rcnStatus === 'QC pending' ? (
                                            <button className="bg-red-500 p-1 text-white rounded">{item.rcnStatus}</button>
                                        ) : (
                                            <button className="bg-green-500 p-1 text-white rounded">{item.rcnStatus}</button>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-center">{item.editStatus}</TableCell>
                                    <TableCell className="text-center">{item.receivedBy}</TableCell>
                                    <TableCell className="text-center">
                                        <Popover>
                                            <PopoverTrigger>
                                                <button className="bg-cyan-500 p-2 text-white rounded" disabled={item.editStatus==='Pending'?true:false}>Action</button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col w-30 text-sm font-medium">
                                                <Dialog>
                                                    <DialogTrigger>
                                                        <button className="bg-transparent text-black text-left hover:font-bold hover:text-sm " >Modify</button>
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
                        })
                    )}
                </TableBody>
            </Table>
            <Pagination style={{display:blockpagen}} className="pt-5 ">
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
        </div>
    )

}
export default RcnPrimaryEntryTable;