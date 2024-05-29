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
import axios from "axios";
import { useQuery } from "react-query";
import { RcnPrimaryEntryData } from "@/type/type";

const getAllRcnPrimaryEntry = async () => {
    try {
        const data = await axios.get('/api/rcnprimary/all')
        console.log(data.data)
        return data.data

    }
    catch (err) {
        console.log(err)
    }
}

const RcnPrimaryEntryTable = () => {
    const [date, setDate] = React.useState<Date | undefined>();
    const {
        data,
        error,
        isLoading,
    } = useQuery("postsData", getAllRcnPrimaryEntry);

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error</div>
    }
    if (data) {

        return (
            <div className="ml-5 mt-5">
                <div className="flex ">

                    <Input className="w-30" placeholder="Search By BL/Con No." />
                    <DatePicker buttonName="From Date" value={date} setValue={setDate} />
                </div>



                <Table >
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Origin</TableHead>
                            <TableHead>BL No.</TableHead>
                            <TableHead>Con No.</TableHead>
                            <TableHead>QC status</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data.map((item: RcnPrimaryEntryData) => {
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.origin}</TableCell>
                                        <TableCell>{item.blNo}</TableCell>
                                        <TableCell>{item.conNo}</TableCell>
                                        <TableCell>{item.rcnStatus}</TableCell>
                                        <TableCell>
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