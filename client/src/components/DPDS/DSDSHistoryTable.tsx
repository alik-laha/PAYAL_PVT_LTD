import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { Origin, pagelimit, pageNo, pendingCheckRole } from "../common/exportData";
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
import { Input } from "../ui/input";
import { format, toZonedTime } from "date-fns-tz";
import { Button } from "../ui/button";
import { FaSearch } from "react-icons/fa";

import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { pendingCheckRoles, PermissionRole } from "@/type/type";
import { LuDownload } from "react-icons/lu";

const DPDSHistoryTable = () => {
     const limit = pagelimit
        const [page, setPage] = useState(pageNo)
        const [fromdate, setfromDate] = useState<string>('');
        const [todate, settoDate] = useState<string>('');
        const [hidetodate, sethidetoDate] = useState<string>('');
        const [blockpagen, setblockpagen] = useState('flex')
        const [searchType, setsearchType] = useState('Incoming')
        const [searchTableType, setsearchtableType] = useState('Incoming')
        const [Data, setData] = useState<any[]>([])
        const [origin, setOrigin] = useState<string>("")
        const [blConNo, setBlConNo] = useState<string>("")
        const dropdown=['Incoming','Mixing']
        const currDate = new Date().toLocaleDateString();

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
                if(searchType === 'Incoming'){
                    const response = await axios.put('/api/mayur/historySearch', {
                        searchitem: blConNo,
                        fromDate: fromdate,
                        toDate: todate,
                        origin: origin,
                        section:'DPDS'
    
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
                    setsearchtableType('Incoming')
                }
                else{
                    const response = await axios.put('/api/dpds/historymixSearch', {
                        searchitem: blConNo,
                        fromDate: fromdate,
                        toDate: todate,
                        origin: origin,
                        section:'DPDS'
    
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
                    setsearchtableType('Mixing')
                }
                
                
                
        
        
            }
            const handleTodate = (e: React.ChangeEvent<HTMLInputElement>) => {

                const selected = e.target.value;
                if (!selected) {
                    settoDate('')
                    sethidetoDate('')
                    return
                }
                //console.log(selected)
                const date = new Date(selected)
                date.setDate(date.getDate() + 1);
                //console.log(date)
                const nextday = date.toISOString().split('T')[0];
                //console.log(nextday)
                sethidetoDate(selected)
                settoDate(nextday)
            }
            function handletimezone(date: string | Date) {
                    const apidate = new Date(date);
                    const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);
                    const finaldate = format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
                    return finaldate;
            }
            function formatNumber(num: string) {
                return Number.isInteger(Number(num)) ? parseInt(num) : parseFloat(num).toFixed(2);
            }
            const exportToExcel = async () => { 

                if(searchType === 'Incoming'){
                    const response = await axios.put('/api/mayur/historySearch', {
                        searchitem: blConNo,
                        fromDate: fromdate,
                        toDate: todate,
                        origin: origin,
                        section:'DPDS'
    
                    })
                    const data1 = await response.data
                    let ws
                    let transformed: any[] = [];
                    if (data1.rcnEntries.length > 0) {
                        transformed = data1.rcnEntries.map((item: any, idx: number) => ({
                            SL_No: idx + 1,
                            LotNo: item.LotNo,
                            date: handletimezone(item.date),
                            origin: item.origin,
                            Incoming_Section: item.fromSection,
                            Incoming_Amount: formatNumber(item.amount),
                            Previous_Backlog_Amount: formatNumber(item.toSectionBeforeBacklog),
                            After_Backlog_Amount: formatNumber(item.toSectionAfterBacklog),
                            createdBy: item.createdBy,
                        }));
                        //setTransformedData(transformed);
                        ws = XLSX.utils.json_to_sheet(transformed);
                        const wb = XLSX.utils.book_new();
                        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                        const blob = new Blob([wbout], { type: 'application/octet-stream' });
                        saveAs(blob, 'DPDS_Incoming_Entry_' + currDate + '.xlsx');
                    }
                    
                   

                }
                else{
                    const response = await axios.put('/api/mayur/historymixSearch', {
                        searchitem: blConNo,
                        fromDate: fromdate,
                        toDate: todate,
                        origin: origin,
                        section:'DPDS'
    
                    })
                    const data1 = await response.data
                    let ws
                    let transformed: any[] = [];
                    if (data1.rcnEntries.length > 0) {
                        transformed = data1.rcnEntries.map((item: any, idx: number) => ({
                            SL_No: idx + 1,
                            Mixing_Date: handletimezone(item.date),
                            Mixing_Amount: formatNumber(item.amount),
                            Source_Lot_No: item.FromLotNo,
                            Source_Origin: item.Fromorigin,
                            Previous_Source_Backlog: formatNumber(item.amountBeforeBacklog),
                            After_Source_Backlog: formatNumber(item.amountAfterBacklog),
                            Destination_Lot_No: item.ToLotNo,
                            Destination_Origin: item.Toorigin,
                            Previous_Destination_Backlog: formatNumber(item.destamountBeforeBacklog),
                            After_Destination_Backlog: formatNumber(item.destamountAfterBacklog),
                            Mixed_By: item.createdBy,
                        }));
                        //setTransformedData(transformed);
                        ws = XLSX.utils.json_to_sheet(transformed);
                        const wb = XLSX.utils.book_new();
                        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                        const blob = new Blob([wbout], { type: 'application/octet-stream' });
                        saveAs(blob, 'DPDS_Mixing_Entry_' + currDate + '.xlsx');
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
                <div className="flex flexbox-search">
                
                <Input className="no-padding w-1/6 flexbox-search-width" placeholder=" Lot No." value={blConNo} onChange={(e) => setBlConNo(e.target.value)} />
                  <select className='flexbox-search-width flex h-8 w-1/7 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
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
                
                    <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-left ">From </label>
                    <Input className="w-1/7 flexbox-search-width-calender"
                        type="date"
                        value={fromdate}
                        onChange={(e) => setfromDate(e.target.value)}
                        placeholder="From Date"

                    />
                    <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-right">To </label>
                    <Input className="w-1/7 flexbox-search-width-calender"
                        type="date"
                        value={hidetodate}
                        onChange={handleTodate}
                        placeholder="To Date"

                    />
                    <select className='flexbox-search-width flex h-8 w-1/7 mr-10 ml-10 no-margin-left items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
                ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                                        onChange={(e) => setsearchType(e.target.value)} value={searchType}>
                 
                                        {dropdown.map((data, index) => (
                                            <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
                py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                                                {data}
                                            </option>
                                        ))}
                </select>
                    <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleTransactionSearch}><FaSearch size={15} /> Search</Button></span>

                </div>
                {checkpending('Mayur') && <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" onClick={exportToExcel}><LuDownload size={18} /></Button>  </span>}
                    {searchTableType==='Incoming' ? 
                    (<Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">


                        <TableHead className="text-center" >Id</TableHead>
                        <TableHead className="text-center" >Lot No</TableHead>
                        <TableHead className="text-center" >Origin</TableHead>
                        <TableHead className="text-center" >Date Of Transfer</TableHead>
                        <TableHead className="text-center" >Section</TableHead>
                        <TableHead className="text-center" >Transfer Amount</TableHead>
                       
                        <TableHead className="text-center" >Previous Backlog</TableHead>
                        <TableHead className="text-center" >Current Backlog</TableHead>
                        <TableHead className="text-center" >Issued By</TableHead>
                       
                    
                
                    </TableHeader>
                    <TableBody>
                    {Data.length > 0 ? (Data.map((item: any, idx) => {
                      return (
                                 <TableRow key={item.id} >
                                     <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                     <TableCell className="text-center font-bold text-cyan-500">{item.LotNo}</TableCell>
                                     
                                     <TableCell className="text-center font-semibold ">{item.origin}</TableCell>
                                     <TableCell className="text-center ">{handletimezone(item.date)}</TableCell>
                                     <TableCell className="text-center  ">{item.fromSection}</TableCell>
                                     <TableCell className="text-center ">{formatNumber(item.amount)}</TableCell>
                                     
                                     <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.toSectionBeforeBacklog)}</TableCell>
                                     <TableCell className="text-center font-semibold text-green-500">{formatNumber(item.toSectionAfterBacklog)}</TableCell>
                                     <TableCell className="text-center font-semibold">{item.createdBy}</TableCell>
                                  
                                   
                                    
                               
                                    
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

                </Table>):(<Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">


                        <TableHead className="text-center" >Id</TableHead>
                        <TableHead className="text-center" >Mixing_Date</TableHead>
                        <TableHead className="text-center" >Mixing Amount</TableHead>
                        <TableHead className="text-center" >Source_Lot No</TableHead>
                        <TableHead className="text-center" >Source Origin</TableHead>
                       
                       
                    
                        
                        <TableHead className="text-center" >Previous Source  Backlog</TableHead>
                        <TableHead className="text-center" >After Source  Backlog</TableHead>
                        <TableHead className="text-center" >Destination Lot No</TableHead>
                        <TableHead className="text-center" >Destination Origin</TableHead>
                        <TableHead className="text-center" >Previous Destination  Backlog</TableHead>
                        <TableHead className="text-center" >After Destination  Backlog</TableHead>
                        <TableHead className="text-center" >Mixed_By</TableHead>
                       
                    
                
                    </TableHeader>
                    <TableBody>
                    {Data.length > 0 ? (Data.map((item: any, idx) => {
                      return (
                                 <TableRow key={item.id} >
                                     <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                     <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                     <TableCell className="text-center font-semibold">{formatNumber(item.amount)}</TableCell>
                                     <TableCell className="text-center font-bold text-red-500">{item.FromLotNo}</TableCell>
                                     <TableCell className="text-center  ">{item.Fromorigin}</TableCell>
                                  

                                     
                                    
                                     <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.amountBeforeBacklog)}</TableCell>
                                     <TableCell className="text-center font-semibold text-red-500">{formatNumber(item.amountAfterBacklog)}</TableCell>
                                     
                                     <TableCell className="text-center font-bold text-green-500">{item.ToLotNo}</TableCell>
                                     
                                     <TableCell className="text-center ">{item.Toorigin}</TableCell>
                                     <TableCell className="text-center font-semibold text-green-500">{formatNumber(item.destamountBeforeBacklog)}</TableCell>
                                     <TableCell className="text-center font-semibold text-green-500">{formatNumber(item.destamountAfterBacklog)}</TableCell>
                                   
                                     <TableCell className="text-center ">{item.createdBy}</TableCell>
                                  
                                   
                                    
                               
                                    
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

export default DPDSHistoryTable;
