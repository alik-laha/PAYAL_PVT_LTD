import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { FY, GradeOnSection, Origin, pagelimit, pageNo, pendingCheckRole, prodStockSection } from "../common/exportData";
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
        const [fy, setFy] = useState<string>("2024-25")
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
                <div className="ml-5 mt-5 ">
                    <div className="w-full ">
                    <select className='mb-5 h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                                        onChange={(e) => setsearchType(e.target.value)} value={searchType}>
                 
                                        {dropdown.map((data, index) => (
                                            <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                                                {data}
                                            </option>
                                        ))}
                </select>
                    </div>


                <div className="flex flexbox-search mb-4">
                

                <select className='flexbox-search-width flex h-8 w-1/7 ml-2 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                                        onChange={(e) => setFy(e.target.value)} value={fy}>
                  
                                        {FY.map((data, index) => (
                                            <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                                                {data}
                                            </option>
                                        ))}
                </select>


                  <select className='flexbox-search-width flex h-8 w-1/7 ml-2 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
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

                {searchType==='Production Stock' && <select className='flexbox-search-width flex h-8 w-1/7 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                                        onChange={(e) => setProdsectiontype(e.target.value)} value={prodsectiontype}>
                  <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Section (All)</option>
                                        {prodStockSection.map((data, index) => (
                                            <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                                                {data}
                                            </option>
                                        ))}
                </select>}

                {searchType==='Production Stock' && <select className='flexbox-search-width flex h-8 w-1/7 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                            onChange={(e) => setGrade(e.target.value)} value={grade}>
                            <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Production Grade (All)</option>
                            {prodsectiontype ? (
                              GradeOnSection[prodsectiontype as keyof typeof GradeOnSection].map((item) => (
                                <option key={item} value={item}>{item}</option>
                              ))
                            ) : null}
                          </select>}


                          {searchType==='Order Stock' && <select className='flexbox-search-width flex h-8 w-1/7 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                        onChange={(e) => setGrade(e.target.value)} value={grade}>
                        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Final Grade (All)</option>
                        {sku.map((data, index) => (
                            <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data.sku} key={index}>
                                {data.sku}
                            </option>
                        ))}
                    </select>}
                
                    
                 
                    <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleTransactionSearch}><FaSearch size={15} /> Search</Button></span>

                </div>
                {checkpending('ProdStockExcel') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}
                    {searchTableType==='Production Stock' ? 
                    (<Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">


                        <TableHead className="text-center" >Sl No.</TableHead>
                        <TableHead className="text-center" >Production Section</TableHead>
                        <TableHead className="text-center" >Production Origin</TableHead>
                        <TableHead className="text-center" >Production Grade</TableHead>
                        <TableHead className="text-center" >Prodution Qty</TableHead>
                        <TableHead className="text-center" >Despacthed Qty</TableHead>
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
                                     <TableCell className="text-center font-semibold ">{formatNumber((parseFloat(item.openquantity)+parseFloat(item.thresoldopenquantity)).toString())} Kg</TableCell>
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
                
                
                 
            
                
                <Pagination style={{ display: blockpagen }} className="pt-5 ">
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

export default ProdStockTable;
