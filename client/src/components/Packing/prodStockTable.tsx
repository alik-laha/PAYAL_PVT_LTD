import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { FY, Origin, pagelimit, pageNo, pendingCheckRole, ProdGradeOnSection, prodStockSection } from "../common/exportData";
import axios from "axios";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";
import { findskutypeData, pendingCheckRoles, PermissionRole } from "@/type/type";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { LuDownload } from "react-icons/lu";


//import { pendingCheckRoles, PermissionRole } from "@/type/type";
//import { LuDownload } from "react-icons/lu";

const ProdStockTable = () => {
     const limit = pagelimit
        const [page, setPage] = useState(pageNo)
       
        const [blockpagen, setblockpagen] = useState('flex')
        const [searchType, setsearchType] = useState('Production Stock')
        const [prodsectiontype, setProdsectiontype] = useState('')
        const [searchTableType, setsearchtableType] = useState('Production Stock')
        const [Data, setData] = useState<any[]>([])
        const [origin, setOrigin] = useState<string>("")
        const [grade, setGrade] = useState<string>("")
        const [fy, setFy] = useState<string>(FY[0])
        const [sku, setsku] = useState<findskutypeData[]>([])
        const currDate = new Date().toLocaleDateString();
        const dropdown=['Production Stock','Order Stock']


        useEffect(() => {
                handleTransactionSearch()
                setPage((prev) => {
                    if (prev <= 0) {
                        return 1
                    }
                    return prev
                })
            }, [page])

            const handleTransactionSearch = async () => {
                setblockpagen('flex')
                if(searchType === 'Production Stock'){
                    if(prodsectiontype==''){
                        setGrade('')
                    }
                    const response = await axios.put('/api/packing/prodStockSearch', { 
                        origin: origin,
                        section:prodsectiontype,
                        grade:grade,
                        FY:fy
                    }, {
                        params: {
                            page: page,
                            limit: limit
                        }
                    })
                    const data = await response.data
                    if (data.rcnEntries.length === 0 && page > 1) {
                        setPage((prev) => prev - 1)
            
                    }
                    setData(data.rcnEntries)
                    setsearchtableType('Production Stock')
                }
                else{
                    const response = await axios.put('/api/packing/ordStockSearch', { 
                        origin: origin,
                        grade:grade,
                        FY:fy
                    }, {
                        params: {
                            page: page,
                            limit: limit
                        }
                    })
                    const data = await response.data
                    if (data.rcnEntries.length === 0 && page > 1) {
                        setPage((prev) => prev - 1)
            
                    }
                    setData(data.rcnEntries)
                    setsearchtableType('Order Stock')
                }
                
                
                
        
        
            }

             useEffect(() => {
                axios.put('/api/vendorSKU/getItembySection/Final Grade', { section: 'Packing' })
                        .then(res => {
                            //console.log(res.data)
                            setsku(res.data)
                            //console.log(sku)
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }, [])
           
       
            function formatNumber(num: string) {
                return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
            }

            const exportToExcel = async () => { 
            
                            if(searchType === 'Production Stock'){
                                const response = await axios.put('/api/packing/prodStockSearch', { 
                                    origin: origin,
                                    section:prodsectiontype,
                                    grade:grade,
                                    FY:fy
                                
                                })
                                const data1 = await response.data
                                let ws
                                let transformed: any[] = [];
                                if (data1.rcnEntries.length > 0) {
                                    transformed = data1.rcnEntries.map((item: any, idx: number) => ({
                                        SL_No: idx + 1,
                                        Production_Section: item.section,
                                        Production_Origin: item.origin,
                                        Production_Grade: item.grade,
                                        Production_Qty: formatNumber(item.productionQty)||0,
                                        Dispatched_Qty:formatNumber(item.dispatchQty)||0,
                                        Backlog:formatNumber(item.backlog)||0,
                                       
                                    }));
                                    //setTransformedData(transformed);
                                    ws = XLSX.utils.json_to_sheet(transformed);
                                    const wb = XLSX.utils.book_new();
                                    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                                    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                                    const blob = new Blob([wbout], { type: 'application/octet-stream' });
                                    saveAs(blob, 'Production_Stock_' + currDate + '.xlsx');
                                }
                                
                               
            
                            }
                            else{
                                const response = await axios.put('/api/packing/ordStockSearch', { 
                                    origin: origin,
                                    grade:grade,
                                    FY:fy
                                
                                })
                                const data1 = await response.data
                                let ws
                                let transformed: any[] = [];
                                if (data1.rcnEntries.length > 0) {
                                    transformed = data1.rcnEntries.map((item: any, idx: number) => ({
                                        SL_No: idx + 1,
                                        Production_Origin: item.origin,
                                        Production_Grade: item.grade,
                                        Production_Qty: formatNumber((parseFloat(item.openquantity)+parseFloat(item.thresoldopenquantity)).toString()),
                                        Dispatched_Qty:formatNumber(((item.consumequantity ?parseFloat(item.consumequantity):0)+(item.thresoldconsumequantity? parseFloat(item.thresoldconsumequantity):0)).toString()),
                                        Backlog:formatNumber(((parseFloat(item.openquantity)+parseFloat(item.thresoldopenquantity))
                                        -(item.consumequantity ?parseFloat(item.consumequantity):0+item.thresoldconsumequantity ?parseFloat(item.thresoldconsumequantity):0)).toString())
                                    }));
                                    //setTransformedData(transformed);
                                    ws = XLSX.utils.json_to_sheet(transformed);
                                    const wb = XLSX.utils.book_new();
                                    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                                    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                                    const blob = new Blob([wbout], { type: 'application/octet-stream' });
                                    saveAs(blob, 'Order_Stock_' + currDate + '.xlsx');
                            }
                          
                            
                           
                        }
                    }
       
           const Role = localStorage.getItem('role') as keyof PermissionRole
                const checkpending = (tab: string) => {
                    //console.log(Role)
                    if (pendingCheckRole[tab as keyof pendingCheckRoles].includes(Role)) {
                        return true
                    }
                    else {
                        return false;
                    }
            
                }

            return (
                <>
                <div className="mx-2 mt-5 ">
                    <div className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl border border-gray-100 dark:border-gray-700 ">

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-4 items-end">

                <div className="flex flex-col gap-1">
                                    <select className='select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150  dark:text-gray-200 appearance-none bg-yellow-100'
                                        onChange={(e) => setsearchType(e.target.value)} value={searchType}>

                                        {dropdown.map((data, index) => (
                                            <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                                                {data}
                                            </option>
                                        ))}
                                    </select>

                </div>

                <div className="flex flex-col gap-1">

                 <select className='select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150  dark:text-gray-200 appearance-none'
                                        onChange={(e) => setFy(e.target.value)} value={fy}>
                  
                                        {FY.map((data, index) => (
                                            <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                                                {data}
                                            </option>
                                        ))}
                </select>

                </div>

                <div className="flex flex-col gap-1">

                    <select className='select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150  dark:text-gray-200 appearance-none'
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

                </div>

                   {searchType==='Production Stock' && <div className="flex flex-col gap-1">

                   <select className='select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150  dark:text-gray-200 appearance-none'
                                        onChange={(e) => setProdsectiontype(e.target.value)} value={prodsectiontype}>
                  <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Section (All)</option>
                                        {prodStockSection.map((data, index) => (
                                            <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                                                {data}
                                            </option>
                                        ))}
                </select>

                  </div>}
                  {searchType==='Production Stock' && <div className="flex flex-col gap-1">
   <select className='select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150  dark:text-gray-200 appearance-none'
                            onChange={(e) => setGrade(e.target.value)} value={grade}>
                            <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Production Grade (All)</option>
                            {prodsectiontype ? (
                              ProdGradeOnSection[prodsectiontype as keyof typeof ProdGradeOnSection].map((item) => (
                                <option key={item} value={item}>{item}</option>
                              ))
                            ) : null}
                          </select>

                  </div>}

                      {searchType==='Order Stock' &&  <div className="flex flex-col gap-1">
       <select className='select-with-icon w-full text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-3 py-2.5 h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150  dark:text-gray-200 appearance-none'
                        onChange={(e) => setGrade(e.target.value)} value={grade}>
                        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Final Grade (All)</option>
                        {sku.map((data, index) => (
                            <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data.sku} key={index}>
                                {data.sku}
                            </option>
                        ))}
                    </select>

                  </div>}


                      {/* Search & Export Buttons */}
                        <div className="flex flex-wrap justify-end md:justify-between gap-3 mt-2 md:mt-0">

                          <Button
                                className="flex w-36 items-center justify-center gap-2 bg-slate-500 hover:bg-slate-600 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                onClick={handleTransactionSearch}
                            >
                                <FaSearch size={14} />
                                Search
                            </Button>

                          {checkpending('ProdStockExcel') && (
                                <Button
                                    className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-md h-9 px-4 transition-all duration-200 shadow-sm"
                                    onClick={exportToExcel}
                                >
                                    <LuDownload size={16} />

                                </Button>
                            )}

                        </div>



                        </div>
                 
                    </div>


        
                
                    {searchTableType==='Production Stock' ? 
                    (<Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">


                        <TableHead className="text-center" >Sl No.</TableHead>
                        <TableHead className="text-center" >Production Section</TableHead>
                        <TableHead className="text-center" >Production Origin</TableHead>
                        <TableHead className="text-center" >Production Grade</TableHead>
                        <TableHead className="text-center" >Prodution Qty</TableHead>
                        <TableHead className="text-center" >Mapped Qty</TableHead>
                        <TableHead className="text-center" >Current Backlog</TableHead>

                       
                    
                
                    </TableHeader>
                    <TableBody>
                    {Data.length > 0 ? (Data.map((item: any, idx) => {
                      return (
                                 <TableRow key={item.id} >
                                     <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                     <TableCell className="text-center  "> <button className="bg-green-500 rounded shadow-md  drop-shadow-lg p-1 text-white fix-button-width-rcnprimary">{item.section}</button></TableCell>                                 
                                     <TableCell className="text-center font-semibold  ">{item.origin}</TableCell>
                                     <TableCell className="text-center font-bold text-cyan-500">{item.grade}</TableCell>
                                     <TableCell className="text-center font-semibold ">{formatNumber(item.productionQty)} Kg</TableCell>
                                     <TableCell className="text-center font-semibold">{formatNumber(item.dispatchQty)} Kg</TableCell>
                                     <TableCell className="text-center font-bold text-red-500">{formatNumber(item.backlog)} Kg</TableCell>
                                 </TableRow>
                             );
                         })) : (<TableRow>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                            
                             <TableCell><p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">No Result </p></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                           
                         </TableRow>)}

                    </TableBody>

                </Table>): (<Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">


                        <TableHead className="text-center" >Sl No.</TableHead>
                        <TableHead className="text-center" >Production Origin</TableHead>
                        <TableHead className="text-center" >Final Grade Name</TableHead>
                        <TableHead className="text-center" >Demanded Order </TableHead>
                        <TableHead className="text-center" >Fulfilled Order</TableHead>
                        <TableHead className="text-center" >Current Backlog</TableHead>

                       
                    
                
                    </TableHeader>
                    <TableBody>
                    {Data.length > 0 ? (Data.map((item: any, idx) => {
                      return (
                                 <TableRow key={item.id} >
                                     <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>

                                     <TableCell className="text-center font-semibold ">{item.origin}</TableCell>
                                     <TableCell className="text-center font-bold text-green-500">{item.grade}</TableCell>
                                     <TableCell className="text-center font-semibold">{formatNumber((parseFloat(item.openquantity)+parseFloat(item.thresoldopenquantity)).toString())} Kg</TableCell>
                                     <TableCell className="text-center font-semibold">{formatNumber(((item.consumequantity ?parseFloat(item.consumequantity):0)+(item.thresoldconsumequantity? parseFloat(item.thresoldconsumequantity):0)).toString())} Kg</TableCell>
                                     <TableCell className="text-center font-bold text-red-500">{formatNumber(((parseFloat(item.openquantity)+parseFloat(item.thresoldopenquantity))
                                     -(item.consumequantity ?parseFloat(item.consumequantity):0+item.thresoldconsumequantity ?parseFloat(item.thresoldconsumequantity):0)).toString())} Kg</TableCell>

                                    
                                  
                                   
                                    
                               
                                    
                                 </TableRow>
                             );
                         })) : (<TableRow>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                            
                             <TableCell><p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">No Result </p></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                           
                         </TableRow>)}

                    </TableBody>

                </Table>)}
                
                
                 
            
                
                <Pagination  style={{ display: blockpagen }} className="pt-5 flex flex-row justify-end ">
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

                </>
            )
}

export default ProdStockTable;
