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
import { GradingData } from "@/type/type";

const RcnGradingTable = () => {
    const [page, setPage] = useState(1)
    const [Error, setError] = useState('')
    const [data, setData] = useState<GradingData[]>([])
    const limit = 3
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        axios.post('/api/gradding/searchGrading', { searchData: e.target.value }, {
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
        axios.post('/api/gradding/searchGrading', {}, {
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



    return (
        <div className="ml-5 mt-5">
            <div className="flex ">

                <Input className="w-60 mb-2" placeholder="Search By Emp ID/ Name" onChange={handleSearch} />

            </div>

            <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" ><LuDownload size={18} /></Button>  </span>

            <Table className="mt-1">
                <TableHeader className="bg-neutral-100 text-stone-950 ">

                    <TableHead className="text-center" >Sl No.</TableHead>
                    <TableHead className="text-center" >Date</TableHead>
                    <TableHead className="text-center" >Origin</TableHead>
                    <TableHead className="text-center" >Machine name</TableHead>
                    <TableHead className="text-center" >A</TableHead>
                    <TableHead className="text-center" >B</TableHead>
                    <TableHead className="text-center" >C</TableHead>
                    <TableHead className="text-center" >D</TableHead>
                    <TableHead className="text-center" >E</TableHead>
                    <TableHead className="text-center" >F</TableHead>
                    <TableHead className="text-center" >G</TableHead>
                    <TableHead className="text-center" >Dust</TableHead>
                    <TableHead className="text-center" >Machine On</TableHead>
                    <TableHead className="text-center" >Machine Off</TableHead>
                    <TableHead className="text-center" >Breakdown</TableHead>
                    <TableHead className="text-center" >No of Employees</TableHead>
                    <TableHead className="text-center" >Grading Lot No</TableHead>
                    <TableHead className="text-center" >Edit Status</TableHead>
                    <TableHead className="text-center" >Machine Run time </TableHead>
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
                    {data.map((item: GradingData, index: number) => {
                        const Index = page * limit + index - limit + 1
                        return (
                            <TableRow key={index}>
                                <TableCell>{Index}</TableCell>
                                <TableCell>{item.date.slice(0, 10)}</TableCell>
                                <TableCell>{item.origin}</TableCell>
                                <TableCell>{item.Mc_name}</TableCell>
                                <TableCell>{item.A} </TableCell>
                                <TableCell>{item.B} </TableCell>
                                <TableCell>{item.C} </TableCell>
                                <TableCell>{item.D} </TableCell>
                                <TableCell>{item.E} </TableCell>
                                <TableCell>{item.E}</TableCell>
                                <TableCell>{item.F} </TableCell>
                                <TableCell>{item.G} </TableCell>
                                <TableCell>{item.dust}</TableCell>
                                <TableCell>{item.Mc_on}</TableCell>
                                <TableCell>{item.Mc_off}</TableCell>
                                <TableCell>{item.noOfEmployees}</TableCell>
                                <TableCell>{item.grading_lotNo}</TableCell>
                                <TableCell>{item.editStatus === 'Pending' ? (
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