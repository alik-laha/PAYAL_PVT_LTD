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



const DashboardTable = () => {
    const [UserData, setUserData] = useState<User[]>([])
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [transformedData, setTransformedData] = useState<User[]>([]);
    const currDate = new Date().toLocaleDateString();


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        axios.post('/api/user/searchuser', { SearchUser: e.target.value })
            .then((res) => {
                console.log(res.data)
                setUserData(res.data.user) 
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        axios.post('/api/user/searchuser', { SearchUser: '' },{
            params: {
                page: page,
                limit: limit
            }
        })
            .then((res) => {
                if (res.data.user === 0 && page > 1) {
                    setPage((prev) => prev - 1)
    
                }
                console.log(res.data)
                setUserData(res.data.user)
                
            })
            .catch((err) => {
                console.log(err)
                setPage(prev => prev - 1)
            })
    }, [])

    const exportToExcel = async () => {

        const response = await axios.post('/api/user/searchuser', {}, {})
        const data1 = await response.data
        const transformed = data1.Employees.map((item: User, idx: number) => ({
            

        }));
        setTransformedData(transformed);
        const ws = XLSX.utils.json_to_sheet(transformedData);
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
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        
        <div className="ml-5 mt-5">
            <div className="flex ">

                <Input className="w-80 mb-10" placeholder="Search By Emp Id/ Name/ Role/ Dept" onChange={handleSearch} />

            </div>
            <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4 " onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>


            <Table className="mt-1">
                <TableHeader className="bg-neutral-100 text-stone-950 ">

                    <TableHead className="text-center" >Id</TableHead>
                    <TableHead className="text-center" >Emp name</TableHead>
                    <TableHead className="text-center" >User Name </TableHead>
                    <TableHead className="text-center" >Department </TableHead>
                    <TableHead className="text-center" >Role </TableHead>
                    <TableHead className="text-center" >Created By </TableHead>
                    <TableHead className="text-center" >Action</TableHead>

                </TableHeader>
                <TableBody>

                    {
                        UserData.map((item, idx) => {
                            return (
                                <TableRow key={idx}>
                                    <TableCell className="text-center" >{idx + 1}</TableCell>
                                    <TableCell className="text-center" >{item.employeeName}</TableCell>
                                    <TableCell className="text-center" >{item.userName}</TableCell>
                                    <TableCell className="text-center" >{item.dept}</TableCell>
                                    <TableCell className="text-center" >{item.role}</TableCell>
                                    <TableCell className="text-center" >{item.createdBy}</TableCell>
                                    <TableCell className="text-center" >

                                        <Popover>
                                            <PopoverTrigger><button className="bg-green-500 p-2 text-white rounded">Action</button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col w-30 text-sm font-medium">

                                                <Dialog>
                                                    <DialogTrigger>   <button className="bg-transparent pb-2 text-left">Modify</button></DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle><p className='text-1xl pb-1 text-center mt-5'>User Modification</p></DialogTitle>

                                                        </DialogHeader>

                                                        <DashboardUserModifyForm Data={item} />
                                                    </DialogContent>
                                                </Dialog>

                                                <AlertDialog>
                                                    <AlertDialogTrigger><button className="bg-transparent text-left">Delete</button></AlertDialogTrigger>
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