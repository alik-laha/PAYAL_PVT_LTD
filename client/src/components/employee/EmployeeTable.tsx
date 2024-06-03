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
import EmployeeModifyForm from './EmployeeModifyForm'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from "axios";
import { useEffect, useState } from "react";
import { EmployeeData } from "@/type/type";

const EmployeeTable = () => {
    const [Data, setData] = useState<EmployeeData[]>([])
    const [Error, setError] = useState<string>("")
    const [releaseDate, setReleaseDate] = useState<string>("")
    
    const currDate = new Date().toLocaleDateString();
    const limit = 10
    const [page, setPage] = useState(1)


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchData = e.target.value
        axios.post('/api/employee/searchemployee', { searchData},{
            params: {
                page: page,
                limit: limit
            }
        }).then((res) => {
            // console.log(res.data.Employees)
            if (res.data.Employees === 0 && page > 1) {
                setPage((prev) => prev - 1)
    
            }
            setData(res.data.Employees)
            setError("")
        }).catch((err) => {
            if (err.response.data.msg === 'No Employee found') {
                setData([])
                setError(err.response.data.msg)
            }
        })
    }
  
    useEffect(() => {
        axios.post('/api/employee/searchemployee',{
            params: {
                page: page,
                limit: limit
            }
        }).then((res) => {
            if (res.data.Employees === 0 && page > 1) {
                setPage((prev) => prev - 1)
    
            }
            setData(res.data.Employees)
            setError("")
        }).catch((err) => {
            if (err.response.data.msg === 'No Employee found') {
                setData([])
                setError(err.response.data.msg)
            }
        })
    }, [page])

    const handleDelete = (data: EmployeeData) => {
        axios.delete(`/api/employee/deleteemployee/${data.employeeId}`).then((res) => {
            console.log(res.data)
            setData(Data.filter((item) => item.id !== data.id))
        }
        ).catch((err) => {
            console.log(err)
        })
    }
    const handleRelese = (data: EmployeeData) => {
        axios.put(`/api/employee/releseemployee/${data.employeeId}`, { releseDate: releaseDate }).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="ml-5 mt-5">
            <div className="flex ">

                <Input className="w-60 mb-10" placeholder="Search By Employee ID/ Name" onChange={handleSearch} />

            </div>



            <Table className="mt-1">
                <TableHeader className="bg-neutral-100 text-stone-950 ">

                    <TableHead className="text-center" >Id</TableHead>
                    <TableHead className="text-center" >Emp name</TableHead>
                    <TableHead className="text-center" >Emp ID </TableHead>
                    <TableHead className="text-center" >Desg.</TableHead>
                    <TableHead className="text-center" >Date of Joining</TableHead>
                    <TableHead className="text-center" >Contact No.</TableHead>
                    <TableHead className="text-center" >Email</TableHead>
                    <TableHead className="text-center" >Emp Status </TableHead>
                    <TableHead className="text-center" >Action</TableHead>

                </TableHeader>
                <TableBody>
                    {Error ? <p >{Error}</p> : null}
                    {
                        Data.map((item) => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center" >{item.id}</TableCell>
                                    <TableCell className="text-center" >{item.employeeName}</TableCell>
                                    <TableCell className="text-center" >{item.employeeId}</TableCell>
                                    <TableCell className="text-center" >{item.designation}</TableCell>
                                    <TableCell className="text-center" >{item.dateOfJoining}</TableCell>
                                    <TableCell className="text-center" >{item.mobNo}</TableCell>
                                    <TableCell className="text-center" >{item.email}</TableCell>
                                    <TableCell className="text-center" >{item.status ? "Active" : "Resgined"}</TableCell>
                                    <TableCell className="text-center" >
                                        <Popover>
                                            <PopoverTrigger><button className="bg-green-500 p-2 text-white rounded">Action</button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col w-30 text-sm font-medium">

                                                <Dialog>
                                                    <DialogTrigger>   <button className="bg-transparent pb-2 text-left">Modify</button></DialogTrigger>
                                                    <DialogContent className='max-w-6xl'>
                                                        <DialogHeader>
                                                            <DialogTitle><p className='text-1xl pb-1 text-center mt-3 mb-5'>Modify Employee</p></DialogTitle>
                                                        </DialogHeader>
                                                        <EmployeeModifyForm
                                                            data={item}
                                                        />
                                                    </DialogContent>
                                                </Dialog>

                                                <AlertDialog>
                                                    <AlertDialogTrigger><button className="bg-transparent pb-2 text-left">Delete</button></AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete employee Data
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(item)}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>

                                                <AlertDialog>
                                                    <AlertDialogTrigger><button className="bg-transparent text-left"><button className="bg-transparent pb-2 text-left">Resign</button></button></AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure want to Resign?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will remove user profile Linked to It.
                                                                <input type="date" placeholder="Release Date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleRelese(item)}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                </TableBody>
            </Table>
            <Pagination  className="pt-5 ">
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
export default EmployeeTable;