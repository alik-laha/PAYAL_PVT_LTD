import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format, toZonedTime } from 'date-fns-tz'
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
import {  EmployeeData } from "@/type/type";
import { LuDownload } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { pageNo, pagelimit } from "../common/exportData"
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoLockClosedOutline  } from "react-icons/io5";
import React from "react";

const EmployeeTable = () => {
    const [Data, setData] = useState<EmployeeData[]>([])
    const [Error, setError] = useState<string>("")
    const [releaseDate, setReleaseDate] = useState<string>("")
    const [transformedData, setTransformedData] = useState<EmployeeData[]>([]);
    const currDate = new Date().toLocaleDateString();
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchData = e.target.value
        axios.post('/api/employee/searchemployee', { searchData }, {
            params: {
                page: page,
                limit: limit
            }
        }).then((res) => {
            console.log(res.data.Employees)
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

    const exportToExcel = async () => {

        const response = await axios.post('/api/employee/searchemployee', {}, {})
        const data1 = await response.data
        const transformed = data1.Employees.map((item: EmployeeData, idx: number) => ({
            id: idx + 1,
            employeeId: item.employeeId,
            employeeName: item.employeeName,
            designation: item.designation,
            email: item.email,
            mobNo: item.mobNo,
            alternateMobNo: item.alternateMobNo,
            aadhaarNo: item.aadhaarNo,
            panNo: item.panNo,
            heighstQualification: item.heighstQualification,
            bloodGroup: item.bloodGroup,
            dateOfJoining: handletimezone(item.dateOfJoining),
            releseDate: item.releseDate == null ? '' : handletimezone(item.dateOfJoining),
            status: item.status ? 'Active' : 'Resigned',
            address: item.address,
            emergencyContact: item.emergencyContact,
            emergencyMobNo: item.emergencyMobNo,
            pfNo: item.pfNo,
            pincode: item.pincode,
            createdBy:item.createdBy,
            modifyedBy:item.modifyedBy


        }));
        setTransformedData(transformed);
        const ws = XLSX.utils.json_to_sheet(transformedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'Employee_Details_' + currDate + '.xlsx');



    }

    useEffect(() => {
        axios.post('/api/employee/searchemployee', {}, {
            params: {
                page: page,
                limit: limit
            }
        }).then((res) => {
            if (res.data.Employees === 0 && page > 1) {
                setPage((prev) => prev - 1)

            }
            // console.log(res.data.Employees)
            setData(res.data.Employees)
           
            setError("")
        }).catch((err) => {
            if (err.response.data.msg === 'No Employee found') {
                setData([])
                setError(err.response.data.msg)
                setPage(prev => prev - 1)
            }
        })
    }, [page])

    function handletimezone(date: string | Date) {
        const apidate = new Date(date);
        const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);
        const finaldate = format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
        return finaldate;
    }
    const handleDelete = (data: EmployeeData) => {
        axios.delete(`/api/employee/deleteemployee/${data.employeeId}`).then((res) => {
            console.log(res.data)
            
            setData(Data.filter((item) => item.id !== data.id))
            
        }
        ).catch((err) => {
            console.log(err)
        }).finally(()=>{window.location.reload()})
    }
    const handleRelese = (data: EmployeeData) => {
        axios.put(`/api/employee/releseemployee/${data.employeeId}`, { releseDate: releaseDate }).then((res) => {
            setReleaseDate('')
            console.log(res.data)
            window.location.reload()
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="ml-5 mt-5">
            <div className="flex ">

                <Input className="w-60 mb-2" placeholder="Search By Emp ID/ Name" onChange={handleSearch} />

            </div>

            <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>

            <Table className="mt-1">
                <TableHeader className="bg-neutral-100 text-stone-950 ">

                    <TableHead className="text-center" >Sl No.</TableHead>
                    <TableHead className="text-center" >Employee name</TableHead>
                    <TableHead className="text-center" >Employee ID </TableHead>
                    <TableHead className="text-center" >Status </TableHead>
                    <TableHead className="text-center" >Designation</TableHead>
                    <TableHead className="text-center" >Date of Joining</TableHead>
                    <TableHead className="text-center" >Contact No.</TableHead>
                    <TableHead className="text-center" >Email</TableHead>

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
                    {
                        Data.map((item, idx) => {
                           
                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center" >{(limit * (page - 1)) + idx + 1}</TableCell>
                                    <TableCell className="text-center" >{item.employeeName}</TableCell>
                                    <TableCell className="text-center" >{item.employeeId}</TableCell>
                                    <TableCell className="text-center" >
                                        {item.status ? (
                                            <button className="bg-green-500 p-1 text-white rounded">Active</button>
                                        ) : (
                                            <button className="bg-red-500 p-1 text-white rounded">Resigned</button>
                                        )}

                                    </TableCell>
                                    <TableCell className="text-center" >{item.designation}</TableCell>
                                    <TableCell className="text-center" >{handletimezone(item.dateOfJoining)}</TableCell>
                                    <TableCell className="text-center" >{item.mobNo}</TableCell>
                                    <TableCell className="text-center" >{item.email}</TableCell>

                                    <TableCell className="text-center" >
                                        <Popover>
                                            <PopoverTrigger >  <button className="bg-cyan-500 p-2 text-white rounded hover:bg-cyan-700">Action</button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col w-30 text-sm font-medium">

                                                <Dialog>
                                                    <DialogTrigger className="flex">    <CiEdit size={20}/> <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500 ">
                                                        {item.releseDate===null?'Modify':'View'}</button></DialogTrigger>
                                                    <DialogContent className='max-w-2xl'>
                                                        <DialogHeader>
                                                            <DialogTitle><p className='text-1xl text-center mt-2'>View Employee</p></DialogTitle>
                                                        </DialogHeader>
                                                        <EmployeeModifyForm
                                                            data={item}
                                                        />
                                                    </DialogContent>
                                                </Dialog>
                                                {item.status && <AlertDialog >
                                                    
                                                    <AlertDialogTrigger className="flex"><IoLockClosedOutline size={20}/><button className='bg-transparent pl-2 pb-2 text-left hover:text-yellow-500'
                                                    >Resign</button></AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle> Resign This Employee?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action can't be undone. This will remove User profile Linked to It.
                                                                <Input type="date" placeholder="Release Date" className='mt-3 w-100 text-center justify-center items-center' value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required={true} />
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>

                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleRelese(item)}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>} 

                                                <AlertDialog>
                                                    <AlertDialogTrigger className="flex"><MdDelete size={20}/><button className="bg-transparent pl-2 text-left hover:text-red-500 ">Delete</button></AlertDialogTrigger>
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

                                              
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            )
                        })}

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
export default EmployeeTable;