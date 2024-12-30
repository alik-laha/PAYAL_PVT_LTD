import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { pagelimit, pageNo } from "../common/exportData";
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

const MayurHistoryTable = () => {
     const limit = pagelimit
        const [page, setPage] = useState(pageNo)
        const [fromdate, setfromDate] = useState<string>('');
        const [todate, settoDate] = useState<string>('');
        const [hidetodate, sethidetoDate] = useState<string>('');
        const [blockpagen, setblockpagen] = useState('flex')
        const [Data, setData] = useState<any[]>([])

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
                const response = await axios.put('/api/mayur/mayurprimarysearch', {
                   
                    fromDate: fromdate,
                    toDate: todate,
                    
        
        
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

            return (
                <>
                <div className="ml-5 mt-5 ">
                <div className="flex flexbox-search">

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
                    <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleTransactionSearch}><FaSearch size={15} /> Search</Button></span>

                </div>

                <Table className="mt-4">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">


                        <TableHead className="text-center" >Id</TableHead>
                        <TableHead className="text-center" >Date Of Transfer</TableHead>
                        <TableHead className="text-center" >Transfer Amount</TableHead>
                        <TableHead className="text-center" >Section</TableHead>
                        <TableHead className="text-center" >Previous Backlog</TableHead>
                        <TableHead className="text-center" >Current Backlog</TableHead>
                        <TableHead className="text-center" >Issued By</TableHead>
                       
                    
                
                    </TableHeader>
                    <TableBody>
                    {Data.length > 0 ? (Data.map((item: any, idx) => {
                      return (
                                 <TableRow key={item.id} >
                                     <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                     <TableCell className="text-center font-bold ">{item.altid==1 ? 'Fresh Issue' : 'Re-Issue'}</TableCell>
                                     
                                     <TableCell className="text-center font-bold text-orange-500">{item.LotNo}</TableCell>
                                     <TableCell className="text-center font-semibold text-cyan-500">{item.origin}</TableCell>
                                     <TableCell className="text-center font-semibold ">{item.altid}</TableCell>
                                     <TableCell className="text-center font-semibold">{handletimezone(item.date)}</TableCell>
                                   
                                     <TableCell className="text-center ">{formatNumber(item.rcv_wholespeel)}</TableCell>
                               
                                    
                                 </TableRow>
                             );
                         })) : (<TableRow>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell><p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">No Result </p></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                             <TableCell></TableCell>
                         </TableRow>)}

                    </TableBody>

                </Table>
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

export default MayurHistoryTable;
