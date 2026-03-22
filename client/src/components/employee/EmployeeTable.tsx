import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import icon from '../../assets/Static_Images/OIP.jpeg'
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
import { SiTicktick } from "react-icons/si";

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
import { LuDownload } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { pageNo, pagelimit } from "../common/exportData"
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import React from "react";

const EmployeeTable = () => {
    const [Data, setData] = useState<EmployeeData[]>([])
    const [Error, setError] = useState<string>("")
    const [releaseDate, setReleaseDate] = useState<string>("")
    // const [transformedData, setTransformedData] = useState<EmployeeData[]>([]);
    const currDate = new Date().toLocaleDateString();
    const [errview, setErrView] = useState<string>("hidden")
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
            if (res.data.Employees.length === 0 && page > 1) {
                setPage((prev) => prev - 1)

            }
            setData(res.data.Employees)
            setError("")
        }).catch((err) => {
            if (err.response.data.msg === 'No Employee found') {
                setData([])
                setError(err.response.data.msg)
                if (page > 1) {
                    setPage(prev => prev - 1)
                }
            }
        })
    }

    const exportToExcel = async () => {

        const response = await axios.post('/api/employee/searchemployee', {}, {})
        const data1 = await response.data
        let transformed: EmployeeData[] = [];
        transformed = data1.Employees.map((item: EmployeeData, idx: number) => ({
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
            createdBy: item.createdBy,
            modifyedBy: item.modifyedBy


        }));
        //setTransformedData(transformed);
        const ws = XLSX.utils.json_to_sheet(transformed);
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
            if (res.data.Employees.length === 0 && page > 1) {
                setPage((prev) => prev - 1)

            }
            // console.log(res.data.Employees)
            setData(res.data.Employees)

            setError("")
        }).catch((err) => {
            if (err.response.data.msg === 'No Employee found') {
                setData([])
                setError(err.response.data.msg)

                if (page > 1) {
                    setPage(prev => prev - 1)
                }

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
        }).finally(() => { window.location.reload() })
    }
    const handleRelese = (data: EmployeeData) => {
        if (!releaseDate) {
            setErrView('block')
            return
        }
        axios.put(`/api/employee/releseemployee/${data.employeeId}`, { releseDate: releaseDate }).then((res) => {
            setReleaseDate('')
            console.log(res.data)
            window.location.reload()
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="mx-2 mt-5">
         


             <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-end">

                    {/* GatePass No */}
                    <div className="flex flex-col gap-1">
                        {/* <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                            Search By
                        </label> */}
                        <Input
                            className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150"
                            placeholder="Emp ID / Emp Name "
                            onChange={handleSearch}
                        />
                    </div>


                    {/* Buttons */}
                    <div className="flex flex-wrap justify-end md:justify-start gap-3 mt-2 md:mt-0 ">



                        <Button
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                            onClick={exportToExcel}
                        >
                            <LuDownload size={16} />
                        </Button>

                    </div>
                </div>
            </div>

            <Table className="mt-1 ml-2">
                <TableHeader className="bg-neutral-100 text-stone-950 ">

                    <TableHead className="text-center " >Sl⠀No</TableHead>
                       <TableHead className="text-center" >Action</TableHead>
                    <TableHead className="text-center " >Employee⠀ID </TableHead>
                   
                    <TableHead className="text-center" >Employee⠀FullName</TableHead>
                    <TableHead className="text-center " >Emp⠀Image </TableHead>
                    <TableHead className="text-center " >Designation</TableHead>
                    <TableHead className="text-center " >Status </TableHead>
                    <TableHead className="text-center" >Joining⠀Date</TableHead>
                    <TableHead className="text-center " >Contact⠀No.</TableHead>
                    <TableHead className="text-center " >Email</TableHead>
                    <TableHead className="text-center " >Highest⠀Qualification</TableHead>
                    <TableHead className="text-center" >Blood⠀Group</TableHead>
                    <TableHead className="text-center" >Aadhar⠀No</TableHead>
                    <TableHead className="text-center" >Pan⠀No</TableHead>
                    <TableHead className="text-center" >Pincode</TableHead>
                    <TableHead className="text-center " >Emg⠀Contact⠀Name</TableHead>
                    <TableHead className="text-center" >Emg⠀Contact⠀No.</TableHead>
                     <TableHead className="text-center" >Employee⠀Address⠀Details</TableHead>
                 

                </TableHeader>
                <TableBody>
                    {Error ?

                        <TableRow>
                           
                            <TableCell colSpan={18}><p className="font-bold tracking-widest uppercase text-center text-red-500 py-4 text-lg">{Error}</p></TableCell>
                          
                        </TableRow>
                        : null}
                    {
                        Data.map((item, idx) => {

                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center" >{(limit * (page - 1)) + idx + 1}</TableCell>
                                       <TableCell className="text-center" >
                                        <Popover>
                                            <PopoverTrigger >  <button className="text-blue-500 h-8 bg-blue-50 w-20 border border-blue-400 font-bold rounded-lg hover:bg-blue-200">Action</button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col w-30 text-sm font-medium">

                                                <Dialog>
                                                    <DialogTrigger className="flex">    <CiEdit size={20} /> <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500 ">
                                                        {item.releseDate === null ? 'Modify' : 'View'}</button></DialogTrigger>
                                                    <DialogContent className='max-w-5xl'>
                                                        <DialogHeader>
                                                            <DialogTitle> <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-4">
        ✏️ Modify Employee Entry
      </h2></DialogTitle>
                                                        </DialogHeader>
                                                        <EmployeeModifyForm
                                                            data={item}
                                                        />
                                                    </DialogContent>
                                                </Dialog>
                                                {item.status && <AlertDialog >

                                                    <AlertDialogTrigger className="flex"><IoLockClosedOutline size={20} /><button className='bg-transparent pl-2 pb-2 text-left hover:text-yellow-500'
                                                    >Resign</button></AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle> Resign This Employee?</AlertDialogTitle>
                                                            <AlertDialogDescription>

                                                                This action can't be undone. This will remove User profile Linked to It.
                                                                <Input type="date" placeholder="Release Date" className='mt-3 w-100 text-center justify-center items-center' value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required={true} />
                                                                <span id="nameError" className={`text-red-500 pt-2 font-bold ${errview}`}>Date is Required for Release</span>
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>

                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleRelese(item)}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>}

                                                <AlertDialog>
                                                    <AlertDialogTrigger className="flex"><MdDelete size={20} /><button className="bg-transparent pl-2 text-left hover:text-red-500 ">Delete</button></AlertDialogTrigger>
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
                                
                                    <TableCell className="text-center font-semibold text-red-500" >{item.employeeId}</TableCell>
                                    <TableCell className="font-semibold text-left" >{item.employeeName}</TableCell>
                                     <TableCell>   {item.employeeImage  ? (<img 
          src={`/api/cleaning/view?filename=${item.employeeImage}` }  className="rounded-lg h-10 w-10 border border-gray-200"
        /> ): (<img src={icon} height={60} width={60} className="rounded-lg h-10 w-10 border border-gray-200"/>)}</TableCell>
                                   
                                    <TableCell className="text-left" >{item.designation}</TableCell>
                                    <TableCell className="text-center" >
                                        {item.status ? (
                                             <p className="flex flex-row justify-center">
                                                                      <SiTicktick color="green" size={18} />
                                                                    </p>
                                        ) : (
                                            <button className="text-red-500 h-8 bg-red-50 w-20 border border-red-300 font-bold rounded-lg hover:bg-red-200" >Resigned</button>
                                        )}

                                    </TableCell>

                                    <TableCell className="text-center" >{handletimezone(item.dateOfJoining)}</TableCell>
                                    <TableCell className="text-center" >{item.mobNo}</TableCell>
                                    <TableCell className=" text-left" >{item.email}</TableCell>
                                    <TableCell className="text-left" >{item.heighstQualification}</TableCell>
                                    <TableCell className="text-center" >{item.bloodGroup}</TableCell>
                                    <TableCell className="text-center" >xxxxxxxx{item.aadhaarNo.slice(-4)}</TableCell>
                                    <TableCell className="text-center" >{item.panNo}</TableCell>

                                    <TableCell className="text-center" >{item.pincode}</TableCell>
                                    <TableCell className="text-center text-left" >{item.emergencyContact}</TableCell>
                                    <TableCell className="text-center" >{item.emergencyMobNo}</TableCell>
                                    <TableCell className="text-center" >{item.address}</TableCell>


                                
                                </TableRow>
                            )
                        })}

                </TableBody>
            </Table>


           <Pagination  className="pt-5 flex flex-row justify-end ">
                <PaginationContent className="">
                    {page > 1 && <PaginationItem>
                        <PaginationPrevious onClick={() => setPage((prev) => {
                            if (prev === 1) {
                                return prev
                            }
                            if (prev <= 0) {
                                return prev + 1
                            }
                            return prev - 1
                        })} />
                    </PaginationItem>}
                    {page > 2 && <PaginationItem>
                        <PaginationLink onClick={() => setPage((prev) => prev - 2)}>{page - 2}</PaginationLink>
                    </PaginationItem>}
                    {page > 1 && <PaginationItem>
                        <PaginationLink onClick={() => setPage((prev) => prev - 1)}>{page - 1}</PaginationLink>
                    </PaginationItem>}


                    <PaginationItem>
                        <PaginationLink href="#" className="font-bold bg-blue-200  rounded-md">{page}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink onClick={() => setPage((prev) => prev + 1)}>{page + 1}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink onClick={() => setPage((prev) => prev + 2)}>{page + 2}</PaginationLink>
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