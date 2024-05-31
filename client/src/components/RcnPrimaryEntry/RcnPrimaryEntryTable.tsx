import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react"
import { Input } from "../ui/input";
import DatePicker from "../common/DatePicker";
import { RcnPrimaryEntryData } from "@/type/type";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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

const RcnPrimaryEntryTable = () => {
    const [origin, setOrigin] = useState<string>("")
    const [fromdate, setfromDate] = React.useState<Date | undefined>();
    const [todate, settoDate] = React.useState<Date | undefined>(new Date());
    const [blConNo, setBlConNo] = useState<string>("")
    const [Data, setData] = useState<RcnPrimaryEntryData[]>([])
    const [page, setPage] = useState(1)
    const limit = 5

    const handleSearch = async () => {
        console.log('search button pressed')
        const response = await axios.put('/api/rcnprimary/search', {
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
        if (data.rcnEntries.length === 0) {
            setPage((prev) => prev - 1)

        }
        setData(data.rcnEntries)
    }

    useEffect(() => {
        handleSearch()
    }, [page])



    return (
        <div className="ml-5 mt-5">
            <div className="flex flexbox-search">

                <Input className="flexbox-search-width mt-1" placeholder=" BL No. / Container No." value={blConNo} onChange={(e) => setBlConNo(e.target.value)} />
                <div className="flex pl-7 mt-1 flexbox-search-width ">
                    <Select value={origin} onValueChange={(value) => setOrigin(value)}>
                        <SelectTrigger className="w-3/4 h-8">
                            <SelectValue placeholder="Origin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    Origin.map((item) => {
                                        return (
                                            <SelectItem key={item} value={item}>
                                                {item}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select></div>
                <span className="flexbox-search-width"><DatePicker buttonName="From Date" value={fromdate} setValue={setfromDate} /></span>
                <span className="flexbox-search-width"> <DatePicker buttonName="To Date" value={todate} setValue={settoDate} /></span>
                <span className="w-1/8 "><Button className="bg-slate-500 float-right" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>
            </div>



            <Table className="mt-8">
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
                    <TableHead className="text-center" >Action</TableHead>

                </TableHeader>
                <TableBody>
                    {
                        Data.map((item: RcnPrimaryEntryData) => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center" >{item.id}</TableCell>
                                    <TableCell className="text-center" >{item.origin}</TableCell>
                                    <TableCell className="text-center" >{item.date.slice(0, 10)}</TableCell>
                                    <TableCell className="text-center" >{item.blNo}</TableCell>
                                    <TableCell className="text-center" >{item.conNo}</TableCell>
                                    <TableCell className="text-center" >{item.truckNo}</TableCell>

                                    <TableCell className="text-center" >{item.blWeight}</TableCell>
                                    <TableCell className="text-center" >{item.netWeight}</TableCell>
                                    <TableCell className="text-center font-semibold text-red-600" >{item.difference}</TableCell>
                                    <TableCell className="text-center font-semibold" >{item.noOfBags}</TableCell>
                                    <TableCell className="text-center" ><button className="bg-red-500 p-1 text-white rounded">{item.rcnStatus}</button></TableCell>
                                    <TableCell className="text-center" >
                                        Created
                                    </TableCell>
                                    <TableCell className="text-center" >
                                        <Popover>
                                            <PopoverTrigger>       <button className="bg-green-500 p-2 text-white rounded">Action</button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col w-30 text-sm font-medium">

                                                <Dialog>
                                                    <DialogTrigger>   <button className="bg-transparent pb-2 text-left">Modify</button></DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle><p className='text-1xl pb-1 text-center mt-5'>RCN Primary Entry Modification</p></DialogTitle>

                                                        </DialogHeader>

                                                        <RcnPrimaryModify />
                                                    </DialogContent>
                                                </Dialog>

                                                <AlertDialog>
                                                    <AlertDialogTrigger><button className="bg-transparent text-left pb-2">Approve</button></AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Do you want to Approve the Edit Request?</AlertDialogTitle>

                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>


                                                <AlertDialog>
                                                    <AlertDialogTrigger><button className="bg-transparent text-left">Reject</button></AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Do you want to Decline the Edit Request?</AlertDialogTitle>

                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>







                                                {/* <button className="bg-transparent pb-2 text-left">Modify</button>
                                        <button className="bg-transparent pb-2 text-left">Delete</button>
                                       <button className="bg-transparent text-left">Approve</button> */}
                                            </PopoverContent>
                                        </Popover>

                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
            <Pagination className="pt-5 ">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious onClick={() => setPage((prev) => {
                            if (prev === 0) {
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