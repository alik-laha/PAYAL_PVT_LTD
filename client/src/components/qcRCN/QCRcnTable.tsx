import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Origin } from "../common/exportData"
import React from "react"
import axios from "axios"
import { RcnPrimaryEntryData } from "@/type/type"
import { pageNo, pagelimit } from "../common/exportData"
import { FaSearch } from "react-icons/fa"
import { LuDownload } from "react-icons/lu"
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

const QCRcnTable = () => {
    const [origin, setOrigin] = useState<string>("")
    const [fromdate, setfromDate] = React.useState<string>('');
    const [todate, settoDate] = React.useState<string>('');
    const [hidetodate, sethidetoDate] = React.useState<string>('');
    const [blConNo, setBlConNo] = useState<string>("")
    const [Data, setData] = useState<RcnPrimaryEntryData[]>([])
    const [page, setPage] = useState(pageNo)
    //const [EditData, setEditData] = useState<EditPendingData[]>([])
    const limit = pagelimit
    const [blockpagen, setblockpagen] = useState('flex')

    const handleSearch = async () => {
        //console.log('search button pressed')
        //setEditData([])
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
                <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-right">To </label>
                <Input className="w-1/6 flexbox-search-width-calender"
                    type="date"
                    value={hidetodate}
                    onChange={handleTodate}
                    placeholder="To Date"

                />


                <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>

            </div>
            <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" ><LuDownload size={18} /></Button>  </span>

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
                    {Data.map((item: RcnPrimaryEntryData, idx) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                <TableCell className="text-center">{item.origin}</TableCell>
                                <TableCell className="text-center">{handletimezone(item.date)}</TableCell>
                                <TableCell className="text-center">{item.blNo}</TableCell>
                                <TableCell className="text-center">{item.conNo}</TableCell>
                                <TableCell className="text-center">{item.truckNo}</TableCell>

                                <TableCell className="text-center">{item.blWeight}</TableCell>
                                <TableCell className="text-center">{item.netWeight}</TableCell>
                                <TableCell className="text-center font-semibold text-red-600">{item.difference}</TableCell>
                                <TableCell className="text-center font-semibold">{item.noOfBags}</TableCell>
                                <TableCell className="text-center">
                                    {item.rcnStatus === 'QC Pending' ? (
                                        <button className="bg-red-500 p-1 text-white rounded">{item.rcnStatus}</button>
                                    ) : (
                                        <button className="bg-green-500 p-1 text-white rounded">{item.rcnStatus}</button>
                                    )}
                                </TableCell>
                                <TableCell className="text-center">{item.editStatus == 'Created' ?
                                    'NA' : item.editStatus}</TableCell>
                                <TableCell className="text-center">{item.receivedBy}</TableCell>
                                <TableCell className="text-center">

                                </TableCell>
                            </TableRow>
                        );
                    })}

                </TableBody>

                </Table>


                <Pagination style={{ display: blockpagen }} className="pt-5 ">
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

export default QCRcnTable