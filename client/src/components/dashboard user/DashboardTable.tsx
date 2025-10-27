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
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Input } from "../ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Dialog,
    DialogContent,

    DialogDescription,

    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import DashboardUserModifyForm from './DashboardUserModifyForm'
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
import { useState, useEffect } from "react";
import { User } from "@/type/type";
import { LuDownload } from "react-icons/lu";
import { Button } from "../ui/button";
import { pageNo, pagelimit } from "../common/exportData";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';





const DashboardTable = () => {
    const [UserData, setUserData] = useState<User[]>([])
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    //const [transformedData, setTransformedData] = useState<User[]>([]);
    const currDate = new Date().toLocaleDateString();
    const [Error, setError] = useState<string>("")


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        axios.post('/api/user/searchuser', { SearchUser: e.target.value }, {
            params: {
                page: page,
                limit: limit
            }
        })
            .then((res) => {
                console.log(res.data)
                if (res.data.user === 0 && page > 1) {
                    setPage((prev) => prev - 1)

                }
                setUserData(res.data.user)
                setError("")
            })
            .catch((err) => {
                console.log(err)
                if (err.response.data.msg === 'No User found') {
                    setUserData([])
                    setError(err.response.data.msg)
                }
            })
    }

    useEffect(() => {
        axios.post('/api/user/searchuser', { SearchUser: '' }, {
            params: {
                page: page,
                limit: limit
            }
        })
            .then((res) => {
                if (res.data.user === 0 && page > 1) {
                    setPage((prev) => prev - 1)

                }
                //console.log(res.data)
                setUserData(res.data.user)
                setError("")
            })
            .catch((err) => {
                console.log(err)
                if (err.response.data.msg === 'No User found') {
                    setUserData([])
                    setError(err.response.data.msg)
                    setPage(prev => prev - 1)
                }
            })
    }, [page])

    const exportToExcel = async () => {

        const response = await axios.post('/api/user/searchuser', {}, {})
        const data1 = await response.data
        let transformed: User[] = [];

        transformed = data1.user.map((item: User, idx: number) => ({
            id: idx + 1,
            employeeId: item.employeeId,
            employeeName: item.employeeName,
            userName: item.userName,
            dept: item.dept,
            role: item.role,
            createdBy: item.createdBy,
            modifyedBy: item.modifyedBy

        }));
        //setTransformedData(transformed);
        const ws = XLSX.utils.json_to_sheet(transformed);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'User_Details_' + currDate + '.xlsx');



    }
    const handleDelete = (item: User) => {
        axios.delete(`/api/user/deleteuser/${item.employeeId}`)
            .then((res) => {
                console.log(res.data)
                setUserData(UserData.filter((data) => data.employeeId !== item.employeeId))
                window.location.reload();

            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (

        <div className="mx-2 mt-5">
          
            

            <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-end">

                    {/* GatePass No */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-[13px] text-gray-600 dark:text-gray-400">
                            Search By
                        </label>
                        <Input
                            className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150"
                            placeholder="Emp ID / Name / Dept / Role"
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


            <Table className="mt-1">
                <TableHeader className="bg-neutral-100 text-stone-950 ">

                    <TableHead className=" text-center" >SL_No</TableHead>
                   
                    <TableHead className=" text-center" >Emp ID </TableHead>
                    <TableHead className="text-center uppercase" >Employee_FullName</TableHead>
                    
                    <TableHead className=" text-center" >UserName </TableHead>
                    <TableHead className="text-center" >Department </TableHead>
                    <TableHead className=" text-center" >Role </TableHead>

                    <TableHead className="text-center" >Created_By </TableHead>
                      <TableHead className="text-center" >Action</TableHead>
                   

                </TableHeader>
                <TableBody>
                    {Error ?

                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>

                            <TableCell><p className="w-100 font-medium text-center text-red-500 pt-3 pb-10">{Error}</p></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>



                        </TableRow>
                        : null}

                    {
                        UserData.map((item, idx) => {
                            return (
                                <TableRow key={idx}>
                                    <TableCell className="text-center" >{(limit * (page - 1)) + idx + 1}</TableCell>
                                     
                                    <TableCell className=" text-center font-semibold text-cyan-600" >{item.employeeId}</TableCell>
                                    <TableCell className=" font-semibold text-center" >{item.employeeName}</TableCell>
                                
                                    <TableCell className=" font-semibold text-red-500 text-center" >{item.userName}</TableCell>
                                    <TableCell className=" text-center " >{item.dept}</TableCell>
                                    
                                    <TableCell className=" text-center " >{item.role}</TableCell>
                                    <TableCell className="text-center" >{item.createdBy}</TableCell>
                                     <TableCell className="text-center" >

                                        <Popover>
                                            <PopoverTrigger><button className="text-blue-500 h-8 bg-blue-50 w-20 border border-blue-400 font-bold rounded-lg hover:bg-blue-200">Action</button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col w-30 text-sm font-medium">

                                                <Dialog>
                                                    <DialogTrigger className="flex"> <CiEdit size={20} />  <button className="bg-transparent pb-2 pl-2 text-left  hover:text-green-600 ">Modify</button></DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle><p className='text-1xl pb-1 text-center mt-5'>User Modification</p></DialogTitle>
                                                            <DialogDescription>
                                                                <p className='text-1xl text-center'>To Be Modified Up By Director</p>
                                                            </DialogDescription>
                                                        </DialogHeader>

                                                        <DashboardUserModifyForm Data={item} />
                                                    </DialogContent>
                                                </Dialog>

                                                <AlertDialog>
                                                    <AlertDialogTrigger className="flex"><MdDelete size={20} /><button className="bg-transparent pl-2
                                                    text-left hover:text-red-600">Delete</button></AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete User Data
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
        </div>
    )

}
export default DashboardTable;