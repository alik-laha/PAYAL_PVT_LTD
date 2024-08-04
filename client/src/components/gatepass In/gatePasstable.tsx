import { FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { format, toZonedTime } from 'date-fns-tz'
import React from "react";
import { GatePassSection, pageNo, pagelimit } from "../common/exportData";
import axios from "axios";
import { LuDownload } from "react-icons/lu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { GatePassData } from "@/type/type";
const GatePassTable = () => {

    const [fromdate, setfromDate] = React.useState<string>('');
    const [todate, settoDate] = React.useState<string>('');
    const [hidetodate, sethidetoDate] = useState<string>('');
    const [blConNo, setBlConNo] = useState<string>("")
    const [section, setSection] = useState<string>("")
    const [blockpagen, setblockpagen] = useState('flex')
    const [Data, setData] = useState<GatePassData[]>([])
    const [page, setPage] = useState(pageNo)

    const limit = pagelimit


    function handletimezone(date: string | Date) {
        const apidate = new Date(date);
        const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);
        const finaldate = format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
        return finaldate;
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

    const handleSearch = async () => {
        //console.log('search button pressed')
        //setEditData([])
        setblockpagen('flex')
        const response = await axios.put('/api/gatepass/gatepasssearch', {
            blConNo: blConNo,
            section: section,
            fromDate: fromdate,
            toDate: todate
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
    useEffect(() => {
        handleSearch()
        setPage((prev) => {
            if (prev <= 0) {
                return 1
            }
            return prev
        })
    }, [page])

    const handleAMPM = (time: string) => {

        let [hours, minutes] = time.split(':').map(Number);
        let period = ' AM';

        if (hours === 0) {
            hours = 12;
        } else if (hours === 12) {
            period = ' PM';
        } else if (hours > 12) {
            hours -= 12;
            period = ' PM';
        }
        const finalTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + period.toString()

        // return ${hours}:${minutes.toString().padStart(2, '0')} ${period};
        return finalTime;
    }



    return (
        <div className="ml-5 mt-5 ">
            <div className="flex flexbox-search">

                <Input className="no-padding w-1/5 flexbox-search-width" placeholder=" GatePass/Doc No." value={blConNo} onChange={(e) => setBlConNo(e.target.value)} />

                <select className='flexbox-search-width flex h-8 w-1/5 ml-10 items-center justify-between rounded-md border border-input bg-background px-3 py-1 text-sm 
    ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                    onChange={(e) => setSection(e.target.value)} value={section}>
                    <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
        py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value=''>Section (All)</option>
                    {GatePassSection.map((data, index) => (
                        <option className='relative flex w-full cursor-default select-none items-center rounded-sm 
            py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' value={data} key={index}>
                            {data}
                        </option>
                    ))}
                </select>

                <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-left ">From </label>
                <Input className="w-1/6 flexbox-search-width-calender"
                    type="date"
                    value={fromdate}
                    onChange={(e) => setfromDate(e.target.value)}
                    placeholder="From Date"

                />
                <label className="font-semibold mt-1 ml-8 mr-5 flexbox-search-width-label-right">To </label>
                <Input className="w-1/6 flexbox-search-width-calender"
                    type="date"
                    value={hidetodate}
                    onChange={handleTodate}
                    placeholder="To Date"

                />


                <span className="w-1/8 ml-6 no-margin"><Button className="bg-slate-500 h-8" onClick={handleSearch}><FaSearch size={15} /> Search</Button></span>

            </div>
            <span className="w-1/8 "><Button className="bg-green-700 h-8 mt-4 w-30 text-sm float-right mr-4" ><LuDownload size={18} /></Button> </span>
            <Table className="mt-4">
                <TableHeader className="bg-neutral-100 text-stone-950 ">

                    <TableHead className="text-center" >Sl No.</TableHead>
                    <TableHead className="text-center" >GatePass_ID</TableHead>
                    <TableHead className="text-center" >Date</TableHead>
                    <TableHead className="text-center" >Time</TableHead>
                    <TableHead className="text-center" >Section</TableHead>
                    <TableHead className="text-center" >Doc_No.</TableHead>

                    <TableHead className="text-center" >Gross_Wt.</TableHead>
                    <TableHead className="text-center" >Wt_Slip</TableHead>
                    <TableHead className="text-center" >Vehicle_No</TableHead>
                    <TableHead className="text-center" >Driver Name</TableHead>
                    <TableHead className="text-center" >Driver_Contact</TableHead>
                  
                    <TableHead className="text-center" >Entried By</TableHead>
                    <TableHead className="text-center" >Action</TableHead>
                </TableHeader>
                <TableBody>


                    {Data.length > 0 ? (Data.map((item: GatePassData, idx) => {
                    
                        

                        return (
                            <TableRow key={item.id}>
                                <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                                <TableCell className="text-center font-semibold text-cyan-600">{item.gatePassNo}</TableCell>
                                <TableCell className="text-center">{handletimezone(item.date)}</TableCell>
                                <TableCell className="text-center">{handleAMPM(item.time)}</TableCell>
                                <TableCell className="text-center font-semibold">{item.section}</TableCell>
                                
                                <TableCell className="text-center">{item.DocNo}</TableCell>
                                <TableCell className="text-center font-semibold">{item.grosswt} kg </TableCell>
                                <TableCell className="text-center">{item.grosswtNo}</TableCell>
                                <TableCell className="text-center">{item.vehicleNo}</TableCell>
                                <TableCell className="text-center">{item.driverName}</TableCell>
                                <TableCell className="text-center">{item.driverContact}</TableCell>
                                <TableCell className="text-center">{item.securityName}</TableCell>
                               

                                

                            </TableRow>)

                    })) : (<TableRow>
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
                    </TableRow>)}





                </TableBody>

            </Table>


        </div>



    )

}
export default GatePassTable;