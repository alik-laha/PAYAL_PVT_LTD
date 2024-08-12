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
import { SKUSection, SelectTypeSKUVendor, pageNo, pagelimit } from "../common/exportData"
//import ModifymachineForm from './ModifyMachineForm'
//import { saveAs } from 'file-saver';
//import * as XLSX from 'xlsx';
import { useEffect, useState } from "react"
import { LuDownload } from "react-icons/lu";

import { FaSearch } from "react-icons/fa"
import axios from "axios"
import {  SkuData, VendorData } from "@/type/type"

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

import { MdDelete } from "react-icons/md"
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const VendorSKUTable = () => {
    //const currDate = new Date().toLocaleDateString();
    const limit = pagelimit
    const [page, setPage] = useState(pageNo)
    const [section, setSection] = useState<string>("")
    const [selectType, setselectType] = useState<string>("SKU")
    // const [tablesearch, settablesearch] = useState<string>("SKU")
    const [itemname, setitemname] = useState<string>("")
    const [sku, setskuData] = useState<SkuData[]>([])
    const [vendor, setvendorData] = useState<VendorData[]>([])
    //const [transformedData, setTransformedData] = useState<AssetDataExcel[]>([]);
    //const currDate = new Date().toLocaleDateString();
    const [tablesearch, settablesearch] = useState<string>("SKU")

    const handleSearch = async () => {
        settablesearch(selectType)
        const response = await axios.put('/api/vendorSKU/VendorSKUSearch', {
            item: itemname,
            section: section,
            type:selectType

        }, {
            params: {
                page: page,
                limit: limit
            }
        })
        const data = await response.data
        if (data.length === 0 && page > 1) {
            setPage((prev) => prev - 1)

        }
        if (selectType === 'SKU') {
            setskuData(data)
        }
        else {
            // setData(data)
            setvendorData(data)
        }

    }

    useEffect(() => {
        handleSearch()
        setPage((prev) => {
            if (prev <= 0) {
                return 1
            }
            return prev
        })
    }, [page])
   

    const exportToExcel = async () => {

    

    }

    const handleDeleteSKU = (data: SkuData) => {
        axios.delete(`/api/vendorSKU/deleteSKU/${data.id}`).then((res) => {
            console.log(res.data)
            setskuData(sku.filter((item) => item.id !== data.id))
        }
        ).catch((err) => {
            console.log(err)

        }).finally(() => { window.location.reload() })
    }
    const handleDeleteVendor = (data: VendorData) => {
        axios.delete(`/api/vendorSKU/deleteVendor/${data.id}`).then((res) => {
            console.log(res.data)
            setvendorData(vendor.filter((item) => item.id !== data.id))
        }
        ).catch((err) => {
            console.log(err)

        }).finally(() => { window.location.reload() })
    }



    return (
        <>
            <div className=" mt-5">
                <div className="flex flexbox-search">

                <Input className="no-padding ml-5 w-1/5 flexbox-search-width" placeholder=" SKU Name/Vendor" value={itemname} onChange={(e) => setitemname(e.target.value)} />
                    
                <select className='flexbox-search-width flex h-8 w-1/5 ml-5 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                    onChange={(e) => {setselectType(e.target.value)}} value={selectType}>
                        
                    {SelectTypeSKUVendor.map((data, index) => (
                        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:
            pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                            {data}
                        </option>
                    ))}
                </select>

                <select className='flexbox-search-width flex h-8 w-1/5 ml-5 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                        onChange={(e) => setSection(e.target.value)} value={section}>
                        <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Section (All)</option>
                        {SKUSection.map((data, index) => (
                            <option className='relative flex w-1/3 cursor-default select-none items-center rounded-sm 
                            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                                {data}
                            </option>
                        ))}
                    </select>

                    <span className="w-1/8 ml-6 "><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>
                </div>

                <span className="w-1/8 pb-2"><Button className="bg-green-700 h-8 my-2 w-30 text-sm float-right mr-4" onClick={exportToExcel}>
                    <LuDownload size={18} /></Button>  </span>
                        
                {tablesearch==='SKU' ? <Table className="mt-1">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center" >Sl No.</TableHead>
                        <TableHead className="text-center " >Item Name (SKU)</TableHead>
                        <TableHead className="text-center" >Unit </TableHead>
                        <TableHead className="text-center" >Section </TableHead>
                        <TableHead className="text-center" >Action</TableHead>
                    </TableHeader>

                    <TableBody>{
                        sku.length > 0 ? (sku.map((item, idx) => {

                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                    <TableCell className="text-center font-semibold ">{item.sku}</TableCell>
                                    <TableCell className="text-center  ">{item.unit}</TableCell>
                                    <TableCell className="text-center ">{item.section}</TableCell>
                                    <TableCell className="text-center">
                                        <Popover>
                                            <PopoverTrigger>  <button className="bg-cyan-500 p-2 text-white rounded">Action</button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col w-30 text-sm font-medium">

                                                <AlertDialog>
                                                    <AlertDialogTrigger className="flex"><MdDelete size={20} /><button className="bg-transparent pl-2 text-left hover:text-red-500 ">Delete</button></AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete SKU Data
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDeleteSKU(item)}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </PopoverContent>
                                        </Popover>

                                    </TableCell>
                                </TableRow>

                            )
                        })) : (<TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>

                     
                            <TableCell><p className="w-100 font-medium text-center text-red-500 pt-3 pb-10">No SKU Found</p></TableCell>

                            <TableCell></TableCell>
                            <TableCell></TableCell>
                    

                        </TableRow>)



                    }

                    </TableBody>



                </Table>:<Table className="mt-1">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center" >Sl No.</TableHead>
                        <TableHead className="text-center " >Vendor_Name</TableHead>
                        <TableHead className="text-center" >Section </TableHead>
                        <TableHead className="text-center" >Vendor_Address </TableHead>
                        <TableHead className="text-center" >Contact </TableHead>              
                       
                        <TableHead className="text-center" >Action</TableHead>
                    </TableHeader>

                    <TableBody>{
                        vendor.length > 0 ? (vendor.map((item, idx) => {

                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                    <TableCell className="text-center font-semibold ">{item.vendorName}</TableCell>   
                                    <TableCell className="text-center ">{item.section}</TableCell>                             
                                    <TableCell className="text-center  ">{item.vendorAddress}</TableCell>
                                    <TableCell className="text-center ">{item.vendorContact}</TableCell>
                                   

                                    <TableCell className="text-center">
                                        <Popover>
                                            <PopoverTrigger>  <button className="bg-cyan-500 p-2 text-white rounded">Action</button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col w-30 text-sm font-medium">

                                                <AlertDialog>
                                                    <AlertDialogTrigger className="flex"><MdDelete size={20} /><button className="bg-transparent pl-2 text-left hover:text-red-500 ">Delete</button></AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete Vendor Data
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDeleteVendor(item)}>Continue</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </PopoverContent>
                                        </Popover>

                                    </TableCell>
                                </TableRow>

                            )
                        })) : (<TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>

                            <TableCell></TableCell>
                            <TableCell><p className="w-100 font-medium text-center text-red-500 pt-3 pb-10">No Vendor Found</p></TableCell>
                            
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            

                        </TableRow>)



                    }

                    </TableBody>



                </Table>}
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



        </>
    )
}
export default VendorSKUTable