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
    const currDate = new Date().toLocaleDateString();

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
        const response = await axios.put('/api/vendorSKU/VendorSKUSearch', { item: itemname,
            section: section,
            type:selectType}, {})

        const data1 = await response.data
        let transformed:any  = [];
        if (selectType === 'SKU') {
            transformed = data1.map((item: SkuData, idx: number) => ({
                SL_No: idx + 1,
                Item_SKU: item.sku,
                Type:item.type,
                Unit: item.unit,
                Section: item.section,
                createdBy: item.createdBy,
             
            }))
            const ws = XLSX.utils.json_to_sheet(transformed);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([wbout], { type: 'application/octet-stream' });
            saveAs(blob, 'SKU_Details_' + currDate + '.xlsx');
        }
        else {
            // setData(data)
            transformed = data1.map((item: VendorData, idx: number) => ({
                SL_No: idx + 1,
                VendorName: item.vendorName,
                Type: item.type,
                Section: item.section,
                Vendor_Address: item.vendorAddress,
                Vendor_Contact: item.vendorContact,
                createdBy: item.createdBy,
            }))
            const ws = XLSX.utils.json_to_sheet(transformed);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([wbout], { type: 'application/octet-stream' });
            saveAs(blob, 'Vendor_Details_' + currDate + '.xlsx');
        }

        
        //setTransformedData(transformed);
       
    

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
            <div className="mx-2">
                <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-end">

                        {/* SKU / Vendor Name */}
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-xs text-gray-600 dark:text-gray-400">
                                SKU / Vendor Name
                            </label>
                            <Input
                                className="w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 focus:ring-blue-500 rounded-lg h-10 px-3 transition duration-150 dark:text-gray-200"
                                placeholder="Search"
                                value={itemname}
                                onChange={(e) => setitemname(e.target.value)}
                            />
                        </div>

                        {/* Section */}
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-xs text-gray-600 dark:text-gray-400">
                                Section
                            </label>
                            <select
                                className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 pr-8 appearance-none"
                                onChange={(e) => setSection(e.target.value)}
                                value={section}
                            >
                                <option value="">Section (All)</option>
                                {SKUSection.map((data, index) => (
                                    <option key={index} value={data}>
                                        {data}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Type */}
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-xs text-gray-600 dark:text-gray-400">
                                Type
                            </label>
                            <select
                                className="select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 bg-white dark:text-gray-200 pr-8 appearance-none"
                                onChange={(e) => setselectType(e.target.value)}
                                value={selectType}
                            >
                                {SelectTypeSKUVendor.map((data, index) => (
                                    <option key={index} value={data}>
                                        {data}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Buttons: Search + Export */}
                        <div className="flex flex-wrap justify-end md:justify-start gap-3 mt-2 md:mt-0">
                            <Button
                                className="flex w-40 items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                onClick={handleSearch}
                            >
                                <FaSearch size={14} />
                                Search
                            </Button>

                            <Button
                                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                onClick={exportToExcel}
                            >
                                <LuDownload size={16} />
                                
                            </Button>
                        </div>
                    </div>
                </div>



                        
                {tablesearch==='SKU' ? <Table className="mt-1">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        <TableHead className="text-center" >Sl No.</TableHead>
                      
                        <TableHead className="text-left " >Item Name (SKU)</TableHead>
                        <TableHead className="text-center " >SKU_Type</TableHead>
                        <TableHead className="text-center" >Unit </TableHead>
                        <TableHead className="text-center" >Section </TableHead>
                        <TableHead className="text-center" >Action</TableHead>
                    </TableHeader>

                    <TableBody>{
                        sku.length > 0 ? (sku.map((item, idx) => {

                            return (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                   
                                    <TableCell className="text-left font-semibold ">{item.sku}</TableCell>
                                    <TableCell className="text-left ">{item.type}</TableCell>
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
                       
                        <TableHead className="text-center " >Vendor/Party Name</TableHead>
                        <TableHead className="text-center" >Section </TableHead>
                        <TableHead className="text-center" >Type</TableHead>
                       
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
                                    <TableCell className="text-center  ">{item.type}</TableCell>  
                                                             
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