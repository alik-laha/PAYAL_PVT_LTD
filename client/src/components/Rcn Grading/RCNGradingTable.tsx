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
import { Input } from "../ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Dialog,
    DialogContent,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LuDownload } from 'react-icons/lu'
import RcnGraddingModifyForm from "./RCNGradingModify";
import { GradingData, GradingExcelData } from "@/type/type";
import { Origin } from "../common/exportData"
import { pageNo, pagelimit } from "../common/exportData"
import { format, toZonedTime } from 'date-fns-tz'
import React from "react";
import { FaSearch } from "react-icons/fa";
import Context from '../context/context'
import { useContext } from "react";
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const RcnGradingTable = () => {
    const [page, setPage] = useState(pageNo)
    const [origin, setOrigin] = useState<string>("")
    const [Error, setError] = useState('')
    const [data, setData] = useState<GradingData[]>([])
    const [fromdate, setfromDate] = React.useState<string>('');
    const [todate, settoDate] = React.useState<string>('');
    const [hidetodate, sethidetoDate] = React.useState<string>('');
    const [searchData, setSearchData] = useState<string>('')
    const [transformedData, setTransformedData] = useState<GradingExcelData[]>([])
    const { editPendiningGrinderData, setEditPendiningGrinderData } = useContext(Context)
    const limit = pagelimit


    const handleSearch = async () => {
        // console.log(e.target.value)
        setEditPendiningGrinderData([])
        axios.post('/api/grading/searchGrading', { fromDate: fromdate, toDate: todate, searchData, origin }, {
            params: {
                page: page,
                limit: limit
            }
        })
            .then(res => {
                console.log(res.data)
                if (res.data.length === 0 && page > 1) {
                    setPage((prev) => prev - 1)

                }
                setData(res.data)
            })
            .catch(err => {
                setError(err.data.message)
            })
    }
    useEffect(() => {
        console.log(editPendiningGrinderData)
    }, [editPendiningGrinderData])
    useEffect(() => {
        setEditPendiningGrinderData([])
        axios.post('/api/grading/searchGrading', {}, {
            params: {
                page: page,
                limit: limit
            }
        })
            .then(res => {
                if (res.data.length === 0 && page > 1) {
                    setPage((prev) => prev - 1)
                }
                setData(res.data)
            })
            .catch(err => {
                setError(err.data.message)
            })
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
    const handleExcellExport = async () => {
        const data = await axios.post('/api/grading/exportGrading', { fromDate: fromdate, toDate: todate, searchData, origin })
        const data1 = await data.data

        let ws
        let transformed: GradingExcelData[] = []
        if (editPendiningGrinderData.length === 0) {
            transformed = data1.map((item: GradingData, index: number) => {
                return {
                    'Sl_No': index + 1,
                    'Entry_Date': handletimezone(item.date),
                    'Origin': item.origin,
                    'A': item.A,
                    'B': item.B,
                    'C': item.C,
                    'D': item.D,
                    'E': item.E,
                    'F': item.F,
                    'G': item.G,
                    'Dust': item.dust,
                    'Machine': item.Mc_name,
                    'MC_On': item.Mc_on.slice(0, 5),
                    'MC_Off': item.Mc_off.slice(0, 5),
                    'Breakdown': item.Mc_breakdown.slice(0, 5),
                    'Other': item.otherTime.slice(0, 5),
                    'Run_Duration': item.Mc_runTime.slice(0, 5),
                    'Labour_No': item.noOfEmployees,
                    'Lot_No': item.grading_lotNo,
                    'Edit_Status': item.editStatus,
                    'Feeled_By': item.feeledBy
                }
            })
            setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformedData);
        }
        else {
            transformed = editPendiningGrinderData.map((item: GradingData, index: number) => {
                return {
                    'Sl_No': index + 1,
                    'Entry_Date': handletimezone(item.date),
                    'Origin': item.origin,
                    'A': item.A,
                    'B': item.B,
                    'C': item.C,
                    'D': item.D,
                    'E': item.E,
                    'F': item.F,
                    'G': item.G,
                    'Dust': item.dust,
                    'Machine': item.Mc_name,
                    'MC_On': item.Mc_on.slice(0, 5),
                    'MC_Off': item.Mc_off.slice(0, 5),
                    'Breakdown': item.Mc_breakdown.slice(0, 5),
                    'Other': item.otherTime.slice(0, 5),
                    'Run_Duration': item.Mc_runTime.slice(0, 5),
                    'Labour_No': item.noOfEmployees,
                    'Lot_No': item.grading_lotNo,
                    'Edit_Status': item.editStatus,
                    'Feeled_By': item.feeledBy
                }
            })
            setTransformedData(transformed);
            ws = XLSX.utils.json_to_sheet(transformedData);
        }
        const currDate = new Date().toLocaleDateString();
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'QC_RCN_Entry_' + currDate + '.xlsx');


    }
    return (
        <div className="ml-5 mt-5">
            <div className="flex flexbox-search">

                <Input className="no-padding w-1/5 flexbox-search-width" placeholder="Lot No./ MC. Name" value={searchData} onChange={(e) => setSearchData(e.target.value)} />

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

            <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={handleExcellExport}><LuDownload size={18} /></Button>  </span>

            <Table className="mt-1">
                <TableHeader className="bg-neutral-100 text-stone-950 ">

                    <TableHead className="text-center" >Sl No.</TableHead>
                    <TableHead className="text-center" >Entry Date</TableHead>
                    <TableHead className="text-center" >Origin</TableHead>
                    <TableHead className="text-center" >A</TableHead>
                    <TableHead className="text-center" >B</TableHead>
                    <TableHead className="text-center" >C</TableHead>
                    <TableHead className="text-center" >D</TableHead>
                    <TableHead className="text-center" >E</TableHead>
                    <TableHead className="text-center" >F</TableHead>
                    <TableHead className="text-center" >G</TableHead>
                    <TableHead className="text-center" >Dust</TableHead>

                    <TableHead className="text-center" >Machine</TableHead>

                    <TableHead className="text-center" >MC On</TableHead>
                    <TableHead className="text-center" >MC Off</TableHead>
                    <TableHead className="text-center" >Breakdown</TableHead>
                    <TableHead className="text-center" >Others</TableHead>
                    <TableHead className="text-center" >Run Duration</TableHead>
                    <TableHead className="text-center" >Labour No</TableHead>
                    <TableHead className="text-center" >Lot No</TableHead>
                    <TableHead className="text-center" >Edit Status</TableHead>
                    <TableHead className="text-center" >Entried By</TableHead>

                    <TableHead className="text-center" >Action</TableHead>

                </TableHeader>
                <TableBody>
                    {Error ?

                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell><p className="w-100 font-medium text-center pt-3 pb-10">{Error}</p></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>


                        </TableRow>
                        : null}
                    {editPendiningGrinderData.length === 0 ? data.map((item: GradingData, index: number) => {
                        const Index = page * limit + index - limit + 1
                        return (
                            <TableRow key={index}>
                                <TableCell className="text-center">{Index}</TableCell>
                                <TableCell className="text-center">{handletimezone(item.date)}</TableCell>
                                <TableCell className="text-center">{item.origin}</TableCell>
                                <TableCell className="text-center">{item.A} </TableCell>
                                <TableCell className="text-center">{item.B} </TableCell>
                                <TableCell className="text-center">{item.C} </TableCell>
                                <TableCell className="text-center">{item.D} </TableCell>
                                <TableCell className="text-center">{item.E}</TableCell>
                                <TableCell className="text-center">{item.F} </TableCell>
                                <TableCell className="text-center">{item.G} </TableCell>
                                <TableCell className="text-center">{item.dust}</TableCell>

                                <TableCell className="text-center">{item.Mc_name}</TableCell>
                                <TableCell className="text-center">{item.Mc_on.slice(0, 5)}</TableCell>
                                <TableCell className="text-center">{item.Mc_off.slice(0, 5)}</TableCell>
                                <TableCell className="text-center">{item.Mc_breakdown.slice(0, 5)}</TableCell>
                                <TableCell className="text-center">{item.otherTime.slice(0, 5)}</TableCell>
                                <TableCell className="text-center">{item.Mc_runTime.slice(0, 5)}</TableCell>
                                <TableCell className="text-center">{item.noOfEmployees}</TableCell>
                                <TableCell className="text-center">{item.grading_lotNo}</TableCell>
                                <TableCell className="text-center">{item.editStatus === 'Pending' ? (
                                    <button className="bg-red-500 p-1 text-white rounded">{item.editStatus}</button>
                                ) : (
                                    <button className="bg-green-500 p-1 text-white rounded">{item.editStatus}</button>
                                )}</TableCell>
                                <TableCell>{item.feeledBy}</TableCell>

                                <TableCell className="text-center" >
                                    <Popover>
                                        <PopoverTrigger>  <button className="bg-cyan-500 p-2 text-white rounded">Action</button>
                                        </PopoverTrigger>
                                        <PopoverContent className="flex flex-col w-30 text-sm font-medium">

                                            <Dialog>
                                                <DialogTrigger>   <button className="bg-transparent pb-2 text-left">View/Modify</button></DialogTrigger>
                                                <DialogContent className='max-w-2xl'>
                                                    <DialogHeader>
                                                        <DialogTitle><p className='text-1xl text-center mt-2'>View/Modify Employee</p></DialogTitle>
                                                    </DialogHeader>
                                                    <RcnGraddingModifyForm data={item} />
                                                </DialogContent>
                                            </Dialog>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        )
                    })
                        : editPendiningGrinderData.map((item: GradingData, index: number) => {
                            const Index = page * limit + index - limit + 1
                            return (
                                <TableRow key={index}>
                                    <TableCell className="text-center">{Index}</TableCell>
                                    <TableCell className="text-center">{handletimezone(item.date)}</TableCell>
                                    <TableCell className="text-center">{item.origin}</TableCell>
                                    <TableCell className="text-center">{item.A} </TableCell>
                                    <TableCell className="text-center">{item.B} </TableCell>
                                    <TableCell className="text-center">{item.C} </TableCell>
                                    <TableCell className="text-center">{item.D} </TableCell>
                                    <TableCell className="text-center">{item.E}</TableCell>
                                    <TableCell className="text-center">{item.F} </TableCell>
                                    <TableCell className="text-center">{item.G} </TableCell>
                                    <TableCell className="text-center">{item.dust}</TableCell>

                                    <TableCell className="text-center">{item.Mc_name}</TableCell>
                                    <TableCell className="text-center">{item.Mc_on.slice(0, 5)}</TableCell>
                                    <TableCell className="text-center">{item.Mc_off.slice(0, 5)}</TableCell>
                                    <TableCell className="text-center">{item.Mc_breakdown.slice(0, 5)}</TableCell>
                                    <TableCell className="text-center">{item.otherTime.slice(0, 5)}</TableCell>
                                    <TableCell className="text-center">{item.Mc_runTime.slice(0, 5)}</TableCell>
                                    <TableCell className="text-center">{item.noOfEmployees}</TableCell>
                                    <TableCell className="text-center">{item.grading_lotNo}</TableCell>
                                    <TableCell className="text-center">{item.editStatus === 'Pending' ? (
                                        <button className="bg-red-500 p-1 text-white rounded">{item.editStatus}</button>
                                    ) : (
                                        <button className="bg-green-500 p-1 text-white rounded">{item.editStatus}</button>
                                    )}</TableCell>
                                    <TableCell>{item.feeledBy}</TableCell>

                                    <TableCell className="text-center" >
                                        <Popover>
                                            <PopoverTrigger>  <button className="bg-cyan-500 p-2 text-white rounded">Action</button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col w-30 text-sm font-medium">

                                                <Dialog>
                                                    <DialogTrigger>   <button className="bg-transparent pb-2 text-left">Approve Edit</button></DialogTrigger>
                                                    <DialogContent className='max-w-2xl'>
                                                        <DialogHeader>
                                                            <DialogTitle><p className='text-1xl text-center mt-2'>Approve Edit</p></DialogTitle>
                                                        </DialogHeader>
                                                        <RcnGraddingModifyForm data={item} />
                                                    </DialogContent>
                                                </Dialog>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        )
                    }


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
        </div>
    )
}
export default RcnGradingTable