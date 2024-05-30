import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React from "react"
import { Input } from "../ui/input";
import DatePicker from "../common/DatePicker";
import { RcnPrimaryEntryData } from "@/type/type";
import UseQueryData from "../common/dataFetcher";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Origin } from "../common/exportData"
import { useState } from "react"




const RcnPrimaryEntryTable = () => {
    const [origin, setOrigin] = useState<string>("")
    const [fromdate, setfromDate] = React.useState<Date | undefined>();
    const [todate, settoDate] = React.useState<Date | undefined>();

    const { data, error, isLoading } = UseQueryData('/api/rcnprimary/all', 'GET', 'postsData')
    console.log(data)

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error</div>
    }
    if (data) {
        return (
            <div className="ml-5 mt-5">
                <div className="flex flexbox-search">

                    <Input className="flexbox-search-width mt-1" placeholder="Search By BL/Con No." />
                    <div className="flex pl-7 mt-1 flexbox-search-width ">
                    <Select value={origin} onValueChange={(value) => setOrigin(value)}>
                        <SelectTrigger className="w-3/4 h-8">
                            <SelectValue placeholder="Origin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    Origin.map((item) => {
                                        return (
                                            <SelectItem key={item} value={item}>
                                                {item}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select></div>
                    <span className="flexbox-search-width"><DatePicker buttonName="From Date" value={fromdate} setValue={setfromDate} /></span>
                    <span className="flexbox-search-width"> <DatePicker buttonName="To Date" value={todate} setValue={settoDate} /></span>
                </div>



                <Table className="mt-8">
                    <TableHeader className="bg-neutral-100 text-stone-950 ">
                        
                            <TableHead  className="text-center" >Id</TableHead>
                            <TableHead className="text-center" >Origin</TableHead>
                            <TableHead className="text-center" >Date </TableHead>
                            <TableHead className="text-center" >BL No.</TableHead>
                            <TableHead className="text-center" >Con No.</TableHead>
                            <TableHead className="text-center" >QC </TableHead>
                            <TableHead className="text-center" >Status </TableHead>
                            <TableHead className="text-center" >Action</TableHead>
                        
                    </TableHeader>
                    <TableBody>
                        {
                            data.map((item: RcnPrimaryEntryData) => {
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center" >{item.id}</TableCell>
                                        <TableCell className="text-center" >{item.origin}</TableCell>
                                        <TableCell className="text-center" >{item.date.slice(0,10)}</TableCell>
                                        <TableCell className="text-center" >{item.blNo}</TableCell>
                                        <TableCell className="text-center" >{item.conNo}</TableCell>
                                        <TableCell className="text-center" ><button className="bg-red-500 p-1 text-white rounded">{item.rcnStatus}</button></TableCell>
                                        <TableCell className="text-center" >
                                            
                                        </TableCell>
                                        <TableCell className="text-center" >
                                        <button className="bg-green-500 p-1 text-white rounded">Edit</button>
                                            <button className="bg-red-500 p-1 text-white rounded">Delete</button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        )
    }
}
export default RcnPrimaryEntryTable;