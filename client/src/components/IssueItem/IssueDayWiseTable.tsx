import { IssueItemDaywiseData } from "@/type/type"
import { pagelimit } from "../common/exportData";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format, toZonedTime } from 'date-fns-tz'

const IssueDayWiseTable = ({ DayWise, page }: { DayWise: IssueItemDaywiseData[], page: number }) => {
    const limit = pagelimit;
    function handletimezone(date: string | Date) {
        const apidate = new Date(date);
        const localdate = toZonedTime(apidate, Intl.DateTimeFormat().resolvedOptions().timeZone);
        const finaldate = format(localdate, 'dd-MM-yyyy', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })
        return finaldate;
    }
    function formatNumber(num: any) {
        return Number.isInteger(num) ? parseInt(num) : num.toFixed(2);
    }
    return (

        <Table className="mt-4">

            <TableHeader className="bg-neutral-100 text-stone-950 ">

                <TableHead className="text-center" >Sl No</TableHead>
                <TableHead className="text-center" >Issue_Date</TableHead>
                <TableHead className="text-center" >Setion_Unit</TableHead>
                <TableHead className="text-center" >Category</TableHead>
                <TableHead className="text-center" >Total_Issue_Price </TableHead>



            </TableHeader>
            <TableBody>
                {DayWise.length > 0 ? (DayWise.map((item: IssueItemDaywiseData, idx: number) => {

                    return (
                        <TableRow key={idx}>
                            <TableCell className="text-center">{(limit * (page - 1)) + idx + 1}</TableCell>
                        
                            <TableCell className="text-center font-semibold text-cyan-600">{handletimezone(item.date)}</TableCell>
                            <TableCell className="text-center font-semibold ">{item.sectionunit}</TableCell>
                            <TableCell className="text-center  ">{item.category}</TableCell>
                            <TableCell className="text-center    ">{formatNumber(parseFloat(item.totalIssuePrice))}</TableCell>
                           
                         

                        </TableRow>
                    );
                })) : (<TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                   
                    <TableCell><p className="w-100 font-medium text-red-500 text-center pt-3 pb-10">No Result </p></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                 
                </TableRow>)
                }
            </TableBody>
        </Table>
    )


}
export default IssueDayWiseTable