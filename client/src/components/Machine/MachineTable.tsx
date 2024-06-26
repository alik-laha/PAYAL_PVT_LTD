import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { pageNo, pagelimit } from "../common/exportData"
import ModifymachineForm from './ModifyMachineForm'
//import { saveAs } from 'file-saver';
//import * as XLSX from 'xlsx';
import { useEffect, useState } from "react"
import { LuDownload } from "react-icons/lu";
import { Section } from "../common/exportData"
import { FaSearch } from "react-icons/fa"
import axios from "axios"
import { AssetData, AssetDataExcel } from "@/type/type"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    // DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
import { CiEdit } from "react-icons/ci"
import { MdDelete } from "react-icons/md"
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const MachineTable = () => {
    //const currDate = new Date().toLocaleDateString();
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [section, setSection] = useState<string>("")
    const [assetidname, setassetidname] = useState<string>("")
    const [Data, setData] = useState<AssetData[]>([])
    const [transformedData, setTransformedData] = useState<AssetDataExcel[]>([]);
    const currDate = new Date().toLocaleDateString();
    
    const handleSearch = async () => {

        const response = await axios.put('/api/asset/assetSearch', {
            assetidname: assetidname,
            section: section,
            
        }, {
            params: {
                page: page,
                limit: limit
            }
        })
        const data = await response.data
        if (data.assetEntries.length === 0 && page > 1) {
            setPage((prev) => prev - 1)

        }

        setData(data.assetEntries)
      
    }

    useEffect(() => {
        handleSearch()
    }, [page])

    const exportToExcel = async () => {

        const response = await axios.put('/api/asset/assetSearch', {}, {})
        const data1 = await response.data
        const transformed = data1.assetEntries.map((item: AssetData, idx: number) => ({
            id: idx+1,
            machineID: item.machineID,
            machineName: item.machineName,
            description: item.description,
            primary:item.primaryAsset===1?'yes':'no',
            status: item.status,
            section: item.section,
            createdBy: item.createdBy,
            modifiedBy: item.modifiedBy
        }))
        setTransformedData(transformed);
        const ws = XLSX.utils.json_to_sheet(transformedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        saveAs(blob, 'Asset_Details_' + currDate + '.xlsx');
        
    }

    const handleDelete = (data: AssetData) => {
        axios.delete(`/api/asset/deleteAsset/${data.id}`).then((res) => {
            console.log(res.data)
            setData(Data.filter((item) => item.id !== data.id))
        }
        ).catch((err) => {
            console.log(err)

        }).finally(()=>{window.location.reload()})
    }

   
    
return(
    <>
        <div className=" mt-5">
            <div className="flex ">

                <Input className="w-1/3 mb-2" placeholder="Asset Id"  value={assetidname} onChange={(e) => setassetidname(e.target.value)} />
                <select className=' flex h-8 w-1/3 ml-5 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                    onChange={(e) => setSection(e.target.value)} value={section}>
                    <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Section (All)</option>
                    {Section.map((data, index) => (
                        <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                            {data}
                        </option>
                    ))}
                </select>
                <span className="w-1/3 pl-5 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>
            </div>

            <span className="w-1/8 pb-2"><Button className="bg-green-700 h-8 my-2 w-30 text-sm float-right mr-4" onClick={exportToExcel}>
                <LuDownload size={18} /></Button>  </span>

            <Table className="mt-1">
                <TableHeader className="bg-neutral-100 text-stone-950 ">
                <TableHead className="text-center" >Sl No.</TableHead>
                    <TableHead className="text-center" >Asset ID</TableHead>
                   
                    <TableHead className="text-center" >Status </TableHead>
                    <TableHead className="text-center" >Asset Name </TableHead>
                    <TableHead className="text-center" >Primary </TableHead>
                    <TableHead className="text-center" >Section </TableHead>
                   
                    <TableHead className="text-center" >Description </TableHead>
                
                    
                    <TableHead className="text-center" >Action</TableHead>
                </TableHeader>

                <TableBody>{
                    Data.length >0 ? (Data.map((item, idx) => {

                        return (
                            <TableRow key={item.id}>
                                <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                <TableCell className="text-center">{item.machineID}</TableCell>
                              
                                


                                <TableCell className="text-center">{item.status == 'Active' ? (
                                    <button className="bg-green-500 p-1 text-white rounded">Active</button>
                                ) : (
                                    <button className="bg-red-500 p-1 text-white rounded">{item.status}</button>
                                )}</TableCell>
                                  <TableCell className="text-center">{item.machineName}</TableCell>
                                  
                                  <TableCell className="text-center"><Input type='checkbox' className='h-4' checked={item.primaryAsset === 1 ? true : false}/></TableCell>
                                <TableCell className="text-center">{item.section}</TableCell>
                                <TableCell className="text-center">{item.description}</TableCell>

                               
                                <TableCell className="text-center">
                                    <Popover>
                                        <PopoverTrigger>  <button className="bg-cyan-500 p-2 text-white rounded">Action</button>
                                        </PopoverTrigger>
                                        <PopoverContent className="flex flex-col w-30 text-sm font-medium">

                                            <Dialog>
                                                <DialogTrigger  className="flex">  <CiEdit size={20}/> <button className="bg-transparent pb-2 pl-2 text-left hover:text-green-500">Modify</button></DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle><p className='text-1xl pb-1 text-center mt-5'>View Asset</p></DialogTitle>
                                                        <DialogDescription>
                                                            <p className='text-1xl text-center pb-5'>To Be Actioned Up By Admin</p>
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <ModifymachineForm
                                                        data={item}
                                                    />
                                                </DialogContent>
                                            </Dialog>



                                            <AlertDialog>
                                                <AlertDialogTrigger  className="flex"><MdDelete size={20}/><button className="bg-transparent pl-2 text-left hover:text-red-500 ">Delete</button></AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete Asset Data
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
                    })):(<TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                       
                        <TableCell></TableCell>
                        <TableCell><p className="w-100 font-medium text-center text-red-500 pt-3 pb-10">No Asset Found</p></TableCell>
                        
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>

                   </TableRow>)
                    
                    
                    
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
    
    
    
    </>
)
}
export default MachineTable