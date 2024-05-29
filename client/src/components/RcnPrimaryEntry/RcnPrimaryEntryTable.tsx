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


const RcnPrimaryEntryTable = () => {
    const [date, setDate] = React.useState<Date | undefined>()
    return (
        <div>
            <Input />

            <DatePicker buttonName="From Date" value={date} setValue={setDate} />
            <Table>
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
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Origin1</TableCell>
                        <TableCell>BL No.1</TableCell>
                        <TableCell>Con No.1</TableCell>
                        <TableCell>QC status1</TableCell>
                        <TableCell>Action1</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>Origin2</TableCell>
                        <TableCell>BL No.2</TableCell>
                        <TableCell>Con No.2</TableCell>
                        <TableCell>QC status2</TableCell>
                        <TableCell>Action2</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell>Origin3</TableCell>
                        <TableCell>BL No.3</TableCell>
                        <TableCell>Con No.3</TableCell>
                        <TableCell>QC status3</TableCell>
                        <TableCell>Action3</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )

}
export default RcnPrimaryEntryTable;